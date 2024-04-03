import { UrlsRecord, getXataClient } from '@/xata'
import { PageRecordArray, SelectedPick } from '@xata.io/client'
import { revalidatePath } from 'next/cache'
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from '@/components/ui/table'
import Delete from './Delete'

interface DataTableProps {
  data: PageRecordArray<Readonly<SelectedPick<UrlsRecord, ['*']>>>
}

export default function DataTable({ data }: DataTableProps) {
  const handleRecordDelete = async (
    userId: string | null | undefined,
    shortUrl: string
  ) => {
    'use server'
    if (!userId) return

    const xata = getXataClient()

    const record = await xata.db.urls
      .filter({ userId: userId, shortUrl: shortUrl })
      .getFirst()

    if (!record) return
    await xata.db.urls.delete([record.id])

    revalidatePath('/dashboard')
  }

  return (
    <Table className='w-full mt-8 bg-white shadow-md rounded-lg'>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[50%]'>Original URL</TableHead>
          <TableHead className='w-[30%]'>Short URL</TableHead>
          <TableHead>Clicks</TableHead>
          <TableHead>Delete</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((url, id) => {
          return (
            <TableRow key={id}>
              <TableCell className='font-medium'>
                <a href={url.fullUrl}>{url.fullUrl}</a>
              </TableCell>
              <TableCell>
                <a href={url.shortUrl}>{url.shortUrl.split('/').pop()}</a>
              </TableCell>
              <TableCell>{url.clicks}</TableCell>

              <TableCell>
                <Delete
                  shortUrl={url.shortUrl}
                  userId={url.userId}
                  deleteRecord={handleRecordDelete}
                />
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
