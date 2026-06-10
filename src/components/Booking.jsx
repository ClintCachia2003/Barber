import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Scissors, Zap, User, Sparkles, Flame, Baby, ChevronRight, ChevronLeft, Check, Calendar, Clock } from 'lucide-react'

const services = [
  { icon: Scissors, name: 'Classic Haircut', price: '$35', duration: '45 min' },
  { icon: Zap, name: 'Skin Fade', price: '$45', duration: '50 min' },
  { icon: User, name: 'Beard Trim', price: '$30', duration: '30 min' },
  { icon: Sparkles, name: 'Full Grooming', price: '$75', duration: '90 min' },
  { icon: Flame, name: 'Hot Towel Shave', price: '$50', duration: '45 min' },
  { icon: Baby, name: "Kids Cut", price: '$25', duration: '30 min' },
]

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
  '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM',
]

const barbers = ['James Baron', 'Marcus Lee', 'David Ortiz', 'Alex Chen']

const STEPS = ['Service', 'Schedule', 'Details']

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
}

export default function Booking() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [done, setDone] = useState(false)

  const [form, setForm] = useState({
    service: null,
    barber: '',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    notes: '',
  })

  const update = (key, val) => setForm((f) => ({ ...f, [key]: val }))

  const next = () => {
    setDir(1)
    setStep((s) => s + 1)
  }
  const back = () => {
    setDir(-1)
    setStep((s) => s - 1)
  }

  const submit = (e) => {
    e.preventDefault()
    setDone(true)
  }

  const today = new Date().toISOString().split('T')[0]

  if (done) return <BookingSuccess form={form} onReset={() => { setDone(false); setStep(0); setForm({ service: null, barber: '', date: '', time: '', name: '', email: '', phone: '', notes: '' }) }} />

  return (
    <section id="booking" className="py-28 px-6 bg-[#0C0A09]" ref={ref}>
      <div className="absolute top-0 left-0 right-0 h-px" />

      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-xs tracking-[0.3em] uppercase text-[#C9A84C] mb-4"
          >
            Reserve Your Seat
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl text-[#F5F0E8]"
          >
            Book Appointment
          </motion.h2>
        </div>

        {/* Progress steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-0 mb-12"
        >
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-400 ${
                    i < step
                      ? 'bg-[#C9A84C] text-[#0A0907]'
                      : i === step
                      ? 'bg-[var(--color-gold-dim)] border-2 border-[#C9A84C] text-[#C9A84C]'
                      : 'bg-[#1C1917] border border-[var(--color-border-subtle)] text-[#9E8F7A]'
                  }`}
                >
                  {i < step ? <Check size={14} /> : i + 1}
                </div>
                <span
                  className={`text-[10px] tracking-widest uppercase transition-colors duration-300 ${
                    i <= step ? 'text-[#C9A84C]' : 'text-[#9E8F7A]'
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`w-24 h-px mx-3 mb-5 transition-all duration-500 ${
                    i < step ? 'bg-[#C9A84C]' : 'bg-[var(--color-border-subtle)]'
                  }`}
                />
              )}
            </div>
          ))}
        </motion.div>

        {/* Step panels */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-sm p-8 min-h-[420px] relative overflow-hidden"
        >
          <AnimatePresence mode="wait" custom={dir}>
            {step === 0 && (
              <StepService
                key="service"
                dir={dir}
                form={form}
                update={update}
                onNext={next}
              />
            )}
            {step === 1 && (
              <StepSchedule
                key="schedule"
                dir={dir}
                form={form}
                update={update}
                today={today}
                onNext={next}
                onBack={back}
                barbers={barbers}
              />
            )}
            {step === 2 && (
              <StepDetails
                key="details"
                dir={dir}
                form={form}
                update={update}
                onBack={back}
                onSubmit={submit}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Step 1: Service ─── */
function StepService({ dir, form, update, onNext }) {
  return (
    <motion.div
      custom={dir}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <h3 className="font-serif text-2xl text-[#F5F0E8] mb-6">Choose Your Service</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
        {services.map((svc) => {
          const Icon = svc.icon
          const active = form.service === svc.name
          return (
            <button
              key={svc.name}
              onClick={() => update('service', svc.name)}
              className={`p-4 rounded-sm border text-left transition-all duration-200 cursor-pointer ${
                active
                  ? 'border-[#C9A84C] bg-[var(--color-gold-dim)] shadow-[0_0_20px_rgba(201,168,76,0.15)]'
                  : 'border-[var(--color-border-subtle)] hover:border-[var(--color-border)] bg-[#1C1917]/40'
              }`}
            >
              <Icon size={18} className={active ? 'text-[#C9A84C]' : 'text-[#9E8F7A]'} />
              <div className={`text-sm font-medium mt-2 ${active ? 'text-[#F5F0E8]' : 'text-[#9E8F7A]'}`}>
                {svc.name}
              </div>
              <div className="flex gap-2 mt-1">
                <span className="text-[#C9A84C] text-xs font-medium">{svc.price}</span>
                <span className="text-[#9E8F7A] text-xs">· {svc.duration}</span>
              </div>
            </button>
          )
        })}
      </div>
      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={!form.service}
          className="flex items-center gap-2 px-6 py-3 bg-[#C9A84C] text-[#0A0907] font-semibold text-sm tracking-widest uppercase rounded-sm hover:bg-[#E8C878] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
        >
          Next <ChevronRight size={16} />
        </button>
      </div>
    </motion.div>
  )
}

/* ─── Step 2: Schedule ─── */
function StepSchedule({ dir, form, update, today, onNext, onBack, barbers }) {
  return (
    <motion.div
      custom={dir}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <h3 className="font-serif text-2xl text-[#F5F0E8] mb-6">Pick a Date & Time</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Date */}
        <div>
          <label className="flex items-center gap-1.5 text-xs tracking-widest uppercase text-[#9E8F7A] mb-2">
            <Calendar size={12} /> Date
          </label>
          <input
            type="date"
            min={today}
            value={form.date}
            onChange={(e) => update('date', e.target.value)}
            className="w-full bg-[#1C1917] border border-[var(--color-border-subtle)] rounded-sm px-4 py-3 text-[#F5F0E8] text-sm focus:outline-none focus:border-[#C9A84C] transition-colors duration-200 cursor-pointer"
            style={{ colorScheme: 'dark' }}
          />
        </div>

        {/* Barber */}
        <div>
          <label className="flex items-center gap-1.5 text-xs tracking-widest uppercase text-[#9E8F7A] mb-2">
            <User size={12} /> Barber (optional)
          </label>
          <select
            value={form.barber}
            onChange={(e) => update('barber', e.target.value)}
            className="w-full bg-[#1C1917] border border-[var(--color-border-subtle)] rounded-sm px-4 py-3 text-[#F5F0E8] text-sm focus:outline-none focus:border-[#C9A84C] transition-colors duration-200 cursor-pointer appearance-none"
            style={{ colorScheme: 'dark' }}
          >
            <option value="">Any Available</option>
            {barbers.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
      </div>

      {/* Time slots */}
      <div className="mb-8">
        <label className="flex items-center gap-1.5 text-xs tracking-widest uppercase text-[#9E8F7A] mb-3">
          <Clock size={12} /> Time
        </label>
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
          {timeSlots.map((t) => (
            <button
              key={t}
              onClick={() => update('time', t)}
              className={`px-2 py-2 text-xs rounded-sm border transition-all duration-150 cursor-pointer ${
                form.time === t
                  ? 'border-[#C9A84C] bg-[var(--color-gold-dim)] text-[#C9A84C]'
                  : 'border-[var(--color-border-subtle)] text-[#9E8F7A] hover:border-[var(--color-border)] hover:text-[#F5F0E8]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-3 border border-[var(--color-border)] text-[#9E8F7A] hover:text-[#F5F0E8] hover:border-[rgba(255,255,255,0.2)] text-sm tracking-widest uppercase rounded-sm transition-all duration-200 cursor-pointer"
        >
          <ChevronLeft size={16} /> Back
        </button>
        <button
          onClick={onNext}
          disabled={!form.date || !form.time}
          className="flex items-center gap-2 px-6 py-3 bg-[#C9A84C] text-[#0A0907] font-semibold text-sm tracking-widest uppercase rounded-sm hover:bg-[#E8C878] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
        >
          Next <ChevronRight size={16} />
        </button>
      </div>
    </motion.div>
  )
}

/* ─── Step 3: Details ─── */
function StepDetails({ dir, form, update, onBack, onSubmit }) {
  return (
    <motion.div
      custom={dir}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <h3 className="font-serif text-2xl text-[#F5F0E8] mb-6">Your Details</h3>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs tracking-widest uppercase text-[#9E8F7A] mb-1.5 block">
              Full Name <span className="text-[#C9A84C]">*</span>
            </label>
            <input
              required
              type="text"
              placeholder="James Anderson"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              className="w-full bg-[#1C1917] border border-[var(--color-border-subtle)] rounded-sm px-4 py-3 text-[#F5F0E8] text-sm placeholder-[#44403C] focus:outline-none focus:border-[#C9A84C] transition-colors duration-200"
            />
          </div>
          <div>
            <label className="text-xs tracking-widest uppercase text-[#9E8F7A] mb-1.5 block">
              Phone <span className="text-[#C9A84C]">*</span>
            </label>
            <input
              required
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
              className="w-full bg-[#1C1917] border border-[var(--color-border-subtle)] rounded-sm px-4 py-3 text-[#F5F0E8] text-sm placeholder-[#44403C] focus:outline-none focus:border-[#C9A84C] transition-colors duration-200"
            />
          </div>
        </div>
        <div>
          <label className="text-xs tracking-widest uppercase text-[#9E8F7A] mb-1.5 block">
            Email <span className="text-[#C9A84C]">*</span>
          </label>
          <input
            required
            type="email"
            placeholder="james@example.com"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            className="w-full bg-[#1C1917] border border-[var(--color-border-subtle)] rounded-sm px-4 py-3 text-[#F5F0E8] text-sm placeholder-[#44403C] focus:outline-none focus:border-[#C9A84C] transition-colors duration-200"
          />
        </div>
        <div>
          <label className="text-xs tracking-widest uppercase text-[#9E8F7A] mb-1.5 block">
            Special Requests
          </label>
          <textarea
            rows={3}
            placeholder="Any preferences or notes for your barber..."
            value={form.notes}
            onChange={(e) => update('notes', e.target.value)}
            className="w-full bg-[#1C1917] border border-[var(--color-border-subtle)] rounded-sm px-4 py-3 text-[#F5F0E8] text-sm placeholder-[#44403C] focus:outline-none focus:border-[#C9A84C] transition-colors duration-200 resize-none"
          />
        </div>

        {/* Summary */}
        <div className="p-4 rounded-sm bg-[var(--color-gold-dim)] border border-[var(--color-border)] text-sm">
          <div className="font-medium text-[#C9A84C] mb-2 text-xs tracking-widest uppercase">Booking Summary</div>
          <div className="space-y-1 text-[#9E8F7A]">
            <div>Service: <span className="text-[#F5F0E8]">{form.service}</span></div>
            <div>Date: <span className="text-[#F5F0E8]">{form.date}</span></div>
            <div>Time: <span className="text-[#F5F0E8]">{form.time}</span></div>
            {form.barber && <div>Barber: <span className="text-[#F5F0E8]">{form.barber}</span></div>}
          </div>
        </div>

        <div className="flex justify-between pt-2">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 px-5 py-3 border border-[var(--color-border)] text-[#9E8F7A] hover:text-[#F5F0E8] hover:border-[rgba(255,255,255,0.2)] text-sm tracking-widest uppercase rounded-sm transition-all duration-200 cursor-pointer"
          >
            <ChevronLeft size={16} /> Back
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-3 bg-[#C9A84C] text-[#0A0907] font-semibold text-sm tracking-widest uppercase rounded-sm hover:bg-[#E8C878] transition-all duration-200 cursor-pointer shadow-[0_0_30px_rgba(201,168,76,0.3)]"
          >
            Confirm Booking <Check size={16} />
          </button>
        </div>
      </form>
    </motion.div>
  )
}

/* ─── Success Screen ─── */
function BookingSuccess({ form, onReset }) {
  return (
    <section id="booking" className="py-28 px-6 bg-[#0C0A09]">
      <div className="max-w-xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="w-20 h-20 rounded-full bg-[var(--color-gold-dim)] border-2 border-[#C9A84C] flex items-center justify-center mx-auto mb-8"
        >
          <Check size={32} className="text-[#C9A84C]" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-serif text-4xl text-[#F5F0E8] mb-4"
        >
          Booking Confirmed!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-[#9E8F7A] mb-8"
        >
          Thanks, <span className="text-[#F5F0E8]">{form.name}</span>! Your{' '}
          <span className="text-[#C9A84C]">{form.service}</span> appointment is set for{' '}
          <span className="text-[#F5F0E8]">{form.date}</span> at{' '}
          <span className="text-[#F5F0E8]">{form.time}</span>. A confirmation will be sent to{' '}
          <span className="text-[#F5F0E8]">{form.email}</span>.
        </motion.p>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          onClick={onReset}
          className="px-6 py-3 border border-[var(--color-border)] text-[#9E8F7A] hover:text-[#C9A84C] hover:border-[#C9A84C] text-sm tracking-widest uppercase rounded-sm transition-all duration-200 cursor-pointer"
        >
          Book Another
        </motion.button>
      </div>
    </section>
  )
}
