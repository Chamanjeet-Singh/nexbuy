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
import { WEBSITE_LOGIN } from '@/routes/WebsiteRoute'

import axios from 'axios'
import { showToast } from '../../../../lib/showToast'



const Registerpage = () => {

  const[loading,setLoading] = useState(false)
  const[isTypePassword, setIsTypePassword] = useState(true)

    const formSchema = zSchema.pick({
       name: true, email: true, password:true
    }).extend({
        confirmPassword: z.string().min(1, "Confirm password is required"),
    }).refine((data)=> data.password === data.confirmPassword , {
        message: "Password and confirm password must be same",
        path: ["confirmPassword"]
    })


    const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const handleRegisterSubmit = async (values) => {
    try {
      setLoading(true)
      const {data: registerResponse} = await axios.post("/api/auth/register",values)

      if(!registerResponse.success)
        throw new Error(registerResponse.message)

      form.reset()
      showToast("success",registerResponse.message)
      
    } catch (error) {
      showToast("error",error.message)
    }finally{
      setLoading(false)
    }

  }

  return (
    <Card>
        <CardContent className="w-[400px]">
            <div className='flex justify-center'>
                <Image src = {Logo.src} width = {Logo.width} height = {Logo.height} alt="logo" className="max-w-[150px]"/>
            </div>
            <div className="text-center mb-8 mt-4">
                <h1 className='text-3xl font-bold'>Create Account!</h1>
                <p>Create new Account by filling out the form Below</p>
            </div>
            <div>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(handleRegisterSubmit)}>
           
            <FieldGroup>

                <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Name
                  </FieldLabel>
                  <Input
                    {...field}
                    type = "text"
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="John Doe"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            
           
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


            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-description">
                    Confirm Password
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
            <LoadingButton loading={loading} type="submit" text="Create Account" className="w-full mt-5 cursor-pointer"/>
        </div>

        <div className='text-center'>
          <div className='flex justify-center items-center gap-1'>
            <p>Already have an account?</p>
            <Link href={WEBSITE_LOGIN} className='text-primary underline'>Login</Link>
          </div>
        </div>
        
          
        </form>
            </div>
        </CardContent>
    </Card>
  )
}

export default Registerpage