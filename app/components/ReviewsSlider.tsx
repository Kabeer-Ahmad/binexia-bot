'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const testimonials = [
	{
		name: 'Marcus Chen',
		profit: '$47,200',
		time: '3 months',
		quote:
			'I went from complete beginner to making more than my day job in just 3 months. This bot is absolutely insane!',
		avatar: '💼',
		verified: true,
	},
	{
		name: 'Sarah Williams',
		profit: '$23,850',
		time: '6 weeks',
		quote:
			'Finally quit my 9-5! Making consistent profits every single day. Best investment I\'ve ever made.',
		avatar: '🎯',
		verified: true,
	},
	{
		name: 'David Rodriguez',
		profit: '$61,400',
		time: '4 months',
		quote:
			'Started with $500, now I\'m pulling in $15k+ monthly. The AI predictions are scary accurate.',
		avatar: '🚀',
		verified: true,
	},
	{
		name: 'Emma Thompson',
		profit: '$38,920',
		time: '2 months',
		quote:
			'Paid off my student loans and bought a new car. This bot literally changed my entire life!',
		avatar: '💎',
		verified: true,
	},
	{
		name: 'Alex Kumar',
		profit: '$52,100',
		time: '5 months',
		quote:
			'I was skeptical at first, but the results speak for themselves. Making money while I sleep!',
		avatar: '⭐',
		verified: true,
	},
]

export default function ReviewsSlider() {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [liveProfit, setLiveProfit] = useState(2847329)

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % testimonials.length)
		}, 4000)
		return () => clearInterval(interval)
	}, [])

	useEffect(() => {
		const profitInterval = setInterval(() => {
			setLiveProfit((prev) => prev + Math.random() * 100 + 50)
		}, 3000)
		return () => clearInterval(profitInterval)
	}, [])

	return (
		<section
			id="reviews"
			className="py-24 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden"
		>
			{/* Background Effects */}
			<div className="absolute inset-0 opacity-20">
				<div className="absolute top-20 left-20 w-64 h-64 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
				<div
					className="absolute bottom-20 right-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"
					style={{ animationDelay: '2s' }}
				></div>
			</div>

			<div className="relative z-10 max-w-7xl mx-auto px-6">
				{/* Live Profit Counter */}
				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					whileInView={{ opacity: 1, scale: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
					className="text-center mb-16"
				>
					<div className="inline-flex items-center gap-3 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-full px-6 py-3 mb-8">
						<div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
						<span className="text-green-400 font-mono text-lg">
							Total User Profits: ${liveProfit.toLocaleString()}
						</span>
					</div>

					<h2 className="text-5xl md:text-6xl font-black mb-6">
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
							REAL PEOPLE
						</span>
						<br />
						<span className="text-white">REAL PROFITS</span>
					</h2>
					<p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
						Don&apos;t just take our word for it - see what our{' '}
						<strong className="text-green-400">successful traders</strong> are
						saying
					</p>
				</motion.div>

				{/* Testimonials Slider */}
				<div className="relative max-w-4xl mx-auto">
					<AnimatePresence mode="wait">
						<motion.div
							key={currentIndex}
							initial={{ opacity: 0, x: 100, rotateY: 15 }}
							animate={{ opacity: 1, x: 0, rotateY: 0 }}
							exit={{ opacity: 0, x: -100, rotateY: -15 }}
							transition={{ duration: 0.8, ease: 'easeInOut' }}
							className="relative"
						>
							<div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
								{/* Glowing Border Effect */}
								<div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-3xl blur-sm"></div>

								{/* Content */}
								<div className="relative z-10">
									{/* Avatar & Verified Badge */}
									<div className="flex items-center justify-center mb-6">
										<div className="relative">
											<div className="text-6xl mb-2">
												{testimonials[currentIndex].avatar}
											</div>
											{testimonials[currentIndex].verified && (
												<div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold py-1 px-2 rounded-full">
													✓ VERIFIED
												</div>
											)}
										</div>
									</div>

									{/* Profit Display */}
									<div className="mb-6">
										<div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 mb-2">
											{testimonials[currentIndex].profit}
										</div>
										<div className="text-gray-400 text-lg">
											Made in {testimonials[currentIndex].time}
										</div>
									</div>

									{/* Quote */}
									<blockquote className="text-xl md:text-2xl italic text-gray-200 mb-6 leading-relaxed">
										&ldquo;{testimonials[currentIndex].quote}&rdquo;
									</blockquote>

									{/* Name */}
									<div className="text-xl font-bold text-white">
										{testimonials[currentIndex].name}
									</div>
								</div>

								{/* Decorative Elements */}
								<div className="absolute top-6 left-6 w-12 h-12 border-2 border-green-400/30 rounded-full animate-spin-slow"></div>
								<div className="absolute bottom-6 right-6 w-8 h-8 border-2 border-blue-400/30 rounded-full animate-pulse"></div>
							</div>
						</motion.div>
					</AnimatePresence>

					{/* Dots Indicator */}
					<div className="flex justify-center mt-8 gap-3">
						{testimonials.map((_, index) => (
							<button
								key={index}
								onClick={() => setCurrentIndex(index)}
								className={`w-3 h-3 rounded-full transition-all duration-300 ${
									index === currentIndex
										? 'bg-green-400 shadow-lg shadow-green-400/50'
										: 'bg-gray-600 hover:bg-gray-500'
								}`}
							/>
						))}
					</div>
				</div>

				{/* Social Proof Bar */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.5, duration: 0.8 }}
					className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 text-center"
				>
					<div className="text-center">
						<div className="text-3xl font-bold text-green-400 mb-2">1,247</div>
						<div className="text-gray-400">Active Users</div>
					</div>
					<div className="text-center">
						<div className="text-3xl font-bold text-blue-400 mb-2">$2.5M+</div>
						<div className="text-gray-400">Total Profits</div>
					</div>
					<div className="text-center">
						<div className="text-3xl font-bold text-purple-400 mb-2">95.7%</div>
						<div className="text-gray-400">Win Rate</div>
					</div>
					<div className="text-center">
						<div className="text-3xl font-bold text-yellow-400 mb-2">24/7</div>
						<div className="text-gray-400">Support</div>
					</div>
				</motion.div>

				{/* Final CTA */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.8, duration: 0.8 }}
					className="text-center mt-16"
				>
					<p className="text-2xl md:text-3xl font-bold text-white mb-8">
						Your success story could be{' '}
						<span className="text-green-400">next</span>
					</p>
					<motion.a
						href="/signup"
						whileHover={{
							scale: 1.05,
							boxShadow: '0 0 40px rgba(34, 197, 94, 0.6)',
						}}
						whileTap={{ scale: 0.98 }}
						className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-5 px-12 rounded-xl shadow-2xl text-xl transition-all duration-300 relative overflow-hidden group"
					>
						<span className="relative z-10">
							💰 START YOUR SUCCESS STORY
						</span>
						<div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
					</motion.a>
				</motion.div>
			</div>

			<style jsx>{`
				@keyframes spin-slow {
					to {
						transform: rotate(360deg);
					}
				}
				.animate-spin-slow {
					animation: spin-slow 15s linear infinite;
				}
			`}</style>
		</section>
	)
}
