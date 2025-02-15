import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'

export default function Layout() {
  return (
   <>
    <Navbar />
    <div className='container py-10'>
      <Outlet />
    </div>
    <Footer />
   </>
  )
}
