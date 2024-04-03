import { getXataClient } from '@/xata'
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function GET(req: Request) {
  const { userId } = auth()
  const shortUrl = req.url
  const xata = getXataClient()

  const record = await xata.db.urls
    .filter({ userId: userId, shortUrl: shortUrl })
    .getFirst()

  const fullUrl = record?.fullUrl

  if (!fullUrl) {
    redirect('/error')
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
