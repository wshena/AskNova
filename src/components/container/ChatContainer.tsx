'use client'
import {
  getAnswerFromSpesificMessage,
  getMessageFromConversations,
  getUserCurrentConversations,
} from '@/utils/db.action'
import React, { useEffect, useState } from 'react'
import MarkdownWrapper from '../MarkdownWrapper'
import PromptInput from '../PromptInput'
import PromptInputContainer from './PromptInputContainer'
import PromptContainer from './PromptContainer'

const ChatContainer = ({ userId, chnlId }: { userId: string, chnlId:string }) => {
  const [channelId, setChannelId]   = useState<string | any>(chnlId)
  const [messages, setMessages]     = useState<any[] | null>(null)
  const [answers, setAnswers]       = useState<Record<string, any[]> | null>(null)
  const [version, setVersion]       = useState(0)              // ← trigger refetch

  // 1) Ambil channelId
  useEffect(() => {
    setChannelId(chnlId)
  }, [chnlId])

  // 2) Ambil messages tiap channelId atau version berubah
  useEffect(() => {
    if (!channelId) return
    getMessageFromConversations(channelId).then(setMessages)
  }, [channelId, version])

  // 3) Ambil answers tiap messages berubah (sama seperti sebelumnya)
  useEffect(() => {
    if (!messages) return
    ;(async () => {
      const arr = await Promise.all(
        messages.map(msg =>
          getAnswerFromSpesificMessage(msg.id).then(ans => ({
            messageId: msg.id,
            answers: ans || []
          }))
        )
      )
      const mapByMessage: Record<string, any[]> = {}
      arr.forEach(item => {
        mapByMessage[item.messageId] = item.answers
      })
      setAnswers(mapByMessage)
    })()
  }, [messages])

  // callback yang akan kita pass ke PromptInput
  const handleNewMessage = () => {
    setVersion(v => v + 1)
  }

  return (
    <>
      <div className="w-full flex items-center justify-center">
        <div className="w-full md:w-[90%] lg:w-[70%] xl:w-[60%] h-[47vh] md:h-[47vh] xl:h-[54vh] 2xl:h-[78vh] overflow-y-auto flex flex-col gap-4">
          {messages?.map(msg => (
            <div key={msg.id} className="flex flex-col gap-2">
              <PromptContainer content={msg.content} />
              <div className="ml-4 flex flex-col gap-1">
                {answers?.[msg.id]?.map(ans => (
                  <MarkdownWrapper key={ans.id} content={ans.content} />
                )) ?? <em>Loading answers…</em>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <PromptInputContainer>
        <PromptInput
          userId={userId}
          channelId={channelId}
          onMessageSent={handleNewMessage}   // ← pass callback
        />
      </PromptInputContainer>
    </>
  )
}

export default ChatContainer
