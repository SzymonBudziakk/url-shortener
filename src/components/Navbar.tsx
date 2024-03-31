'use client'
import { UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'

export default function Navbar() {
  const { user, isLoaded } = useUser()

  return (
    <nav className='w-full flex justify-between items-center p-8 text-lg font-bold border-b-[1px] border-black'>
      <Link href='/' className='font-bold'>
        Home
      </Link>
      <div className='flex items-center justify-center gap-10'>
        {isLoaded && user ? (
          <>
            <Link href='/dashboard'>Dashboard</Link>
            <UserButton afterSignOutUrl='/' />
          </>
        ) : (
          <>
            <Link href='/sign-in'>Sign In</Link>
            <Link href='/sign-up'>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  )
}
