import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const name = String(body.FullName ?? '').slice(0, 120)
    const phone = String(body.Phone ?? '')
    const email = String(body.Email ?? '').slice(0, 120)
    const city = String(body.City ?? '').slice(0, 80)
    const postalCode = String(body.PostalCode ?? '').slice(0, 10)
    const country = String(body.Country ?? 'US')
    const categoryHub = String(body.CategoryHub ?? 'General')
    const targetKeyword = String(body.TargetKeyword ?? 'Direct')
    const estimatedValue = Number(body.EstimatedValue) || 0

    if (!name || !phone || !email) {
      return NextResponse.json({ error: 'Please provide valid lead details.' }, { status: 400 })
    }

    const webhook = process.env.GOOGLE_SHEET_WEBHOOK_URL
    if (webhook) {
      const response = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Date: new Date().toISOString(),
          Country: country,
          CategoryHub: categoryHub,
          TargetKeyword: targetKeyword,
          FullName: name,
          Phone: phone,
          Email: email,
          City: city,
          PostalCode: postalCode,
          EstimatedValue: estimatedValue,
        }),
      })
      if (!response.ok) return NextResponse.json({ error: 'Could not save lead.' }, { status: 502 })
    }

    return NextResponse.json({ status: 'success', message: 'Lead captured successfully.' })
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }
}
