import { PiggyBank, VenetianMask } from 'lucide-react'
import React from 'react'
import Link from 'next/link'

function Logo() {
  return (
    <Link href="/" className='flex items-center gap-2 px-4 pt-4'>
      <VenetianMask size={44} className='stroke h-11 w-11 stroke-amber-600 stroke-[1.5]'/>
      <p className='bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent'>
        A Journal that can talk back!
      </p>
    </Link>
  )
}


export function LogoMobile() {
  return (
    <Link href="/" className='flex items-center gap-2 px-4'>
      <p className='bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent'>
        A Journal that can talk back!
      </p>
    </Link>
  )
}
export default Logo

