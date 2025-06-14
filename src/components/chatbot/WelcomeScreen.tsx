import React from 'react'
import { Search, Palette, Plus } from 'lucide-react'
import ActionCard from './ActionCard'

interface WelcomeScreenProps {
  onQuickAction: (actionText: string) => void
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onQuickAction }) => {
  const actionCards = [
    {
      icon: <Search className="w-4 h-4 text-white" />,
      title: "Deep Research",
      description: "Get comprehensive analysis and insights",
      gradient: "from-[var(--ai-blue)] to-[var(--ai-cyan)]",
      action: "Help me analyze my CSV data for patterns and insights"
    },
    {
      icon: <Palette className="w-4 h-4 text-white" />,
      title: "CSV Analysis", 
      description: "Parse and analyze your CSV data",
      gradient: "from-[var(--ai-cyan)] to-[var(--ai-purple)]",
      action: "How do I parse and clean my CSV file?"
    },
    {
      icon: <Plus className="w-4 h-4 text-white" />,
      title: "Data Insights",
      description: "Generate insights from your data", 
      gradient: "from-[var(--ai-purple)] to-[var(--ai-blue)]",
      action: "What insights can you generate from my data?"
    }
  ]

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4">
      {/* Greeting */}
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-light mb-2">
          <span className="text-white/90">Hello, </span>
          <span className="bg-gradient-to-r from-[var(--ai-blue)] to-[var(--ai-cyan)] bg-clip-text text-transparent">
            Harsh
          </span>
        </h1>
        <p className="text-white/60 text-lg">How can I help you today?</p>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl w-full mb-8">
        {actionCards.map((card, index) => (
          <ActionCard
            key={index}
            icon={card.icon}
            title={card.title}
            description={card.description}
            gradient={card.gradient}
            onClick={() => onQuickAction(card.action)}
          />
        ))}
      </div>
    </div>
  )
}

export default React.memo(WelcomeScreen) 