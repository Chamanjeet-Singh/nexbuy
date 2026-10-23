"use client"

import React from 'react'
import ThemeSwitch from './ThemeSwitch'
import UserDropDown from './UserDropDown'
import { Button } from '../../ui/button'
import { useSidebar } from '../../ui/sidebar'
import logoBlack from '../../../../public/assets/images/logo-black.png'
import logoWhite from '../../../../public/assets/images/logo-white.png'
import { RiMenu4Fill } from "react-icons/ri";
import AdminSearch from './AdminSearch'
import Image from 'next/image'
import AdminMobileSearch from './AdminMobileSearch'


const TopBar = () => {

    const {toggleSidebar} = useSidebar()
  return (
    <div className='fixed border h-14 w-full top-0 left-0 z-30 md:ps-72 md:pe-8 px-5 flex justify-between items-center bg-white dark:bg-card'>

        <div className='flex items-center md:hidden'>
          <Image src={logoBlack.src} height={50} width={logoBlack.width} 
          className='block dark:hidden h-[50] w-auto' alt='logo dark'/>
          <Image src={logoWhite.src} height={50} width={logoWhite.width}
           className='hidden dark:hidden h-[50] w-auto' alt='logo white'/>
        </div>
        <div className='md:block hidden'>
        <AdminSearch/>
        </div>

    <div className='flex items-center gap-2'>
       <AdminMobileSearch/>
        <ThemeSwitch/>
        <UserDropDown/>
        <Button onClick={toggleSidebar} className='ms-2 md:hidden' type='button' size="icon">
            <RiMenu4Fill/>
        </Button>

    </div>
    </div>
  )
}

export default TopBar