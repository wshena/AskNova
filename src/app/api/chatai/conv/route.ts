import { NextResponse } from 'next/server'
import { getAllUserConversations } from '@/utils/db.action'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return NextResponse.json(
      { success: false, message: 'Missing userId' },
      { status: 400 }
    )
  }

  try {
    const data = await getAllUserConversations(userId)
    return NextResponse.json(
      { success: true, data },
      { status: 200 }
    )
  } catch (err) {
    console.error('Error fetching convs:', err)
    return NextResponse.json(
      { success: false, data: null },
      { status: 500 }
    )
  }
}
