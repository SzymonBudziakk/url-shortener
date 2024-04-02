'use client'
import { UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from './ui/button'

export default function Navbar() {
  const { user, isLoaded } = useUser()

  return (
    <header className='w-full max-w-6xl'>
      <nav className='flex justify-between items-center p-4 bg-white shadow-md rounded-lg'>
        <Link href='/' className='flex items-center space-x-4'>
          <Button className='rounded-full p-2' variant='ghost'>
            <HomeIcon className='h-4 w-4' />
          </Button>
        </Link>
        <div className='flex items-center space-x-4'>
          {isLoaded && user ? (
            <>
              <Link href='/dashboard'>
                <Button variant='ghost'>Dashboard</Button>
              </Link>

              <UserButton afterSignOutUrl='/' />
            </>
          ) : (
            <>
              <Link href='/sign-in'>
                <Button variant='ghost'>Sign In</Button>
              </Link>
              <Link href='/sign-up'>
                <Button variant='ghost'>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

function HomeIcon(props: { className?: string }) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <path d='m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
      <polyline points='9 22 9 12 15 12 15 22' />
    </svg>
  )
}
