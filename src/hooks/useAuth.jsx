import axiosClient from '../config/axios';
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import { useLoading } from '../context/LoadingProvider';

export const useAuth = () => {
  const { setLoading } = useLoading();
  const navigate = useNavigate();

  const csrf = () => axiosClient.get('/sanctum/csrf-cookie')

  const login = async ({ setErrors, setSuccessResponse, payload }) => {
    setLoading(true);
    await csrf()
    await axiosClient
      .post('/login', payload)
      .then((response) => {
        setSuccessResponse(response.data);
        setLoading(false);
        enqueueSnackbar('You have logged in!', { variant: 'success' });
        navigate('/');
      })
      .catch(error => {
        setLoading(false);
        enqueueSnackbar('There is something wrong!', { variant: 'danger' });
        setErrors(error);
      })
  }

  const registerUser = async ({ setErrors, setSuccessResponse, payload }) => {
    setLoading(true);
    await csrf()
    await axiosClient
      .post('/register', payload)
      .then((data) => {
        setSuccessResponse(data);
        setLoading(false);
        enqueueSnackbar('You have successfully registered!, Please log in to continue using your account', { variant: 'success' });
        navigate('/login');
      })
      .catch(error => {
        setLoading(false);
        enqueueSnackbar('There is something wrong!', { variant: 'danger' });
        setErrors(error);
      })
  }

  const logout = async ({ setErrors, setSuccessResponse }) => {
    setLoading(true);
    await csrf()
    await axiosClient
      .post('/logout')
      .then(() => {
        setSuccessResponse();
        setLoading(false);
        enqueueSnackbar('You have logged out!', { variant: 'info' });
        navigate('/login');
      })
      .catch(error => {
        setLoading(false);
        enqueueSnackbar('There is something wrong!', { variant: 'danger' });
        setErrors(error);
      })
  }

  return {
    login, 
    registerUser,
    logout
  }
}