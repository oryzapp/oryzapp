import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase-config'
import ModalProfile from './ModalProfile'
import {ReactComponent as OutIcon} from '../assets/logout.svg'

export default function ModalTopbarBox() {
    const navigate = useNavigate()

     const onSignOut = async () => {
    await auth.signOut()
				navigate('/login');
    
  }

  const [isProfileOn, setIsProfileOn] = useState(false)
  

  return (
    <div className='z-50 absolute right-2 top-12 rounded-md bg-white  divide-y divide-slate-200 drop-shadow-sm '>
            {/* <p className='p-3 hover:bg-slate-50' onClick={()=>{
                setIsProfileOn(true)
                
            }}>Profile</p> */}

            <div className='flex items-center p-3 group hover:bg-sprPrimaryLight rounded-md active:bg-sprPrimary '>
            <OutIcon className='h-5 fill-sprGray70 group-hover:fill-white active:text-white'/>
            <p className=' group-hover:text-white active:text-white' onClick={onSignOut}>Sign Out</p>


            </div>
    <ModalProfile open={isProfileOn} closeModal={()=>{
      setIsProfileOn(false)
    }}/>

    </div>
  )
}
