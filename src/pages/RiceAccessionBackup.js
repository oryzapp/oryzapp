import {
    addDoc,
    collection,
    collectionGroup,
    doc,
    getDoc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    updateDoc,
    where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import ModalAddRiceAcc from "../components/ModalAddRiceAcc";
import ModalRiceInfo from "../components/ModalAccessionsInfo";
import db from "../firebase-config";
import { storage } from "../firebase-config";
import { ref, uploadBytes } from "firebase/storage"
import {
    addRiceAccession,
    editRiceAccessionID,
    deleteRiceAccession,
} from "./../util";
import addIcon from '../assets/add-icon.svg'

import closeIcon from "../assets/close.svg";
import delIcon from "../assets/delete-icon.svg"
import editIcon from "../assets/edit-icon.svg"
import { ReactComponent as SearchIcon } from "../assets/search-icon.svg"
import { ReactComponent as EmptyIllustration } from "../assets/empty-illustration.svg"
import { ReactComponent as ImageIcon } from "../assets/image-icon.svg"
import { v4 } from "uuid";

export default function RiceAccessions() {

    // Open and Close Modal ------------------->
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRiceInfoModalOpen, setIsRiceInfoModalOpen] = useState(false);
    // Data in Modal
    const [modalId, setModalId] = useState('')
    const [modalAccession, setModalAccession] = useState([])

    // View Modal
    const getAccessionData = async () => {
        try {
            console.log(modalId);
            const docRef = doc(db, "/SPR/Rice_Accessions/Accession_IDs", modalId)
            const snapshot = await getDoc(docRef)
            const transferData = snapshot.data()
            setModalAccession(transferData)
            console.log('bbb');
        } catch (error) {
            console.log(error);
        }
    }

    console.log('bb');
    console.log(modalAccession);


    // Handle Form Submit ------------------>
    const [imageUpload, setImageUpload] = useState(null)

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const collectionRef = collection(db, "SPR/Rice_Accessions/Accession_IDs");
            const payLoad = {
                accessionId: state.accession,
                classification: state.classification,
                variety: state.variety,
                source: state.source,
                timestamp: serverTimestamp(),
            };

            if (accessionExists === true) {
                alert('Change Accession')
            }
            else {
                if (imageUpload !== null) {
                    const imageRef = ref(storage, `images/${state.accession} `)
                    uploadBytes(imageRef, imageUpload).then(() => {
                        alert("image uploaded")
                    })
                }

                await addDoc(collectionRef, payLoad);



                setIsModalOpen(false)
                setState(initialState)
            }
        } catch (error) {
            alert(error);
        }
    };

    // Form Inputs --------------------->
    const [state, setState] = useState({
        accession: "",
        variety: "",
        source: "",
        classification: "",
    });
    const initialState = {
        accession: "",
        variety: "",
        source: "",
        classification: "",
    }

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    // Check Accession If Exists
    const [accessionExists, setAccessionExists] = useState(false)
    useEffect(() => {


        const result = riceAccessions.find(rice => rice.accessionId === state.accession)
        if (result === undefined) {
            setAccessionExists(false)
        }
        else {
            setAccessionExists(true)
        }


    }, [state.accession])


    // Open Edit Rice Accession ---------->
    const [isEdit, setIsEdit] = useState(false)
    const [editId, setEditId] = useState('')
    const editRiceAccessionID = async (id) => {
        setIsEdit(true)
        setIsModalOpen(true)
        setEditId(id)
        riceAccessions.map((rice) => {
            if (rice.id === id) {
                setState({
                    accession: rice.accessionId,
                    variety: rice.variety,
                    source: rice.source,
                    classification: rice.classification,
                }
                )
            }
        })



    };
    // Submit Edit ---------------->
    const submitEdit = async (e) => {
        e.preventDefault()
        const docRef = doc(db, "SPR/Rice_Accessions/Accession_IDs", editId);
        const payLoad = {
            classification: state.classification,
            variety: state.variety,
            source: state.source,
            timestamp: serverTimestamp(),
        };

        const imageRef = ref(storage, `images/${state.accession} `)
        uploadBytes(imageRef, imageUpload).then(() => {
            alert("image uploaded")
        })
        await updateDoc(docRef, payLoad);
        setIsModalOpen(false)
        setState(initialState)
        setIsEdit(false)
    }
    // Search Box ----------------------->
    const [searchInput, setSearchInput] = useState('')
    const handleSearchInput = (e) => {
        setSearchInput(e.target.value)
    }

    // Search Entered ----------------->
    const startSearch = (e) => {
        e.preventDefault()
    }

    // Display on Search -------------------->
    const [riceAccessions, setRiceAccessions] = useState([]);
    const [search, setSearch] = useState('q')

    useEffect(() => {
        const collectionRef = collection(db, "SPR/Rice_Accessions/Accession_IDs");

        if (searchInput === '') {
            setSearch('q')
        }
        if (searchInput !== '') {
            setSearch('s')
        }

        // Query or List All
        let q = query(collectionRef, orderBy("timestamp", "asc"));

        if (search === 'q') {
            q = query(collectionRef, orderBy("timestamp", "asc"));
        }
        if (search === 's') {
            q = query(collectionRef, where('accessionId', '==', searchInput));
        }

        const unsub = onSnapshot(q, (snapshot) => {
            setRiceAccessions(
                snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
        });

        return unsub;
    }, [search, searchInput]);




    var list = 0

    //  

    return (
        <>
            <div className='h-full w-full flex flex-col rounded-t-xl  sm:rounded-xl bg-slate-50 opacity-90 p-2'>

                {/* Header */}
                <header className=" flex items-center">
                    <button
                        className=" hidden sm:block w-8 h-8 p-2 rounded-full bg-gradient-to-b from-sprPrimary to-sprPrimaryDarkest hover:bg-gradient-to-t hover:from-sprPrimaryLight hover:to-sprPrimaryLight drop-shadow-md"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <img src={addIcon} alt="" />
                    </button>
                    <h1 className="text-3xl font-bold text-sprBlack opacity-80 pl-2">
                        Rice Accessions
                    </h1>
                </header>
                {/* Options */}

                <div className="flex justify-between  pt-1 pb-3">

                    <div className="flex  items-center gap-3 bg-white rounded-full">
                        <div className="relative drop-shadow-md">
                            <form onSubmit={startSearch}>
                                <input
                                    className=" pl-2 py-2 text-sm placeholder:text-sprPrimary/50 text-sprPrimary focus:outline-none focus:border-none  rounded-full  "
                                    type="text"
                                    placeholder="Find a Rice"
                                    value={searchInput}
                                    onChange={handleSearchInput}
                                />
                                <button className="  h-full px-2 rounded-full absolute right-0  bg-sprPrimaryLight">
                                    <SearchIcon stroke=" white" />
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
                {/* Main */}

                <section className=" flex-auto overflow-auto  scrollbar bg-white rounded-lg border border-slate-200">
                    {riceAccessions.length === 0 ? <div className="flex justify-center items-center pt-32 flex-col gap-8 "><EmptyIllustration /><p className="font-medium text-xl text-sprPrimaryOffLight">Plenty of space in the field </p></div> : <div className="flex h-96">



                        <div className="hidden sm:block divide-y divide-slate-300 bg-white h-fit">
                            <div className="px-6 py-2 text-sm font-medium bg-white text-sprPrimary ">#</div>
                            {

                                riceAccessions.map((rice) => (
                                    <div className="px-6 py-2 text-md font-medium text-sprPrimaryLight"> {list = list + 1} </div>
                                ))}
                        </div>
                        <div className="hidden sm:block  flex-auto divide-y divide-slate-300 bg-slate-50 h-fit  ">
                            <div className="px-6 py-2 text-sm font-medium bg-white text-sprPrimary ">Accession</div>
                            {riceAccessions.map((rice) => (
                                <div className="px-6 py-2 text-md font-medium text-sprGray60"> {rice.accessionId === "" ? "---" : rice.accessionId} </div>
                            ))}
                        </div>

                        <div className=" hidden sm:block flex-auto divide-y divide-slate-300 bg-slate-100 h-fit">
                            <div className="px-6 py-2 text-sm font-medium bg-white text-sprPrimary">Classification </div>
                            {riceAccessions.map((rice) => (
                                <div className="px-6 py-2 text-md font-medium text-sprGray60"> {rice.classification === "" ? "---" : rice.classification}</div>
                            ))}
                        </div>
                        <div className="hidden sm:block flex-auto divide-y divide-slate-300 bg-slate-50 h-fit">
                            <div className="px-6 py-2 text-sm font-medium bg-white text-sprPrimary">Variety</div>
                            {riceAccessions.map((rice) => (
                                <div className="px-6 py-2 text-md font-medium text-sprGray60"> {rice.variety === "" ? "---" : rice.variety}</div>
                            ))}
                        </div>

                        <div className="hidden sm:block flex-auto divide-y divide-slate-300 bg-slate-100 h-fit">
                            <div className="px-6 py-2 text-sm font-medium bg-white text-sprPrimary">Source</div>
                            {riceAccessions.map((rice) => (
                                <div className="px-6 py-2 text-md font-medium text-sprGray60"> {rice.source === "" ? "---" : rice.source}</div>
                            ))}
                        </div>
                        <div className="divide-y divide-slate-50   w-full sm:w-auto h-fit ">
                            <div className="px-6 py-2 opacity-0 hidden sm:block text-sm font-medium ">Action</div>
                            {riceAccessions.map((rice) => (
                                <div className="px-6 py-2 flex items-center justify-between gap-2 ">
                                    <div className=" sm:hidden">
                                        <h1 className="text-2xl font-bold text-sprBlack opacity-80">
                                            {rice.accessionId === "" ? "---" : rice.accessionId}
                                        </h1>
                                        <h6 className="text-md  font-medium text-sprGray60">
                                            {rice.variety === "" ? "---" : rice.variety}
                                        </h6>
                                        <h6 className="text-md font-medium text-sprGray60">
                                            {rice.source === "" ? "---" : rice.source}
                                        </h6>
                                    </div>
                                    <button
                                        className=" text-white text-sm bg-gradient-to-b from-sprPrimary to-sprPrimaryDarkest hover:bg-gradient-to-t hover:from-sprPrimaryLight hover:to-sprPrimaryLight drop-shadow-md h-8 w-14 sm:h-6 sm:w-12 rounded-full  shadow-slate-300 "
                                        onClick={() => {
                                            setIsRiceInfoModalOpen(true)
                                            getAccessionData()
                                            setModalId(rice.accessionId)

                                        }}
                                    >
                                        view
                                    </button>


                                    <button
                                        className="hidden lg:block p-1 bg-gradient-to-b from-sprPrimary to-sprPrimaryDarkest hover:bg-gradient-to-t hover:from-sprPrimaryLight hover:to-sprPrimaryLight drop-shadow-md   rounded-full   shadow-slate-300 "
                                        onClick={() => {
                                            editRiceAccessionID(rice.id);
                                        }}
                                    >
                                        <div className="w-4 h-4"><img src={editIcon} alt="" /></div>
                                    </button>
                                    <button
                                        className="hidden lg:block p-1 bg-gradient-to-b from-sprPrimary to-sprPrimaryDarkest rounded-full  hover:bg-gradient-to-t hover:from-sprPrimaryLight hover:to-sprPrimaryLight drop-shadow-md shadow-slate-300 "
                                        onClick={() => {
                                            deleteRiceAccession(rice.id);
                                        }}
                                    >
                                        <div className="w-4 h-4"><img src={delIcon} alt="" /></div>

                                    </button>

                                </div>
                            ))}
                        </div>
                    </div>}
                </section>

                {/* Modal */}
                {/* Add Rice Accession */}
                <ModalAddRiceAcc open={isModalOpen} >
                    <div className="absolute right-5 z-50 ">
                        <button onClick={() => {
                            setIsModalOpen(false)
                            setIsEdit(false)
                            setState(initialState)
                        }}>
                            <img className="relative" src={closeIcon} alt="" />
                        </button>
                    </div>
                    <div className="flex">
                        <h1 className="page-header text-2xl font-bold text-sprGray70">Add Rice Accession</h1>
                    </div>
                    <div className="flex-auto relative">
                        <form
                            className="flex flex-col h-full "
                            onSubmit={isEdit === true ? submitEdit : handleSubmit}
                        >
                            <div className="p-4">
                                <div className={isEdit === true ? "hidden" : "block"}>
                                    <div className={accessionExists === true ? "block text-red-500 text-sm" : "hidden"}>*Accession already exists</div>

                                </div>
                                <input
                                    className=" w-full text-4xl font-medium py-px placeholder-sprPrimaryLight/50 text-sprPrimary focus:outline-none focus:ring-transparent bg-transparent"
                                    type="text"
                                    placeholder="CL-XXXX"
                                    name="accession"
                                    value={state.accession}
                                    onChange={handleChange}
                                    required
                                    readOnly={isEdit === true ? true : false}
                                />
                            </div>
                            <div className="flex flex-auto flex-col lg:flex-row pb-20  w-full">
                                <div className="flex flex-col  -space-y-2  w-1/2">


                                    <div className="p-4  flex flex-col ">
                                        <label className="text-sprPrimary">Variety</label>
                                        <input

                                            className="rounded-full p-2  border border-sprPrimary focus:outline-none focus:ring-1 focus:ring-sprPrimary focus:bg-sprPrimaryLight/30"
                                            type="text"
                                            name="variety"
                                            value={state.variety}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="p-4  flex flex-col">
                                        <label className="text-sprPrimary">Source</label>
                                        <input
                                            className="rounded-full p-2 border border-sprPrimary focus:outline-none focus:ring-1 focus:ring-sprPrimary focus:bg-sprPrimaryLight/30"
                                            type="text"
                                            name="source"
                                            value={state.source}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="p-4  flex flex-col">
                                        <label className="text-sprPrimary">Classification</label>
                                        <input
                                            className="rounded-full p-2 border border-sprPrimary focus:outline-none focus:ring-1 focus:ring-sprPrimary focus:bg-sprPrimaryLight/30"
                                            type="text"
                                            name="classification"
                                            value={state.classification}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-center items-center   w-1/2">

                                    <div className=" rounded-b-lg  sprBorderDashed w-3/4 h-3/4  flex flex-col gap-5  justify-center items-center bg-slate-100 ">
                                        <ImageIcon fill="none" stroke="#CFD491" className="w-16" />
                                        <div className="bg-sprPrimaryLight relative rounded-full ">
                                            <h6 className="absolute left-4 top-1 text-white font-medium" >Choose Image</h6>
                                            <input className="opacity-0 w-32" type="file" onChange={(e) => {
                                                setImageUpload(e.target.files[0])
                                            }} />

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right space-x-2">
                                <button
                                    className="bg-sprGray30 rounded-full py-2 px-3 text-sm font-medium text-white shadow-slate-300"
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setState(initialState)
                                        setIsEdit(false)
                                    }}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="bg-sprPrimary rounded-full py-2 px-3 text-sm font-medium text-white shadow-slate-300"

                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </ModalAddRiceAcc>

                {/* Rice Accession Info */}
                <ModalRiceInfo open={isRiceInfoModalOpen} >
                    <div className=" fixed left-0 right-0 bottom-0 top-0 z-50 bg-black opacity-70 " />
                    <div className=" flex flex-col absolute left-3 right-3 bottom-16 top-16 sm:left-12 sm:right-12 md:left-28 md:right-28 lg:left-1/4 lg:right-1/4 z-50 bg-white rounded-xl  px-4 pt-8 pb-4   ">
                        <div className="absolute right-5 z-50 ">
                            <button onClick={() => setIsRiceInfoModalOpen(false)}>
                                <img className="relative" src={closeIcon} alt="" />
                            </button>
                        </div>
                        <div className="bg-yellow-400 flex  ">
                            <header className="  bg-red-600">
                                <h1 className="text-3xl font-bold text-sprBlack opacity-80 p-2">
                                    CL-XXXX
                                </h1>
                            </header>

                        </div>
                        <div className="bg-violet-500 flex-auto flex flex-col">
                            <div className="bg-green-600 w-full h-1/4 flex ">
                                <div className="bg-pink-600  w-1/2 p-3">
                                    <div className="bg-yellow-400 h-full">image</div></div>
                                <div className="bg-pink-300 flex flex-col flex-auto">

                                </div>
                            </div>
                            <div className="bg-green-600 w-full flex-auto">
                            </div>

                        </div>
                    </div>
                </ModalRiceInfo>
            </div>

        </>
    );
}

