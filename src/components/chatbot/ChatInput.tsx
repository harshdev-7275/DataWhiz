import React, { useRef, useEffect } from 'react'
import { Send, Mic, Square } from 'lucide-react'

interface ChatInputProps {
  message: string
  setMessage: (message: string) => void
  onSubmit: (e: React.FormEvent) => void
  isTyping: boolean
  stop: () => void
}

const ChatInput: React.FC<ChatInputProps> = ({
  message,
  setMessage,
  onSubmit,
  isTyping,
  stop
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea based on content
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      const scrollHeight = textarea.scrollHeight
      const maxHeight = 120 // Max height in pixels (about 5 lines)
      textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`
    }
  }

  // Handle textarea changes
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
    adjustTextareaHeight()
  }

  // Handle key press events
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        // Shift+Enter: Allow new line (default behavior)
        return
      } else {
        // Enter: Submit the form
        e.preventDefault()
        if (message.trim() && !isTyping) {
          onSubmit(e as any)
        }
      }
    }
  }

  // Auto-resize on mount and when message changes
  useEffect(() => {
    adjustTextareaHeight()
  }, [message])

  // Focus textarea when not typing
  useEffect(() => {
    if (!isTyping && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [isTyping])

  return (
    <div className="p-4 backdrop-blur-sm border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={onSubmit} className="relative">
          <div className={`flex items-center gap-2 bg-white/5 border rounded-2xl p-3 transition-all duration-200 ${
            isTyping 
              ? 'border-[var(--ai-blue)]/30 bg-white/3' 
              : 'border-white/10 focus-within:border-[var(--ai-blue)]/50'
          }`}>
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              placeholder={isTyping ? "AI is responding..." : "Ask me anything... (Shift+Enter for new line)"}
              className="flex-1 bg-transparent text-white placeholder-white/50 outline-none text-sm resize-none leading-5 py-1"
              disabled={isTyping}
              rows={1}
              style={{ 
                scrollbarWidth: 'thin',
                scrollbarColor: 'var(--ai-blue) transparent',
                minHeight: '20px',
                maxHeight: '120px'
              }}
            />

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
                aria-label="Voice input"
                disabled={isTyping}
              >
                <Mic className="w-4 h-4 text-white/70" />
              </button>

              {isTyping ? (
                <button
                  type="button"
                  onClick={stop}
                  className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all flex items-center gap-1 border border-red-500/30"
                  aria-label="Stop generating"
                >
                  <Square className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="p-2 bg-gradient-to-r from-[var(--ai-blue)] to-[var(--ai-cyan)] text-white rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send message (Enter)"
                >
                  <Send className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </form>

        {/* Footer Text with Keyboard Shortcuts */}
        <div className="flex items-center justify-between mt-3 text-xs text-white/40">
          <p>CSV Parser AI can make mistakes. Check important info.</p>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">
              <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-xs">Enter</kbd> to send
            </span>
            <span className="hidden sm:inline">
              <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-xs">Shift</kbd> + 
              <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-xs ml-1">Enter</kbd> for new line
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(ChatInput) 