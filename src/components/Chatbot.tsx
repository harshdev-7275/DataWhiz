import React from 'react'
import { WelcomeScreen, ChatMessages, ChatInput, useChatbot } from './chatbot/index'

const Chatbot = () => {
  const {
    message,
    setMessage,
    messages,
    isTyping,
    handleSubmit,
    handleQuickAction,
    stop,
  } = useChatbot()

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-gradient-to-br from-[var(--ai-dark)] via-[var(--ai-dark)] to-slate-900 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 ai-grid-pattern opacity-20 pointer-events-none"></div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0">
        {messages.length === 0 ? (
          <WelcomeScreen onQuickAction={handleQuickAction} />
        ) : (
          <ChatMessages messages={messages} isTyping={isTyping} />
        )}
      </div>

      {/* Input Section */}
      <div className="flex-shrink-0">
        <ChatInput
          message={message}
          setMessage={setMessage}
          onSubmit={handleSubmit}
          isTyping={isTyping}
          stop={stop}
        />
      </div>
    </div>
  )
}

export default Chatbot