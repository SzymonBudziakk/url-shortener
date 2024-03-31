import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default function Home() {
  const { userId } = auth()
  if (userId) {
    redirect('/dashboard')
  }

  return (
    <div>
      <div>Home page</div>
    </div>
  )
}
