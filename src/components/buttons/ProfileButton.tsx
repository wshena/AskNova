import React from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '../ui/button'
import { UserIcon } from '../icons/icons'
import LogoutButton from './LogoutButton'

const ProfileButton = ({user}:{user:any}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={'outline'} className='rounded-full cursor-pointer'> <UserIcon size={30} color='black' /> </Button>
      </PopoverTrigger>
      <PopoverContent className='mr-[10px] lg:mr-[30px] xl:mr-[50px] flex flex-col gap-[10px] items-center'>
        <span className='font-bold pb-[10px] border-b'>{user?.email}</span>
        <LogoutButton />
      </PopoverContent>
    </Popover>
  )
}

export default ProfileButton