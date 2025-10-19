import React from 'react'
import Adminsidebar from '../../components/admin/Adminsidebar'
import AdminNav from '../../components/admin/AdminNav';
import { Outlet } from 'react-router-dom';
import Loading from '../../components/Loading';
import { useAppContext } from '../../context/AppContext';
function Layout() {

    const {isAdmin,fetchIsAdmin}=useAppContext();

    
    return isAdmin?(
        <>
        <AdminNav/>
        <div className='flex'>
               <Adminsidebar/>
               <div className='flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px)] overflow-y-auto'>
                  <Outlet/>
               </div>
        </div>
      
        </>
    ):(
        <>
           <Loading/>
        </>
    )
}

export default Layout
