'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  email?: string
  user_metadata?: Record<string, unknown>
}

export default function PaymentPlanPage() {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/signin')
        return
      }
      setUser(user)
    }
    checkUser()
  }, [router])

  const plans = [
    {
      id: 'basic',
      name: 'STARTER',
      price: 97,
      originalPrice: 199,
      popular: false,
      features: [
        'Basic AI Signals',
        'Email Support',
        '1 Trading Platform',
        'Weekly Market Updates',
        '30-Day Money Back',
        'Basic Risk Management'
      ],
      color: 'from-gray-600 to-gray-700'
    },
    {
      id: 'pro',
      name: 'PRO TRADER',
      price: 197,
      originalPrice: 499,
      popular: true,
      features: [
        'Advanced AI Signals',
        'Priority 24/7 Support',
        'All Trading Platforms',
        'Daily Market Analysis',
        'Risk Management Tools',
        '60-Day Money Back'
      ],
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'elite',
      name: 'ELITE TRADER',
      price: 297,
      originalPrice: 799,
      popular: false,
      features: [
        'Premium AI Signals',
        'VIP Priority Support',
        'All Platform Access',
        'Real-time Analysis',
        'Personal Manager',
        '90-Day Money Back'
      ],
      color: 'from-purple-500 to-pink-600'
    }
  ]

  const handlePayment = async (planId: string) => {
    if (!user) return
    
    setLoading(true)
    
    try {
      // Here you would integrate with your payment processor
      // For now, we'll simulate a successful payment
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Update user payment status with the selected plan
      await supabase
        .from('users')
        .update({ 
          payment_status: 'yes',
          subscription_plan: planId,
          activation_date: new Date().toISOString()
        })
        .eq('id', user.id)

      // Redirect to dashboard
      router.push('/dashboard')
    } catch (error) {
      console.error('Payment failed:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 mb-6">
            CHOOSE YOUR SUCCESS
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            Join <strong className="text-green-400">1,247+ traders</strong> making 
            <strong className="text-yellow-400"> life-changing profits</strong> with our AI
          </p>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>SSL Secured Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Money Back Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>4.9/5 Rating (1,247 Reviews)</span>
            </div>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className={`relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border rounded-3xl p-8 shadow-2xl transition-all duration-500 hover:shadow-3xl ${
                plan.popular 
                  ? 'border-green-500/50 scale-105 transform' 
                  : 'border-gray-700/50 hover:border-gray-600/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-xl flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    MOST POPULAR
                  </div>
                </div>
              )}

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
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3 text-left">
                      <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  onClick={() => handlePayment(plan.id)}
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 rounded-xl font-black text-lg transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white'
                      : 'bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white'
                  } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-6 h-6" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      START MAKING MONEY NOW
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-black text-white mb-4 flex items-center justify-center gap-3">
              <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              LIMITED TIME OFFER
              <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
            </h3>
            <p className="text-xl text-gray-300 mb-6">
              This <strong className="text-red-400">80% discount</strong> expires in:
            </p>
            <div className="flex justify-center gap-4 text-center mb-6">
              <div className="bg-red-500 text-white px-4 py-2 rounded-lg">
                <div className="text-2xl font-bold">23</div>
                <div className="text-xs">HOURS</div>
              </div>
              <div className="bg-red-500 text-white px-4 py-2 rounded-lg">
                <div className="text-2xl font-bold">59</div>
                <div className="text-xs">MINUTES</div>
              </div>
              <div className="bg-red-500 text-white px-4 py-2 rounded-lg">
                <div className="text-2xl font-bold">42</div>
                <div className="text-xs">SECONDS</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Don&apos;t miss your chance to join the most profitable trading community on the planet!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
