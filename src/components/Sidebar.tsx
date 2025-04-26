'use client'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { setSidebar } from '@/lib/redux/slice/utilitySlice'
import { RootState } from '@/lib/redux/store'
import { cn } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import { CloseSidebarIcon, CreateNewConvIcon } from './icons/icons'
import ChannelButton from './buttons/ChannelButton'
import Link from 'next/link'
import axios from 'axios'

const Sidebar = ({userId}:{userId:string}) => {
  const dispatch = useAppDispatch();
  const { sidebar } = useAppSelector((state:RootState) => state.utility);

  const [userConvs, setUserConvs] = useState<any | null>(null);

  const handleSidebar = () => {
    dispatch(setSidebar(false));
  }

  useEffect(() => {
    if (!userId) return

    const fetchConvs = async () => {
      try {
        const res = await axios.get('/api/chatai/conv', {
          params: { userId }
        })
        // res.data => { success: true, data: [...] }
        setUserConvs(res.data.data || [])
      } catch (err) {
        console.error('fetch convs error', err)
        setUserConvs([])
      }
    }

    fetchConvs()
  }, [sidebar, userId]);

  return (
    <div className={cn(
      'z-50 w-[100%] md:w-[30%] lg:w-[20%] 2xl:w-[10%] h-[100vh] bg-black fixed top-0', 
      'transition-all duration-500 ease-in-out',
      sidebar ? 'left-0' : '-left-[1000px]')}>
      <aside className='w-full p-[1rem] text-white'>
        <div className="flex flex-col gap-[20px]">
          <div className="flex items-center justify-between">
            <button
              className='rounded-full cursor-pointer bg-black p-0' 
              onClick={handleSidebar}
              aria-label='Close Sidebar'
            > <CloseSidebarIcon size={25} color='white' /> </button>
            <Link href={'/'}>
              <button
                className='rounded-full cursor-pointer bg-black p-0' 
                onClick={handleSidebar}
                aria-label='Close Sidebar'
              > <CreateNewConvIcon size={25} color='white' /> </button>
            </Link>
          </div>
          
          <div className="h-[90%] overflow-y-auto">
            {userConvs && userConvs.length > 0 ? (
              <div className='flex flex-col gap-[15px]'>
                {userConvs?.map((item:any) => (
                  <ChannelButton key={item?.id} id={item?.id} title={item?.title} />
                ))}
              </div>
            ) : (
              <span>No conversations</span>
            )}
          </div>
        </div>
      </aside>
    </div>
  )
}

export default Sidebar