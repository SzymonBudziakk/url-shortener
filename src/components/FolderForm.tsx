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
      className='flex flex-col gap-6 max-w-40'
    >
      <label htmlFor='name'>New Name</label>
      <input
        name='name'
        id='name'
        type='text'
        placeholder='My folder'
        className='text-black'
      />
      <button type='submit' className='bg-white p-2 rounded-md text-black'>
        Submit
      </button>
    </form>
  )
}
