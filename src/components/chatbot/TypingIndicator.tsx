import React from 'react'
import { Bot } from 'lucide-react'

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex gap-3 justify-start animate-fade-in">
      <div className="w-8 h-8 bg-gradient-to-r from-[var(--ai-blue)] to-[var(--ai-cyan)] rounded-full flex items-center justify-center flex-shrink-0">
        <Bot className="w-4 h-4 text-white" />
      </div>
      <div className="glass-card p-4 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
          <span className="text-white/80 text-sm">AI is thinking...</span>
        </div>
      </div>
    </div>
  )
}

export default React.memo(TypingIndicator) 