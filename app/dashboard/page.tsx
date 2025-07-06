// app/dashboard/page.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

const PLATFORMS = ['Quotex', 'Binomo', 'IQ Option']
const DURATIONS = ['5 sec', '10 sec', '15 sec', '30 sec', '1 min', '2 min', '5 min']
const CURRENCIES = [
  "USD/BDT (OTC)", "USD/PKR (OTC)", "USD/TRY (OTC)", "USD/COP (OTC)", "USD/BRL (OTC)",
  "NZD/USD (OTC)", "GBP/NZD (OTC)", "USD/DZD (OTC)", "EUR/JPY", "CAD/JPY", "USD/ZAR (OTC)",
  "NZD/JPY (OTC)", "USD/PHP (OTC)", "USD/NGN (OTC)", "NZD/CAD (OTC)", "NZD/CHF (OTC)",
  "USD/EGP (OTC)", "EUR/GBP", "GBP/JPY", "CAD/CHF (OTC)", "USD/ARS (OTC)", "USD/IDR (OTC)",
  "USD/INR (OTC)", "USD/MXN (OTC)", "EUR/AUD", "EUR/NZD (OTC)", "GBP/CAD", "USD/JPY",
  "EUR/USD", "GBP/USD", "EUR/SGD (OTC)", "CHF/JPY", "EUR/CAD", "AUD/NZD (OTC)", "AUD/CHF",
  "EUR/CHF", "AUD/JPY", "GBP/CHF", "USD/CAD", "AUD/CAD", "GBP/AUD", "USD/CHF", "AUD/USD"
]

const PLATFORM_ICONS: Record<string, string> = {
  Quotex: '/quotex.svg',
  Binomo: '/binomo.png',
  'IQ Option': '/iqoption.png'
}

// Enhanced interface for signal history
interface SignalHistory {
  id: string
  platform: string
  currency: string
  duration: string
  signal: 'UP' | 'DOWN'
  timestamp: Date
  result?: 'WIN' | 'LOSS' | 'PENDING'
  profit?: number
}

// Real-time activity interface
interface ActivityPopup {
  id: string
  type: 'WIN' | 'LOSS' | 'SIGNAL'
  message: string
  amount?: number
  platform?: string
  currency?: string
  timestamp: Date
}

// Trading statistics interface
interface TradingStats {
  totalTrades: number
  winRate: number
  totalProfit: number
  consecutiveWins: number
  consecutiveLosses: number
  bestStreak: number
  averageProfit: number
}

const Dropdown = ({ label, options, value, setValue }: any) => {
  const [open, setOpen] = useState(false)
  const renderRow = (opt: string) => (
    <li
      key={opt}
      onClick={() => { setValue(opt); setOpen(false) }}
      className="px-4 py-2 hover:bg-indigo-50 cursor-pointer flex items-center gap-2 text-sm text-gray-900"
    >
      {label === 'Platform' && (
        <img src={PLATFORM_ICONS[opt]} alt={opt} className="w-5 h-5" />
      )}
      {opt}
    </li>
  )

  return (
    <div className="w-full text-left relative">
      <label className="text-xs font-medium tracking-wide text-indigo-200">{label}</label>
      <button
        type="button"
        className="mt-1 w-full bg-white/90 text-gray-900 px-4 py-3 rounded-xl backdrop-blur-md shadow-inner flex justify-between items-center"
        onClick={() => setOpen(!open)}
      >
        <span className="flex items-center gap-2">
          {label === 'Platform' && value && (
            <img src={PLATFORM_ICONS[value]} alt="" className="w-5 h-5" />
          )}
          {value || `Select ${label}`}
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }}>▼</motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="absolute z-20 mt-2 bg-white rounded-xl shadow-lg w-full max-h-60 overflow-y-auto border"
          >
            {options.map(renderRow)}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

