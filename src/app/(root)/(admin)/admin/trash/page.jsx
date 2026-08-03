"use client"

import BreadCrumb from "../../../../../components/Application/Admin/BreadCrumb"
import {Button} from "../../../../../components/ui/button"
import { Card, CardContent, CardHeader } from "../../../../../components/ui/card"
import { ADMIN_CATEGORY_ADD , ADMIN_CATEGORY_EDIT, ADMIN_DASHBOARD, ADMIN_TRASH} from "../../../../../routes/AdminPanelRoute"
import {FiPlus} from "react-icons/fi"
import Link from "next/link" 
import { use, useCallback, useMemo } from "react"
import EditAction from "../../../../../components/Application/Admin/EditAction"
import DeleteAction from "../../../../../components/Application/Admin/DeleteAction"
import DatatableWrapper from "../../../../../components/Application/Admin/DateTableWrapper"
import { columnConfig } from "../../../../../lib/helperFunction"
import { DT_CATEGORY_COLUMNS } from "../../../../../lib/column"
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