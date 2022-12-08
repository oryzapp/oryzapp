import React from 'react'
import {ReactComponent as SuccessIcon} from '../assets/success.svg'

export default function ModalSuccess({open, close}) {
  if (!open) return null;
  return (
   <>
            <div className=" fixed left-0 right-0 bottom-0 top-0 z-50 bg-black opacity-20  " onClick={close} />
            <div className='left-20 right-20 bottom-32 top-16 bg-white z-50 flex'>
                <SuccessIcon/>
            </div>

   </>
  )
}
