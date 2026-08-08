import React from 'react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const BreadCrumb = ({breadcrumbData}) => {
  return (
    <Breadcrumb className="mb-5">
  <BreadcrumbList>
    {breadcrumbData.length > 0 && breadcrumbData.map((data,index)=>{
        return (
            index !== breadcrumbData.length-1
            ? 
            <React.Fragment key={index} >
                <BreadcrumbItem >
                    <BreadcrumbLink href={data.href}>{data.label}
                    </BreadcrumbLink>
                    
                </BreadcrumbItem>
                <BreadcrumbSeparator/>
            </React.Fragment>
            :
            <React.Fragment key={index} >
                <BreadcrumbItem>
                    <BreadcrumbLink className="font-semibold" href={data.href}>{data.label}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </React.Fragment>
        )
    })}
  </BreadcrumbList>
</Breadcrumb>
  )
}

export default BreadCrumb