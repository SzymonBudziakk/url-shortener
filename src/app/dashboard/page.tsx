import FolderForm from '@/components/FolderForm'
import { getXataClient } from '@/xata'

export default async function Dashboard() {
  const xataClient = getXataClient()

  const folders = await xataClient.db.folders.getMany()
  return (
    <div className='flex flex-col gap-12'>
      <h1>Dashboard Page</h1>
      <FolderForm />
      {folders.map((folder, id) => (
        <p key={id}>{folder.name}</p>
      ))}
    </div>
  )
}
