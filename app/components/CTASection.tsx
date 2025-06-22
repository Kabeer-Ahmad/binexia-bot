'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function CTASection() {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 30 })
  const [activeUsers, setActiveUsers] = useState(847)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return { hours: 23, minutes: 59, seconds: 59 }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const userInterval = setInterval(() => {
      setActiveUsers(prev => prev + Math.floor(Math.random() * 3) + 1)
    }, 5000)
    return () => clearInterval(userInterval)
  }, [])

  return (
    <section
      id="cta"
      className="bg-gradient-to-br from-black via-gray-900 to-black text-white py-24 px-6 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Urgency Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-3 bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-full px-6 py-3 mb-6">
            <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
            <span className="text-red-400 font-bold text-lg">LIMITED TIME OFFER ENDS IN</span>
          </div>
          
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-4 min-w-[80px]">
              <div className="text-3xl font-black text-white">{String(timeLeft.hours).padStart(2, '0')}</div>
              <div className="text-red-200 text-sm">HOURS</div>
            </div>
            <div className="text-3xl text-red-400">:</div>
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-4 min-w-[80px]">
              <div className="text-3xl font-black text-white">{String(timeLeft.minutes).padStart(2, '0')}</div>
              <div className="text-red-200 text-sm">MINS</div>
            </div>
            <div className="text-3xl text-red-400">:</div>
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-4 min-w-[80px]">
              <div className="text-3xl font-black text-white">{String(timeLeft.seconds).padStart(2, '0')}</div>
              <div className="text-red-200 text-sm">SECS</div>
            </div>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
              DON&apos;T MISS OUT!
            </span>
            <br />
            <span className="text-white">Your Fortune</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
              Awaits You
            </span>
          </h2>

          <p className="text-2xl md:text-3xl text-gray-300 mb-4 max-w-4xl mx-auto">
            Join <strong className="text-green-400">{activeUsers.toLocaleString()} traders</strong> who are making <strong className="text-green-400">$5,000+ monthly</strong>
          </p>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            This exclusive offer expires in less than 24 hours. Don&apos;t let this life-changing opportunity slip away!
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16"
        >
          {/* Basic Plan */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-sm group-hover:blur-md transition-all duration-300"></div>
            <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">STARTER</h3>
                <div className="mb-6">
                  <span className="text-gray-400 text-lg line-through">$199</span>
                  <div className="text-4xl font-black text-white">$97</div>
                  <span className="text-gray-400">one-time</span>
                </div>
                <ul className="text-left space-y-3 mb-8 text-gray-300">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    Basic AI Signals
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    Email Support
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    1 Trading Platform
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    Basic Market Analysis
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    Trading Tutorials
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    Weekly Reports
                  </li>
                </ul>
                <a 
                  href="/signup"
                  className="w-full inline-block text-center bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300"
                >
                  START BASIC
                </a>
              </div>
            </div>
          </div>

          {/* Pro Plan - Featured */}
          <div className="relative group">
            {/* Popular Badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-2 px-6 rounded-full text-sm shadow-lg animate-pulse">
                🔥 MOST POPULAR
              </div>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/30 to-emerald-500/30 rounded-3xl blur-sm group-hover:blur-md transition-all duration-300"></div>
            <div className="relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl border-2 border-green-400/50 rounded-3xl p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 mb-2">PRO TRADER</h3>
                <div className="mb-6">
                  <span className="text-gray-400 text-lg line-through">$499</span>
                  <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">$197</div>
                  <span className="text-gray-400">one-time</span>
                  <div className="bg-red-500 text-white text-xs font-bold py-1 px-3 rounded-full inline-block ml-2">SAVE $302</div>
                </div>
                <ul className="text-left space-y-3 mb-8 text-gray-300">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <strong>Premium AI Signals (95%+ accuracy)</strong>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    24/7 VIP Support
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    All Trading Platforms
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    Auto-Trading Bot
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    Private Telegram Group
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    Risk Management Tools
                  </li>
                </ul>
                <motion.a
                  href="/signup"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(34, 197, 94, 0.6)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full inline-block text-center bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl shadow-2xl transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10">🚀 GET PRO ACCESS NOW</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Guarantee & Security */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-wrap justify-center items-center gap-8 text-gray-400 text-sm mb-12"
        >
          <div className="flex items-center gap-2">
            <span className="text-green-400 text-xl">🛡️</span>
            <span>30-Day Money Back Guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-400 text-xl">🔒</span>
            <span>Secure Payment Processing</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 text-xl">⭐</span>
            <span>4.9/5 Customer Rating</span>
          </div>
        </motion.div>

        {/* Final Warning */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-400/30 rounded-2xl p-6 max-w-3xl mx-auto"
        >
          <p className="text-xl md:text-2xl font-bold text-red-400 mb-2">
            ⚠️ WARNING: Price Returns to $499 After Timer Expires!
          </p>
          <p className="text-gray-300">
            This is your last chance to secure the Pro Trader package at this exclusive price. 
            Don&apos;t regret missing out on financial freedom!
          </p>
        </motion.div>
      </div>
    </section>
  )
}
