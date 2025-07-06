'use client'

import { motion } from 'framer-motion'

export default function TermsOfService() {
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
            TERMS OF SERVICE
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
            <h2 className="text-3xl font-bold text-white mb-6">1. Acceptance of Terms</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                By accessing and using Binexia Bot services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
              <p>
                These Terms of Service (&quot;Terms&quot;) govern your use of our website, AI trading bot, and related services (collectively, the &quot;Service&quot;) operated by Binexia Bot (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;).
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">2. Description of Service</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                Binexia Bot provides AI-powered trading signals and automated trading assistance for binary options and forex markets. Our services include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Real-time AI-generated trading signals</li>
                <li>Market analysis and trend predictions</li>
                <li>Automated trading bot integration</li>
                <li>Educational resources and support</li>
                <li>Performance tracking and analytics</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">3. User Responsibilities</h2>
            <div className="space-y-4 text-gray-300">
              <p>As a user of our service, you agree to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide accurate and complete information during registration</li>
                <li>Maintain the security and confidentiality of your account credentials</li>
                <li>Use the service in compliance with all applicable laws and regulations</li>
                <li>Not attempt to reverse engineer or copy our proprietary algorithms</li>
                <li>Not share your account access with unauthorized parties</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-800/30 to-red-900/30 backdrop-blur-xl border border-red-400/30 rounded-3xl p-8 shadow-2xl mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">4. Risk Disclaimer</h2>
            <div className="space-y-4 text-gray-300">
              <p className="font-semibold text-red-400">
                IMPORTANT: Trading involves substantial risk and may not be suitable for all investors.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Past performance does not guarantee future results</li>
                <li>You may lose some or all of your invested capital</li>
                <li>Only trade with money you can afford to lose</li>
                <li>Our AI predictions are not guaranteed to be accurate</li>
                <li>Market conditions can change rapidly and unpredictably</li>
                <li>You are solely responsible for your trading decisions</li>
              </ul>
              <p className="font-semibold text-yellow-400 mt-4">
                We strongly recommend consulting with a financial advisor before making any trading decisions.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">5. Subscription and Payments</h2>
            <div className="space-y-4 text-gray-300">
              <p>Our service operates on a subscription basis:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Subscription fees are billed in advance on a monthly basis</li>
                <li>All fees are non-refundable except as expressly stated</li>
                <li>We offer a 60-day money-back guarantee for new subscribers</li>
                <li>Subscription automatically renews unless cancelled</li>
                <li>Price changes will be communicated 30 days in advance</li>
                <li>Failed payments may result in service suspension</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">6. Intellectual Property</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                All content, features, and functionality of our service are owned by Binexia Bot and protected by copyright, trademark, and other intellectual property laws:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Our AI algorithms and trading strategies are proprietary</li>
                <li>You may not reproduce, distribute, or create derivative works</li>
                <li>Trademarks and logos are property of Binexia Bot</li>
                <li>User-generated content remains your property</li>
                <li>You grant us a license to use your feedback and suggestions</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">7. Limitation of Liability</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                To the maximum extent permitted by law, Binexia Bot shall not be liable for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Any trading losses or financial damages</li>
                <li>Indirect, incidental, or consequential damages</li>
                <li>Loss of profits, data, or business opportunities</li>
                <li>Damages resulting from third-party actions</li>
                <li>Service interruptions or technical issues</li>
                <li>Errors in signals or predictions</li>
              </ul>
              <p className="font-semibold text-yellow-400 mt-4">
                Our total liability shall not exceed the amount paid by you for the service in the preceding 12 months.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">8. Service Availability</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                While we strive for 99.9% uptime, we cannot guarantee uninterrupted service:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Scheduled maintenance may temporarily interrupt service</li>
                <li>Technical issues may cause unexpected downtime</li>
                <li>Third-party integrations may affect service availability</li>
                <li>We reserve the right to modify or discontinue features</li>
                <li>Emergency maintenance may be performed without notice</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">9. Account Termination</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                We may terminate or suspend your account if you:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Violate these Terms of Service</li>
                <li>Engage in fraudulent or illegal activities</li>
                <li>Fail to pay subscription fees</li>
                <li>Attempt to harm our service or other users</li>
                <li>Provide false or misleading information</li>
              </ul>
              <p>
                You may terminate your account at any time by contacting our support team.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">10. Privacy and Data Protection</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>We collect only necessary information to provide our service</li>
                <li>Your data is encrypted and securely stored</li>
                <li>We do not sell your personal information to third parties</li>
                <li>You have rights regarding your personal data</li>
                <li>Please review our Privacy Policy for complete details</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">11. Governing Law</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                These Terms of Service are governed by and construed in accordance with the laws of the jurisdiction where Binexia Bot is incorporated, without regard to conflict of law principles.
              </p>
              <p>
                Any disputes arising from these terms shall be resolved through binding arbitration in accordance with the rules of the relevant arbitration association.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-400/30 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-6">12. Changes to Terms</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                We reserve the right to modify these Terms of Service at any time:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Changes will be posted on our website</li>
                <li>Material changes will be communicated via email</li>
                <li>Continued use indicates acceptance of new terms</li>
                <li>You may terminate your account if you disagree with changes</li>
              </ul>
              <p className="mt-4 font-semibold text-green-400">
                For questions about these terms, please contact us at legal@binexiabot.com
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
