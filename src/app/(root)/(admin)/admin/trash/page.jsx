"use client"

import BreadCrumb from "../../../../../components/Application/Admin/BreadCrumb"
import {Button} from "../../../../../components/ui/button"
import { Card, CardContent, CardHeader } from "../../../../../components/ui/card"
import { ADMIN_CATEGORY_ADD , ADMIN_CATEGORY_EDIT, ADMIN_DASHBOARD, ADMIN_TRASH} from "../../../../../routes/AdminPanelRoute"
import { use, useCallback, useMemo } from "react"
import DeleteAction from "../../../../../components/Application/Admin/DeleteAction"
import DatatableWrapper from "../../../../../components/Application/Admin/DateTableWrapper"
import { columnConfig } from "../../../../../lib/helperFunction"
import { DT_CATEGORY_COLUMNS , DT_COUPON_COLUMNS, DT_CUSTOMERS_COLUMNS, DT_PRODUCT_COLUMNS, DT_PRODUCT_VARIANT_COLUMNS, DT_REVIEW_COLUMNS} from "../../../../../lib/column"
import { useSearchParams } from 'next/navigation'


const breadCrumbData = [
          {
            href: ADMIN_DASHBOARD,
            label: "Home"
          },
          {
            href: ADMIN_TRASH,
            label: "Trash"
          }
        ]

const TRASH_CONFIG = {
  category: {
    title: "Category Trash",
    columns: DT_CATEGORY_COLUMNS,
    fetchUrl: "/api/category",
    exportUrl: "/api/category/export",
    deleteUrl: "/api/category/delete",
  },

  product: {
    title: "Product Trash",
    columns: DT_PRODUCT_COLUMNS,
    fetchUrl: "/api/product",
    exportUrl: "/api/product/export",
    deleteUrl: "/api/product/delete",
  },

  "product-variant": {
    title: "Product Variant Trash",
    columns: DT_PRODUCT_VARIANT_COLUMNS,
    fetchUrl: "/api/product-variant",
    exportUrl: "/api/product-variant/export",
    deleteUrl: "/api/product-variant/delete",
  },

   "coupon": {
    title: "Coupon Trash",
    columns: DT_COUPON_COLUMNS,
    fetchUrl: "/api/coupon",
    exportUrl: "/api/coupon/export",
    deleteUrl: "/api/coupon/delete",
  },

  "customers": {
    title: "Customers Trash",
    columns: DT_CUSTOMERS_COLUMNS,
    fetchUrl: "/api/customers",
    exportUrl: "/api/customers/export",
    deleteUrl: "/api/customers/delete",
  },
  "review": {
    title: "Review Trash",
    columns: DT_REVIEW_COLUMNS,
    fetchUrl: "/api/review",
    exportUrl: "/api/review/export",
    deleteUrl: "/api/review/delete",
  }

}

const Trash = () => {

  const searchParams = useSearchParams()
  const trashOf = searchParams.get('trashof')

  const config = TRASH_CONFIG[trashOf] || {}


  const columns = useMemo(()=> {
    return columnConfig(config.columns, false, false, true)
  }, [])

  const action = useCallback((row, deleteType, handleDelete)=>{
    let actionMenu = []
    return [<DeleteAction key="delete" handleDelete={handleDelete} row={row} deleteType={deleteType}/>]

  },[])

  return (
    <div>
      <BreadCrumb breadcrumbData={breadCrumbData}/>

        <Card className=' py-0 rounded shadow-sm gap-0'>
      <CardHeader className='pt-3 px-3 border-b [.border-b]:pb-2'>
        <div className="flex justify-between items-center">
          <h4 className='text-xl font-semibold'>{config.title}</h4>
       
        </div>
      </CardHeader>
      <CardContent className='px-0'>
        <DatatableWrapper
          queryKey={`${trashOf}-data-deleted`}
          fetchUrl={config.fetchUrl}
          initialPageSize={10}
          columnsConfig={columns}
          exportEndpoint={config.exportUrl}
          deleteEndpoint={config.deleteUrl}
          deleteType="PD"
          createAction = {action}
        />
      

      </CardContent>
    </Card>
    </div>
  )
}

export default Trash