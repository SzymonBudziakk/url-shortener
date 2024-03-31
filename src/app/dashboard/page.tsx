import FolderForm from '@/components/FolderForm'
import { getXataClient } from '@/xata'
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(5),
})

interface URL {
  userId: string
  fullUrl: string
  shortUrl: string
  clicks: number
}

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

    // const parsedForm = schema.parse({
    //   name: formData.get('name'),
    // })
    // if (!userId) {
    //   return
    // }

    // const xataClient = getXataClient()
    // await xataClient.db.folders.create({ ...parsedForm, userId })
    // revalidatePath('/')
  }

  return (
    <div className='flex flex-col items-center justify-center py-16 gap-12'>
      <div className='mx-auto bg-white rounded-lg overflow-hidden shadow-lg p-6'>
        <h1 className='text-2xl font-bold mb-4'>URL Shortener</h1>

        <FolderForm createFolder={createFolder} />
      </div>

      <table className='min-w-full bg-white rounded-lg overflow-hidden'>
        <thead className='bg-gray-100 text-gray-600 uppercase text-sm leading-normal'>
          <tr>
            <th className='py-3 px-6 text-left'>Original URL</th>
            <th className='py-3 px-6 text-left'>Short URL</th>
            <th className='py-3 px-6 text-left'>Clicks</th>
          </tr>
        </thead>
        <tbody className='text-gray-600 text-sm font-light'>
          {urls.map((url, id) => {
            return (
              <tr key={id} className='border-b border-gray-200'>
                <td className='py-3 px-6 text-left whitespace-nowrap'>
                  <a href={url.fullUrl}>{url.fullUrl}</a>
                </td>
                <td className='py-3 px-6 text-left whitespace-nowrap'>
                  {url.shortUrl}
                </td>
                <td className='py-3 px-6 text-left whitespace-nowrap'>
                  {url.clicks}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
