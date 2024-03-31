'use client'
import { UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'

export default function Navbar() {
  const { user, isLoaded } = useUser()

  return (
    <nav className='w-full flex justify-between items-center p-10 text-xl border-b-[1px]'>
      <Link href='/' className='font-bold'>
        HOME
      </Link>
      <div className='flex items-center justify-center gap-10'>
        {isLoaded && user && (
          <>
            <Link href='/dashboard' className='font-bold'>
              DASHBOARD
            </Link>
            <UserButton afterSignOutUrl='/' />
          </>
        )}
      </div>
    </nav>
  )
}
