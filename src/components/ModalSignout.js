import React from 'react'
import { auth } from '../firebase-config'

export default function ModalSignout() {

     const onSignOut = async () => {
    await auth.signOut()
  }

  return (
    <div className='z-50 absolute right-2 top-12  bg-white rounded-md divide-y divide-slate-200'>
            <p className='p-3'>Profile</p>
            <p className='p-3' onClick={onSignOut}>Sign Out</p>
    </div>
  )
}
