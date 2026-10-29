import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  // Check geo headers provided by edge/CDN platforms (Vercel, Cloudflare, AWS CloudFront)
  const countryHeader =
    req.headers.get('x-vercel-ip-country') ||
    req.headers.get('cf-ipcountry') ||
    req.headers.get('cloudfront-viewer-country') ||
    req.headers.get('x-country-code') ||
    ''

  const country = countryHeader.trim().toUpperCase()

  let detectedRegion: 'IN' | 'US' | null = null

  if (country) {
    // If India -> INR ('IN'), for all other countries -> USD ('US')
    detectedRegion = country === 'IN' ? 'IN' : 'US'
  }

  return NextResponse.json({
    country: country || 'UNKNOWN',
    region: detectedRegion,
  })
}

