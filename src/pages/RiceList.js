import { collection, collectionGroup, onSnapshot, query, where } from "firebase/firestore";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useRef, useState } from "react";
import db from "../firebase-config";
import downloadIcon from '../assets/download-icon.svg'
import closeIcon from '../assets/close.svg'

import { ReactComponent as SearchIcon } from '../assets/search-icon.svg'
import { ReactComponent as GridIcon } from '../assets/grid-icon.svg'
import { ReactComponent as ListIcon } from '../assets/list-icon.svg'
import { ReactComponent as EmptyIllustration } from '../assets/empty-illustration.svg'
import { ReactComponent as FilterIcon } from '../assets/filter-icon.svg'
import ModalRiceInfo from "../components/ModalAccessionsInfo";

export default function RiceList() {



  const [riceList, setRiceList] = useState([]);
  const [riceSearchList, setRiceSearchList] = useState([])
  const [listOn, setListOn] = useState(false)
  const [season, setSeason] = useState('All')
  const [year, setYear] = useState('All')
  const [searchValue, setSearchValue] = useState('')
  const [submitSearch, setSubmitSearch] = useState('')
  const [searchStatus, setSearchStatus] = useState('No_Input')
  const [modalIsOpen, setModalIsOpen] = useState(false)


  // For Search
  useEffect(() => {
    try {
      const riceCollectionRef = collectionGroup(db, "Raw_Rice_List");
      const unsub = onSnapshot(riceCollectionRef, (snapshot) => {
        setRiceSearchList(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });

      return unsub;

    } catch (error) {
      console.log(error);
    }
  }, [])

  // For Display

  useEffect(() => {
    try {
      var riceCollectionRef;
      if (searchValue === '') {
        setSearchStatus('No_Input')

      }
      if (searchValue !== '') {
        setSearchStatus('Has_Input')
      }

      if (searchStatus === 'No_Input') {
        if (searchValue === '' && (season === 'All' || season !== 'All') && (year === 'All' || season !== 'All')) {

          riceCollectionRef = collectionGroup(db, "Raw_Rice_List");
        }
        if (season === 'All' && year === 'All') {
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
      }

      // Query With Rice Accession

      if (searchStatus === 'Has_Input') {
        if (searchValue !== "" && season === 'All' && year === "All") {
          riceCollectionRef = query(collectionGroup(db, "Raw_Rice_List"), where("accessionId", "==", searchValue))
        }
        if (searchValue !== "" && season === 'Wet_Season' && year === "All") {
          riceCollectionRef = query(collectionGroup(db, "Raw_Rice_List"), where("id", "==", `${searchValue}_${season}_${year}`))

        }


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
  }, [season, year, submitSearch, searchValue, searchStatus]);

  console.log("---------------");
  console.log(searchValue);

  const downloadQR = (accessionId, riceSeason, riceYear) => {
    console.log(accessionId);
    const canvas = document.getElementById("qr-gen");
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


  // Season Filter
  const changeSeason = (e) => {
    console.log(`1 ${season}`);
    setSeason(e.target.value)
    console.log(`2 ${season}`);
  }
  console.log(riceList);


  // Year Filter
  const years = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2030]

  const changeYear = (e) => {
    setYear(e.target.value)
  }
  console.log(year);

  // Search Suggest
  const searchInputChange = (e) => {
    setSearchValue(e.target.value)
    console.log('kkkkkkk')
    console.log(e.target.parentElement)
  }
  const onSearch = (searchTerm) => {
    setSubmitSearch(searchTerm)
    setSearchValue(searchTerm)
  }

  console.log('brr');
  riceList.map((rice) => {
    console.log(rice.accessionId);
  })

  var searchItem = ''

  console.log('Hi I am');
  console.log(searchValue);
  console.log(searchItem);
  console.log(submitSearch);

  return (
    <>
      <div className='h-full w-full flex flex-col rounded-t-xl sm:rounded-xl bg-white opacity-90 p-2'>
        {/* Header */}
        {/* <header className="   ">
        
        <h1 className="text-3xl font-bold text-sprBlack opacity-80">
          Rice List
        </h1>
      </header> */}
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
        <div className="flex justify-between   p-1 ">
          <div className=" flex  items-center gap-1 sm:gap-3   rounded-full">
            {/* Search bar */}
            <div className="relative ">
              <div className="relative drop-shadow-md hidden sm:block z-20">
                <input
                  className=" pl-2 py-2   text-sm placeholder:text-sprPrimary/50 text-sprPrimary focus:outline-none focus:border-none  rounded-full "
                  type="text"
                  placeholder="Find a Rice"
                  value={searchValue}
                  onChange={searchInputChange}
                />
                <button className="  h-full px-2 rounded-full absolute right-0 bg-sprPrimaryLight " onClick={() => { onSearch(searchValue) }}>
                  <SearchIcon stroke="white" />
                </button>
              </div>
              <div className="absolute z-10 flex flex-col  overflow-auto bg-white w-full rounded-xl p-2 drop-shadow-md -mt-10">
                <div className={searchValue === '' ? 'hidden' : 'pt-10'}></div>
                {riceSearchList.filter((rice) => {
                  searchItem = searchValue
                  const riceAcc = rice.accessionId

                  return searchItem && riceAcc.startsWith(searchItem)
                }).map((rice) =>
                  <div onClick={() => { onSearch(rice.accessionId) }} className=" hover:bg-slate-200 cursor-pointer p-1 rounded-sm">

                    {rice.accessionId}
                  </div>
                )}

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

        <section className={listOn === true ? "flex-auto overflow-auto rounded-sm scrollbar " : "hidden"}>
          {riceList.length === 0 ? <div className="flex justify-center items-center pt-32 flex-col gap-8 "><EmptyIllustration /><p className="font-medium text-xl text-sprPrimaryOffLight">Plenty of space in the field </p></div> : <div className="flex h-96">
            <div className="hidden sm:block flex-auto divide-y bg-slate-50 divide-slate-300 h-fit">
              <div className="px-6 py-3 text-sprPrimaryDark bg-white">Accession</div>
              {riceList.map((rice) => (
                <div className="px-6 py-3"> {rice.accessionId}</div>
              ))}
            </div>
            <div className=" hidden sm:block flex-auto divide-y bg-slate-100 divide-slate-300 h-fit">
              <div className="px-6 py-3 text-sprPrimaryDark bg-white">Season </div>
              {riceList.map((rice) => (
                <div className="px-6 py-3"> {rice.riceSeason}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y bg-slate-50 divide-slate-300 h-fit">
              <div className="px-6 py-3 text-sprPrimaryDark bg-white">Year</div>
              {riceList.map((rice) => (
                <div className="px-6 py-3"> {rice.riceYear}</div>
              ))}
            </div>
            <div className="  w-full sm:w-auto ">
              <div className="px-6 py-3 opacity-0 hidden sm:block">Action</div>
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
                    className=" text-white text-sm bg-gradient-to-b from-sprPrimary to-sprPrimaryDark h-8 w-14 sm:h-6 sm:w-12 rounded-full shadow-lg shadow-slate-300 "
                    onClick={() => {
                      console.log("hi");
                    }}
                  >
                    view
                  </button>

                </div>
              ))}
            </div>
          </div>}
        </section >

        <section className={listOn === false ? "flex-auto overflow-auto rounded-sm scrollbar " : "hidden"}>
          {riceList.length === 0 ? <div className="flex justify-center items-center flex-col gap-8 pt-32 "><EmptyIllustration /><p className="font-medium text-xl text-sprPrimaryOffLight">Plenty of space in the field </p></div> : <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5   gap-2  grid-colors-black p-2  h-12 " >

            {riceList.map((rice) => (

              // border-solid border-2 border-sprPrimaryLight
              <div className="flex  flex-col  p-4 pt-2 pr-6 sm:pr-4   rounded-lg bg-slate-50  drop-shadow-md  hover:bg-sprPrimaryOffLight">
                {console.log('booop')}

                <div className="flex  justify-center p-4">
                  <QRCodeCanvas id="qr-gen" className="hidden sm:block rounded-xl" value={`${rice.accessionId}_${rice.riceSeason}_Season_${rice.riceYear}`} bgColor="#FAFAFA" fgColor="rgba(18, 20, 20, 0.8)" includeMargin={true} size={150} />
                  <QRCodeCanvas id="qr-gen" className="sm:hidden" value={`${rice.accessionId}_${rice.riceSeason}_Season_${rice.riceYear}`} fgColor="rgba(18, 20, 20, 0.9)" size={80} />
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
          </div>}

        </section>

        <ModalRiceInfo open={modalIsOpen} >
          <div className=" fixed left-0 right-0 bottom-0 top-0 z-50 bg-black opacity-70 " />
          <div className=" flex flex-col absolute left-3 right-3 bottom-16 top-16 sm:left-12 sm:right-12 md:left-28 md:right-28 lg:left-1/4 lg:right-1/4 z-50 bg-white rounded-xl  px-4 pt-8 pb-4   ">
            <div className="absolute right-5 z-50 ">
              <button onClick={() => setModalIsOpen(false)}>
                <img className="relative" src={closeIcon} alt="" />
              </button>
            </div>
            <div className="bg-yellow-400 flex  ">
              <header className="  bg-red-600">
                <h1 className="text-3xl font-bold text-sprBlack opacity-80 p-2">
                  Rice Info
                </h1>
              </header>
              <div className="bg-yellow-400">
              </div>
            </div>
            <div className="bg-violet-500 flex-auto flex flex-col">
              <div className="bg-green-600 w-full h-1/4 flex ">
                <div className="bg-pink-600  w-1/2 p-3">
                  <div className="bg-yellow-400 h-full">image</div></div>
                <div className="bg-pink-300 flex flex-col flex-auto">
                  {/* <h1>{currentData.accessionId}</h1>
                <p>Season: {currentData.riceSeason} Season</p>
                <p>Year: {currentData.riceYear}</p> */}
                </div>
              </div>
              <div className="bg-green-600 w-full flex-auto">
                {/* <p>7.3.2 Auricle Color : {vsData.auricleColor}</p> */}
              </div>

            </div>
          </div>
        </ModalRiceInfo>


      </div>


    </>
  );
}
