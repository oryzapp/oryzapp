import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase-config'
import ModalProfile from './ModalProfile'

export default function ModalSignout() {
    const navigate = useNavigate()

     const onSignOut = async () => {
    await auth.signOut()
				navigate('/login');
    
  }

  const [isProfileOn, setIsProfileOn] = useState(false)
  

  return (
    <div className='z-50 absolute right-2 top-12 rounded-md bg-white  divide-y divide-slate-200 '>
            <p className='p-3 hover:bg-slate-50' onClick={()=>{
                setIsProfileOn(true)
                
            }}>Profile</p>
            <p className='p-3 hover:bg-slate-50' onClick={onSignOut}>Sign Out</p>
    <ModalProfile/>

    </div>
  )
}
