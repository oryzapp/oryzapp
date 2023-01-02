import React, { useEffect, useState } from 'react'
import { ReactComponent as CloseIcon } from '../assets/close.svg';
import { ReactComponent as EditIcon } from '../assets/edit-icon.svg'
import ReactDom from "react-dom";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase-config';




export default function ModalProfile({open, closeModal}) {

  const [user,setUser] = useState([])
  useEffect(()=>{
		const unsub = onAuthStateChanged(auth, async (user) => {
      console.log(user);
      setUser(user)
      
    })
    return unsub

  })
  if(!open) return null;
  return ReactDom.createPortal(
    <div>
      <div className=" flex flex-col fixed left-0 right-0 bottom-0 top-0  z-50 justify-center items-center " >
      <div className=" bg-black/30 flex flex-col fixed left-0 right-0 bottom-0 top-0  z-30 justify-center items-center " onClick={closeModal}/>

           

               <div className='bg-white h-96 w-96 p-10 flex items-start relative rounded-md flex-col z-50'>
                <div className="absolute right-4 top-4 z-40  ">
            <CloseIcon className='group-hover:stroke-white stroke-sprGray50 hover:stroke-sprGray80 active:stroke-sprPrimary h-5' onClick={closeModal} />
                </div>
                  <div className='flex w-full '>
                    <div className='flex-auto bg-yellow-500'>
                      <div className='font-medium'>Kumusta,</div>
                      {/* <h1 className='text-sprPrimary text-2xl font-medium'>{user.displayName === null ? 'Edit your name' : user.displayName}</h1> */}
                      <EditIcon className='w-4 h-4 fill-sprGray60'/>
                    <input type="text" />
                  </div>
                                 <div className='bg-sprPrimaryOffLight w-20 h-20 rounded-full ' ></div>

                  </div>
                 
                  <div className='flex flex-col -space-y-2'>
                    <small className='text-sprPrimary font-medium'>ROLE</small>
                    <h6 className='text-lg font-medium text-sprGray'>Administrator</h6>
                  </div>
                  <div className='flex flex-col -space-y-2'>
                    <small className='text-sprPrimary font-medium'>POSITION</small>
                    <h6 className='text-lg font-medium text-sprGray'>Research Staff</h6>
                  </div>

                  <div className='h-32 w-32 border border-sprPrimary rounded-xl'>

                  </div>
               </div>
        </div>
    </div>,
    document.getElementById("portal")
  )
}

// import { getAuth, updateProfile } from "firebase/auth";
// const auth = getAuth();
// updateProfile(auth.currentUser, {
//   displayName: "Jane Q. User", photoURL: "https://example.com/jane-q-user/profile.jpg"
// }).then(() => {
//   // Profile updated!
//   // ...
// }).catch((error) => {
//   // An error occurred
//   // ...
// });
