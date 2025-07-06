'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

// Trading pairs and realistic data - moved outside component to avoid dependency issues
const tradingPairs = [
  'EUR/USD', 'GBP/JPY', 'BTC/USD', 'ETH/USD', 'USD/JPY', 'AUD/USD', 'GBP/USD', 
  'USD/CHF', 'CAD/JPY', 'EUR/GBP', 'XAU/USD', 'OIL/USD', 'SPX500', 'NAS100'
]

export default function Hero() {
  const [currentProfit, setCurrentProfit] = useState(0)
  const [displayMetrics, setDisplayMetrics] = useState({
    totalUsers: 1247,
    totalProfits: 2.5,
    winRate: 95.7
  })
  
  const [liveTradeData, setLiveTradeData] = useState({
    card1: { pair: 'EUR/USD', profit: 1247.50, time: '2m ago', status: 'WIN' },
    card2: { pair: 'GBP/JPY', profit: 892.30, time: '4m ago', status: 'WIN' },
    card3: { pair: 'BTC/USD', profit: 2156.80, time: '1m ago', status: 'WIN' }
  })
  
  const [liveIndicators, setLiveIndicators] = useState({
    signal1: 'STRONG BUY',
    signal2: 'LIVE',
    timestamp: new Date().toLocaleTimeString()
  })
  
  useEffect(() => {
    // Update live profit counter
    const profitInterval = setInterval(() => {
      setCurrentProfit(prev => prev + Math.random() * 50 + 10)
    }, 2000)
    
    // Update trading cards data
    const tradeInterval = setInterval(() => {
      setLiveTradeData({
        card1: {
          pair: tradingPairs[Math.floor(Math.random() * tradingPairs.length)],
          profit: Math.random() * 2000 + 500,
          time: `${Math.floor(Math.random() * 10 + 1)}m ago`,
          status: Math.random() > 0.1 ? 'WIN' : 'LOSS'
        },
        card2: {
          pair: tradingPairs[Math.floor(Math.random() * tradingPairs.length)],
          profit: Math.random() * 1500 + 300,
          time: `${Math.floor(Math.random() * 15 + 1)}m ago`,
          status: Math.random() > 0.1 ? 'WIN' : 'LOSS'
        },
        card3: {
          pair: tradingPairs[Math.floor(Math.random() * tradingPairs.length)],
          profit: Math.random() * 3000 + 800,
          time: `${Math.floor(Math.random() * 8 + 1)}m ago`,
          status: Math.random() > 0.1 ? 'WIN' : 'LOSS'
        }
      })
    }, 4000)
    
    // Update metrics slightly
    const metricsInterval = setInterval(() => {
      setDisplayMetrics(prev => ({
        totalUsers: prev.totalUsers + Math.floor(Math.random() * 3),
        totalProfits: prev.totalProfits + Math.random() * 0.1,
        winRate: Math.min(Math.max(prev.winRate + (Math.random() - 0.5) * 0.2, 94.5), 96.8)
      }))
    }, 8000)
    
    // Update live indicators
    const indicatorInterval = setInterval(() => {
      const signals = ['STRONG BUY', 'BUY', 'HOLD', 'STRONG BUY', 'BULLISH']
      const liveStates = ['LIVE', 'ACTIVE', 'ONLINE', 'TRADING']
      
      setLiveIndicators({
        signal1: signals[Math.floor(Math.random() * signals.length)],
        signal2: liveStates[Math.floor(Math.random() * liveStates.length)],
        timestamp: new Date().toLocaleTimeString()
      })
    }, 6000)
    
    return () => {
      clearInterval(profitInterval)
      clearInterval(tradeInterval)
      clearInterval(metricsInterval)
      clearInterval(indicatorInterval)
    }
  }, [])

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex flex-col items-center justify-center text-center px-4 py-20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-blue-400 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 left-20 w-1 h-1 bg-yellow-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
      </div>

      {/* 3D Floating Trading Cards - Real-time Updates */}
      <motion.div
        initial={{ opacity: 0, x: -200, rotateY: -45 }}
        animate={{ opacity: 1, x: 0, rotateY: 0 }}
        transition={{ delay: 1.5, duration: 1.2, type: "spring", bounce: 0.3 }}
        className="absolute top-24 left-4 md:left-16 bg-gradient-to-br from-green-500/20 to-emerald-600/20 backdrop-blur-sm border border-green-400/30 rounded-xl p-4 shadow-2xl transform-gpu z-10"
        style={{ transform: 'perspective(1000px) rotateY(15deg) rotateX(5deg)' }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-green-400 text-sm font-bold"
        >
          <motion.div
            key={liveTradeData.card1.pair}
            initial={{ scale: 1.1, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {liveTradeData.card1.pair}
          </motion.div>
          <motion.div 
            key={liveTradeData.card1.profit}
            initial={{ scale: 1.2, color: liveTradeData.card1.status === 'WIN' ? "#22c55e" : "#ef4444" }}
            animate={{ scale: 1, color: "#ffffff" }}
            transition={{ duration: 0.3 }}
            className="text-white text-lg font-black"
          >
            {liveTradeData.card1.status === 'WIN' ? '+' : '-'}${Math.abs(liveTradeData.card1.profit).toFixed(2)}
          </motion.div>
          <div className={`text-xs ${liveTradeData.card1.status === 'WIN' ? 'text-green-300' : 'text-red-300'}`}>
            {liveTradeData.card1.status} • {liveTradeData.card1.time}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 200, rotateY: 45 }}
        animate={{ opacity: 1, x: 0, rotateY: 0 }}
        transition={{ delay: 2, duration: 1.2, type: "spring", bounce: 0.3 }}
        className="absolute top-40 right-4 md:right-16 bg-gradient-to-br from-blue-500/20 to-cyan-600/20 backdrop-blur-sm border border-blue-400/30 rounded-xl p-4 shadow-2xl transform-gpu z-10"
        style={{ transform: 'perspective(1000px) rotateY(-15deg) rotateX(5deg)' }}
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="text-blue-400 text-sm font-bold"
        >
          <motion.div
            key={liveTradeData.card2.pair}
            initial={{ scale: 1.1, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {liveTradeData.card2.pair}
          </motion.div>
          <motion.div 
            key={liveTradeData.card2.profit}
            initial={{ scale: 1.2, color: liveTradeData.card2.status === 'WIN' ? "#22c55e" : "#ef4444" }}
            animate={{ scale: 1, color: "#ffffff" }}
            transition={{ duration: 0.3 }}
            className="text-white text-lg font-black"
          >
            {liveTradeData.card2.status === 'WIN' ? '+' : '-'}${Math.abs(liveTradeData.card2.profit).toFixed(2)}
          </motion.div>
          <div className={`text-xs ${liveTradeData.card2.status === 'WIN' ? 'text-blue-300' : 'text-red-300'}`}>
            {liveTradeData.card2.status} • {liveTradeData.card2.time}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 200, scale: 0.5 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 2.5, duration: 1, type: "spring", bounce: 0.4 }}
        className="absolute bottom-40 left-8 md:left-24 bg-gradient-to-br from-purple-500/20 to-pink-600/20 backdrop-blur-sm border border-purple-400/30 rounded-xl p-4 shadow-2xl transform-gpu z-10"
        style={{ transform: 'perspective(1000px) rotateY(10deg) rotateX(-5deg)' }}
      >
        <motion.div
          animate={{ y: [0, -12, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="text-purple-400 text-sm font-bold"
        >
          <motion.div
            key={liveTradeData.card3.pair}
            initial={{ scale: 1.1, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {liveTradeData.card3.pair}
          </motion.div>
          <motion.div 
            key={liveTradeData.card3.profit}
            initial={{ scale: 1.2, color: liveTradeData.card3.status === 'WIN' ? "#22c55e" : "#ef4444" }}
            animate={{ scale: 1, color: "#ffffff" }}
            transition={{ duration: 0.3 }}
            className="text-white text-lg font-black"
          >
            {liveTradeData.card3.status === 'WIN' ? '+' : '-'}${Math.abs(liveTradeData.card3.profit).toFixed(2)}
          </motion.div>
          <div className={`text-xs ${liveTradeData.card3.status === 'WIN' ? 'text-purple-300' : 'text-red-300'}`}>
            {liveTradeData.card3.status} • {liveTradeData.card3.time}
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Profit Bubbles */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3, duration: 0.8 }}
        className="absolute top-1/2 left-8 md:left-16 z-10"
      >
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            x: [0, 10, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="bg-gradient-to-r from-yellow-500/30 to-orange-500/30 backdrop-blur-sm border border-yellow-400/40 rounded-full p-3 shadow-xl"
        >
          <div className="text-yellow-400 text-xs font-bold text-center">
            +{displayMetrics.winRate.toFixed(1)}%
            <div className="text-white text-sm">WIN RATE</div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3.5, duration: 0.8 }}
        className="absolute top-1/3 right-12 md:right-24 z-10"
      >
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            x: [0, -8, 0],
            rotate: [0, -3, 0]
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="bg-gradient-to-r from-green-500/30 to-emerald-500/30 backdrop-blur-sm border border-green-400/40 rounded-full p-3 shadow-xl"
        >
          <div className="text-green-400 text-xs font-bold text-center">
            ${displayMetrics.totalProfits.toFixed(1)}M+
            <div className="text-white text-sm">PROFITS</div>
          </div>
        </motion.div>
      </motion.div>





      {/* 3D Trading Indicators */}
      <motion.div
        initial={{ opacity: 0, rotateX: -90 }}
        animate={{ opacity: 1, rotateX: 0 }}
        transition={{ delay: 4, duration: 1, type: "spring" }}
        className="absolute bottom-56 right-8 md:right-16 z-10"
      >
        <motion.div
          animate={{ 
            rotateY: [0, 360],
            y: [0, -5, 0]
          }}
          transition={{ 
            rotateY: { duration: 8, repeat: Infinity, ease: "linear" },
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          className="bg-gradient-to-br from-red-500/20 to-pink-600/20 backdrop-blur-sm border border-red-400/30 rounded-lg p-3 shadow-xl transform-gpu"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="text-red-400 text-sm font-bold text-center">
            {liveIndicators.signal2}
          </div>
        </motion.div>
      </motion.div>

      {/* Pulsing Success Indicators */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 5.5, duration: 0.6 }}
        className="absolute top-3/4 left-1/6 z-10"
      >
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="bg-green-500/30 backdrop-blur-sm border border-green-400/40 rounded-lg p-2 flex items-center justify-center shadow-lg"
        >
          <div className="text-green-400 text-xs font-bold text-center">
            {liveIndicators.signal1}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 6, duration: 0.6 }}
        className="absolute top-2/3 right-1/6 z-10"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          className="bg-blue-500/30 backdrop-blur-sm border border-blue-400/40 rounded-lg p-2 flex items-center justify-center shadow-lg"
        >
          <div className="text-blue-400 text-xs font-bold text-center">
            {liveIndicators.timestamp}
          </div>
        </motion.div>
      </motion.div>

      {/* Enhanced 3D Floating Profit Counter */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotateY: -45 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute top-16 right-4 md:right-16 transform-gpu z-20"
        style={{ transform: 'perspective(1000px) rotateX(10deg) rotateY(-10deg)' }}
      >
        <motion.div
          animate={{ 
            y: [0, -8, 0],
            rotateY: [0, 5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 backdrop-blur-sm border border-green-400/30 rounded-lg p-3 text-green-400 text-sm font-mono shadow-2xl"
        >
          <div className="flex items-center gap-2">
            <motion.svg 
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 text-green-400" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </motion.svg>
            <div>
              <div className="text-xs text-green-300">Live Profit</div>
              <motion.div
                key={Math.floor(currentProfit / 100)}
                initial={{ scale: 1.2, color: "#22c55e" }}
                animate={{ scale: 1, color: "#10b981" }}
                transition={{ duration: 0.3 }}
                className="font-black text-lg"
              >
                +${currentProfit.toFixed(2)}
              </motion.div>
            </div>
          </div>
          
          {/* Glowing effect */}
          <div className="absolute inset-0 bg-green-400/10 rounded-lg blur-md animate-pulse"></div>
        </motion.div>
      </motion.div>

{/* Main Content */}
<motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  className="relative z-10 pt-10 sm:pt-24"
>
  {/* Mobile-only translucent overlay for better readability */}
  <div className="block sm:hidden absolute inset-0 bg-black/30 backdrop-blur-[2px] rounded-lg z-[-1]" />

  {/* Premium Badge */}
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.5, duration: 0.6 }}
    className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 rounded-full px-4 py-2 mb-8 text-yellow-400 text-sm font-semibold"
  >
    <svg className="w-4 h-4 text-yellow-400 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
    #1 AI Trading Bot of 2025
  </motion.div>

  {/* Hero Heading */}
  <motion.h1
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay: 0.2 }}
    className="text-4xl sm:text-6xl md:text-7xl font-black mb-6 leading-tight"
  >
    Turn <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">$100</span> into
    <br />
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-600">$10,000+</span>
    <br />
    <span className="text-white">Every Month</span>
  </motion.h1>

  {/* Subtext */}
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6, duration: 0.8 }}
    className="text-xl md:text-2xl max-w-3xl text-gray-300 mb-4 leading-relaxed"
  >
    The <strong className="text-green-400">World&apos;s Most Profitable</strong> AI Trading Bot
  </motion.p>

  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8, duration: 0.8 }}
    className="text-lg md:text-xl max-w-2xl text-gray-400 mb-12"
  >
    95% Win Rate • Automated Trading • Zero Experience Required
  </motion.p>

  {/* CTA Buttons */}
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 1, duration: 0.6 }}
    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
  >
    <motion.a
      href="/signup"
      whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(34, 197, 94, 0.4)" }}
      whileTap={{ scale: 0.98 }}
      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-xl shadow-2xl text-lg relative overflow-hidden group flex items-center gap-3"
    >
      <svg className="w-6 h-6 relative z-10" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
      <span className="relative z-10">START EARNING NOW</span>
      <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </motion.a>

    <motion.a
      href="#demo"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className="bg-transparent border-2 border-white/30 hover:border-white text-white font-bold py-4 px-8 rounded-xl backdrop-blur-sm hover:bg-white/10 transition text-lg flex items-center gap-3"
    >
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
      </svg>
      Watch Live Demo
    </motion.a>
  </motion.div>

  {/* Trust Indicators */}
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.2, duration: 0.8 }}
    className="mt-16 flex flex-wrap justify-center items-center gap-8 text-gray-400 text-sm"
  >
    <div className="flex items-center gap-2">
      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
      <span>{displayMetrics.totalUsers.toLocaleString()} Active Users</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
      <span>${displayMetrics.totalProfits.toFixed(1)}M+ Total Profits</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
      <span>{displayMetrics.winRate.toFixed(1)}% Win Rate</span>
    </div>
  </motion.div>
