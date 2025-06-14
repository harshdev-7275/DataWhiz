import React from 'react'
import { ChevronDown, Menu } from 'lucide-react'

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 ">
      {/* Left side - Menu and Logo */}
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
          <Menu className="w-5 h-5 text-white/70" />
        </button>
        
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-[var(--ai-blue)] to-[var(--ai-cyan)] bg-clip-text text-transparent font-bold text-xl">
            CSV Parser
          </div>
        </div>
      </div>

      {/* Center - Model Selector */}
      <div className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg cursor-pointer transition-colors">
        <span className="text-white/90 text-sm font-medium">AI Assistant</span>
        <ChevronDown className="w-4 h-4 text-white/70" />
      </div>

      {/* Right side - User Avatar */}
      <div className="flex items-center">
        <div className="w-8 h-8 bg-gradient-to-r from-[var(--ai-blue)] to-[var(--ai-purple)] rounded-full flex items-center justify-center text-white font-medium text-sm">
          H
        </div>
      </div>
    </header>
  )
}

export default Header