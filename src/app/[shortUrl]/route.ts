import { getXataClient } from '@/xata'
import { useAuth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {

  // const {searchParams} = new URL(request.url)
  // const shortUrl = searchParams.get('shortUrl')



  const userId = 'user_2eQdjqkbCQ0mWBrJgQyfFxAE4Ks'
  const shortUrl = 'http://localhost:3000/short'

  const xata = getXataClient()
  const record = await xata.db.urls
    .filter({ userId: userId, shortUrl: shortUrl })
    .getFirst()

  const fullUrl = record?.fullUrl

  if (!fullUrl) {
    return new Response('', {
      status: 302,
      headers: {
        Location: 'https://nextjs.org/docs/app/building-your-application/routing/route-handlers'
      }
    })
  }

  console.log(record)


  return new Response('', {
    status: 302,
    headers: {
      Location: fullUrl
    }
  })
}