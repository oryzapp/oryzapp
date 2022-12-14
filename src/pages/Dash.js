import React, { useEffect, useState } from 'react'
import { ReactComponent as AromIcon } from '../assets/aromatic-icon.svg'
import { ReactComponent as PigIcon } from '../assets/pigmented-icon.svg'
import { ReactComponent as GlutIcon } from '../assets/glutinous-icon.svg'
import { ReactComponent as SearchIcon } from '../assets/search-icon.svg'
import { ReactComponent as ExcelIcon } from '../assets/excel-icon.svg'
import { ReactComponent as RiceIllusOne } from '../assets/rice-illustration1.svg'
import ModalSearch from '../components/ModalSearch'
import { collection, onSnapshot } from 'firebase/firestore'
import db from "../firebase-config";
import ModalAccessionsInfo from '../components/ModalAccessionsInfo'


export default function Dash() {
    // const [page, setPage] = useState('dashboard');

    // const getPage = () => {
    //     switch (page) {
    //         case 'dashboard':
    //             <div>Dashboard</div>
    //         case 'users':
    //             <div>Users</div>
    //     }
    // }

    // Get All Accessions
    const [riceAccessions, setRiceAccessions] = useState([])
    useEffect(() => {
        const collectionRef = collection(db, "SPR/Rice_Accessions/Accession_IDs");
        const unsub = onSnapshot(collectionRef, (snapshot) => {
            setRiceAccessions(
                snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
        });
        return unsub;
    }, [])

    const [showTable, setShowTable] = useState(false)
    const [classification, setClassification] = useState('')

    // Search Modal
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)

    // Accessions Info
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Current Id
    const [currentId, setCurrentId] = useState('')

    // Tables
    const [searched, setSearched] = useState([])
    useEffect(() => {

        var searchList = []
        riceAccessions.map((rice) => {
            const match = rice.classification
            const trial = match.includes(classification)
            if (trial === true) {
                searchList.push({
                    accession: rice.accessionId,
                    variety: rice.variety,
                    classification: rice.classification,
                    source: rice.source
                })
            }
        })
        setSearched(searchList)
    }, [classification])

    const exportExcel = () => {
        var XLSX = require("xlsx");
        console.log('exporting');
        var wb= XLSX.utils.book_new(),
        ws = XLSX.utils.json_to_sheet(searched)

        XLSX.utils.book_append_sheet(wb,ws,`Special Purpose Rice ${classification}`)

        XLSX.writeFile(wb, `Special_Purpose_Rice_${classification}.xlsx`)
    }

    var list = 0;
    return (
        <>
            <div className=' h-full w-full flex p-2 flex-col rounded-t-xl sm:rounded-xl bg-slate-50 opacity-90  relative' onClick={() => {
            }}>
                <div className=' absolute rounded-t-xl sm:rounded-xl bottom-0 right-0 left-0 top-0  flex items-end justify-end  '>
                    <RiceIllusOne className='w-full sm:rounded-b-xl'  />
                </div>
                {/* Header */}
                <header className=" flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-sprBlack opacity-80">Dashboard </h1>
                    <div className='sm:hidden' onClick={()=>{
                        setIsSearchModalOpen(true)
                    }}>
									<SearchIcon className=" stroke-sprPrimary" />

                    </div>
                </header>

                {/* Main */}
                <div className='flex justify-center pb-4'>
                    <div className="relative drop-shadow-md hidden sm:flex w-1/2 " onClick={() => {
                        setIsSearchModalOpen(true)
                    }}>
                        <input
                            className="  w-full pl-2 py-2 text-sm placeholder:text-sprPrimary/50 text-sprPrimary focus:outline-none focus:border-none  rounded-full "
                            type="text"
                            placeholder="Find a Rice"
                            
                        />
                        <button className="  h-full px-2 rounded-full absolute right-0 bg-sprPrimaryLight">
                            <SearchIcon stroke="white" />
                        </button>
                    </div>
                </div>

                {/* No Table */}
                <section className={showTable === false ? "h-full flex justify-center items-center gap-3 p-6 sm:p-10 lg:p-20" : 'hidden'}>

                    <div className='group hover:bg-sprPrimaryOffLight active:bg-sprPrimary bg-white flex-auto flex flex-col justify-center items-center drop-shadow-sm rounded-lg p-2 md:p-5' onClick={() => {
                        setShowTable(true)
                        setClassification('Aromatic')
                    }}>
                        <AromIcon className='h-20 group-hover:stroke-white ' stroke='#AFBE00' />
                        <h1 className='text-lg font-medium text-sprPrimaryDark group-hover:text-white '>Aromatic</h1>
                    </div>
                    <div className=' group hover:bg-sprPrimaryOffLight active:bg-sprPrimary  bg-white flex-auto flex flex-col justify-center items-center drop-shadow-sm rounded-lg p-2 md:p-5' onClick={() => {
                        setShowTable(true)
                        setClassification('Pigmented')
                    }}>
                        <PigIcon className='h-20 group-hover:stroke-white' stroke='#AFBE00' />
                        <h1 className='text-lg font-medium text-sprPrimaryDark  group-hover:text-white'>Pigmented</h1>
                    </div>
                    <div className='group hover:bg-sprPrimaryOffLight active:bg-sprPrimary text-lg font-medium text-sprPrimaryDark bg-white flex-auto flex flex-col justify-center items-center drop-shadow-sm rounded-lg p-2 md:p-5' onClick={() => {
                        setShowTable(true)

                        setClassification('Glutinous')
                    }}>
                        <GlutIcon className='h-20 group-hover:stroke-white' stroke='#AFBE00' />
                        <h1 className='text-lg font-medium text-sprPrimaryDark  group-hover:text-white'>Glutinous</h1>
                    </div>

                </section>
                {/* With Table */}
                <section className={showTable === true ? " mb-2" : "hidden"}>

                    <div className='flex w-full gap-3'>
                        <div className={classification === 'Aromatic' ? "group hover:bg-sprPrimaryOffLight active:bg-sprPrimary bg-sprPrimary  flex-auto flex flex-col justify-center items-center drop-shadow-sm rounded-lg p-2" : "group hover:bg-sprPrimaryOffLight active:bg-sprPrimary bg-white  flex-auto flex flex-col justify-center items-center drop-shadow-sm rounded-lg p-2"} onClick={() => {
                            setShowTable(true)
                            setClassification('Aromatic')
                        }}>
                            <AromIcon className='h-10 group-hover:stroke-white' stroke={classification === 'Aromatic' ? 'white' : '#AFBE00'} />
                            <h1 className={classification === 'Aromatic' ? "group-hover:text-white text-sm md:text-lg font-medium text-white" : 'group-hover:text-white text-sm md:text-lg font-medium text-sprPrimaryDark'}>Aromatic</h1>
                        </div>
                        <div className={classification === 'Pigmented' ? "group hover:bg-sprPrimaryOffLight active:bg-sprPrimary bg-sprPrimary  flex-auto flex flex-col justify-center items-center drop-shadow-sm rounded-lg p-2" : "group hover:bg-sprPrimaryOffLight active:bg-sprPrimary bg-white  flex-auto flex flex-col justify-center items-center drop-shadow-sm rounded-lg p-2"} onClick={() => {
                            setShowTable(true)
                            setClassification('Pigmented')
                        }}>
                            <PigIcon className='h-10 group-hover:stroke-white' stroke={classification === 'Pigmented' ? 'white' : '#AFBE00'} />
                            <h1 className={classification === 'Pigmented' ? "group-hover:text-white text-sm md:text-lg font-medium text-white" : 'group-hover:text-white text-sm md:text-lg font-medium text-sprPrimaryDark'}>Pigmented</h1>
                        </div>
                        <div className={classification === 'Glutinous' ? "group hover:bg-sprPrimaryOffLight active:bg-sprPrimary bg-sprPrimary  flex-auto flex flex-col justify-center items-center drop-shadow-sm rounded-lg p-2" : "group hover:bg-sprPrimaryOffLight active:bg-sprPrimary bg-white  flex-auto flex flex-col justify-center items-center drop-shadow-sm rounded-lg p-2"} onClick={() => {

                            setShowTable(true)

                            setClassification('Glutinous')
                        }}>
                            <GlutIcon className='h-10 group-hover:stroke-white' stroke={classification === 'Glutinous' ? 'white' : '#AFBE00'} />
                            <h1 className={classification === 'Glutinous' ? "group-hover:text-white text-sm md:text-lg font-medium text-white" : 'group-hover:text-white text-sm md:text-lg font-medium text-sprPrimaryDark'}>Glutinous</h1>
                        </div>
                    </div>

                </section>
                <section className={showTable === true ? "flex-auto overflow-auto  scrollbar bg-white rounded-lg border border-slate-200 w-full" : "hidden"}>

                    <div className="flex w-full max-h-0 sm:max-h-0 sm:max-w-0 lg:max-w-full  relative bg-yellow-400">

                        <div className="hidden sm:flex flex-col  divide-y divide-slate-200  bg-white relative h-full ">
                            <div className="  text-sprPrimary bg-white sticky top-0 px-6 py-2 text-sm font-medium">
                                #
                            </div>
                            {searched.map((rice) => (
                                <div className="px-6 py-2 font-medium text-sprPrimaryLight"> {list = list + 1} </div>
                            ))}
                        </div>
                        <div className="hidden sm:flex flex-col flex-auto  divide-y divide-slate-200 relative h-full">
                            <div className="text-sprPrimary bg-white sticky top-0 px-8 py-2 text-sm font-medium">
                                Accessions
                            </div>
                            {searched.map((rice) => (
                                <div className="px-8 py-2 text-md font-medium text-sprGray60 whitespace-nowrap bg-slate-50"> {rice.accession === "" ? "---" : `CL-R${rice.accession}`} </div>
                            ))}
                        </div>
                        <div className="hidden sm:flex flex-col flex-auto  divide-y divide-slate-200 relative h-full">
                            <div className="text-sprPrimary bg-white sticky top-0 px-8 py-2 text-sm font-medium">
                                Classification
                            </div>
                            {searched.map((rice) => (
                                <div className="px-8 py-2 text-md font-medium text-sprGray60 whitespace-nowrap bg-slate-50"> {rice.classification === "" ? "---" : rice.classification} </div>
                            ))}
                        </div>
                        <div className="hidden sm:flex flex-col flex-auto  divide-y divide-slate-200 relative h-full">
                            <div className="text-sprPrimary bg-white sticky top-0 px-8 py-2 text-sm font-medium">
                                Source
                            </div>
                            {searched.map((rice) => (
                                <div className="px-8 py-2 text-md font-medium text-sprGray60 whitespace-nowrap bg-slate-50"> {rice.source === "" ? "---" : rice.source} </div>
                            ))}
                        </div>
                        <div className="hidden sm:flex flex-col flex-auto  divide-y divide-slate-200 relative h-full">
                            <div className="text-sprPrimary bg-white sticky top-0 px-8 py-2 text-sm font-medium">
                                Accessions
                            </div>
                            {searched.map((rice) => (
                                <div className="px-8 py-2 text-md font-medium text-sprGray60 whitespace-nowrap bg-slate-50"> {rice.variety === "" ? "---" : rice.variety} </div>
                            ))}
                        </div>
                        <div className="hidden sm:flex flex-col divide-y sm:divide-y bg-white divide-white h-full sticky right-0 justify-center items-center">
                            <div className=" text-sprPrimary bg-white  px-10 py-2 sticky top-0 text-sm font-medium">
                                <h1 className="group" onClick={()=>{exportExcel()}}>
                                    <ExcelIcon className='stroke-sprPrimary h-5 hover:stroke-sprPrimarySuperLight active:stroke-sprPrimary'/>
                                    <small className=' hidden group-hover:block absolute whitespace-nowrap right-2 bg-sprGray60 rounded-sm p-1 text-white' >Export as Excel</small>
                                </h1>
                            </div>
                            {searched.map((rice) => (
                                <div className="px-6 py-2 text-md font-medium text-sprGray60 whitespace-nowrap" >
                                    <div className="flex gap-2">
                                        <button
                                            className=" text-white text-sm bg-gradient-to-b from-sprPrimary to-sprPrimaryDarkest rounded-full  hover:bg-gradient-to-t hover:from-sprPrimaryLight hover:to-sprPrimaryLight h-8 w-14 sm:h-6 sm:w-12 shadow-slate-300 "
                                            onClick={() => {
                                                setIsModalOpen(true)
                                                setCurrentId(rice.accession)
                                                console.log(rice.accession)
                                            }}
                                        >
                                            view
                                        </button>

                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Mobile */}
                        <div className='w-full sm:hidden flex flex-col gap-2 p-2'>
                             {searched.map((rice)=>(
                                <div className="flex justify-between items-center  bg-slate-50">
									<div className="flex flex-col -space-y-3">
										<div className="px-6 py-4 text-3xl font-bold text-sprGray80">CL-R{rice.accession}</div>
										<div className="px-6 py-2 text-md font-normal text-sprPrimaryLight">{rice.classification} Season</div>
										<div className="px-6 py-2 text-md font-normal text-sprPrimaryLight">{rice.variety}</div>
										<div className="px-6 py-2 text-md font-normal text-sprPrimaryLight">{rice.source}</div>
										
									</div>
										<button className="mr-8 bg-sprPrimary hover:bg-sprPrimaryLight active:bg-sprPrimary rounded-full p-1 px-2 text-white font-medium text-xl" 
                                        onClick={() => {
                                                setIsModalOpen(true)
                                                setCurrentId(rice.accession)
                                                console.log(rice.accession)
                                            }}
												>view</button>
									</div>
                            ))}
                        </div>


                    </div>
                </section>


            </div >
            <ModalSearch open={isSearchModalOpen} closeModal={() => { setIsSearchModalOpen(false) }} />
            <ModalAccessionsInfo open={isModalOpen} modalId={currentId} closeModal={() => { setIsModalOpen(false) }} />
        </>
    )
}
