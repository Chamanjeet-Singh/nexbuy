"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LuSun } from "react-icons/lu";
import { LuSunMoon } from "react-icons/lu";
import { useTheme } from "next-themes"


const ThemeSwitch = () => {
    const { setTheme } = useTheme()
  return (
    <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button type="button" variant="ghost" className="cursor-pointer">
        <LuSun className='dark:hidden'/>
        <LuSunMoon className='hidden dark:block'/>
        </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
      <DropdownMenuItem onClick={()=>setTheme("light")}>Light</DropdownMenuItem>
      <DropdownMenuItem onClick={()=>setTheme("dark")}>Dark</DropdownMenuItem>
      <DropdownMenuItem onClick={()=>setTheme("system")}>System</DropdownMenuItem>

    </DropdownMenuContent>
</DropdownMenu>
  )
}

export default ThemeSwitch