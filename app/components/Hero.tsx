'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white flex flex-col items-center justify-center text-center px-4 py-10 sm:py-10 md:py-10 relative">
      {/* Optional Floating Accent Glow */}
      <div className="absolute top-1/3 left-1/2 w-72 h-72 bg-blue-500 opacity-20 blur-3xl rounded-full transform -translate-x-1/2 -z-10" />

      {/* Hero Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-indigo-300 leading-tight"
      >
        Trade Smarter with <br className="hidden sm:inline-block" />
        <span className="text-blue-400">Binexia Bot</span>
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-base sm:text-lg md:text-xl max-w-xl text-gray-300 mb-6"
      >
        Your AI-powered binary trading assistant with unmatched precision and performance.
      </motion.p>

      {/* CTA Button */}
      <motion.a
        href="#cta"
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="bg-blue-600 hover:bg-blue-700 transition text-white font-bold py-2.5 px-6 sm:px-8 rounded-full shadow-xl text-base sm:text-lg"
      >
        Try Now
      </motion.a>

      {/* Glow Pulse */}
      <style jsx>{`
        section::after {
          content: '';
          position: absolute;
          top: 30%;
          left: 50%;
          width: 280px;
          height: 280px;
          background: radial-gradient(circle, rgba(99,102,241,0.25), transparent 70%);
          transform: translate(-50%, -50%);
          border-radius: 9999px;
          animation: pulseGlow 5s ease-in-out infinite;
          z-index: -1;
        }

        @keyframes pulseGlow {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.4;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.6;
          }
        }
      `}</style>
    </section>
  )
}
