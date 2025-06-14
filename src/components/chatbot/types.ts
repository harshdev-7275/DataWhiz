export interface Message {
  id: string
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
}

export interface ActionCardProps {
  icon: React.ReactNode
  title: string
  description: string
  onClick: () => void
  gradient: string
} 