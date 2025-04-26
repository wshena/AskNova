import { NextRequest, NextResponse } from "next/server"

export function GET(req:NextRequest) {
  return NextResponse.json({
    data: 'hello world'
  }, { status: 200 });
}