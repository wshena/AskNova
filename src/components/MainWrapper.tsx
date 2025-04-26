'use client'
import { useAppSelector } from '@/lib/hooks'
import { RootState } from '@/lib/redux/store'
import { cn } from '@/lib/utils'
import React from 'react'
import Navbar from './Navbar'

const MainWrapper = ({children}:{children:React.ReactNode}) => {
  const { sidebar } = useAppSelector((state:RootState) => state.utility);

  return (
    <main className={cn(
      'relative',
      sidebar ? 'px-0' : 'xl:px-[3rem]'
    )}>
      <div className={cn(
        sidebar ? "md:pl-[30%] lg:pl-[20%] 2xl:pl-[10%]" : 'pl-0',
        'transition-all duration-500 ease-in-out'
      )}>
        <Navbar />
        {children}
      </div>
    </main>
  )
}

export default MainWrapper