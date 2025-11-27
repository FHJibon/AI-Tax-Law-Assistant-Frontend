'use client'

import React from 'react'
import { useI18n } from '@/lib/i18n-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Send, Bot, User } from 'lucide-react'

interface Message {
  id: string
  content: string
  sender: 'user' | 'assistant'
  timestamp: Date
}

interface ChatBoxProps {
  className?: string
}

export function ChatBox({ className }: ChatBoxProps) {
  const { t } = useI18n()
  const [messages, setMessages] = React.useState<Message[]>([])
  const [inputMessage, setInputMessage] = React.useState('')
  const [isTyping, setIsTyping] = React.useState(false)
  const messagesEndRef = React.useRef<HTMLDivElement | null>(null)
  const messagesContainerRef = React.useRef<HTMLDivElement | null>(null)

  const scrollToBottom = (behavior: ScrollBehavior = 'auto') => {
    const container = messagesContainerRef.current
    if (container) {
      try {
        container.scrollTo({ top: container.scrollHeight, behavior })
        return
      } catch (err) {
        // ignore and fallback to anchor
      }
    }

    if (messagesEndRef.current) {
      try {
        messagesEndRef.current.scrollIntoView({ behavior, block: 'end' })
      } catch (err) {
        setTimeout(() => {
          if (container) container.scrollTop = container.scrollHeight
        }, 50)
      }
    }
  }

  // Initialize welcome message on client to avoid SSR hydration mismatch with Date
  React.useEffect(() => {
    setMessages([
      {
        id: '1',
        content: t('chat.welcome'),
        sender: 'assistant',
        timestamp: new Date(),
      },
    ])
  }, [t])

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)
    // try to scroll after the user message is added
    setTimeout(() => scrollToBottom('auto'), 50)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: ` This is a simulated response from the AI Tax Assistant. Connect backend API`,
        sender: 'assistant',
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
      // ensure scroll after assistant reply is appended
      setTimeout(() => scrollToBottom('auto'), 50)
    }, 2000)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // Auto-scroll to the bottom when messages update or typing state changes
  React.useEffect(() => {
    const raf = requestAnimationFrame(() => scrollToBottom('smooth'))
    const t = setTimeout(() => scrollToBottom('auto'), 150)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(t)
    }
  }, [messages, isTyping])

  return (
    <Card className={`flex flex-col ${className || ''}`}>
      <CardContent className="flex-1 flex flex-col p-0 min-h-0">
        {/* Messages Area */}
        <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
          {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`flex items-start space-x-2 max-w-[80%] ${
                    message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <div className={`
                    flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                    ${message.sender === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                    }
                  `}>
                    {message.sender === 'user' ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  <div
                    className={`
                      rounded-2xl px-4 py-2 break-words whitespace-pre-wrap
                      ${message.sender === 'assistant' ? 'max-h-48 overflow-y-auto' : ''}
                      ${message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                      }
                    `}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2 max-w-[80%]">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-muted text-muted-foreground rounded-2xl px-4 py-2">
                  <p className="text-sm animate-typing">{t('chat.typing')}</p>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t p-3">
          <div className="flex items-center">
            <div className="flex items-center w-full bg-muted/5 border border-muted-foreground/20 rounded-lg">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t('chat.placeholder')}
                className="flex-1 bg-transparent border-none rounded-l-lg px-4 py-2 placeholder:text-muted-foreground"
                disabled={isTyping}
              />
              <Button
                variant="ghost"
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isTyping}
                size="icon"
                className="h-10 w-10 p-0 rounded-r-lg bg-muted/10 hover:bg-muted/20 mr-1"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}