import React from 'react'
import logoBlack from '../../../../public/assets/images/logo-black.png'
import logoWhite from '../../../../public/assets/images/logo-white.png'
import {Button} from "../../../components/ui/button"
import { LuChevronRight } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";


import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import Image from 'next/image'

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className="border-b h-14 p-0">
        <div className='flex justify-between items-center px-4'>
            <Image src={logoBlack.src} height={50} width={logoBlack.width} className='block dark:hidden h-[50] w-auto' alt='logo dark'/>
            <Image src={logoWhite.src} height={50} width={logoWhite.width} className='hidden dark:hidden h-[50] w-auto' alt='logo white'/>
            <Button type="button" sizee="icon" className="">
            <IoMdClose/>
            </Button>

        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}

export default AppSidebar