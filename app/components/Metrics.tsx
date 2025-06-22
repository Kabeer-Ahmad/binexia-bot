'use client'

import { motion } from 'framer-motion'
import clsx from 'clsx'
import { useState, useEffect } from 'react'

const metricVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.8,
      ease: 'easeOut',
    },
  }),
}

export default function Metrics() {
  const [counters, setCounters] = useState({ users: 0, profits: 0, winRate: 0 })

  useEffect(() => {
    const interval = setInterval(() => {
      setCounters(prev => ({
        users: Math.min(prev.users + 2, 1247),
        profits: Math.min(prev.profits + 10000, 2500000),
        winRate: Math.min(prev.winRate + 0.1, 95.7)
      }))
    }, 50)

    // Ensure win rate reaches exactly 95.7%
    const timeout = setTimeout(() => {
      clearInterval(interval)
      setCounters(prev => ({ ...prev, winRate: 95.7 }))
    }, 3000)
    
    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])

  const metrics = [
    { 
      value: `${counters.users.toLocaleString()}`, 
      label: 'Active Users',
      desc: 'Earning daily profits worldwide',
      color: 'from-blue-500 to-cyan-600',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
        </svg>
      )
    },
    { 
      value: `$${(counters.profits / 1000000).toFixed(1)}M+`, 
      label: 'Total Profits',
      desc: 'Generated for our community',
      color: 'from-yellow-500 to-orange-600',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
        </svg>
      )
    },
    { 
      value: `${counters.winRate.toFixed(1)}%`, 
      label: 'Win Rate',
      desc: 'AI-powered precision trading',
      color: 'from-green-500 to-emerald-600',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      )
    },
  ]

  return (
    <div
      id="metrics"
      className="py-24 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 border border-green-500/30 rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 border border-blue-500/30 rounded-full animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
              DOMINATE
            </span>{' '}
            <span className="text-white">THE MARKETS</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Join thousands of traders making <strong className="text-green-400">life-changing profits</strong> with our AI
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={metricVariants}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="relative group"
            >
              {/* Glowing Border */}
              <div className={clsx(
                'absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500',
                'bg-gradient-to-r', metric.color, 'blur-sm'
              )}></div>
              
              {/* Card Content */}
              <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 text-center transition-all duration-500 group-hover:border-transparent h-80 flex flex-col justify-center">
                {/* Icon Container */}
                <div className="flex justify-center mb-6">
                  <div className={clsx(
                    'w-16 h-16 rounded-xl flex items-center justify-center text-white transform transition-transform duration-300 group-hover:scale-110',
                    'bg-gradient-to-r', metric.color
                  )}>
                    {metric.icon}
                  </div>
                </div>
                
                <div className={clsx(
                  'text-4xl md:text-5xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r',
                  metric.color
                )}>
                  {metric.value}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wider">{metric.label}</h3>
                <p className="text-gray-300 text-base font-medium">{metric.desc}</p>

                {/* Animated Pulse Effect */}
                <div className={clsx(
                  'absolute top-4 right-4 w-3 h-3 rounded-full animate-pulse',
                  'bg-gradient-to-r', metric.color
                )}></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-2xl md:text-3xl font-bold text-white mb-6">
            Ready to be part of the <span className="text-green-400">winning team</span>?
          </p>
          <motion.a
            href="/signup"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(34, 197, 94, 0.5)" }}
            whileTap={{ scale: 0.98 }}
            className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-10 rounded-xl shadow-2xl text-xl transition-all duration-300"
          >
            JOIN THE ELITE TRADERS
          </motion.a>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  )
}
