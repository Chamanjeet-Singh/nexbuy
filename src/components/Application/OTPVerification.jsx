import React, { useState } from 'react'
import { zSchema } from '../../lib/zodSchema'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import LoadingButton from './LoadingButton'
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { showToast } from '../../lib/showToast'
import axios from 'axios'


const OTPVerification = ({email,onSubmit,loading}) => {

  const [isResendingOtp, setIsResendingOtp] = useState()

        //CREATE form schema
    const formSchema = zSchema.pick({
        otp: true, email: true
    })

    //Initialize the form

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            otp: "",
            email: email
        }
    })

    const handleOtpVerification = async (values) => {
      
         console.log("SUBMITTED:", values)
         onSubmit(values)
      

    }

    const resentOTP = async () => {
      try {
      setIsResendingOtp(true)
      const {data: resendOtpResponse} = await axios.post("/api/auth/resend-otp",{email})

      if(!resendOtpResponse.success)
        throw new Error(resendOtpResponse.message)

      
      showToast("success",resendOtpResponse.message)
      
    } catch (error) {
      showToast("error",error.message)
    }finally{
      setIsResendingOtp(false)
    }

    }
  return (
    <div>
         <form id="form-rhf-demo" onSubmit={form.handleSubmit(handleOtpVerification)}>
           <div className='text-center'>
                <h1 className='text-2xl font-bold md-2 '>Please complete Verification</h1>
                <p className='text-md'>We have sent an One-time Password(OTP) to your registered email address. The otp is valid for 10 minutes only</p>
           </div>
           
            <FieldGroup>
           
            <Controller
              name="otp"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    <div className='md-100 flex justify-center'><b>One-time Password (OTP)</b></div>
                  </FieldLabel>
                  
                  <InputOTP maxLength={6} id="otp-verification" value={field.value || ""} onChange = { (value) => field.onChange(value)} required>
                        <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator className="mx-2" />
                        <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                        </InputOTPGroup>
                  </InputOTP>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            
            
              
          </FieldGroup>
          
        
        <div className='mb-3'>
            <LoadingButton loading={loading} type="submit" text="Verify" className="w-full mt-5 cursor-pointer"/>
        </div>
        <div className='text-center mt-5'>
          {isResendingOtp ? 
    <span>Resending....</span>
    :
    <button type='button' className='text-blue-500 cursor-pointer hover:underline' onClick={() => resentOTP()}>Resend OTP</button>
}
        </div>

       
        
          
        </form>
    </div>
  )
}

export default OTPVerification