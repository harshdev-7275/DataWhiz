import React from 'react'
import { Bot, User } from 'lucide-react'
import { Message } from './types'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'

interface MessageBubbleProps {
  message: Message
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
      {message.sender === 'ai' && (
        <div className="w-8 h-8 bg-gradient-to-r from-[var(--ai-blue)] to-[var(--ai-cyan)] rounded-full flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-white" />
        </div>
      )}
      
      <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : ''}`}>
        <div
          className={`p-4 rounded-2xl ${
            message.sender === 'user'
              ? 'glass-card text-white ml-auto'
              : 'glass-card text-white/90'
          }`}
        >
          {message.sender === 'ai' ? (
            <div className="prose prose-invert prose-sm max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight, rehypeRaw]}
                components={{
                  // Custom styling for markdown elements
                  h1: ({ children }) => (
                    <h1 className="text-xl font-bold text-white mb-3 border-b border-white/20 pb-2">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-lg font-semibold text-white mb-2 mt-4">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-base font-medium text-white mb-2 mt-3">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-white/90 leading-relaxed mb-2 last:mb-0">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside text-white/90 space-y-1 mb-2">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside text-white/90 space-y-1 mb-2">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-white/90">{children}</li>
                  ),
                  code: ({ inline, children, className, ...props }: any) => (
                    inline ? (
                      <code className="bg-white/10 text-[var(--ai-cyan)] px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                        {children}
                      </code>
                    ) : (
                      <code className="block bg-black/30 text-white p-3 rounded-lg text-sm font-mono overflow-x-auto" {...props}>
                        {children}
                      </code>
                    )
                  ),
                  pre: ({ children }) => (
                    <pre className="bg-black/30 border border-white/10 rounded-lg p-3 overflow-x-auto mb-3">
                      {children}
                    </pre>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-[var(--ai-blue)] pl-4 italic text-white/80 mb-2">
                      {children}
                    </blockquote>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--ai-cyan)] hover:text-[var(--ai-blue)] underline transition-colors"
                    >
                      {children}
                    </a>
                  ),
                  table: ({ children }) => (
                    <div className="overflow-x-auto mb-3">
                      <table className="min-w-full border border-white/20 rounded-lg">
                        {children}
                      </table>
                    </div>
                  ),
                  thead: ({ children }) => (
                    <thead className="bg-white/5">
                      {children}
                    </thead>
                  ),
                  th: ({ children }) => (
                    <th className="border border-white/20 px-3 py-2 text-left text-white font-medium">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="border border-white/20 px-3 py-2 text-white/90">
                      {children}
                    </td>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-white">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic text-white/90">
                      {children}
                    </em>
                  ),
                }}
              >
                {message.text}
              </ReactMarkdown>
            </div>
          ) : (
            <p className="text-sm leading-relaxed">{message.text}</p>
          )}
        </div>
        <p className="text-white/40 text-xs mt-1 px-2">
          {formatTime(message.timestamp)}
        </p>
      </div>

      {message.sender === 'user' && (
        <div className="w-8 h-8 bg-gradient-to-r from-[var(--ai-purple)] to-[var(--ai-blue)] rounded-full flex items-center justify-center flex-shrink-0 order-3">
          <User className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
  )
}

export default React.memo(MessageBubble) 