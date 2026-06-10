import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const words = ['Precision.', 'Style.', 'Confidence.']

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.4 } },
}
const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient mesh */}
      <div className="absolute inset-0 bg-[#0A0907]">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#C9A84C]/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#B45309]/8 blur-[100px] pointer-events-none" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Decorative rotating ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none hidden lg:block">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="w-full h-full rounded-full border border-[rgba(201,168,76,0.06)]"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute top-12 left-12 right-12 bottom-12 rounded-full border border-[rgba(201,168,76,0.04)]"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Pre-heading badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-gold-dim)] mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-[#C9A84C]">
            Est. 2008 · Premium Barbershop
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.h1
            variants={item}
            className="font-serif text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight text-[#F5F0E8] mb-2"
          >
            Master
          </motion.h1>
          <motion.h1
            variants={item}
            className="font-serif text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight italic text-gold-shimmer mb-8"
          >
            Your Look
          </motion.h1>

          <motion.p
            variants={item}
            className="text-lg md:text-xl text-[#9E8F7A] font-light leading-relaxed max-w-xl mx-auto mb-4"
          >
            Where tradition meets modern craft. Expert cuts, classic shaves, and
            premium grooming in a space built for the discerning gentleman.
          </motion.p>

          {/* Word badges */}
          <motion.div variants={item} className="flex justify-center gap-3 mb-12 flex-wrap">
            {words.map((w) => (
              <span
                key={w}
                className="px-3 py-1 text-xs tracking-widest uppercase text-[#C9A84C] border border-[var(--color-border)] rounded-sm"
              >
                {w}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })}
              className="group px-8 py-4 bg-[#C9A84C] text-[#0A0907] font-semibold tracking-widest uppercase text-sm rounded-sm hover:bg-[#E8C878] transition-all duration-300 cursor-pointer shadow-[0_0_40px_rgba(201,168,76,0.3)] hover:shadow-[0_0_60px_rgba(201,168,76,0.5)]"
            >
              Book Appointment
            </button>
            <button
              onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 border border-[var(--color-border)] text-[#F5F0E8] font-medium tracking-widest uppercase text-sm rounded-sm hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-300 cursor-pointer"
            >
              Our Services
            </button>
          </motion.div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="flex justify-center gap-12 mt-20 pt-12 border-t border-[var(--color-border-subtle)]"
        >
          {[
            { num: '15+', label: 'Years of Craft' },
            { num: '5K+', label: 'Happy Clients' },
            { num: '8', label: 'Expert Barbers' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-serif text-3xl text-[#C9A84C]">{stat.num}</div>
              <div className="text-xs tracking-widest uppercase text-[#9E8F7A] mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#9E8F7A]"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  )
}
