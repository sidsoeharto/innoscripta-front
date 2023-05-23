import viteLogo from '/vite.svg'
import { NavLink, Navigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { token, setUser, setToken } = useStateContext();
  const { logout } = useAuth();

  const onLogout = (event) => {
    event.preventDefault();

    const setSuccessResponse = () => {
      setUser({});
      setToken(null);
    };

    const setErrors = (err) => {
      const response = err.response;
      if (response && response.status === 422) {
        console.error(response.data.message);
      }
    }

    logout({ setErrors, setSuccessResponse })
  };

  return (
    <div className='flex fixed z-50 w-full bg-neutral-800 justify-between drop-shadow-lg border-b border-neutral-700'>
      <div className="flex items-center justify-center filter drop-shadow-md p-3">
        <NavLink to={'/'} className="text-xl font-semibold text-white flex flex-row gap-x-3 items-center">
          <img src={viteLogo} alt="sidsoeharto logo" className="w-8 h-8"/>
          <h1 className='text-lg lg:text-xl font-bold'>NEWSBOARD</h1>
        </NavLink>
      </div>
      <div className="flex items-center justify-center filter drop-shadow-md mx-2 gap-x-2 lg:mx-6 lg:gap-x-4">
        {
          !token ?
          <>
            <NavLink to={'/login'} className='text-sm text-neutral-300 rounded-lg p-2'>
              Login
            </NavLink>
            <NavLink to={'/register'} className='text-sm border border-indigo-600 rounded-lg py-2 px-4 bg-indigo-700 text-neutral-100'>
              Register
            </NavLink>
          </>
          :
          <>
            <NavLink to={'/profile'} className='text-sm text-neutral-300 rounded-lg p-2'>
              Profile
            </NavLink>
            <NavLink to={'/collections'} className='text-sm text-neutral-300 rounded-lg p-2'>
              Collections
            </NavLink>
            <button
              onClick={onLogout}
            >
              Logout
            </button>
          </>
        }
      </div>
    </div>
  )
};

export default Navbar;