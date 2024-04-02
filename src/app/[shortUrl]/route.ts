import { getXataClient } from '@/xata'
import { auth } from '@clerk/nextjs'

// deleting record from db
// slash in short url?
// not found page / modal in dashboard

export async function GET(req: Request) {
  const { userId } = auth()
  const shortUrl = req.url
  const xata = getXataClient()

  const record = await xata.db.urls
    .filter({ userId: userId, shortUrl: shortUrl })
    .getFirst()

  const fullUrl = record?.fullUrl

  // fullUrl you are looking for doesn't exist in db or isnt yours
  if (!fullUrl) {
    return new Response('', {
      status: 302,
      headers: {
        Location:
          'https://nextjs.org/docs/app/building-your-application/routing/route-handlers',
      },
    })
  }

  await xata.db.urls.update(record.id, {
    clicks: record.clicks + 1,
  })

  return new Response('', {
    status: 302,
    headers: {
      Location: fullUrl,
    },
  })
}
