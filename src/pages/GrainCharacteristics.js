import { collection, collectionGroup, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ReactComponent as EditIcon } from '../assets/edit-icon.svg'
import { ReactComponent as ExcelIcon } from '../assets/excel-icon.svg'

import ModalGrainUpdate from "../components/ModalGrainUpdate";

import db from "../firebase-config";




export default function GrainCharacteristics({filterSeason, filterYear, searchInput}) {
 
  // List All and Filter ------------------->
  const [riceData, setRiceData] = useState([])
  useEffect(() => {
 
    var riceCollectionRef;
 
    if (filterSeason === 'All' && filterYear === 'All') {
        riceCollectionRef = collectionGroup(db, "GC_Raw_Rice_Data");
 
    }
    if (filterSeason === 'All' && filterYear !== 'All') {
        riceCollectionRef = query(collectionGroup(db, "GC_Raw_Rice_Data"), where("riceYear", "==", filterYear));
    }
    if (filterSeason === 'Wet_Season' && filterYear === 'All') {
      riceCollectionRef = query(collection(db, `/SPR/Rice_Seasons/Seasons/${filterSeason}/Stages/Grain_Characteristics/GC_Raw_Rice_Data`))
 
    }
    if (filterSeason === 'Dry_Season' && filterYear === 'All') {
      riceCollectionRef = query(collection(db, `/SPR/Rice_Seasons/Seasons/${filterSeason}/Stages/Grain_Characteristics/GC_Raw_Rice_Data`))
 
    }
    if (filterSeason === 'Dry_Season' && filterYear !== 'All') {
        riceCollectionRef = query(collection(db, `/SPR/Rice_Seasons/Seasons/${filterSeason}/Stages/Grain_Characteristics/GC_Raw_Rice_Data`), where("riceYear", "==", filterYear))
    }
    if (filterSeason === 'Wet_Season' && filterYear !== 'All') {
        riceCollectionRef = query(collection(db, `/SPR/Rice_Seasons/Seasons/${filterSeason}/Stages/Grain_Characteristics/GC_Raw_Rice_Data`), where("riceYear", "==", filterYear))
    }
 
    onSnapshot(riceCollectionRef, (snapshot) => {
      setRiceData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
 
  }, [filterSeason, filterYear]);

   // Update Grain Characteristics
   const [isModalOpen, setIsModalOpen] = useState(false)
   const [modalId, setModalId] = useState('')
   const [modalYear, setModalYear] = useState('')
   const [modalSeason, setModalSeason] = useState('')

  //  Get GC Data
  const [gcRiceData, setGcRiceData] = useState('')

	const getRiceData=(id)=>{
		const find = riceData.find((rice)=> rice.tagId === id )
    console.log(find);
		setGcRiceData(find)
	}

   // Export Excel
	  const exportExcel = () => {
        var XLSX = require("xlsx");
        console.log('exporting');
        var wb= XLSX.utils.book_new()
			  var ws = XLSX.utils.json_to_sheet(riceData)
	


        XLSX.utils.book_append_sheet(wb,ws,`SPR_GC`)

        XLSX.writeFile(wb, `Special_Purpose_Rice_Grain_Characteristics.xlsx`)
    }


  return (
    <div className="  flex flex-auto max-w-0 max-h-0 divide-y divide-slate-400 ">
   <div className="flex flex-col">
      {/* <div className="flex p-1 bg-sprPrimaryOffLight/40 gap-2">
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
      </div> */}
      <div className="  flex text-sm text-sprGray60">
        <table className="">
          <thead className="text-xs uppercase font-medium text-center bg-sprPrimaryOffLight sticky top-0 z-50">Accession</thead>
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
              <div className="px-6 text-sm py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">#</div>
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
              <div className="px-6 text-sm py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Year</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.riceYear === "" ? "---" : rice.riceYear}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 text-sm py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Season</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.riceSeason === "" ? "---" : rice.riceSeason}</div>
              ))}
            </div>
          </tbody>
        </table>
        <table className="">
          <thead className="text-xs uppercase font-medium text-center bg-sprPrimaryLight sticky top-0 z-50">Awn</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Colour</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.awnColour === "" ? "---" : rice.awnColour}</div>
              ))}
            </div>
          </tbody>
        </table>
        <table className="">
          <thead className="text-xs uppercase font-medium text-center bg-sprPrimaryOffLight sticky top-0 z-50">Caryopsis</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 whitespave-nowrap font-medium text-sprPrimary sticky top-4 bg-white">Length</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.caryopsisLength === "" ? "---" : rice.caryopsisLength}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Width</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.caryopsisWidth === "" ? "---" : rice.caryopsisWidth}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Shape</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.caryopsisShape === "" ? "---" : rice.caryopsisShape}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Pericarp Colour</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.caryopsisPericarpColour === "" ? "---" : rice.caryopsisPericarpColour}</div>
              ))}
            </div>
          </tbody>
        </table>
        <table className="">
          <thead className="text-xs uppercase font-medium text-center bg-sprPrimaryLight sticky top-0 z-50">Endorsperm</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Colour</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.endorspermType === "" ? "---" : rice.endorspermType}</div>
              ))}
            </div>
          </tbody>
        </table>
        <table className="">
          <thead className="text-xs uppercase font-medium text-center bg-sprPrimaryOffLight sticky top-0 z-50">Grain</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Habit</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.grainLength === "" ? "---" : rice.grainLength}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Width</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.grainWidth === "" ? "---" : rice.grainWidth}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Thickness</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.grainThickness === "" ? "---" : rice.grainThickness}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">100 Grain Weight</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.grain100GrainWeight === "" ? "---" : rice.grain100GrainWeight}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">10 Grain Weight</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.grain10GrainWeight === "" ? "---" : rice.grain10GrainWeight}</div>
              ))}
            </div>
          </tbody>
        </table>
        <table className="">
          <thead className="text-xs uppercase font-medium text-center bg-sprPrimaryLight sticky top-0 z-50">Lemma</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Anthocyanin Colouration of Keel</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.lemmaAnthocyaninColourationofKeel === "" ? "---" : rice.lemmaAnthocyaninColourationofKeel}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Anthocyanin Colouration of Area Below Apiculus Late Observation</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 bg-slate-50 whitespace-nowrap"> {rice.lemmaAnthocyaninColourationofAreaBelowApiculusLateobs === "" ? "---" : rice.lemmaAnthocyaninColourationofAreaBelowApiculusLateobs}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Colour of Apiculus Late Observation</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.lemmaColourofApiculusLateobs === "" ? "---" : rice.lemmaColourofApiculusLateobs}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Shape of Apiculus</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.lemmaShapeofApiculus === "" ? "---" : rice.lemmaShapeofApiculus}</div>
              ))}
            </div>
          </tbody>
        </table>
        <table className="">
          <thead className="text-xs uppercase font-medium text-center bg-sprPrimaryOffLight sticky top-0 z-50">Lemma and Palea</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Pubesence</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.lemmaandPaleaPubesence === "" ? "---" : rice.lemmaandPaleaPubesence}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Colour Late Observation</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.lemmaandPaleaColourLateobs === "" ? "---" : rice.lemmaandPaleaColourLateobs}</div>
              ))}
            </div>
          </tbody>
        </table>
        <table className="">
          <thead className="text-xs uppercase font-medium text-center bg-sprPrimaryLight sticky top-0 z-50 ">Panicle</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Length Late Observation</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.panicleLengthLateobs === "" ? "---" : rice.panicleLengthLateobs}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Threshability</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.panicleThreshability === "" ? "---" : rice.panicleThreshability}</div>
              ))}
            </div>
          </tbody>
        </table>
        <table className="">
          <thead className="text-xs uppercase font-medium text-center bg-sprPrimaryOffLight sticky top-0 z-50">Spikelet</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Fertility</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.spikeletFertility === "" ? "---" : rice.spikeletFertility}</div>
              ))}
            </div>
          </tbody>
        </table>
        <table className="">
          <thead className="text-xs uppercase font-medium text-center bg-sprPrimaryLight sticky top-0 z-50">Sterile</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Lemma Length</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.sterileLemmaLength === "" ? "---" : rice.sterileLemmaLength}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Longer Sterile Lemma Length</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.longerSterileLemmaLength === "" ? "---" : rice.longerSterileLemmaLength}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Lemma Shape</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 bg-slate-50 whitespace-nowrap"> {rice.sterileLemmaShape === "" ? "---" : rice.sterileLemmaShape}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Lemma Colour</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.sterileLemmaColour === "" ? "---" : rice.sterileLemmaColour}</div>
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

        <ModalGrainUpdate open={isModalOpen} closeModal={()=>{setIsModalOpen(false)}} modalId={modalId}  modalYear={modalYear} modalSeason={modalSeason} gcRiceData={gcRiceData}/>
      </div>

   </div>
    </div>
  )
}
