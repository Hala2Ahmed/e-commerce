import React, { useState } from 'react';
import { Input } from "@heroui/react";
import { Button } from "@heroui/react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useParams } from 'react-router-dom';
export default function Address() {
  const [isLoadin, setIsLoadin] = useState(false)
  const {cartId} = useParams()
  const initialValues = {
    details: '',
    phone: '',
    city: '',
  };

    async function checkout() {
      setIsLoadin(true);
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/orders/checkout-session/" +
          cartId,
        {
          shippingAddress: values,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
          params: {
            url: "http://localhost:5173",
          },
        }
      );
      setIsLoadin(false);
      location.href = data.session.url;
    }

 const validationSchema=Yup.object({
    details:Yup.string().required("Details is required"),
    phone:Yup.string().required("Phone is required").matches(/^\+?[0-9]{1,4}?[-. ]?[0-9]{1,12}?$/, "Invalid phone number"),
    city:Yup.string().required("City is required"),
  })

  const { handleSubmit, values, handleChange, errors, handleBlur, touched } = useFormik({
    initialValues,
    onSubmit: checkout,
    validationSchema,
  });

  return (
    <div className="mx-auto sm:w-2/3 bg-white shadow-lg p-12">
    <h1 className='text-3xl font-bold'>Enter your address</h1>
      <form onSubmit={handleSubmit}>
        <div className='py-5 grid md:grid-cols-2 gap-4'>
          <Input isInvalid={touched.details&&errors.details} errorMessage={errors.details} onBlur={handleBlur} onChange={handleChange} value={values.details} name='details' variant='bordered' className='md:col-span-2' label="details" type="text" />
          <Input isInvalid={touched.phone&&errors.phone} errorMessage={errors.phone} onBlur={handleBlur} onChange={handleChange} value={values.phone} name='phone' variant='bordered' className='md:col-span-2' label="phone" type="tel" />
          <Input isInvalid={touched.city&&errors.city} errorMessage={errors.city} onBlur={handleBlur} onChange={handleChange} value={values.city} name='city' variant='bordered' className='md:col-span-2' label="city" type="text" />
          <Button disabled={isLoadin} isLoading={isLoadin} type='submit' className='md:col-span-2' color="primary">
            place order
          </Button>
        </div>
      </form>
    </div>
  );
}
