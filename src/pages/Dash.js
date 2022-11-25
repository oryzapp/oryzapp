import React, { useState } from 'react'
import { ReactComponent as AromIcon } from '../assets/aromatic-icon.svg'
import { ReactComponent as PigIcon } from '../assets/pigmented-icon.svg'
import { ReactComponent as GlutIcon } from '../assets/glutinous-icon.svg'
import { ReactComponent as SearchIcon } from '../assets/search-icon.svg'

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

    const [showTable, setShowTable] = useState(false)
    const [classification, setClassification] = useState('')


    return (
        <>
            <div className=' h-full w-full flex flex-col rounded-t-xl sm:rounded-xl bg-slate-50 opacity-90 p-2' onClick={() => {
            }}>
                {/* Header */}
                <header className=" flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-sprBlack opacity-80">Dashboard</h1>
                    <div className='sm:hidden'>search</div>
                </header>

                {/* Main */}
                <div className='flex justify-center pb-4'>
                    <div className="relative drop-shadow-md hidden sm:flex w-1/2 ">
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
                <section className={showTable === false ? "h-full flex  items-center gap-3 p-6 sm:p-10 lg:p-20" : 'hidden'}>

                    <div className='bg-white flex-auto flex flex-col justify-center items-center drop-shadow-sm rounded-lg p-2 md:p-5' onClick={() => {
                        setShowTable(true)
                        setClassification('Aromatic')
                    }}>
                        <AromIcon className='h-20' stroke='#AFBE00' />
                        <h1 className='text-lg font-medium text-sprPrimaryDark'>Aromatic</h1>
                    </div>
                    <div className='text-lg font-medium text-sprPrimaryDark bg-white flex-auto flex flex-col justify-center items-center drop-shadow-sm rounded-lg p-2 md:p-5' onClick={() => {
                        setShowTable(true)
                        setClassification('Pigmented')
                    }}>
                        <PigIcon className='h-20' stroke='#AFBE00' />
                        <h1>Pigmented</h1>
                    </div>
                    <div className='text-lg font-medium text-sprPrimaryDark bg-white flex-auto flex flex-col justify-center items-center drop-shadow-sm rounded-lg p-2 md:p-5' onClick={() => {
                        setShowTable(true)

                        setClassification('Glutinous')
                    }}>
                        <GlutIcon className='h-20' stroke='#AFBE00' />
                        <h1>Glutinous</h1>
                    </div>

                </section>
                {/* With Table */}
                <section className={showTable === true ? "h-full flex flex-col items-center gap-3 p-6 pt-2 " : 'hidden'}>

                    <div className='flex w-full gap-3'>
                        <div className='bg-white flex-auto flex flex-col justify-center items-center drop-shadow-sm rounded-lg p-2 ' onClick={() => {
                            setShowTable(true)
                            setClassification('Aromatic')
                        }}>
                            <AromIcon className='h-10 ' stroke='#AFBE00' />
                            <h1 className='text-sm md:text-lg font-medium text-sprPrimaryDark'>Aromatic</h1>
                        </div>
                        <div className=' bg-white flex-auto flex flex-col justify-center items-center drop-shadow-sm rounded-lg p-2 ' onClick={() => {
                            setShowTable(true)
                            setClassification('Pigmented')
                        }}>
                            <PigIcon className='h-10' stroke='#AFBE00' />
                            <h1 className='text-md md:text-lg font-medium text-sprPrimaryDark'>Pigmented</h1>
                        </div>
                        <div className=' bg-white flex-auto flex flex-col justify-center items-center drop-shadow-sm rounded-lg p-2 ' onClick={() => {
                            setShowTable(true)

                            setClassification('Glutinous')
                        }}>
                            <GlutIcon className='h-10' stroke='#AFBE00' />
                            <h1 className='text-md md:text-lg font-medium text-sprPrimaryDark'>Glutinous</h1>
                        </div>
                    </div>
                    <div className='bg-white drop-shadow-sm rounded-xl flex-auto w-full'>
                        {classification}
                    </div>

                </section>

            </div >
        </>
    )
}


    //   <div className={showTable === true && classification === 'Aromatic' ? ` bg-sprPrimary flex-auto group hover:bg-sprPrimaryOffLight flex flex-col justify-center items-center rounded-xl drop-shadow-sm p-4 sm:h-24` : "bg-white flex-auto group hover:bg-sprPrimaryOffLight flex flex-col justify-center items-center rounded-xl drop-shadow-sm p-4 "} onClick={() => {
    //                             setShowTable(true)
    //                             setClassification('Aromatic')
    //                         }}>
    //                             <AromIcon className={showTable === true && classification === 'Aromatic' ? " h-12  group-hover:stroke-white" : " h-12 sm:h-20 group-hover:stroke-white"} stroke={showTable === true && classification === 'Aromatic' ? "white" : "#AFBE00"} />
    //                             <h1 className={showTable === true && classification === 'Aromatic' ? "text-white font-medium text-lg sm:text-md  group-hover:text-white" : "text-sprPrimary font-medium text-lg sm:text-xl  group-hover:text-white"}>Aromatic</h1>
    //                         </div>
    //                         <div className={showTable === true && classification === 'Pigmented' ? "bg-sprPrimary flex-auto group hover:bg-sprPrimaryOffLight flex flex-col justify-center items-center rounded-xl drop-shadow-sm p-4  sm:h-24" : "bg-white flex-auto group hover:bg-sprPrimaryOffLight flex flex-col justify-center items-center rounded-xl drop-shadow-sm p-4 md:p-10 "} onClick={() => {
    //                             setShowTable(true)
    //                             setClassification('Pigmented')
    //                         }}>
    //                             <PigIcon className={showTable === true ? " h-12 sm:h-10 group-hover:stroke-white" : " h-12 sm:h-20 group-hover:stroke-white"} stroke={showTable === true && classification === 'Pigmented' ? "white" : "#AFBE00"} />
    //                             <h1 className={showTable === true && classification === 'Pigmented' ? "text-white font-medium text-lg sm:text-md  group-hover:text-white" : "text-sprPrimary font-medium text-lg sm:text-xl  group-hover:text-white"}>Pigmented</h1>
    //                         </div>
    //                         <div className={showTable === true && classification === 'Glutinous' ? "bg-sprPrimary flex-auto group hover:bg-sprPrimaryOffLight flex flex-col justify-center items-center rounded-xl drop-shadow-sm p-4 md:p-10" : "bg-white flex-auto group hover:bg-sprPrimaryOffLight flex flex-col justify-center items-center rounded-xl drop-shadow-sm p-4 md:p-10 "} onClick={() => {
    //                             setShowTable(true)
    //                             setClassification('Glutinous')
    //                         }}>
    //                             <GlutIcon className={showTable === true ? " h-12 sm:h-10 group-hover:stroke-white" : " h-12 sm:h-20 group-hover:stroke-white"} stroke={showTable === true && classification === 'Glutinous' ? "white" : "#AFBE00"} />
    //                             <h1 className={showTable === true && classification === 'Glutinous' ? "text-white font-medium text-lg sm:text-md  group-hover:text-white" : "text-sprPrimary font-medium text-lg sm:text-xl  group-hover:text-white"}>Glutinous</h1>
    //                         </div>