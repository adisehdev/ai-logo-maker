import React, { useState } from 'react'
import Lookup from '@/app/_data/Lookup'
import Colors from '@/app/_data/Colors'
import HeadingDesc from './HeadingDesc'

const LogoColorPalette = ({handleInputChange,formData}) => {
  const [selectedOption, setSelectedOption] = useState(formData?.palette)

  const handlePaletteSelect = (paletteName) => {
    setSelectedOption(paletteName)
    handleInputChange(paletteName)
  }

  return (
    <div className='my-10'>
      <HeadingDesc 
        title={Lookup.LogoColorPaletteTitle} 
        description={Lookup.LogoColorPaletteDesc}
      />
      <div className='grid grid-rows-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {Colors.map((palette, index) => (
          <div 
            key={index} 
            className={`
              relative 
              cursor-pointer 
              transition-all 
              duration-100 
              ease-in-out 
              transform 
              
              ${selectedOption === palette.name 
                ? 'border-4 border-blue-700 shadow-xl' 
                : 'border-2 border-transparent'}
            `}
            onClick={() => handlePaletteSelect(palette.name)}
          >
            <div className='flex'>
              {palette?.colors?.map((color, colorIndex) => (
                <div 
                  key={colorIndex} 
                  className='w-full h-24' 
                  style={{background: color}}
                ></div>
              ))}
            </div>
            {selectedOption === palette.name && (
              <div className='absolute top-2 right-2 bg-blue-700 text-white px-2 py-1 rounded-full text-xs'>
                Selected
              </div>
            )}
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default LogoColorPalette