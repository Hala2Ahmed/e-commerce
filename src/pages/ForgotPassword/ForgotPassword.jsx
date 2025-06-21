import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Input } from '@heroui/react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  
  const initialValues = {
    email: '',
    resetCode: '',
    newPassword: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    resetCode: Yup.string().when('step', {
      is: 2,
      then: Yup.string().required('Required'),
    }),
    newPassword: Yup.string().when('step', {
      is: 3,
      then: Yup.string()
        .required('Required')
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Minimum eight characters, at least one letter and one number"),
    }),
  });

  const handleRequestReset = (values, actions) => {
    setMessage("");
    setIsLoading(true);
    
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', { email: values.email })
      .then(({ data }) => {
        setMessage(data.message);
        setStep(2);
      })
      .catch((error) => {
        setMessage('Error requesting password reset.');
      })
      .finally(() => {
        setIsLoading(false);
        actions.setSubmitting(false);
      });
  };

  const handleVerifyResetCode = (values, actions) => {
    setMessage("");
    setIsLoading(true);
    
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', { resetCode: values.resetCode })
      .then(({ data }) => {
        setMessage(data.message);
        setStep(3);
      })
      .catch((error) => {
        setMessage('Error verifying reset code.');
      })
      .finally(() => {
        setIsLoading(false);
        actions.setSubmitting(false);
      });
  };

  const handleResetPassword = (values, actions) => {
    setMessage("");
    setIsLoading(true);
    
    console.log('Reset Password Values:', {
      email: values.email,
      newPassword: values.newPassword
    });
  
    axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', {
        email: values.email,
        newPassword: values.newPassword
      })
      .then(({ data }) => {
        setMessage(data.message);
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error details:', error.response ? error.response.data : error.message);
        setMessage('Error resetting password.');
      })
      .finally(() => {
        setIsLoading(false);
        actions.setSubmitting(false);
      });
  };

  const { handleSubmit, values, handleChange, errors, handleBlur, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, actions) => {
      if (step === 1) handleRequestReset(values, actions);
      else if (step === 2) handleVerifyResetCode(values, actions);
      else if (step === 3) handleResetPassword(values, actions);
    },
  });

  return (
    <div className='mx-auto sm:w-2/3 bg-white shadow-lg p-12 overflow-hidden'>
       <Helmet>
                <title>Forgot Password</title>
            </Helmet>
      <h2 className='text-2xl font-bold pb-1'>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className='grid grid-cols-2 gap-3 py-5'>
            <Input
              isInvalid={touched.email && errors.email}
              errorMessage={errors.email}
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your email"
              className='col-span-2'
            />
            <Button isLoading={isLoading} color='primary' type="submit" className='md:col-span-2'>Request Reset</Button>
          </div>
        )}
        {step === 2 && (
          <div className='grid grid-cols-2 gap-4 py-5'>
            <Input
              isInvalid={touched.resetCode && errors.resetCode}
              errorMessage={errors.resetCode}
              type="text"
              name="resetCode"
              value={values.resetCode}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter reset code"
              className='col-span-2'
            />
            <Button isLoading={isLoading} color='primary' type="submit" className='md:col-span-2'>Verify Code</Button>
          </div>
        )}
        {step === 3 && (
          <div className='grid grid-cols-2 gap-4 py-5'>
            <Input
              isInvalid={touched.newPassword && errors.newPassword}
              errorMessage={errors.newPassword}
              type="password"
              name="newPassword"
              value={values.newPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter new password"
              className='col-span-2'
            />
            <Button isLoading={isLoading} color='primary' type="submit" className='md:col-span-2'>Reset Password</Button>
          </div>
        )}
      </form>
      {message && <p className='text-red-500'>{message}</p>}
    </div>
  );
}