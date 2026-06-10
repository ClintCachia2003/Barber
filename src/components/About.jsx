import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Award, Clock, Users, Star } from 'lucide-react'

const stats = [
  { icon: Clock, value: '15+', label: 'Years Experience' },
  { icon: Users, value: '5,000+', label: 'Satisfied Clients' },
  { icon: Award, value: '3×', label: 'Award Winning' },
  { icon: Star, value: '4.9', label: 'Average Rating' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="py-28 px-6 bg-[#0C0A09]" ref={ref}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: visual */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Main image placeholder */}
          <div className="relative h-[520px] rounded-sm overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1C1917] via-[#292524] to-[#1C1917]" />
            {/* Decorative barbershop illustration */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Barber pole */}
                <div className="w-16 h-64 rounded-full overflow-hidden border-2 border-[rgba(201,168,76,0.3)] relative mx-auto">
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'repeating-linear-gradient(45deg, #C9A84C 0px, #C9A84C 12px, #F5F0E8 12px, #F5F0E8 24px, #1C1917 24px, #1C1917 36px)',
                    }}
                  />
                  <motion.div
                    animate={{ y: [0, -72, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0"
                    style={{
                      background:
                        'repeating-linear-gradient(45deg, transparent 0px, transparent 12px, rgba(255,255,255,0.06) 12px, rgba(255,255,255,0.06) 24px, transparent 24px, transparent 36px)',
                    }}
                  />
                </div>
                {/* Top cap */}
                <div className="w-20 h-4 bg-[#C9A84C] rounded-sm mx-auto -mt-0.5" />
                <div className="w-20 h-4 bg-[#C9A84C] rounded-sm mx-auto mt-60" />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0907]/60 via-transparent to-transparent" />
          </div>

          {/* Floating card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="absolute -bottom-6 -right-6 glass-card rounded-sm p-5 w-44"
          >
            <div className="text-xs tracking-widest uppercase text-[#9E8F7A] mb-1">Open Today</div>
            <div className="font-serif text-[#C9A84C] text-lg">9AM – 8PM</div>
            <div className="flex gap-0.5 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={10} fill="#C9A84C" className="text-[#C9A84C]" />
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right: text */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-[#C9A84C] mb-4">Our Story</p>
          <h2 className="font-serif text-5xl md:text-6xl leading-tight text-[#F5F0E8] mb-6">
            More Than a
            <br />
            <span className="italic text-gold-shimmer">Haircut.</span>
          </h2>
          <p className="text-[#9E8F7A] leading-relaxed mb-4">
            Founded in 2008, The Baron Barber Co. was built on a simple belief: every
            man deserves a space to feel confident. Our barbers are more than technicians
            — they're craftsmen who take pride in their work.
          </p>
          <p className="text-[#9E8F7A] leading-relaxed mb-10">
            We blend time-honored barbering traditions with modern techniques to deliver
            results that speak for themselves. From the moment you walk in, the
            experience is designed around you.
          </p>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4 mb-10">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                className="glass-card rounded-sm p-4 border border-[var(--color-border)]"
              >
                <stat.icon size={16} className="text-[#C9A84C] mb-2" />
                <div className="font-serif text-2xl text-[#F5F0E8]">{stat.value}</div>
                <div className="text-xs text-[#9E8F7A] mt-0.5">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Signature */}
          <div className="flex items-center gap-4 pt-6 border-t border-[var(--color-border-subtle)]">
            <div className="w-10 h-10 rounded-full bg-[var(--color-gold-dim)] border border-[var(--color-border)] flex items-center justify-center">
              <span className="font-serif text-[#C9A84C] text-lg">J</span>
            </div>
            <div>
              <div className="font-serif text-[#F5F0E8] italic">James Baron</div>
              <div className="text-xs text-[#9E8F7A] tracking-wider">Master Barber & Founder</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
