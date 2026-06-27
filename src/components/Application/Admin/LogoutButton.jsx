"use client"

import React from 'react'
import { MdLogout } from "react-icons/md";
import { DropdownMenuItem} from "@/components/ui/dropdown-menu"
import { showToast } from '../../../lib/showToast';
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useDispatch} from "react-redux"
import {logout} from "../../../../store/reducer/authReducer"
import {WEBSITE_LOGIN} from "../../../routes/WebsiteRoute"



const LogoutButton = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const handleLogut = async () => {
   try {
     const {data : logoutResponse} = await axios.post("/api/auth/logout")
     if(!logoutResponse.success){
      throw new Error(logoutResponse.message)
     }
     dispatch(logout())
     showToast("success", logoutResponse.message)
     router.push(WEBSITE_LOGIN)

   } catch (error) {
      showToast("error", error.message)
    
   }
  }
  return (
   <DropdownMenuItem onClick = {handleLogut} className="cursor-pointer"> 
            <MdLogout color='red'/>
            Logout
        </DropdownMenuItem>

  )
}

export default LogoutButton