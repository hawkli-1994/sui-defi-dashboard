import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { WalletConnect } from './WalletConnect'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  Wallet, 
  TrendingUp, 
  Shield, 
  Activity
} from 'lucide-react'

interface LayoutProps {
  children: ReactNode
}

const navigation = [
  { name: '总览', href: '/', icon: LayoutDashboard },
  { name: '资产管理', href: '/assets', icon: Wallet },
  { name: '借贷监控', href: '/lending', icon: Shield },
  { name: '收益优化', href: '/yield', icon: TrendingUp },
  { name: '历史分析', href: '/analytics', icon: Activity },
]

export function Layout({ children }: LayoutProps) {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b border-border/50 backdrop-blur-lg">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="h-10 w-10 rounded-xl gradient-bg flex items-center justify-center shadow-lg hover-lift transition-all duration-300">
                <span className="text-primary-foreground font-bold text-lg">S</span>
              </div>
              <span className="font-bold text-xl text-gradient group-hover:scale-105 transition-transform duration-300">
                Sui DeFi Dashboard
              </span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-2">
              {navigation.map((item, index) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                      "hover-lift",
                      isActive
                        ? "bg-primary/10 text-primary shadow-[inset_0_1px_0px_hsl(var(--primary)/0.2)]"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    )}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <WalletConnect />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="container mx-auto px-6 py-8 animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  )
}