import React from 'react'
import img from '../../assets/NotFound.jpg'
export default function NotFound() {
  return (
    <div>
      <img className='md:w-[50%] mx-auto' src={img} alt="not found" />
    </div>
  )
}
