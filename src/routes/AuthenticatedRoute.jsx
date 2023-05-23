import {
  Navigate,
} from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';

const AuthenticatedRoute = ({ children }) => {
  const { token } = useStateContext();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AuthenticatedRoute;