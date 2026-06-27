import React from 'react'

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import adminLogo from "../../../../public/assets/images/admin.png"
import { useSelector} from "react-redux"
import Link from 'next/link'
import { IoShirtOutline } from "react-icons/io5";
import { MdOutlineShoppingBag } from "react-icons/md";
import LogoutButton from './LogoutButton'

const UserDropDown = () => {
    const auth = useSelector((store) => store.authStore.auth)
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <Avatar>
        <AvatarImage
          src={adminLogo.src}
          alt="Admin"
        />
\      </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className = "me-5 w-44" >
        <DropdownMenuGroup>
        <DropdownMenuLabel>
            <p className='font-semibold'>{auth?.name}</p>
        </DropdownMenuLabel>
        <DropdownMenuItem asChild>
            <Link href="/profile" className='curson-pointer'>
            <IoShirtOutline/>
            New Product
            </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
            <Link href="/profile" className='curson-pointer'>
            <MdOutlineShoppingBag/>
            Orders
            </Link>
        </DropdownMenuItem>

        <LogoutButton/>


        </DropdownMenuGroup>
        <DropdownMenuSeparator />
       
    </DropdownMenuContent>
</DropdownMenu>
  )
}

export default UserDropDown