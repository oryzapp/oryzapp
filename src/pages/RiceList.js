import { collection, collectionGroup, onSnapshot, query, where } from "firebase/firestore";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useRef, useState } from "react";
import db from "../firebase-config";
import downloadIcon from '../assets/download-icon.svg'
import closeIcon from '../assets/close.svg'

import { ReactComponent as SearchIcon } from '../assets/search-icon.svg'
import { ReactComponent as ShelfIcon } from '../assets/shelf-icon.svg'
import { ReactComponent as GridIcon } from '../assets/grid-icon.svg'
import { ReactComponent as ListIcon } from '../assets/list-icon.svg'
import { ReactComponent as EmptyIllustration } from '../assets/empty-illustration.svg'
import { ReactComponent as FilterIcon } from '../assets/filter-icon.svg'

export default function RiceList() {

    const [riceList, setRiceList] = useState([]);
    const [riceSearchList, setRiceSearchList] = useState([])
    const [listOn, setListOn] = useState(true)
    const [season, setSeason] = useState('All')
    const [year, setYear] = useState('All')
    const [searchValue, setSearchValue] = useState('')
    const [modalIsOpen, setModalIsOpen] = useState(false)


    // Display All
    useEffect(() => {
        try {
            var riceCollectionRef;

            if (season === 'All' && year === 'All') {
                riceCollectionRef = collectionGroup(db, "Raw_Rice_List");

            }
            if (season === 'All' && year !== 'All') {
                riceCollectionRef = query(collectionGroup(db, "Raw_Rice_List"), where("riceYear", "==", year));
            }
            if (season === 'Wet_Season' && year === 'All') {
                riceCollectionRef = query(collection(db, `SPR/Rice_Accessions/Rice_List/${season}/Raw_Rice_List`))
            }
            if (season === 'Dry_Season' && year === 'All') {
                riceCollectionRef = query(collection(db, `SPR/Rice_Accessions/Rice_List/${season}/Raw_Rice_List`))
            }
            if (season === 'Dry_Season' && year !== 'All') {
                riceCollectionRef = query(collection(db, `SPR/Rice_Accessions/Rice_List/${season}/Raw_Rice_List`), where("riceYear", "==", year))
            }
            if (season === 'Wet_Season' && year !== 'All') {
                riceCollectionRef = query(collection(db, `SPR/Rice_Accessions/Rice_List/${season}/Raw_Rice_List`), where("riceYear", "==", year))
            }

            const unsub = onSnapshot(riceCollectionRef, (snapshot) => {
                setRiceList(
                    snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
                );
            });

            return unsub;
        } catch (error) {
            console.log(error);
        }
    }, [season, year]);

    // Season Filter--------------->
    const changeSeason = (e) => {
        setSeason(e.target.value)
    }

    // Year Filter ---------------> 
    const years = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2030]

    const changeYear = (e) => {
        setYear(e.target.value)
    }


    // Search Bar------------>
    const searchInputChange = (e) => {
        setSearchValue(e.target.value)
    }


    // DB Data to Array Search for Searching---->
    const [searched, setSearched] = useState([])
    useEffect(() => {
        var searchList = []


        if (searchValue !== "") {

            riceList.map((rice) => {


                const match = rice.searchIndex.toLowerCase()
                const search = match.includes(searchValue)
                // console.log(search);
                if (search === true) {
                    searchList.push({
                        accessionId: rice.accessionId,
                        riceSeason: rice.riceSeason,
                        riceYear: rice.riceYear,
                        shelfNum: rice.shelfNum
                    })

                }
            })
        }



        setSearched(searchList)
    }, [searchValue, season, year])







    // Download QR Code-------------->
    const downloadQR = (accessionId, riceSeason, riceYear) => {
        console.log(accessionId);
        const canvas = document.getElementById(`qr-gen-${accessionId}`);
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `${accessionId}_${riceSeason}_Season_${riceYear}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    var list = 0;

    return (
        <>
            <div className='h-full w-full flex flex-col rounded-t-xl sm:rounded-xl bg-white opacity-90 p-2'>
                <header className="  flex items-center justify-between">

                    <h1 className="text-3xl font-bold text-sprBlack opacity-80 ">
                        Rice List</h1>
                    <div className="relative sm:hidden ">
                        <input
                            className=" pl-2 py-2  w-36  text-sm placeholder:text-sprPrimary/50 text-sprPrimary focus:outline-none focus:border-none  rounded-full "
                            type="text"
                        />
                        <button className="  h-full px-2 rounded-full absolute right-0 ">
                            <SearchIcon stroke="#AFBE00" />
                        </button>
                    </div>
                </header>
                {/* Options */}
                <div className="flex justify-between   p-1 pb-3 ">
                    <div className=" flex  items-center gap-1 sm:gap-3   rounded-full">
                        {/* Search bar */}
                        <div className="relative ">
                            <div className="relative drop-shadow-md hidden sm:block z-20">
                                <form>
                                    <input
                                        className=" pl-2 py-2   text-sm placeholder:text-sprPrimary/50 text-sprPrimary focus:outline-none focus:border-none  rounded-full "
                                        type="text"
                                        placeholder="Find a Rice"
                                        value={searchValue}
                                        onChange={searchInputChange}
                                    />
                                    <button className="  h-full px-2 rounded-full absolute right-0 bg-sprPrimaryLight ">
                                        <SearchIcon stroke="white" />
                                    </button>
                                </form>
                            </div>

                        </div>
                        {/* Season Filter */}
                        <div className="drop-shadow-md flex" >
                            <div className="bg-sprPrimaryLight text-white h-full text-sm  p-2 rounded-full pl-3 pr-10">Season</div>
                            <div className=" -ml-9">
                                <select value={season} name="riceSeason" onChange={changeSeason} className="rounded-full py-2 text-sprPrimary text-sm ">

                                    <option value="All">All</option>
                                    <option value="Dry_Season">Dry</option>
                                    <option value="Wet_Season">Wet</option>
                                </select>
                            </div>
                        </div>
                        {/* Year Filter */}
                        <div className="drop-shadow-md flex" >
                            <div className="bg-sprPrimaryLight text-white h-full text-sm  p-2 rounded-full pl-3 pr-10">Year</div>
                            <div className=" -ml-9">
                                <select name="riceYear" onChange={changeYear} className="rounded-full py-2 text-sprPrimary text-sm ">

                                    <option value={'All'}>All</option>
                                    {
                                        years.map((e) =>
                                            <option value={e} >{e}</option>

                                        )
                                    }
                                </select>
                            </div>
                        </div>

                    </div>
                    <div className=" bg-sprPrimaryLight flex sm:mr-5 rounded-full drop-shadow-md">
                        <div className=" flex"><button onClick={() => setListOn(true)} className={listOn === true ? "bg-white rounded-full p-2 pl-3 pr-6" : " rounded-full -mr-1  p-2 pl-3"}
                        >
                            <ListIcon className="w-4 h-4" fill={listOn === true ? "#CFD866" : "white"} />
                        </button>
                            <button onClick={() => setListOn(false)} className={listOn === false ? "bg-white rounded-full  p-2 pr-6 pl-3" : "-ml-1 rounded-full  p-2 pr-3 "}
                            >
                                <GridIcon className="w-4 h-4" fill={listOn === false ? "#CFD866" : "white"} />
                            </button></div>
                    </div>

                </div>
                {/* Main */}

                <section className={listOn === true ? "flex-auto overflow-auto  scrollbar bg-white rounded-lg border border-slate-200 w-full" : "hidden"}>
                    <div className="flex w-full h-full   sm:max-w-92 lg:max-w-full relative  justify-center">
                        {riceList.length === 0 ? <div className="flex  w-full items-center justify-center flex-col "><EmptyIllustration /><p className="font-medium text-xl text-sprPrimaryOffLight whitespace-nowrap">Plenty of space in the field </p></div> :
                            <div className="bg-red-900 flex max-h-0 w-full ">
                                <div className=" hidden sm:flex divide-y bg-white divide-slate-300 h-fit flex-col justify-center">
                                    <div className="text-sprPrimary bg-white sticky top-0 px-6 py-2 text-sm font-medium">#</div>
                                    {searchValue === '' ? <>
                                        {riceList.map((rice) => (
                                            <div className="px-6 py-3 text-sprPrimaryDark"> {list = list + 1}</div>
                                        ))}
                                    </> : <>

                                        {
                                            searched.map((rice) => (
                                                <div className="px-6 py-3 text-sprPrimaryDark"> {list = list + 1}</div>
                                            ))
                                        }
                                    </>}
                                </div>
                                <div className=" hidden sm:flex divide-y bg-slate-50 divide-slate-300 h-fit  flex-col justify-center flex-auto">
                                    <div className="text-sprPrimary bg-white sticky top-0 px-6 py-2 text-sm font-medium ">Accession</div>
                                    {searchValue === '' ? <>
                                        {riceList.map((rice) => (
                                            <div className="px-6 py-3 text-sprGray60 font-medium "> CL-R{rice.accessionId}</div>
                                        ))}
                                    </> : <>

                                        {
                                            searched.map((rice) => (
                                                <div className="px-6 py-3 text-sprGray60 font-medium"> CL-R{rice.accessionId}</div>
                                            ))
                                        }
                                    </>}
                                </div>
                                <div className=" hidden sm:flex divide-y bg-slate-100 divide-slate-300 h-fit  flex-col justify-center flex-auto">
                                    <div className="text-sprPrimary bg-white sticky top-0 px-6 py-2 text-sm font-medium ">Year</div>
                                    {searchValue === '' ? <>
                                        {riceList.map((rice) => (
                                            <div className="px-6 py-3 text-sprGray60 font-medium" > {rice.riceYear}</div>
                                        ))}
                                    </> : <>

                                        {
                                            searched.map((rice) => (
                                                <div className="px-6 py-3 text-sprGray60 font-medium"> {rice.riceYear}</div>
                                            ))
                                        }
                                    </>}
                                </div>

                                <div className=" hidden sm:flex divide-y bg-slate-50 divide-slate-300 h-fit  flex-col justify-center flex-auto">
                                    <div className="text-sprPrimary bg-white sticky top-0 px-6 py-2 text-sm font-medium ">Season</div>
                                    {searchValue === '' ? <>
                                        {riceList.map((rice) => (
                                            <div className="px-6 py-3 text-sprGray60 font-medium"> {rice.riceSeason}</div>
                                        ))}
                                    </> : <>

                                        {
                                            searched.map((rice) => (
                                                <div className="px-6 py-3 text-sprGray60 font-medium"> {rice.riceSeason}</div>
                                            ))
                                        }
                                    </>}
                                </div>
                                <div className=" hidden sm:flex divide-y bg-slate-50 divide-slate-300 h-fit  flex-col justify-center ">

                                    <div className="text-sprPrimary bg-white sticky top-0 px-6 py-2 text-sm font-medium flex items-center">
                                        <ShelfIcon className="fill-sprPrimary h-5 " />
                                        {/* <p className="">Shelf</p> */}
                                    </div>
                                    {searchValue === '' ? <>
                                        {riceList.map((rice) => (
                                            <div className="px-6 py-3 text-sprGray60 font-medium"># {rice.shelfNum}</div>
                                        ))}
                                    </> : <>

                                        {
                                            searched.map((rice) => (
                                                <div className="px-6 py-3 text-sprGray60 font-medium"># {rice.shelfNum}</div>
                                            ))
                                        }
                                    </>}
                                </div>
                                <div className=" hidden sm:flex divide-y bg-white divide-slate-300 h-fit  flex-col justify-center ">
                                    <div className="text-sprPrimary bg-white sticky top-0 px-6 py-2 text-sm font-medium ">
                                        <p className="opacity-0">Action</p>
                                    </div>
                                    {searchValue === '' ? <>
                                        {riceList.map((rice) => (
                                            <div className="px-6 py-3 ">
                                                <button className="text-white text-sm bg-gradient-to-b from-sprPrimary to-sprPrimaryDark  rounded-full w-10" onClick={() => { console.log(rice.id) }}> view</button>
                                            </div>
                                        ))}
                                    </> : <>

                                        {
                                            searched.map((rice) => (
                                                <div className="px-6 py-3 ">
                                                    <button className="text-white text-sm bg-gradient-to-b from-sprPrimary to-sprPrimaryDark  rounded-full w-10" onClick={() => { console.log(rice.id) }}> view</button>
                                                </div>
                                            ))
                                        }
                                    </>}
                                </div>

                            </div>

                        }
                    </div>
                </section>
                <section className={listOn === false ? "flex-auto overflow-auto  scrollbar bg-white rounded-lg border border-slate-200 w-full" : "hidden"}>
                    <div className="flex w-full h-full   sm:max-w-92 lg:max-w-full relative  justify-center">
                        {riceList.length === 0 ? <div className="flex  w-full items-center justify-center flex-col  "><EmptyIllustration /><p className="font-medium text-xl text-sprPrimaryOffLight whitespace-nowrap">Plenty of space in the field </p></div> :
                            <div className="bg-red-900 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5  max-h-0 w-full ">
                                {searchValue === '' ? <>
                                    {riceList.map((rice) => (

                                        <div className="flex  flex-col  p-4 pt-2 pr-6 sm:pr-4  m-2  rounded-lg bg-slate-50  drop-shadow-md  hover:bg-sprPrimaryOffLight ">

                                            <div className="flex  justify-center p-4">
                                                <QRCodeCanvas id={`qr-gen-${rice.accessionId}`} className="hidden sm:block rounded-xl" value={`${rice.accessionId}_${rice.riceSeason}_Season_${rice.riceYear}`} bgColor="#FAFAFA" fgColor="rgba(18, 20, 20, 0.8)" includeMargin={true} size={150} />
                                                <QRCodeCanvas id={`qr-gen-${rice.accessionId}`} className="sm:hidden" value={`${rice.accessionId}_${rice.riceSeason}_Season_${rice.riceYear}`} fgColor="rgba(18, 20, 20, 0.9)" size={80} />
                                            </div>
                                            <div className=" flex flex-auto   justify-between items-center  ">
                                                <div className="">
                                                    <h1 className=" text-sm whitespace-nowrap sm:text-xl font-bold text-sprBlack opacity-80">
                                                        CL-R{rice.accessionId}
                                                    </h1>
                                                    <h6 className="text-xs font-medium text-sprGray60">
                                                        {rice.riceSeason} Season
                                                    </h6>
                                                    <h6 className="text-xs font-medium text-sprGray60">
                                                        Year: {rice.riceYear}
                                                    </h6>
                                                    <div className="flex  items-center  font-medium text-sprGray60">
                                                        <ShelfIcon className="fill-sprPrimary h-5 " />
                                                        <p className="text-md" ># {rice.shelfNum}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2 sm:pt-1 ">
                                                    <button onClick={() => {
                                                        console.log(rice.id)

                                                        setModalIsOpen(true)
                                                    }} className=" text-white text-xs sm:text-sm bg-gradient-to-b from-sprPrimary to-sprPrimaryDark h-6 w-10 sm:h-6 sm:w-12 rounded-full drop-shadow-md ">
                                                        view
                                                    </button>
                                                    <button
                                                        className=" bg-sprPrimary rounded-full drop-shadow-md  " onClick={() => downloadQR(rice.accessionId, rice.riceSeason, rice.riceYear)}
                                                    >
                                                        <div className=" w-6 sm:w-6 h-6"><img src={downloadIcon} alt="" /></div>
                                                    </button>

                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </> : <>

                                    {searched.map((rice) => (

                                        <div className="flex  flex-col  p-4 pt-2 pr-6 sm:pr-4  m-2  rounded-lg bg-slate-50  drop-shadow-md  hover:bg-sprPrimaryOffLight ">

                                            <div className="flex  justify-center p-4">
                                                <QRCodeCanvas id={`qr-gen-${rice.accessionId}`} className="hidden sm:block rounded-xl" value={`${rice.accessionId}_${rice.riceSeason}_Season_${rice.riceYear}`} bgColor="#FAFAFA" fgColor="rgba(18, 20, 20, 0.8)" includeMargin={true} size={150} />
                                                <QRCodeCanvas id={`qr-gen-${rice.accessionId}`} className="sm:hidden" value={`${rice.accessionId}_${rice.riceSeason}_Season_${rice.riceYear}`} fgColor="rgba(18, 20, 20, 0.9)" size={80} />
                                            </div>
                                            <div className=" flex flex-auto   justify-between items-center  ">
                                                <div className="">
                                                    <h1 className=" text-sm whitespace-nowrap sm:text-xl font-bold text-sprBlack opacity-80">
                                                        {rice.accessionId}
                                                    </h1>
                                                    <h6 className="text-xs font-medium text-sprGray60">
                                                        {rice.riceSeason}
                                                    </h6>
                                                    <h6 className="text-xs font-medium text-sprGray60">
                                                        {rice.riceYear}
                                                    </h6>
                                                    <div className="flex  items-center  font-medium text-sprGray60">
                                                        <ShelfIcon className="fill-sprPrimary h-5 " />
                                                        <p className="text-md" ># {rice.shelfNum}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2 sm:pt-1 ">
                                                    <button onClick={() => {
                                                        console.log(rice.id)
                                                        setModalIsOpen(true)
                                                    }} className=" text-white text-xs sm:text-sm bg-gradient-to-b from-sprPrimary to-sprPrimaryDark h-6 w-10 sm:h-6 sm:w-12 rounded-full drop-shadow-md " >
                                                        view
                                                    </button>
                                                    <button
                                                        className=" bg-sprPrimary rounded-full drop-shadow-md  " onClick={() => downloadQR(rice.accessionId, rice.riceSeason, rice.riceYear)}
                                                    >
                                                        <div className=" w-6 sm:w-6 h-6"><img src={downloadIcon} alt="" /></div>
                                                    </button>

                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </>}




                            </div>

                        }
                    </div>
                </section>


                {/* <section className={listOn === true ? "flex-auto overflow-auto  scrollbar rounded-lg border border-slate-200 " : "hidden"}>
                    {riceList.length === 0 ? <div className="flex justify-center items-center pt-32 flex-col gap-8 "><EmptyIllustration /><p className="font-medium text-xl text-sprPrimaryOffLight">Plenty of space in the field </p></div> : <div className="flex h-96">
                        <div className="hidden sm:block divide-y bg-white divide-slate-300 h-fit">
                        <div className="text-sprPrimary bg-white sticky top-0 px-8 py-2 text-sm font-medium">

                                #</div>
                            {searchValue === '' ? <>
                                {riceList.map((rice) => (
                                    <div className="px-6 py-3 text-sprPrimaryDark"> {list = list + 1}</div>
                                ))}
                            </> : <>

                                {
                                    searched.map((rice) => (
                                        <div className="px-6 py-3 text-sprPrimaryDark"> {list = list + 1}</div>
                                    ))
                                }
                            </>}
                        </div>
                        <div className="hidden sm:block flex-auto divide-y bg-slate-50 divide-slate-300 h-fit">
                        <div className="text-sprPrimary bg-white sticky top-0 px-8 py-2 text-sm font-medium">

                                Accession</div>
                            {searchValue === '' ? <>
                                {riceList.map((rice) => (
                                    <div className="px-6 py-3"> {rice.accessionId}</div>
                                ))}
                            </> : <>

                                {
                                    searched.map((rice) => (
                                        <div className="px-6 py-3"> {rice.accessionId}</div>
                                    ))
                                }
                            </>}
                        </div>
                        <div className=" hidden sm:block flex-auto divide-y bg-slate-100 divide-slate-300 h-fit">
                        <div className="text-sprPrimary bg-white sticky top-0 px-8 py-2 text-sm font-medium">

                                Season </div>
                            {searchValue === '' ? <>
                                {riceList.map((rice) => (
                                    <div className="px-6 py-3"> {rice.riceSeason}</div>
                                ))}
                            </> : <>

                                {
                                    searched.map((rice) => (
                                        <div className="px-6 py-3"> {rice.riceSeason}</div>
                                    ))
                                }
                            </>}
                        </div>
                        <div className="hidden sm:block flex-auto divide-y bg-slate-50 divide-slate-300 h-fit">
                        <div className="text-sprPrimary bg-white sticky top-0 px-8 py-2 text-sm font-medium">

                                Year</div>
                            {searchValue === '' ? <>
                                {riceList.map((rice) => (
                                    <div className="px-6 py-3"> {rice.riceYear}</div>
                                ))}
                            </> : <>

                                {
                                    searched.map((rice) => (
                                        <div className="px-6 py-3"> {rice.riceYear}</div>
                                    ))
                                }
                            </>}
                        </div>
                        <div className="  w-full sm:w-auto ">
                        <div className=" text-sprPrimary bg-white sticky top-0 px-8 py-2 text-sm font-medium">

                                <p className="opacity-0">Action</p></div>
                            {searchValue === '' ? <>
                                {riceList.map((rice) => (
                                    <div className="px-6 py-3 flex items-center justify-between gap-2 bg-slate-100 sm:bg-white m-1 sm:m-0 rounded-lg ">
                                        <div className=" sm:hidden">
                                            <h1 className="text-xl font-bold text-sprBlack opacity-80">
                                                {rice.accessionId}
                                            </h1>
                                            <h6 className="text-xs font-medium text-sprGray60">
                                                {rice.riceSeason}
                                            </h6>
                                            <h6 className="text-xs font-medium text-sprGray60">
                                                {rice.riceYear}
                                            </h6>
                                        </div>
                                        <button
                                            className=" text-white text-sm bg-gradient-to-b from-sprPrimary to-sprPrimaryDark  sm:h-6 sm:w-12 rounded-full shadow-lg shadow-slate-300 "
                                            onClick={() => {
                                                console.log("hi");
                                            }}
                                        >
                                            view
                                        </button>

                                    </div>
                                ))}
                            </> : <>

                                {searched.map((rice) => (
                                    <div className="px-6 py-3 flex items-center justify-between gap-2 bg-slate-100 sm:bg-white m-1 sm:m-0 rounded-lg ">
                                        <div className=" sm:hidden">
                                            <h1 className="text-xl font-bold text-sprBlack opacity-80">
                                                {rice.accessionId}
                                            </h1>
                                            <h6 className="text-xs font-medium text-sprGray60">
                                                {rice.riceSeason}
                                            </h6>
                                            <h6 className="text-xs font-medium text-sprGray60">
                                                {rice.riceYear}
                                            </h6>
                                        </div>
                                        <button
                                            className=" text-white text-sm bg-gradient-to-b from-sprPrimary to-sprPrimaryDark h-8 w-14 sm:h-6 sm:w-12 rounded-full shadow-lg shadow-slate-300 "
                                            onClick={() => {
                                                console.log("hi");
                                            }}
                                        >
                                            view
                                        </button>

                                    </div>
                                ))}
                            </>}

                        </div>
                    </div>}
                </section >

                <section className={listOn === false ? "flex-auto overflow-auto  scrollbar rounded-lg border border-slate-200" : "hidden"}>
                    {riceList.length === 0 ? <div className="flex justify-center items-center flex-col gap-8 pt-32 "><EmptyIllustration /><p className="font-medium text-xl text-sprPrimaryOffLight">Plenty of space in the field </p></div> :
                        <div className=" grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4  gap-2  grid-colors-black p-2  " >
                            {searchValue === '' ? <>
                                {riceList.map((rice) => (

                                    <div className="flex  flex-col  p-4 pt-2 pr-6 sm:pr-4   rounded-lg bg-slate-50  drop-shadow-md  hover:bg-sprPrimaryOffLight ">

                                        <div className="flex  justify-center p-4">
                                            <QRCodeCanvas id={`qr-gen-${rice.accessionId}`} className="hidden sm:block rounded-xl" value={`${rice.accessionId}_${rice.riceSeason}_Season_${rice.riceYear}`} bgColor="#FAFAFA" fgColor="rgba(18, 20, 20, 0.8)" includeMargin={true} size={150} />
                                            <QRCodeCanvas id={`qr-gen-${rice.accessionId}`} className="sm:hidden" value={`${rice.accessionId}_${rice.riceSeason}_Season_${rice.riceYear}`} fgColor="rgba(18, 20, 20, 0.9)" size={80} />
                                        </div>
                                        <div className=" flex flex-auto   justify-between items-center  ">
                                            <div className="">
                                                <h1 className=" text-sm whitespace-nowrap sm:text-xl font-bold text-sprBlack opacity-80">
                                                    {rice.accessionId}
                                                </h1>
                                                <h6 className="text-xs font-medium text-sprGray60">
                                                    {rice.riceSeason}
                                                </h6>
                                                <h6 className="text-xs font-medium text-sprGray60">
                                                    {rice.riceYear}
                                                </h6>
                                            </div>
                                            <div className="flex items-center space-x-2 sm:pt-1 ">
                                                <button onClick={() => {
                                                    setModalIsOpen(true)
                                                }} className=" text-white text-xs sm:text-sm bg-gradient-to-b from-sprPrimary to-sprPrimaryDark h-6 w-10 sm:h-6 sm:w-12 rounded-full drop-shadow-md ">
                                                    view
                                                </button>
                                                <button
                                                    className=" bg-sprPrimary rounded-full drop-shadow-md  " onClick={() => downloadQR(rice.accessionId, rice.riceSeason, rice.riceYear)}
                                                >
                                                    <div className=" w-6 sm:w-6 h-6"><img src={downloadIcon} alt="" /></div>
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </> : <>

                                {searched.map((rice) => (

                                    <div className="flex  flex-col  p-4 pt-2 pr-6 sm:pr-4   rounded-lg bg-slate-50  drop-shadow-md  hover:bg-sprPrimaryOffLight ">

                                        <div className="flex  justify-center p-4">
                                            <QRCodeCanvas id={`qr-gen-${rice.accessionId}`} className="hidden sm:block rounded-xl" value={`${rice.accessionId}_${rice.riceSeason}_Season_${rice.riceYear}`} bgColor="#FAFAFA" fgColor="rgba(18, 20, 20, 0.8)" includeMargin={true} size={150} />
                                            <QRCodeCanvas id={`qr-gen-${rice.accessionId}`} className="sm:hidden" value={`${rice.accessionId}_${rice.riceSeason}_Season_${rice.riceYear}`} fgColor="rgba(18, 20, 20, 0.9)" size={80} />
                                        </div>
                                        <div className=" flex flex-auto   justify-between items-center  ">
                                            <div className="">
                                                <h1 className=" text-sm whitespace-nowrap sm:text-xl font-bold text-sprBlack opacity-80">
                                                    {rice.accessionId}
                                                </h1>
                                                <h6 className="text-xs font-medium text-sprGray60">
                                                    {rice.riceSeason}
                                                </h6>
                                                <h6 className="text-xs font-medium text-sprGray60">
                                                    {rice.riceYear}
                                                </h6>
                                            </div>
                                            <div className="flex items-center space-x-2 sm:pt-1 ">
                                                <button onClick={() => {
                                                    setModalIsOpen(true)
                                                }} className=" text-white text-xs sm:text-sm bg-gradient-to-b from-sprPrimary to-sprPrimaryDark h-6 w-10 sm:h-6 sm:w-12 rounded-full drop-shadow-md ">
                                                    view
                                                </button>
                                                <button
                                                    className=" bg-sprPrimary rounded-full drop-shadow-md  " onClick={() => downloadQR(rice.accessionId, rice.riceSeason, rice.riceYear)}
                                                >
                                                    <div className=" w-6 sm:w-6 h-6"><img src={downloadIcon} alt="" /></div>
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>}


                        </div>}

                </section> */}




            </div>


        </>
    );
}