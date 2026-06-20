import React from 'react'
import { SidebarProvider} from "@/components/ui/sidebar"
import AppSidebar from '../../../../components/Application/Admin/AppSidebar'

const layout = ({children}) => {
  return (
    <SidebarProvider>
        <AppSidebar>
    <main>{children}</main>
        </AppSidebar>
    </SidebarProvider>
  )
}

export default layout