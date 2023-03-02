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
  
    // Sort
	riceData.sort((a,b)=>{
		return a.accessionId - b.accessionId
	})

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
            awnColour: rice.awnColour,
            caryopsisLength: rice.caryopsisLength,
            caryopsisWidth: rice.caryopsisWidth,
            caryopsisShape: rice.caryopsisShape,
            caryopsisPericarpColour: rice.caryopsisPericarpColour,
            endorspermType: rice.endorspermType,
            grainLength: rice.grainLength,
            grainWidth: rice.grainWidth,
            grainThickness: rice.grainThickness,
            grain100GrainWeight: rice.grain100GrainWeight,
            grain10GrainWeight: rice.grain10GrainWeight,
            lemmaAnthocyaninColourationofKeel: rice.lemmaAnthocyaninColourationofKeel,
            lemmaAnthocyaninColourationofAreaBelowApiculusLateobs: rice.lemmaAnthocyaninColourationofAreaBelowApiculusLateobs,
            lemmaColourofApiculusLateobs: rice.lemmaColourofApiculusLateobs,
            lemmaShapeofApiculus: rice.lemmaShapeofApiculus,
            lemmaandPaleaPubesence: rice.lemmaandPaleaPubesence,
            lemmaandPaleaColourLateobs: rice.lemmaandPaleaColourLateobs,
            panicleLengthLateobs: rice.panicleLengthLateobs,
            panicleThreshability: rice.panicleThreshability,
            spikeletFertility: rice.spikeletFertility,
            sterileLemmaLength: rice.sterileLemmaLength,
            longerSterileLemmaLength: rice.longerSterileLemmaLength,
            sterileLemmaShape: rice.sterileLemmaShape,
            sterileLemmaColour: rice.sterileLemmaColour,
            timestamp:rice.timestamp,
					
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
      
      <div className="  flex text-sm text-sprGray60">
        <table className="sticky left-0 z-30 bg-white">
          <thead className="text-xs uppercase font-medium text-center bg-sprPrimaryOffLight sticky top-0 left-0 z-30">Accession</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white z-30 left-0">Accession</div>
             
              {/* {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 v bg-slate-50"> {rice.cookedRiceAroma === "" ? "---" : rice.cookedRiceAroma}</div>
                ))}</>:<>
                  {searched.map((rice) => (
                    <div className="px-6 py-3 v bg-slate-50"> {rice.cookedRiceAroma === "" ? "---" : rice.cookedRiceAroma}</div>
                  ))}
              </>} */}
             
             
             {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> CL-R{rice.accessionId === "" ? "---" : rice.accessionId}</div>
                ))}</>:<>
                {searched.map((rice) => (
                  <div className="px-6 py-3 whitespace-nowrap"> CL-R{rice.accessionId === "" ? "---" : rice.accessionId}</div>
              ))}
               </>}
            </div>
          </tbody>
        </table>
        <table className="">
          <thead className=" text-xs font-medium uppercase text-center bg-sprPrimaryLight sticky top-0 ">Shelf No.</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 text-sm py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">#</div>
               
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.shelfNum === "" ? "---" : rice.shelfNum}</div>
                ))}</>:<>
                {searched.map((rice) => (
                                  <div className="px-6 py-3 whitespace-nowrap"> {rice.shelfNum === "" ? "---" : rice.shelfNum}</div>

              ))}
               </>}
            </div>
          </tbody>
        </table>
        <table className="">
          <thead className=" text-xs font-medium uppercase text-center bg-sprPrimaryOffLight sticky top-0 ">Year & Season</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 text-sm py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Year</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.riceYear === "" ? "---" : rice.riceYear}</div>
                ))}</>:<>
                {searched.map((rice) => (
                  <div className="px-6 py-3 whitespace-nowrap"> {rice.riceYear === "" ? "---" : rice.riceYear}</div>
              ))}
               </>}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 text-sm py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Season</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.riceSeason === "" ? "---" : rice.riceSeason}</div>
                ))}</>:<>
                {searched.map((rice) => (
                   <div className="px-6 py-3 whitespace-nowrap"> {rice.riceSeason === "" ? "---" : rice.riceSeason}</div>
                
              ))}
               </>}
            </div>
          </tbody>
        </table>
        <table className="">
          <thead className="text-xs uppercase font-medium text-center bg-sprPrimaryLight sticky top-0 ">Awn</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Colour</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.awnColour === "" ? "---" : rice.awnColour}</div>
                ))}</>:<>
                {searched.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.awnColour === "" ? "---" : rice.awnColour}</div>
              ))}
               </>}
            </div>
          </tbody>
        </table>
        <table className="">
          <thead className="text-xs uppercase font-medium text-center bg-sprPrimaryOffLight sticky top-0 ">Caryopsis</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 whitespave-nowrap font-medium text-sprPrimary sticky top-4 bg-white">Length</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.caryopsisLength === "" ? "---" : rice.caryopsisLength}</div>
                ))}</>:<>
                {searched.map((rice) => (
                  <div className="px-6 py-3 whitespace-nowrap"> {rice.caryopsisLength === "" ? "---" : rice.caryopsisLength}</div>
              ))}
               </>}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Width</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.caryopsisWidth === "" ? "---" : rice.caryopsisWidth}</div>
                ))}</>:<>
                {searched.map((rice) => (
             <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.caryopsisWidth === "" ? "---" : rice.caryopsisWidth}</div>
             ))}
              </>}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Shape</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.caryopsisShape === "" ? "---" : rice.caryopsisShape}</div>
                ))}</>:<>
                {searched.map((rice) => (
                    <div className="px-6 py-3 whitespace-nowrap"> {rice.caryopsisShape === "" ? "---" : rice.caryopsisShape}</div>
              ))}
               </>}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Pericarp Colour</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.caryopsisPericarpColour === "" ? "---" : rice.caryopsisPericarpColour}</div>
                ))}</>:<>
                {searched.map((rice) => (
                   <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.caryopsisPericarpColour === "" ? "---" : rice.caryopsisPericarpColour}</div>
              ))}
               </>}
            </div>
          </tbody>
        </table>
        <table className="">
          <thead className="text-xs uppercase font-medium text-center bg-sprPrimaryLight sticky top-0 ">Endorsperm</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Colour</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.endorspermType === "" ? "---" : rice.endorspermType}</div>
                ))}</>:<>
                {searched.map((rice) => (
                   <div className="px-6 py-3 whitespace-nowrap"> {rice.endorspermType === "" ? "---" : rice.endorspermType}</div>
                ))}
                 </>}
            </div>
          </tbody>
        </table>
        <table className="">
          <thead className="text-xs uppercase font-medium text-center bg-sprPrimaryOffLight sticky top-0 ">Grain</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Habit</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.grainLength === "" ? "---" : rice.grainLength}</div>
                ))}</>:<>
                {searched.map((rice) => (
                  <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.grainLength === "" ? "---" : rice.grainLength}</div>
              ))}
                </>}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Width</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.grainWidth === "" ? "---" : rice.grainWidth}</div>
                ))}</>:<>
                {searched.map((rice) => (
                  <div className="px-6 py-3 whitespace-nowrap"> {rice.grainWidth === "" ? "---" : rice.grainWidth}</div>
              ))}
                 </>}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Thickness</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.grainThickness === "" ? "---" : rice.grainThickness}</div>
                ))}</>:<>
                {searched.map((rice) => (
                  <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.grainThickness === "" ? "---" : rice.grainThickness}</div>
              ))}
               </>}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">100 Grain Weight</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.grain100GrainWeight === "" ? "---" : rice.grain100GrainWeight}</div>
                ))}</>:<>
                {searched.map((rice) => (
                  <div className="px-6 py-3 whitespace-nowrap"> {rice.grain100GrainWeight === "" ? "---" : rice.grain100GrainWeight}</div>
              ))}
                 </>}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">10 Grain Weight</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.grain10GrainWeight === "" ? "---" : rice.grain10GrainWeight}</div>
                ))}</>:<>
                {searched.map((rice) => (
                  <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.grain10GrainWeight === "" ? "---" : rice.grain10GrainWeight}</div>
              ))}
              </>}
            </div>
          </tbody>
        </table>
        <table className="">
          <thead className="text-xs uppercase font-medium text-center bg-sprPrimaryLight sticky top-0 ">Lemma</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Anthocyanin Colouration of Keel</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.lemmaAnthocyaninColourationofKeel === "" ? "---" : rice.lemmaAnthocyaninColourationofKeel}</div>
                ))}</>:<>
                {searched.map((rice) => (
                  <div className="px-6 py-3 whitespace-nowrap"> {rice.lemmaAnthocyaninColourationofKeel === "" ? "---" : rice.lemmaAnthocyaninColourationofKeel}</div>
              ))}
              </>}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Anthocyanin Colouration of Area Below Apiculus Late Observation</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 bg-slate-50 whitespace-nowrap"> {rice.lemmaAnthocyaninColourationofAreaBelowApiculusLateobs === "" ? "---" : rice.lemmaAnthocyaninColourationofAreaBelowApiculusLateobs}</div>
                ))}</>:<>
                {searched.map((rice) => (
                  <div className="px-6 py-3 bg-slate-50 whitespace-nowrap"> {rice.lemmaAnthocyaninColourationofAreaBelowApiculusLateobs === "" ? "---" : rice.lemmaAnthocyaninColourationofAreaBelowApiculusLateobs}</div>
                ))}
                  </>}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Colour of Apiculus Late Observation</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.lemmaColourofApiculusLateobs === "" ? "---" : rice.lemmaColourofApiculusLateobs}</div>
                ))}</>:<>
                {searched.map((rice) => (
                  <div className="px-6 py-3 whitespace-nowrap"> {rice.lemmaColourofApiculusLateobs === "" ? "---" : rice.lemmaColourofApiculusLateobs}</div>
              ))}
                </>}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Shape of Apiculus</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.lemmaShapeofApiculus === "" ? "---" : rice.lemmaShapeofApiculus}</div>
                ))}</>:<>
                {searched.map((rice) => (
                  <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.lemmaShapeofApiculus === "" ? "---" : rice.lemmaShapeofApiculus}</div>
              ))}
               </>}
            </div>
          </tbody>
        </table>
        <table className="">
          <thead className="text-xs uppercase font-medium text-center bg-sprPrimaryOffLight sticky top-0 ">Lemma and Palea</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Pubesence</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.lemmaandPaleaPubesence === "" ? "---" : rice.lemmaandPaleaPubesence}</div>
                ))}</>:<>
                {searched.map((rice) => (
                   <div className="px-6 py-3 whitespace-nowrap"> {rice.lemmaandPaleaPubesence === "" ? "---" : rice.lemmaandPaleaPubesence}</div>
              ))}
               </>}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Colour Late Observation</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.lemmaandPaleaColourLateobs === "" ? "---" : rice.lemmaandPaleaColourLateobs}</div>
                ))}</>:<>
                {searched.map((rice) => (
                  <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.lemmaandPaleaColourLateobs === "" ? "---" : rice.lemmaandPaleaColourLateobs}</div>
              ))}
               </>}
            </div>
          </tbody>
        </table>
        <table className="">
          <thead className="text-xs uppercase font-medium text-center bg-sprPrimaryLight sticky top-0  ">Panicle</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Length Late Observation</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.panicleLengthLateobs === "" ? "---" : rice.panicleLengthLateobs}</div>
                ))}</>:<>
                {searched.map((rice) => (
                   <div className="px-6 py-3 whitespace-nowrap"> {rice.panicleLengthLateobs === "" ? "---" : rice.panicleLengthLateobs}</div>
              ))}
                </>}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Threshability</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.panicleThreshability === "" ? "---" : rice.panicleThreshability}</div>
                ))}</>:<>
                {searched.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.panicleThreshability === "" ? "---" : rice.panicleThreshability}</div>

              ))}
               </>}
            </div>
          </tbody>
        </table>
        <table className="">
          <thead className="text-xs uppercase font-medium text-center bg-sprPrimaryOffLight sticky top-0 ">Spikelet</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Fertility</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.spikeletFertility === "" ? "---" : rice.spikeletFertility}</div>
                ))}</>:<>
                {searched.map((rice) => (
                  <div className="px-6 py-3 whitespace-nowrap"> {rice.spikeletFertility === "" ? "---" : rice.spikeletFertility}</div>
              ))}
              </>}
            </div>
          </tbody>
        </table>
        <table className="">
          <thead className="text-xs uppercase font-medium text-center bg-sprPrimaryLight sticky top-0 ">Sterile</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Lemma Length</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.sterileLemmaLength === "" ? "---" : rice.sterileLemmaLength}</div>
                ))}</>:<>
                {searched.map((rice) => (
                    <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.sterileLemmaLength === "" ? "---" : rice.sterileLemmaLength}</div>
              ))}
              </>}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Longer Sterile Lemma Length</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.longerSterileLemmaLength === "" ? "---" : rice.longerSterileLemmaLength}</div>
                ))}</>:<>
                {searched.map((rice) => (
                  <div className="px-6 py-3 whitespace-nowrap"> {rice.longerSterileLemmaLength === "" ? "---" : rice.longerSterileLemmaLength}</div>
              ))}
               </>}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Lemma Shape</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 bg-slate-50 whitespace-nowrap"> {rice.sterileLemmaShape === "" ? "---" : rice.sterileLemmaShape}</div>
                ))}</>:<>
                {searched.map((rice) => (
                  <div className="px-6 py-3 bg-slate-50 whitespace-nowrap"> {rice.sterileLemmaShape === "" ? "---" : rice.sterileLemmaShape}</div>
              ))}
             </>}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary sticky top-4 bg-white">Lemma Colour</div>
              {searchInput === ''?<>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.sterileLemmaColour === "" ? "---" : rice.sterileLemmaColour}</div>
                ))}</>:<>
                {searched.map((rice) => (
                  <div className="px-6 py-3 whitespace-nowrap"> {rice.sterileLemmaColour === "" ? "---" : rice.sterileLemmaColour}</div>
              ))}
               </>}
            </div>
          </tbody>
        </table>

        <table className=" text-sm sticky right-0 ">
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

        <ModalGrainUpdate open={isModalOpen} closeModal={()=>{setIsModalOpen(false)}} modalId={modalId}  modalYear={modalYear} modalSeason={modalSeason} gcRiceData={gcRiceData}/>
      </div>

   </div>
    </div>
  )
}
