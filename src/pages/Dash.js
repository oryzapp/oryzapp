import React, { useState } from 'react'

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
            <div className=' h-full w-full flex flex-col rounded-t-xl sm:rounded-xl bg-white opacity-90 p-2'>
                {/* Header */}
                <header className=" flex items-center">
                    <h1 className="text-3xl font-bold text-sprBlack opacity-80">Dashboard</h1>
                    <button>Sign Out</button>
                </header>

                {/* Main */}
                <section className=" flex w-full flex-auto overflow-auto rounded-sm scrollbar flex-col  sm:flex-row">
                    <div className=" flex flex-col h-1/4 sm:h-full sm:w-3/4 ">
                        <div className=" h-1/4 flex  p-2 pb-1 gap-2">
                            <div className="flex-auto rounded-lg bg-slate-100">b</div>
                            <div className="flex-auto rounded-lg bg-slate-100">b</div>
                            <div className="flex-auto rounded-lg bg-slate-100">b</div>
                        </div>
                        <div className=" h-3/4 p-2 pt-1 ">
                            <div className=" bg-slate-100 rounded-lg h-full">b</div>
                        </div>
                        <div></div>
                    </div>
                    <div className=" sm:w-1/4 p-2">
                        <div className=" bg-slate-100 h-full rounded-lg">b</div>
                    </div>
                </section>
            </div>
        </>
    )
}
