'use client'

import { motion } from 'framer-motion'

export default function CTASection() {
  return (
    <section
      id="cta"
      className="bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-950 text-white py-24 text-center px-6"
    >
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-4xl font-bold mb-4"
      >
        Ready to Trade Smarter?
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-10 text-lg text-gray-200"
      >
        Sign up today and experience the power of AI-backed binary trading.
      </motion.p>

      <motion.div
        className="flex justify-center gap-6 flex-wrap"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        viewport={{ once: true }}
      >
        <a
          href="/signup"
          className="bg-white text-blue-900 font-bold py-3 px-6 rounded-full hover:bg-gray-100 transition shadow-lg"
        >
          Sign Up
        </a>
        <a
          href="/signin"
          className="bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-full hover:bg-white hover:text-blue-900 transition shadow-lg"
        >
          Log In
        </a>
      </motion.div>
    </section>
  )
}
