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
import { ReactComponent as ExcelIcon } from "../assets/excel-icon.svg"

import ModalRiceList from "../components/ModalRiceList";

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

    // Export Excel
	  const exportExcel = () => {
        var XLSX = require("xlsx");
        console.log('exporting');
        var wb= XLSX.utils.book_new()
		if(searchValue === ''){
			var ws = XLSX.utils.json_to_sheet(riceList)
		}
		else{
			var ws = XLSX.utils.json_to_sheet(searched)
		}


        XLSX.utils.book_append_sheet(wb,ws,`Special Purpose Rice Rice List`)

        XLSX.writeFile(wb, `Special_Purpose_Rice_Rice_List.xlsx`)
    }







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

    // currentData for Modal 
  const [isModalOpen, setIsModalOpen] = useState(false)

    const[currentData, setCurrentData] = useState(
        {
            accessionId: '',
            riceSeason: '',
            riceYear: '',
            shelfNum: '',
        }
    )

    return (
        <>
            <div className='h-full w-full flex flex-col rounded-t-xl sm:rounded-xl bg-white opacity-90 p-2'>
                <header className="  flex items-center justify-between">

                    <h1 className="text-3xl font-bold text-sprBlack opacity-80 ">
                        Rice List</h1>
                    <div className="relative sm:hidden ">
                        <form>
                            <input
                            className=" pl-2 py-2  w-36  text-sm h-5 placeholder:text-sprPrimary/50 text-sprPrimary focus:outline-none focus:border-none  rounded-full drop-shadow-sm"
                            type="text"
                            value={searchValue}
                                        onChange={searchInputChange}
                        />
                        <button className="  h-full px-2 rounded-full absolute right-0 ">
                            <SearchIcon stroke="#AFBE00" />
                        </button>
                        </form>
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
                    <div className="hidden sm:flex w-full h-full   sm:max-w-92 lg:max-w-full relative  justify-center ">
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
                                <div className=" hidden sm:flex divide-y bg-slate-100 divide-slate-300 h-fit  flex-col justify-center ">

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
                                    <div className="text-sprPrimary bg-white flex justify-center sticky top-0 px-6 py-2 text-sm font-medium ">
                                        <h1 className="group" onClick={()=>{exportExcel()}}>
                                    <ExcelIcon className='stroke-sprPrimary h-5 hover:stroke-sprPrimarySuperLight active:stroke-sprPrimary'/>
                                    <small className=' hidden group-hover:block absolute whitespace-nowrap right-2 bg-sprGray60 rounded-sm p-1 text-white' >Export as Excel</small>
									</h1>
                                    </div>
                                    {searchValue === '' ? <>
                                        {riceList.map((rice) => (
                                            <div className="px-6 py-3 ">
                                                <button className="text-white text-sm bg-gradient-to-b from-sprPrimary to-sprPrimaryDark  rounded-full w-10" onClick={() => { 
                                                   setCurrentData({
                                                    accessionId: rice.accessionId,
                                                    riceSeason: rice.riceSeason,
                                                    riceYear: rice.riceYear,
                                                    shelfNum: rice.shelfNum
                                                   })

                                                   setIsModalOpen(true)
                                                }}
                                                
                                                > view</button>
                                            </div>
                                        ))}
                                    </> : <>

                                        {
                                            searched.map((rice) => (
                                                <div className="px-6 py-3 ">
                                                    <button className="text-white text-sm bg-gradient-to-b from-sprPrimary to-sprPrimaryDark  rounded-full w-10" onClick={() => {
                                                         setCurrentData({
                                                    accessionId: rice.accessionId,
                                                    riceSeason: rice.riceSeason,
                                                    riceYear: rice.riceYear,
                                                    shelfNum: rice.shelfNum
                                                   })

                                                   setIsModalOpen(true)
                                                    }}> view</button>
                                                </div>
                                            ))
                                        }
                                    </>}
                                </div>

                            </div>

                        }
                    
                    </div>
                     {/* Mobile */}
                        
                        <div className="flex sm:hidden bg-yellow-400 max-h-0 flex-col gap-2">
                           {searchValue === ''?<>
                            {riceList.map((rice)=>(
                                <div className="flex justify-between items-center  bg-slate-50">
									<div className="flex flex-col -space-y-3">
										<div className="px-6 py-4 text-3xl font-bold text-sprGray80">CL-R{rice.accessionId}</div>
										<div className="px-6 py-2 text-md font-normal text-sprPrimaryLight">{rice.riceSeason} Season</div>
										<div className="px-6 py-2 text-md font-normal text-sprPrimaryLight">{rice.riceYear}</div>
										<div className="px-6 py-2 text-md font-normal text-sprPrimaryLight flex gap-1">
                                                        <ShelfIcon className="fill-sprPrimary h-5 " />
                                            
                                            #{rice.shelfNum}</div>
									</div>
										<button className="mr-8 bg-sprPrimary hover:bg-sprPrimaryLight active:bg-sprPrimary rounded-full p-1 px-2 text-white font-medium text-xl" onClick={() => {
													setCurrentData({
                                                    accessionId: rice.accessionId,
                                                    riceSeason: rice.riceSeason,
                                                    riceYear: rice.riceYear,
                                                    shelfNum: rice.shelfNum
                                                   })

                                                   setIsModalOpen(true)

												}}>view</button>
									</div>
                            ))}</>:<>
                             {searched.map((rice)=>(
                                <div className="flex justify-between items-center  bg-slate-50">
									<div className="flex flex-col -space-y-3">
										<div className="px-6 py-4 text-3xl font-bold text-sprGray80">CL-R{rice.accessionId}</div>
										<div className="px-6 py-2 text-md font-normal text-sprPrimaryLight">{rice.riceSeason} Season</div>
										<div className="px-6 py-2 text-md font-normal text-sprPrimaryLight">{rice.riceYear}</div>
										<div className="px-6 py-2 text-md font-normal text-sprPrimaryLight flex gap-1">
                                                        <ShelfIcon className="fill-sprPrimary h-5 " />
                                            
                                            #{rice.shelfNum}</div>
									</div>
										<button className="mr-8 bg-sprPrimary hover:bg-sprPrimaryLight active:bg-sprPrimary rounded-full p-1 px-2 text-white font-medium text-xl" onClick={() => {
													setCurrentData({
                                                    accessionId: rice.accessionId,
                                                    riceSeason: rice.riceSeason,
                                                    riceYear: rice.riceYear,
                                                    shelfNum: rice.shelfNum
                                                   })

                                                   setIsModalOpen(true)

												}}>view</button>
									</div>
                            ))}</>}
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
                                                         setCurrentData({
                                                    accessionId: rice.accessionId,
                                                    riceSeason: rice.riceSeason,
                                                    riceYear: rice.riceYear,
                                                    shelfNum: rice.shelfNum
                                                   })

                                                   setIsModalOpen(true)
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
                                                        CL-R{rice.accessionId}
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
                                                         setCurrentData({
                                                    accessionId: rice.accessionId,
                                                    riceSeason: rice.riceSeason,
                                                    riceYear: rice.riceYear,
                                                    shelfNum: rice.shelfNum
                                                   })

                                                   setIsModalOpen(true)
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
             


            </div>

                <ModalRiceList open={isModalOpen} closeModal={()=>{setIsModalOpen(false)}} currentData={currentData} />
        </>
    );
}