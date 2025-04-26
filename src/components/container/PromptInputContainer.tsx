
import { cn } from '@/lib/utils'
import React from 'react'

const PromptInputContainer = ({children}:{children:React.ReactNode}) => {
  return (
    <div className="isolate w-full">
      <div className={cn(
        "w-full flex items-center justify-center",
        'transition-all duration-500 ease-in-out',
      )}>
        {children}
      </div>
    </div>
  )
}

export default PromptInputContainer