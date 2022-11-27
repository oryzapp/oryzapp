import React from 'react'
import ReactDom from 'react-dom'
import closeIcon from "../assets/close.svg"
import { deleteRiceAccession } from '../util'

const ModalDelete = ({ open, closeModal, modalId, delId }) => {
    if (!open) return null

    return ReactDom.createPortal(
        <>
            <div className=" fixed left-0 right-0 bottom-0 top-0 z-50 bg-black opacity-70 " />
            <div className=" flex flex-col fixed left-0 right-0 bottom-0 top-0  z-50  justify-center items-center ">
                <div className='h-72 w-72 bg-white rounded-md relative flex justify-center items-center flex-col p-4 gap-2 '>
                    <div className="absolute top-5 right-5 z-50 ">
                        <button onClick={closeModal}>
                            <img className="relative" src={closeIcon} alt="" />
                        </button>
                    </div>
                    <h1 className='text-lg font-medium text-center'>Are you sure you want to delete <big className='text-sprPrimaryDark'>{modalId}</big> ?</h1>
                    <h1 className='text-sm text-center text-sprGray70'>This will also delete all Rice Data containing the Rice Accession</h1>
                    <div className='flex gap-3 mt-6'>
                        <button onClick={closeModal} className='rounded-full   bg-sprGray40 p-2  text-white hover:bg-sprGray10 hover:text-sprGray50'>Cancel</button>
                        <button onClick={() => {
                            deleteRiceAccession(delId);
                            closeModal()

                        }} className='rounded-full  bg-sprTertiary p-2 text-white hover:bg-sprTertiary/50 hover:text-sprTertiary'>Delete</button>
                    </div>

                </div>

            </div>
        </>,
        document.getElementById('portal')
    )
}

export default ModalDelete