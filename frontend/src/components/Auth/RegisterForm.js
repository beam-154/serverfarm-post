import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';

const passwordSchema = Yup.object().shape({
  username: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required(),
  repassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match'
  ),
});

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passwordSchema),
  });
  const [registerError, setRegisterError] = useState('');

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      navigate('/login');
    } catch (error) {
      setRegisterError('Failed to register. Please try again.');
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-10 sm:m-auto sm:w-full sm:max-w-sm bg-gray-700 p-4 rounded-lg">
      <form className="space-y-3 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        {registerError && <span className="form-error">{registerError}</span>}

        <label
          htmlFor="username"
          className="block text-sm font-medium leading-6 text-gray-100"
        >
          User Name
        </label>
        <input
          {...register('username', { required: true })}
          className="form-input"
        />
        {errors.username && <span className='form-error'>Username is required</span>}

        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-100"
        >
          Email
        </label>
        <input
          type="email"
          {...register('email', { required: true })}
          className="form-input"
        />
        {errors.email && <span className='form-error'>Email is required</span>}

        <label
          htmlFor="password"
          className="block text-sm font-medium leading-6 text-gray-100"
        >
          Password
        </label>
        <input
          type="password"
          {...register('password', { required: true })}
          className="form-input"
        />
        {errors.password && <span className='form-error'>Password is required</span>}

        <label
          htmlFor="repassword"
          className="block text-sm font-medium leading-6 text-gray-100"
        >
          Confirm Password
        </label>
        <input
          type="password"
          {...register('repassword', { required: true })}
          className="form-input"
        />
        {errors.repassword && <span className='form-error'>Password is not matched</span>}

        <button type="submit" className="form-button">
          Register
        </button>
      </form>
      <Link to="/login" className="text-white text-left">
        Already have an account
      </Link>
    </div>
  );
};

export default RegisterForm;
