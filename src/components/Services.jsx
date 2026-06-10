import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Scissors, Zap, User, Sparkles, Flame, Baby } from 'lucide-react'

const services = [
  {
    icon: Scissors,
    name: 'Classic Haircut',
    desc: 'Timeless scissor cut tailored to your face shape. Includes wash, cut & style.',
    price: '$35',
    duration: '45 min',
    tag: 'Popular',
  },
  {
    icon: Zap,
    name: 'Skin Fade',
    desc: 'Ultra-clean taper from skin to your desired length. Precision clipper work.',
    price: '$45',
    duration: '50 min',
    tag: 'Trending',
  },
  {
    icon: User,
    name: 'Beard Trim & Shape',
    desc: 'Sculpt and define your beard with expert shaping, edging and conditioning.',
    price: '$30',
    duration: '30 min',
    tag: null,
  },
  {
    icon: Sparkles,
    name: 'Full Grooming',
    desc: 'The full treatment — haircut, beard sculpt, scalp massage & hot towel finish.',
    price: '$75',
    duration: '90 min',
    tag: 'Best Value',
  },
  {
    icon: Flame,
    name: 'Hot Towel Shave',
    desc: 'Classic straight-razor shave with hot towels, shave cream & aftercare ritual.',
    price: '$50',
    duration: '45 min',
    tag: 'Signature',
  },
  {
    icon: Baby,
    name: "Kids Cut",
    desc: 'Patient, gentle cuts for children under 12. Comfortable chairs and quick service.',
    price: '$25',
    duration: '30 min',
    tag: null,
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" className="py-28 px-6 relative">
      {/* Section background accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.3)] to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16" ref={ref}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs tracking-[0.3em] uppercase text-[#C9A84C] mb-4"
          >
            What We Offer
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl text-[#F5F0E8] leading-tight"
          >
            Our Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#9E8F7A] mt-4 max-w-lg mx-auto"
          >
            Every service is a craft. Every client leaves feeling transformed.
          </motion.p>
        </div>

        {/* Service cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((svc, i) => (
            <ServiceCard key={svc.name} svc={svc} index={i} inView={inView} />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.3)] to-transparent" />
    </section>
  )
}

function ServiceCard({ svc, index, inView }) {
  const Icon = svc.icon

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="glass-card gold-glow-hover rounded-sm p-7 cursor-default relative overflow-hidden group"
    >
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[rgba(201,168,76,0.08)] to-transparent" />
      </div>

      {/* Tag */}
      {svc.tag && (
        <span className="inline-block px-2.5 py-0.5 text-[10px] tracking-widest uppercase text-[#0A0907] bg-[#C9A84C] rounded-sm mb-4">
          {svc.tag}
        </span>
      )}

      {/* Icon */}
      <div className="w-12 h-12 rounded-sm bg-[var(--color-gold-dim)] border border-[var(--color-border)] flex items-center justify-center mb-5 group-hover:bg-[rgba(201,168,76,0.2)] transition-colors duration-300">
        <Icon size={20} className="text-[#C9A84C]" />
      </div>

      {/* Content */}
      <h3 className="font-serif text-xl text-[#F5F0E8] mb-2">{svc.name}</h3>
      <p className="text-sm text-[#9E8F7A] leading-relaxed mb-6">{svc.desc}</p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border-subtle)]">
        <div>
          <span className="font-serif text-2xl text-[#C9A84C]">{svc.price}</span>
          <span className="text-[#9E8F7A] text-xs ml-2">· {svc.duration}</span>
        </div>
        <button
          onClick={() => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })}
          className="text-xs tracking-widest uppercase text-[#C9A84C] hover:text-[#E8C878] border border-[var(--color-border)] hover:border-[#C9A84C] px-3 py-1.5 rounded-sm transition-all duration-200 cursor-pointer"
        >
          Book
        </button>
      </div>
    </motion.div>
  )
}
