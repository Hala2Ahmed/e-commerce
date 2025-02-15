import React from 'react'
import {Spinner} from "@heroui/react";
export default function LoadingScreen() {
  return (
    <div className='flex justify-center items-center h-[60vh]'>
            <Spinner color="primary" size='lg'/>
    </div>   
  )
}