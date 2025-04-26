'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { HosrizontalDotsIcon, PenIcon, ShareIcon } from '../icons/icons'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import RemoveChannelButton from './RemoveChannelButton'
import { useAppDispatch } from '@/lib/hooks'
import { setSidebar } from '@/lib/redux/slice/utilitySlice'

interface Props {
  id: string,
  title: string
}

const ChannelButton = ({id, title}:Props) => {
  const [hover, setHover] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className='cursor-pointer'>
      <div className={cn(
        'w-full flex items-center justify-between p-[.7rem] rounded-[10px]',
        'transition-all duration-300 ease-in-out',
        hover && 'bg-gray-500/30'
      )}>
        <Link href={`/chat/${id}`} onClick={() => dispatch(setSidebar(false))}>
          <span>{title}</span>
        </Link>

        {/* pop up */}
        {hover && (
          <Popover>
            <PopoverTrigger asChild className='bg-none'>
              <button className='p-0 cursor-pointer'> <HosrizontalDotsIcon size={20} color='white' /> </button>
            </PopoverTrigger>
            <PopoverContent className='ml-[100px] p-[.7rem] w-fit flex flex-col gap-[10px] items-start'>
              <Button variant={'ghost'} className='w-full cursor-pointer flex items-center justify-start gap-[15px]'>
                <ShareIcon size={20} color='black' />
                <span>bagikan</span>
              </Button>
              <Button variant={'ghost'} className='w-full cursor-pointer flex items-center justify-start gap-[15px]'>
                <PenIcon size={20} color='black' />
                <span>ganti nama</span>
              </Button>
              <RemoveChannelButton channelId={id} />
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  )
}

export default ChannelButton