import { collection, collectionGroup, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "../firebase-config";
import { ReactComponent as EditIcon } from '../assets/edit-icon.svg'
import { ReactComponent as CloseIcon } from '../assets/close.svg'
import { ReactComponent as ExcelIcon } from "../assets/excel-icon.svg"
import { ReactComponent as SearchIcon } from "../assets/search-icon.svg"


import ModalVegetativeUpdate from "../components/ModalVegetativeUpdate";


export default function VegetativeStage() {

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
        riceCollectionRef = collectionGroup(db, "VS_Raw_Rice_Data");

    }
    if (season === 'All' && year !== 'All') {
        riceCollectionRef = query(collectionGroup(db, "VS_Raw_Rice_Data"), where("riceYear", "==", year));
    }
    if (season === 'Wet_Season' && year === 'All') {
      riceCollectionRef = query(collection(db, `/SPR/Rice_Seasons/Seasons/${season}/Stages/Vegetative_Stage/VS_Raw_Rice_Data`))

    }
    if (season === 'Dry_Season' && year === 'All') {
      riceCollectionRef = query(collection(db, `/SPR/Rice_Seasons/Seasons/${season}/Stages/Vegetative_Stage/VS_Raw_Rice_Data`))

    }
    if (season === 'Dry_Season' && year !== 'All') {
        riceCollectionRef = query(collection(db, `/SPR/Rice_Seasons/Seasons/${season}/Stages/Vegetative_Stage/VS_Raw_Rice_Data`), where("riceYear", "==", year))
    }
    if (season === 'Wet_Season' && year !== 'All') {
        riceCollectionRef = query(collection(db, `/SPR/Rice_Seasons/Seasons/${season}/Stages/Vegetative_Stage/VS_Raw_Rice_Data`), where("riceYear", "==", year))
    }

    onSnapshot(riceCollectionRef, (snapshot) => {
      setRiceData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

  }, [season,year]);

  // Update Vegetative Stage
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [modalId, setModalId] = useState('')
	const [modalYear, setModalYear] = useState('')
	const [modalSeason, setModalSeason] = useState('')

	// get Vs Data
	const [vsRiceData, setVsRiceData] = useState('')
	const getRiceData=(id)=>{
		const find = riceData.find((rice)=> rice.tagId === id )
		console.log(find);
		setVsRiceData(find)
		console.log(vsRiceData);
	}
	console.log('I am VS RIce Data inside vegetative stage');
	console.log(vsRiceData.tagId);


  const[isAuricleOn, setIsAuricleOn] = useState(true)
  console.log(isAuricleOn);

  // Export Excel
	  const exportExcel = () => {
        var XLSX = require("xlsx");
        console.log('exporting');
        var wb= XLSX.utils.book_new()
			var ws = XLSX.utils.json_to_sheet(riceData)
	


        XLSX.utils.book_append_sheet(wb,ws,`SPR_VS`)

        XLSX.writeFile(wb, `Special_Purpose_Rice_Vegetative_Stage.xlsx`)
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
      {/* For Filtering// Don't Erase */}
      {/* <div className=" flex p-1">
        {isAuricleOn === true ? <div className="flex items-center gap-1 bg-sprPrimarySuperLight hover:bg-sprPrimaryOffLight cursor-pointer rounded-full px-1 ">
          <CloseIcon className="h-2 stroke-sprGray60 hover:stroke-sprGray40 active:stroke-sprGray90" onClick={()=>setIsAuricleOn(false)} />
          <small className="text-xs ">Auricle</small>
        </div>:<></>}
      </div> */}
      <div className=" flex  text-sprGray60 relative">
        {/* Accession */}
        <table className=" text-sm">
          <thead className="text-xs font-medium uppercase text-center bg-sprPrimaryOffLight">Accession </thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium text-sprPrimary">Accession</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3"> CL-R{rice.accessionId === "" ? "---" : rice.accessionId}</div>
              ))}
            </div>
          </tbody>
        </table>
        {/* ShelfNum */}
        <table className="">
          <thead className=" text-xs font-medium uppercase text-center bg-sprPrimaryLight">Shelf No.</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium text-sm whitespace-nowrap text-sprPrimary">#</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 text-sm whitespace-nowrap"> {rice.shelfNum === "" ? "---" : rice.shelfNum}</div>
              ))}
            </div>
          </tbody>
        </table>
        {/* RiceYear */}
        <table className="">
          <thead className=" text-xs font-medium uppercase text-center bg-sprPrimaryOffLight">Year & Season</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 text-sm py-3 font-medium whitespace-nowrap text-sprPrimary">Year</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 text-sm whitespace-nowrap"> {rice.riceYear === "" ? "---" : rice.riceYear}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 text-sm font-medium whitespace-nowrap text-sprPrimary">Season</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 text-sm whitespace-nowrap"> {rice.riceSeason === "" ? "---" : rice.riceSeason}</div>
              ))}
            </div>
          </tbody>
        </table>
        {/* Auricle */}
        <table className={isAuricleOn === true ? "text-sm" : "hidden"}>
          <div className=" text-xs font-medium uppercase text-center bg-sprPrimaryLight">Auricle</div>
          <div className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Color</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 bg-slate-50 whitespace-nowrap"> {rice.auricleColor === "" ? "---" : rice.auricleColor}</div>
              ))}
            </div>
          </div>
        </table>
        <table className=" text-sm">
          <thead className="text-xs font-medium uppercase text-center bg-sprPrimaryOffLight">Coleoptile</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Anthocyanin colouration</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.coleoptileAnthocyaninColouration === "" ? "---" : rice.coleoptileAnthocyaninColouration}</div>
              ))}
            </div>
          </tbody>
        </table>
        <table className=" text-sm">
          <thead className="text-xs font-medium uppercase text-center bg-sprPrimaryLight">Collar</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Colour</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 bg-slate-50 whitespace-nowrap"> {rice.collarColour === "" ? "---" : rice.collarColour}</div>
              ))}
            </div>
          </tbody>
        </table>
        <table className=" text-sm">
          <thead className="text-xs font-medium uppercase text-center bg-sprPrimaryOffLight">Culm</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Habit</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.culmHabit === "" ? "---" : rice.culmHabit}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Kneeing Ability</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.culmKneeingAbility === "" ? "---" : rice.culmKneeingAbility}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Length</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.culmLength === "" ? "---" : rice.culmLength}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Number</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 bg-slate-50 whitespace-nowrap"> {rice.culmNumber === "" ? "---" : rice.culmNumber}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Diameter at Basal Internode</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.culmDiameteratBasalInternode === "" ? "---" : rice.culmDiameteratBasalInternode}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Anthocyanin Colouration on Nodes</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.culmAnthocyaninColourationonNodes === "" ? "---" : rice.culmAnthocyaninColourationonNodes}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Underlying Node Colour</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.culmUnderlyingNodeColour === "" ? "---" : rice.culmUnderlyingNodeColour}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Internode Anthocyanin</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.culmInternodeAnthocyanin === "" ? "---" : rice.culmInternodeAnthocyanin}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Underlying Internode Colouration</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.culmUnderlyingInternodeColouration === "" ? "---" : rice.culmUnderlyingInternodeColouration}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Lodging Resistance</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.culmLodgingResistance === "" ? "---" : rice.culmLodgingResistance}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Strength</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.culmStrength === "" ? "---" : rice.culmStrength}</div>
              ))}
            </div>
          </tbody>
        </table>
        <table className=" text-sm">
          <thead className="text-xs font-medium uppercase text-center bg-sprPrimaryLight">Flag Leaf</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Length</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 bg-slate-50 whitespace-nowrap"> {rice.flagLeafLegnth === "" ? "---" : rice.flagLeafLegnth}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Width</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.flagLeafWidth === "" ? "---" : rice.flagLeafWidth}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Attitude Early Observation</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.flagLeafAttitudeEarlyobs === "" ? "---" : rice.flagLeafAttitudeEarlyobs}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Attitude Late Obeservation</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.flagLeafAttitudeLateobs === "" ? "---" : rice.flagLeafAttitudeLateobs}</div>
              ))}
            </div>
          </tbody>
        </table>
        <table className=" text-sm">
          <thead className="text-xs font-medium uppercase text-center bg-sprPrimaryOffLight">Leaf</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Margin Pubesence</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.leafMarginPubesence === "" ? "---" : rice.leafMarginPubesence}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Senesence</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.leafSenesence === "" ? "---" : rice.leafSenesence}</div>
              ))}
            </div>
          </tbody>
        </table>
        <table className=" text-sm">
          <thead className="text-xs font-medium uppercase text-center bg-sprPrimaryLight">Leaf Blade</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Presence Absence of Anthocyanin Colouration</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.lbPresenceAbsenceofAnthocyaninColouration === "" ? "---" : rice.lbPresenceAbsenceofAnthocyaninColouration}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Distribution of Anthocyanin Colouration</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.lbDistributionofAnthocyaninColouration === "" ? "---" : rice.lbDistributionofAnthocyaninColouration}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Intensity of Green Colour</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.lbIntensityofGreenColour === "" ? "---" : rice.lbIntensityofGreenColour}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Attitude</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.lbAttitude === "" ? "---" : rice.lbAttitude}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Pubesence</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 bg-slate-50 whitespace-nowrap"> {rice.lbPubesence === "" ? "---" : rice.lbPubesence}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Pubesence on Blade Surface</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.lbPubesenceonBladeSurface === "" ? "---" : rice.lbPubesenceonBladeSurface}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Length</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 bg-slate-50 whitespace-nowrap"> {rice.lbLength === "" ? "---" : rice.lbLength}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Width</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.lbWidth === "" ? "---" : rice.lbWidth}</div>
              ))}
            </div>
          </tbody>
        </table>
        <table className=" text-sm">
          <thead className="text-xs font-medium uppercase text-center bg-sprPrimaryOffLight">Leaf Sheath</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Basal Leaf Sheath Colour</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.basalLeafSheathColour === "" ? "---" : rice.basalLeafSheathColour}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Anthocyanin Colouration</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.lsAnthocyaninColouration === "" ? "---" : rice.lsAnthocyaninColouration}</div>
              ))}
            </div>
          </tbody>
        </table>
        <table className=" text-sm">
          <thead className="text-xs font-medium uppercase text-center bg-sprPrimaryLight">Ligule</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Length</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 bg-slate-50 whitespace-nowrap"> {rice.liguleLength === "" ? "---" : rice.liguleLength}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Shape</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.liguleShape === "" ? "---" : rice.liguleShape}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Shape Cultivated Species</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.liguleShapeCultivatedSpecies === "" ? "---" : rice.liguleShapeCultivatedSpecies}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Shape Wild Species</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.liguleShapeWildSpecies === "" ? "---" : rice.liguleShapeWildSpecies}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Margin Shape Wild Species</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.liguleMarginShapeWildSpecies === "" ? "---" : rice.liguleMarginShapeWildSpecies}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Margin Hairiness</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.liguleMarginHairiness === "" ? "---" : rice.liguleMarginHairiness}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Pubesence</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 bg-slate-50 whitespace-nowrap"> {rice.ligulePubesence === "" ? "---" : rice.ligulePubesence}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Colour</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.liguleColour === "" ? "---" : rice.liguleColour}</div>
              ))}
            </div>
          </tbody>
        </table>
        <table className=" text-sm">
          <thead className="text-xs whitespace-nowrap font-medium uppercase text-center bg-sprPrimaryOffLight">Rhizome and Stalon</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Formation</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.rhizomeandStolonFormation === "" ? "---" : rice.rhizomeandStolonFormation}</div>
              ))}
            </div>
          </tbody>
        </table>
        <table className=" text-sm">
          <thead className="text-xs font-medium uppercase text-center bg-sprPrimaryLight">Seedling</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Height</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.seedlingHeight === "" ? "---" : rice.seedlingHeight}</div>
              ))}
            </div>
          </tbody>
        </table>
        <table className=" text-sm sticky right-0 ">
          <thead className="text-xs font-medium uppercase text-center bg-white flex justify-center">
          <h1 className="opacity-0">I</h1>
          </thead>
          <tbody className=" flex bg-white   ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300  ">
              <div className=" py-3 font-medium text-sprPrimary flex justify-center">
              <h1 className="group" onClick={()=>{exportExcel()}}>
                                    <ExcelIcon className='stroke-sprPrimary h-5 hover:stroke-sprPrimarySuperLight active:stroke-sprPrimary '/>
                                    <small className=' hidden group-hover:block absolute whitespace-nowrap right-2 bg-sprGray60 rounded-sm p-1 text-white capitalize text-xs' >Export as Excel</small>
									</h1>

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

				<ModalVegetativeUpdate open={isModalOpen} closeModal={()=>setIsModalOpen(false)}  modalId={modalId} modalYear={modalYear} modalSeason={modalSeason} vsRiceData= {vsRiceData}></ModalVegetativeUpdate>

      </div>

    </div>


    </>
  );
}
