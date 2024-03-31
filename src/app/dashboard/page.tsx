import DataTable from '@/components/DataTable'
import InsertForm from '@/components/InsertForm'
import { getXataClient } from '@/xata'
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const schema = z.object({
  fullUrl: z.string().min(1),
  shortUrl: z.string().min(1),
})

export default async function Dashboard() {
  const { userId } = auth()
  const xataClient = getXataClient()

  // userId, fullUrl, shortUrl, clicks

  if (!userId) {
    redirect('/')
  }

  const urls = await xataClient.db.urls
    .filter({
      userId,
    })
    .getMany()

  const createFolder = async (formData: FormData) => {
    'use server'

    const parsedForm = schema.parse({
      fullUrl: formData.get('fullUrl'),
      shortUrl: formData.get('shortUrl'),
    })
    if (!userId) {
      return
    }

    const xataClient = getXataClient()
    await xataClient.db.urls.create({ ...parsedForm, userId })
    revalidatePath('/')
  }

  return (
    <div className='flex flex-col items-center justify-center py-16 gap-12'>
      <div className='mx-auto bg-white rounded-lg shadow-lg p-6'>
        <h1 className='text-2xl font-bold mb-4'>URL Shortener</h1>
        <InsertForm createFolder={createFolder} />
      </div>

      <DataTable data={urls} />
    </div>
  )
}
