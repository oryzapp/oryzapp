import { collection, collectionGroup, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "../firebase-config";
import { ReactComponent as EditIcon } from '../assets/edit-icon.svg'
import { ReactComponent as ExcelIcon } from '../assets/excel-icon.svg'

import ModalYieldUpdate from "../components/ModalYieldUpdate";




export default function YieldComponents({filterSeason, filterYear, searchInput}) {

  useEffect(()=>{
    console.log(searchInput);
  },[searchInput])

// List All and Filter ------------------->
const [riceData, setRiceData] = useState([])
useEffect(() => {

  var riceCollectionRef;

  if (filterSeason === 'All' && filterYear === 'All') {
      riceCollectionRef = collectionGroup(db, "YC_Raw_Rice_Data");

  }
  if (filterSeason === 'All' && filterYear !== 'All') {
      riceCollectionRef = query(collectionGroup(db, "YC_Raw_Rice_Data"), where("riceYear", "==", filterYear));
  }
  if (filterSeason === 'Wet_Season' && filterYear === 'All') {
    riceCollectionRef = query(collection(db, `/SPR/Rice_Seasons/Seasons/${filterSeason}/Stages/Yield_Components/YC_Raw_Rice_Data`))

  }
  if (filterSeason === 'Dry_Season' && filterYear === 'All') {
    riceCollectionRef = query(collection(db, `/SPR/Rice_Seasons/Seasons/${filterSeason}/Stages/Yield_Components/YC_Raw_Rice_Data`))

  }
  if (filterSeason === 'Dry_Season' && filterYear !== 'All') {
      riceCollectionRef = query(collection(db, `/SPR/Rice_Seasons/Seasons/${filterSeason}/Stages/Yield_Components/YC_Raw_Rice_Data`), where("riceYear", "==", filterYear))
  }
  if (filterSeason === 'Wet_Season' && filterYear !== 'All') {
      riceCollectionRef = query(collection(db, `/SPR/Rice_Seasons/Seasons/${filterSeason}/Stages/Yield_Components/YC_Raw_Rice_Data`), where("riceYear", "==", filterYear))
  }

  onSnapshot(riceCollectionRef, (snapshot) => {
    setRiceData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  });

}, [filterSeason, filterYear]);

  // Sort---------------->
	riceData.sort((a,b)=>{
		return a.accessionId - b.accessionId
	})

  // Update Yield Characteristics---------------->
     const [isModalOpen, setIsModalOpen] = useState(false)
     const [modalId, setModalId] = useState('')
     const [modalYear, setModalYear] = useState('')
     const [modalSeason, setModalSeason] = useState('')

  //  Get YC Data------------>
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


    // DB Data to Array Search for Searching---->
	const [searched, setSearched] = useState([])
	useEffect(() => {
		var searchList = []

		if (searchInput !== "") {
			riceData.map((rice) => {
				const match = rice.searchIndex.toLowerCase()
				const search = match.includes(searchInput)
				if (search === true) {
					searchList.push({
            accessionId: riceData.accessionId,
            tagId: `${riceData.accessionId}_${filterSeason}_${riceData.riceYear}`,
            riceYear: riceData.riceYear,
            riceSeason: riceData.riceSeason,
            shelfNum: riceData.shelfNum,
            cavans: riceData.cavans,
            kilogram: riceData.kilogram,
            grainYield: riceData.grainYield,
            tonHa: riceData.tonHa,
            cookedRiceAroma: riceData.cookedRiceAroma,
            grainAroma: riceData.grainAroma,
            leafAroma: riceData.leafAroma,
            timestamp:riceData.timestamp,
					
					})

				}
			})
		}


		setSearched(searchList)
	}, [searchInput])


  console.log(searched);

  return (

    <div className="  flex flex-auto max-w-0 max-h-0 divide-y divide-slate-400 ">
   <div className="flex flex-col">

    
      <div className="  flex flex-auto text-sprGray60 text-sm">
        <table className="">
          <thead className=" text-xs font-medium uppercase text-center bg-sprPrimaryOffLight sticky top-0 z-50">Accession</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Accession</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> CL-R{rice.accessionId === "" ? "---" : rice.accessionId}</div>
              ))}
            </div>
          </tbody>
        </table>
        <table className="">
          <thead className=" text-xs font-medium uppercase text-center bg-sprPrimaryLight sticky top-0 z-50">Shelf No.</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">#</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.shelfNum === "" ? "---" : rice.shelfNum}</div>
              ))}
            </div>
          </tbody>
        </table>
        <table className="">
          <thead className=" text-xs font-medium uppercase text-center bg-sprPrimaryOffLight sticky top-0 z-50">Year & Season</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Year</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.riceYear === "" ? "---" : rice.riceYear}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Season</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.riceSeason === "" ? "---" : rice.riceSeason}</div>
              ))}
            </div>
          </tbody>
        </table>
        <table className="">
          <thead className="text-xs font-medium uppercase text-center bg-sprPrimaryLight sticky top-0 z-50">Yield Components</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Cavans</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 bg-slate-50 whitespace-nowrap"> {rice.cavans === "" ? "---" : rice.cavans}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Kilogram</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.kilogram === "" ? "---" : rice.kilogram}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Grain Yield</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.grainYield === "" ? "---" : rice.grainYield}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Ton/Ha</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.tonHa === "" ? "---" : rice.tonHa}</div>
              ))}
            </div>
          </tbody>

        </table>
        <table className="">
          <thead className="text-xs font-medium uppercase text-center bg-sprPrimaryOffLight sticky top-0 z-50">Aroma</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Cooked Rice</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 v bg-slate-50"> {rice.cookedRiceAroma === "" ? "---" : rice.cookedRiceAroma}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium text-sprPrimary sticky top-4 bg-white">Grain</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3"> {rice.grainAroma === "" ? "---" : rice.grainAroma}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium text-sprPrimary sticky top-4 bg-white">Leaf</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 bg-slate-50"> {rice.leafAroma === "" ? "---" : rice.leafAroma}</div>
              ))}
            </div>
          </tbody>
        </table>
        <table className=" text-sm sticky right-0 z-100">
          <thead className="text-xs font-medium uppercase text-center bg-white flex justify-center sticky top-0">
          <h1 className="opacity-0">I</h1>
          </thead>
          <tbody className=" flex bg-white   ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 bg-white">
            <div className=" py-3 font-medium text-sprPrimaryflex justify-center border-l border-slate-300 sticky top-4 bg-white">
              <div className="group" onClick={()=>{exportExcel()}}>
                                    <ExcelIcon className='stroke-sprPrimary  pl-1 h-5 hover:stroke-sprPrimarySuperLight active:stroke-sprPrimary '/>
                                    <small className=' hidden group-hover:block absolute whitespace-nowrap right-2 bg-sprGray60 rounded-sm p-1 text-white capitalize text-xs' >Export as Excel</small>
									</div>

              </div>
              {riceData.map((rice) => (
                <div className=" px-1 py-2 flex gap-1 border-l border-slate-400">
                  <button
                    className=" p-1 mb-1   bg-gradient-to-b from-sprPrimary to-sprPrimaryDarkest hover:bg-gradient-to-t hover:from-sprPrimaryLight hover:to-sprPrimaryLight   rounded-full   shadow-slate-300 "
                    onClick={() => {
											setIsModalOpen(true)
											setModalId(rice.id)
											setModalYear(rice.riceYear)
											setModalSeason(rice.riceSeason)
											getRiceData(rice.id)

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

    </div>
  )
}
