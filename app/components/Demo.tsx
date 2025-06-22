'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Demo() {
  const [liveData, setLiveData] = useState({
    profit: 1247.82,
    trades: 34,
    winRate: 97.1,
    balance: 8924.45
  })

  const [isTrading, setIsTrading] = useState(false)

  // Simulate live trading data
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => ({
        profit: prev.profit + (Math.random() * 20 + 5),
        trades: prev.trades + (Math.random() > 0.7 ? 1 : 0),
        winRate: Math.min(prev.winRate + (Math.random() * 0.2 - 0.1), 99.9),
        balance: prev.balance + (Math.random() * 15 + 3)
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  // Simulate trading status
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTrading(prev => !prev)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const trades = [
    { pair: 'EUR/USD', action: 'BUY', profit: '+$127.50', time: '2 min ago', status: 'win' },
    { pair: 'GBP/JPY', action: 'SELL', profit: '+$89.30', time: '5 min ago', status: 'win' },
    { pair: 'USD/CAD', action: 'BUY', profit: '+$156.70', time: '8 min ago', status: 'win' },
    { pair: 'AUD/USD', action: 'SELL', profit: '+$94.20', time: '12 min ago', status: 'win' },
    { pair: 'EUR/GBP', action: 'BUY', profit: '-$23.40', time: '15 min ago', status: 'loss' }
  ]

  return (
    <section id="demo" className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-blue-400 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 left-20 w-1 h-1 bg-yellow-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 mb-6">
            LIVE TRADING DEMO
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Watch our AI bot make <strong className="text-green-400">real profits</strong> in real-time
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Trading Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl h-full flex flex-col"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-black text-white">Trading Dashboard</h3>
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold ${
                isTrading ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  isTrading ? 'bg-green-400 animate-pulse' : 'bg-yellow-400 animate-bounce'
                }`}></div>
                {isTrading ? 'TRADING' : 'ANALYZING'}
              </div>
            </div>

            <div className="flex-grow">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-400/30 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-green-400 font-semibold">Today&apos;s Profit</span>
                  </div>
                  <div className="text-2xl font-black text-white">+${liveData.profit.toFixed(2)}</div>
                </div>

                <div className="bg-gradient-to-br from-blue-500/20 to-cyan-600/20 border border-blue-400/30 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-blue-400 font-semibold">Trades</span>
                  </div>
                  <div className="text-2xl font-black text-white">{liveData.trades}</div>
                </div>

                <div className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 border border-purple-400/30 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-purple-400 font-semibold">Win Rate</span>
                  </div>
                  <div className="text-2xl font-black text-white">{liveData.winRate.toFixed(1)}%</div>
                </div>

                <div className="bg-gradient-to-br from-yellow-500/20 to-orange-600/20 border border-yellow-400/30 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-yellow-400 font-semibold">Balance</span>
                  </div>
                  <div className="text-2xl font-black text-white">${liveData.balance.toFixed(2)}</div>
                </div>
              </div>

              {/* Charts Container */}
              <div className="space-y-4">
                {/* Profit Chart */}
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-400">Profit Chart (24h)</span>
                    <div className="flex items-center gap-1 text-green-400 text-sm">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      +142.8%
                    </div>
                  </div>
                  <div className="h-24 bg-gradient-to-b from-gray-700/30 to-gray-800/30 rounded-lg relative overflow-hidden">
                    <svg className="w-full h-full">
                      <defs>
                        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#10b981" stopOpacity="0.3"/>
                          <stop offset="100%" stopColor="#10b981" stopOpacity="0"/>
                        </linearGradient>
                      </defs>
                      
                      {/* Grid lines */}
                      <g stroke="#374151" strokeWidth="0.5" opacity="0.3">
                        <line x1="0" y1="25%" x2="100%" y2="25%"/>
                        <line x1="0" y1="50%" x2="100%" y2="50%"/>
                        <line x1="0" y1="75%" x2="100%" y2="75%"/>
                        <line x1="25%" y1="0" x2="25%" y2="100%"/>
                        <line x1="50%" y1="0" x2="50%" y2="100%"/>
                        <line x1="75%" y1="0" x2="75%" y2="100%"/>
                      </g>
                      
                      {/* Chart area fill */}
                      <path
                        d="M0,100 L0,85 Q10,80 20,75 T40,70 T60,60 T80,55 T100,45 L100,100 Z"
                        fill="url(#chartGradient)"
                      />
                      
                      {/* Chart line */}
                      <path
                        d="M0,85 Q10,80 20,75 T40,70 T60,60 T80,55 T100,45"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2"
                        className="animate-pulse"
                      />
                      
                      {/* Data points */}
                      <circle cx="20%" cy="75%" r="2" fill="#10b981">
                        <animate attributeName="r" values="2;3;2" dur="2s" repeatCount="indefinite"/>
                      </circle>
                      <circle cx="40%" cy="70%" r="2" fill="#10b981">
                        <animate attributeName="r" values="2;3;2" dur="2s" repeatCount="indefinite" begin="0.5s"/>
                      </circle>
                      <circle cx="60%" cy="60%" r="2" fill="#10b981">
                        <animate attributeName="r" values="2;3;2" dur="2s" repeatCount="indefinite" begin="1s"/>
                      </circle>
                      <circle cx="80%" cy="55%" r="2" fill="#10b981">
                        <animate attributeName="r" values="2;3;2" dur="2s" repeatCount="indefinite" begin="1.5s"/>
                      </circle>
                      
                      {/* Live indicator */}
                      <circle cx="100%" cy="45%" r="3" fill="#22c55e">
                        <animate attributeName="r" values="3;5;3" dur="1s" repeatCount="indefinite"/>
                        <animate attributeName="opacity" values="1;0.5;1" dur="1s" repeatCount="indefinite"/>
                      </circle>
                    </svg>
                  </div>
                </div>

                {/* Market Analysis Chart */}
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-400">Market Analysis (Live)</span>
                    <div className="flex items-center gap-1 text-blue-400 text-sm">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                      </svg>
                      BULLISH
                    </div>
                  </div>
                  <div className="h-24 bg-gradient-to-b from-gray-700/30 to-gray-800/30 rounded-lg relative overflow-hidden">
                    <svg className="w-full h-full">
                      <defs>
                        <linearGradient id="marketGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
                          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
                        </linearGradient>
                      </defs>
                      
                      {/* Grid lines */}
                      <g stroke="#374151" strokeWidth="0.5" opacity="0.3">
                        <line x1="0" y1="25%" x2="100%" y2="25%"/>
                        <line x1="0" y1="50%" x2="100%" y2="50%"/>
                        <line x1="0" y1="75%" x2="100%" y2="75%"/>
                        <line x1="25%" y1="0" x2="25%" y2="100%"/>
                        <line x1="50%" y1="0" x2="50%" y2="100%"/>
                        <line x1="75%" y1="0" x2="75%" y2="100%"/>
                      </g>
                      
                      {/* Chart area fill */}
                      <path
                        d="M0,100 L0,70 Q15,65 30,55 T50,45 T70,40 T90,35 T100,30 L100,100 Z"
                        fill="url(#marketGradient)"
                      />
                      
                      {/* Chart line */}
                      <path
                        d="M0,70 Q15,65 30,55 T50,45 T70,40 T90,35 T100,30"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="2"
                        className="animate-pulse"
                      />
                      
                      {/* Data points with different animation timing */}
                      <circle cx="30%" cy="55%" r="2" fill="#3b82f6">
                        <animate attributeName="r" values="2;3;2" dur="1.5s" repeatCount="indefinite"/>
                      </circle>
                      <circle cx="50%" cy="45%" r="2" fill="#3b82f6">
                        <animate attributeName="r" values="2;3;2" dur="1.5s" repeatCount="indefinite" begin="0.3s"/>
                      </circle>
                      <circle cx="70%" cy="40%" r="2" fill="#3b82f6">
                        <animate attributeName="r" values="2;3;2" dur="1.5s" repeatCount="indefinite" begin="0.6s"/>
                      </circle>
                      <circle cx="90%" cy="35%" r="2" fill="#3b82f6">
                        <animate attributeName="r" values="2;3;2" dur="1.5s" repeatCount="indefinite" begin="0.9s"/>
                      </circle>
                      
                      {/* Live indicator */}
                      <circle cx="100%" cy="30%" r="3" fill="#60a5fa">
                        <animate attributeName="r" values="3;5;3" dur="0.8s" repeatCount="indefinite"/>
                        <animate attributeName="opacity" values="1;0.5;1" dur="0.8s" repeatCount="indefinite"/>
                      </circle>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Recent Trades */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl h-full flex flex-col"
          >
            <h3 className="text-2xl font-black text-white mb-8">Recent Trades</h3>
            
            <div className="flex-grow">
              <div className="space-y-4">
                {trades.map((trade, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center justify-between p-4 rounded-xl border ${
                      trade.status === 'win' 
                        ? 'bg-green-500/10 border-green-400/30' 
                        : 'bg-red-500/10 border-red-400/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        trade.status === 'win' ? 'bg-green-400' : 'bg-red-400'
                      }`}></div>
                      <div>
                        <div className="text-white font-bold">{trade.pair}</div>
                        <div className="text-sm text-gray-400">{trade.action} • {trade.time}</div>
                      </div>
                    </div>
                    <div className={`font-black text-lg ${
                      trade.status === 'win' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {trade.profit}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 text-center"
            >
              <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-400/30 rounded-xl p-6">
                <div className="text-3xl font-black text-green-400 mb-2">87.5%</div>
                <div className="text-sm text-gray-400">Win Rate Today</div>
                <div className="text-lg text-white font-bold mt-2">
                  34 Wins • 5 Losses
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-black text-white mb-4 flex items-center justify-center gap-3">
              <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              START YOUR OWN PROFITABLE JOURNEY
            </h3>
            <p className="text-xl text-gray-300 mb-6">
              This could be <strong className="text-green-400">YOUR</strong> trading account in just 
              <strong className="text-yellow-400"> 24 hours</strong>
            </p>
            <motion.a
              href="/signup"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(34, 197, 94, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-black py-4 px-8 rounded-xl shadow-2xl text-lg transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              JOIN NOW & START EARNING
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
