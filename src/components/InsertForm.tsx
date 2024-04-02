'use client'
import { useRef } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'

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
      className='grid gap-4'>
      <div className='flex flex-col'>
        <label className='mb-2 text-sm font-medium' htmlFor='fullUrl'>
          FULL URL
        </label>
        <Input
          name='fullUrl'
          id='fullurl'
          type='text'
          placeholder='Enter original url...'
        />
      </div>
      <div className='flex flex-col'>
        <label className='mb-2 text-sm font-medium' htmlFor='shortUrl'>
          SHORT URL
        </label>
        <Input
          name='shortUrl'
          id='shortUrl'
          type='text'
          placeholder='Enter desired url...'
        />
      </div>
      <Button type='submit' className='w-32'>
        Submit
      </Button>
    </form>
  )
}
