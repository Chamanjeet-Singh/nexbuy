"use client"
import React, { useState } from 'react'

import Logo from "../../../../../public/assets/images/logo-black.png"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import Image from "next/image"
import {  Controller } from "react-hook-form"
import LoadingButton from '../../../../components/Application/LoadingButton'
import { zSchema } from '../../../../lib/zodSchema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { showToast } from '../../../../lib/showToast'
import { WEBSITE_LOGIN } from '@/routes/WebsiteRoute'
import UpdatePassword from '../../../../components/Application/UpdatePassword'
import axios from 'axios'
import OTPVerification from '../../../../components/Application/OTPVerification'




const ResetPassword = () => {

    const [emailVerificationLoading, setEmailVerificationLoading] = useState(false)
    const[otpVerificationLoading,setOtpVerificationLoading] = useState(false)
    const [otpEmail, setOtpEmail] = useState()
    const [isOtpVerified, setIsOtpVerified] = useState(false)
    
    
    // const [loading,setLoading] = useState()

    const formSchema = zSchema.pick({
        email:true
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: ""
        }
    })


    const handleEmailVerification = async (values) => {

      try {
      setEmailVerificationLoading(true)
      const {data: sendOtpResponse} = await axios.post("/api/auth/reset-password/send-otp",values)

      if(!sendOtpResponse.success)
        throw new Error(sendOtpResponse.message)

      setOtpEmail(values.email)
      showToast("success",sendOtpResponse.message)      
    } catch (error) {
      showToast("error",error.message)
    }finally{
      setEmailVerificationLoading(false)
    }

    }

    const handleOtpVerification = async (values) => {
    

     try {
      setOtpVerificationLoading(true)
      const {data: otpResponse} = await axios.post("/api/auth/reset-password/verify-otp",values)

      if(!otpResponse.success)
        throw new Error(otpResponse.message)
      showToast("success",otpResponse.message)   
      setIsOtpVerified(true)   
    } catch (error) {
      showToast("error",error.message)
    }finally{
      setOtpVerificationLoading(false)
    }


  }
  return (
     <Card>
        <CardContent className="w-[400px]">
            <div className='flex justify-center'>
                <Image src = {Logo.src} width = {Logo.width} height = {Logo.height} alt="logo" className="max-w-[150px]"/>
            </div>
            
            {!otpEmail ? 
            <>
            <div className="text-center mb-8 mt-4">
                <h1 className='text-3xl font-bold'>Reset Password</h1>
                <p>Enter your registered email to reset your password</p>
            </div>
            <div>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(handleEmailVerification)}>
           
            <FieldGroup>
           
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Email
                  </FieldLabel>
                  <Input
                    {...field}
                    type = "email"
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="example@gmail.com"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            
            
          </FieldGroup>
        
        <div className='mb-3'>
            <LoadingButton loading={emailVerificationLoading} type="submit" text="Send OTP" className="w-full mt-5 cursor-pointer"/>
        </div>

        <div className='text-center'>
          <div className='flex justify-center items-center gap-1'>

            <Link href={WEBSITE_LOGIN} className='text-primary underline'>Back to Login</Link>
          </div>
        </div>
        
        
          
        </form>
            </div>
            </>
            :
            <>
            {!isOtpVerified ?
            <>
            <OTPVerification email={otpEmail} onSubmit={handleOtpVerification} loading={otpVerificationLoading} />
            </>
            : 
            <>
            <UpdatePassword email={otpEmail} />
            </>
}
            </>
            }
            
            
            
            
        </CardContent>
    </Card>
  )
}

export default ResetPassword