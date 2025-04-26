import { getCurrentUser } from "@/utils/auth.action";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }
  return NextResponse.json({ user })
}