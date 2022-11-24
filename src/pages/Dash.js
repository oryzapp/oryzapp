import React, { useState } from 'react'
import { ReactComponent as AromIcon } from '../assets/aromatic-icon.svg'
import { ReactComponent as PigIcon } from '../assets/pigmented-icon.svg'
import { ReactComponent as GlutIcon } from '../assets/glutinous-icon.svg'
import { ReactComponent as SearchIcon } from '../assets/search-icon.svg'

export default function Dash() {
    const [page, setPage] = useState('dashboard');

    const getPage = () => {
        switch (page) {
            case 'dashboard':
                <div>Dashboard</div>
            case 'users':
                <div>Users</div>
        }
    }

    return (
        <>
            <div className=' h-full w-full flex flex-col rounded-t-xl sm:rounded-xl bg-slate-50 opacity-90 p-2'>
                {/* Header */}
                <header className=" flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-sprBlack opacity-80">Dashboard</h1>
                    <div className='sm:hidden'>search</div>
                </header>

                {/* Main */}
                <section className='flex flex-col h-full gap-2'>
                    <div className='flex'>
                        <div className="relative drop-shadow-md hidden sm:block">
                            <input
                                className=" w-96 pl-2 py-2 text-sm placeholder:text-sprPrimary/50 text-sprPrimary focus:outline-none focus:border-none  rounded-full "
                                type="text"
                                placeholder="Find a Rice"
                            />
                            <button className="  h-full px-2 rounded-full absolute right-0 bg-sprPrimaryLight">
                                <SearchIcon stroke="white" />
                            </button>
                        </div>
                    </div>
                    <div className=" flex flex-col sm:flex-row-reverse h-full gap-2 ">

                        <div className='  h-1/5 sm:h-full sm:w-1/4 sm:flex-col flex flex-row gap-2'>
                            <div className="bg-white rounded-lg flex-auto flex flex-col justify-center items-center group  hover:bg-sprPrimaryLight drop-shadow-sm ">
                                <div className='flex flex-col justify-center'>
                                    <AromIcon className='h-20 group-hover:stroke-white' stroke="#AFBE00" />
                                    <h1 className='text-sprPrimary font-medium text-xl  group-hover:text-white'>Aromatic</h1>
                                </div>
                                <h1 className='text-sprPrimaryLight font-medium text-md'>Total of --</h1>
                            </div>
                            <div className="bg-white rounded-lg flex-auto flex flex-col justify-center items-center group hover:bg-sprPrimaryLight drop-shadow-sm">
                                <div className='flex flex-col justify-center'>
                                    <PigIcon className='h-20 group-hover:stroke-white' stroke="#AFBE00" />
                                    <h1 className='text-sprPrimary font-medium text-xl  group-hover:text-white'>Pigmented</h1>

                                </div>
                                <h1 className='text-sprPrimaryLight font-medium text-md'>Total of --</h1>


                            </div>
                            <div className="bg-white rounded-lg flex-auto flex flex-col justify-center items-center group hover:bg-sprPrimaryLight drop-shadow-sm">
                                <div className='flex flex-col justify-center'>
                                    <GlutIcon className='h-20 group-hover:stroke-white' stroke="#AFBE00" />
                                    <h1 className='text-sprPrimary font-medium text-xl group-hover:text-white'>Glutinous</h1>
                                </div>
                                <h1 className='text-sprPrimaryLight font-medium text-md'>Total of --</h1>




                            </div>
                        </div>
                        <div className=' flex sm:h-full sm:flex-auto flex-col h-3/4 gap-2'>
                            <div className="bg-white flex-auto rounded-lg drop-shadow-sm">wet</div>
                            <div className="bg-white flex-auto rounded-lg drop-shadow-sm">dry</div>
                        </div>
                    </div>

                </section>

            </div>
        </>
    )
}
