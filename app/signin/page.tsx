'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password })

    if (authError || !data.user) {
      setError(authError?.message || 'Login failed')
      return
    }

    const userId = data.user.id
    const { data: userProfile, error: userError } = await supabase
      .from('users')
      .select('role, payment_status')
      .eq('id', userId)
      .single()

    if (userError || !userProfile) {
      setError('Could not fetch user profile')
      return
    }

    if (userProfile.role === 'admin') {
      router.push('/admin')
    } else if (userProfile.payment_status === 'no') {
      router.push('/payment-plan')
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-950 px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-xl shadow-xl max-w-md w-full p-8 text-gray-900"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Welcome Back</h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-800">
          Don’t have an account?{' '}
          <a href="/signup" className="text-indigo-700 font-semibold hover:underline">
            Sign Up
          </a>
        </p>
      </motion.div>
    </section>
  )
}
