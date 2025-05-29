'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function SignUpPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (authError) {
      setError(authError.message)
      return
    }

    const userId = authData.user?.id
    const userEmail = authData.user?.email

    if (userId && userEmail) {
      const { error: dbError } = await supabase.from('users').insert([
        {
          id: userId,
          email: userEmail,
          role: 'user',
          payment_status: 'no',
          activation_date: null,
        },
      ])

      if (!dbError) {
        setSuccess(true)
        setTimeout(() => router.push('/signin'), 3000)
      }
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-950 px-4 py-16">
      {success ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-xl max-w-md w-full p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">🎉 Signup Successful!</h2>
          <p className="text-gray-600">Redirecting you to sign in...</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-xl max-w-md w-full p-8"
        >
          <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Create Your Account</h2>
          <form onSubmit={handleSignUp} className="space-y-5">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/signin" className="text-indigo-600 font-semibold hover:underline">
              Sign In
            </a>
          </p>
        </motion.div>
      )}
    </section>
  )
}
