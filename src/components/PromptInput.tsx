'use client'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { Button } from './ui/button'
import { ArrowUpIcon } from './icons/icons'
import axios from 'axios'
import { useRouter } from 'next/navigation'

interface PromptInputProps {
  userId: string
  channelId?: string | null
  onMessageSent?: () => void
}

const PromptInput = ({ userId, channelId, onMessageSent }: PromptInputProps) => {
  const router = useRouter();

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [prompt, setPrompt]     = useState('')
  const [isLoading, setLoading] = useState(false)     // ← loading state

  // auto‑resize textarea
  useLayoutEffect(() => {
    const ta = textareaRef.current
    if (ta) {
      ta.style.height = 'auto'
      ta.style.height = `${ta.scrollHeight}px`
    }
  }, [prompt])

  const handleSubmit = async (e:any) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = { userId, prompt, channelId } // kalau channelId undefined, payload.channelId otomatis false
      const { data } = await axios.post('/api/chatai/chat', payload)
      // kalau baru, data.channelId ada → redirect
      router.push(`/chat/${data.channelId}`)
      setPrompt('')
      onMessageSent?.()
    } catch (err) {
      console.error('gagal kirim prompt:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full md:w-[90%] lg:w-[70%] xl:w-[60%] p-4 rounded-lg border bg-white flex flex-col gap-2 shadow-lg">
      <textarea
        ref={textareaRef}
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        onKeyDown={e => {
          // Jika Enter (key) dan bukan Shift+Enter
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()          // cegah newline default
            handleSubmit(e as any)      // trigger submit manual
          }
        }}
        enterKeyHint="send" 
        placeholder="Ask anything..."
        className="w-full resize-none overflow-hidden p-2 focus:outline-none"
      />

      <div className="flex justify-end">
        <Button
          variant="outline"
          type="submit"
          disabled={isLoading}
          className="cursor-pointer flex items-center gap-2"
        >
          {isLoading
            ? 'Loading…'
            : <ArrowUpIcon size={20} color="black" />
          }
        </Button>
      </div>
    </form>
  )
}

export default PromptInput
