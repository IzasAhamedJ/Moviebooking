import React from 'react'
import { assets } from '../assets/assets'

function Footer() {
    return (
        <>
            <div className='px-6 md:px-16 lg:px-32'>

                <div className='flex flex-col md:flex-row items-start justify-between border-b-2 border-gray-300 py-5'>
                 <div>
                    <img src={assets.logo} alt="" />
                    <div className='mt-5'>
                        <p className='text-gray-300 w-100'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus maiores saepe quidem nam ipsam corporis illo unde iure minus eos, inventore optio id in veritatis assumenda earum officia! Fugit, voluptatem.</p>

                        <div className='google-play-app-store-img flex items-center gap-2 mt-5'>
                            <img src={assets.googlePlay} alt="" />
                            <img src={assets.appStore} alt="" />
                        </div>
                    </div>
                </div>
                <div className='flex gap-10 mt-5 md:mt-0'>
                    <div>
                        <h4 className='text-lg text-white'>Company</h4>
                        
                        <ul className='mt-4'>
                            <li>
                                <a href="" className='text-gray-300'>Home</a>
                            </li>
                                <li>
                                <a href="" className='text-gray-300'>About Us</a>
                            </li>
                                <li>
                                <a href="" className='text-gray-300'>Contact us</a>
                            </li>
                                <li>
                                <a href="" className='text-gray-300'>Privacy Policy</a>
                            </li>
                        </ul>
                       
                    </div>
                    <div>
                           <h4 className='text-lg text-white'>Get in touch</h4>
                                   <ul className='mt-4'>
                            <li>
                                <a href="" className='text-gray-300'>+91 9003660492</a>
                            </li>
                                <li>
                                <a href="" className='text-gray-300'>izasahamed57@gmail.com</a>
                            </li>
                        </ul>
                    </div>

                </div>
                </div>
                <div className='text-center text-gray-300 py-2'>
                    Copyright 2024 Ijuquickshow.All Right Rserved
                </div>

             
            </div>
        </>
    )
}

export default Footer
