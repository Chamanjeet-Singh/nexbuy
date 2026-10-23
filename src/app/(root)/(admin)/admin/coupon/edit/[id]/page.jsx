"use client"
import React, { use, useEffect, useState } from 'react'
import BreadCrumb from '../../../../../../../components/Application/Admin/BreadCrumb'
import {ADMIN_COUPON_ADD, ADMIN_COUPON_SHOW, ADMIN_DASHBOARD, ADMIN_PRODUCT_ADD, ADMIN_PRODUCT_EDIT, ADMIN_PRODUCT_SHOW } from '../../../../../../../routes/AdminPanelRoute'
import { Card, CardContent, CardHeader } from '../../../../../../../components/ui/card'
import { Field, FieldError, FieldGroup, FieldLabel } from '../../../../../../../components/ui/field'
import Image from 'next/image'
import LoadingButton from '../../../../../../../components/Application/LoadingButton'
import { useForm, Controller } from "react-hook-form"
import { zSchema } from '../../../../../../../lib/zodSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from "@/components/ui/input"
import slugify from "slugify";
import { showToast } from '../../../../../../../lib/showToast'
import axios from "axios";
import dayjs from "dayjs";
import useFetch from "@/hooks/useFetch"






const EditCoupon = ({params}) => {

    const {id} = use(params)
    const [loading, setLoading] = useState(false)
    const {data : getCouponData} = useFetch(`/api/coupon/get/${id}`)

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
            href: "",
            label: "Edit Coupon"
          }
        ]

         const formSchema = zSchema.pick({
                 _id: true,
                 code: true,
                  discountPercentage: true,
                  minShoppingAmount: true,
                  validity: true,
                 
                 
              })
          
          
              const form = useForm({
              resolver: zodResolver(formSchema),
              defaultValues: {
                  _id: id,
                  code: "",
                  discountPercentage: "",
                  minShoppingAmount: "",
                  validity: 0,
              }
          })  
              
       useEffect(() => {
        if(getCouponData && getCouponData.success){
          const coupon = getCouponData.data
          form.reset({
            _id: coupon._id,
            code: coupon.code,
            discountPercentage: coupon.discountPercentage,
            minShoppingAmount:coupon.minShoppingAmount,
            validity:dayjs(coupon.validity).format("YYYY-MM-DD")
          })
        }
          

       }, 
       [getCouponData])




        


    const onSubmit = async (values)=> {
        setLoading(true)
        try {

         

            const {data : response} = await axios.put("/api/coupon/update",values)
            if(!response.success){
                throw new Error(response.message)
            }

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
        <h4 className='text-xl font-semibold'>Edit Coupon</h4>
        
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
                    <LoadingButton loading={loading} type="Edit Mediac" text="Save Changes" className=" mt-5 cursor-pointer"/>
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

export default EditCoupon