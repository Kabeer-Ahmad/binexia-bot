// app/payment-plan/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

interface User { id: string }

/* ─── Plans meta so we can reuse price/name in Pending Card ─── */
const PLAN_META = {
  basic:  { name: 'STARTER',      price: 39  },
  pro:    { name: 'PRO TRADER',   price: 79  },
  elite:  { name: 'ELITE TRADER', price: 199 }
} as const

function SaleCountdown() {
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    const saleEndsAt = new Date()
    saleEndsAt.setHours(saleEndsAt.getHours() + 3) // Sale ends in 3 hours

    const updateTimer = () => {
      const now = new Date().getTime()
      const distance = saleEndsAt.getTime() - now

      if (distance <= 0) {
        setTimeLeft('00:00:00')
        return
      }

      const hours = String(Math.floor((distance / (1000 * 60 * 60)))).padStart(2, '0')
      const minutes = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0')
      const seconds = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0')

      setTimeLeft(`${hours}:${minutes}:${seconds}`)
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <p className="text-lg font-semibold text-red-400">
      ⏳ Sale ends in: <span className="text-white">{timeLeft}</span>
    </p>
  )
}

export default function PaymentPlanPage() {
  const router = useRouter()

  /* state */
  const [user,        setUser]        = useState<User | null>(null)
  const [pendingRow,  setPendingRow]  = useState<{ plan: keyof typeof PLAN_META; created_at: string } | null>(null)
  const [checking,    setChecking]    = useState(true)

  /* 1️⃣  check auth + payment status */
  useEffect(() => {
    const init = async () => {
      /* auth */
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.replace('/signin'); return }
      setUser(user)

      /* latest payment request */
      const { data: row } = await supabase
        .from('payment_requests')
        .select('plan,status,created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()

      if (row) {
        if (row.status === 'approved') { router.replace('/dashboard'); return }
        if (row.status === 'pending')  { setPendingRow({ plan: row.plan as any, created_at: row.created_at }); }
      }

      setChecking(false)
    }
    init()
  }, [router])

  /* 2️⃣  loader */
  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  /* 3️⃣  pending view */
  if (pendingRow && user) {
    const meta = PLAN_META[pendingRow.plan]
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/50 backdrop-blur-lg border border-gray-700/50 rounded-3xl p-10 max-w-md text-center shadow-2xl"
        >
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-6">
            Payment Under Review
          </h1>

          <p className="text-gray-300 mb-6">
            We’ve received your <span className="text-green-400 font-semibold">{meta.name}</span> plan payment
            (<span className="font-mono">${meta.price}</span>). Our team is verifying it—usually within
            <span className="text-green-400 font-semibold"> 15&nbsp;minutes</span>.
          </p>

          <div className="bg-gray-800/70 border border-gray-700 rounded-xl p-4 text-sm text-gray-400 mb-6">
            <p><span className="font-semibold text-indigo-300">Reference&nbsp;Time:</span> {new Date(pendingRow.created_at).toLocaleString()}</p>
            <p><span className="font-semibold text-indigo-300">User&nbsp;ID:</span> {user.id.slice(0, 8)}…</p>
          </div>

          <p className="text-gray-500 text-sm">
            Feel free to grab a coffee ☕—this page will unlock automatically once your account is activated.
          </p>
        </motion.div>
      </div>
    )
  }

  /* 4️⃣  regular pricing cards (unchanged design) */
  /* ------------------------------------------------------------------- */
  const plans = [
    {
      id: 'basic', name: 'STARTER', price: 39, originalPrice: 99, popular: false,
      features: ['Basic AI Signals','Email Support','All Trading Platforms','Limited Pair Options','30-Day Money Back','Basic Risk Management']
    },
    {
      id: 'pro',   name: 'PRO TRADER', price: 79, originalPrice: 199, popular: true,
      features: ['Advanced AI Signals','Priority 24/7 Support','All Trading Platforms','Unlimited Market Analysis','60-Day Money Back','Advanced Risk Management']
    },
    {
      id: 'elite', name: 'ELITE TRADER', price: 199, originalPrice: 499, popular: false,
      features: ['Premium AI Signals','VIP Priority Support','All Platform Access','Real-time Analysis','Personal Manager','90-Day Money Back']
    }
  ]

  const goToPaymentForm = (planId: string) => router.push(`/payment/${planId}`)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 py-12 px-4">
      {/* --- header (same as earlier) --- */}
      {/* ... header code unchanged ... */}
      {/* pricing cards (same) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div key={plan.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.8 }}
            className={`relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl
                        border rounded-3xl p-8 shadow-2xl transition-all duration-500 hover:shadow-3xl
                        ${plan.popular ? 'border-green-500/50 scale-105' : 'border-gray-700/50 hover:border-gray-600/50'}`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-xl flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  MOST POPULAR
                </div>
              </div>
            )}

            {/* price & features */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-black text-white mb-4">{plan.name}</h3>
              <div className="mb-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                    ${plan.price}
                  </span>
                  <span className="text-gray-400">one-time</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg text-gray-500 line-through">${plan.originalPrice}</span>
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                    SAVE ${plan.originalPrice - plan.price}
                  </span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((f, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-left">
                    <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-300 text-sm">{f}</span>
                  </div>
                ))}
              </div>

              <motion.button
                onClick={() => goToPaymentForm(plan.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 rounded-xl font-black text-lg shadow-xl transition-all duration-300 hover:shadow-2xl
                            ${plan.popular
                              ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                              : 'bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500'}
                            text-white`}
              >
                SELECT PLAN
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
{/* ── Bottom CTA ───────────────────────────────────── */}
<div className="mt-24 max-w-3xl mx-auto text-center">
  <motion.h2
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3, duration: 0.8 }}
    className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-4"
  >
    Still deciding?
  </motion.h2>

  {/* Countdown Timer */}
  <SaleCountdown />

  <p className="text-gray-400 text-lg mt-4 mb-8">
    Our AI has helped over <span className="text-green-400 font-bold">1,247+ traders</span> grow their portfolios.
    Every plan comes with a full <span className="text-yellow-300 font-bold">money-back guarantee</span>. Try it risk-free today!
  </p>

  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    className="inline-block px-8 py-4 rounded-xl text-lg font-black shadow-xl transition-all duration-300 text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
  >
    Choose My Plan
  </motion.button>
</div>
    </div>
  )
}
