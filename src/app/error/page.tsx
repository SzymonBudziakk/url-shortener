import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { auth } from '@clerk/nextjs'
import Link from 'next/link'

export default function Error() {
  return (
    <Card className='w-full max-w-lg mx-auto'>
      <CardHeader className='flex flex-col items-center'>
        <div className='inline-flex flex-col items-center gap-1'>
          <AlertCircleIcon className='w-14 h-14' />
          <div className='flex flex-col items-center'>
            <h1 className='text-3xl font-bold'>Oops! Something went wrong.</h1>
            <p className='text-center text-gray-500 dark:text-gray-400'>
              {`Don't worry, we're on it. An error occurred and we're working to
              fix the problem. Please try again later.`}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className='flex justify-center p-6'>
        <div className='flex gap-2'>
          <Link
            className='inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white shadow-sm px-8 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300'
            href='/'>
            Home Page
          </Link>
          <Link
            className='inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white shadow-sm px-8 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300'
            href='/dashboard'>
            Dashboard
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

function AlertCircleIcon(props: { className?: string }) {
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
      <circle cx='12' cy='12' r='10' />
      <line x1='12' x2='12' y1='8' y2='12' />
      <line x1='12' x2='12.01' y1='16' y2='16' />
    </svg>
  )
}
