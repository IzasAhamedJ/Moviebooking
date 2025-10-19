import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { SearchIcon, XIcon, AlignJustify, MenuIcon, TicketPlus } from 'lucide-react'
import { useState } from 'react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { useAppContext } from '../context/AppContext'

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const { user } = useUser();

    const {favouriteMovie}=useAppContext();



    const clerk = useClerk();

    const navigate=useNavigate();

    console.log('user check',user)

    return (
        <>

            <div className='nav-wrapper fixed z-50 left-0 w-full flex items-center justify-between px-6 md:px-32 lg:px-36 py-5'>
                <Link to={'/'}>
                    <img src={assets.logo} alt="" />
                </Link>



                <div className={`max-md:absolute max-md:top-0 max-md:left-0
                max-md:font-medium max-md:text-lg z-50 flex flex-col md:flex-row item-center max-md:justify-center
                gap-8 min-md:px-8 py-3  min-md:rounded-full backdrop-blur bg-black/70 md:bg-white/10 md:border 
                border-grap-300/20 overflow-hidden duration-300 ${isOpen ? 'max-md:w-full' : 'max-md:w-0'}`}>
                    <XIcon className='md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer' onClick={() => setIsOpen(!isOpen)} />
                    {/* {!setIsOpen && <AlignJustify className='md:hidden absoulte top-6 right-0 w-6 h-6 cursor-pointer' />}   */}
                    <Link onClick={() => { scrollTo(0, 0); setIsOpen(false) }} to='/'>Home</Link>
                    <Link onClick={() => { scrollTo(0, 0); setIsOpen(false) }} to='/movies'>Movies</Link>
                    <Link onClick={() => { scrollTo(0, 0);setIsOpen(false) }} to='/'>Theatre</Link>
                    <Link onClick={() => { scrollTo(0, 0);setIsOpen(false) }} to='/'>Releases</Link>
                   {favouriteMovie.length > 0 && <Link onClick={() => { scrollTo(0, 0);setIsOpen(false) }} to='/favourite'>Favourites</Link>}
                </div>
                <div className='flex items-center gap-2'>
                    <SearchIcon className='max-md:hidden w-4 h-4 cursor-pointer' />


                    {
                        !user ? (
                            <button onClick={()=>clerk.openSignIn({})} className='bg-pink-500 hover:bg-primary-dull px-4 py-1 rounded-full
                       sm:px-7 sm:py-2 font-medium cursor-pointer'>Login</button>
                        ) : (

                            // <UserButton/>

                            <UserButton>
                                <UserButton.MenuItems>
                                     <UserButton.Action label="My Bookings" labelIcon={<TicketPlus width={15}/>} onClick={()=>navigate('/mybookings')}/>
                                </UserButton.MenuItems>
                            </UserButton>
                        )
                    }



                </div>

                <MenuIcon className='max-md:ml-4 md:hidden w-6 h-6 cursor-pointer' onClick={() => setIsOpen(!isOpen)} />
            </div>

        </>
    )
}

export default Navbar
