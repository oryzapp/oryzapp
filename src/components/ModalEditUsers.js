import React from 'react'
import { ReactComponent as CloseIcon } from '../assets/close.svg';
import { ReactComponent as UserIcon } from '../assets/user-icon.svg';
import { ReactComponent as AdminIcon } from '../assets/admin-icon.svg';
import { ReactComponent as DisabledIcon } from "../assets/disabled-icon.svg"




export default function ModalEditUsers({ open, closeModal, modalId }) {

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
                        <div className='h-40 w-40 bg-slate-300'></div>
                        <h1>exampleEmail@email.com</h1>
                        <div className='flex gap-1'>
                            <div className='bg-sprGray50 flex  items-center p-2 gap-1 rounded-full'>
                                <AdminIcon className='fill-white h-2' />
                                <h1 className='text-white font-medium text-sm'>Administrator</h1>
                            </div>
                            <div className='bg-sprGray50 flex  items-center p-2 gap-1 rounded-full'>
                                <UserIcon className='fill-white h-3' />
                                <h1 className='text-white font-medium text-sm'>User Only</h1>
                            </div>
                            <div className='bg-sprGray50 flex  items-center p-2 gap-1 rounded-full'>
                                <DisabledIcon className='stroke-white h-3' />
                                <h1 className='text-white font-medium text-sm'>Disabled</h1>
                            </div>
                        </div>

                    </div>

                </div>
            </form>


        </div>
    )
}
