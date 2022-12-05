import { doc, updateDoc } from 'firebase/firestore';
import React from 'react'
import { ReactComponent as CloseIcon } from '../assets/close.svg';
import db from "../firebase-config";



export default function ModalChangeRole({open, closeModal, modalId, roleChoice, modalEmail}) {

    var color;
    switch (roleChoice) {
        case 'Administrator':
            color = 'sprPrimary'
            break;
        case 'User':
            color = 'yellow-500'
            break;
        case 'Disabled':
            color = 'sprTertiary'
            break;
    
        default:
            break;
    }

    const changeRole = async() => {
      try {
          const docRef = doc(db, "AUTH", modalId)
        const payLoad ={
            role: roleChoice
        }
          await updateDoc(docRef, payLoad);
          closeModal()
          alert('Role Updated')
      } catch (error) {
        console.log(error);
      }
    }

    if(!open) return null;
  return (
    <>
     <div className=" fixed left-0 right-0 bottom-0 top-0 z-50 bg-black opacity-70 " />
            <div className=" flex flex-col fixed left-0 right-0 bottom-0 top-0  z-50  justify-center items-center ">
                <div className='h-72 w-96  bg-white rounded-md relative flex justify-center items-center flex-col  gap-2 '>
                    <div className="absolute top-4  right-4 z-50 ">
                      
                        <CloseIcon className='group-hover:stroke-white stroke-sprGray50 hover:stroke-sprGray80 active:stroke-sprPrimary h-5' onClick={closeModal}/>
                    </div>
                    <h1 className='text-lg font-medium text-center whitespace-pre-line'>Are you sure you want to set </h1><h3 className={`text-md text-${color} `}>{modalEmail}</h3>
                    as <h1 className={`font-medium text-xl text-${color}`}> {roleChoice}?</h1>
                    <div className='flex gap-3 mt-6'>
                        <button onClick={closeModal} className='rounded-full   bg-sprGray40 p-2  text-white hover:bg-sprGray10 hover:text-sprGray50 active:bg-sprGray60' >Cancel</button>
                        <button onClick={changeRole} className={`rounded-full   bg-${color} p-2 text-white hover:bg-${color}/50 hover:text-${color} active:bg-${color} active:text-white`}>Set as {roleChoice}</button>
                    </div>

                </div>

            </div>
    </>
  )
}
