/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

type Payment = {
  id: string
  user_id: string
  plan: string
  screenshot_url: string
  status: string
  created_at: string
}

type User = {
  id: string
  email: string
  role: string
  activation_date: string | null
}

export default function AdminPanel() {
  const [payments, setPayments] = useState<(Payment & { user: User | undefined })[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()

  const fetchPayments = async () => {
    const { data: paymentsData, error: paymentsError } = await supabase.from('payments').select('*').order('created_at', { ascending: false })
    const { data: usersData, error: usersError } = await supabase.from('users').select('id, email, role, activation_date')

    if (paymentsError || usersError || !paymentsData || !usersData) {
      console.error('Error fetching payments or users', paymentsError || usersError)
      return
    }

    const merged = paymentsData.map((payment: Payment) => {
      const user = usersData.find((u: User) => u.id === payment.user_id)
      return { ...payment, user }
    })

    setPayments(merged)
  }

  const checkAdminAccess = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      router.push('/signin')
      return
    }

    const { data: userData } = await supabase.from('users').select('role').eq('id', user.id).single()

    if (userData?.role === 'admin') {
      setIsAdmin(true)
      await fetchPayments()
    } else {
      router.push('/dashboard')
    }

    setLoading(false)
  }

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('payments').update({ status }).eq('id', id)

    if (status === 'approved') {
      const payment = payments.find(p => p.id === id)
      if (payment) {
        await supabase
          .from('users')
          .update({ activation_date: new Date().toISOString().split('T')[0], payment_status: 'yes' })
          .eq('id', payment.user_id)
      }
    }

    await fetchPayments()
  }

  const handleDelete = async (payment: Payment) => {
    // Delete payment entry
    await supabase.from('payments').delete().eq('id', payment.id)

    // Reset user payment fields
    await supabase
      .from('users')
      .update({ payment_status: 'no', activation_date: null })
      .eq('id', payment.user_id)

    await fetchPayments()
  }

  useEffect(() => {
    checkAdminAccess()
  }, [])

  if (loading) return <p className="text-center py-20">Checking admin access...</p>
  if (!isAdmin) return null

  return (
    <section className="min-h-screen bg-gray-100 p-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-indigo-800 mb-6 text-center"
      >
        Admin Panel – Payment Submissions
      </motion.h1>

      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded shadow-lg text-gray-800">
          <thead>
            <tr className="bg-indigo-600 text-white text-left">
              <th className="px-4 py-2">User Email</th>
              <th className="px-4 py-2">Plan</th>
              <th className="px-4 py-2">Screenshot</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Submitted</th>
              <th className="px-4 py-2">Activation</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id} className="border-t text-sm">
                <td className="px-4 py-2">{p.user?.email || 'N/A'}</td>
                <td className="px-4 py-2">{p.plan}</td>
                <td className="px-4 py-2">
                  <a href={p.screenshot_url} target="_blank" className="text-blue-600 underline">
                    View
                  </a>
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded ${
                      p.status === 'approved'
                        ? 'bg-green-100 text-green-700'
                        : p.status === 'rejected'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-2">{new Date(p.created_at).toLocaleString()}</td>
                <td className="px-4 py-2">{p.user?.activation_date || '—'}</td>
                <td className="px-4 py-2 space-y-1 space-x-1">
                  <button
                    onClick={() => updateStatus(p.id, 'approved')}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(p.id, 'rejected')}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleDelete(p)}
                    className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-black"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
