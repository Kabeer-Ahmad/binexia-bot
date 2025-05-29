'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const plans = [
  { label: 'Monthly – $30', value: 'Monthly' },
  { label: 'Quarterly – $80', value: 'Quarterly' },
  { label: 'Yearly – $299', value: 'Yearly' },
]

export function PlanDropdown({ plan, setPlan }: { plan: string, setPlan: (v: string) => void }) {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  return (
    <div className="relative z-50">
      <label className="block text-sm font-semibold text-gray-700 mb-2">Select Plan</label>

      <div
        ref={dropdownRef}
        onClick={() => setOpen(!open)}
        className="bg-white border border-gray-300 px-4 py-3 rounded-lg shadow-sm text-gray-700 cursor-pointer select-none flex justify-between items-center"
      >
        <span>{plan || 'Choose a plan...'}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          className="text-sm text-gray-500"
        >
          ▼
        </motion.span>
      </div>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute w-full bg-white border border-gray-300 mt-2 rounded-lg shadow-lg overflow-hidden"
          >
            {plans.map((p) => (
              <li
                key={p.value}
                onClick={() => {
                  setPlan(p.value)
                  setOpen(false)
                }}
                className="px-4 py-3 text-sm hover:bg-indigo-100 cursor-pointer"
              >
                {p.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
