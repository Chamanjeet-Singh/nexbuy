import React from 'react'
import { Checkbox } from '../../../../src/components/ui/checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../../../src/components/ui/dropdown-menu'
import Image from 'next/image'
import { BsThreeDotsVertical } from "react-icons/bs";
import Link from 'next/link'
import { ADMIN_MEDIA_EDIT, ADMIN_MEDIA_SHOW } from '../../../routes/AdminPanelRoute';
import { MdOutlineEdit } from "react-icons/md";
import { IoIosLink } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
import { showToast } from '../../../lib/showToast';
import { success } from 'zod';




const Media = ({media, handleDelete, deleteType, selectedMedia, setSelectedMedia}) => {
    const handleCheck = () => {
        let newSelctedMedia = []
        if(selectedMedia.includes(media._id)){
            newSelctedMedia = selectedMedia.filter(m=> m!=media._id)
        }else {
            newSelctedMedia = [...selectedMedia, media._id]
        }
        setSelectedMedia(newSelctedMedia)

    }

    const handleCopyLink = async (url) => {
        await navigator.clipboard.writeText(url)
        showToast("success" , "Link Copied")

    }
  return (
    <div className='border border-gray-200 dark:border-gray-800 relative group rounded overflow-hidden'>
        <div className="absolute top-2 left-2 z-20" >
            <Checkbox
                checked={selectedMedia.includes(media._id)}
                onCheckedChange = {handleCheck}
                className="border-primary cursor-pointer"
                
            />
        </div>

        <div className='absolute top-2 right-2 z-20'>
        <DropdownMenu>    
              <DropdownMenuTrigger>
                <span className='h-7 w-7 flex items-center justify-center rounded-full bg-black/50 cursor-pointer'>
                    <BsThreeDotsVertical color='#fff' />
                </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='start'>
                   {deleteType === "SD" &&
                     <>
                     <DropdownMenuItem asChild className='cursor-pointer'>
                        <Link href={ADMIN_MEDIA_EDIT(media._id)}>
                        <MdOutlineEdit />
                        Edit
                        </Link>
                     </DropdownMenuItem>
                      <DropdownMenuItem className='cursor-pointer' onClick={()=>(handleCopyLink(media.secure_url))}>
                        <IoIosLink />
                        Copy Link
                      
                     </DropdownMenuItem>
                     
                     
                     </>
                   }

                   <DropdownMenuItem asChild onClick={() => handleDelete([media._id], deleteType)}>
                        <Link href={ADMIN_MEDIA_EDIT(media._id)}>
                        <FaTrash color='red'/>
                        {deleteType === "SD" ? "Move into Trash" : "Delete Permanently"}
                        
                        </Link>
                     </DropdownMenuItem>
                     
            </DropdownMenuContent>
        </DropdownMenu>
        </div>

        <div className='w-full h-full absolute z-10 transition-all duration-150 ease-in group-hover:bg-black/30'></div>

        <div>
            <Image
            src={media?.secure_url}
            alt={media?.alt || "Image"}
            height={300}
            width={300}
            className='object-cover w-full sm:h-[200px] h-[150px]'
            />
        </div>
    </div>
  )
}

export default Media