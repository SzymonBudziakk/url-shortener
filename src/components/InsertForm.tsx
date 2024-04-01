'use client'
import { useRef } from 'react'

interface InsertFormProps {
  insertData: (formData: FormData) => void
}

export default function InsertForm({ insertData }: InsertFormProps) {
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <form
      action={(formData) => {
        insertData(formData)
        formRef.current?.reset()
      }}
      ref={formRef}
      className='min-w-80'
    >
      <div className='flex flex-col gap-2 mb-4'>
        <label className='label' htmlFor='fullUrl'>
          FULL URL
        </label>
        <input
          name='fullUrl'
          type='text'
          placeholder='Enter original url...'
          className='input mb-2'
        />
        <label className='label' htmlFor='shortUrl'>
          SHORT URL
        </label>
        <input
          name='shortUrl'
          type='text'
          placeholder='Enter desired url...'
          className='input'
        />
      </div>
      <div className='mb-6'>
        <button
          type='submit'
          className='bg-blue-500 w-full hover:bg-blue-600 transition text-white font-bold py-2 px-4 rounded focus:outline-none'
        >
          Submit
        </button>
      </div>
    </form>
  )
}
