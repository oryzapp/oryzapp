import React, { useEffect, useState } from 'react'
import { ReactComponent as CloseIcon } from '../assets/close.svg';
import { ReactComponent as EditIcon } from '../assets/edit-icon.svg'
import ReactDom from "react-dom";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase-config';
import db from "../firebase-config";
import { collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore';
import { QRCodeCanvas } from 'qrcode.react';





export default function ModalProfile({open, closeModal}) {

  const [user,setUser] = useState([])

  useEffect(()=>{
		const unsub = onAuthStateChanged(auth, async (user) => {
      // console.log(user);
      setUser(user.email)   
      
      // const docRef = doc(db, 'AUTH',user)
      // const docSnap = await getDoc(docRef);
      // console.log(docSnap.data());
    })
    return unsub

  },[])

  console.log(user);

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
        console.log(info?.email);
        console.log(info?.password);
        console.log(info?.fname);
        console.log(info?.lname);
        console.log(info?.role);
        setInfo({
          email:info?.email,
          password:info?.password,
          fname:info?.fname,
          lname:info?.lname,
          role:info?.role
        })
      })
  },[userInfo])

  const toQRCode = {
    email: info?.email,
    password: info?.password
}

  // Download QR Code-------------->
  const downloadQR = () => {
    const canvas = document.getElementById(`qr-gen`);
    const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${info?.email}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}


  if(!open) return null;
  return ReactDom.createPortal(
    <div>
      <div className=" flex flex-col fixed left-0 right-0 bottom-0 top-0  z-50 justify-center items-center " >
      <div className=" bg-black/30 flex flex-col fixed left-0 right-0 bottom-0 top-0  z-30 justify-center items-center " onClick={closeModal}/>

               <div className='bg-white h-60 w-96 p-10 flex items-start relative rounded-md  z-50'>
                <div className="absolute right-4 top-4 z-40  ">
            <CloseIcon className='group-hover:stroke-white stroke-sprGray50 hover:stroke-sprGray80 active:stroke-sprPrimary h-5' onClick={closeModal} />
                </div>
                  <div className='bg-yellow-400 flex-auto'>
										  {/* Name */}
											<div >
                      <div className='font-medium'>Kumusta,</div>
                      <h1 className='text-sprPrimary text-2xl font-medium'>{info.fname === undefined ? 'bee': info.fname}</h1>
                      {/* <h1 className='text-sprPrimary text-2xl font-medium'>{user.displayName === null ? 'Edit your name' : user.displayName}</h1> */}
                    </div>
										{/* Role */}
                  <div className='flex flex-col -space-y-2'>
                    <small className='text-sprPrimary font-medium'>ROLE</small>
                    <h6 className='text-lg font-medium text-sprGray'>{info.role}</h6>
                  </div>
										{/* Position */}
                  {/* <div className='flex flex-col -space-y-2'>
                    <small className='text-sprPrimary font-medium'>POSITION</small>
                    <h6 className='text-lg font-medium text-sprGray'>Research Staff</h6>
                  </div> */}
									
									</div>
									<div className="bg-blue-300 "
                            onClick={downloadQR}
                  
                  >

                    <QRCodeCanvas className='rounded-md' id={`qr-gen`} value={JSON.stringify(toQRCode)} bgColor="#FAFAFA" fgColor="rgba(18, 20, 20, 0.8)" includeMargin={true} size={150} />


									</div>
               </div>
        </div>
    </div>,
    document.getElementById("portal")
  )
}

