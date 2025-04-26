'use client'

import React from 'react'
import { Button } from '../ui/button'
import { TrashIcon } from '../icons/icons'
import { deleteChannel } from '@/utils/db.action'
import { useRouter } from 'next/navigation'

const RemoveChannelButton = ({channelId}:{channelId:string}) => {
  const router = useRouter();

  const handleRemoveChannel = async () => {
    try {
      const res = await deleteChannel(channelId);

      if (res.success) {
        router.push('/');
        router.refresh();
      } else {
        console.error('Failed to delete channel:', res.error);
      }
      
    } catch (error) {
      console.log(error)
      return
    }
  };

  return (
    <Button onClick={handleRemoveChannel} variant={'ghost'} className='w-full cursor-pointer flex items-center justify-start gap-[15px]'>
      <TrashIcon size={20} color='red' />
      <span className='text-red-600'>hapus</span>
    </Button>
  )
}

export default RemoveChannelButton