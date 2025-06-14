import React, { useEffect, useRef, useCallback } from 'react'
import { Message } from './types'
import MessageBubble from './MessageBubble'
import TypingIndicator from './TypingIndicator'

interface ChatMessagesProps {
  messages: Message[]
  isTyping: boolean
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, isTyping }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end'
      })
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(scrollToBottom, 100)
    return () => clearTimeout(timer)
  }, [messages, isTyping, scrollToBottom])

  return (
    <div 
      ref={containerRef}
      className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-6 scroll-smooth custom-scrollbar"
      style={{ scrollBehavior: 'smooth' }}
    >
      <div className="max-w-4xl mx-auto space-y-6 pb-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        
        {/* Typing Indicator */}
        {isTyping && <TypingIndicator />}
        
        <div ref={messagesEndRef} className="h-1" />
      </div>
    </div>
  )
}

export default React.memo(ChatMessages) 