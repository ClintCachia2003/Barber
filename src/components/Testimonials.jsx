import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const reviews = [
  {
    name: 'Marcus W.',
    role: 'Regular since 2019',
    rating: 5,
    text: "Best fade I've ever had. James knows exactly what I want before I even finish describing it. The attention to detail is unmatched.",
    initial: 'M',
  },
  {
    name: 'Tyler R.',
    role: 'Monthly member',
    rating: 5,
    text: "The hot towel shave experience is absolutely worth every penny. Feels like a luxury spa but for men. Never going anywhere else.",
    initial: 'T',
  },
  {
    name: 'Daniel K.',
    role: 'Verified client',
    rating: 5,
    text: "Walked in looking disheveled, walked out looking like a million bucks. The staff is professional, welcoming and incredibly skilled.",
    initial: 'D',
  },
]

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-28 px-6 bg-[#0A0907] relative" ref={ref}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.3)] to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-xs tracking-[0.3em] uppercase text-[#C9A84C] mb-4"
          >
            Client Reviews
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl text-[#F5F0E8]"
          >
            What They Say
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card gold-glow-hover rounded-sm p-7 relative"
            >
              {/* Quote icon */}
              <Quote size={24} className="text-[rgba(201,168,76,0.2)] mb-4" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(r.rating)].map((_, j) => (
                  <Star key={j} size={13} fill="#C9A84C" className="text-[#C9A84C]" />
                ))}
              </div>

              <p className="text-[#9E8F7A] leading-relaxed text-sm mb-6 italic">"{r.text}"</p>

              <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-border-subtle)]">
                <div className="w-9 h-9 rounded-full bg-[var(--color-gold-dim)] border border-[var(--color-border)] flex items-center justify-center">
                  <span className="font-serif text-[#C9A84C]">{r.initial}</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-[#F5F0E8]">{r.name}</div>
                  <div className="text-xs text-[#9E8F7A]">{r.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.3)] to-transparent" />
    </section>
  )
}
