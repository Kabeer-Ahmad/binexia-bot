'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCopy } from 'react-icons/fi'

const plans = [
  { label: 'Monthly – $20', value: 'Monthly' },
  { label: 'Quarterly – $50', value: 'Quarterly' },
  { label: 'Yearly – $200', value: 'Yearly' },
]

function PlanDropdown({ plan, setPlan }: { plan: string, setPlan: (v: string) => void }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative z-20">
      <label className="block text-sm font-semibold text-gray-800 mb-2">Select Plan</label>
      <div
        onClick={() => setOpen(!open)}
        className="bg-white border border-gray-300 px-4 py-3 rounded-lg shadow-sm text-gray-900 cursor-pointer select-none flex justify-between items-center"
      >
        <span>{plan || 'Choose a plan...'}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} className="text-sm text-gray-500">▼</motion.span>
      </div>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute z-50 w-full bg-white border border-gray-300 mt-2 rounded-lg shadow-lg overflow-hidden"
          >
            {plans.map((p) => (
              <li
                key={p.value}
                onClick={() => {
                  setPlan(p.value)
                  setOpen(false)
                }}
                className="px-4 py-3 text-sm text-gray-900 hover:bg-indigo-100 cursor-pointer"
              >
                {p.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {plan && (
        <p className="mt-2 text-sm font-medium text-indigo-700">
          You will pay: <strong>{plans.find((p) => p.value === plan)?.label.split('–')[1].trim()}</strong>
        </p>
      )}
    </div>
  )
}

export default function PaymentPlanPage() {
  const [plan, setPlan] = useState('')
  const [screenshot, setScreenshot] = useState<File | null>(null)
  const [userId, setUserId] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/signin')
        return
      }

      setUserId(user.id)

      const { data: userData, error } = await supabase
        .from('users')
        .select('payment_status')
        .eq('id', user.id)
        .single()

      if (error || !userData || userData.payment_status === 'yes') {
        router.push('/dashboard')
      }
    }

    getUser()
  }, [router])

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!screenshot || !plan) return alert('Please select a plan and upload a screenshot.')

    const fileName = `${userId}_${Date.now()}_${screenshot.name}`
    const { error: storageError } = await supabase
      .storage
      .from('paymentscreenshots')
      .upload(fileName, screenshot)

    if (storageError) return alert('Upload failed.')

    const screenshotUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/paymentscreenshots/${fileName}`

    await supabase.from('payments').insert([{
      user_id: userId,
      plan,
      screenshot_url: screenshotUrl,
      status: 'pending',
    }])

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-xl shadow-xl"
        >
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">✅ Submitted!</h2>
          <p className="text-gray-700">Please wait for 10 minutes while we validate your payment. Your account will be activated after confirmation.</p>
        </motion.div>
      </div>
    )
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-950 px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white max-w-lg w-full p-8 rounded-xl shadow-xl text-gray-800"
      >
        <h2 className="text-2xl font-bold text-indigo-700 mb-6">Choose Your Plan</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <PlanDropdown plan={plan} setPlan={setPlan} />

          <div className="text-left space-y-2">
            <p className="font-semibold">Payment Instructions:</p>
            <div className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-md border text-sm">
              <span><strong>Binance ID:</strong> 179290815</span>
              <FiCopy
                onClick={() => handleCopy('179290815', 'Binance ID')}
                className="ml-2 text-gray-500 hover:text-indigo-600 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-md border text-sm">
              <span><strong>Tron TRC20:</strong> TYwxKPY55xq2cV4VxyPAZTTiZCYGgJ7nBZ</span>
              <FiCopy
                onClick={() => handleCopy('TYwxKPY55xq2cV4VxyPAZTTiZCYGgJ7nBZ', 'TRC20')}
                className="ml-2 text-gray-500 hover:text-indigo-600 cursor-pointer"
              />
            </div>

            <p className="text-sm text-gray-700"><strong>Reference:</strong> Your registered email</p>
            <p className="text-sm text-red-600 font-medium">Note: Payment will be confirmed within 10 minutes and your account will be activated.</p>
            <p className="text-sm text-gray-700"><strong>Action:</strong> Upload your payment screenshot below</p>

            {copied && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs text-green-600 mt-1"
              >
                ✅ {copied} copied!
              </motion.p>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            required
            onChange={(e) => setScreenshot(e.target.files?.[0] || null)}
            className="block w-full file:mr-4 file:py-2 file:px-4 file:border file:rounded-full file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Submit Payment
          </button>
        </form>
      </motion.div>
    </section>
  )
}
