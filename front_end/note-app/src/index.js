import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './index.css';
import Home from './pages/home';
import Signup from './pages/signup';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Header from './components/header';
import { AuthProvider } from './contexts/authContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/dashboard' element={<Dashboard/>}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);