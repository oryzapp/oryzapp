import { writeBatch, collection, deleteDoc, doc, onSnapshot, query, where, collectionGroup } from 'firebase/firestore';
import React from 'react'
import ReactDom from 'react-dom'
import db, { storage } from "../firebase-config";
import { useEffect } from 'react';
import { useState } from 'react';
import { ReactComponent as CloseIcon } from '../assets/close.svg';
import { deleteObject, ref } from 'firebase/storage';
import ModalSuccess from './ModalSuccess';



const ModalDelete = ({ open, closeModal, modalId, delId, delUrl }) => {

    console.log('I am MOdal Delete');
    console.log(delUrl);

    const [dryList, setDryList] = useState([])
    const [wetList, setWetList] = useState([])
    const [vsDryList, setVsDryList] = useState([])
    const [vsWetList, setVsWetList] = useState([])
    const [rsDryList, setRsDryList] = useState([])
    const [rsWetList, setRsWetList] = useState([])
    const [gcDryList, setGcDryList] = useState([])
    const [gcWetList, setGcWetList] = useState([])
    const [ycDryList, setYcDryList] = useState([])
    const [ycWetList, setYcWetList] = useState([])

    useEffect(() => {



        const dryList = query(collection(db, "SPR/Rice_Accessions/Rice_List/Dry_Season/Raw_Rice_List/"), where("accessionId", "==", modalId))
        onSnapshot(dryList, (snapshot) => {
            setDryList(
                snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
        });

        const wetList = query(collection(db, "SPR/Rice_Accessions/Rice_List/Wet_Season/Raw_Rice_List/"), where("accessionId", "==", modalId))
        onSnapshot(wetList, (snapshot) => {
            setWetList(
                snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
        });

        // Vegetative Stage
        const vsDryList = query(collection(db, "SPR/Rice_Seasons/Seasons/Dry_Season/Stages/Vegetative_Stage/VS_Raw_Rice_Data"), where("accessionId", "==", modalId))
        onSnapshot(vsDryList, (snapshot) => {
            setVsDryList(
                snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
        });
        const vsWetList = query(collection(db, "SPR/Rice_Seasons/Seasons/Wet_Season/Stages/Vegetative_Stage/VS_Raw_Rice_Data"), where("accessionId", "==", modalId))
        onSnapshot(vsWetList, (snapshot) => {
            setVsWetList(
                snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
        });
        // Reproductive Stage
        const rsDryList = query(collection(db, "SPR/Rice_Seasons/Seasons/Dry_Season/Stages/Reproductive_Stage/RS_Raw_Rice_Data"), where("accessionId", "==", modalId))
        onSnapshot(rsDryList, (snapshot) => {
            setRsDryList(
                snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
        });
        const rsWetList = query(collection(db, "SPR/Rice_Seasons/Seasons/Wet_Season/Stages/Reproductive_Stage/RS_Raw_Rice_Data"), where("accessionId", "==", modalId))
        onSnapshot(rsWetList, (snapshot) => {
            setRsWetList(
                snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
        });

        // Grain Characteristics
        const gcDryList = query(collection(db, "SPR/Rice_Seasons/Seasons/Dry_Season/Stages/Grain_Characteristics/GC_Raw_Rice_Data"), where("accessionId", "==", modalId))
        onSnapshot(gcDryList, (snapshot) => {
            setGcDryList(
                snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
        });
        const gcWetList = query(collection(db, "SPR/Rice_Seasons/Seasons/Wet_Season/Stages/Grain_Characteristics/GC_Raw_Rice_Data"), where("accessionId", "==", modalId))
        onSnapshot(gcWetList, (snapshot) => {
            setGcWetList(
                snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
        });
        // Yield Components
        const ycDryList = query(collection(db, "SPR/Rice_Seasons/Seasons/Dry_Season/Stages/Yield_Components/YC_Raw_Rice_Data"), where("accessionId", "==", modalId))
        onSnapshot(ycDryList, (snapshot) => {
            setYcDryList(
                snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
        });
        const ycWetList = query(collection(db, "SPR/Rice_Seasons/Seasons/Wet_Season/Stages/Yield_Components/YC_Raw_Rice_Data"), where("accessionId", "==", modalId))
        onSnapshot(ycWetList, (snapshot) => {
            setYcWetList(
                snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
        });



    }, [modalId])

    const [isPromptOpen, setIsPromptOpen] = useState(false)
    const message = `Succesfully Deleted! CL-R${modalId}`

    const [deleteList, setDeleteList] = useState([])

    const deleteRiceAccession = async (accessionId, id) => {
        try {

            console.log('Iam' + accessionId);
            const batch = writeBatch(db)

            var listDeleted= []

            const docRef = doc(db, "SPR/Rice_Accessions/Accession_IDs", id);
            const imageRef= ref(storage, delUrl)

            dryList.forEach((rice) => {
                batch.delete(doc(db, "SPR/Rice_Accessions/Rice_List/Dry_Season/Raw_Rice_List", rice.id))
                listDeleted.push(rice.id)
            })
            wetList.forEach((rice) => {
                batch.delete(doc(db, "SPR/Rice_Accessions/Rice_List/Wet_Season/Raw_Rice_List", rice.id))
                listDeleted.push(rice.id)

            })

            // Vegetative Stage
            vsWetList.forEach((rice) => {
                batch.delete(doc(db, "SPR/Rice_Seasons/Seasons/Wet_Season/Stages/Vegetative_Stage/VS_Raw_Rice_Data", rice.id))
                listDeleted.push(rice.id)

            })
            vsDryList.forEach((rice) => {
                batch.delete(doc(db, "SPR/Rice_Seasons/Seasons/Dry_Season/Stages/Vegetative_Stage/VS_Raw_Rice_Data", rice.id))

            })
            // Reproductive Stage
            rsWetList.forEach((rice) => {
                batch.delete(doc(db, "SPR/Rice_Seasons/Seasons/Wet_Season/Stages/Reproductive_Stage/RS_Raw_Rice_Data", rice.id))
                listDeleted.push(rice.id)
                
            })
            rsDryList.forEach((rice) => {
                batch.delete(doc(db, "SPR/Rice_Seasons/Seasons/Dry_Season/Stages/Reproductive_Stage/RS_Raw_Rice_Data", rice.id))
                listDeleted.push(rice.id)
            })
            // Grain Characteristics
            gcWetList.forEach((rice) => {
                batch.delete(doc(db, "SPR/Rice_Seasons/Seasons/Wet_Season/Stages/Grain_Characteristics/GC_Raw_Rice_Data", rice.id))
                listDeleted.push(rice.id)

            })
            gcDryList.forEach((rice) => {
                batch.delete(doc
                    (db, "SPR/Rice_Seasons/Seasons/Dry_Season/Stages/Grain_Characteristics/GC_Raw_Rice_Data", rice.id))
                listDeleted.push(rice.id)

            })
            // Yield Components
            ycWetList.forEach((rice) => {
                batch.delete(doc(db, "SPR/Rice_Seasons/Seasons/Wet_Season/Stages/Yield_Components/YC_Raw_Rice_Data", rice.id))
                listDeleted.push(rice.id)

            })
            ycDryList.forEach((rice) => {
                batch.delete(doc(db, "SPR/Rice_Seasons/Seasons/Dry_Season/Stages/Yield_Components/YC_Raw_Rice_Data", rice.id))
                listDeleted.push(rice.id)

            })

            await batch.commit()
            await deleteDoc(docRef);
            console.log('I am in last part');
            console.log(delUrl);
            setIsPromptOpen(true)
            setTimeout(()=>{
                setIsPromptOpen(false)
                closeModal()
            },1000)
            if(delUrl === undefined || delUrl === ''){
                console.log('error');
            }else{
                await deleteObject(imageRef)

            }


        } catch (error) {
            console.log(error);
        }

    };

    if (!open) return null

    return ReactDom.createPortal(
        <>
        < div className='h-screen w-screen top-0 bottom-0 right-0 left-0  absolute z-50'>
            <ModalSuccess open={isPromptOpen} close={()=>{setIsPromptOpen(false)}} message={message}/>
            <div className={isPromptOpen === true ? "hidden":" fixed left-0 right-0 bottom-0 top-0  bg-black/70 flex justify-center items-center"}>
                <div className='h-72 w-72 rounded-md  bg-white flex flex-col items-center justify-center p-2 relative'>
                    <div className="absolute top-4  right-4 z-50 ">
                        {/* <button onClick={closeModal}>
                            <img className="relative" src={closeIcon} alt="" />
                        </button> */}
                        <CloseIcon className='group-hover:stroke-white stroke-sprGray50 hover:stroke-sprGray80 active:stroke-sprPrimary h-5' onClick={closeModal}/>
                    </div>
                    <h1 className='text-lg font-medium text-center'>Are you sure you want to delete <big className='text-sprPrimaryDark'>CL-R{modalId}</big> ?</h1>
                    <h1 className='text-sm text-center text-sprGray70'>This will also delete all Rice Data containing the Rice Accession</h1>
                    <div className='flex gap-3 mt-6'>
                        <button onClick={closeModal} className='rounded-full   bg-sprGray40 p-2  text-white hover:bg-sprGray10 hover:text-sprGray50'>Cancel</button>
                        <button onClick={() => {
                            
                            deleteRiceAccession(modalId, delId);
                            // closeModal()

                        }} className='rounded-full  bg-sprTertiary p-2 text-white hover:bg-sprTertiary/50 hover:text-sprTertiary'>Delete</button>
                    </div>



                </div>
            </div>

         
        </div>
        </>
        ,
        document.getElementById('portal')
    )
}

export default ModalDelete

// vsDryList.forEach((rice) => {
//     console.log('vsDryDelete:' + rice.id);

//     const docRef = doc(db, "SPR/Rice_Seasons/Seasons/Dry_Season/Stages/Vegetative_Stage/VS_Raw_Rice_Data", rice.id)

//     deleteDoc(docRef).then(() => {
//         console.log("Entire Document has been deleted successfully.")
//     })
//         .catch(error => {
//             console.log(error);
//         })
//     return alert('Accession Deleted')

// })

