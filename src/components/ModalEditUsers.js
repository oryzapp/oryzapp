import React from 'react'
import { ReactComponent as CloseIcon } from '../assets/close.svg';
import { ReactComponent as UserIcon } from '../assets/user-icon.svg';
import { ReactComponent as AdminIcon } from '../assets/admin-icon.svg';
import { ReactComponent as DisabledIcon } from "../assets/disabled-icon.svg"
import { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { decode, encode } from 'string-encode-decode';




export default function ModalEditUsers({ open, closeModal, modalId, modalEmail,modalRole, modalPassword }) {

    console.log('---------');
    console.log(modalRole);
    console.log(modalPassword);
    console.log(decode (modalPassword));

    console.log(modalId);
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
                        <div className='h-52 w-52 bg-slate-200 flex items-center justify-center'>
                            {/* <QRCodeCanvas id={`qr-gen-${rice.accessionId}`} className="hidden sm:block rounded-xl" value={`${rice.accessionId}_${rice.riceSeason}_Season_${rice.riceYear}`} bgColor="#FAFAFA" fgColor="rgba(18, 20, 20, 0.8)" includeMargin={true} size={150} /> */}
                            <QRCodeCanvas className='rounded-md' value={{email: modalEmail, password: modalPassword}}  includeMargin={true} size={160}/>
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
