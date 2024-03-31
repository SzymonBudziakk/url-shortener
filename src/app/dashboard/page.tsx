import FolderForm from '@/components/FolderForm'
import { getXataClient } from '@/xata'
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(5),
})

export default async function Dashboard() {
  const { userId } = auth()
  const xataClient = getXataClient()

  // FULL URL,  SHORT UTR,  CLICKS

  if (!userId) {
    redirect('/')
  }
  const folders = await xataClient.db.folders
    .filter({
      userId,
    })
    .getMany()

  const createFolder = async (formData: FormData) => {
    'use server'

    const parsedForm = schema.parse({
      name: formData.get('name'),
    })
    if (!userId) {
      return
    }

    const xataClient = getXataClient()
    await xataClient.db.folders.create({ ...parsedForm, userId })
    revalidatePath('/')
  }

  return (
    <div className='flex flex-col gap-12'>
      <h1>Dashboard Page</h1>
      <FolderForm createFolder={createFolder} />
      {folders.map((folder, id) => (
        <p key={id}>{folder.name}</p>
      ))}
    </div>
  )
}
