import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 2xl:px-20 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-8 lg:p-12">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Terms & Conditions
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
                  Welcome to Lasna Job Portal ("we," "our," or "us"). These
                  Terms and Conditions ("Terms") govern your use of our job
                  portal platform and services. By accessing or using our
                  platform, you agree to be bound by these Terms.
                </p>
              </section>

              {/* Platform Disclaimer */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  2. Platform Disclaimer
                </h2>
                <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                  <p className="text-red-700 font-medium">
                    <strong>IMPORTANT DISCLAIMER:</strong>
                  </p>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p className="leading-relaxed">
                    <strong>Lasna is NOT responsible for:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Any recruitment processes, decisions, or outcomes</li>
                    <li>Selection or rejection of candidates by employers</li>
                    <li>Errors, omissions, or inaccuracies in job postings</li>
                    <li>
                      Failure of selection processes or interview outcomes
                    </li>
                    <li>Misleading job descriptions or company information</li>
                    <li>
                      Compensation disputes between employers and employees
                    </li>
                    <li>
                      Work conditions, employment terms, or workplace issues
                    </li>
                  </ul>
                  <p className="leading-relaxed">
                    Lasna serves solely as a platform connecting job seekers
                    with employers. All recruitment decisions, employment terms,
                    and related matters are exclusively between the employer and
                    candidate.
                  </p>
                </div>
              </section>

              {/* User Responsibilities */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  3. User Responsibilities
                </h2>
                <div className="space-y-4 text-gray-700">
                  <h3 className="text-lg font-medium text-gray-900">
                    For Job Seekers:
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      Provide accurate and truthful information in your profile
                    </li>
                    <li>Keep your profile and contact information updated</li>
                    <li>
                      Verify job details and company information independently
                    </li>
                    <li>
                      Conduct due diligence before accepting any job offers
                    </li>
                    <li>Report suspicious or fraudulent job postings</li>
                  </ul>

                  <h3 className="text-lg font-medium text-gray-900 mt-6">
                    For Employers:
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Provide accurate job descriptions and requirements</li>
                    <li>
                      Ensure compliance with employment laws and regulations
                    </li>
                    <li>Maintain confidentiality of candidate information</li>
                    <li>Conduct fair and unbiased recruitment processes</li>
                    <li>
                      Honor commitments made during the recruitment process
                    </li>
                  </ul>
                </div>
              </section>

              {/* Data Usage */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  4. Data Usage and Sharing
                </h2>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                  <p className="text-blue-700 font-medium">
                    Data Sharing Policy
                  </p>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p className="leading-relaxed">
                    Your personal data and profile information are shared ONLY
                    with:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Companies to which you have specifically applied</li>
                    <li>
                      Employers who have posted jobs you've shown interest in
                    </li>
                    <li>Recruiters from companies you've directly contacted</li>
                  </ul>
                  <p className="leading-relaxed">
                    We do NOT sell, rent, or share your data with third parties
                    for marketing purposes without your explicit consent.
                  </p>
                </div>
              </section>

              {/* Limitation of Liability */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  5. Limitation of Liability
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p className="leading-relaxed">
                    To the maximum extent permitted by law, Lasna shall not be
                    liable for:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      Any direct, indirect, incidental, or consequential damages
                    </li>
                    <li>
                      Loss of employment opportunities or failed job
                      applications
                    </li>
                    <li>
                      Damages arising from employer-employee relationships
                    </li>
                    <li>Technical issues, platform downtime, or data loss</li>
                    <li>Actions or omissions of employers or job seekers</li>
                    <li>Fraudulent activities by platform users</li>
                  </ul>
                </div>
              </section>

              {/* Prohibited Activities */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  6. Prohibited Activities
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p className="leading-relaxed">Users are prohibited from:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      Posting false, misleading, or fraudulent information
                    </li>
                    <li>
                      Harassing, threatening, or discriminating against other
                      users
                    </li>
                    <li>Sharing or selling personal data of other users</li>
                    <li>Using the platform for illegal activities</li>
                    <li>
                      Attempting to hack, disrupt, or compromise platform
                      security
                    </li>
                    <li>
                      Creating multiple accounts to circumvent restrictions
                    </li>
                  </ul>
                </div>
              </section>

              {/* Account Termination */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  7. Account Termination
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p className="leading-relaxed">
                    We reserve the right to suspend or terminate accounts for:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Violation of these Terms and Conditions</li>
                    <li>Fraudulent or suspicious activities</li>
                    <li>Complaints from other users</li>
                    <li>Inactivity for extended periods</li>
                  </ul>
                </div>
              </section>

              {/* Intellectual Property */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  8. Intellectual Property
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p className="leading-relaxed">
                    All content, features, and functionality of the Lasna
                    platform are owned by us and protected by copyright,
                    trademark, and other intellectual property laws.
                  </p>
                </div>
              </section>

              {/* Changes to Terms */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  9. Changes to Terms
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p className="leading-relaxed">
                    We may update these Terms from time to time. Users will be
                    notified of significant changes via email or platform
                    notifications. Continued use of the platform after changes
                    constitutes acceptance of the new Terms.
                  </p>
                </div>
              </section>

              {/* Governing Law */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  10. Governing Law
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p className="leading-relaxed">
                    These Terms are governed by and construed in accordance with
                    the laws of India. Any disputes arising from these Terms
                    shall be subject to the exclusive jurisdiction of the courts
                    in Jammu and Kashmir, India.
                  </p>
                </div>
              </section>

              {/* Contact Information */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  11. Contact Information
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 leading-relaxed">
                    If you have any questions about these Terms and Conditions,
                    please contact us at:
                  </p>
                  <div className="mt-4 space-y-2">
                    <p className="text-gray-700">
                      <strong>Email:</strong> support@lasna.com
                    </p>
                    <p className="text-gray-700">
                      <strong>Address:</strong> Lasna Job Portal, Srinagar,
                      Jammu and Kashmir, India
                    </p>
                  </div>
                </div>
              </section>

              {/* Final Notice */}
              <section className="border-t pt-8 mt-12">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <p className="text-yellow-800 font-medium">
                    <strong>Please Note:</strong> By using Lasna, you
                    acknowledge that you have read, understood, and agree to be
                    bound by these Terms and Conditions. If you do not agree
                    with any part of these terms, please do not use our
                    platform.
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

export default TermsAndConditions;
