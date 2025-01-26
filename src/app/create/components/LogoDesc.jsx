import React from 'react'
import Lookup from '@/app/_data/Lookup'
import HeadingDesc from './HeadingDesc'

const LogoDesc = ({handleInputChange,formData}) => {
  return (
    <div className='my-10'>
      <HeadingDesc title={Lookup.LogoDescTitle} description={Lookup.LogoDescDesc}/>

      <input type='text' placeholder={Lookup.InputTitlePlaceholder} className='p-4 border roundex-lg mt-5 w-full'
            defaultValue={formData?.description}
            
            onChange={(e)=>{handleInputChange(e.target.value)}}
        />
    </div>
  )
}

export default LogoDesc