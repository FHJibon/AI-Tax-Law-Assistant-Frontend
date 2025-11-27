'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LucideIcon } from 'lucide-react'

interface DashboardCardProps {
  title: string
  description?: string
  value?: string | number
  icon?: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
  children?: React.ReactNode
}

export function DashboardCard({
  title,
  description,
  value,
  icon: Icon,
  trend,
  action,
  className,
  children
}: DashboardCardProps) {
  return (
    <div>
      <Card className={`relative overflow-hidden ${className || ''}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {title}
          </CardTitle>
          {Icon && (
            <Icon className="h-4 w-4 text-muted-foreground" />
          )}
        </CardHeader>
        <CardContent>
          {value && (
            <div className="text-2xl font-bold mb-2">
              {value}
            </div>
          )}
          
          {description && (
            <CardDescription className="mb-3">
              {description}
            </CardDescription>
          )}
          
          {trend && (
            <div className="flex items-center space-x-2 text-sm">
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  trend.isPositive
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                }`}
              >
                {trend.isPositive ? '↗' : '↘'}
              </span>
            </div>
          )}
          
          {children}
          
          {action && (
            <div className="mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={action.onClick}
                className="w-full"
              >
                {action.label}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple'
}

export function StatsCard({ title, value, icon: Icon, trend, color = 'blue' }: StatsCardProps) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    yellow: 'from-yellow-500 to-yellow-600',
    red: 'from-red-500 to-red-600',
    purple: 'from-purple-500 to-purple-600',
  }

  return (
    <div>
      <Card className="relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-r ${colorClasses[color]} opacity-10`} />
        <CardContent className="relative p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {title}
              </p>
              <p className="text-3xl font-bold">
                {value}
              </p>
              {trend && (
                <div className="flex items-center mt-2">
                  <span
                    className={`text-sm font-medium ${
                      trend.isPositive ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {trend.value === 0 ? '' : (trend.isPositive ? '↗' : '↘')}
                  </span>
                  {/* removed comparative label per design */}
                </div>
              )}
            </div>
            <div className={`p-3 rounded-full bg-gradient-to-r ${colorClasses[color]}`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}