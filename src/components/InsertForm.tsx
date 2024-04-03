'use client'
import { useEffect, useRef, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

interface InsertFormProps {
  insertData: (formData: FormData) => void
}

export default function InsertForm({ insertData }: InsertFormProps) {
  const formRef = useRef<HTMLFormElement>(null)

  const [fullUrl, setFullUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [isValidFull, setIsValidFull] = useState(false)
  const [isValidShort, setIsValidShort] = useState(false)

  useEffect(() => {
    setIsValidFull(fullUrl.length > 0)
  }, [fullUrl])

  useEffect(() => {
    setIsValidShort(/^[a-zA-Z0-9]+$/.test(shortUrl))
  }, [shortUrl])

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
          value={fullUrl}
          onChange={(e) => setFullUrl(e.target.value)}
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
          value={shortUrl}
          onChange={(e) => setShortUrl(e.target.value)}
          name='shortUrl'
          id='shortUrl'
          type='text'
          placeholder='Enter desired url...'
        />
        {!isValidShort && shortUrl.length > 0 && (
          <p className='text-sm mt-2 ml-3 transition duration-300 text-red-600'>{`Only a-z, A-Z, 0-9 characters allowed`}</p>
        )}
      </div>
      <Button
        type='submit'
        className='w-32'
        disabled={!isValidShort || !isValidFull}>
        Submit
      </Button>
    </form>
  )
}
