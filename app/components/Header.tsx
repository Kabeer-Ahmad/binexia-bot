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
  const [liveUsers, setLiveUsers] = useState(1247)
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

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveUsers(prev => prev + Math.floor(Math.random() * 3) + 1)
    }, 5000)
    return () => clearInterval(interval)
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
      className="sticky top-0 z-50 bg-gradient-to-r from-black/95 via-gray-900/95 to-black/95 backdrop-blur-md border-b border-gray-800/50"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.a 
            href="/" 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
              Binexia Bot
            </span>
          </motion.a>

          {/* Live Counter - Desktop Only */}
          <div className="hidden md:flex items-center gap-2 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-full px-4 py-2">
            <svg className="w-4 h-4 text-green-400 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            <span className="text-green-400 font-bold text-sm">
              {liveUsers.toLocaleString()} Live Users
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {!user && (
              <>
                <a 
                  href="#metrics" 
                  className="text-gray-300 hover:text-green-400 transition font-medium"
                >
                  Results
                </a>
                <a 
                  href="#reviews" 
                  className="text-gray-300 hover:text-green-400 transition font-medium"
                >
                  Success Stories
                </a>
                <a 
                  href="#cta" 
                  className="text-gray-300 hover:text-green-400 transition font-medium"
                >
                  Pricing
                </a>
                
                <div className="flex items-center gap-3">
                  <a
                    href="/signin"
                    className="px-4 py-2 rounded-xl border border-gray-600 text-gray-300 hover:border-green-400 hover:text-green-400 transition font-medium"
                  >
                    Login
                  </a>
                  <motion.a
                    href="/signup"
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(34, 197, 94, 0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold transition-all duration-300 shadow-lg flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    START NOW
                  </motion.a>
                </div>
              </>
            )}

            {user && (
              <div className="flex items-center gap-4">
                <span className="text-gray-300">Welcome back!</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium transition"
                >
                  Logout
                </button>
              </div>
            )}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white text-3xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {/* Mobile Live Counter */}
        <div className="md:hidden mt-3 flex justify-center">
          <div className="flex items-center gap-2 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 font-bold text-sm">
              {liveUsers.toLocaleString()} Live Users
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden bg-gradient-to-br from-black via-gray-900 to-black px-6 py-6 border-t border-gray-800/50"
        >
          {!user && (
            <div className="space-y-4">
              <a
                href="#metrics"
                className="block text-gray-300 hover:text-green-400 text-lg font-medium transition"
                onClick={() => setIsOpen(false)}
              >
                📊 Results
              </a>
              <a
                href="#reviews"
                className="block text-gray-300 hover:text-green-400 text-lg font-medium transition"
                onClick={() => setIsOpen(false)}
              >
                💬 Success Stories
              </a>
              <a
                href="#cta"
                className="block text-gray-300 hover:text-green-400 text-lg font-medium transition"
                onClick={() => setIsOpen(false)}
              >
                💰 Pricing
              </a>
              
              <div className="pt-4 space-y-3">
                <a
                  href="/signin"
                  className="block text-center border border-gray-600 text-gray-300 hover:border-green-400 hover:text-green-400 rounded-xl py-3 font-medium transition"
                >
                  Login
                </a>
                <a
                  href="/signup"
                  className="block text-center bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl py-3 font-bold shadow-lg transition-all duration-300"
                >
                  🚀 START MAKING MONEY
                </a>
              </div>
            </div>
          )}

          {user && (
            <div className="space-y-4">
              <div className="text-gray-300 text-lg">Welcome back!</div>
              <button
                onClick={handleLogout}
                className="block w-full text-center bg-red-500 hover:bg-red-600 text-white rounded-xl py-3 font-medium transition"
              >
                Logout
              </button>
            </div>
          )}
        </motion.div>
      )}
    </motion.header>
  )
}
