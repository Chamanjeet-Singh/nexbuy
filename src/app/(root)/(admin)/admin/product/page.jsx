"use client"

import BreadCrumb from "../../../../../components/Application/Admin/BreadCrumb"
import {Button} from "../../../../../components/ui/button"
import { Card, CardContent, CardHeader } from "../../../../../components/ui/card"
import { ADMIN_DASHBOARD, ADMIN_PRODUCT_ADD, ADMIN_PRODUCT_SHOW, ADMIN_TRASH , ADMIN_PRODUCT_EDIT} from "../../../../../routes/AdminPanelRoute"
import {FiPlus} from "react-icons/fi"
import Link from "next/link" 
import { useCallback, useMemo } from "react"
import EditAction from "../../../../../components/Application/Admin/EditAction"
import DeleteAction from "../../../../../components/Application/Admin/DeleteAction"
import DatatableWrapper from "../../../../../components/Application/Admin/DateTableWrapper"
import { columnConfig } from "../../../../../lib/helperFunction"
import { DT_PRODUCT_COLUMNS } from "../../../../../lib/column"

const breadCrumbData = [
          {
            href: ADMIN_DASHBOARD,
            label: "Home"
          },
          {
            href: ADMIN_PRODUCT_SHOW,
            label: "Product"
          }
        ]

const ShowProduct = () => {


  const columns = useMemo(()=> {
    return columnConfig(DT_PRODUCT_COLUMNS)
  }, [])

  const action = useCallback((row, deleteType, handleDelete)=>{
    let actionMenu = []
    actionMenu.push(<EditAction key="edit" href={ADMIN_PRODUCT_EDIT(row.original._id)}/>)
    actionMenu.push(<DeleteAction key="delete" handleDelete={handleDelete} row={row} deleteType={deleteType}/>)

    return actionMenu
  },[])

  return (
    <div>
      <BreadCrumb breadcrumbData={breadCrumbData}/>

        <Card className=' py-0 rounded shadow-sm gap-0'>
      <CardHeader className='pt-3 px-3 border-b [.border-b]:pb-2'>
        <div className="flex justify-between items-center">
          <h4 className='text-xl font-semibold'>Show Product</h4>
        <Button >
          <FiPlus/>
          <Link href={ADMIN_PRODUCT_ADD}>New Product</Link>
        </Button>
        </div>
      </CardHeader>
      <CardContent className='px-0'>
        <DatatableWrapper
          queryKey="product-data"
          fetchUrl="/api/product"
          initialPageSize={10}
          columnsConfig={columns}
          exportEndpoint="/api/product/export"
          deleteEndpoint="/api/product/delete"
          deleteType="SD"
          trashView = {`${ADMIN_TRASH}?trashof=product`}
          createAction = {action}
        />
      

      </CardContent>
    </Card>
    </div>
  )
}

export default ShowProduct