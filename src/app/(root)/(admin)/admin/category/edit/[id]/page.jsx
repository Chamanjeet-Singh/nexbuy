"use client"
import React, { useEffect, useState, use } from 'react'
import BreadCrumb from '../../../../../../../components/Application/Admin/BreadCrumb'
import {ADMIN_DASHBOARD, ADMIN_CATEGORY_ADD, ADMIN_CATEGORY_EDIT } from '../../../../../../../routes/AdminPanelRoute'
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
import useFetch from "@/hooks/useFetch"



const EditCategory = ({params}) => {

  const {id} = use(params)
  const {data : categoryData} = useFetch(`/api/category/get/${id}`)

    const [loading, setLoading] = useState(false)

     const breadCrumbData = [
          {
            href: ADMIN_DASHBOARD,
            label: "Home"
          },
          {
            href: ADMIN_CATEGORY_ADD,
            label: "Category"
          },
          {
            href: "",
            label: "Edit Category"
          }
        ]

         const formSchema = zSchema.pick({
                  _id: true,
                  name: true,
                  slug: true,
                 
              })
          
          
              const form = useForm({
              resolver: zodResolver(formSchema),
              defaultValues: {
                _id: id,
                name: "",
                slug: "",
              },
            })


            useEffect(()=>{
              if(categoryData && categoryData.success){
                const data = categoryData.data
                console.log("categoryData", data)
                form.reset({
                  _id: data?._id,
                  name: data?.name,
                  slud: data?.slug
                })
              }
            },
          [categoryData])


            useEffect(()=>{
                const name = form.getValues("name")
                if(name){
                    form.setValue("slug", slugify(name).toLowerCase())
                }

            },
        [form.watch("name")])
        


    const onSubmit = async (values)=> {
        setLoading(true)
        try {
            const {data : response} = await axios.put(`/api/category/update/`,values)
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
        <h4 className='text-xl font-semibold'>Edit Category</h4>
        
      </CardHeader>
      <CardContent className='pb-5'>
      <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                 
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
                          placeholder="Enter name of Category"
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />


                  <Controller
                    name="slug"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-demo-title">
                          Slug
                        </FieldLabel>
                        <Input
                          {...field}
                          type = "text"
                          id="form-rhf-demo-title"
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter Slug"
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
                    <LoadingButton loading={loading} type="Submit" text="Update Category" className=" mt-5 cursor-pointer"/>
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

export default EditCategory