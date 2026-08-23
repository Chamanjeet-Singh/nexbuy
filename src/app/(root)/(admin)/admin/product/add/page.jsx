"use client"
import React, { useEffect, useState } from 'react'
import BreadCrumb from '../../../../../../components/Application/Admin/BreadCrumb'
import {ADMIN_DASHBOARD, ADMIN_PRODUCT_ADD, ADMIN_PRODUCT_EDIT, ADMIN_PRODUCT_SHOW } from '../../../../../../routes/AdminPanelRoute'
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




const AddProduct = () => {

    const [loading, setLoading] = useState(false)
    const [CategoryOptions, setCategoryOptions] = useState([])
    const {data : getCategory} = useFetch("/api/category?deleteType=SD&start=0&size=1000")


//media model states

    const [open, setOpen] = useState(false)
    const [selectedMedia, setSelectedMedia] = useState([])

    useEffect(() => {
        if(getCategory && getCategory.success){
            const data= getCategory.data
            const options = data.map((cat) =>({label : cat.name, value : cat._id}))
            console.log("Category Options:", options)
            setCategoryOptions(options)
        }

    },[getCategory])
   

     const breadCrumbData = [
          {
            href: ADMIN_DASHBOARD,
            label: "Home"
          },
          {
            href: ADMIN_PRODUCT_ADD,
            label: "Product"
          },
          {
            href: "",
            label: "Add Product"
          }
        ]

         const formSchema = zSchema.pick({
                  name: true,
                  slug: true,
                  mrp: true,
                  sellingPrice: true,
                  discountPercentage: true,
                  media: true,
                  description: true,
                 
              })
          
          
              const form = useForm({
              resolver: zodResolver(formSchema),
              defaultValues: {
                  name: "",
                  slug: "",
                  mrp: "",
                  sellingPrice: "",
                  discountPercentage: "",
                  media: "",
                  description: "",
              },
            })


            useEffect(()=>{
                const name = form.getValues("name")
                if(name){
                    form.setValue("slug", slugify(name).toLowerCase())
                }

            },
        [form.watch("name")])




    const editor = (event, editor) => {
        const data = editor.getData()
        form.setValue("description" , data)
       
    }
        


    const onSubmit = async (values)=> {
        setLoading(true)
        try {
            const {data : response} = await axios.post("/api/product/create",values)
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
        <h4 className='text-xl font-semibold'>Add Product</h4>
        
      </CardHeader>
      <CardContent className='pb-5'>
      <form id="form-rhf-demo"  onSubmit={form.handleSubmit(onSubmit)} >
                 
                  <FieldGroup className='grid md:grid-cols-2 gap-5'>
                 
                  <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-demo-title">
                          Name<span className='text-red-500'>*</span>
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


                  <Controller
                    name="category"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-demo-title">
                          Category<span className='text-red-500'>*</span>
                        </FieldLabel>


                        <Select
                        options={CategoryOptions}
                        selected={field.value}
                        setSelected={field.onChange}
                        isMulti={false}
                        
                        />


                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="mrp"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-demo-title">
                          MRP<span className='text-red-500'>*</span>
                        </FieldLabel>
                        <Input
                          {...field}
                          type = "number"
                          id="form-rhf-demo-title"
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter MRP"
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />


                  <Controller
                    name="sellingPrice"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-demo-title">
                          Selling Price<span className='text-red-500'>*</span>
                        </FieldLabel>
                        <Input
                          {...field}
                          type = "number"
                          id="form-rhf-demo-title"
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter Selling Price"
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

                    
                        
                   
                    
                <div className='mb-5 md:col-span-2'>
                   <Controller
                    name="description"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-demo-title">
                          Description<span className='text-red-500'>*</span>
                        </FieldLabel>
                        <Editor onChange={editor} initialData={field.value}/>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  /> 
                </div>
                  
      
                </FieldGroup>


                <div className='md:col-span-2 border border-dashed rounded p-5 text-center' >
                    <MediaModal
                    open = {open}
                    setOpen = {setOpen}
                    selectedMedia={selectedMedia}
                    setSelectedMedia={setSelectedMedia}
                    isMultiple={true}
                    />
                   
                    {selectedMedia.length>0 && 
                   <div className='flex justify-center items-center flex-wrap mb-3 gap-2'>
                    { console.log("selectedMedia", selectedMedia)}
                      {selectedMedia.map(media => {
                        return <div key={media._id} className='h-24 w-24 border '>
                          <Image 
                          src={media.url} 
                          height={100}
                          width={100}
                          alt=""
                          className='size-full object-cover'
                          />
                          </div>
                      })}
                      </div>
                      }

                    <div onClick={()=> setOpen(true)} className="bg-gray-50 dark:bg-card border w-[200px mx-auto p-5 cursor-pointer">
                        <span className='font-semibold'>Select Media</span>
                    </div>
                </div>

                 <div className='mb-3 mt-5'>
                    <LoadingButton loading={loading} type="Edit Mediac" text="Add Product" className=" mt-5 cursor-pointer"/>
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

export default AddProduct