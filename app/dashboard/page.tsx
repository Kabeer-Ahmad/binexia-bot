/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

const platforms = ['Quotex', 'Binomo', 'IQ Option']
const durations = ['5 sec', '10 sec', '15 sec', '30 sec', '1 min', '2 min']
const currencies = [
  "USD/BDT (OTC)", "USD/PKR (OTC)", "USD/TRY (OTC)", "USD/COP (OTC)", "USD/BRL (OTC)",
  "NZD/USD (OTC)", "GBP/NZD (OTC)", "USD/DZD (OTC)", "EUR/JPY", "CAD/JPY", "USD/ZAR (OTC)",
  "NZD/JPY (OTC)", "USD/PHP (OTC)", "USD/NGN (OTC)", "NZD/CAD (OTC)", "NZD/CHF (OTC)",
  "USD/EGP (OTC)", "EUR/GBP", "GBP/JPY", "CAD/CHF (OTC)", "USD/ARS (OTC)", "USD/IDR (OTC)",
  "USD/INR (OTC)", "USD/MXN (OTC)", "EUR/AUD", "EUR/NZD (OTC)", "GBP/CAD", "USD/JPY",
  "EUR/USD", "GBP/USD", "EUR/SGD (OTC)", "CHF/JPY", "EUR/CAD", "AUD/NZD (OTC)", "AUD/CHF",
  "EUR/CHF", "AUD/JPY", "GBP/CHF", "USD/CAD", "AUD/CAD", "GBP/AUD", "USD/CHF", "AUD/USD"
]

const Dropdown = ({ label, options, value, setValue }: any) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="w-full text-left relative">
      <label className="text-sm text-white font-semibold">{label}</label>
      <div
        className="bg-white text-black mt-1 px-4 py-3 rounded-lg shadow cursor-pointer select-none relative"
        onClick={() => setOpen(!open)}
      >
        <span>{value || `Select ${label}`}</span>
        <motion.span className="absolute right-4">▼</motion.span>
      </div>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="bg-white text-black border mt-2 rounded-lg shadow absolute z-10 w-full max-h-60 overflow-y-auto"
          >
            {options.map((opt: string) => (
              <li
                key={opt}
                onClick={() => {
                  setValue(opt)
                  setOpen(false)
                }}
                className="px-4 py-2 hover:bg-indigo-100 cursor-pointer"
              >
                {opt}
              </li>
            ))}
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
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) router.push('/signin')
    }
    checkUser()
  }, [router])

  useEffect(() => {
    let interval: any
    if (timer && timer > 0) {
      interval = setInterval(() => {
        setTimer((t) => (t ? t - 1 : 0))
      }, 1000)
    } else if (timer === 0) {
      clearInterval(interval)
      setSignal('')
      setTimer(null)
    }
    return () => clearInterval(interval)
  }, [timer])

  const handleGetSignal = () => {
    if (!platform || !currency || !duration) {
      alert('Please select all options.')
      return
    }

    setLoading(true)
    setSignal('')
    setTimer(null)

    setTimeout(() => {
      const dir = Math.random() > 0.5 ? '📈 UP' : '📉 DOWN'
      setSignal(dir)

      const timeText = duration.split(' ')[0]
      const secs = timeText.includes('min') ? parseInt(timeText) * 60 : parseInt(timeText)
      setTimer(secs)
      setLoading(false)
    }, 2500)
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-950 px-6 py-16 text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl mx-auto bg-black/40 backdrop-blur-md rounded-2xl p-8 shadow-xl space-y-6"
      >
        <h1 className="text-3xl font-bold text-center text-indigo-300">Welcome to Binexia Bot</h1>

        <Dropdown label="Platform" options={platforms} value={platform} setValue={setPlatform} />
        <Dropdown label="Currency Pair" options={currencies} value={currency} setValue={setCurrency} />
        <Dropdown label="Trade Duration" options={durations} value={duration} setValue={setDuration} />

        <button
          onClick={handleGetSignal}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition"
        >
          {loading ? 'Analyzing...' : 'Get Signal'}
        </button>

        {loading && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-sm text-indigo-200"
          >
            Analyzing market trends, reading patterns...
          </motion.p>
        )}

        {signal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mt-4"
          >
            <p
              className={`text-2xl font-bold ${
                signal.includes('UP') ? 'text-green-400' : 'text-red-400'
              }`}
            >
              Signal: {signal}
            </p>
            {timer !== null && (
              <p className="mt-2 text-sm text-white">⏳ Time left: {timer}s</p>
            )}
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}