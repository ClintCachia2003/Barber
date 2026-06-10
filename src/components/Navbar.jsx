import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Scissors } from 'lucide-react'

const links = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#footer' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href) => {
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0A0907]/90 backdrop-blur-xl border-b border-[rgba(201,168,76,0.12)] shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => scrollTo('#root')} className="flex items-center gap-2.5 cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-[var(--color-gold-dim)] border border-[var(--color-border)] flex items-center justify-center">
              <Scissors size={16} className="text-[#C9A84C] -rotate-45" />
            </div>
            <span className="font-serif text-xl tracking-wide text-[#F5F0E8]">
              The Baron
              <span className="text-[#C9A84C]"> Co.</span>
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-sm font-medium tracking-widest uppercase text-[#9E8F7A] hover:text-[#C9A84C] transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo('#booking')}
              className="ml-2 px-5 py-2.5 text-sm font-semibold tracking-widest uppercase rounded-sm bg-[#C9A84C] text-[#0A0907] hover:bg-[#E8C878] transition-all duration-200 cursor-pointer"
            >
              Book Now
            </button>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-[#C9A84C] cursor-pointer"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-40 flex flex-col pt-24 px-8 pb-12 glass-card md:hidden"
          >
            <nav className="flex flex-col gap-6 mt-4">
              {links.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => scrollTo(link.href)}
                  className="text-left font-serif text-3xl text-[#F5F0E8] hover:text-[#C9A84C] transition-colors cursor-pointer border-b border-[var(--color-border-subtle)] pb-4"
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: links.length * 0.06 }}
                onClick={() => scrollTo('#booking')}
                className="mt-4 px-8 py-4 text-base font-semibold tracking-widest uppercase rounded-sm bg-[#C9A84C] text-[#0A0907] hover:bg-[#E8C878] transition-colors cursor-pointer text-center"
              >
                Book Now
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
