import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase-config'
import ModalProfile from './ModalProfile'
import {ReactComponent as OutIcon} from '../assets/logout.svg'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import db from "../firebase-config";


export default function ModalTopbarBox() {
    const navigate = useNavigate()

    const [user, setUser] = useState('')
    useEffect(() => {
      const unsub = onAuthStateChanged(auth, async (user) => {
        setUser(user?.email)
      })
    },[])

    console.log('I am in topbar box');
    console.log(user);

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
