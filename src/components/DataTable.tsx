import { UrlsRecord } from '@/xata'
import { PageRecordArray, SelectedPick } from '@xata.io/client'

interface DataTableProps {
  data: PageRecordArray<Readonly<SelectedPick<UrlsRecord, ['*']>>>
}

export default function DataTable({ data }: DataTableProps) {
  return (
    <table className='min-w-full bg-white rounded-lg'>
      <thead className='bg-gray-100 text-gray-600 text-sm'>
        <tr>
          <th className='py-3 px-6 text-left'>Original URL</th>
          <th className='py-3 px-6 text-left'>Short URL</th>
          <th className='py-3 px-6 text-left'>Clicks</th>
        </tr>
      </thead>
      <tbody className='text-gray-600 text-sm font-light'>
        {data.map((url, id) => {
          return (
            <tr key={id} className='border-b border-gray-200'>
              <td className='py-3 px-6 text-left whitespace-nowrap'>
                <a href={url.fullUrl} target='_blank'>
                  {url.fullUrl}
                </a>
              </td>
              <td className='py-3 px-6 text-left whitespace-nowrap'>
                <a href={url.shortUrl} target='_blank'>
                  {url.shortUrl}
                </a>
              </td>
              <td className='py-3 px-6 text-left whitespace-nowrap'>
                {url.clicks}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
