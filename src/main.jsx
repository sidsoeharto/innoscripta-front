import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { SnackbarProvider } from 'notistack';

import "./index.css";
import App from './App.jsx'
import {
  ErrorPage,
  Home,
  Login,
  Register,
  Profile,
  NewsCollections
} from './views';

import { ContextProvider } from './context/ContextProvider.jsx'
import { LoadingProvider } from './context/LoadingProvider.jsx';
import AuthenticatedRoute from './routes/AuthenticatedRoute.jsx';
import GuestRoute from './routes/GuestRoute.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <AuthenticatedRoute><Home /></AuthenticatedRoute>,
      },
      {
        path: "/login",
        element: <GuestRoute><Login /></GuestRoute>,
      },
      {
        path: "/register",
        element: <GuestRoute><Register /></GuestRoute>,
      },
      {
        path: "/profile",
        element: <AuthenticatedRoute><Profile /></AuthenticatedRoute>,
      },
      {
        path: "/collections",
        element: <AuthenticatedRoute><NewsCollections /></AuthenticatedRoute>,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SnackbarProvider
       anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <LoadingProvider>
        <ContextProvider>
          <RouterProvider router={router} />
        </ContextProvider>
      </LoadingProvider>
    </SnackbarProvider>
  </React.StrictMode>,
)
