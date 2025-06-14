import { useState, useCallback, useRef } from 'react'
import { Message } from '../types'

// Fallback API URL if environment variable is not set
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export const useChatbot = () => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const abortControllerRef = useRef<AbortController | null>(null)

  const streamAIResponse = useCallback(async (userMessage: string) => {
    setIsTyping(true)
    abortControllerRef.current = new AbortController()

    const aiMessageId = Date.now().toString() + '-ai'
    setMessages(prev => [
      ...prev,
      { id: aiMessageId, text: '', sender: 'ai', timestamp: new Date() }
    ])

    try {
      const response = await fetch(`${API_BASE_URL}/chat/response`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
        signal: abortControllerRef.current.signal
      })

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No reader available')

      const decoder = new TextDecoder()
      let accumulatedText = ''
      let agentType = ''
      let animationFrameId: number | null = null

      const updateMessage = () => {
        // Clean up any redundant agent type text from content
        let cleanedText = accumulatedText
        if (agentType) {
          const agentPattern = new RegExp(`\\[${agentType.toUpperCase()}\\s+AGENT\\]:\\s*`, 'gi')
          cleanedText = cleanedText.replace(agentPattern, '').trim()
        }
        
        // Format the final text with agent type if available
        const finalText = agentType ? `**[${agentType.toUpperCase()} AGENT]:**\n\n${cleanedText}` : cleanedText
        
        setMessages(prev =>
          prev.map(msg =>
            msg.id === aiMessageId ? { ...msg, text: finalText } : msg
          )
        )
        animationFrameId = null
      }

      while (true) {
        try {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          const lines = chunk.split('\n').filter(line => line.trim())

          for (const line of lines) {
            try {
              const data = JSON.parse(line)
              
              // Handle agent type
              if (data.agentType && !agentType) {
                agentType = data.agentType
              }
              
              // Handle content
              if (data.content) {
                accumulatedText += data.content
              }
            } catch {
              // If not valid JSON, treat as plain text
              accumulatedText += line
            }
          }

          if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(updateMessage)
          }
        } catch (error: any) {
          if (error.name === 'AbortError') {
            console.log('Stream aborted')
            break
          }
          throw error
        }
      }
      
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
        updateMessage()
      }

    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error('Error streaming AI response:', error)
        setMessages(prev =>
          prev.map(msg =>
            msg.id.endsWith('-ai') && msg.text === ''
              ? { ...msg, text: 'Sorry, I encountered an error. Please try again.' }
              : msg
          )
        )
      }
    } finally {
      setIsTyping(false)
      abortControllerRef.current = null
    }
  }, [])

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (message.trim() && !isTyping) {
        const userMessage: Message = {
          id: Date.now().toString(),
          text: message.trim(),
          sender: 'user',
          timestamp: new Date()
        }
        
        // Clear input immediately for better UX
        setMessage('')
        
        // Add user message and start typing indicator
        setMessages(prev => [...prev, userMessage])
        
        // Start AI response with slight delay for better UX
        setTimeout(() => {
          streamAIResponse(message.trim())
        }, 100)
      }
    },
    [isTyping, message, streamAIResponse]
  )

  const handleQuickAction = useCallback(
    (actionText: string) => {
      if (!isTyping) {
        const userMessage: Message = {
          id: Date.now().toString(),
          text: actionText,
          sender: 'user',
          timestamp: new Date()
        }
        
        setMessages(prev => [...prev, userMessage])
        
        // Start AI response with slight delay for better UX
        setTimeout(() => {
          streamAIResponse(actionText)
        }, 100)
      }
    },
    [isTyping, streamAIResponse]
  )

  const stop = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      setIsTyping(false)
    }
  }, [])

  return {
    message,
    setMessage,
    messages,
    isTyping,
    handleSubmit,
    handleQuickAction,
    stop
  }
} 