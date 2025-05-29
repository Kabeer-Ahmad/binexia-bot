/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { HiMenu, HiX } from 'react-icons/hi'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }

    fetchUser()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => {
      listener?.subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push('/signin')
  }

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-gradient-to-br from-gray-900/80 via-blue-900/80 to-indigo-950/80 backdrop-blur-md shadow-md"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="/" className="text-2xl font-extrabold text-indigo-200 tracking-tight">
          Binexia Bot
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-6 text-gray-200 font-medium">
          {!user && (
            <>
              <a href="#metrics" className="hover:text-white transition">Accuracy</a>
              <a href="#reviews" className="hover:text-white transition">Reviews</a>
              <a href="#cta" className="hover:text-white transition">Get Started</a>
              <a
                href="/signin"
                className="px-4 py-2 rounded-full border border-indigo-400 text-indigo-200 hover:bg-indigo-600 hover:text-white transition"
              >
                Log In
              </a>
              <a
                href="/signup"
                className="px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                Sign Up
              </a>
            </>
          )}

          {user && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition"
            >
              Logout
            </button>
          )}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-indigo-200 text-3xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-950 px-6 py-4 space-y-4"
        >
          {!user && (
            <>
              <a
                href="#metrics"
                className="block text-white text-lg hover:text-indigo-300"
                onClick={() => setIsOpen(false)}
              >
                Accuracy
              </a>
              <a
                href="#reviews"
                className="block text-white text-lg hover:text-indigo-300"
                onClick={() => setIsOpen(false)}
              >
                Reviews
              </a>
              <a
                href="#cta"
                className="block text-white text-lg hover:text-indigo-300"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </a>
              <a
                href="/signin"
                className="block border border-indigo-400 text-indigo-200 rounded-full text-center py-2 hover:bg-indigo-600 hover:text-white transition"
              >
                Log In
              </a>
              <a
                href="/signup"
                className="block bg-indigo-600 text-white rounded-full text-center py-2 hover:bg-indigo-700 transition"
              >
                Sign Up
              </a>
            </>
          )}

          {user && (
            <button
              onClick={handleLogout}
              className="block w-full bg-red-600 text-white rounded-full text-center py-2 hover:bg-red-700 transition"
            >
              Logout
            </button>
          )}
        </motion.div>
      )}
    </motion.header>
  )
}
