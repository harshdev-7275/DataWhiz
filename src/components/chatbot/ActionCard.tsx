import React from 'react'
import { ActionCardProps } from './types'

const ActionCard: React.FC<ActionCardProps> = ({ icon, title, description, onClick, gradient }) => {
  return (
    <div 
      className="glass-card p-4 hover:bg-white/10 transition-all cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 bg-gradient-to-r ${gradient} rounded-lg`}>
          {icon}
        </div>
        <h3 className="text-white/90 font-medium">{title}</h3>
      </div>
      <p className="text-white/60 text-sm">{description}</p>
    </div>
  )
}

export default ActionCard 