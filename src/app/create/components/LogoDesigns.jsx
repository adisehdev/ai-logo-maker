import React,{useState} from 'react'
import HeadingDesc from './HeadingDesc'
import Lookup from '@/app/_data/Lookup'
import LogoDesig from '@/app/_data/LogoDesig'
import Image from 'next/image'

const LogoDesigns = ({handleInputChange,formData}) => {
  const [selectedOption,setSelectedOption] = useState(formData?.design?.title)
  return (
    <div className='my-10'>
      <HeadingDesc title={Lookup.LogoDesignTitle} description={Lookup.LogoDesignDesc}/>

      <div className='grid grid-cols-2 md:grid-cols-3 gap-10 mt-10'>
        {
          LogoDesig.map((desig, index) => (
            <div key={index} onClick={()=>{setSelectedOption(desig.title);handleInputChange(desig)}} className={selectedOption === desig.title ? 'border-4 p-1 rounded-xl border-blue-700' : 'border-2 rounded-xl border-transparent'}>
              <Image src={desig.image} alt={desig.title} width={300} height={200} className='w-full rounded-xl h-[200px] object-cover'/>
              <p className='text-center mt-2'>{desig.title}</p>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default LogoDesigns