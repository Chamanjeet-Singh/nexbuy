"use client"

import React, { useEffect, useState } from 'react'
import BreadCrumb from '../../../../../components/Application/Admin/BreadCrumb'
import { ADMIN_DASHBOARD, ADMIN_MEDIA_SHOW } from '../../../../../routes/AdminPanelRoute'
import UploadMedia from '../../../../../components/Application/Admin/UploadMedia'
import {Card, CardContent, CardHeader} from "../../../../../../src/components/ui/card"
import {Button} from "../../../../../../src/components/ui/button"
import ButtonLoading from '../../../../../components/Application/LoadingButton'
import axios from 'axios'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import Media from '../../../../../components/Application/Admin/Media'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Checkbox } from '../../../../../components/ui/checkbox'
import { Label } from '../../../../../components/ui/label'
import useDeleteMutation from '../../../../../hooks/useDeleteMutation'

const MediaPage = () => {

  const [deleteType, setDeleteType] = useState("SD")
  const [selectedMedia, setSelectedMedia] = useState([])
  const [selectAll,setSelectAll] = useState(false)

  const queryClient = useQueryClient()

  const searchParams = useSearchParams()

  useEffect(()=>{
    if(searchParams){
      const trashOf = searchParams.get("trashof")
      setSelectedMedia([])
      if(trashOf){
        setDeleteType('PD')
      }else{
        setDeleteType('SD')
      }
    }
  },[searchParams])

  const fetchMedia = async (page, deleteType) => {
    const {data: response} = await axios.get(`/api/media?page=${page}&limit="10"&deleteType=${deleteType}`)
    return response;
  }


  const {
    data,
    error,   
    status,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['media-data', deleteType],
    queryFn: async({pageParams}) => await fetchMedia(pageParams, deleteType),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasMore? pages.length : undefined
    },
  })

    const breadcrumbData = [
        {href: ADMIN_DASHBOARD, label: "Home"},
        {href: "", label: "Media"},
    ]


    const deleteMutation = useDeleteMutation("media-data", "/api/media/delete")


    const handleDelete = (ids, deleteType) => {
      let c = true
      if(deleteType === "PD"){
        c = confirm("Are you sure you want to delete the data permanently?")
      }

      if(c){
        deleteMutation.mutate({ids,deleteType})
      }
      setSelectAll(false)
      setSelectedMedia([])
    }

    const handleSelectAll = () => {
      setSelectAll(!selectAll)

    }

    useEffect(()=>{
      if(selectAll){
        const ids = data.pages.flatMap(page => page.mediaData.map(media => media._id))
        setSelectedMedia(ids)
      }else{
        setSelectedMedia([])
      }
    },[selectAll])

  return (
    <div>
    <BreadCrumb breadcrumbData={breadcrumbData}/>
    <Card className=' py-0 rounded shadow-sm'>
      <CardHeader className='pt-3 px-3 border-b [.border-b]:pb-2'>
        <div className='flex justify-between items-center'>
          <h4 className='font-semibold text-xl uppercase'>

            {deleteType === "SD" ? "Media" : "Media Trash"}
          </h4>
          <div className='flex items-center gap-5'>
            {deleteType === "SD" ? <UploadMedia isMultiple={true} queryClient={queryClient} />: ""}
            <div className='flex gap-3'>
              {deleteType === "SD" ? 
              <Button type='button' variant="destructive">
                <Link href={`${ADMIN_MEDIA_SHOW}?trashof=media`}>
                Trash 
                </Link>
              </Button>
            :
            <Button type='button' >
                <Link href={`${ADMIN_MEDIA_SHOW}`}>
                Back To Media 
                </Link>
              </Button>
              }

            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className='pb-5'>

      {selectedMedia.length>0 &&
      <div className='py-2 px-3 bg-voilet-200 mb-2 rounded flex justify-between items-center'>
        <Label>
          <Checkbox 
          checked={selectAll}
          onCheckedChange={handleSelectAll}
          />
          Select All
        </Label>
        <div className='flex gap-2'>
        {deleteType === "SD" ?
          <Button className='cursor-pointer'  type='button' variant='destructive' onClick={() => handleDelete(selectedMedia, deleteType)} >
            Move to Trash
          </Button>
          :
          <>
          <Button className='bg-green-500 hover:bg-green-600' type='button' onClick={() => handleDelete(selectedMedia, "RSD")}>
            Restore
          </Button>
          <Button type='button' variant='destructive' onClick={() => handleDelete(selectedMedia, deleteType)}>
            Delete Permanently
          </Button>

          </>         
        }
        </div>
      </div>
    }







      {status === "pending" ? 
          <div>Loading...</div>
        :
          status  === "error" ? 
          <div className='text-red-500 text-sm'>
            {error.message}
          </div>
          :

          <>
          
          <div className='grid lg:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-2 mb-5'>
            {
              data?.pages?.map((page,index)=> (
                <React.Fragment key={index}>
                  {
                    page?.mediaData?.map((media)=>(
                      <Media key={media._id}
                      media={media}
                      handleDelete = {handleDelete}
                      deleteType={deleteType}
                      selectedMedia={selectedMedia}
                      setSelectedMedia={setSelectedMedia}
                      />
                    ))
                  }
                </React.Fragment>
              ))
            }
          </div>
          </>
          
      }

      {hasNextPage &&
      <ButtonLoading className="bg-primary/90 cursor-pointer" type="button" loading={isFetching} onClick={()=>fetchNextPage()} text="Load More"/> }


      </CardContent>
    </Card>


    </div>
  )
}

export default MediaPage