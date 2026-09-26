import React from 'react'
import CountOverview from './CountOverview'
import QuickAdd from './QuickAdd'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { OrderOverview } from './OrderOverview'

const AdminDashboard = () => {
  return (
    <div className='pt-5'>
      <CountOverview/>
      <QuickAdd/>

      <div className='mt-10 flex lg:flex-nowrap flex-wrap gap-10'>
        <Card className='rounded-lg  lg:w-[70%] w-full p-0'>
          <CardHeader className='py-3 border [.border-b]:pb-3'>
            <div className='flex justify-between items-center'>
              <span className='font-semibold'>Order Overview</span>
              <Button type='button'>
                <Link href="">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
          <OrderOverview />
        </CardContent>
        </Card>
        



        <Card className='rounded-lg  lg:w-[30%] w-full p-0'>
          <CardHeader className='py-3'>
            <div className='flex justify-between items-center'>
              <span className='font-semibold'>Order Summary</span>
              <Button type='button'>
                <Link href="">View All</Link>
              </Button>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
    
  )
}

export default AdminDashboard