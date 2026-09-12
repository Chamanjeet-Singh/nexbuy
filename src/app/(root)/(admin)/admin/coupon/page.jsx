"use client"

import BreadCrumb from "../../../../../components/Application/Admin/BreadCrumb"
import {Button} from "../../../../../components/ui/button"
import { Card, CardContent, CardHeader } from "../../../../../components/ui/card"
import { ADMIN_DASHBOARD, ADMIN_PRODUCT_ADD, ADMIN_TRASH , ADMIN_COUPON_SHOW, ADMIN_COUPON_EDIT, ADMIN_COUPON_ADD} from "../../../../../routes/AdminPanelRoute"
import {FiPlus} from "react-icons/fi"
import Link from "next/link" 
import { useCallback, useMemo } from "react"
import EditAction from "../../../../../components/Application/Admin/EditAction"
import DeleteAction from "../../../../../components/Application/Admin/DeleteAction"
import DatatableWrapper from "../../../../../components/Application/Admin/DateTableWrapper"
import { columnConfig } from "../../../../../lib/helperFunction"
import { DT_COUPON_COLUMNS } from "../../../../../lib/column"

const breadCrumbData = [
          {
            href: ADMIN_DASHBOARD,
            label: "Home"
          },
          {
            href: ADMIN_COUPON_SHOW,
            label: "Coupon"
          }
        ]

const ShowCoupon = () => {


  const columns = useMemo(()=> {
    return columnConfig(DT_COUPON_COLUMNS)
  }, [])

  const action = useCallback((row, deleteType, handleDelete)=>{
    let actionMenu = []
    actionMenu.push(<EditAction key="edit" href={ADMIN_COUPON_EDIT(row.original._id)}/>)
    actionMenu.push(<DeleteAction key="delete" handleDelete={handleDelete} row={row} deleteType={deleteType}/>)

    return actionMenu
  },[])

  return (
    <div>
      <BreadCrumb breadcrumbData={breadCrumbData}/>

        <Card className=' py-0 rounded shadow-sm gap-0'>
      <CardHeader className='pt-3 px-3 border-b [.border-b]:pb-2'>
        <div className="flex justify-between items-center">
          <h4 className='text-xl font-semibold'>Show Coupon</h4>
        <Button >
          <FiPlus/>
          <Link href={ADMIN_COUPON_ADD}>New Coupon</Link>
        </Button>
        </div>
      </CardHeader>
      <CardContent className='px-0'>
        <DatatableWrapper
          queryKey="coupon-data"
          fetchUrl="/api/coupon"
          initialPageSize={10}
          columnsConfig={columns}
          exportEndpoint="/api/coupon/export"
          deleteEndpoint="/api/coupon/delete"
          deleteType="SD"
          trashView = {`${ADMIN_TRASH}?trashof=coupon`}
          createAction = {action}
        />
      

      </CardContent>
    </Card>
    </div>
  )
}

export default ShowCoupon