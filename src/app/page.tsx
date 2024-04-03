export default function Home() {
  return (
    <main className='flex-1'>
      <section className='w-full py-32 lg:py-44 border-t'>
        <div className='container flex flex-col items-center justify-center space-y-4 text-center px-4 md:px-6'>
          <div className='space-y-2'>
            <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
              The URL Shortener for the modern web
            </h1>
            <p className='mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
              Shorten links, measure traffic, and engage your audience with the
              power of the URL.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
