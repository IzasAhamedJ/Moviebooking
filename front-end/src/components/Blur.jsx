import React from 'react'

function Blur({top="auto",left="auto",right="auto",bottom="auto"}) {
    return (
        <>
        <div className='absolute -z-50 h-58 w-58 rounded-full bg-pink-500/30 blur-3xl' style={{top:top,left:left,right:right,bottom:bottom}}>

        </div>
        </>
    )
}

export default Blur
