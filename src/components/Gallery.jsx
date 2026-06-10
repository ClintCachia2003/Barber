import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const galleryItems = [
  {
    label: 'Classic Fade',
    gradient: 'from-stone-800 via-neutral-700 to-stone-900',
    accent: '#C9A84C',
    tag: 'Fade',
    style: 'col-span-1 row-span-2',
  },
  {
    label: 'Textured Crop',
    gradient: 'from-zinc-800 via-stone-700 to-neutral-900',
    accent: '#E8C878',
    tag: 'Crop',
    style: 'col-span-1 row-span-1',
  },
  {
    label: 'Slick Back',
    gradient: 'from-neutral-900 via-stone-800 to-zinc-800',
    accent: '#B45309',
    tag: 'Classic',
    style: 'col-span-1 row-span-1',
  },
  {
    label: 'Beard Sculpt',
    gradient: 'from-stone-700 via-amber-900 to-stone-900',
    accent: '#D97706',
    tag: 'Beard',
    style: 'col-span-1 row-span-1',
  },
  {
    label: 'Undercut',
    gradient: 'from-zinc-900 via-neutral-800 to-stone-800',
    accent: '#C9A84C',
    tag: 'Undercut',
    style: 'col-span-1 row-span-1',
  },
  {
    label: 'Pompadour',
    gradient: 'from-stone-900 via-amber-950 to-stone-800',
    accent: '#E8C878',
    tag: 'Signature',
    style: 'col-span-1 row-span-2',
  },
]

export default function Gallery() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [selected, setSelected] = useState(null)

  return (
    <section id="gallery" className="py-28 px-6 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.3)] to-transparent" />

      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Heading */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs tracking-[0.3em] uppercase text-[#C9A84C] mb-4"
          >
            Our Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl text-[#F5F0E8]"
          >
            The Gallery
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[#9E8F7A] mt-4"
          >
            Every cut is a canvas. Every client is a masterpiece.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px]">
          {galleryItems.map((item, i) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              onClick={() => setSelected(item)}
              className={`relative overflow-hidden rounded-sm cursor-pointer group ${item.style}`}
            >
              {/* Gradient background simulating photo */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`} />

              {/* Texture overlay */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `radial-gradient(circle at 30% 30%, ${item.accent}22 0%, transparent 60%),
                                    radial-gradient(circle at 70% 70%, ${item.accent}11 0%, transparent 50%)`,
                }}
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#0A0907]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-[#F5F0E8] font-serif text-xl">{item.label}</span>
              </div>

              {/* Tag */}
              <div className="absolute top-3 left-3">
                <span
                  className="px-2 py-0.5 text-[10px] tracking-widest uppercase rounded-sm font-medium"
                  style={{ background: `${item.accent}22`, color: item.accent, border: `1px solid ${item.accent}44` }}
                >
                  {item.tag}
                </span>
              </div>

              {/* Bottom label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0A0907] to-transparent">
                <span className="text-sm font-medium text-[#F5F0E8]">{item.label}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 bg-[#0A0907]/90 backdrop-blur-sm flex items-center justify-center p-8"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl aspect-video rounded-sm overflow-hidden glass-card"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${selected.gradient}`} />
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 30% 30%, ${selected.accent}33 0%, transparent 60%)`,
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="font-serif text-4xl text-[#F5F0E8]">{selected.label}</h3>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full glass-card flex items-center justify-center text-[#9E8F7A] hover:text-[#F5F0E8] transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.3)] to-transparent" />
    </section>
  )
}
