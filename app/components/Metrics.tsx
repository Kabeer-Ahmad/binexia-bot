'use client'

import { motion } from 'framer-motion'
import clsx from 'clsx'

const metricVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
}

export default function Metrics() {
  const metrics = [
    { value: '95%', label: 'Accuracy Rate' },
    { value: '1,200+', label: 'Active Users' },
    { value: '100%', label: 'Manual Strategy Support' },
  ]

  return (
    <section
      id="metrics"
      className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-blue-100 text-gray-900 text-center"
    >
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"
      >
        🚀 Why Binexia Bot?
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto px-6">
        {metrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={metricVariants}
            whileHover={{ scale: 1.03 }}
            animate={{ scale: [1, 1.015, 1] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="bg-white shadow-lg rounded-xl p-8 transition-all duration-500"
          >
            <p
              className={clsx(
                'text-5xl font-extrabold bg-clip-text text-transparent mb-2',
                'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500'
              )}
            >
              {metric.value}
            </p>
            <p className="mt-2 text-lg font-medium text-gray-700">{metric.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
