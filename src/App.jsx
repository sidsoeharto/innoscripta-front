import './App.css'
import { Outlet } from "react-router-dom";

import Navbar from './components/Navbar';
import { useLoading } from './context/LoadingProvider';

const App = () => {
  const { loading } = useLoading();

  return (
    <div className='flex flex-col items-center'>
      <Navbar />
      { loading && 
        <div className='loader-container'>
          <div className='spinner' />
        </div>
      }
      <div className='container flex flex-col items-center py-16'>
        <Outlet />
      </div>
    </div>
  )
}

export default App
