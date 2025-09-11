import React from 'react';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import { UserProvider } from './Context/useAuth';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <UserProvider>
      <Outlet />
      <ToastContainer/>
    </UserProvider>
  );
}

export default App;
