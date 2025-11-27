'use client'

import React from 'react'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n-provider'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Navbar } from '@/components/Navbar'
import { 
  Calculator, 
  Bot, 
  Upload, 
  Globe, 
  Shield, 
  Clock,
  CheckCircle,
  ArrowRight,
  Sparkles,
  FileText,
  Receipt
} from 'lucide-react'
// removed framer-motion to avoid potential hydration mismatches

export default function HomePage() {
  const { t, language } = useI18n()

  const features = [
    {
      icon: Bot,
      title: t('landing.feature1'),
      description: t('landing.feature1.desc'),
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Upload,
      title: t('landing.feature2'),
      description: t('landing.feature2.desc'),
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Globe,
      title: t('landing.feature3'),
      description: t('landing.feature3.desc'),
      color: 'from-purple-500 to-pink-500'
    }
  ]

  const benefits = [
    t('landing.benefits.1'),
    t('landing.benefits.2'),
    t('landing.benefits.3'),
    t('landing.benefits.4'),
    t('landing.benefits.5'),
    t('landing.benefits.6')
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div>
              <div className="flex justify-center mb-6">
                <img src="/logo.svg" alt="Logo" className="h-16 w-16 rounded-xl shadow-lg" />
              </div>
              
              <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${
                language === 'bn' ? 'bangla-text' : ''
              }`}>
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  {t('landing.title')}
                </span>
              </h1>
              
              <p className={`text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto ${
                language === 'bn' ? 'bangla-text' : ''
              }`}>
                {t('landing.subtitle')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/workspace">
                  <Button size="lg" className="text-lg px-8 py-3">
                    <Sparkles className="mr-2 h-5 w-5" />
                    {t('landing.cta')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                    <Calculator className="mr-2 h-5 w-5" />
                    {language === 'bn' ? 'মূল্য দেখুন' : 'View Pricing'}
                  </Button>
                </Link>
                {/* Quick Action removed as requested */}
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-16 h-16 bg-green-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-purple-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              language === 'bn' ? 'bangla-text' : ''
            }`}>
              {t('landing.whyChoose')}
            </h2>
            <p className={`text-xl text-muted-foreground max-w-2xl mx-auto ${
              language === 'bn' ? 'bangla-text' : ''
            }`}>
              {t('landing.whyChoose.desc')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className={`text-xl ${
                        language === 'bn' ? 'bangla-text' : ''
                      }`}>
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className={`text-base ${
                        language === 'bn' ? 'bangla-text' : ''
                      }`}>
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${
                language === 'bn' ? 'bangla-text' : ''
              }`}>
                {t('landing.benefits.title')}
              </h2>
              <p className={`text-xl text-muted-foreground mb-8 ${
                language === 'bn' ? 'bangla-text' : ''
              }`}>
                {t('landing.benefits.desc')}
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className={`text-lg ${
                      language === 'bn' ? 'bangla-text' : ''
                    }`}>
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <Card className="p-8 bg-gradient-to-br from-primary/5 to-blue-500/5">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center mb-6">
                    <div className="relative">
                      <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-5 rounded-2xl shadow-lg">
                        <Shield className="h-10 w-10 text-white" strokeWidth={2.5} />
                      </div>
                    </div>
                  </div>
                  <h3 className={`text-2xl font-bold mb-4 ${
                    language === 'bn' ? 'bangla-text' : ''
                  }`}>
                    {t('landing.security.title')}
                  </h3>
                  <p className={`text-muted-foreground mb-6 ${
                    language === 'bn' ? 'bangla-text' : ''
                  }`}>
                    {t('landing.security.desc')}
                  </p>
                  <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                    <div className={`flex items-center space-x-1 ${
                      language === 'bn' ? 'bangla-text' : ''
                    }`}>
                      <Clock className="h-4 w-4" />
                      <span>{t('landing.security.available')}</span>
                    </div>
                    <div className={`flex items-center space-x-1 ${
                      language === 'bn' ? 'bangla-text' : ''
                    }`}>
                      <Shield className="h-4 w-4" />
                      <span>{t('landing.security.secure')}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div>
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${
              language === 'bn' ? 'bangla-text' : ''
            }`}>
              {t('landing.cta2.title')}
            </h2>
            <p className={`text-xl text-muted-foreground mb-8 ${
              language === 'bn' ? 'bangla-text' : ''
            }`}>
              {t('landing.cta2.desc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className={`text-lg px-8 py-3 ${
                  language === 'bn' ? 'bangla-text' : ''
                }`}>
                  {t('landing.cta2.start')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/workspace">
                <Button variant="outline" size="lg" className={`text-lg px-8 py-3 ${
                  language === 'bn' ? 'bangla-text' : ''
                }`}>
                  {t('landing.cta2.demo')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer moved to RootLayout (conditionally hidden on /workspace) */}

      {/* Floating Calculator Bubble */}
      <Link href="/calculation" aria-label="Open Tax Calculator" title={language === 'bn' ? 'ক্যালকুলেটর' : 'Calculator'}>
        <div className="fixed bottom-6 right-6 z-50">
          <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary-600 to-primary-500 shadow-2xl flex items-center justify-center text-white hover:scale-105 transition-transform ring-2 ring-primary-400/25">
            <span className="sr-only">{language === 'bn' ? 'ক্যালকুলেটর খুলুন' : 'Open Calculator'}</span>
            <Calculator className="h-6 w-6" />
          </div>
        </div>
      </Link>
    </div>
  )
}