import React from 'react'
import { ReactComponent as SuccessIcon } from '../assets/success.svg'
import ReactDom from "react-dom";


export default function ModalFailed({ open, close, message }) {
    console.log(message);
    if (!open) return null;
    return ReactDom.createPortal(
        <div className='absolute h-screen w-screen flex justify-center top-0 items-center z-50'>
            <div className=" fixed left-0 right-0 bottom-0 top-0 z-50 bg-black opacity-20  " onClick={close} />
            <div className='absolute  h-80 w-80  rounded-md bg-white z-50 flex flex-col items-center justify-center'>
                <SuccessIcon className=' fill-red-500 h-36' />
                <h1 className='font-medium text-sprGray text-center'>{message}</h1>
            </div>

        </div>,
        document.getElementById("success")

    )
}
