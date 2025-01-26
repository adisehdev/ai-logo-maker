import React, { useState, useEffect } from 'react'
import HeadingDesc from './HeadingDesc'
import Lookup from '@/app/_data/Lookup'
import { useSearchParams } from 'next/navigation'

const LogoTitle = ({handleInputChange, formData}) => {
    const searchParam = useSearchParams()
    const [title, setTitle] = useState(searchParam?.get('title') ?? '')
   
    // Use useEffect to update formData with the initial title when the component mounts
    useEffect(() => {
        if (title) {
            handleInputChange(title)
        }
    }, [title])
    
    return (
        <div className='my-10'>
            <HeadingDesc title={Lookup.LogoTitle} description={Lookup.LogoTitleDesc}/>
            <input 
                type='text' 
                placeholder={Lookup.InputTitlePlaceholder} 
                className='p-4 border roundex-lg mt-5 w-full'
                defaultValue={title}
                onChange={(e) => {
                    // If input is changed, use the new value
                    const newTitle = e.target.value || title
                    handleInputChange(newTitle)
                }}
            />
        </div>
    )
}

export default LogoTitle