import React, { useEffect, useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '../../ui/input'
import Link from 'next/link'
import Fuse from 'fuse.js'
import searchData from '../../../lib/search'

const options = {
        keys: ["label", "description", "keywords"],
        threshold: 0.3, // Adjust the threshold for matching (lower is stricter)

    }


const SearchModel = ({open, setOpen}) => {

    const [query, setQuery] = useState("")
    const [results, setResults] = useState([])

    
    const fuse = new Fuse(searchData, options)

    useEffect(()=>{
        if(query.trim() === ""){
            setResults([])
            return
        }

        const res = fuse.search(query)
        setResults(res.map(result => result.item))


    
    },[query])
  return (
    <Dialog open={open} onOpenChange={()=> setOpen(!open)}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Quick Search</DialogTitle>
      <DialogDescription>
        Find and navigate to any admin section instantly. Use the keywords or section names to search. 
      </DialogDescription>
    </DialogHeader>

    <Input
    placeholder='Search..'
    value={query}
    onChange={(e)=>setQuery(e.target.value)}
    autoFocus
    />



    <ul className='mt-4 max-h-60 overflow-y-auto'>
        {results.length > 0 ? results.map((result, index)=>(
            <li key={index}>
            <Link href={result.url}
            onClick={()=>setOpen(false)}>
                <h4 className='font-medium'>
                    {result.label}
                </h4>
                <p className='text-sm text-muted-foreground'>
                    {result.description}
                </p>
            </Link>
            </li>
        )) : (
            <li className='py-2 px-3'>
                <p className='text-sm text-muted-foreground'>
                    No results found.
                </p>
            </li>
        )}
    </ul>
  </DialogContent>
</Dialog>
  )
           
}

export default SearchModel