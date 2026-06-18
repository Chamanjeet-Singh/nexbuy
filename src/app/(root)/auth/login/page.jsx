"use client"

import React, { useState } from 'react'
import Logo from "../../../../../public/assets/images/logo-black.png"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {z} from "zod"
import { useForm, Controller } from "react-hook-form"
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import Link from 'next/link'
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
import { zSchema } from '../../../../lib/zodSchema'
import LoadingButton from '../../../../components/Application/LoadingButton'
import { WEBSITE_REGISTER } from '@/routes/WebsiteRoute'
import { showToast } from '../../../../lib/showToast'
import axios from 'axios'
import { catchError, response } from "../../../../lib/helperFunction"
import OTPVerification from '../../../../components/Application/OTPVerification'
import {useDispatch} from "react-redux"
import { login } from '../../../../../store/reducer/authReducer'
import { WEBSITE_RESET_PASSWORD } from '../../../../routes/WebsiteRoute'



const LoginPage = () => {

  const dispatch = useDispatch()
  const[loading,setLoading] = useState(false)
  const[otpVerificationLoading,setOtpVerificationLoading] = useState(false)
  const[isTypePassword, setIsTypePassword] = useState(true)
  const [otpEmail, setOtpEmail] = useState()

    const formSchema = zSchema.pick({
        email: true
    }).extend({
      password: z.string().min(3,"Password field is required")
    })


    const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleLoginSubmit = async (values) => {
    try {
      setLoading(true)
      const {data: LoginResponse} = await axios.post("/api/auth/login",values)

      if(!LoginResponse.success)
        throw new Error(LoginResponse.message)

      setOtpEmail(values.email)
      form.reset()
      showToast("success",LoginResponse.message)
      
    } catch (error) {
      showToast("error",error.message)
    }finally{
      setLoading(false)
    }
  }

  //otp verification
  const handleOtpVerification = async (values) => {
    

     try {
      setOtpVerificationLoading(true)
      const {data: otpResponse} = await axios.post("/api/auth/verify-otp",values)

      if(!otpResponse.success)
        throw new Error(otpResponse.message)

      setOtpEmail("")
      showToast("success",otpResponse.message)

      dispatch(login(otpResponse.data))
      
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
                <h1 className='text-3xl font-bold'>Login Into Account</h1>
                <p>Login into Account by filling out the form Below</p>
            </div>
            <div>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(handleLoginSubmit)}>
           
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
            
            
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-description">
                    Password
                  </FieldLabel>
                  <InputGroup>
                    <Input
                      {...field}
                      type={isTypePassword ? "password" : "text"}
                      className="border-none outline-none"
                      id="form-rhf-demo-description"
                      placeholder="************"
                      aria-invalid={fieldState.invalid}
                    />
                    <button className='mr-4 cursor-pointer border-none outline-none' type='button'
                    onClick={()=>{setIsTypePassword(!isTypePassword)}}>
                     { isTypePassword ? <FaRegEyeSlash/> : <FaRegEye/>}
                    </button>
                    
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

          </FieldGroup>
        
        <div className='mb-3'>
            <LoadingButton loading={loading} type="submit" text="Login" className="w-full mt-5 cursor-pointer"/>
        </div>

        <div className='text-center'>
          <div className='flex justify-center items-center gap-1'>
            <p>Don't have account?</p>
            <Link href={WEBSITE_REGISTER} className='text-primary underline'>Create Account</Link>
          </div>
        </div>
        <div className='flex justify-center items-center gap-1'>
            <Link href={WEBSITE_RESET_PASSWORD} className='text-primary underline'>Forgot Password</Link>
        </div>
        
          
        </form>
            </div>
            </>
            :
            <>
            <OTPVerification email={otpEmail} onSubmit={handleOtpVerification} loading={otpVerificationLoading} />
            </>
            }
            
            
            
            
        </CardContent>
    </Card>
  )
}

export default LoginPage