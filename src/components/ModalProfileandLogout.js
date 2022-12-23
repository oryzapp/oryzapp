import React, { useEffect, useState } from 'react'
import { ReactComponent as ProfileIcon } from "../assets/profile2.svg"
import {ReactComponent as OutIcon} from '../assets/logout.svg'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth } from '../firebase-config'
import db from "../firebase-config";
import ModalProfile from './ModalProfile'



export default function ModalProfileandLogout({open, closeModal}) {
    const navigate = useNavigate()

    const [user, setUser] = useState('')
    useEffect(() => {
      const unsub = onAuthStateChanged(auth, async (user) => {
        setUser(user?.email)
      })
    },[])

      const onSignOut = async () => {

	    const docRef = doc(db, 'AUTH',user)
      const docSnap = await getDoc(docRef);

      // console.log(docSnap.data().type);
      const payLoad = {
       email: docSnap.data().email,
						password: docSnap.data().password,
						role: docSnap.data().role,
						type:'Old',
						searchIndex: docSnap.data().email
      }

      // Store Credentials
      await setDoc(docRef, payLoad);

      await auth.signOut()
			navigate('/login');
    
  }

  const [isProfileOn, setIsProfileOn] = useState(false)  
    if (!open) return null;
  return (
    <>
    <ModalProfile  open={isProfileOn} closeModal={()=>{
      setIsProfileOn(false)
    }}/>
    <div className=' h-screen w-screen top-0 bottom-0 right-0 left-0 z-40 absolute bg-black/20' onClick={closeModal}/>
    <div className='w-32  bg-white absolute right-5 top-12 z-50 rounded-md'>
        <div className='flex items-center p-3 group hover:bg-sprPrimaryLight rounded-t-md active:bg-sprPrimary ' onClick={()=>{setIsProfileOn(true) 
            closeModal()} }>
                <ProfileIcon className='h-5 fill-sprGray70 group-hover:fill-white active:text-white '/>
                <p className=' group-hover:text-white active:text-white cursor-pointer' >Profile</p>
        </div>
        <div className='flex items-center p-3 group hover:bg-sprPrimaryLight rounded-b-md active:bg-sprPrimary '>
                <OutIcon className='h-5 fill-sprGray70 group-hover:fill-white active:text-white '/>
                <p className=' group-hover:text-white active:text-white cursor-pointer' onClick={onSignOut}>Sign Out</p>
        </div>
    </div>
    </>
  )
}
