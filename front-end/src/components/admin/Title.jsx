import React from 'react'

const Title = ({txtOne,txtTwo}) => {
  return (
    <div>
         <h1 className='font-medium text-2xl flex gap-3'>
            {txtOne}<span
            className='underline text-pink-500'>{txtTwo}</span>

         </h1>
    </div>
  )
}

export default Title