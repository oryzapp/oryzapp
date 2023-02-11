import { onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import ReactDom from "react-dom";
import { ReactComponent as CloseIcon } from '../assets/close.svg';
import { auth } from '../firebase-config';
import db from "../firebase-config";




export default function ModalSettings({open, closeModal}) {
// Navigation
 const [index, setIndex] = useState(1)

//  Get Current User
 const [user,setUser] = useState([])
 useEffect(()=>{
       const unsub = onAuthStateChanged(auth, async (user) => {
     setUser(user.email)   
   })
   return unsub

 },[])

 // Get Current User Info
 const [userInfo,setUserInfo] = useState([])
 const [info, setInfo] = useState({
   email:'',
   password:'',
   fname:'',
   lname:'',
   role:''

 })

 useEffect(()=>{
  
   const collectionRef = collection(db, "AUTH");
   const q = query(collectionRef, where('email', '==', user));

   const unsub = onSnapshot(q, (snapshot) => {
     setUserInfo(
         snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
     );
 });
 return unsub

 },[user])

 useEffect(()=>{
     userInfo.map((info)=>{
       setInfo({
         email:info?.email,
         password:info?.password,
         fname:info?.fname,
         lname:info?.lname,
         role:info?.role
       })
     })
 },[userInfo])

 

  
  if (!open) return null;
  return ReactDom.createPortal(
    <div>
      <div className=" flex flex-col fixed left-0 right-0 bottom-0 top-0  z-50 justify-center items-center " >
      <div className=" bg-black/30 flex flex-col fixed left-0 right-0 bottom-0 top-0  z-30 justify-center items-center " onClick={closeModal}/>

               <div className=' w-auto p-10 flex flex-col items-center relative rounded-md  z-50 bg-white'>
                <div className="absolute right-4 top-4 z-40  ">
                <CloseIcon className='group-hover:stroke-white stroke-sprGray50 hover:stroke-sprGray80 active:stroke-sprPrimary h-5' onClick={closeModal} />
                </div>
                <div className='flex space-x-10'>
                        <aside>
                            <ul className='text-sm'>
                                <li onClick={()=>{setIndex(1)}} className={index === 1 ? 'font-bold': ''}>Account Settings</li>
                                <li onClick={()=>{setIndex(2)}} className={index === 2 ? 'font-bold': ''}>Display</li>
                            </ul>
                        </aside>
                        <main className=' w-auto'>
                           <div className={index !== 1? 'hidden':'block'}>
                           <h1 className='font-semibold'>Edit Profile</h1>
                            <section className='flex-col sm:flex-row flex sm:space-x-4 '>
                                
                            <div className='flex flex-col flex-auto'><label> First Name</label> <input type="text"  className=' ring-2 ring-sprPrimary/60 focus:outline-none pl-2 py-1 rounded-full' value={info.fname}/></div>
                            <div className='flex flex-col flex-auto'><label> Last Name</label> <input type="text"  className='ring-2 ring-sprPrimary/60 focus:outline-none pl-2 py-1 rounded-full' value={info.lname}/></div>

                            
                            </section>
                            <div className='flex flex-col'><label> Role</label> <input type="text"   className='ring-2 ring-sprPrimary/60 focus:outline-none pl-2 py-1 rounded-full'value={info.role} /></div>
                            <div className='flex flex-col'><label>Email</label> <input type="text"  className='ring-2 ring-sprPrimary/60 focus:outline-none pl-2 py-1 rounded-full'value={info.email}/></div>
                            {/* <div className='flex flex-col'><label> Password</label><input type="text"  className='ring-2 ring-sprPrimary/60 focus:outline-none pl-2 py-1 rounded-full' /></div> */}
                           </div>

                           <button className='bg-sprPrimary hover:bg-sprPrimaryOffLight font-medium py-1 px-2 mt-2 rounded-full text-white'> Save</button>
                        </main>


                </div>


              
								
               </div>
        </div>
    </div>,
    document.getElementById("portal")
    )
}
