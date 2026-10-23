"use client"
import React, { useEffect, useState } from 'react'
import BreadCrumb from '../../../../../../components/Application/Admin/BreadCrumb'
import {ADMIN_DASHBOARD, ADMIN_PRODUCT_VARIANT_ADD } from '../../../../../../routes/AdminPanelRoute'
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
import { sizes } from '../../../../../../lib/utils'




const AddProduct = () => {

    const [loading, setLoading] = useState(false)
    const [productOptions, setproductOptions] = useState([])
    const {data : getProduct} = useFetch("/api/product?deleteType=SD&start=0&size=1000")


//media model states

    const [open, setOpen] = useState(false)
    const [selectedMedia, setSelectedMedia] = useState([])

    useEffect(() => {
        if(getProduct && getProduct.success){
            const data= getProduct.data
            const options = data.map((product) =>({label : product.name, value : product._id}))
            console.log("Product Options:", options)
            setproductOptions(options)
        }

    },[getProduct])
   

     const breadCrumbData = [
          {
            href: ADMIN_DASHBOARD,
            label: "Home"
          },
          {
            href: ADMIN_PRODUCT_VARIANT_ADD,
            label: "Product Variants"
          },
          {
            href: "",
            label: "Add Variants"
          }
        ]

         const formSchema = zSchema.pick({
                  product: true,
                  sku: true,
                  color: true,
                  size: true,
                  mrp: true,
                  sellingPrice: true,
                  discountPercentage: true,
                 
                 
              })
          
          
              const form = useForm({
              resolver: zodResolver(formSchema),
              defaultValues: {
                  product: "",
                  sku: "",
                  color: "",
                  size: "",
                  mrp: 0,
                  sellingPrice: 0,
                  discountPercentage: 0,
              },
            })

        //discount percentage calculation
        useEffect(()=>{
          const mrp = form.getValues("mrp") || 0
          const sellingPrice = form.getValues("sellingPrice") || 0
          

          const discountPercentage = mrp > 0 ? ((mrp - sellingPrice) / mrp) * 100 : 0
          form.setValue("discountPercentage", Math.round(discountPercentage))
        },[form.watch("mrp"), form.watch("sellingPrice")])




        


    const onSubmit = async (values)=> {
        setLoading(true)
        try {

          if(selectedMedia.length <=0){
            showToast("error","Please select media")
          }

          const mediaIds = selectedMedia.map(media =>media._id)
          values.media = mediaIds
            const {data : response} = await axios.post("/api/product-variant/create",values)
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
        <h4 className='text-xl font-semibold'>Add Product Variant</h4>
        
      </CardHeader>
      <CardContent className='pb-5'>
      <form id="form-rhf-demo"  onSubmit={form.handleSubmit(onSubmit)} >
                 
                  <FieldGroup className='grid md:grid-cols-2 grid-cols-1 gap-5'>


                   <Controller
                    name="product"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-demo-title">
                          Product<span className='text-red-500'>*</span>
                        </FieldLabel>


                        <Select
                        options={productOptions}
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
                    name="sku"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-demo-title">
                          SKU<span className='text-red-500'>*</span>
                        </FieldLabel>
                        <Input
                          {...field}
                          type = "text"
                          id="form-rhf-demo-title"
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter sku"
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="color"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-demo-title">
                          Colour
                        </FieldLabel>
                        <Input
                          {...field}
                          type = "text"
                          id="form-rhf-demo-title"
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter Colour"
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name="size"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-demo-title">
                          Size
                        </FieldLabel>
                         <Select
                        options={sizes}
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
                  

                  <div className='mb-3'>
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
                          readOnly
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
                    <LoadingButton loading={loading} type="Edit Mediac" text="Add Product Variant" className=" mt-5 cursor-pointer"/>
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