import { Outlet } from 'react-router-dom';
import NavBar from './navigator/NavBar'
import Footer from './navigator/Footer'
import '../assets/styles/footer.css'
import React from 'react';

const Layout = () => {
  return (
    <div className='layout'>
        <div className="content-wrap">
            <NavBar />
            <Outlet />
        </div>
        <Footer />
    </div>
  )
}

export default Layout