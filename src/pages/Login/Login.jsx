import { Button, Input } from '@heroui/react'
import React, { useContext, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../context/authContext';


export default function Login() {
  const {setIslogged}=   useContext(authContext);

  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const navigate=useNavigate();
  const initialValues = {
    email:"",
    password:"",
  }
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required("Email is required"),
    password:Yup.string().required().matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,"Minimum eight characters, at least one letter and one number"),
  })
  const onSubmit=(values)=>{
    setErrorMsg("")
    setIsLoading(true)
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",values).then(({data})=>{
        localStorage.setItem("token",data.token)
        setIslogged(true);
        navigate("/");
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
<div className='mx-auto md:w-2/3 bg-white shadow-lg p-12'>
<h2 className='text-2xl font-bold'>Login Now</h2>
  <form onSubmit={handleSubmit}>
  <div className='grid grid-cols-2 gap-4 py-5 '>
  <Input isInvalid={touched.email&&errors.email} errorMessage={errors.email} onBlur={handleBlur} onChange={handleChange} value={values.email} name='email' label="Email" type="email" className='col-span-2'/>
  <Input isInvalid={touched.password&&errors.password} errorMessage={errors.password} onBlur={handleBlur} onChange={handleChange} value={values.password} name='password' label="Password" type="password" className='col-span-2'/>
  <Button disabled={isLoading} isLoading={isLoading} type='submit' className='md:col-span-2' color="primary">Register</Button>
  
  {errorMsg && <p className='text-red-500'>{errorMsg}</p>}
  </div>
  </form>
  <Link to="/forgot-password" className='text-blue-500 hover:underline'>Forgot Password?</Link>
  </div>
</>
  )
}
