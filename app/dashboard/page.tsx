'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useI18n } from '@/lib/i18n-provider'
import { Navbar } from '@/components/Navbar'
import { DashboardCard, StatsCard } from '@/components/DashboardCard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  BarChart3,
  TrendingUp,
  FileText,
  Calendar,
  DollarSign,
  PieChart,
  Download,
  Calculator,
  User,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Edit,
  
} from 'lucide-react'

export default function DashboardPage() {
  const { t } = useI18n()
  const router = useRouter()

  const stats = [
    {
      title: t('dashboard.income'),
      value: '-',
      icon: DollarSign,
      trend: { value: 12, isPositive: true },
      color: 'green' as const
    },
    {
      title: t('dashboard.tax'),
      value: '-',
      icon: PieChart,
      trend: { value: 5, isPositive: false },
      color: 'purple' as const
    }
  ]

  const userData = {
    name: '',
    mobile: '',
    email: '',
    address: '',
    tin: '',
    nid: '',
    dateOfBirth: '',
    occupation: ''
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {t('dashboard.title')}
              </h1>
              <p className="text-xl text-muted-foreground">
                Welcome back! Here&apos;s your tax overview.
              </p>
            </div>
            {/* header actions removed */}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              trend={stat.trend}
              color={stat.color}
            />
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 flex flex-col h-full">
            {/* My Data */}
            <Card className="flex-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="h-5 w-5" />
                      <span>My Data</span>
                    </CardTitle>
                    <CardDescription>
                      Your personal information
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => router.push('/profile')}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Full Name</p>
                      <p className="font-medium">{userData.name || '—'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Phone className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Mobile Number</p>
                      <p className="font-medium">{userData.mobile || '—'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Mail className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email Address</p>
                      <p className="font-medium">{userData.email || '—'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-medium">{userData.address || '—'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <CreditCard className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">TIN Number</p>
                      <p className="font-medium">{userData.tin || '—'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <CreditCard className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">NID Number</p>
                      <p className="font-medium">{userData.nid || '—'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Date of Birth</p>
                      <p className="font-medium">{userData.dateOfBirth ? new Date(userData.dateOfBirth).toLocaleDateString('en-GB', { timeZone: 'UTC' }) : '—'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Occupation</p>
                      <p className="font-medium">{userData.occupation || '—'}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col h-full">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => router.push('/calculation')}
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  Open Calculator
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => {
                    // Download the most recent tax file
                    const link = document.createElement('a')
                    link.href = '/tax-files/recent-tax-return.pdf'
                    link.download = 'recent-tax-return.pdf'
                    link.click()
                  }}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Forms
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}