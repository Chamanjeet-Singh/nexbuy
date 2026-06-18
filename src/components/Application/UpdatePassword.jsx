"use client"

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {z} from "zod"
import { useForm, Controller } from "react-hook-form"
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
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
import { zSchema } from '../../lib/zodSchema'
import LoadingButton from '../../components/Application/LoadingButton'
import axios from 'axios'
import { showToast } from '../../lib/showToast'
import { useRouter} from "next/navigation"
import { WEBSITE_LOGIN } from '@/routes/WebsiteRoute'





const UpdatePassword = ({email}) => {

    const router= useRouter()

  const[loading,setLoading] = useState(false)
  const[isTypePassword, setIsTypePassword] = useState(true)

    const formSchema = zSchema.pick({
       email:true, password:true
    }).extend({
        confirmPassword: z.string().min(1, "Confirm password is required"),
    }).refine((data)=> data.password === data.confirmPassword , {
        message: "Password and confirm password must be same",
        path: ["confirmPassword"]
    })


    const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: email,
      password: "",
      confirmPassword: "",
    },
  })

  const handlePasswordUpdate = async (values) => {
    try {
      setLoading(true)
      const {data: passwordUpdate} = await axios.post("/api/auth/reset-password/update-password",values)

      if(!passwordUpdate.success)
        throw new Error(passwordUpdate.message)

      form.reset()
      showToast("success",passwordUpdate.message)
      router.push(WEBSITE_LOGIN)


      
    } catch (error) {
      showToast("error",error.message)
    }finally{
      setLoading(false)
    }

  }

  return (
    <Card>
        <CardContent className="w-[400px]">
           
            <div className="text-center mb-8 mt-4">
                <h1 className='text-3xl font-bold'>Update Password</h1>
                <p>Create new password by filling below form.</p>
            </div>
            <div>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(handlePasswordUpdate)}>
           
            <FieldGroup>

             
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
            <LoadingButton loading={loading} type="submit" text="Update Password" className="w-full mt-5 cursor-pointer"/>
        </div>
          
        </form>
            </div>
        </CardContent>
    </Card>
  )
}

export default UpdatePassword