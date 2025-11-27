'use client'

import React from 'react'
import { useI18n } from '@/lib/i18n-provider'
import { Navbar } from '@/components/Navbar'
import { FileUploader } from '@/components/FileUploader'
import { ChatBox } from '@/components/ChatBox'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Upload, 
  FileText, 
  MessageSquare,
  Image,
  CheckCircle
} from 'lucide-react'

export default function WorkspacePage() {
  const { t, language } = useI18n()
  const [uploadedFiles, setUploadedFiles] = React.useState<File[]>([])

  const handleFilesUpload = (files: File[]) => {
    setUploadedFiles(prev => [...prev, ...files])
  }

  const supportedDocuments = [
    {
      icon: FileText,
      title: language === 'bn' ? 'বেতন সার্টিফিকেট' : 'Salary Certificate',
      description: language === 'bn' ? 'বেতন সার্টিফিকেট' : 'Annual Salary Certificate',
      formats: 'PDF, JPG, PNG'
    },
    {
      icon: FileText,
      title: language === 'bn' ? 'টিআইএন সার্টিফিকেট' : 'TIN Certificate',
      description: language === 'bn' ? 'করদাতা শনাক্তকরণ নম্বর সার্টিফিকেট' : 'Taxpayer Identification Number certificate',
      formats: 'PDF, JPG, PNG'
    },
    {
      icon: FileText,
      title: language === 'bn' ? 'ব্যাংক স্টেটমেন্ট' : 'Bank Statements',
      description: language === 'bn' ? '১২ মাসের ব্যাংক স্টেটমেন্ট' : '12 months bank statements',
      formats: 'PDF, JPG, PNG'
    },
    {
      icon: Image,
      title: language === 'bn' ? 'বিনিয়োগ নথি' : 'Investment Documents',
      description: language === 'bn' ? 'এফডিআর, ডিপিএস, বীমা সার্টিফিকেট' : 'FDR, DPS, Insurance certificates',
      formats: 'PDF, JPG, PNG'
    }
  ]

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <MessageSquare className="h-8 w-8 text-primary" />
            <h1 className={`text-3xl md:text-4xl font-bold ${
              language === 'bn' ? 'bangla-text' : ''
            }`}>
              {language === 'bn' ? 'কর সহায়ক ওয়ার্কস্পেস' : 'Tax Assistant Workspace'}
            </h1>
          </div>
          <p className={`text-xl text-muted-foreground max-w-2xl mx-auto ${
            language === 'bn' ? 'bangla-text' : ''
          }`}>
            {language === 'bn' 
              ? 'আপনার নথি আপলোড করুন এবং আমাদের এআই সহায়কের সাথে কথা বলুন' 
              : 'Upload your documents and chat with our AI assistant'}
          </p>
        </div>

          <div className="space-y-3">
          {/* Top Row - Upload and Chat */}
          <div className="grid lg:grid-cols-2 gap-6 items-stretch">
            {/* Left: Upload Section */}
            <div className="flex flex-col space-y-3 h-full">
              {/* Interactive Uploader */}
              <div className="flex-1">
                <FileUploader onFilesUpload={handleFilesUpload} maxFiles={1} hideInfo />
              </div>

              {/* Uploaded Files Status */}
              {uploadedFiles.length > 0 ? (
                <Card className="flex-1">
                  <CardHeader className="pb-3">
                    <CardTitle className={`text-sm ${
                      language === 'bn' ? 'bangla-text' : ''
                    }`}>
                      {language === 'bn' ? 'আপলোড করা ফাইল' : 'Uploaded Files'}
                    </CardTitle>
                    <CardDescription className={language === 'bn' ? 'bangla-text' : ''}>
                      {language === 'bn' 
                        ? `${uploadedFiles.length} টি ফাইল প্রক্রিয়াকরণ সম্পন্ন` 
                        : `${uploadedFiles.length} file${uploadedFiles.length > 1 ? 's' : ''} processed`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium truncate max-w-[200px]">{file.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-green-600 dark:text-green-400 flex items-center">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            {language === 'bn' ? 'সম্পন্ন' : 'Done'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-dashed flex-1">
                  <CardContent className="py-20 text-center h-full flex flex-col items-center justify-center">
                    <Upload className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                    <p className={`text-base font-medium text-muted-foreground mb-2 ${
                      language === 'bn' ? 'bangla-text' : ''
                    }`}>
                      {language === 'bn' 
                        ? 'এখনও কোনো ফাইল আপলোড করা হয়নি' 
                        : 'No files uploaded yet'}
                    </p>
                    <p className={`text-sm text-muted-foreground ${
                      language === 'bn' ? 'bangla-text' : ''
                    }`}>
                      {language === 'bn' 
                        ? 'উপরে ক্লিক করে আপনার নথি আপলোড করুন' 
                        : 'Click above to upload your documents'}
                    </p>
                  </CardContent>
                </Card>
              )}

                {/* Maximum file size note moved into FileUploader */}

                {/* Supported Documents card removed as requested */}
            </div>

            {/* Right: Chat Section */}
            <div className="h-full">
              <Card className="h-full max-h-[660px]">
                <CardHeader>
                  <CardTitle className={`flex items-center space-x-2 ${
                    language === 'bn' ? 'bangla-text' : ''
                  }`}>
                    <MessageSquare className="h-5 w-5" />
                    <span>{t('nav.chat')}</span>
                  </CardTitle>
                  <CardDescription className={language === 'bn' ? 'bangla-text' : ''}>
                    {language === 'bn' 
                      ? 'কর সম্পর্কিত যেকোনো প্রশ্ন করুন' 
                      : 'Ask any tax-related questions'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-full overflow-hidden min-h-0">
                  <div className="h-full min-h-0">
                    <ChatBox className="w-full h-full max-h-[520px]" />
                  </div>
                </CardContent>
              </Card>

              {/* Supported Documents removed; short size note shown near uploader */}
            </div>
          </div>

          {/* Bottom row removed: Supported Documents moved above and FAQ removed */}
        </div>
      </div>
    </div>
  )
}
