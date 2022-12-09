import { collection, collectionGroup, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "../firebase-config"
import { ReactComponent as EditIcon } from '../assets/edit-icon.svg'
import { ReactComponent as ExcelIcon } from '../assets/excel-icon.svg'

import ModalReproductiveStage from "../components/ModalReproductiveStage";




export default function ReproductiveStage({filterSeason, filterYear, searchInput}) {
 // List All and Filter ------------------->
 const [riceData, setRiceData] = useState([])
 useEffect(() => {

   var riceCollectionRef;

   if (filterSeason === 'All' && filterYear === 'All') {
       riceCollectionRef = collectionGroup(db, "RS_Raw_Rice_Data");

   }
   if (filterSeason === 'All' && filterYear !== 'All') {
       riceCollectionRef = query(collectionGroup(db, "RS_Raw_Rice_Data"), where("riceYear", "==", filterYear));
   }
   if (filterSeason === 'Wet_Season' && filterYear === 'All') {
     riceCollectionRef = query(collection(db, `/SPR/Rice_Seasons/Seasons/${filterSeason}/Stages/Reproductive_Stage/RS_Raw_Rice_Data`))

   }
   if (filterSeason === 'Dry_Season' && filterYear === 'All') {
     riceCollectionRef = query(collection(db, `/SPR/Rice_Seasons/Seasons/${filterSeason}/Stages/Reproductive_Stage/RS_Raw_Rice_Data`))

   }
   if (filterSeason === 'Dry_Season' && filterYear !== 'All') {
       riceCollectionRef = query(collection(db, `/SPR/Rice_Seasons/Seasons/${filterSeason}/Stages/Reproductive_Stage/RS_Raw_Rice_Data`), where("riceYear", "==", filterYear))
   }
   if (filterSeason === 'Wet_Season' && filterYear !== 'All') {
       riceCollectionRef = query(collection(db, `/SPR/Rice_Seasons/Seasons/${filterSeason}/Stages/Reproductive_Stage/RS_Raw_Rice_Data`), where("riceYear", "==", filterYear))
   }

   onSnapshot(riceCollectionRef, (snapshot) => {
     setRiceData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
   });

 }, [filterSeason, filterYear]);

  // Update Reproductive Stage
  const [isModalOpen, setIsModalOpen] = useState(false)
	const [modalId, setModalId] = useState('')
	const [modalYear, setModalYear] = useState('')
	const [modalSeason, setModalSeason] = useState('')

  // get RS Data
  const [rsRiceData, setRsRiceData] = useState('')

	const getRiceData=(id)=>{
		const find = riceData.find((rice)=> rice.tagId === id )
    console.log('------------------- ');
		console.log(find);
		setRsRiceData(find)
		console.log(rsRiceData);
	}
	console.log('I am RS Rice Data inside vegetative stage');
	console.log(rsRiceData.tagId);
  console.log('Season');
  console.log(modalSeason);

  
  // Export Excel
	  const exportExcel = () => {
        var XLSX = require("xlsx");
        console.log('exporting');
        var wb= XLSX.utils.book_new()
			var ws = XLSX.utils.json_to_sheet(riceData)
	


        XLSX.utils.book_append_sheet(wb,ws,`SPR_RS`)

        XLSX.writeFile(wb, `Special_Purpose_Rice_Reproductive_Stage.xlsx`)
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
          <thead className="text-xs font-medium uppercase text-center bg-sprPrimaryOffLight sticky top-0 z-50">Accession</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Accession</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap">CL-R{rice.accessionId === "" ? "---" : rice.accessionId}</div>
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
          <thead className="text-xs uppercase font-medium text-center bg-sprPrimaryLight sticky top-0 z-50">Anther</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Length</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 bg-slate-50 whitespace-nowrap"> {rice.antherLength === "" ? "---" : rice.antherLength}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Colour</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.antherColour === "" ? "---" : rice.antherColour}</div>
              ))}
            </div>
          </tbody>
        </table>
        <table className="">
          <thead className="text-xs uppercase font-medium text-center bg-sprPrimaryOffLight sticky top-0 z-50">Awns</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Presence Wild Species</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.awnsPresenceWildSpecies === "" ? "---" : rice.awnsPresenceWildSpecies}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Distribution Cultivated Species</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.awnsDistributionCultivatedSpecies === "" ? "---" : rice.awnsDistributionCultivatedSpecies}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Distribution Early Observation</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.awnsDistributionEarlyobs === "" ? "---" : rice.awnsDistributionEarlyobs}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Length</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.awnLength === "" ? "---" : rice.awnLength}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Awns Thickness</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.awnsThickness === "" ? "---" : rice.awnsThickness}</div>
              ))}
            </div>
          </tbody>
        </table>
        <table className="">
          <thead className="text-xs uppercase font-medium text-center bg-sprPrimaryLight sticky top-0 z-50">Lemma</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Colour of Apicus Early Observation</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.lemmaColourofApicusearlyobs === "" ? "---" : rice.lemmaColourofApicusearlyobs}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Anthocyanin Colouration of Area Below Apiculus Early Observation</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.lemmaAnthocyaninColourationofAreaBelowApiculusEarlyobs === "" ? "---" : rice.lemmaAnthocyaninColourationofAreaBelowApiculusEarlyobs}</div>
              ))}
            </div>
          </tbody>
        </table>
        <table className="">
          <thead className="whitespace-nowrap text-xs uppercase font-medium text-center bg-sprPrimaryOffLight sticky top-0 z-50">Lemma and Palea</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Colour Early Observation</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.lemmaandPaleaColourEarlyobs === "" ? "---" : rice.lemmaandPaleaColourEarlyobs}</div>
              ))}
            </div>
          </tbody>
        </table>
        <table className="">
          <thead className="text-xs uppercase font-medium text-center bg-sprPrimaryLight sticky top-0 z-50">Male Sterility</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Sterility</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.maleSterility === "" ? "---" : rice.maleSterility}</div>
              ))}
            </div>
          </tbody>
        </table>
        <table className="">
          <thead className="text-xs uppercase font-medium text-center bg-sprPrimaryOffLight sticky top-0 z-50">Stigma</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Colour</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.stigmaColour === "" ? "---" : rice.stigmaColour}</div>
              ))}
            </div>
          </tbody>
        </table>
        <table className="">
          <thead className="text-xs uppercase font-medium text-center bg-sprPrimaryLight sticky top-0 z-50">Panicle</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Arrangement of Primary Branches</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.panicleArrangementofPrimaryBranches === "" ? "---" : rice.panicleArrangementofPrimaryBranches}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Number of Basal Primary Branches</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.panicleNumberofBasalPrimaryBranches === "" ? "---" : rice.panicleNumberofBasalPrimaryBranches}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 "> 
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Distance from Base to Lowest Spikelet Insertion</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.panicleDistancefromBasetoLowestSpikeletInsertion === "" ? "---" : rice.panicleDistancefromBasetoLowestSpikeletInsertion}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Texture of Main Axis</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.panicleTextureofMainAxis === "" ? "---" : rice.panicleTextureofMainAxis}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Number Per Plant</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.panicleNumberPerPlant === "" ? "---" : rice.panicleNumberPerPlant}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Length</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.panicleLength === "" ? "---" : rice.panicleLength}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Attitude of Main Axis</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.panicleAttitudeofMainAxis === "" ? "---" : rice.panicleAttitudeofMainAxis}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Attitude of Branches</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.panicleAttitudeofBranches === "" ? "---" : rice.panicleAttitudeofBranches}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Secondary Branching</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.panicleSecondaryBranching === "" ? "---" : rice.panicleSecondaryBranching}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Exsertion</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.panicleExsertion === "" ? "---" : rice.panicleExsertion}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Shattering</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.panicleShattering === "" ? "---" : rice.panicleShattering}</div>
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

        <ModalReproductiveStage  open={isModalOpen} closeModal={()=>{setIsModalOpen(false)}} modalId={modalId} modalYear={modalYear} modalSeason={modalSeason} rsRiceData= {rsRiceData}>

        </ModalReproductiveStage>

    
      </div>

        </div>

    </div>
  );
}
