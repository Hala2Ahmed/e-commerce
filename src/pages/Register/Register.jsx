import { Button, Input } from '@heroui/react'
import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';


export default function Register() {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const navigate=useNavigate();
  const initialValues = {
    name: "",
    email:"",
    password:"",
    rePassword:"",
    phone:""
  }
  const validationSchema = Yup.object({
    name:Yup.string().required("Name is required").min(3,"Name length must be at least 3 characters").max(20,"Name must be at most 20 characters"),
    email: Yup.string().email('Invalid email address').required("Email is required"),
    password:Yup.string().required().matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,"Minimum eight characters, at least one letter and one number"),
    rePassword:Yup.string().required().oneOf([Yup.ref('password')], 'Passwords must match'),
    phone:Yup.string().required("Phone is required").matches(/^\+?[0-9]{1,4}?[-. ]?[0-9]{1,12}?$/, "Invalid phone number")
  })
  const onSubmit=(values)=>{
    setErrorMsg("")
    setIsLoading(true)
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values).then(({data})=>{
        navigate("/login")
    }).catch((err)=>{
      console.log(err);
      setErrorMsg(err.response.data.message)
    }).finally(()=>{
      setIsLoading(false)
  })
  }
  const {handleSubmit,values,handleChange,errors,handleBlur,touched}=useFormik({
    initialValues,
    validationSchema,
    onSubmit
  })
  return (
<>
<div className='mx-auto sm:w-2/3 bg-white shadow-lg p-12'>
<Helmet>
  <title>Register</title>
</Helmet>
<h2 className='text-2xl font-bold'>Register</h2>
  <form onSubmit={handleSubmit}>
  <div className='grid md:grid-cols-2 gap-4 py-5 '>
  <Input isInvalid={touched.name&&errors.name} errorMessage={errors.name} onBlur={handleBlur} onChange={handleChange} value={values.name} name='name' label="Name" type="name" className='md:col-span-2' />
  <Input isInvalid={touched.email&&errors.email} errorMessage={errors.email} onBlur={handleBlur} onChange={handleChange} value={values.email} name='email' label="Email" type="email" className='md:col-span-2'/>
  <Input isInvalid={touched.password&&errors.password} errorMessage={errors.password} onBlur={handleBlur} onChange={handleChange} value={values.password} name='password' label="Password" type="password" className='col-span-1'/>
  <Input isInvalid={touched.rePassword&&errors.rePassword} errorMessage={errors.rePassword} onBlur={handleBlur} onChange={handleChange} value={values.rePassword} name='rePassword' label="rePassword" type="password" className='col-span-1'/>
  <Input isInvalid={touched.phone&&errors.phone} errorMessage={errors.phone} onBlur={handleBlur} onChange={handleChange} value={values.phone} name='phone' label="Number" type="tel" className='md:col-span-2'/>
  <Button disabled={isLoading} isLoading={isLoading} type='submit' className='md:col-span-2' color="primary">Register</Button>
  {errorMsg && <p className='text-red-500'>{errorMsg}</p>}
  </div>
  </form>
  </div>
</>
  )
}
