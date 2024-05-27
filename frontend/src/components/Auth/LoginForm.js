import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      navigate('/dashboard');
    } catch (error) {
      setLoginError('Authentication failed.');
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-10 sm:m-auto sm:w-full sm:max-w-sm bg-gray-700 p-4 rounded-lg">
      <form className="space-y-3 flex flex-col">
        {loginError && <span className="notif-error">{loginError}</span>}

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
        {errors.username && <span className='form-error'>Username is required</span>}

        <label
          htmlFor="email"
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

        <button type="submit" className="form-button">
          Login
        </button>
      </form>

      <Link to="/register" className="text-white text-left">
        Don't have an account?
      </Link>
    </div>
  );
};

export default LoginForm;
