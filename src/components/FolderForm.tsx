'use client'
import { useRef } from 'react'

interface FolderFormProps {
  createFolder: (formData: FormData) => void
}

export default function FolderForm({ createFolder }: FolderFormProps) {
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <form
      action={(formData) => {
        createFolder(formData)
        formRef.current?.reset()
      }}
      ref={formRef}
    >
      <div className='mb-4'>
        <input
          type='text'
          placeholder='Type your url here...'
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
      </div>
      <div className='mb-6'>
        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-600 transition text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        >
          Submit
        </button>
      </div>
    </form>
  )
}
