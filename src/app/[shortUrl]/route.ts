import { getXataClient } from '@/xata'
import { auth, useAuth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'


export async function GET(req: Request) {

  const {userId} = auth()
  console.log(userId)
  
  const shortUrl = req.url
  const xata = getXataClient()
  const record = await xata.db.urls
    .filter({ userId: userId, shortUrl: shortUrl })
    .getFirst()

  const fullUrl = record?.fullUrl

  // fullUrl you are looking for doesn't exist or in db isnt yours
  if (!fullUrl) {
    return new Response('', {
      status: 302,
      headers: {
        Location: 'https://nextjs.org/docs/app/building-your-application/routing/route-handlers'
      }
    })
  }

  return new Response('', {
    status: 302,
    headers: {
      Location: fullUrl
    }
  })
}