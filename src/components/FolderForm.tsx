export default function FolderForm() {
  async function createFolder(formData: FormData) {
    'use server'
    console.log(formData.get('name'))
  }

  return (
    <form action={createFolder} className='flex flex-col gap-6 max-w-40'>
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
