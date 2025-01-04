import React from 'react';
import { BrowserRouter, Routes, Route as ReactRoute, useLocation } from "react-router-dom";
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import Branch from './components/Branch';
import BranchForm from './components/BranchForms';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import BranchEdit from './components/BranchEditing';
import Register from './components/Register';
import Login from './components/Login';
import Reset from './components/Reset';
import Route from "./components/Route";

const AppContent = () => {
  const location = useLocation();
  
  // Array of paths where sidebar should not be shown
  const noSidebarPaths = ['/login', '/register', '/reset-password'];
  
  // Check if current path starts with any of the noSidebarPaths
  const shouldShowSidebar = !noSidebarPaths.some(path => 
    location.pathname.startsWith(path)
  );

  return (
    <div className="flex flex-row">
      {shouldShowSidebar && <Sidebar />}
      <div className={`${shouldShowSidebar ? 'flex-1' : 'w-full'}`}>
        <Routes>
          <ReactRoute path="/" element={<Route><Dashboard /></Route>} />
          <ReactRoute path="/register" element={<Register />} />
          <ReactRoute path="/login" element={<Login />} />
          <ReactRoute path="/reset-password/:token" element={<Reset />} />
          <ReactRoute path="/branch" element={<Route><Branch /></Route>} />
          <ReactRoute path="/branchform" element={<Route><BranchForm /></Route>} />
          <ReactRoute path="/branch/:id" element={<Route><BranchEdit /></Route>} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <AppContent />
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
};

export default App;