'use client'

import { Bell, Search, User, CheckCircle2, Menu } from 'lucide-react'
import { motion } from 'framer-motion'
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

export function AdminHeader() {
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setUserEmail(user.email ?? 'admin@veltolabs.com')
    })
  }, [supabase.auth])

  return (
    <header className="h-20 bg-white/40 backdrop-blur-md border-b border-[#f1f5f9] px-8 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-6 flex-1">
        <button className="lg:hidden p-2 text-brand-navy hover:bg-brand-light rounded-xl transition-colors">
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="relative group max-w-md w-full hidden md:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-brand-slate group-focus-within:text-brand-navy transition-colors" />
          <input 
            type="text" 
            placeholder="Search commands, pages, or data..." 
            className="w-full bg-[#f8fafc]/80 border-none rounded-2xl py-2.5 pl-12 pr-4 text-sm text-brand-navy focus:ring-2 focus:ring-brand-teal/20 transition-all outline-none placeholder:text-brand-slate/50 font-medium"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl border border-brand-light shadow-sm">
          <CheckCircle2 className="w-3.5 h-3.5 text-brand-teal" />
          <span className="text-[10px] font-bold text-brand-teal uppercase tracking-widest leading-none">VERIFIED STATUS</span>
        </div>

        <div className="flex items-center gap-4 group cursor-pointer p-1.5 rounded-2xl hover:bg-brand-light transition-all">
          <div className="hidden sm:flex flex-col items-end">
             <span className="text-sm font-bold text-brand-navy leading-tight">{userEmail || 'Administrator'}</span>
             <span className="text-[11px] font-bold text-brand-slate uppercase tracking-wider leading-none">SYSTEM ROOT</span>
          </div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-11 h-11 rounded-full bg-brand-navy flex items-center justify-center text-white shadow-lg overflow-hidden relative"
          >
             <User className="w-6 h-6" />
             <div className="absolute top-0 right-0 w-3 h-3 bg-brand-teal border-2 border-white rounded-full shadow-sm" />
          </motion.div>
        </div>
      </div>
    </header>
  )
}
