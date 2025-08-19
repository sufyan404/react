import React from 'react';
import { useState } from 'react';
import authService from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Button, Input, Logo } from './index';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async data => {
    console.log('Starting signup with:', data);
    setError('');
    try {
      const createAccount = await authService.createAccount(data);
      console.log('Account created:', createAccount);
      if (createAccount) {
        const userData = await authService.getCurrentUser();
        console.log('User data retrieved:', userData);
        if (userData) {
          dispatch(login(userData));
          navigate('/');
        }
      }
    } catch (error) {
      console.log('Signup error:', error);
      setError(error.message);
    }
  };

  return (
    <div className='flex items-center justify-center'>
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-lg p-10 border border-black/10`}
      >
        <div className='mb-2 flex justify-center'>
          <span className='inline-block w-full max-w-[100px]'>
            <Logo width='100%' />
          </span>
          <h2 className='text-center text-2xl font-black leading-tight'>
            Sign in to you account
          </h2>
          <p className='mt-2 text-center text-base text-black/60'>
            Already have any account?&nbsp;
            <Link
              to='/login'
              className='font-medium text-primary transition-all duration-200 hover:underline'
            >
              Sign in
            </Link>
          </p>
          {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
          <form onSubmit={handleSubmit(create)}>
            <div className='space-y-5'>
              <Input
                label='Name'
                placeholder='Enter Your Full name'
                {...register('name', { required: true })}
              />
              <Input
                label='Email'
                placeholder='Enter Your email'
                type='email'
                {...register('email', {
                  required: true,
                  validate: value =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    'Email address must be a valid address',
                })}
              />
              <Input
                label='Password'
                type='password'
                placeholder='Enter Your Password (min 8 characters)'
                {...register('password', {
                  required: true,
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters long',
                  },
                })}
              />
              <Button type='submit' className='w-full'>
                Create Account
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
