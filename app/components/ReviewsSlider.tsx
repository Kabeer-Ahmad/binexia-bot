'use client'

import { useState, useEffect } from 'react'
import { reviews } from '@/lib/reviews'
import { motion, AnimatePresence } from 'framer-motion'

export default function ReviewsSlider() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="reviews"
      className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-100 text-center px-4"
    >
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600"
      >
        💬 What Our Users Say
      </motion.h2>

      <div className="relative max-w-3xl mx-auto min-h-[180px] sm:min-h-[150px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
            className="absolute w-full px-2 sm:px-4"
          >
            <div className="bg-white border border-indigo-100 shadow-xl rounded-2xl p-6 sm:p-10 transition-all duration-500">
              <p className="text-base sm:text-lg md:text-xl italic text-gray-700 mb-4 leading-relaxed">
                “{reviews[index].quote}”
              </p>
              <p className="font-semibold text-indigo-600 text-sm sm:text-base">
                — {reviews[index].author}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
