'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { fetcher } from '@/utils/fetcher.action'
import { Button } from '../ui/button'
import Spinner from '../Spinner'
import { LogoutIcon } from '../icons/icons'

const LogoutButton = () => {
  const router = useRouter();

  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

  const handleLogout = async () => {
    try {
      const { success, error } = await fetcher(
        'POST',
        '/api/chatai/auth/logout'
      )
      setIsLoggingOut(true);

      if (success) {
        setIsLoggingOut(false);
        router.push('/sign-in');
      } else {
        console.error('Logout failed:', error);
      }
    } catch (error) {
      toast.error('Error while logging out');
      console.error('Error saat logout:', error);
    }
  };

  return (
    <Button onClick={handleLogout} variant={'ghost'} className={cn(
      'flex cursor-pointer w-full',
      isLoggingOut ? 'justify-center' : 'justify-start'
    )}>
      {isLoggingOut ? (
        <Spinner />
      ) : (
        <div className="flex items-center gap-[15px]">
          <LogoutIcon size={25} color='black' />
          <span>Log out</span>
        </div>
      )}
    </Button>
  )
}

export default LogoutButton