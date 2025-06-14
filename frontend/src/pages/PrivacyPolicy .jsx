import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 2xl:px-20 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-8 lg:p-12">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Privacy Policy
              </h1>
              <p className="text-gray-600 text-lg">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none space-y-8">
              
              {/* Introduction */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  1. Introduction
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  At Lasna Job Portal, we are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, store, and protect your information when you use our platform and services.
                </p>
              </section>

              {/* Information We Collect */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  2. Information We Collect
                </h2>
                <div className="space-y-4 text-gray-700">
                  <h3 className="text-lg font-medium text-gray-900">Personal Information:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Full name, email address</li>
                    {/* <li>Professional profile information (resume, work experience, skills)</li> */}
                    <li>Educational background and certifications</li>
                    <li>Profile pictures and other uploaded documents</li>
                    {/* <li>Location and preferred work locations</li> */}
                  </ul>
                  
                  <h3 className="text-lg font-medium text-gray-900 mt-6">Company Information (for Employers):</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Company name, description, and industry</li>
                    <li>Company contact information and website</li>
                    <li>Company logo and branding materials</li>
                    <li>Job postings and requirements</li>
                  </ul>

                  <h3 className="text-lg font-medium text-gray-900 mt-6">Technical Information:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>IP address, browser type, and device information</li>
                    <li>Platform usage data and interaction patterns</li>
                    <li>Cookies and similar tracking technologies</li>
                    <li>Log files and error reports</li>
                  </ul>
                </div>
              </section>

              {/* How We Use Your Information */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  3. How We Use Your Information
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p className="leading-relaxed">We use your information to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Facilitate job matching between candidates and employers</li>
                    <li>Maintain and improve our platform functionality</li>
                    <li>Send relevant job alerts and notifications</li>
                    <li>Provide customer support and technical assistance</li>
                    <li>Analyze platform usage to enhance user experience</li>
                    <li>Prevent fraud and ensure platform security</li>
                    <li>Comply with legal requirements and regulations</li>
                  </ul>
                </div>
              </section>

              {/* Data Sharing Policy */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  4. Data Sharing and Disclosure
                </h2>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                  <p className="text-blue-700 font-medium">
                    <strong>IMPORTANT:</strong> Your data is shared ONLY with companies you apply to
                  </p>
                </div>
                <div className="space-y-4 text-gray-700">
                  <h3 className="text-lg font-medium text-gray-900">We Share Your Information With:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Applied Companies Only:</strong> Your profile and application details are shared exclusively with employers to whose job postings you have applied</li>
                    <li><strong>Interested Employers:</strong> Companies that express interest in your profile based on your job preferences</li>
                    <li><strong>Authorized Recruiters:</strong> Recruiters from companies you've directly contacted or shown interest in</li>
                  </ul>
                  
                  <h3 className="text-lg font-medium text-gray-900 mt-6">We DO NOT Share Your Data With:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Third-party marketing companies</li>
                    <li>Data brokers or analytics companies</li>
                    <li>Social media platforms for advertising</li>
                    <li>Any company you haven't applied to or shown interest in</li>
                    <li>Competitors or unauthorized parties</li>
                  </ul>

                  <h3 className="text-lg font-medium text-gray-900 mt-6">Legal Disclosure:</h3>
                  <p className="leading-relaxed">
                    We may disclose your information if required by law, court order, or government regulation, or to protect our rights, property, or safety.
                  </p>
                </div>
              </section>

              {/* Data Security */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  5. Data Security
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p className="leading-relaxed">
                    We implement robust security measures to protect your personal information:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>SSL encryption for all data transmission</li>
                    <li>Secure servers with regular security updates</li>
                    <li>Access controls and authentication systems</li>
                    <li>Regular security audits and monitoring</li>
                    <li>Employee training on data privacy and security</li>
                    <li>Incident response procedures for data breaches</li>
                  </ul>
                </div>
              </section>

              {/* Data Retention */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  6. Data Retention
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p className="leading-relaxed">
                    We retain your personal information for as long as:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Your account remains active on our platform</li>
                    <li>Necessary to provide our services to you</li>
                    <li>Required by law or for legal obligations</li>
                    <li>Needed for legitimate business purposes</li>
                  </ul>
                  <p className="leading-relaxed mt-4">
                    You can request deletion of your account and personal data at any time by contacting us.
                  </p>
                </div>
              </section>

              {/* Your Rights */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  7. Your Privacy Rights
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p className="leading-relaxed">You have the right to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Access:</strong> Request a copy of your personal data</li>
                    <li><strong>Correct:</strong> Update or correct inaccurate information</li>
                    <li><strong>Delete:</strong> Request deletion of your personal data</li>
                    <li><strong>Restrict:</strong> Limit how we use your information</li>
                    <li><strong>Object:</strong> Opt-out of certain data processing activities</li>
                    <li><strong>Portability:</strong> Receive your data in a portable format</li>
                    <li><strong>Withdraw Consent:</strong> Revoke previously given consent</li>
                  </ul>
                </div>
              </section>

              {/* Cookies and Tracking */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  8. Cookies and Tracking Technologies
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p className="leading-relaxed">
                    We use cookies and similar technologies to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Remember your login preferences and settings</li>
                    <li>Analyze platform usage and performance</li>
                    <li>Provide personalized job recommendations</li>
                    <li>Ensure platform security and prevent fraud</li>
                  </ul>
                  <p className="leading-relaxed mt-4">
                    You can control cookie settings through your browser preferences. However, disabling cookies may affect platform functionality.
                  </p>
                </div>
              </section>

              {/* Third-Party Services */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  9. Third-Party Services
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p className="leading-relaxed">
                    We may use third-party services for:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Payment processing (with encrypted transactions)</li>
                    <li>Email delivery and communication services</li>
                    <li>Analytics and platform improvement</li>
                    <li>Cloud storage and data backup</li>
                  </ul>
                  <p className="leading-relaxed mt-4">
                    These services are bound by strict confidentiality agreements and data protection standards.
                  </p>
                </div>
              </section>

              {/* Children's Privacy */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  10. Children's Privacy
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p className="leading-relaxed">
                    Lasna is intended for users aged 18 and above. We do not knowingly collect personal information from children under 18. If we discover that a child has provided personal information, we will delete it immediately.
                  </p>
                </div>
              </section>

              {/* International Data Transfers */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  11. International Data Transfers
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p className="leading-relaxed">
                    Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards.
                  </p>
                </div>
              </section>

              {/* Changes to Privacy Policy */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  12. Changes to This Privacy Policy
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p className="leading-relaxed">
                    We may update this Privacy Policy periodically to reflect changes in our practices or applicable laws. We will notify users of significant changes via email or platform notifications. Your continued use of the platform after changes constitutes acceptance of the updated policy.
                  </p>
                </div>
              </section>

              {/* Data Protection Officer */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  13. Data Protection Officer
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 leading-relaxed">
                    For privacy-related inquiries, data access requests, or concerns about your personal information:
                  </p>
                  <div className="mt-4 space-y-2">
                    <p className="text-gray-700">
                      <strong>Privacy Officer:</strong> privacy@lasna.com
                    </p>
                    <p className="text-gray-700">
                      <strong>General Support:</strong> support@lasna.com
                    </p>
                    <p className="text-gray-700">
                      <strong>Address:</strong> Lasna Job Portal, Srinagar, Jammu and Kashmir, India
                    </p>
                  </div>
                </div>
              </section>

              {/* Complaint Procedure */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  14. Complaint Procedure
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p className="leading-relaxed">
                    If you believe your privacy rights have been violated, you can:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Contact our Privacy Officer directly</li>
                    <li>File a complaint with relevant data protection authorities</li>
                    <li>Seek legal remedies under applicable privacy laws</li>
                  </ul>
                </div>
              </section>

              {/* Final Notice */}
              <section className="border-t pt-8 mt-12">
                <div className="bg-green-50 border-l-4 border-green-400 p-4">
                  <p className="text-green-800 font-medium">
                    <strong>Your Trust Matters:</strong> We are committed to maintaining the highest standards of data privacy and security. Your personal information is valuable, and we treat it with the utmost care and respect.
                  </p>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;