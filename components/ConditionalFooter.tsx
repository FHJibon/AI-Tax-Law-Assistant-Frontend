'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function ConditionalFooter() {
  const pathname = usePathname()

  // Hide footer on workspace and dashboard routes
  if (pathname && (pathname.startsWith('/workspace') || pathname.startsWith('/dashboard'))) return null

  return (
    <footer className="bg-background border-t py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
          </div>
          <p className={`text-sm text-muted-foreground`}>
            © 2025 AI Tax & Law Assistant
          </p>
        </div>
      </div>
    </footer>
  )
}
