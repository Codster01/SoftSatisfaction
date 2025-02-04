import { google } from 'googleapis';
import { NextResponse } from "next/server";

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

    // Format date for Google Sheets
    // This will format the date as MM/DD/YYYY HH:mm:ss
    const now = new Date();
    const formattedDate = `=DATE(${now.getFullYear()},${now.getMonth() + 1},${now.getDate()}) + TIME(${now.getHours()},${now.getMinutes()},${now.getSeconds()})`;

    // Format email with hyperlink formula
    const formattedEmail = `=HYPERLINK("mailto:${data.email}","${data.email}")`;

    // Append data to Google Sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:E',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          data.name,
          formattedEmail,  // Using the formatted email
          data.phone,
          data.insuranceType,
          formattedDate    // Using the formatted date
        ]],
      },
    });

    return NextResponse.json({ 
      message: "Form submitted successfully",
      data: data 
    });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: "Failed to submit form" },
      { status: 500 }
    );
  }
}