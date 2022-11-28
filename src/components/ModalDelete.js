import { writeBatch, collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore';
import React from 'react'
import ReactDom from 'react-dom'
import closeIcon from "../assets/close.svg"
import db from "../firebase-config";
import { useEffect } from 'react';
import { useState } from 'react';



const ModalDelete = ({ open, closeModal, modalId, delId }) => {

    const [dryList, setDryList] = useState([])

    useEffect(() => {

        const collectionRef = collection(db, "SPR/Rice_Accessions/Rice_List/Dry_Season/Raw_Rice_List/");

        const dryList = query(collectionRef, where("accessionId", "==", modalId))
        const unsub = onSnapshot(dryList, (snapshot) => {
            setDryList(
                snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
        });
    }, [modalId])


    console.log('I am dryList' + dryList);
    dryList.map((item) => {
        console.log(item.id);

    })

    const deleteRiceAccession = async (accessionId, id) => {
        try {
            console.log('Iam' + accessionId);
            const docRef = doc(db, "SPR/Rice_Accessions/Accession_IDs", id);

            const dryBatch = writeBatch(db)



            dryList.forEach((rice) => {
                const dryDocRef = doc(db, "SPR/Rice_Accessions/Rice_List/Dry_Season/Raw_Rice_List", rice.id)
                dryBatch.delete(dryDocRef)
            })

            await dryBatch.commit()
            await deleteDoc(docRef);
            return alert('Accession Deleted')


        } catch (error) {
            console.log(error);
        }

    };

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
                            deleteRiceAccession(modalId, delId);
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