"use client"
import React, { useEffect, useState } from 'react'
import BreadCrumb from '../../../../../../components/Application/Admin/BreadCrumb'
import {ADMIN_COUPON_ADD, ADMIN_COUPON_SHOW, ADMIN_DASHBOARD, ADMIN_PRODUCT_ADD, ADMIN_PRODUCT_EDIT, ADMIN_PRODUCT_SHOW } from '../../../../../../routes/AdminPanelRoute'
import { Card, CardContent, CardHeader } from '../../../../../../components/ui/card'
import { Field, FieldError, FieldGroup, FieldLabel } from '../../../../../../components/ui/field'
import Image from 'next/image'
import LoadingButton from '../../../../../../components/Application/LoadingButton'
import { useForm, Controller } from "react-hook-form"
import { zSchema } from '../../../../../../lib/zodSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from "@/components/ui/input"
import slugify from "slugify";
import { showToast } from '../../../../../../lib/showToast'
import axios from "axios";
import useFetch from "@/hooks/useFetch"
import  Select from '../../../../../../components/Application/Select'
import  Editor  from "../../../../../../components/Application/Admin/Editor"
import MediaModal from '../../../../../../components/Application/Admin/MediaModal'




const AddCoupon = () => {

    const [loading, setLoading] = useState(false)


     const breadCrumbData = [
          {
            href: ADMIN_DASHBOARD,
            label: "Home"
          },
          {
            href: ADMIN_COUPON_SHOW,
            label: "Coupons"
          },
          {
            href: ADMIN_COUPON_ADD,
            label: "Add Coupon"
          }
        ]

         const formSchema = zSchema.pick({
                 code: true,
                  discountPercentage: true,
                  minShoppingAmount: true,
                  validity: true,
                 
                 
              })
          
          
              const form = useForm({
              resolver: zodResolver(formSchema),
              defaultValues: {
                  code: "",
                  discountPercentage: "",
                  minShoppingAmount: "",
                  validity: 0,
              }
          })
              
       




        


    const onSubmit = async (values)=> {
        setLoading(true)
        try {

         

            const {data : response} = await axios.post("/api/coupon/create",values)
            if(!response.success){
                throw new Error(response.message)
            }

            form.reset()
            showToast("success",response.message)
            
        } catch (error) {
            showToast("error", error.message)
            
        }finally{
            setLoading(false)
        }

    }

  return (
    <div>
        <BreadCrumb breadcrumbData={breadCrumbData}/>

        <Card className=' py-0 rounded shadow-sm'>
      <CardHeader className='pt-3 px-3 border-b [.border-b]:pb-2'>
        <h4 className='text-xl font-semibold'>Add Coupon</h4>
        
      </CardHeader>
      <CardContent className='pb-5'>
      <form id="form-rhf-demo"  onSubmit={form.handleSubmit(onSubmit)} >
                 
                  <FieldGroup className='grid md:grid-cols-2 grid-cols-1 gap-5'>
                 
                  <Controller
                    name="code"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-demo-title">
                          Code<span className='text-red-500'>*</span>
                        </FieldLabel>
                        <Input
                          {...field}
                          type = "text"
                          id="form-rhf-demo-title"
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter Coupon Code"
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  
                  <Controller
                    name="discountPercentage"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-demo-title">
                          Discount Percentage<span className='text-red-500'>*</span>
                        </FieldLabel>
                        <Input
                          {...field}
                          type = "number"
                         
                          id="form-rhf-demo-title"
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter Discount Percentage"
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="minShoppingAmount"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-demo-title">
                          Minimum Shopping Amount<span className='text-red-500'>*</span>
                        </FieldLabel>
                        <Input
                          {...field}
                          type = "number"
                          id="form-rhf-demo-title"
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter Minimum Shopping Amount"
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />


                  <Controller
                    name="validity"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-demo-title">
                          Validity<span className='text-red-500'>*</span>
                        </FieldLabel>
                        <Input
                          {...field}
                          type = "date"
                          
                          id="form-rhf-demo-title"
                          aria-invalid={fieldState.invalid}
                         
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                    
                        
            
      
                </FieldGroup>


              

                 <div className='mb-3 mt-5'>
                    <LoadingButton loading={loading} type="Edit Mediac" text="Add Coupon" className=" mt-5 cursor-pointer"/>
                  </div>
              
              {/* <div className='mb-3'>
                  <LoadingButton loading={loading} type="submit" text="Login" className="w-full mt-5 cursor-pointer"/>
              </div> */}
      
              
                
              </form>

      </CardContent>
    </Card>

    </div>
    
  )
}

export default AddCoupon