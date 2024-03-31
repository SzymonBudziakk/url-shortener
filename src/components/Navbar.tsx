'use client'
import { UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'

export default function Navbar() {
  const { user, isLoaded } = useUser()

  return (
    <nav className='w-full rounded-xl shadow-md flex justify-between items-center px-8 py-6 mt-4'>
      <Link href='/' className='font-bold text-lg text-gray-800'>
        Home
      </Link>
      <div className='flex items-center justify-center gap-10'>
        {isLoaded && user ? (
          <>
            <Link href='/dashboard' className='navbarLink'>
              Dashboard
            </Link>
            <UserButton afterSignOutUrl='/' />
          </>
        ) : (
          <>
            <Link href='/sign-in' className='navbarLink'>
              Sign In
            </Link>
            <Link href='/sign-up' className='navbarLink'>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

// ;<div className='flex md:hidden'>
//   <button className='text-gray-800 hover:text-gray-900 focus:outline-none'>
//     <svg
//       className='h-6 w-6'
//       fill='none'
//       viewBox='0 0 24 24'
//       stroke='currentColor'
//     >
//       <path
//         strokeLinecap='round'
//         strokeLinejoin='round'
//         strokeWidth='2'
//         d='M4 6h16M4 12h16m-7 6h7'
//       ></path>
//     </svg>
//   </button>
// </div>
