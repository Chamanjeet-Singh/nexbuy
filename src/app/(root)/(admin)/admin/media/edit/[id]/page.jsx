"use client"
import React , {use, useEffect, useState} from 'react'
import useFetch from '../../../../../../../hooks/useFetch'
import BreadCrumb from '../../../../../../../components/Application/Admin/BreadCrumb'
import LoadingButton from '../../../../../../../components/Application/LoadingButton'

import { ADMIN_DASHBOARD, ADMIN_MEDIA_SHOW } from '../../../../../../../routes/AdminPanelRoute'
import {Card, CardHeader, CardContent} from "../../../../../../../components/ui/card"
import { zSchema } from '../../../../../../../lib/zodSchema'
import {z} from "zod"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import imgPlaceholder from "../../../../../../../../public/assets/images/img-placeholder.webp"
import axios from 'axios'

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../../../../../../../components/ui/field"
import Image from 'next/image'
import { showToast } from '../../../../../../../lib/showToast'
const breadCrumbData = [
  {
    href: ADMIN_DASHBOARD,
    label: "Home"
  },
  {
    href: ADMIN_MEDIA_SHOW,
    label: "Media"
  },
  {
    href: "",
    label: "Edit Media"
  }
]

const EditMedia = ({params}) => {

  const {id} = use(params)
  const{ data: mediaData} = useFetch(`/api/media/get/${id}`)
  const [loading, setLoading] = useState(false)



   const formSchema = zSchema.pick({
          _id: true,
          alt: true,
          title: true,
      })
  
  
      const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        _id: "",
          alt: "",
          title: "",
      },
    })

    useEffect(()=>{

      if(mediaData && mediaData.success){
        const data = mediaData.data;
        form.reset({
          _id: data._id,
          alt:data._alt,
          title:data.title
        })
      }
    },[mediaData])
  
    const onSubmit = async (values) => {
      try {
        setLoading(true)
        const {data: response} = await axios.put("/api/media/update",values)
  
        if(!response.success)
          throw new Error(response.message)
  
        
        showToast("success",response.message)
        
      } catch (error) {
        showToast("error",error.message)
      }finally{
        setLoading(false)
      }
    }
  

  return (
    <div>
      <BreadCrumb breadcrumbData={breadCrumbData}/>

    <Card className=' py-0 rounded shadow-sm'>
      <CardHeader className='pt-3 px-3 border-b [.border-b]:pb-2'>
        <h4 className='text-xl font-semibold'>Edit Media</h4>
        
      </CardHeader>
      <CardContent className='pb-5'>
      <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                 
                  <FieldGroup>

                    <div className="mb-5">
                      <Image
                      width={150}
                      height={150}
                      src={mediaData?.data?.secure_url || imgPlaceholder}
                      alt={mediaData?.alt || "Image not found"}
                      />
                    </div>
                 
                  <Controller
                    name="alt"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-demo-title">
                          Alt
                        </FieldLabel>
                        <Input
                          {...field}
                          type = "text"
                          id="form-rhf-demo-title"
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter alt"
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />


                  <Controller
                    name="title"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-demo-title">
                          Title
                        </FieldLabel>
                        <Input
                          {...field}
                          type = "text"
                          id="form-rhf-demo-title"
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter Title"
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
                    <LoadingButton loading={loading} type="Edit Mediac" text="Update" className=" mt-5 cursor-pointer"/>
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

export default EditMedia