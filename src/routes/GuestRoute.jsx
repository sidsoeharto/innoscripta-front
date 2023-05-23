import {
  Navigate,
} from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';

const GuestRoute = ({ children }) => {
  const { token } = useStateContext();

  if (token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default GuestRoute;