</motion.div>

      {/* Enhanced 3D Floating Glow Effects */}
      <motion.div 
        animate={{ 
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"
      ></motion.div>
      
      <motion.div 
        animate={{ 
          x: [0, -40, 0],
          y: [0, 20, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
      ></motion.div>

      <motion.div 
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.3, 1]
        }}
        transition={{ 
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2"
      ></motion.div>

      {/* Enhanced 3D Glow Pulse */}
      <style jsx>{`
        section {
          position: relative;
          transform-style: preserve-3d;
        }
        
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

        section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(168, 85, 247, 0.05) 0%, transparent 50%);
          animation: floatingGradients 12s ease-in-out infinite;
          z-index: -2;
        }

        @keyframes pulseGlow {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1) rotateZ(0deg);
            opacity: 0.4;
          }
          25% {
            transform: translate(-50%, -50%) scale(1.1) rotateZ(90deg);
            opacity: 0.6;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2) rotateZ(180deg);
            opacity: 0.8;
          }
          75% {
            transform: translate(-50%, -50%) scale(1.1) rotateZ(270deg);
            opacity: 0.6;
          }
        }

        @keyframes floatingGradients {
          0%, 100% {
            transform: translateX(0) translateY(0) scale(1);
          }
          25% {
            transform: translateX(20px) translateY(-20px) scale(1.05);
          }
          50% {
            transform: translateX(-15px) translateY(15px) scale(0.95);
          }
          75% {
            transform: translateX(10px) translateY(-10px) scale(1.02);
          }
        }

        /* 3D Card hover effects */
        .transform-gpu {
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }
      `}</style>
    </section>
  )
}
