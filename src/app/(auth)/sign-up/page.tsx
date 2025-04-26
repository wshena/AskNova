import AuthForm from '@/components/AuthForm'
import Logo from '@/components/Logo'
import React from 'react'

const page = () => {
  return (
    <div className='w-[80%] md:w-[50%] lg:w-[30%] 2xl:w-[20%] border border-black p-[1rem] rounded-[10px] flex flex-col items-center gap-[20px]'>
      <Logo />
      <AuthForm type='sign-up' />
    </div>
  )
}

export default page