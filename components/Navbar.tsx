'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useI18n } from '@/lib/i18n-provider'
import { Button } from '@/components/ui/button'
import { 
  Menu, 
  X, 
  Globe, 
  Moon, 
  Sun,
  Home,
  Briefcase,
  BarChart3,
  LogOut
} from 'lucide-react'
import { useTheme } from 'next-themes'

export function Navbar() {
  const { language, setLanguage, t } = useI18n()
  const { theme, setTheme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // Check if user is on authenticated pages (dashboard, workspace, profile, etc.)
  const isAuthenticatedPage = pathname?.startsWith('/dashboard') || 
    pathname?.startsWith('/workspace') || 
    pathname?.startsWith('/profile') ||
    pathname?.startsWith('/chat') ||
    pathname?.startsWith('/upload') ||
    pathname?.startsWith('/forms')

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const navigation = [
    { name: t('nav.home'), href: '/', icon: Home },
    { name: t('nav.workspace'), href: '/workspace', icon: Briefcase },
    { name: t('nav.dashboard'), href: '/dashboard', icon: BarChart3 },
  ]

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'bn' : 'en')
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <nav className="bg-background border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <img src="/logo.svg" alt="Logo" className="h-10 w-10" />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-foreground hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary"
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="relative"
            >
              <Globe className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {language === 'en' ? 'EN' : 'বা'}
              </span>
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
            >
              {mounted ? (
                theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )
              ) : (
                <span className="inline-block h-5 w-5" />
              )}
            </Button>

            {isAuthenticatedPage ? (
              <>
                
                <Button
                  variant="outline"
                  onClick={() => router.push('/login')}
                  className="flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline">
                    {t('nav.login')}
                  </Button>
                </Link>
                
                <Link href="/signup">
                  <Button>
                    {t('nav.signup')}
                  </Button>
                </Link>
              </>
            )}
          </div>

          <div className="sm:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1 bg-background border-t">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-accent"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              )
            })}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4 space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="flex items-center space-x-2"
              >
                <Globe className="h-4 w-4" />
                <span>{language === 'en' ? 'English' : 'বাংলা'}</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
              >
                {mounted ? (
                  theme === 'dark' ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )
                ) : (
                  <span className="inline-block h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="mt-3 px-2 space-y-1">
              {isAuthenticatedPage ? (
                <>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => {
                      router.push('/login')
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" className="block w-full">
                    <Button variant="outline" className="w-full justify-start">
                      {t('nav.login')}
                    </Button>
                  </Link>
                  <Link href="/signup" className="block w-full">
                    <Button className="w-full justify-start">
                      {t('nav.signup')}
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}