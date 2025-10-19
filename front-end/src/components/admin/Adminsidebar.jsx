import React from 'react'
import { assets } from '../../assets/assets'
import { LayoutDashboardIcon, ListCollapseIcon, ListIcon, PlusSquareIcon } from 'lucide-react'
import { NavLink } from 'react-router-dom'

function Adminsidebar() {


    const user = {
        firstName: 'Izas',
        lastName: 'Ahamed',
        imageUrl: assets.profile
    }

    const adminNavLinks = [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboardIcon },
        { name: 'Add Shows', path: '/admin/add-show', icon: PlusSquareIcon },

        { name: 'List Shows', path: '/admin/list-show', icon: ListIcon },

        { name: 'List Bokkings', path: '/admin/list-booking', icon: ListCollapseIcon },

    ]


    return (
        <>
            <div className='h-[calc(100vh-64px)] md:flex flex-col item-center pt-8 max-w-13 md:max-w-60 w-full border-r border-gray-300/20 text-sm'>
                <img src={user.imageUrl} alt=""  className='h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto'/>
                <p className='mt-2 text-center text-base max-md:hidden'>{user.firstName} {user.lastName}</p>

                <div className=''>
                      {
                        adminNavLinks.map((nav,index)=>(
                           <NavLink key={index} to={nav.path} end className={({isActive})=>`
                           relative flex items-center max-md:justify-center gap-2 w-full py-2.5 text-white min-md:pl-10 first:mt-6 text-gray-400 ${isActive && 'bg-pink-500'}`}>
                              {({isActive})=>(
                                <>
                                 <nav.icon className='w-5 h-5'/>
                                 <p className='max-md:hidden'>{nav.name}</p>
                                 <span className={`w-1.5 h-10 rounded-1 right-0 absolute ${isActive && 'bg-white'}`}></span>
                                </>
                              )
                              }
                           </NavLink>
                        ))
                      }
                </div>
            </div>
        </>
    )
}

export default Adminsidebar
