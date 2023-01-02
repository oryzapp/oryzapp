import { collection, collectionGroup, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "../firebase-config";
import { ReactComponent as EditIcon } from '../assets/edit-icon.svg'
import { ReactComponent as ExcelIcon } from "../assets/excel-icon.svg"


import ModalVegetativeUpdate from "../components/ModalVegetativeUpdate";


export default function VegetativeStage({filterSeason, filterYear, searchInput}) {

  // List All and Filter ------------------->
  const [riceData, setRiceData] = useState([])
  useEffect(() => {

    var riceCollectionRef;

    if (filterSeason === 'All' && filterYear === 'All') {
        riceCollectionRef = collectionGroup(db, "VS_Raw_Rice_Data");

    }
    if (filterSeason === 'All' && filterYear !== 'All') {
        riceCollectionRef = query(collectionGroup(db, "VS_Raw_Rice_Data"), where("riceYear", "==", filterYear));
    }
    if (filterSeason === 'Wet_Season' && filterYear === 'All') {
      riceCollectionRef = query(collection(db, `/SPR/Rice_Seasons/Seasons/${filterSeason}/Stages/Vegetative_Stage/VS_Raw_Rice_Data`))
    }
    if (filterSeason === 'Dry_Season' && filterYear === 'All') {
      riceCollectionRef = query(collection(db, `/SPR/Rice_Seasons/Seasons/${filterSeason}/Stages/Vegetative_Stage/VS_Raw_Rice_Data`))

    }
    if (filterSeason === 'Dry_Season' && filterYear !== 'All') {
        riceCollectionRef = query(collection(db, `/SPR/Rice_Seasons/Seasons/${filterSeason}/Stages/Vegetative_Stage/VS_Raw_Rice_Data`), where("riceYear", "==", filterYear))
    }
    if (filterSeason === 'Wet_Season' && filterYear !== 'All') {
        riceCollectionRef = query(collection(db, `/SPR/Rice_Seasons/Seasons/${filterSeason}/Stages/Vegetative_Stage/VS_Raw_Rice_Data`), where("riceYear", "==", filterYear))
    }

    onSnapshot(riceCollectionRef, (snapshot) => {
      setRiceData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

  }, [filterSeason,filterYear]);

    // Sort
    riceData.sort((a,b)=>{
      return a.accessionId - b.accessionId
    })

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


  

  // Export Excel
	  const exportExcel = () => {
        var XLSX = require("xlsx");
        console.log('exporting');
        var wb= XLSX.utils.book_new()
			var ws = XLSX.utils.json_to_sheet(riceData)
	


        XLSX.utils.book_append_sheet(wb,ws,`SPR_VS`)

        XLSX.writeFile(wb, `Special_Purpose_Rice_Vegetative_Stage.xlsx`)
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
            accessionId: rice.accessionId,
            tagId: rice.tagId,
            riceYear: rice.riceYear,
            riceSeason: rice.riceSeason,
            shelfNum: rice.shelfNum,
            auricleColor: rice.auricleColor,
            coleoptileAnthocyaninColouration: rice.coleoptileAnthocyaninColouration,
            collarColour: rice.collarColour,
            culmHabit: rice.culmHabit,
            culmKneeingAbility: rice.culmKneeingAbility,
            culmLength: rice.culmLength,
            culmNumber: rice.culmNumber,
            culmDiameteratBasalInternode: rice.culmDiameteratBasalInternode,
            culmAnthocyaninColourationonNodes: rice.culmAnthocyaninColourationonNodes,
            culmUnderlyingNodeColour: rice.culmUnderlyingNodeColour,
            culmInternodeAnthocyanin: rice.culmInternodeAnthocyanin,
            culmUnderlyingInternodeColouration: rice.culmUnderlyingInternodeColouration,
            culmLodgingResistance: rice.culmLodgingResistance,
            culmStrength: rice.culmStrength,
            flagLeafLegnth: rice.flagLeafLegnth,
            flagLeafWidth: rice.flagLeafWidth,
            flagLeafAttitudeEarlyobs: rice.flagLeafAttitudeEarlyobs,
            flagLeafAttitudeLateobs: rice.flagLeafAttitudeLateobs,
            leafMarginPubesence: rice.leafMarginPubesence,
            leafSenesence: rice.leafSenesence,
            lbPresenceAbsenceofAnthocyaninColouration: rice.lbPresenceAbsenceofAnthocyaninColouration,
            lbDistributionofAnthocyaninColouration: rice.lbDistributionofAnthocyaninColouration,
            lbIntensityofGreenColour: rice.lbIntensityofGreenColour,
            lbAttitude: rice.lbAttitude,
            lbPubesence: rice.lbPubesence,
            lbPubesenceonBladeSurface: rice.lbPubesenceonBladeSurface,
            lbLength: rice.lbLength,
            lbWidth: rice.lbWidth,
            basalLeafSheathColour: rice.basalLeafSheathColour,
            lsAnthocyaninColouration: rice.lsAnthocyaninColouration,
            liguleLength: rice.liguleLength,
            liguleShape: rice.liguleShape,
            liguleShapeCultivatedSpecies: rice.liguleShapeCultivatedSpecies,
            liguleShapeWildSpecies: rice.liguleShapeWildSpecies,
            liguleMarginShapeWildSpecies: rice.liguleMarginShapeWildSpecies,
            liguleMarginHairiness: rice.liguleMarginHairiness,
            ligulePubesence: rice.ligulePubesence,
            liguleColour: rice.liguleColour,
            rhizomeandStolonFormation: rice.rhizomeandStolonFormation,
            seedlingHeight: rice.seedlingHeight,
            timestamp:rice.timestamp,
					
					})
         

				}
      
			})
		}
    console.log(riceData);
    console.log(searched);

		setSearched(searchList)
	}, [searchInput])
  
  return (
    <div className="  flex flex-auto max-w-0 max-h-0  ">

    <div className="flex flex-col">
    
      <div className=" flex  text-sprGray60 relative">
        {/* Accession */}
        <table className=" text-sm relative">
          <thead className="text-xs font-medium uppercase text-center bg-sprPrimaryOffLight sticky top-0 z-50">Accession </thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 relative ">
              <div className="px-6 py-3 font-medium text-sprPrimary sticky top-4 bg-white">Accession</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3"> CL-R{rice.accessionId === "" ? "---" : rice.accessionId}</div>
                ))}</>:<>
                {searched.map((rice) => (
                  <div className="px-6 py-3"> CL-R{rice.accessionId === "" ? "---" : rice.accessionId}</div>
              ))}
              </>}
            </div>
          </tbody>
        </table>
        {/* ShelfNum */}
        <table className=" relative">
          <thead className=" text-xs font-medium uppercase text-center bg-sprPrimaryLight  sticky top-0 z-50">Shelf No.</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium text-sm whitespace-nowrap sticky top-4 bg-white text-sprPrimary">#</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 text-sm whitespace-nowrap"> {rice.shelfNum === "" ? "---" : rice.shelfNum}</div>
                ))}</>:<>
                {searched.map((rice) => (
                  <div className="px-6 py-3 text-sm whitespace-nowrap"> {rice.shelfNum === "" ? "---" : rice.shelfNum}</div>
              ))}
              </>}
            </div>
          </tbody>
        </table>
        {/* RiceYear */}
        <table className="relative">
          <thead className=" text-xs font-medium uppercase text-center bg-sprPrimaryOffLight  sticky top-0 z-50">Year & Season</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 text-sm py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Year</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 text-sm whitespace-nowrap"> {rice.riceYear === "" ? "---" : rice.riceYear}</div>
                ))}</>:<>
                {searched.map((rice) => (
                  <div className="px-6 py-3 text-sm whitespace-nowrap"> {rice.riceYear === "" ? "---" : rice.riceYear}</div>
              ))}
              </>}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 text-sm font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Season</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 text-sm whitespace-nowrap"> {rice.riceSeason === "" ? "---" : rice.riceSeason}</div>
                ))}</>:<>
                {searched.map((rice) => (
                   <div className="px-6 py-3 text-sm whitespace-nowrap"> {rice.riceSeason === "" ? "---" : rice.riceSeason}</div>
              ))}
                </>}
            </div>
          </tbody>
        </table>
        {/* Auricle */}
        <table className="text-sm">
          <div className=" text-xs font-medium uppercase text-center bg-sprPrimaryLight sticky top-0 z-50">Auricle</div>
          <div className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Color</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 bg-slate-50 whitespace-nowrap"> {rice.auricleColor === "" ? "---" : rice.auricleColor}</div>
                ))}</>:<>
                {searched.map((rice) => (
                  <div className="px-6 py-3 bg-slate-50 whitespace-nowrap"> {rice.auricleColor === "" ? "---" : rice.auricleColor}</div>
              ))}
                </>}
            </div>
          </div>
        </table>
        <table className=" text-sm">
          <thead className="text-xs font-medium uppercase text-center bg-sprPrimaryOffLight sticky top-0 z-50">Coleoptile</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Anthocyanin colouration</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.coleoptileAnthocyaninColouration === "" ? "---" : rice.coleoptileAnthocyaninColouration}</div>
                ))}</>:<>
                {searched.map((rice) => (
                  <div className="px-6 py-3 whitespace-nowrap"> {rice.coleoptileAnthocyaninColouration === "" ? "---" : rice.coleoptileAnthocyaninColouration}</div>
             ))}
                </>}
            </div>
          </tbody>
        </table>
        <table className=" text-sm">
          <thead className="text-xs font-medium uppercase text-center bg-sprPrimaryLight sticky top-0 z-50">Collar</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Colour</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 bg-slate-50 whitespace-nowrap"> {rice.collarColour === "" ? "---" : rice.collarColour}</div>
                ))}</>:<>
                {searched.map((rice) => (
                     <div className="px-6 py-3 bg-slate-50 whitespace-nowrap"> {rice.collarColour === "" ? "---" : rice.collarColour}</div>
              ))}
                </>}
            </div>
          </tbody>
        </table>
        <table className=" text-sm">
          <thead className="text-xs font-medium uppercase text-center bg-sprPrimaryOffLight sticky top-0 z-50">Culm</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Habit</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.culmHabit === "" ? "---" : rice.culmHabit}</div>
                ))}</>:<>
                {searched.map((rice) => (
                  <div className="px-6 py-3 whitespace-nowrap"> {rice.culmHabit === "" ? "---" : rice.culmHabit}</div>
              ))}
                </>}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Kneeing Ability</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.culmKneeingAbility === "" ? "---" : rice.culmKneeingAbility}</div>
                ))}</>:<>
                {searched.map((rice) => (
                   <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.culmKneeingAbility === "" ? "---" : rice.culmKneeingAbility}</div>
              ))}
              </>}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Length</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.culmLength === "" ? "---" : rice.culmLength}</div>
                ))}</>:<>
                {searched.map((rice) => (
                  <div className="px-6 py-3 whitespace-nowrap"> {rice.culmLength === "" ? "---" : rice.culmLength}</div>
                
              ))}
              </>}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Number</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 bg-slate-50 whitespace-nowrap"> {rice.culmNumber === "" ? "---" : rice.culmNumber}</div>
                ))}</>:<>
                {searched.map((rice) => (
                   <div className="px-6 py-3 bg-slate-50 whitespace-nowrap"> {rice.culmNumber === "" ? "---" : rice.culmNumber}</div>
              ))}
                </>}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Diameter at Basal Internode</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.culmDiameteratBasalInternode === "" ? "---" : rice.culmDiameteratBasalInternode}</div>
                ))}</>:<>
                {searched.map((rice) => (
                  <div className="px-6 py-3 whitespace-nowrap"> {rice.culmDiameteratBasalInternode === "" ? "---" : rice.culmDiameteratBasalInternode}</div>
              ))}
               </>}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Anthocyanin Colouration on Nodes</div>
              {searchInput === ''?<>
                {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.culmAnthocyaninColourationonNodes === "" ? "---" : rice.culmAnthocyaninColourationonNodes}</div>
                ))}</>:<>
                {searched.map((rice) => (
                  <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.culmAnthocyaninColourationonNodes === "" ? "---" : rice.culmAnthocyaninColourationonNodes}</div>
                  ))}
              </>}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Underlying Node Colour</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.culmUnderlyingNodeColour === "" ? "---" : rice.culmUnderlyingNodeColour}</div>
                ))}</>:<>
                {searched.map((rice) => (
                  <div className="px-6 py-3 whitespace-nowrap"> {rice.culmUnderlyingNodeColour === "" ? "---" : rice.culmUnderlyingNodeColour}</div>
              ))}
               </>}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Internode Anthocyanin</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.culmInternodeAnthocyanin === "" ? "---" : rice.culmInternodeAnthocyanin}</div>
                ))}</>:<>
                {searched.map((rice) => (
                  <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.culmInternodeAnthocyanin === "" ? "---" : rice.culmInternodeAnthocyanin}</div>
                ))}
                 </>}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Underlying Internode Colouration</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.culmUnderlyingInternodeColouration === "" ? "---" : rice.culmUnderlyingInternodeColouration}</div>
                ))}</>:<>
                {searched.map((rice) => (
                 <div className="px-6 py-3 whitespace-nowrap"> {rice.culmUnderlyingInternodeColouration === "" ? "---" : rice.culmUnderlyingInternodeColouration}</div>

              ))}
               </>}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Lodging Resistance</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.culmLodgingResistance === "" ? "---" : rice.culmLodgingResistance}</div>
                ))}</>:<>
                {searched.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.culmLodgingResistance === "" ? "---" : rice.culmLodgingResistance}</div>

              ))}
                  </>}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Strength</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.culmStrength === "" ? "---" : rice.culmStrength}</div>
                ))}</>:<>
                {searched.map((rice) => (
                  <div className="px-6 py-3 whitespace-nowrap"> {rice.culmStrength === "" ? "---" : rice.culmStrength}</div>
              ))}
                 </>}
            </div>
          </tbody>
        </table>
        <table className=" text-sm">
          <thead className="text-xs font-medium uppercase text-center bg-sprPrimaryLight sticky top-0 z-50">Flag Leaf</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Length</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 bg-slate-50 whitespace-nowrap"> {rice.flagLeafLegnth === "" ? "---" : rice.flagLeafLegnth}</div>
                ))}</>:<>
                {searched.map((rice) => (
                  <div className="px-6 py-3 bg-slate-50 whitespace-nowrap"> {rice.flagLeafLegnth === "" ? "---" : rice.flagLeafLegnth}</div>
             ))}
                 </>}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Width</div>
              {searchInput === ''?<>
                {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.flagLeafWidth === "" ? "---" : rice.flagLeafWidth}</div>
                ))}</>:<>
                {searched.map((rice) => (
                      <div className="px-6 py-3 whitespace-nowrap"> {rice.flagLeafWidth === "" ? "---" : rice.flagLeafWidth}</div>
              ))}
              </>}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Attitude Early Observation</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.flagLeafAttitudeEarlyobs === "" ? "---" : rice.flagLeafAttitudeEarlyobs}</div>
                ))}</>:<>
                {searched.map((rice) => (
                  <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.flagLeafAttitudeEarlyobs === "" ? "---" : rice.flagLeafAttitudeEarlyobs}</div>
              ))}
              </>}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Attitude Late Obeservation</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.flagLeafAttitudeLateobs === "" ? "---" : rice.flagLeafAttitudeLateobs}</div>
                ))}</>:<>
                {searched.map((rice) => (
                  <div className="px-6 py-3 whitespace-nowrap"> {rice.flagLeafAttitudeLateobs === "" ? "---" : rice.flagLeafAttitudeLateobs}</div>
              ))}
                 </>}
            </div>
          </tbody>
        </table>
        <table className=" text-sm">
          <thead className="text-xs font-medium uppercase text-center bg-sprPrimaryOffLight sticky top-0 z-50">Leaf</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Margin Pubesence</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.leafMarginPubesence === "" ? "---" : rice.leafMarginPubesence}</div>
                ))}</>:<>
                {searched.map((rice) => (
                   <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.leafMarginPubesence === "" ? "---" : rice.leafMarginPubesence}</div>
             
              ))}
                 </>}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Senesence</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.leafSenesence === "" ? "---" : rice.leafSenesence}</div>
                ))}</>:<>
                {searched.map((rice) => (
                   <div className="px-6 py-3 whitespace-nowrap"> {rice.leafSenesence === "" ? "---" : rice.leafSenesence}</div>
              ))}
                </>}
            </div>
          </tbody>
        </table>
        <table className=" text-sm">
          <thead className="text-xs font-medium uppercase text-center bg-sprPrimaryLight sticky top-0 z-50">Leaf Blade</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Presence Absence of Anthocyanin Colouration</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.lbPresenceAbsenceofAnthocyaninColouration === "" ? "---" : rice.lbPresenceAbsenceofAnthocyaninColouration}</div>
                ))}</>:<>
                {searched.map((rice) => (
                    <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.lbPresenceAbsenceofAnthocyaninColouration === "" ? "---" : rice.lbPresenceAbsenceofAnthocyaninColouration}</div>
                ))}
                  </>}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Distribution of Anthocyanin Colouration</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.lbDistributionofAnthocyaninColouration === "" ? "---" : rice.lbDistributionofAnthocyaninColouration}</div>
                ))}</>:<>
                {searched.map((rice) => (
              <div className="px-6 py-3 whitespace-nowrap"> {rice.lbDistributionofAnthocyaninColouration === "" ? "---" : rice.lbDistributionofAnthocyaninColouration}</div>
               ))}
               </>}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Intensity of Green Colour</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.lbIntensityofGreenColour === "" ? "---" : rice.lbIntensityofGreenColour}</div>
                ))}</>:<>
                {searched.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.lbIntensityofGreenColour === "" ? "---" : rice.lbIntensityofGreenColour}</div>
              ))}
                </>}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Attitude</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.lbAttitude === "" ? "---" : rice.lbAttitude}</div>
                ))}</>:<>
                {searched.map((rice) => (
                  <div className="px-6 py-3 whitespace-nowrap"> {rice.lbAttitude === "" ? "---" : rice.lbAttitude}</div>
              ))}
                 </>}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Pubesence</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 bg-slate-50 whitespace-nowrap"> {rice.lbPubesence === "" ? "---" : rice.lbPubesence}</div>
                ))}</>:<>
                {searched.map((rice) => (
                    <div className="px-6 py-3 bg-slate-50 whitespace-nowrap"> {rice.lbPubesence === "" ? "---" : rice.lbPubesence}</div>
              ))}
               </>}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Pubesence on Blade Surface</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.lbPubesenceonBladeSurface === "" ? "---" : rice.lbPubesenceonBladeSurface}</div>
                ))}</>:<>
                {searched.map((rice) => (
                  <div className="px-6 py-3 whitespace-nowrap"> {rice.lbPubesenceonBladeSurface === "" ? "---" : rice.lbPubesenceonBladeSurface}</div>
              ))}
               </>}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Length</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 bg-slate-50 whitespace-nowrap"> {rice.lbLength === "" ? "---" : rice.lbLength}</div>
                ))}</>:<>
                {searched.map((rice) => (
                   <div className="px-6 py-3 bg-slate-50 whitespace-nowrap"> {rice.lbLength === "" ? "---" : rice.lbLength}</div>
              ))}
               </>}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Width</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.lbWidth === "" ? "---" : rice.lbWidth}</div>
                ))}</>:<>
                {searched.map((rice) => (
                   <div className="px-6 py-3 whitespace-nowrap"> {rice.lbWidth === "" ? "---" : rice.lbWidth}</div>
              ))}
                </>}
            </div>
          </tbody>
        </table>
        <table className=" text-sm">
          <thead className="text-xs font-medium uppercase text-center bg-sprPrimaryOffLight sticky top-0 z-50">Leaf Sheath</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Basal Leaf Sheath Colour</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.basalLeafSheathColour === "" ? "---" : rice.basalLeafSheathColour}</div>
                ))}</>:<>
                {searched.map((rice) => (
                   <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.basalLeafSheathColour === "" ? "---" : rice.basalLeafSheathColour}</div>
              ))}
              </>}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Anthocyanin Colouration</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.lsAnthocyaninColouration === "" ? "---" : rice.lsAnthocyaninColouration}</div>
                ))}</>:<>
                {searched.map((rice) => (
                  <div className="px-6 py-3 whitespace-nowrap"> {rice.lsAnthocyaninColouration === "" ? "---" : rice.lsAnthocyaninColouration}</div>
              ))}
                </>}
            </div>
          </tbody>
        </table>
        <table className=" text-sm">
          <thead className="text-xs font-medium uppercase text-center bg-sprPrimaryLight sticky top-0 z-50">Ligule</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Length</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 bg-slate-50 whitespace-nowrap"> {rice.liguleLength === "" ? "---" : rice.liguleLength}</div>
                ))}</>:<>
                {searched.map((rice) => (
                   <div className="px-6 py-3 bg-slate-50 whitespace-nowrap"> {rice.liguleLength === "" ? "---" : rice.liguleLength}</div>
             ))}
                  </>}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Shape</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.liguleShape === "" ? "---" : rice.liguleShape}</div>
                ))}</>:<>
                {searched.map((rice) => (
                  <div className="px-6 py-3 whitespace-nowrap"> {rice.liguleShape === "" ? "---" : rice.liguleShape}</div>
                ))}
                  </>}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Shape Cultivated Species</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.liguleShapeCultivatedSpecies === "" ? "---" : rice.liguleShapeCultivatedSpecies}</div>
                ))}</>:<>
                {searched.map((rice) => (
                  <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.liguleShapeCultivatedSpecies === "" ? "---" : rice.liguleShapeCultivatedSpecies}</div>
                ))}
                </>}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Shape Wild Species</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.liguleShapeWildSpecies === "" ? "---" : rice.liguleShapeWildSpecies}</div>
                ))}</>:<>
                {searched.map((rice) => (
                  <div className="px-6 py-3 whitespace-nowrap"> {rice.liguleShapeWildSpecies === "" ? "---" : rice.liguleShapeWildSpecies}</div>
              ))}
                  </>}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Margin Shape Wild Species</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.liguleMarginShapeWildSpecies === "" ? "---" : rice.liguleMarginShapeWildSpecies}</div>
                ))}</>:<>
                {searched.map((rice) => (
                   <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.liguleMarginShapeWildSpecies === "" ? "---" : rice.liguleMarginShapeWildSpecies}</div>
                   
              ))}
              </>}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Margin Hairiness</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.liguleMarginHairiness === "" ? "---" : rice.liguleMarginHairiness}</div>
                ))}</>:<>
                {searched.map((rice) => (
                   <div className="px-6 py-3 whitespace-nowrap"> {rice.liguleMarginHairiness === "" ? "---" : rice.liguleMarginHairiness}</div>
             ))}
               </>}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Pubesence</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 bg-slate-50 whitespace-nowrap"> {rice.ligulePubesence === "" ? "---" : rice.ligulePubesence}</div>
                ))}</>:<>
                {searched.map((rice) => (
                  <div className="px-6 py-3 bg-slate-50 whitespace-nowrap"> {rice.ligulePubesence === "" ? "---" : rice.ligulePubesence}</div>
             ))}
              </>}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Colour</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.liguleColour === "" ? "---" : rice.liguleColour}</div>
                ))}</>:<>
                {searched.map((rice) => (
                    <div className="px-6 py-3 whitespace-nowrap"> {rice.liguleColour === "" ? "---" : rice.liguleColour}</div>
              ))}
                 </>}
            </div>
          </tbody>
        </table>
        <table className=" text-sm">
          <thead className="text-xs whitespace-nowrap font-medium uppercase text-center bg-sprPrimaryOffLight sticky top-0 z-50">Rhizome and Stalon</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Formation</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.rhizomeandStolonFormation === "" ? "---" : rice.rhizomeandStolonFormation}</div>
                ))}</>:<>
                {searched.map((rice) => (
                   <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.rhizomeandStolonFormation === "" ? "---" : rice.rhizomeandStolonFormation}</div>
              ))}
                </>}
            </div>
          </tbody>
        </table>
        <table className=" text-sm">
          <thead className="text-xs font-medium uppercase text-center bg-sprPrimaryLight sticky top-0 z-50">Seedling</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Height</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.seedlingHeight === "" ? "---" : rice.seedlingHeight}</div>
                ))}</>:<>
                {searched.map((rice) => (
                  <div className="px-6 py-3 whitespace-nowrap"> {rice.seedlingHeight === "" ? "---" : rice.seedlingHeight}</div>
             ))}
              </>}
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
                    <EditIcon className="h-4 fill-white" />
                  </button>

                </div>
              ))}
            </div>
          </tbody>
        </table>

				<ModalVegetativeUpdate open={isModalOpen} closeModal={()=>setIsModalOpen(false)}  modalId={modalId} modalYear={modalYear} modalSeason={modalSeason} vsRiceData= {vsRiceData}></ModalVegetativeUpdate>

      </div>

    </div>


    </div>
  );
}