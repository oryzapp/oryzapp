import { onAuthStateChanged, reload } from 'firebase/auth';
import { collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import ReactDom from "react-dom";
import { ReactComponent as CloseIcon } from '../assets/close.svg';
import { auth } from '../firebase-config';
import db from "../firebase-config";
import { decode, encode } from 'string-encode-decode';
import ModalSuccess from './ModalSuccess';




export default function ModalSettings({ open, closeModal }) {

  // Navigation -------------------->
  const [index, setIndex] = useState(1)

  //  Get Current User Email -------------------->
  const [user, setUser] = useState([])
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setUser(user.email)
    })
    return unsub

  }, [])

  // Get Current User Info -------------------->
  const [userInfo, setUserInfo] = useState([])
  const [initialInfo, setInitialInfo] = useState([])
  const [info, setInfo] = useState({
    email: '',
    password: '',
    fname: '',
    lname: '',
    role: ''

  })

  useEffect(() => {

    const collectionRef = collection(db, "AUTH");
    const q = query(collectionRef, where('email', '==', user));

    const unsub = onSnapshot(q, (snapshot) => {
      setUserInfo(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
    return unsub

  }, [user])
  // Store user info in info -------------------->
  useEffect(() => {
    userInfo.map((info) => {
      setInfo({
        email: info?.email,
        password: decode(info?.password),
        fname: info?.fname,
        lname: info?.lname,
        role: info?.role
      })
      setInitialInfo({
        email: info?.email,
        password: decode(info?.password),
        fname: info?.fname,
        lname: info?.lname,
        role: info?.role
      })
    })
  }, [userInfo])

  console.log(info);

  //  Handle Input Changes -------------------->
  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  }


  const [isPromptOpen, setIsPromptOpen] = useState(false)
  //  Handle Submit
  const submitEdit = async (e) => {
    try {
      e.preventDefault()
      const docRef = doc(db, "AUTH", info.email);
      const payLoad = {
        email: info?.email,
        password: encode(info?.password),
        fname: info?.fname,
        lname: info?.lname,
        role: info?.role
      }

      if (info.password.length < 8) {
        console.log('mmm');
      }
      else {

        await updateDoc(docRef, payLoad);
        setIsPromptOpen(true)
        setTimeout(() => {
          setIsPromptOpen(false)
          closeModal()
        }, 1000)



      }



    } catch (error) {

    }
  }


  if (!open) return null;
  return ReactDom.createPortal(
    <div>
      <form onSubmit={submitEdit}>
        <div className=" flex flex-col fixed left-0 right-0 bottom-0 top-0  z-50 justify-center items-center " >
          <ModalSuccess open={isPromptOpen} close={() => { setIsPromptOpen(false) }} message={'Profile Updated Successfully!'} />

          {/* Close onClick Outside */}
          <div className=" bg-black/30 flex flex-col fixed left-0 right-0 bottom-0 top-0  z-30 justify-center items-center " onClick={() => {
            closeModal()
            setInfo(initialInfo)
          }} />

          {/* Settings */}
          <div className=' w-2/3 h-3/4 px-8 py-6  flex flex-col relative rounded-md  overflow-auto scrollbar z-50 bg-white'>
            {/* Close Button */}
            <div className="absolute right-4 top-4 z-40  ">
              <CloseIcon className='group-hover:stroke-white stroke-sprGray50 hover:stroke-sprGray80 active:stroke-sprPrimary h-5' onClick={() => {
                closeModal()
                setInfo(initialInfo)
              }} />
            </div>

            {/* Form */}
            <div className='bg-whiteflex space-y-3 flex-col flex-auto'>
              <div className=' '>
                <h1 className='text-2xl font-medium'>Edit Profile</h1>
              </div>
              {/* Inputs */}
              <div className='flex-auto overflow-auto scrollbar'>
                <div className='flex flex-col space-y-3 '>
                  <div className='flex flex-col space-y-3 pl-3'>
                    {/* Basic Info */}
                    <h4 className='text-sm font-medium'>Basic Info</h4>
                    <div className='flex md:space-x-3  flex-col md:flex-row'>
                      {/* First Name */}
                      <div className="flex flex-col">
                        <label className="text-sm text-slate-500" htmlFor="fname">
                          First Name
                        </label>
                        <input type="text" placeholder="e.g. Juan" className="border border-slate-500 text-sm w-64  rounded-full font-light sm:p-1 lg:p-3  focus:outline-2 focus:outline-sprPrimary" name='fname' value={info.fname} onChange={handleChange} />
                      </div>
                      {/* Last Name */}
                      <div className="flex flex-col">
                        <label className="text-sm text-slate-500" htmlFor="lname">
                          Last Name
                        </label>
                        <input type="text" placeholder="e.g. Dela Cruz" className="border border-slate-500 text-sm w-64  rounded-full font-light sm:p-1 lg:p-3  focus:outline-2 focus:outline-sprPrimary" name='lname' value={info.lname} onChange={handleChange} />
                      </div>
                    </div>
                    {/* Role */}
                    <div className="flex flex-col">
                      <label className="text-sm text-slate-500" htmlFor="fname">
                        Role
                      </label>
                      <input disabled type="text" placeholder="Role" className="bg-slate-100 text-sm w-64  rounded-full font-light  sm:p-1 lg:p-3  focus:outline-2 focus:outline-sprPrimary" name='role' value={info.role} />
                    </div>

                  </div>

                  <div className='flex flex-col space-y-3 pl-3'>
                    <h4 className='text-sm font-medium'>Email and Password</h4>
                    {/* Email */}
                    <div className="flex flex-col">
                      <label className="text-sm text-slate-500" htmlFor="fname">
                        Email
                      </label>
                      <input disabled type="text" placeholder="email" className="bg-slate-100 text-sm w-64  rounded-full font-light sm:p-1 lg:p-3  focus:outline-2 focus:outline-sprPrimary" name='email' value={info.email} />
                    </div>
                    {/* Password */}
                    <div className="flex flex-col">
                      <label className="text-sm text-slate-500" htmlFor="fname">
                        Password
                      </label>
                      <input type="password" className="border border-slate-500 text-sm w-64  rounded-full font-light sm:p-1 lg:p-3  focus:outline-2 focus:outline-sprPrimary" name='password' value={info.password} onChange={handleChange} />
                    </div>

                  </div>
                </div>

              </div>
              {/* Button */}
              <div className=' '>
                <div className='flex  justify-end space-x-3 '>
                  <button className="border-2 border-slate-400 text-sm w-24 font-bold text-slate-400 hover:border-slate-300/0 hover:bg-slate-300  hover:text-slate-100 active:bg-slate-500 active:text-slate-100 rounded-full py-2" onClick={() => {
                    closeModal()
                    setInfo(initialInfo)
                  }}>Cancel</button>
                  <button type="submit" className="bg-sprPrimary text-sm font-bold w-24  hover:bg-slate-300  hover:text-slate-100 active:bg-slate-500 active:text-slate-100 text-white rounded-full">Save</button>

                </div>

              </div>

            </div>

          </div>
        </div>
      </form>
    </div>,
    document.getElementById("portal")
  )
}
