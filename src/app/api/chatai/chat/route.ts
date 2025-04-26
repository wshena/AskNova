import { NextResponse } from 'next/server'
import {
  getUserCurrentConversations,
  addMessage,
  addAnswer,
  generateConversations
} from '@/utils/db.action'
import { generateChat } from '@/config/gemini'

export async function POST(req: Request) {
  const { userId, prompt, channelId } = await req.json()

  if (!userId || !prompt) {
    return NextResponse.json(
      { error: 'userId & prompt wajib dikirim' },
      { status: 400 }
    )
  }

  // kalau channelId ada → tambahkan message + answer
  if (channelId) {
    const current = await getUserCurrentConversations(userId, channelId)
    if (!current) {
      return NextResponse.json(
        { error: 'Channel tidak ditemukan' },
        { status: 404 }
      )
    }
    const msgRes = await addMessage({ channelId, role: 'user', content: prompt })
    if (!msgRes.success) {
      return NextResponse.json({ error: msgRes.error }, { status: 500 })
    }
    const ans = await generateChat(msgRes.content)
    const ansRes = await addAnswer({
      channelId,
      messageId: msgRes.id!,
      role: 'assistant',
      content: ans
    })
    if (!ansRes.success) {
      return NextResponse.json({ error: ansRes.error }, { status: 500 })
    }
    // kembalikan juga channelId agar client tahu tetap di halaman yang sama
    return NextResponse.json({ success: true, channelId }, { status: 200 })
  }

  // kalau belum ada → buat channel baru + message + jawaban
  const res = await generateConversations({ userId, prompt })
  if (!res.success) {
    return NextResponse.json({ error: res.error }, { status: 500 })
  }
  // res.data: { channelId, title }
  return NextResponse.json(res.data, { status: 200 })
}
