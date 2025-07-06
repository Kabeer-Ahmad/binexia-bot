'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

const platforms = [
  { 
    name: 'Quotex', 
    logo: '/quotex.svg', 
    desc: 'Premium signals with 97% accuracy',
    profits: '$15,000+',
    color: 'from-blue-500 to-cyan-500'
  },
  { 
    name: 'IQ Option', 
    logo: '/iqoption.png', 
    desc: 'Lightning-fast execution & analysis',
    profits: '$12,500+',
    color: 'from-green-500 to-emerald-500'
  },
  { 
    name: 'Binomo', 
    logo: '/binomo.png', 
    desc: 'Smart entries with perfect timing',
    profits: '$18,200+',
    color: 'from-purple-500 to-pink-500'
  },
]

export default function SupportedPlatforms() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="bg-gradient-to-br from-black via-gray-900 to-black py-24 px-6 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              MULTIPLY
            </span>{' '}
            Your Money on
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
              Every Platform
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Our AI dominates <strong className="text-green-400">all major trading platforms</strong> - 
            you choose where to make your fortune
          </p>
        </motion.div>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto items-stretch">
          {platforms.map((platform, i) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                rotateX: 5,
              }}
              onHoverStart={() => setHoveredIndex(i)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="relative group cursor-pointer h-full"
            >
              {/* Glowing Border Effect */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${platform.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm`}></div>
              
              {/* Card Content */}
              <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 transition-all duration-500 group-hover:border-transparent h-full flex flex-col">
                {/* Profit Badge */}
                <div className={`absolute -top-4 -right-4 bg-gradient-to-r ${platform.color} text-white text-xs font-bold py-2 px-4 rounded-full shadow-lg`}>
                  Avg: {platform.profits}/mo
                </div>

                {/* Platform Logo */}
                <motion.div
                  animate={{ 
                    y: hoveredIndex === i ? [-2, 2, -2] : [0, -3, 0],
                    rotateZ: hoveredIndex === i ? [0, 2, -2, 0] : 0
                  }}
                  transition={{ 
                    duration: hoveredIndex === i ? 0.5 : 2, 
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  className="mb-6 flex justify-center"
                >
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-r ${platform.color} opacity-20 rounded-2xl blur-lg`}></div>
                    <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                      <Image
                        src={platform.logo}
                        alt={`${platform.name} logo`}
                        width={80}
                        height={80}
                        className="object-contain filter brightness-110"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Platform Info */}
                <div className="text-center flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className={`text-3xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r ${platform.color}`}>
                      {platform.name}
                    </h3>
                    <p className="text-gray-300 text-lg mb-6">{platform.desc}</p>
                  </div>
                  
                  {/* Feature List */}
                  <div className="space-y-3 text-sm text-gray-400 mt-auto">
                    <div className="flex items-center justify-center gap-2">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${platform.color}`}></div>
                      <span>Real-time AI signals</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${platform.color}`}></div>
                      <span>Auto-trading ready</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${platform.color}`}></div>
                      <span>24/7 market monitoring</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${platform.color}`}></div>
                      <span>Risk management tools</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${platform.color}`}></div>
                      <span>Live performance tracking</span>
                    </div>
                  </div>
                </div>

                {/* Animated Corner Accent */}
                <div className={`absolute top-4 left-4 w-8 h-8 bg-gradient-to-r ${platform.color} opacity-30 rounded-full animate-pulse`}></div>
                <div className={`absolute bottom-4 right-4 w-6 h-6 bg-gradient-to-r ${platform.color} opacity-20 rounded-full animate-ping`}></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-20"
        >
          <p className="text-2xl md:text-3xl font-bold text-white mb-8">
            Don&apos;t limit yourself to one platform - 
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
              DOMINATE THEM ALL
            </span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/signup"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(34, 197, 94, 0.5)" }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-xl shadow-2xl text-lg transition-all duration-300"
            >
              🎯 START WINNING TODAY
            </motion.a>
            <motion.a
              href="#demo"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-transparent border-2 border-white/30 hover:border-white text-white font-bold py-4 px-8 rounded-xl backdrop-blur-sm hover:bg-white/10 transition text-lg"
            >
              📊 See Live Results
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
