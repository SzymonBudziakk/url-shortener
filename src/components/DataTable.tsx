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
          <th className='py-3 px-6 text-left'>Delete</th>
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

              <td>
                {/* <td className='py-3 px-6 text-left whitespace-nowrap'> */}
                <button>
                  {/* <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6 fill-blue-600 text-blue-600' // Set fill color to blue-600
                    viewBox='0 0 24 24'
                    stroke='#f3f3f3'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M19 7l%-4 4h-3l-4-4m0 0l-4 4h-3l-4-4 4-4'
                    />
                  </svg> */}
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6 fill-current text-blue-600'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M12 6v6l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
