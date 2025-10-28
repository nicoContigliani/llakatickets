import { NextResponse } from 'next/server'

export function middleware(request) {
  // Cache agresivo para recursos estáticos
  if (request.nextUrl.pathname.startsWith('/_next/')) {
    return NextResponse.next().header(
      'Cache-Control',
      'public, max-age=31536000, immutable'
    )
  }
  
  return NextResponse.next()
}