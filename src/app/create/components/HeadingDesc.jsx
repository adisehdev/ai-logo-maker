import React from 'react'

const HeadingDesc = ({title,description}) => {
  return (
    <div>
        <h2 className='font-bold text-3xl text-gray-700'>
            {title}
        </h2>
        <p className='text-gray-500 text-lg mt-2'>{description}</p>
    </div>
  )
}

export default HeadingDesc