'use client'
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setSidebar } from '@/lib/redux/slice/utilitySlice';
import { RootState } from '@/lib/redux/store';
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react'
import ProfileButton from './buttons/ProfileButton';
import { fetcher } from '@/utils/fetcher.action';
import Link from 'next/link';
import { Button } from './ui/button';
import Logo from './Logo';
import { OpenSidebarIcon } from './icons/icons';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { sidebar } = useAppSelector((state:RootState) => state.utility);
  const [user, setUser] = useState<any>();

  const handleSidebar = () => {
    dispatch(setSidebar(true));
  };

  useEffect(() => {
    async function loadUser() {
      const res = await fetcher('GET', '/api/chatai/auth/me')
      if (res?.user) setUser(res?.user)
    }
    loadUser()
  }, []);

  return (
    <header className={cn(
      'fixed border-b bg-white top-0 left-0 z-30 w-full p-[1rem] flex items-center justify-between',
      'transition-all duration-500 ease-in-out',
      sidebar ? 'md:pl-[31%] lg:pl-[21%] 2xl:pl-[11%]' : 'pl-[1rem]'
    )}>
      <div className="flex items-center gap-[20px]">
        <button
          className={cn(
            'cursor-pointer rounded-full p-0',
            sidebar ? 'md:hidden' : 'block'
          )} 
          onClick={handleSidebar}
        > <OpenSidebarIcon size={25} color='black' /> </button>
        <Logo />
      </div>

      {/* <ProfileButton /> */}
      {!user || user?.data === null ? (
        <Link href={'/sign-up'}>
          <Button variant={'outline'} className='cursor-pointer capitalize'>Sign in</Button>
        </Link>
      ) : (
        <ProfileButton user={user} />
      )}
    </header>
  )
}

export default Navbar