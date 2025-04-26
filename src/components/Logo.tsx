import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href={'/'}>
      <Image src={'/image/logo-cropped.png'} alt='asknova' width={100} height={100} className='cursor-pointer'/>
    </Link>
  )
}

export default Logo