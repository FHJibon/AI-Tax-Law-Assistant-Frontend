'use client'

import React from 'react'
import { useI18n } from '@/lib/i18n-provider'
import { Navbar } from '@/components/Navbar'
import { ChatBox } from '@/components/ChatBox'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  MessageSquare, 
  BookOpen, 
  Calculator, 
  FileText,
  HelpCircle,
  Lightbulb
} from 'lucide-react'

export default function ChatPage() {
  const { t } = useI18n()

  const quickQuestions = [
    {
      question: "How do I file my tax return in Bangladesh?",
      bangla: "বাংলাদেশে আমি কীভাবে আমার কর রিটার্ন দাখিল করব?",
      category: "filing"
    },
    {
      question: "What documents do I need for tax filing?",
      bangla: "কর দাখিলের জন্য আমার কী কী নথি প্রয়োজন?",
      category: "documents"
    },
    {
      question: "How is income tax calculated?",
      bangla: "আয়কর কীভাবে গণনা করা হয়?",
      category: "calculation"
    },
    {
      question: "What are the tax exemption limits?",
      bangla: "কর ছাড়ের সীমা কত?",
      category: "exemption"
    }
  ]

  const categories = [
    {
      icon: FileText,
      title: "Tax Filing",
      description: "Learn how to file your tax returns properly",
      color: "bg-blue-50 text-blue-600 dark:bg-blue-900/20"
    },
    {
      icon: Calculator,
      title: "Tax Calculation",
      description: "Understand how taxes are calculated",
      color: "bg-green-50 text-green-600 dark:bg-green-900/20"
    },
    {
      icon: BookOpen,
      title: "Tax Laws",
      description: "Get information about tax regulations",
      color: "bg-purple-50 text-purple-600 dark:bg-purple-900/20"
    },
    {
      icon: HelpCircle,
      title: "General Help",
      description: "Ask any tax-related questions",
      color: "bg-orange-50 text-orange-600 dark:bg-orange-900/20"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <MessageSquare className="h-8 w-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold">
              {t('nav.chat')}
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ask me anything about tax filing, calculations, or Bangladesh tax laws. I&apos;m here to help!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <ChatBox className="w-full" />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Questions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5" />
                  <span>Quick Questions</span>
                </CardTitle>
                <CardDescription>
                  Click on any question to get started
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {quickQuestions.map((item, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full text-left h-auto p-3 justify-start"
                    onClick={() => {
                      // In a real implementation, this would send the question to the chat
                    }}
                  >
                    <div className="text-sm">
                      <div className="font-medium mb-1">{item.question}</div>
                      <div className="text-muted-foreground text-xs bangla-text">
                        {item.bangla}
                      </div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Help Categories</CardTitle>
                <CardDescription>
                  Browse help by category
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {categories.map((category, index) => {
                  const Icon = category.icon
                  return (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent cursor-pointer transition-colors"
                    >
                      <div className={`p-2 rounded-lg ${category.color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{category.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">💡 Tips for Better Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Be specific about your tax situation</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Mention your income range if relevant</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Ask follow-up questions for clarity</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-primary">•</span>
                  <span>Use either English or Bengali</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}