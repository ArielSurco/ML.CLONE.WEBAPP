import { IoIosSearch } from 'react-icons/io'

import { Input } from '@/shared/components/input'

export function SearchBar() {
  return (
    <form className='group relative flex h-10 items-center'>
      <Input
        className='h-10 py-[10px] pe-16 ps-4 text-base placeholder:text-base'
        name='search'
        placeholder='Buscar productos, marcas y más...'
      />
      <button
        className='absolute right-0 top-0 flex h-10 w-12 items-center justify-center bg-transparent'
        type='submit'
      >
        <IoIosSearch className='w-full border-l' color='#666' size={20} />
      </button>
    </form>
  )
}
