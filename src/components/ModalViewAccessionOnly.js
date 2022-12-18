import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect } from "react";
import ReactDom from "react-dom";
import closeIcon from "../assets/close.svg";
import { ReactComponent as CalendarIcon } from "../assets/calendar-icon.svg"
import { ReactComponent as WetIcon } from "../assets/wet-icon.svg"
import { ReactComponent as DryIcon } from "../assets/dry-icon.svg"
import { useState } from "react";
import db from "../firebase-config";
import { ReactComponent as CloseIcon } from "../assets/close.svg";



export default function ModalViewAccessionOnly({ open, closeModal }) {

    // const [riceAccessions, setRiceAccessions] = useState([])

    // useEffect(() => {

    //     const collectionRef = collection(db, "SPR/Rice_Accessions/Accession_IDs");
    //     const q = query(collectionRef, where('accessionId', '==', modalId));

    //     const unsub = onSnapshot(q, (snapshot) => {
    //         setRiceAccessions(
    //             snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    //         );
    //     });

    //     return unsub;


    // }, [open])



    if (!open) return null;
    return ReactDom.createPortal(
        <>
            <div className=" fixed left-0 right-0 bottom-0 top-0 z-50 bg-black opacity-70 " />
            <div className=" flex flex-col absolute left-3 right-3 bottom-16 top-16 sm:left-12 sm:right-12 md:left-28 md:right-28 lg:left-1/4 lg:right-1/4 z-50 bg-white rounded-xl  px-4 pt-8 pb-4   ">
                {/* button */}
                <div className="absolute right-4 top-4 z-50 ">
                    {/* <button onClick={closeModal} >
                        <img className="relative" src={closeIcon} alt="" />
                    </button> */}
                    <CloseIcon className='group-hover:stroke-white stroke-sprGray50 hover:stroke-sprGray80 active:stroke-sprPrimary h-5' onClick={closeModal}/>
                </div>
                {/* main */}

            </div>
        </>,
        document.getElementById('portal')
    )
}
