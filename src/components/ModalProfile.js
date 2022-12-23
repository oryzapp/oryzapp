import React from 'react'
import { ReactComponent as CloseIcon } from '../assets/close.svg';
import ReactDom from "react-dom";




export default function ModalProfile({open, closeModal}) {
  if(!open) return null;
  return ReactDom.createPortal(
    <div>
        <div className=" bg-black/20 flex flex-col fixed left-0 right-0 bottom-0 top-0  z-50  justify-center items-center " onClick={closeModal}>
           

               <div className='bg-white h-80 w-80 p-10 flex items-start relative rounded-md'>
                <div className="absolute right-4 top-4 z-50 ">

            <CloseIcon className='group-hover:stroke-white stroke-sprGray50 hover:stroke-sprGray80 active:stroke-sprPrimary h-5' onClick={closeModal} />
                </div>
                  <div className='flex-auto'>
                    <h1>Kumusta,</h1><h1 className='text-sprPrimary text-2xl font-medium'>Ben</h1>
                  </div>
                  <div className='bg-sprPrimaryOffLight w-20 h-20 rounded-full'></div>

               </div>
        </div>
    </div>,
    document.getElementById("portal")
  )
}
