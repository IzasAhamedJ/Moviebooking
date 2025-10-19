import React from 'react'
import { assets } from '../assets/assets'
import { ArrowRight, CalendarIcon, ClockIcon} from 'lucide-react'
import Navbar from './Navbar'

function MainSection() {
    return (

        <div className='flex flex-col item-start justify-start gap-4 px-6 md:px-16
           lg:px-36 main-bg'>
          
            <img src={assets.marvelLogo} alt="" className='w-40 mt-50'/>

            <h1 className='text-5xl md:text-[70px] md:leading-18 font-semibold max-w-110'>Guardian of the galaxy</h1>

            <div className='flex item-center gap-4 text-gray-300'>

                <span>
                    Action | Adeventure | Sci-fi
                </span>
                <div className='flex items-center gap-1'>
                    <CalendarIcon className='w-4.5 h-4.5' />2018
                </div>
                <div className='flex items-center gap-1'>
                    <ClockIcon className='w-4.5 h-4.5' />2h 8m
                </div>

            </div>

            <div className='text-gray-300 w-80'>
                <span>
                    In a post-apocalypic world where cities ride on wheels adminconsume each other to survive.two people meet in london and try to stop a conspiracy
                </span>
            </div>

            <div className='common-btn'>
                    <button className='flex items-center gap-3 bg-pink-500 p-3 text-sm rounded-full'>Explore Movies<span>
                         <ArrowRight className='w-5 h-5'/></span></button>
            </div>
        </div>

    )
}

export default MainSection
