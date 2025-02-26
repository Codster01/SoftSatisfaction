import { google } from 'googleapis';
import { NextResponse } from "next/server";
const nodemailer = require('nodemailer');

interface FormData {
  name: string;
  email: string;
  phone: string;
  insuranceType: string;
}

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

export async function POST(request: Request) {
  try {
    const data: FormData = await request.json();
    console.log('Data:', data);
    
    // Validate required fields
    if (!data.name || !data.email || !data.phone || !data.insuranceType) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Generate unique code
    // Get the last code from the sheet to determine the next number
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!F2:F', // Assuming column F will contain the codes
    });

    // Initialize the counter
    let counter = 1;
    
    // If there are existing codes, find the highest number and increment it
    if (response.data.values && response.data.values.length > 0) {
      const existingCodes = response.data.values.flat().filter(code => code && code.startsWith('SOSI'));
      
      if (existingCodes.length > 0) {
        // Extract the numeric part of the last code and increment it
        const highestCode = existingCodes
          .map(code => parseInt(code.replace('SOSI', ''), 10))
          .sort((a, b) => b - a)[0];
          
        counter = highestCode + 1;
      }
    }
    
    // Format the counter with leading zeros
    const uniqueCode = `SOSI${counter.toString().padStart(6, '0')}`;

    // Format date for Google Sheets
    // This will format the date as MM/DD/YYYY HH:mm:ss
    const now = new Date();
    const formattedDate = `=DATE(${now.getFullYear()},${now.getMonth() + 1},${now.getDate()}) + TIME(${now.getHours()},${now.getMinutes()},${now.getSeconds()})`;

    // Format email with hyperlink formula
    const formattedEmail = `=HYPERLINK("mailto:${data.email}","${data.email}")`;

    // Append data to Google Sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:F', // Updated range to include the code column
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          data.name,
          formattedEmail,  // Using the formatted email
          data.phone,
          data.insuranceType,
          formattedDate,   // Using the formatted date
          uniqueCode       // Adding the unique code
        ]],
      },
    });

    // Send email with the unique code
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        // Do not fail on invalid certs
        rejectUnauthorized: false,
        // Use modern TLS
        minVersion: 'TLSv1.2'
      }
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: data.email,
      subject: 'Thank You for Choosing Us',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
          <h2 style="color: #333;">Thank You for Choosing Us</h2>
          <p>Dear ${data.name},</p>
          <p>Thank you for submitting your information. We appreciate your trust in our services.</p>
          <p>Your unique verification number is: <strong>${uniqueCode}</strong></p>
          <p>Please keep this code for your records and reference it in all future communications regarding your insurance.</p>
          <p>If you have any questions, please don't hesitate to contact us.</p>
          <p>Best regards,<br>Soft Statisfaction Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ 
      message: "Form submitted successfully",
      data: data,
      uniqueCode: uniqueCode  // Return the code to the client
    },
    { 
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    }
  
  );

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: "Failed to submit form" },
      { status: 500 }
    );
  }
}

