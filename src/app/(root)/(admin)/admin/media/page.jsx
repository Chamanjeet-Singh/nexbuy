import React from 'react'
import BreadCrumb from '../../../../../components/Application/Admin/BreadCrumb'
import { ADMIN_DASHBOARD } from '../../../../../routes/AdminPanelRoute'

const MediaPage = () => {

    const breadcrumbData = [
        {href: ADMIN_DASHBOARD, label: "Home"},
        {href: "", label: "Media"},
    ]


  return (
    <BreadCrumb breadcrumbData={breadcrumbData}/>
  )
}

export default MediaPage