// Live Profits Section Component - Only showing profit trades with icons
const LiveProfitsSection = ({ activities }: { activities: ActivityPopup[] }) => {
  const profitActivities = activities.filter(activity => activity.type === 'WIN')
  
  return (
    <div className="bg-black/30 backdrop-blur-md border border-gray-700/50 rounded-xl p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-4">
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
        <h3 className="text-base sm:text-lg font-semibold text-white">Live Profit Activity</h3>
      </div>
      <div className="space-y-3 max-h-60 sm:max-h-80 overflow-y-auto">
        <AnimatePresence>
          {profitActivities.slice(0, 6).map((activity) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs sm:text-sm font-medium text-white truncate">{activity.message}</div>
                    <div className="text-xs text-gray-400 truncate">{activity.platform} • {activity.currency}</div>
                  </div>
                </div>
                <div className="text-right ml-2">
                  {activity.amount && (
                    <div className="text-xs sm:text-sm font-bold text-green-300">
                      ${activity.amount.toFixed(2)}
                    </div>
                  )}
                  <div className="text-xs text-gray-400">
                    {activity.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

// Signal History Component
const SignalHistory = ({ history }: { history: SignalHistory[] }) => (
  <div className="bg-black/30 backdrop-blur-md border border-gray-700/50 rounded-xl p-4">
    <h3 className="text-base sm:text-lg font-semibold text-white mb-4">Recent Signals</h3>
    <div className="space-y-2 max-h-60 overflow-y-auto">
      {history.slice(0, 8).map((signal, index) => (
        <motion.div
          key={signal.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg"
        >
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full flex-shrink-0 ${signal.signal === 'UP' ? 'bg-green-400' : 'bg-red-400'}`} />
            <div className="min-w-0 flex-1">
              <div className="text-xs sm:text-sm font-medium text-white truncate">{signal.currency}</div>
              <div className="text-xs text-gray-400 truncate">{signal.platform} • {signal.duration}</div>
            </div>
          </div>
          <div className="text-right ml-2 flex-shrink-0">
            <div className={`text-xs sm:text-sm font-bold ${signal.signal === 'UP' ? 'text-green-400' : 'text-red-400'}`}>
              {signal.signal}
            </div>
            <div className="text-xs text-gray-400">
              {signal.timestamp.toLocaleTimeString()}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
)

export default function DashboardPage() {
  const router = useRouter()
  const [platform, setPlatform] = useState('')
  const [currency, setCurrency] = useState('')
  const [duration, setDuration] = useState('')
  const [loading, setLoading] = useState(false)
  const [signal, setSignal] = useState('')
  const [timer, setTimer] = useState<number | null>(null)
  const [signalHistory, setSignalHistory] = useState<SignalHistory[]>([])
  const [activities, setActivities] = useState<ActivityPopup[]>([])

  // Generate random user activities (only profits)
  const generateActivity = () => {
    const names = ['Alex', 'Sarah', 'Mike', 'Emma', 'David', 'Lisa', 'John', 'Anna', 'Tom', 'Maria']
    const platforms = ['Quotex', 'Binomo', 'IQ Option']
    const currencies = ['EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD']
    const randomAmount = Math.floor(Math.random() * 500) + 50

    const randomName = names[Math.floor(Math.random() * names.length)]
    const randomPlatform = platforms[Math.floor(Math.random() * platforms.length)]
    const randomCurrency = currencies[Math.floor(Math.random() * currencies.length)]

    const message = `${randomName} just won $${randomAmount} on ${randomPlatform}!`

    const newActivity: ActivityPopup = {
      id: Date.now().toString(),
      type: 'WIN',
      message,
      amount: randomAmount,
      platform: randomPlatform,
      currency: randomCurrency,
      timestamp: new Date()
    }

    setActivities(prev => [newActivity, ...prev.slice(0, 19)]) // Keep only last 20 activities
  }

  useEffect(() => {
    const gate = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.replace('/signin'); return }
      const { data: usr } = await supabase.from('users').select('payment_status').eq('id', user.id).single()
      if (usr && usr.payment_status !== 'yes') {
        router.replace('/payment-plan')
        return
      }
      const { data: pr } = await supabase
        .from('payment_requests')
        .select('status')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()
      if (!pr) { router.replace('/payment-plan'); return }
      if (pr.status === 'pending') { router.replace('/pending'); return }
    }
    gate()
    
    // Generate initial activities
    for (let i = 0; i < 8; i++) {
      setTimeout(() => generateActivity(), i * 1500)
    }
    
    // Generate new activities every 4-10 seconds
    const activityInterval = setInterval(() => {
      if (Math.random() > 0.4) { // 60% chance to generate activity
        generateActivity()
      }
    }, Math.random() * 6000 + 4000)
    
    return () => clearInterval(activityInterval)
  }, [router])

  useEffect(() => {
    const id = timer && timer > 0
      ? setInterval(() => setTimer(t => (t! > 0 ? t! - 1 : 0)), 1000)
      : undefined
    if (timer === 0) { 
      setSignal(''); 
      setTimer(null)
    }
    return () => id && clearInterval(id)
  }, [timer])

  const handleGetSignal = () => {
    if (!platform || !currency || !duration) {
      alert('Please select all options.')
      return
    }
    setLoading(true); setSignal(''); setTimer(null)
    
    setTimeout(() => {
      const dir = Math.random() > 0.5 ? 'UP' : 'DOWN'
      setSignal(dir)
      const n = parseInt(duration)
      const secs = duration.includes('min') ? n * 60 : n
      setTimer(secs)
      setLoading(false)
      
      // Add to signal history
      const newSignal: SignalHistory = {
        id: Date.now().toString(),
        platform,
        currency,
        duration,
        signal: dir as 'UP' | 'DOWN',
        timestamp: new Date(),
        result: 'PENDING'
      }
      setSignalHistory(prev => [newSignal, ...prev])
    }, 2000)
  }

  return (
    <section className="relative min-h-screen px-3 sm:px-4 py-12 sm:py-20 overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-indigo-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff0c_1px,transparent_1px)] [background-size:26px_26px]" />

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }} 
        className="relative max-w-7xl mx-auto"
      >
        <h1 className="text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 sm:mb-8">
          Binexia Trading Console
        </h1>

        {/* Main Trading Interface */}
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Column - Trading Controls */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, x: -40 }} 
              animate={{ opacity: 1, x: 0 }} 
              className="bg-black/50 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl space-y-4 sm:space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <Dropdown label="Platform" options={PLATFORMS} value={platform} setValue={setPlatform} />
                <Dropdown label="Trade Duration" options={DURATIONS} value={duration} setValue={setDuration} />
                <div className="sm:col-span-2">
                  <Dropdown label="Currency Pair" options={CURRENCIES} value={currency} setValue={setCurrency} />
                </div>
              </div>

              <button 
                onClick={handleGetSignal} 
                disabled={loading}
                className="w-full py-3 sm:py-4 bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold shadow-lg text-sm sm:text-base"
              >
                {loading ? 'Analyzing…' : 'Get Signal'}
              </button>

              {loading && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="text-center space-y-2"
                >
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-indigo-400"></div>
                  </div>
                  <p className="text-xs sm:text-sm text-indigo-200">
                    Crunching historical data, scanning order books…
                  </p>
                </motion.div>
              )}

              {signal && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  className="text-center space-y-4 sm:space-y-6"
                >
                  {/* Enhanced Signal Display */}
                  <div className={`relative p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl ${
                    signal === 'UP' 
                      ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30' 
                      : 'bg-gradient-to-br from-red-500/20 to-pink-500/20 border border-red-500/30'
                  }`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
                    <div className="relative z-10">
                      <div className={`text-4xl sm:text-5xl lg:text-6xl font-black mb-3 sm:mb-4 ${
                        signal === 'UP' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {signal}
                      </div>
                      <div className="text-sm sm:text-base lg:text-lg text-gray-300">
                        {currency} • {duration} • {platform}
                      </div>
                    </div>
                  </div>

                  {timer !== null && (
                    <div className="space-y-3 sm:space-y-4">
                      <div className="text-center">
                        <p className="text-sm sm:text-base lg:text-lg text-indigo-200 mb-2">⏳ Time Remaining</p>
                        <div className="text-2xl sm:text-3xl font-bold text-white">{timer}s</div>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 sm:h-3 overflow-hidden">
                        <motion.div
                          className={`h-2 sm:h-3 rounded-full ${
                            signal === 'UP' 
                              ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                              : 'bg-gradient-to-r from-red-500 to-pink-500'
                          }`}
                          initial={{ width: '100%' }}
                          animate={{ width: '0%' }}
                          transition={{ duration: timer || 0, ease: 'linear' }}
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Right Column - Live Profits & History */}
          <div className="space-y-4 sm:space-y-6">
            <LiveProfitsSection activities={activities} />
            <SignalHistory history={signalHistory} />
          </div>
        </div>
      </motion.div>

      {/* Enhanced Risk-Management Academy */}
      <div className="mt-16 sm:mt-20 lg:mt-24 max-w-6xl mx-auto px-3 sm:px-4">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-2xl sm:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-lime-400 mb-3 sm:mb-4"
        >
          🛡️ Risk-Management Academy
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-gray-300 mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base"
        >
          Master the art of capital preservation with proven strategies used by professional traders
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[
            { 
              title: '🎯 1% Rule', 
              desc: 'Never risk more than 1% of your total capital on any single trade. This ensures you can survive losing streaks.',
              icon: '💰',
              color: 'from-green-500/20 to-green-600/20',
              border: 'border-green-500/30'
            },
            { 
              title: '🛑 Stop-Loss Discipline', 
              desc: 'Set your stop-loss before entering any trade. Never move it wider - only tighter. Your emotions are not your friend.',
              icon: '🛡️',
              color: 'from-red-500/20 to-red-600/20',
              border: 'border-red-500/30'
            },
            { 
              title: '🧠 Emotion Control', 
              desc: 'Stick to your trading plan religiously. Avoid revenge trading after losses. The market doesn\'t care about your feelings.',
              icon: '🧘',
              color: 'from-blue-500/20 to-blue-600/20',
              border: 'border-blue-500/30'
            },
            { 
              title: '📊 Trade Journal', 
              desc: 'Document every trade with entry/exit reasons, emotions, and outcomes. Patterns emerge that can refine your strategy.',
              icon: '📝',
              color: 'from-purple-500/20 to-purple-600/20',
              border: 'border-purple-500/30'
            },
            { 
              title: '⚖️ Position Sizing', 
              desc: 'Calculate position size based on your risk tolerance and account size. Bigger isn\'t always better.',
              icon: '⚖️',
              color: 'from-orange-500/20 to-orange-600/20',
              border: 'border-orange-500/30'
            },
            { 
              title: '🚪 Daily Loss Cap', 
              desc: 'Set a maximum daily loss limit. When you hit it, walk away. Tomorrow is another trading day.',
              icon: '🚪',
              color: 'from-pink-500/20 to-pink-600/20',
              border: 'border-pink-500/30'
            }
          ].map((tip, i) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`bg-gradient-to-br ${tip.color} backdrop-blur-xl ${tip.border} rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md space-y-3 sm:space-y-4 hover:scale-105 transition-transform duration-300`}
            >
              <div className="text-2xl sm:text-3xl">{tip.icon}</div>
              <h3 className="font-bold text-lg sm:text-xl text-white">{tip.title}</h3>
              <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">{tip.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>  

      {/* Enhanced Coming Soon Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-20 sm:mt-24 lg:mt-32 max-w-5xl mx-auto px-3 sm:px-4"
      >
        <div className="text-center space-y-4 sm:space-y-6 mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-500 to-indigo-400">
            🚀 More Features & Platforms Coming Soon
          </h2>
          <p className="text-gray-300 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed">
            We're constantly evolving to bring you the most advanced trading tools and platform integrations. 
            Our development team is working around the clock to deliver cutting-edge features that will revolutionize your trading experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* New Platforms */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">🔄 New Platform Integrations</h3>
            {[
              { name: 'Pocket Option', status: 'In QA', eta: 'July 2025', progress: 85, color: 'from-blue-500 to-cyan-500' },
              { name: 'Olymp Trade', status: 'In Development', eta: 'August 2025', progress: 65, color: 'from-green-500 to-emerald-500' },
              { name: 'Deriv', status: 'Planned', eta: 'September 2025', progress: 30, color: 'from-purple-500 to-pink-500' },
              { name: 'Spectre.ai', status: 'Planned', eta: 'October 2025', progress: 15, color: 'from-orange-500 to-red-500' }
            ].map((platform, i) => (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-black/30 backdrop-blur-lg border border-gray-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-base sm:text-lg font-bold text-white">{platform.name}</h4>
                  <span className="text-xs sm:text-sm text-gray-400">{platform.status}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-300">Progress</span>
                    <span className="text-gray-300">{platform.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      className={`bg-gradient-to-r ${platform.color} h-2 rounded-full`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${platform.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.2 }}
                    />
                  </div>
                  <p className="text-xs text-gray-400">ETA: {platform.eta}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* New Features */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">⚡ Advanced Features</h3>
            {[
              { feature: 'AI Chart Analysis', desc: 'Machine learning-powered chart pattern recognition', icon: '🤖' },
              { feature: 'Hedging Tools', desc: 'Advanced risk management with multi-pair hedging', icon: '🛡️' },
              { feature: 'Social Trading', desc: 'Follow and copy successful traders automatically', icon: '👥' },
              { feature: 'Portfolio Analytics', desc: 'Comprehensive performance tracking and analysis', icon: '📊' },
              { feature: 'Mobile App', desc: 'Trade on-the-go with our native mobile application', icon: '📱' },
              { feature: 'API Integration', desc: 'Connect your own trading bots and strategies', icon: '🔌' }
            ].map((feature, i) => (
              <motion.div
                key={feature.feature}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-lg border border-indigo-500/30 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:from-indigo-500/20 hover:to-purple-500/20 transition-all duration-300"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="text-xl sm:text-2xl">{feature.icon}</div>
                  <div>
                    <h4 className="font-semibold text-white text-sm sm:text-base">{feature.feature}</h4>
                    <p className="text-xs sm:text-sm text-gray-300">{feature.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 sm:mt-12 text-center"
        >
          <p className="text-gray-300 text-xs sm:text-sm">
            💡 Have a feature request? We'd love to hear from you! Join our community and help shape the future of Binexia.
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
