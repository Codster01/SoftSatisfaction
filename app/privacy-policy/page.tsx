import { ChevronRight } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 py-4 text-sm text-gray-600">
            <a href="/" className="hover:text-blue-600">Home</a>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900">Privacy Policy</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm p-8">
          {/* Title Section */}
          <div className="border-b pb-8 mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
            <p className="mt-2 text-gray-600">Last Updated: February 13, 2025</p>
          </div>

          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-600 leading-relaxed">
              Welcome to Soft Satisfaction. We respect your privacy and are committed to protecting your personal data. 
              This privacy policy explains how we collect, use, disclose, and safeguard your information when you visit 
              our website and use our bike insurance services.
            </p>
          </section>

          {/* Information Collection */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">2.1 Personal Information</h3>
                <p className="text-gray-600 mb-3">We collect information that you provide directly to us, including:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Full name</li>
                  <li>Contact information</li>
                  <li>Government-issued identification numbers</li>
                  <li>Vehicle information (bike model, registration number)</li>
                  <li>Insurance history</li>
                </ul>
              </div>

             
            </div>
          </section>

          {/* Data Usage */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-600 mb-3">We use your personal information to:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>Process insurance applications and quotes</li>
              <li>Communicate with you about your policy</li>
              <li>Send service updates and administrative messages</li>
              <li>Process claims</li>
              <li>Improve our services</li>
              <li>Comply with legal obligations</li>
              <li>Detect and prevent fraud</li>
            </ul>
          </section>

          {/* Contact Section */}
          <section className="bg-gray-50 rounded-lg p-6 mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Contact Us</h2>
            <p className="text-gray-600 mb-4">
              For questions about this privacy policy or our privacy practices, please contact us at:
            </p>
            <div className="space-y-2 text-gray-600">
              <p className="font-medium">Soft Satisfaction</p>
              <p>Email: iskconsultancy@gmail.com</p>
              <p>Phone: +91 7030376143</p>
            </div>
          </section>

          {/* Update Notice */}
          <div className="border-t pt-8">
            <p className="text-sm text-gray-500">
              We may update this privacy policy from time to time. We will notify you of any changes by posting 
              the new policy on this page and updating the "Last Updated" date.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;