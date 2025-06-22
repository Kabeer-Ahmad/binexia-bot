/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

/* ── Types ─────────────────────────────────────────── */
interface Payment {
  id: string
  user_id: string
  plan: string
  amount: number
  method: string
  screenshot_path: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
}
interface UserRow {
  id: string
  email: string | null
  role: string | null
  activation_date: string | null
}

/* ── Helpers ───────────────────────────────────────── */
const bucket = 'paymentscreenshots'
const getScreenshotUrl = (path: string) =>
  supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl

/* ── Component ─────────────────────────────────────── */
export default function AdminPanel() {
  const [rows, setRows]     = useState<(Payment & { user?: UserRow })[]>([])
  const [loading, setLoad]  = useState(true)
  const [isAdmin, setAdmin] = useState(false)
  const [modalSrc, setSrc]  = useState<string | null>(null)
  const router              = useRouter()

  /* fetch + merge */
  const fetchRows = async () => {
    const { data: pay, error: e1 } = await supabase
      .from('payment_requests')
      .select('*')
      .order('created_at', { ascending: false })

    const { data: users, error: e2 } = await supabase
      .from('users')
      .select('id,email,activation_date')

    if (e1 || e2 || !pay || !users) { console.error(e1 || e2); return }

    setRows(pay.map(p => ({ ...p, user: users.find(u => u.id === p.user_id) })))
  }

  /* auth + role */
  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.replace('/signin'); return }

      const { data } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single()

      if (data?.role === 'admin') {
        setAdmin(true)
        await fetchRows()
      } else {
        router.replace('/dashboard')
      }
      setLoad(false)
    })()
  }, [router])

  /* approve / reject */
  const setStatus = async (id: string, status: 'approved' | 'rejected') => {
    await supabase.from('payment_requests').update({ status }).eq('id', id)
    if (status === 'approved') {
      const p = rows.find(r => r.id === id)
      if (p) {
        await supabase.from('users').update({
          payment_status: 'yes',
          activation_date: new Date().toISOString().split('T')[0]
        }).eq('id', p.user_id)
      }
    }
    fetchRows()
  }
  /* delete */
  const delRow = async (p: Payment) => {
    await supabase.from('payment_requests').delete().eq('id', p.id)
    await supabase.from('users').update({
      payment_status: 'no', activation_date: null
    }).eq('id', p.user_id)
    fetchRows()
  }

  /* ── guards */
  if (loading) return <p className="text-center py-20 text-white">Checking admin access…</p>
  if (!isAdmin)  return null

  /* ── UI ──────────────────────────────────────────── */
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-8 text-center"
      >
        Payment Requests – Admin Console
      </motion.h1>

      {rows.length === 0 ? (
        <p className="text-center text-gray-400">No payment requests yet 🎉</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-200 bg-black/30 backdrop-blur-md rounded-2xl shadow-xl">
            <thead>
              <tr className="bg-emerald-700 text-white">
                {['Email','Plan','Amount','Method','Screenshot','Status','Submitted','Activation','Actions']
                  .map(h => <th key={h} className="px-4 py-2 font-semibold">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.id} className="border-t border-gray-700">
                  <td className="px-4 py-2">{r.user?.email ?? '—'}</td>
                  <td className="px-4 py-2">{r.plan.toUpperCase()}</td>
                  <td className="px-4 py-2">${r.amount}</td>
                  <td className="px-4 py-2 capitalize">{r.method}</td>
                  <td className="px-4 py-2">
                    <button onClick={() => setSrc(getScreenshotUrl(r.screenshot_path))}
                            className="text-indigo-400 underline hover:text-indigo-300">
                      View
                    </button>
                  </td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded font-medium
                      ${r.status === 'approved' ? 'bg-green-700/30 text-green-300'
                        : r.status === 'rejected' ? 'bg-red-700/30 text-red-300'
                        : 'bg-yellow-600/30 text-yellow-300'}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">{new Date(r.created_at).toLocaleString()}</td>
                  <td className="px-4 py-2">{r.user?.activation_date ?? '—'}</td>
                  <td className="px-4 py-2 space-x-1">
                    <button
                      onClick={() => setStatus(r.id,'approved')}
                      className="bg-emerald-600 hover:bg-emerald-700 px-3 py-1 rounded text-white">
                      Approve
                    </button>
                    <button
                      onClick={() => setStatus(r.id,'rejected')}
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white">
                      Reject
                    </button>
                    <button
                      onClick={() => delRow(r)}
                      className="bg-gray-700 hover:bg-gray-900 px-3 py-1 rounded text-white">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Screenshot Modal ───────────────────────── */}
      <AnimatePresence>
        {modalSrc && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            onClick={() => setSrc(null)}
          >
            <motion.img
              src={modalSrc}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
