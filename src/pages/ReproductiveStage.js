import { collection, collectionGroup, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import db from "../firebase-config"
import { ReactComponent as EditIcon } from '../assets/edit-icon.svg'
import { ReactComponent as ExcelIcon } from '../assets/excel-icon.svg'
import { ReactComponent as SearchIcon } from "../assets/search-icon.svg"

import ModalReproductiveStage from "../components/ModalReproductiveStage";




export default function ReproductiveStage() {
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
       riceCollectionRef = collectionGroup(db, "RS_Raw_Rice_Data");

   }
   if (season === 'All' && year !== 'All') {
       riceCollectionRef = query(collectionGroup(db, "RS_Raw_Rice_Data"), where("riceYear", "==", year));
   }
   if (season === 'Wet_Season' && year === 'All') {
     riceCollectionRef = query(collection(db, `/SPR/Rice_Seasons/Seasons/${season}/Stages/Reproductive_Stage/RS_Raw_Rice_Data`))

   }
   if (season === 'Dry_Season' && year === 'All') {
     riceCollectionRef = query(collection(db, `/SPR/Rice_Seasons/Seasons/${season}/Stages/Reproductive_Stage/RS_Raw_Rice_Data`))

   }
   if (season === 'Dry_Season' && year !== 'All') {
       riceCollectionRef = query(collection(db, `/SPR/Rice_Seasons/Seasons/${season}/Stages/Reproductive_Stage/RS_Raw_Rice_Data`), where("riceYear", "==", year))
   }
   if (season === 'Wet_Season' && year !== 'All') {
       riceCollectionRef = query(collection(db, `/SPR/Rice_Seasons/Seasons/${season}/Stages/Reproductive_Stage/RS_Raw_Rice_Data`), where("riceYear", "==", year))
   }

   onSnapshot(riceCollectionRef, (snapshot) => {
     setRiceData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
   });

 }, [season,year]);

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
      <div className="  flex text-sm text-sprGray60">
        <table className="">
          <thead className="text-xs font-medium uppercase text-center bg-sprPrimaryOffLight">Accession</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Accession</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap">CL-R{rice.accessionId === "" ? "---" : rice.accessionId}</div>
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
          <thead className="text-xs uppercase font-medium text-center bg-sprPrimaryLight">Anther</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Length</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 bg-slate-50 whitespace-nowrap"> {rice.antherLength === "" ? "---" : rice.antherLength}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Colour</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.antherColour === "" ? "---" : rice.antherColour}</div>
              ))}
            </div>
          </tbody>
        </table>
        <table className="">
          <thead className="text-xs uppercase font-medium text-center bg-sprPrimaryOffLight">Awns</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Presence Wild Species</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.awnsPresenceWildSpecies === "" ? "---" : rice.awnsPresenceWildSpecies}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Distribution Cultivated Species</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.awnsDistributionCultivatedSpecies === "" ? "---" : rice.awnsDistributionCultivatedSpecies}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Distribution Early Observation</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.awnsDistributionEarlyobs === "" ? "---" : rice.awnsDistributionEarlyobs}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Length</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.awnLength === "" ? "---" : rice.awnLength}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Awns Thickness</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.awnsThickness === "" ? "---" : rice.awnsThickness}</div>
              ))}
            </div>
          </tbody>
        </table>
        <table className="">
          <thead className="text-xs uppercase font-medium text-center bg-sprPrimaryLight">Lemma</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Colour of Apicus Early Observation</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.lemmaColourofApicusearlyobs === "" ? "---" : rice.lemmaColourofApicusearlyobs}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Anthocyanin Colouration of Area Below Apiculus Early Observation</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.lemmaAnthocyaninColourationofAreaBelowApiculusEarlyobs === "" ? "---" : rice.lemmaAnthocyaninColourationofAreaBelowApiculusEarlyobs}</div>
              ))}
            </div>
          </tbody>
        </table>
        <table className="">
          <thead className="whitespace-nowrap text-xs uppercase font-medium text-center bg-sprPrimaryOffLight">Lemma and Palea</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Colour Early Observation</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.lemmaandPaleaColourEarlyobs === "" ? "---" : rice.lemmaandPaleaColourEarlyobs}</div>
              ))}
            </div>
          </tbody>
        </table>
        <table className="">
          <thead className="text-xs uppercase font-medium text-center bg-sprPrimaryLight">Male Sterility</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Sterility</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.maleSterility === "" ? "---" : rice.maleSterility}</div>
              ))}
            </div>
          </tbody>
        </table>
        <table className="">
          <thead className="text-xs uppercase font-medium text-center bg-sprPrimaryOffLight">Stigma</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Colour</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.stigmaColour === "" ? "---" : rice.stigmaColour}</div>
              ))}
            </div>
          </tbody>
        </table>
        <table className="">
          <thead className="text-xs uppercase font-medium text-center bg-sprPrimaryLight">Panicle</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Arrangement of Primary Branches</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.panicleArrangementofPrimaryBranches === "" ? "---" : rice.panicleArrangementofPrimaryBranches}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Number of Basal Primary Branches</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.panicleNumberofBasalPrimaryBranches === "" ? "---" : rice.panicleNumberofBasalPrimaryBranches}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Distance from Base to Lowest Spikelet Insertion</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.panicleDistancefromBasetoLowestSpikeletInsertion === "" ? "---" : rice.panicleDistancefromBasetoLowestSpikeletInsertion}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Texture of Main Axis</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.panicleTextureofMainAxis === "" ? "---" : rice.panicleTextureofMainAxis}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">pNumber Per Plant</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.panicleNumberPerPlant === "" ? "---" : rice.panicleNumberPerPlant}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Length</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.panicleLength === "" ? "---" : rice.panicleLength}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Attitude of Main Axis</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.panicleAttitudeofMainAxis === "" ? "---" : rice.panicleAttitudeofMainAxis}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Attitude of Branches</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.panicleAttitudeofBranches === "" ? "---" : rice.panicleAttitudeofBranches}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Secondary Branching</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.panicleSecondaryBranching === "" ? "---" : rice.panicleSecondaryBranching}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Exsertion</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.panicleExsertion === "" ? "---" : rice.panicleExsertion}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Shattering</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.panicleShattering === "" ? "---" : rice.panicleShattering}</div>
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
                      setIsModalOpen(true)
                      setModalId(rice.id)
                      setModalSeason(rice.riceSeason)
                      setModalYear(rice.riceYear)
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

    </>
  );
}
