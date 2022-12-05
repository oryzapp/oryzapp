import React from 'react'
import { ReactComponent as CloseIcon } from '../assets/close.svg';
import { ReactComponent as UserIcon } from '../assets/user-icon.svg';
import { ReactComponent as AdminIcon } from '../assets/admin-icon.svg';
import { ReactComponent as DisabledIcon } from "../assets/disabled-icon.svg"
import downloadIcon from '../assets/download-icon.svg'

import { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { decode, encode } from 'string-encode-decode';




export default function ModalEditUsers({ open, closeModal, modalId, modalEmail,modalRole, modalPassword }) {

    const toQRCode = {
        email: modalEmail,
        password: modalPassword
    }

     // Download QR Code-------------->
    const downloadQR = () => {
        const canvas = document.getElementById(`qr-gen`);
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `${modalEmail}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    if (!open) return null;
    return (
        <div>
            <form>
                <div className=" fixed left-0 right-0 bottom-0 top-0 z-50 bg-black opacity-70 " />
                <div className=" flex flex-col fixed left-0 right-0 bottom-0 top-0  z-50  justify-center items-center ">
                    <div className='h-96 w-96 bg-white rounded-md relative flex justify-center items-center flex-col p-4 gap-2 '>
                        <div className="absolute top-4  right-4 z-50 ">
                            <CloseIcon className='group-hover:stroke-white stroke-sprGray50 hover:stroke-sprGray80 active:stroke-sprPrimary h-5' onClick={closeModal} />
                        </div>
                        <div className='h-52 w-52 bg-slate-200 hover:bg-sprPrimaryOffLight active:bg-sprPrimary flex items-center justify-center relative rounded-sm' 
                            onClick={downloadQR}
                        >

                            <QRCodeCanvas id='qr-gen' className='rounded-md' value={JSON.stringify(toQRCode)}  includeMargin={true} size={160} />
                            {/* <div className='bg-sprPrimary/30 h-5 w-5  rounded-full  absolute right-1 top-1' >
                                <img src={downloadIcon} alt="" />
                            </div> */}
                        </div>
                        <h1 className='text-sprPrimary font-medium'>{modalEmail}</h1>
                        <div className='flex gap-1'>
                            <div className={modalRole === 'Administrator' ? "bg-sprPrimary flex  items-center p-2 gap-1 rounded-full":"hidden"}>
                                <AdminIcon className='fill-white h-2' />
                                <h1 className='text-white font-medium text-sm'>Administrator</h1>
                            </div>
                            <div className={modalRole === 'User' ? "bg-yellow-500 flex  items-center p-2 gap-1 rounded-full":"hidden"}>
                                <UserIcon className='fill-white h-3' />
                                <h1 className='text-white font-medium text-sm'>User Only</h1>
                            </div>
                            <div className={modalRole === 'Disabled' ? "bg-sprTertiary flex  items-center p-2 gap-1 rounded-full":"hidden"}>
                                <DisabledIcon className='fill-white h-3' />
                                <h1 className='text-white font-medium text-sm'>Disabled</h1>
                            </div>
                            
                        </div>

                    </div>

                </div>
            </form>


        </div>
    )
}
