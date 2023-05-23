import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { useStateContext } from "../context/ContextProvider.jsx";
import { useAuth } from "../hooks/useAuth.jsx";
import viteLogo from '/vite.svg';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { setUser, setToken } = useStateContext();
  const { login } = useAuth();
  const [message, setMessage] = useState(null);

  const onSubmit = (data, event) => {
    event.preventDefault();

    const setSuccessResponse = (data) => {
      setUser(data.user);
      setToken(data.token);
    };

    const setErrors = (err) => {
      const response = err.response;
      if (response && response.status === 422) {
        setMessage(response.data.message);
      }
    }

    login({ setErrors, setSuccessResponse, payload: data})
  };

  return (
    <form className='flex flex-col w-full items-center bg-neutral-800 border border-neutral-700 rounded-3xl max-w-md drop-shadow-md py-16 px-4 my-8' onSubmit={handleSubmit(onSubmit)}>
      <div className="">
        <a href={window.location.origin} target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h2 className="text-2xl uppercase font-bold text-neutral-200 mb-4">Log in to NEWSBOARD</h2>
      {
        message && (
          <h6 className="mb-3 text-red-500">
            <p>{message}</p>
          </h6>
        )
      }
      <div className="w-full lg:w-3/4 flex flex-col mb-3 mx-auto">
        <label htmlFor="email" className={'text-sm block font-semibold text-sm text-neutral-200 text-left px-1'}>
          Email
        </label>
        <input
          type="text"
          className="mt-1 block w-full rounded-lg p-2"
          autoComplete="email"
          placeholder="Email"
          {...register("email")}
        />
      </div>
      <div className="w-full lg:w-3/4 flex flex-col mb-3 mx-auto">
        <label htmlFor="email" className={'text-sm block font-semibold text-sm text-neutral-200 text-left px-1'}>
          Password
        </label>
        <input
          type="password"
          className="mt-1 block w-full rounded-lg p-2"
          autoComplete="current-password"
          placeholder="Password"
          {...register("password")}
        />
      </div>
      <div className="w-full lg:w-3/4 flex flex-col mb-3 mx-auto mt-6">
        <button className="bg-indigo-600 border-2 border-indigo-700 text-white font-bold normal-case mb-4 py-2 px-8 w-full">
          Log In
        </button>
      </div>
      <div className="w-full lg:w-3/4 flex flex-col mb-3 mx-auto mt-6">
        <h2>New to Newsboard? <span><Link to={'/register'}>Sign Up</Link></span></h2>
      </div>
    </form>
  )
}

export default Login;