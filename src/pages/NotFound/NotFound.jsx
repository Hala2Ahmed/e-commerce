import React from 'react'
import img from '../../assets/NotFound.jpg'
import { Helmet } from 'react-helmet'
export default function NotFound() {
  return (
    <div>
       <Helmet>
                <title>Not Found</title>
            </Helmet>
      <img className='md:w-[50%] mx-auto' src={img} alt="not found" />
    </div>
  )
}
