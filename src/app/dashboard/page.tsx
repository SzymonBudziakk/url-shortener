import DataTable from '@/components/DataTable'
import InsertForm from '@/components/InsertForm'
import { getXataClient } from '@/xata'
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card'
import { headers } from 'next/headers'

const schema = z.object({
  fullUrl: z.string().min(1),
  shortUrl: z.string().min(1),
})

export default async function Dashboard() {
  const { userId } = auth()
  const xataClient = getXataClient()

  if (!userId) {
    redirect('/')
  }

  const urls = await xataClient.db.urls
    .filter({
      userId,
    })
    .getMany()

  const insertData = async (formData: FormData) => {
    'use server'

    const dir = headers().get('referer')
    const homeDir = dir?.split('/').slice(0, 3).join('/') + '/'

    const parsedForm = schema.parse({
      fullUrl: formData.get('fullUrl'),
      shortUrl: homeDir + formData.get('shortUrl'),
    })

    const xataClient = getXataClient()

    const record = await xataClient.db.urls
      .filter({ userId: userId, shortUrl: parsedForm.shortUrl })
      .getFirst()

    if (record) {
      await record.update({ fullUrl: parsedForm.fullUrl, clicks: 0 })
    } else {
      await xataClient.db.urls.create({ ...parsedForm, userId })
    }

    revalidatePath('/dashboard')
  }

  return (
    <section className='flex flex-col items-center w-full max-w-4xl mt-8'>
      <Card className='w-full'>
        <CardHeader>
          <CardTitle>URL Shortener</CardTitle>
        </CardHeader>
        <CardContent>
          <InsertForm insertData={insertData} />
        </CardContent>
      </Card>
      <DataTable data={urls} />
    </section>
  )
}
