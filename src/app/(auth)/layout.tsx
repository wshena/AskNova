import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'AskNova',
  description: 'AskNova helps you get answers, find inspiration and be more productive. It is free to use and easy to try. Just ask and AskNova can help with writing, learning, brainstorming and more.',
  keywords: 'ai chat,ai,chap gpt,chat gbt,chat gpt 3,chat gpt login,chat gpt website,chat gpt,chat gtp,chat openai,chat,chatai,chatbot gpt,chatg,chatgpt login,chatgpt,gpt chat,open ai,openai chat,openai chatgpt,openai',
  openGraph: {
    title: 'AskNova',
    description: 'A conversational AI system that listens, learns, and challenges'
  }
}

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <main className='w-[100vw] h-[100vh] flex items-center justify-center'>
      {children}
    </main>
  )
}

export default layout