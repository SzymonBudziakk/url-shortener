'use client'

interface OptionsProps {
  shortUrl: string
  userId: string | null | undefined
  deleteRecord: (userId: string | null | undefined, shortUrl: string) => void
}

export default function Options({
  shortUrl,
  userId,
  deleteRecord,
}: OptionsProps) {
  return (
    <button onClick={() => deleteRecord(userId, shortUrl)}>
      <TrashIcon className='h-6 w-6 text-gray-500' />
    </button>
  )
}

function TrashIcon(props: { className?: string }) {
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
      <path d='M3 6h18' />
      <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' />
      <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' />
    </svg>
  )
}
