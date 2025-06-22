// app/dashboard/page.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

const PLATFORMS = ['Quotex', 'Binomo', 'IQ Option']
const DURATIONS = ['5 sec', '10 sec', '15 sec', '30 sec', '1 min', '2 min']
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

export default function DashboardPage() {
  const router = useRouter()
  const [platform, setPlatform] = useState('')
  const [currency, setCurrency] = useState('')
  const [duration, setDuration] = useState('')
  const [loading, setLoading] = useState(false)
  const [signal, setSignal] = useState('')
  const [timer, setTimer] = useState<number | null>(null)

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
  }, [router])

  useEffect(() => {
    const id = timer && timer > 0
      ? setInterval(() => setTimer(t => (t! > 0 ? t! - 1 : 0)), 1000)
      : undefined
    if (timer === 0) { setSignal(''); setTimer(null) }
    return () => id && clearInterval(id)
  }, [timer])

  const handleGetSignal = () => {
    if (!platform || !currency || !duration) {
      alert('Please select all options.')
      return
    }
    setLoading(true); setSignal(''); setTimer(null)
    setTimeout(() => {
      const dir = Math.random() > 0.5 ? '📈 UP' : '📉 DOWN'
      setSignal(dir)
      const n = parseInt(duration)
      const secs = duration.includes('min') ? n * 60 : n
      setTimer(secs)
      setLoading(false)
    }, 2000)
  }

  return (
    <section className="relative min-h-screen px-4 py-20 overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-indigo-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff0c_1px,transparent_1px)] [background-size:26px_26px]" />

      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative max-w-xl mx-auto bg-black/50 backdrop-blur-lg rounded-3xl p-10 shadow-2xl space-y-8">
        <h1 className="text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 text-4xl font-extrabold">
          Binexia Trading Console
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Dropdown label="Platform" options={PLATFORMS} value={platform} setValue={setPlatform} />
          <Dropdown label="Trade Duration" options={DURATIONS} value={duration} setValue={setDuration} />
          <div className="sm:col-span-2">
            <Dropdown label="Currency Pair" options={CURRENCIES} value={currency} setValue={setCurrency} />
          </div>
        </div>

        <button onClick={handleGetSignal} className="w-full py-4 bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:brightness-110 rounded-xl font-bold shadow-lg">
          {loading ? 'Analyzing…' : 'Get Signal'}
        </button>

        {loading && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-sm text-indigo-200">
            Crunching historical data, scanning order books…
          </motion.p>
        )}

        {signal && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
            <p className={`text-3xl font-black ${signal.includes('UP') ? 'text-green-400' : 'text-red-400'}`}>{signal}</p>
            {timer !== null && (
              <p className="mt-2 text-sm text-indigo-200">⏳ {timer}s left</p>
            )}
          </motion.div>
        )}
      </motion.div>

            {/* ───── Risk-Management Academy ───── */}
      <div className="mt-24 max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-lime-400 mb-10"
        >
          Risk-Management Academy
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: '1% Rule',              desc: 'Risk only 1 % of capital on any single trade.' },
            { title: 'Stop-Loss Discipline', desc: 'Set stops before entering, never move them wider.' },
            { title: 'Emotion Control',      desc: 'Stick to the plan; avoid revenge trading.' },
            { title: 'Trade Journal',        desc: 'Record every trade to spot mistakes & refine edge.' },
            { title: 'Avoid Over-Leverage',  desc: 'Leverage magnifies both gains and losses—stay modest.' },
            { title: 'Daily Loss Cap',       desc: 'Hit your max loss? Walk away and live to trade tomorrow.' }
          ].map((tip, i) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-black/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 shadow-md space-y-2"
            >
              <h3 className="font-bold text-lg text-teal-300">{tip.title}</h3>
              <p className="text-sm text-gray-300">{tip.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>  

<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  className="mt-32 max-w-3xl mx-auto text-center space-y-6"
>
  <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-500 to-indigo-400">
    More Features & Platforms Coming Soon 🚀
  </h2>
  <p className="text-gray-300 text-sm sm:text-base">
    We’re hard at work integrating <span className="font-semibold text-white">Pocket Option</span>,
    <span className="font-semibold text-white"> Olymp Trade</span>,
    <span className="font-semibold text-white"> Deriv</span>, and
    <span className="font-semibold text-white"> Spectre.ai</span>, along with advanced hedging tools,
    on-chart AI overlays and much more. <br className="hidden sm:inline" />
    Thanks for your incredible support & feedback — it helps us build a better Binexia for everyone!
  </p>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center">
    <div className="bg-black/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl px-6 py-4 shadow-md">
      <p className="text-lg font-bold text-indigo-300">✔️ Pocket Option</p>
      <p className="text-xs text-gray-400 mt-1">In QA · ETA July 2025</p>
    </div>
    <div className="bg-black/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl px-6 py-4 shadow-md">
      <p className="text-lg font-bold text-indigo-300">✔️ Olymp Trade</p>
      <p className="text-xs text-gray-400 mt-1">In Dev · ETA August 2025</p>
    </div>
    <div className="bg-black/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl px-6 py-4 shadow-md">
      <p className="text-lg font-bold text-indigo-300">✔️ Deriv</p>
      <p className="text-xs text-gray-400 mt-1">Planned · ETA September 2025</p>
    </div>
    <div className="bg-black/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl px-6 py-4 shadow-md">
      <p className="text-lg font-bold text-indigo-300">✔️ Spectre.ai</p>
      <p className="text-xs text-gray-400 mt-1">Planned · ETA October 2025</p>
    </div>
  </div>
</motion.div>
    </section>
  )
}
