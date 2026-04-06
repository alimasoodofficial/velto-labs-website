'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { 
  LayoutDashboard, 
  Settings, 
  Briefcase,
  FileText, // Blogs
  Calendar, // Bookings
  LogOut,
  ExternalLink,
  ChevronRight,
  User,
  Quote,
  Award,
  Image as ImageIcon,
  Sparkles
} from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import Image from 'next/image'

const menuItems = [
  { name: 'Services', href: '/admin/services', icon: Briefcase },
  { name: 'Blog', href: '/admin/blog', icon: FileText },
  { name: 'Bookings', href: '/admin/bookings', icon: Calendar },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      toast.success('Signed Out', { description: 'Successfully logged out of the hub.' })
      router.push('/admin/login')
      router.refresh()
    } catch (err) {
      toast.error('Logout Failed')
    }
  }

  return (
    <aside className="w-72 bg-white border-r border-[#f1f5f9] flex flex-col h-screen sticky top-0 font-display">
      <div className="p-8 pb-4">
        <Link href="/admin" className="flex items-center gap-3 group">
          <div className="w-10 h-10 relative">
             <Image 
                src="/images/logo-main.png" 
                alt="Logo" 
                fill 
                className="object-contain"
             />
          </div>
          <span className="font-bold text-xl tracking-tight text-brand-navy">Velto Hub</span>
        </Link>
      </div>

      <div className="flex-1 px-4 py-4 space-y-8 overflow-y-auto scrollbar-hide">
        <div>
          <h3 className="text-[11px] font-bold text-brand-slate uppercase tracking-[0.2em] px-4 mb-4">ADMIN HUB</h3>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 group
                    ${isActive 
                      ? 'bg-brand-navy text-white shadow-lg shadow-brand-navy/10 font-semibold' 
                      : 'text-brand-slate hover:bg-brand-light hover:text-brand-navy font-medium'
                    }
                  `}
                >
                  <item.icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? '' : 'group-hover:scale-110'}`} />
                  <span className="flex-1 text-[15px]">{item.name}</span>
                  {isActive && (
                    <motion.div layoutId="active" className="w-1.5 h-1.5 rounded-full bg-brand-teal shadow-[0_0_10px_rgba(13,148,136,0.6)]" />
                  )}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      <div className="p-4 border-t border-[#f1f5f9] bg-[#fcfdfe]">
        <div className="bg-[#f8fafc] rounded-3xl p-4 space-y-4">
          <div className="flex items-center gap-3 px-1">
            <div className="w-11 h-11 rounded-2xl bg-brand-navy flex items-center justify-center text-white font-bold text-lg shadow-xl shadow-brand-navy/10 shrink-0">
              R
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold text-brand-navy truncate">Administrator</p>
              <p className="text-[11px] font-bold text-brand-teal uppercase tracking-widest">ACTIVE SESSION</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-2">
            <Link 
              href="/" 
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-brand-light bg-white text-[13px] font-bold text-brand-navy hover:bg-brand-light transition-all shadow-sm group"
            >
              <ExternalLink className="w-4 h-4 text-brand-teal group-hover:rotate-12 transition-transform" />
              BACK TO WEBSITE
            </Link>
            
            <button 
              onClick={handleSignOut}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white border border-brand-light text-[13px] font-bold text-brand-slate hover:text-red-500 hover:bg-red-50 hover:border-red-100 transition-all group"
            >
              <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              SIGN OUT
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
