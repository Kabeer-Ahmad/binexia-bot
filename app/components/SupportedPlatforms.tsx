'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const platforms = [
  { name: 'Quotex', logo: '/quotex.svg', desc: 'Real-time binary signals with precision.' },
  { name: 'IQ Option', logo: '/iqoption.png', desc: 'Instant AI-driven trade insights.' },
  { name: 'Binomo', logo: '/binomo.png', desc: 'Smart entries with strategic timing.' },
]

export default function SupportedPlatforms() {
  return (
    <section className="bg-gradient-to-br from-white via-blue-50 to-blue-100 py-20 px-6 text-center">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="flex items-center justify-center gap-3 text-4xl font-extrabold text-gray-800 mb-16"
      >
        <span className="inline-block bg-gradient-to-r from-blue-500 to-indigo-500 text-transparent bg-clip-text">
          Seamless Platform Support
        </span>
      </motion.h2>

      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
        {platforms.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.04, rotateX: 3, rotateY: -3 }}
            className="relative group"
          >
            {/* Spinning card-shaped border */}
            <div className="absolute inset-0 rounded-3xl z-0 pointer-events-none">
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent animate-spin-slow bg-[conic-gradient(from_0deg,transparent_0deg,transparent_290deg,#3B82F6_300deg,#8B5CF6_360deg)]" />
              <div className="absolute inset-[2px] rounded-3xl bg-white/60 backdrop-blur-md" />
            </div>

            {/* Actual content card */}
            <div className="relative z-10 p-8 sm:p-10 flex flex-col items-center text-center">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="mb-5"
              >
                <Image
                  src={p.logo}
                  alt={`${p.name} logo`}
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </motion.div>
              <h3 className="text-2xl font-semibold text-gray-800">{p.name}</h3>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">{p.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Spin animation */}
      <style jsx>{`
        @keyframes spin-slow {
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </section>
  )
}
