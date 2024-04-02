import DataTable from '@/components/DataTable'
import InsertForm from '@/components/InsertForm'
import { getXataClient } from '@/xata'
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card'

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
    // dodac pierwsza czesc linku xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    const parsedForm = schema.parse({
      fullUrl: formData.get('fullUrl'),
      shortUrl: 'abc' + formData.get('shortUrl'),
    })

    const xataClient = getXataClient()
    await xataClient.db.urls.create({ ...parsedForm, userId })
    revalidatePath('/')
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
