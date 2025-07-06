'use client'

import { motion } from 'framer-motion'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 mb-6">
            PRIVACY POLICY
          </h1>
          <p className="text-xl text-gray-300">
            Last updated: June 22, 2025
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-invert max-w-none"
        >
          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">1. Information We Collect</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                At Binexia Bot, we collect information to provide you with the best AI trading experience possible. The information we collect includes:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Personal Information:</strong> Name, email address, phone number, and payment information</li>
                <li><strong>Account Information:</strong> Username, password, trading preferences, and subscription details</li>
                <li><strong>Usage Data:</strong> Trading performance, bot settings, and platform interactions</li>
                <li><strong>Technical Data:</strong> IP address, browser type, device information, and cookies</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">2. How We Use Your Information</h2>
            <div className="space-y-4 text-gray-300">
              <p>We use your information to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide and maintain our AI trading bot services</li>
                <li>Process payments and manage your subscription</li>
                <li>Send you trading signals and market analysis</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Improve our services and develop new features</li>
                <li>Comply with legal obligations and prevent fraud</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">3. Information Sharing</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Service Providers:</strong> Trusted third-party companies that help us operate our services</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets</li>
                <li><strong>Consent:</strong> When you have given us explicit permission to share your information</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">4. Data Security</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                We implement industry-standard security measures to protect your information:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>SSL encryption for all data transmission</li>
                <li>Secure servers with regular security updates</li>
                <li>Multi-factor authentication for account access</li>
                <li>Regular security audits and penetration testing</li>
                <li>Employee training on data protection best practices</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">5. Your Rights</h2>
            <div className="space-y-4 text-gray-300">
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Access:</strong> Request a copy of your personal information</li>
                <li><strong>Rectification:</strong> Correct inaccurate or incomplete information</li>
                <li><strong>Erasure:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Export your data in a machine-readable format</li>
                <li><strong>Objection:</strong> Object to processing of your personal information</li>
                <li><strong>Restriction:</strong> Request limitation of processing activities</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">6. Cookies and Tracking</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                We use cookies and similar tracking technologies to enhance your experience:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
                <li><strong>Performance Cookies:</strong> Help us understand how you use our website</li>
                <li><strong>Functionality Cookies:</strong> Remember your preferences and settings</li>
                <li><strong>Targeting Cookies:</strong> Deliver relevant advertisements and content</li>
              </ul>
              <p>
                You can control cookie settings through your browser preferences.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">7. Data Retention</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                We retain your information for as long as necessary to provide our services and comply with legal obligations:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Active account data is retained while your account is active</li>
                <li>Trading data is retained for 7 years for regulatory compliance</li>
                <li>Marketing data is retained until you unsubscribe</li>
                <li>Technical logs are retained for 90 days</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">8. International Transfers</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place, including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Adequacy decisions by relevant authorities</li>
                <li>Standard contractual clauses</li>
                <li>Binding corporate rules</li>
                <li>Certification schemes</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">9. Contact Information</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-700/30 rounded-xl p-4 mt-4">
                <p><strong>Email:</strong> privacy@binexiabot.com</p>
                <p><strong>Address:</strong> Binexia Bot Data Protection Officer</p>
                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-400/30 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-6">10. Changes to This Policy</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                We may update this Privacy Policy from time to time. When we do, we will:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Post the updated policy on our website</li>
                <li>Update the &quot;Last updated&quot; date</li>
                <li>Notify you of significant changes via email</li>
                <li>Provide a summary of key changes</li>
              </ul>
              <p className="mt-4 font-semibold text-green-400">
                Your continued use of our services after changes indicates your acceptance of the updated policy.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 bg-transparent border-2 border-white/30 hover:border-white text-white font-bold py-3 px-6 rounded-xl backdrop-blur-sm hover:bg-white/10 transition"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0L3.586 10l4.707-4.707a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Home
          </motion.a>
        </motion.div>
      </div>
    </div>
  )
}
