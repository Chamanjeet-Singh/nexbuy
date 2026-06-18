import React from 'react'
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import {cn} from "@/lib/utils"
const LoadingButton = ({type,text,loading,className, onClick, ...props}) => {
  return (
    <div>
        <Button 
        variant="outline" 
        type={type}
        disabled={loading} 
        className= {cn("",className)}
        onClick={onClick} 
        {...props}>
        {loading && <Spinner data-icon="inline-start" />}
        {text}
      </Button>

    </div>
  )
}

export default LoadingButton