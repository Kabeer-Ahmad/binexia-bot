// app/payment/[planId]/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface User { id: string; email?: string }

/* Price + label per plan */
const PLAN_META = {
  basic: { label: 'STARTER', price: 39 },
  pro:   { label: 'PRO TRADER', price: 79 },
  elite: { label: 'ELITE TRADER', price: 199 }
} as const

export default function PaymentFormPage() {
  const { planId }     = useParams<{ planId: keyof typeof PLAN_META }>()
  const router          = useRouter()
  const meta            = PLAN_META[planId] ?? PLAN_META.basic

  /* state */
  const [user, setUser]     = useState<User | null>(null)
  const [file, setFile]     = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]   = useState<string | null>(null)
  const [copied, setCopied] = useState('')               // which field was just copied?

  /* auth */
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { router.push('/signin'); return }
      setUser(data.user)
    })
  }, [router])

  /* copy helper */
  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(''), 1500)
    } catch (_) { /* ignore */ }
  }

  /* submit */
  const handleSubmit = async () => {
    if (!user) return
    if (!file) { setError('Upload a screenshot.'); return }
    setError(null); setLoading(true)

    try {
      /* upload */
      const ext   = file.name.split('.').pop()
      const path  = `${user.id}/${Date.now()}.${ext}`
      const { error: upErr } = await supabase
        .storage.from('paymentscreenshots')
        .upload(path, file, { cacheControl: '3600', upsert: false })
      if (upErr) throw upErr

      /* DB insert */
      const { error: dbErr } = await supabase.from('payment_requests').insert({
        user_id:         user.id,
        plan:            planId,
        amount:          meta.price,
        method:          'crypto',
        transaction_id:  'pending',         // user didn’t type it
        screenshot_path: path,
        status:          'pending'
      })
      if (dbErr) throw dbErr

      router.push('/dashboard?pendingPayment=true')
    } catch (e) {
      console.error(e)
      setError('Submission failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  /* UI */
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-lg rounded-3xl p-8 sm:p-10
                   bg-gradient-to-br from-gray-800/60 to-gray-900/60
                   backdrop-blur-lg border border-gray-700/40 shadow-2xl"
      >
        {/* corner glow */}
        <span className="pointer-events-none absolute -top-4 -right-4 w-20 h-20
                         bg-gradient-to-br from-blue-500 to-indigo-500 opacity-30 rounded-full blur-2xl" />

        {/* heading */}
        <h2 className="text-3xl font-black text-transparent bg-clip-text
                       bg-gradient-to-r from-green-400 to-blue-500 mb-6 text-center">
          You're One Step Away!
        </h2>

        {/* persuasive copy */}
        <p className="text-gray-300 text-center mb-8">
          Pay <span className="text-green-400 font-bold">${meta.price}</span> now, upload your proof,
          and unlock <span className="text-yellow-400 font-semibold">AI-powered profits</span> in minutes.
        </p>

        {/* payment details */}
        <div className="bg-gray-800/70 border border-gray-700 rounded-2xl p-6 text-sm sm:text-base mb-8 space-y-5">
          <p className="text-center text-gray-400 mb-2 font-medium">Choose either option:</p>

          {/* Binance ID */}
          <div className="flex items-center justify-between gap-3 bg-gray-900/40 px-4 py-3 rounded-lg">
            <span className="text-gray-300">Binance Pay&nbsp;ID</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-green-400">{'179290815'}</span>
              <button
                onClick={() => copyToClipboard('179290815', 'binance')}
                className="text-blue-400 hover:text-blue-500"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                </svg>
              </button>
            </div>
          </div>
          {copied === 'binance' && <p className="text-xs text-green-400 text-right -mt-4">Copied!</p>}

          {/* TRC20 address */}
          <div className="flex items-center justify-between gap-3 bg-gray-900/40 px-4 py-3 rounded-lg">
            <span className="text-gray-300">USDT&nbsp;TRC-20</span>
            <div className="flex items-center gap-2 truncate max-w-[60%]">
              <span className="font-mono text-green-400 truncate">TYwxKPY55xq2cV4VxyPAZTTiZCYGgJ7nBZ</span>
              <button
                onClick={() => copyToClipboard('TYwxKPY55xq2cV4VxyPAZTTiZCYGgJ7nBZ', 'trc')}
                className="text-blue-400 hover:text-blue-500"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a2 2 0 012-2h4.586A2 2 0 0117 2.586L19.414 5A2 2 0 0120 6.414V17a3 3 0 01-3 3H11a2 2 0 01-2-2V2z" />
                </svg>
              </button>
            </div>
          </div>
          {copied === 'trc' && <p className="text-xs text-green-400 text-right -mt-4">Copied!</p>}
        </div>

        {/* plan badge */}
        <div className="flex justify-center mb-6">
          <span className="px-4 py-2 rounded-full text-xs font-bold
                           bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg tracking-wide">
            {meta.label} PLAN • ${meta.price}
          </span>
        </div>

        {/* screenshot upload */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Upload Payment Screenshot</label>
            <label
              className="w-full flex flex-col items-center justify-center gap-2 px-4 py-8
                         border-2 border-dashed border-gray-600 rounded-xl cursor-pointer
                         hover:border-blue-500 text-gray-400"
            >
              {file ? (
                <Image
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  width={240}
                  height={150}
                  className="object-contain rounded-md max-h-40"
                />
              ) : (
                <>
                  <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M12 16v-4m0 0V8m0 4h4m-4 0H8m-2 8h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Click to upload (PNG / JPG)</span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => setFile(e.target.files?.[0] || null)}
              />
            </label>
          </div>

          {/* error */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* submit */}
          <motion.button
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.04 }}
            whileTap={{ scale: loading ? 1 : 0.96 }}
            onClick={handleSubmit}
            className={`w-full py-4 rounded-xl font-black text-lg shadow-xl
                        transition-all duration-300 flex items-center justify-center gap-3
                        ${loading
                          ? 'bg-gray-700 opacity-50 cursor-not-allowed'
                          : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white'}`}
          >
            {loading ? (
              <>
                <svg className="animate-spin w-6 h-6" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Submitting…
              </>
            ) : (
              'Submit Proof & Activate'
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
