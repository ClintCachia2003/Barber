import { motion } from 'framer-motion'
import { Scissors, MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from 'lucide-react'

const links = {
  Services: ['Classic Haircut', 'Skin Fade', 'Beard Trim', 'Full Grooming', 'Hot Towel Shave'],
  Company: ['About Us', 'Our Barbers', 'Gallery', 'Blog', 'Careers'],
}

export default function Footer() {
  return (
    <footer id="footer" className="bg-[#070604] border-t border-[var(--color-border)]">
      {/* CTA band */}
      <div className="border-b border-[var(--color-border)] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-3xl text-[#F5F0E8] mb-1">
              Ready for your best look?
            </h3>
            <p className="text-[#9E8F7A]">Walk-ins welcome · Appointments preferred</p>
          </div>
          <button
            onClick={() => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex-shrink-0 px-8 py-4 bg-[#C9A84C] text-[#0A0907] font-semibold tracking-widest uppercase text-sm rounded-sm hover:bg-[#E8C878] transition-all duration-200 cursor-pointer shadow-[0_0_40px_rgba(201,168,76,0.25)]"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-8 h-8 rounded-full bg-[var(--color-gold-dim)] border border-[var(--color-border)] flex items-center justify-center">
              <Scissors size={14} className="text-[#C9A84C] -rotate-45" />
            </div>
            <span className="font-serif text-lg text-[#F5F0E8]">
              The Baron <span className="text-[#C9A84C]">Co.</span>
            </span>
          </div>
          <p className="text-sm text-[#9E8F7A] leading-relaxed mb-6">
            Premium barbershop services crafted for the modern gentleman. Est. 2008.
          </p>
          <div className="flex gap-3">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <button
                key={i}
                className="w-9 h-9 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[#9E8F7A] hover:text-[#C9A84C] hover:border-[#C9A84C] transition-all duration-200 cursor-pointer"
                aria-label="Social media"
              >
                <Icon size={15} />
              </button>
            ))}
          </div>
        </div>

        {/* Links */}
        {Object.entries(links).map(([section, items]) => (
          <div key={section}>
            <h4 className="text-xs tracking-[0.25em] uppercase text-[#C9A84C] mb-5">{section}</h4>
            <ul className="space-y-2.5">
              {items.map((item) => (
                <li key={item}>
                  <button className="text-sm text-[#9E8F7A] hover:text-[#F5F0E8] transition-colors duration-150 cursor-pointer text-left">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact */}
        <div>
          <h4 className="text-xs tracking-[0.25em] uppercase text-[#C9A84C] mb-5">Find Us</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-2.5 text-sm text-[#9E8F7A]">
              <MapPin size={14} className="text-[#C9A84C] mt-0.5 flex-shrink-0" />
              <span>142 Groom Street<br />New York, NY 10001</span>
            </li>
            <li className="flex items-center gap-2.5 text-sm text-[#9E8F7A]">
              <Phone size={14} className="text-[#C9A84C] flex-shrink-0" />
              <span>+1 (212) 555-0147</span>
            </li>
            <li className="flex items-center gap-2.5 text-sm text-[#9E8F7A]">
              <Mail size={14} className="text-[#C9A84C] flex-shrink-0" />
              <span>hello@thebaronco.com</span>
            </li>
            <li className="flex items-start gap-2.5 text-sm text-[#9E8F7A]">
              <Clock size={14} className="text-[#C9A84C] mt-0.5 flex-shrink-0" />
              <span>Mon–Sat: 9AM – 8PM<br />Sunday: 10AM – 5PM</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--color-border-subtle)] px-6 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#9E8F7A]">
          <span>© {new Date().getFullYear()} The Baron Barber Co. All rights reserved.</span>
          <div className="flex gap-6">
            <button className="hover:text-[#C9A84C] transition-colors cursor-pointer">Privacy Policy</button>
            <button className="hover:text-[#C9A84C] transition-colors cursor-pointer">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  )
}
