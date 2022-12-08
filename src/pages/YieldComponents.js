import { collection, collectionGroup, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import db from "../firebase-config";
import { ReactComponent as EditIcon } from '../assets/edit-icon.svg'
import { ReactComponent as ExcelIcon } from '../assets/excel-icon.svg'
import { ReactComponent as SearchIcon } from "../assets/search-icon.svg"

import ModalYieldUpdate from "../components/ModalYieldUpdate";




export default function YieldComponents() {
  // Season Filter
  const [season, setSeason] = useState('All')
  const changeSeason = (e) => {
    setSeason(e.target.value)
  }

   // Year Filter ---------------> 
  const [year, setYear] = useState('All')
   const years = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2030]
   const changeYear = (e) => {
       setYear(e.target.value)
   }

// List All and Filter ------------------->
const [riceData, setRiceData] = useState([])
useEffect(() => {

  var riceCollectionRef;

  if (season === 'All' && year === 'All') {
      riceCollectionRef = collectionGroup(db, "YC_Raw_Rice_Data");

  }
  if (season === 'All' && year !== 'All') {
      riceCollectionRef = query(collectionGroup(db, "YC_Raw_Rice_Data"), where("riceYear", "==", year));
  }
  if (season === 'Wet_Season' && year === 'All') {
    riceCollectionRef = query(collection(db, `/SPR/Rice_Seasons/Seasons/${season}/Stages/Yield_Components/YC_Raw_Rice_Data`))

  }
  if (season === 'Dry_Season' && year === 'All') {
    riceCollectionRef = query(collection(db, `/SPR/Rice_Seasons/Seasons/${season}/Stages/Yield_Components/YC_Raw_Rice_Data`))

  }
  if (season === 'Dry_Season' && year !== 'All') {
      riceCollectionRef = query(collection(db, `/SPR/Rice_Seasons/Seasons/${season}/Stages/Yield_Components/YC_Raw_Rice_Data`), where("riceYear", "==", year))
  }
  if (season === 'Wet_Season' && year !== 'All') {
      riceCollectionRef = query(collection(db, `/SPR/Rice_Seasons/Seasons/${season}/Stages/Yield_Components/YC_Raw_Rice_Data`), where("riceYear", "==", year))
  }

  onSnapshot(riceCollectionRef, (snapshot) => {
    setRiceData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  });

}, [season,year]);

  // Update Yield Characteristics
     const [isModalOpen, setIsModalOpen] = useState(false)
     const [modalId, setModalId] = useState('')
     const [modalYear, setModalYear] = useState('')
     const [modalSeason, setModalSeason] = useState('')

  //  Get YC Data
  const [ycRiceData, setYcRiceData] = useState('')

	const getRiceData=(id)=>{
		const find = riceData.find((rice)=> rice.tagId === id )
		setYcRiceData(find)
	}

  
   // Export Excel
	  const exportExcel = () => {
        var XLSX = require("xlsx");
        console.log('exporting');
        var wb= XLSX.utils.book_new()
			  var ws = XLSX.utils.json_to_sheet(riceData)
	


        XLSX.utils.book_append_sheet(wb,ws,`SPR_YC`)

        XLSX.writeFile(wb, `Special_Purpose_Rice_Yield_Components.xlsx`)
    }


  return (

    <>
   <div className="flex flex-col">

       <div className="flex p-1 bg-sprPrimaryOffLight/40 gap-2">
         {/* Search Bar */}
         <div className="relative ">
              <input
                className=" pl-2  text-sm placeholder:text-sprPrimary/80 text-sprPrimary focus:border-none  rounded-full shadow-inner shadow-slate-200 focus:outline-none focus:ring-1 focus:ring-sprPrimary  "
                type="text"
                placeholder="Find a Rice"
                
              />
              <button className="  h-full px-1 rounded-full absolute right-0 bg-sprPrimary">
                <SearchIcon className="stroke-white h-3" />
              </button>
          </div>
        {/* Season */}
        <div className=" flex" >
        <div className="bg-sprPrimaryLight text-white  text-sm rounded-full pl-2 pr-10 flex items-center">
          <p>Season</p>
        </div>
        <div className=" -ml-9">
          <select value={season} name="riceSeason" onChange={changeSeason}  className="rounded-full  text-sprPrimary text-sm  focus:outline-none focus:ring-1 focus:ring-sprPrimary border border-white ">
            <option value="All">All</option>
            <option value="Dry_Season">Dry</option>
            <option value="Wet_Season">Wet</option>
          </select>
        </div>



        </div>
        {/* Year */}
        <div className=" flex" >
        <div className="bg-sprPrimaryLight text-white  text-sm rounded-full pl-2 pr-10 flex items-center">
          <p>Year</p>
        </div>
        <div className=" -ml-9">
          <select value={year} name="riceYear" onChange={changeYear}  className="rounded-full  text-sprPrimary text-sm  focus:outline-none focus:ring-1 focus:ring-sprPrimary border border-white ">
            <option value="All">All</option>
            {
                                        years.map((e) =>
                                            <option value={e} >{e}</option>

                                        )
                                    }
          </select>
        </div>



        </div>
      </div>
      <div className="  flex flex-auto text-sprGray60 text-sm">
        <table className="">
          <thead className=" text-xs font-medium uppercase text-center bg-sprPrimaryOffLight">Accession</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Accession</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> CL-R{rice.accessionId === "" ? "---" : rice.accessionId}</div>
              ))}
            </div>
          </tbody>
        </table>
        <table className="">
          <thead className=" text-xs font-medium uppercase text-center bg-sprPrimaryLight">Shelf No.</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">#</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.shelfNum === "" ? "---" : rice.shelfNum}</div>
              ))}
            </div>
          </tbody>
        </table>
        <table className="">
          <thead className=" text-xs font-medium uppercase text-center bg-sprPrimaryOffLight">Year & Season</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Year</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.riceYear === "" ? "---" : rice.riceYear}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Season</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.riceSeason === "" ? "---" : rice.riceSeason}</div>
              ))}
            </div>
          </tbody>
        </table>
        <table className="">
          <thead className="text-xs font-medium uppercase text-center bg-sprPrimaryLight">Yield Components</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Cavans</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 bg-slate-50 whitespace-nowrap"> {rice.cavans === "" ? "---" : rice.cavans}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Kilogram</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.kilogram === "" ? "---" : rice.kilogram}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Grain Yield</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.grainYield === "" ? "---" : rice.grainYield}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Ton/Ha</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.tonHa === "" ? "---" : rice.tonHa}</div>
              ))}
            </div>
          </tbody>

        </table>
        <table className="">
          <thead className="text-xs font-medium uppercase text-center bg-sprPrimaryOffLight">Aroma</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Cooked Rice</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 v bg-slate-50"> {rice.cookedRiceAroma === "" ? "---" : rice.cookedRiceAroma}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium text-sprPrimary">Grain</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3"> {rice.grainAroma === "" ? "---" : rice.grainAroma}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium text-sprPrimary">Leaf</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 bg-slate-50"> {rice.leafAroma === "" ? "---" : rice.leafAroma}</div>
              ))}
            </div>
          </tbody>
        </table>
        <table className=" text-sm sticky right-0 ">
          <thead className="text-xs font-medium uppercase text-center bg-white flex justify-center">
             <h1 className="group" onClick={()=>{exportExcel()}}>
                                    <ExcelIcon className='stroke-sprPrimary h-4 hover:stroke-sprPrimarySuperLight active:stroke-sprPrimary'/>
                                    <small className=' hidden group-hover:block absolute whitespace-nowrap right-2 bg-sprGray60 rounded-sm p-1 text-white capitalize text-xs' >Export as Excel</small>
									</h1>
          </thead>
          <tbody className=" flex bg-white   ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300  ">
              <div className=" py-3 font-medium text-sprPrimary opacity-0">Action</div>
              {riceData.map((rice) => (
                <div className=" px-1 py-2 flex gap-1 border-l border-slate-400">
                  <button
                    className=" p-1 mb-1   bg-gradient-to-b from-sprPrimary to-sprPrimaryDarkest hover:bg-gradient-to-t hover:from-sprPrimaryLight hover:to-sprPrimaryLight   rounded-full   shadow-slate-300 "
                    onClick={() => {
                      console.log(rice.id);
                      setIsModalOpen(true)
                      getRiceData(rice.id)
                      setModalId(rice.id)
                      setModalSeason(rice.riceSeason)
                      setModalYear(rice.riceYear)
                    }}
                  >
                    <EditIcon className="h-4" />
                  </button>

                </div>
              ))}
            </div>
          </tbody>
        </table>
        <ModalYieldUpdate open={isModalOpen} closeModal = {()=>{setIsModalOpen(false)}} modalId={modalId} modalYear={modalYear} modalSeason={modalSeason} ycRiceData={ycRiceData}/>

      </div>
    </div>

    </>


  )
}
