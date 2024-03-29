import React from 'react'
import { ReactComponent as SuccessIcon } from '../assets/success.svg'
import { ReactComponent as FailedIcon } from '../assets/error.svg'
import ReactDom from "react-dom";


export default function ModalFailed({ open, close, message }) {
    console.log(message);
    if (!open) return null;
    return ReactDom.createPortal(
        <div className='absolute h-screen w-screen flex justify-center top-0 items-center z-50'>
            <div className=" fixed left-0 right-0 bottom-0 top-0 z-50 bg-black opacity-20  " onClick={close} />
            <div className='absolute  h-96 w-96  rounded-md bg-white z-50 flex flex-col items-center justify-center '>
                <FailedIcon className=' fill-red-500 h-36' />
                <h1 className='font-bold'>Account Disabled</h1>
                <h2 className=' text-sprGray text-center'> Sorry, your account is disabled by the Administrator.Please contact your admin personally or send an email to</h2>
                <a href='https://mail.google.com' className=' text-sprPrimary500 text-center'>
                    clsuspecialpurposerice@gmail.com.
                </a>

            </div>

        </div>,
        document.getElementById("success")

    )
}
