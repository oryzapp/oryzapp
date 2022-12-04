import { Link, Outlet } from "react-router-dom";
import ModalAddRiceData from "../components/ModalAddRiceData";
import { useEffect, useState } from "react";
import { addDoc, collection, collectionGroup, doc, getDoc, getDocs, onSnapshot, orderBy, query, serverTimestamp, setDoc, where } from "firebase/firestore";
import db from "../firebase-config";

// Icons
import addIcon from '../assets/add-icon.svg'

import { ReactComponent as RSicon } from "../assets/reproductive-stage-icon.svg";
import { ReactComponent as GCicon } from "../assets/grain-characteristics-icon.svg";
import { ReactComponent as VSicon } from "../assets/vegetative-stage-icon.svg";
import { ReactComponent as YCicon } from "../assets/yield-components-icon.svg";

import { ReactComponent as SearchIcon } from "../assets/search-icon.svg"
import RiceTables from "./RiceTables";
import VegetativeStage from "./VegetativeStage";
import ReproductiveStage from "./ReproductiveStage";
import GrainCharacteristics from "./GrainCharacteristics";
import YieldComponents from "./YieldComponents";

export default function RiceData() {

  const [page, setPage] = useState('vegetative-stage');
  console.log(page)

  const getPage = () => {
    switch (page) {
      case 'vegetative-stage':
        return <VegetativeStage season={seasonToOutlet} />
      case 'reproductive-stage':
        return <ReproductiveStage season={seasonToOutlet} />
      case 'grain-characteristics':
        return <GrainCharacteristics season={seasonToOutlet} />
      case 'yield-components':
        return <YieldComponents season={seasonToOutlet} />
    }
  }
  const [isModalOpen, setIsModalOpen] = useState(false)
  // Rice Data Inputs
  const [riceData, setRiceData] = useState({
    accessionId: ' ',
    riceYear: '2018',
    riceSeason: 'Dry',
    // vegetative
    auricleColor: '',
    coleoptileAnthocyaninColouration: '',
    collarColour: '',
    culmHabit: '',
    culmKneeingAbility: '',
    culmLength: '',
    culmNumber: '',
    culmDiameteratBasalInternode: '',
    culmAnthocyaninColourationonNodes: '',
    culmUnderlyingNodeColour: '',
    culmInternodeAnthocyanin: '',
    culmUnderlyingInternodeColouration: '',
    culmLodgingResistance: '',
    culmStrength: '',
    flagLeafLegnth: '',
    flagLeafWidth: '',
    flagLeafAttitudeEarlyobs: '',
    flagLeafAttitudeLateobs: '',
    leafMarginPubesence: '',
    leafSenesence: '',
    lbPresenceAbsenceofAnthocyaninColouration: '',
    lbDistributionofAnthocyaninColouration: '',
    lbIntensityofGreenColour: '',
    lbAttitude: '',
    lbPubesence: '',
    lbPubesenceonBladeSurface: '',
    lbLength: '',
    lbWidth: '',
    basalLeafSheathColour: '',
    lsAnthocyaninColouration: '',
    liguleLength: '',
    liguleShape: '',
    liguleShapeCultivatedSpecies: '',
    liguleShapeWildSpecies: '',
    liguleMarginShapeWildSpecies: '',
    liguleMarginHairiness: '',
    ligulePubesence: '',
    liguleColour: '',
    rhizomeandStolonFormation: '',
    seedlingHeight: '',
    // reproductive
    antherLength: '',
    antherColour: '',
    awnsPresenceWildSpecies: '',
    awnsDistributionCultivatedSpecies: '',
    awnsDistributionEarlyobs: '',
    awnLength: '',
    awnsThickness: '',
    lemmaColourofApicusearlyobs: '',
    lemmaAnthocyaninColourationofAreaBelowApiculusEarlyobs: '',
    lemmaandPaleaColourEarlyobs: '',
    maleSterility: '',
    panicleArrangementofPrimaryBranches: '',
    panicleNumberofBasalPrimaryBranches: '',
    panicleDistancefromBasetoLowestSpikeletInsertion: '',
    panicleTextureofMainAxis: '',
    panicleNumberPerPlant: '',
    panicleLength: '',
    panicleAttitudeofMainAxis: '',
    panicleAttitudeofBranches: '',
    panicleSecondaryBranching: '',
    panicleExsertion: '',
    panicleShattering: '',
    stigmaColour: '',
    // grain components
    awnColour: '',
    caryopsisLength: '',
    caryopsisWidth: '',
    caryopsisShape: '',
    caryopsisPericarpColour: '',
    endorspermType: '',
    grainLength: '',
    grainWidth: '',
    grainThickness: '',
    grain100GrainWeight: '',
    grain10GrainWeight: '',
    lemmaAnthocyaninColourationofKeel: '',
    lemmaAnthocyaninColourationofAreaBelowApiculusLateobs: '',
    lemmaColourofApiculusLateobs: '',
    lemmaShapeofApiculus: '',
    lemmaandPaleaPubesence: '',
    lemmaandPaleaColourLateobs: '',
    panicleLengthLateobs: '',
    panicleThreshability: '',
    spikeletFertility: '',
    sterileLemmaLength: '',
    longerSterileLemmaLength: '',
    sterileLemmaShape: '',
    sterileLemmaColour: '',
    // yield component
    cavans: '',
    kilogram: '',
    grainYield: '',
    tonHa: '',
    cookedRiceAroma: '',
    grainAroma: '',
    leafAroma: '',



  })
  // Initial State
  const initialState = {
    accessionId: ' ',
    riceYear: '2018',
    riceSeason: 'Dry',
    // vegetative
    auricleColor: '',
    coleoptileAnthocyaninColouration: '',
    collarColour: '',
    culmHabit: '',
    culmKneeingAbility: '',
    culmLength: '',
    culmNumber: '',
    culmDiameteratBasalInternode: '',
    culmAnthocyaninColourationonNodes: '',
    culmUnderlyingNodeColour: '',
    culmInternodeAnthocyanin: '',
    culmUnderlyingInternodeColouration: '',
    culmLodgingResistance: '',
    culmStrength: '',
    flagLeafLegnth: '',
    flagLeafWidth: '',
    flagLeafAttitudeEarlyobs: '',
    flagLeafAttitudeLateobs: '',
    leafMarginPubesence: '',
    leafSenesence: '',
    lbPresenceAbsenceofAnthocyaninColouration: '',
    lbDistributionofAnthocyaninColouration: '',
    lbIntensityofGreenColour: '',
    lbAttitude: '',
    lbPubesence: '',
    lbPubesenceonBladeSurface: '',
    lbLength: '',
    lbWidth: '',
    basalLeafSheathColour: '',
    lsAnthocyaninColouration: '',
    liguleLength: '',
    liguleShape: '',
    liguleShapeCultivatedSpecies: '',
    liguleShapeWildSpecies: '',
    liguleMarginShapeWildSpecies: '',
    liguleMarginHairiness: '',
    ligulePubesence: '',
    liguleColour: '',
    rhizomeandStolonFormation: '',
    seedlingHeight: '',
    // reproductive
    antherLength: '',
    antherColour: '',
    awnsPresenceWildSpecies: '',
    awnsDistributionCultivatedSpecies: '',
    awnsDistributionEarlyobs: '',
    awnLength: '',
    awnsThickness: '',
    lemmaColourofApicusearlyobs: '',
    lemmaAnthocyaninColourationofAreaBelowApiculusEarlyobs: '',
    lemmaandPaleaColourEarlyobs: '',
    maleSterility: '',
    panicleArrangementofPrimaryBranches: '',
    panicleNumberofBasalPrimaryBranches: '',
    panicleDistancefromBasetoLowestSpikeletInsertion: '',
    panicleTextureofMainAxis: '',
    panicleNumberPerPlant: '',
    panicleLength: '',
    panicleAttitudeofMainAxis: '',
    panicleAttitudeofBranches: '',
    panicleSecondaryBranching: '',
    panicleExsertion: '',
    panicleShattering: '',
    stigmaColour: '',
    // grain components
    awnColour: '',
    caryopsisLength: '',
    caryopsisWidth: '',
    caryopsisShape: '',
    caryopsisPericarpColour: '',
    endorspermType: '',
    grainLength: '',
    grainWidth: '',
    grainThickness: '',
    grain100GrainWeight: '',
    grain10GrainWeight: '',
    lemmaAnthocyaninColourationofKeel: '',
    lemmaAnthocyaninColourationofAreaBelowApiculusLateobs: '',
    lemmaColourofApiculusLateobs: '',
    lemmaShapeofApiculus: '',
    lemmaandPaleaPubesence: '',
    lemmaandPaleaColourLateobs: '',
    panicleLengthLateobs: '',
    panicleThreshability: '',
    spikeletFertility: '',
    sterileLemmaLength: '',
    longerSterileLemmaLength: '',
    sterileLemmaShape: '',
    sterileLemmaColour: '',
    // yield component
    cavans: '',
    kilogram: '',
    grainYield: '',
    tonHa: '',
    cookedRiceAroma: '',
    grainAroma: '',
    leafAroma: '',
  }

  // Handle Inputs
  const handleChange = async (e) => {
    setRiceData({
      ...riceData,
      [e.target.name]: e.target.value,
    });

  };

  // Set Season in Snake case
  var season;
  if (riceData.riceSeason === "Dry") {
    season = "Dry_Season"
  }
  if (riceData.riceSeason === "Wet") {
    season = "Wet_Season"
  }

  console.log(riceData.accessionId);
  console.log(riceData.riceYear);
  console.log(riceData.riceSeason);

  // Submit to Database ------------->
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const vsColRef = doc(db, `/SPR/Rice_Seasons/Seasons/${season}/Stages/Vegetative_Stage/VS_Raw_Rice_Data`, `${riceData.accessionId}_${season}_${riceData.riceYear}`);
      const vsPayLoad = {
        accessionId: riceData.accessionId,
        tagId: `${riceData.accessionId}_${season}_${riceData.riceYear}`,
        riceYear: riceData.riceYear,
        auricleColor: riceData.auricleColor,
        coleoptileAnthocyaninColouration: riceData.coleoptileAnthocyaninColouration,
        collarColour: riceData.collarColour,
        culmHabit: riceData.culmHabit,
        culmKneeingAbility: riceData.culmKneeingAbility,
        culmLength: riceData.culmLength,
        culmNumber: riceData.culmNumber,
        culmDiameteratBasalInternode: riceData.culmDiameteratBasalInternode,
        culmAnthocyaninColourationonNodes: riceData.culmAnthocyaninColourationonNodes,
        culmUnderlyingNodeColour: riceData.culmUnderlyingNodeColour,
        culmInternodeAnthocyanin: riceData.culmInternodeAnthocyanin,
        culmUnderlyingInternodeColouration: riceData.culmUnderlyingInternodeColouration,
        culmLodgingResistance: riceData.culmLodgingResistance,
        culmStrength: riceData.culmStrength,
        flagLeafLegnth: riceData.flagLeafLegnth,
        flagLeafWidth: riceData.flagLeafWidth,
        flagLeafAttitudeEarlyobs: riceData.flagLeafAttitudeEarlyobs,
        flagLeafAttitudeLateobs: riceData.flagLeafAttitudeLateobs,
        leafMarginPubesence: riceData.leafMarginPubesence,
        leafSenesence: riceData.leafSenesence,
        lbPresenceAbsenceofAnthocyaninColouration: riceData.lbPresenceAbsenceofAnthocyaninColouration,
        lbDistributionofAnthocyaninColouration: riceData.lbDistributionofAnthocyaninColouration,
        lbIntensityofGreenColour: riceData.lbIntensityofGreenColour,
        lbAttitude: riceData.lbAttitude,
        lbPubesence: riceData.lbPubesence,
        lbPubesenceonBladeSurface: riceData.lbPubesenceonBladeSurface,
        lbLength: riceData.lbLength,
        lbWidth: riceData.lbWidth,
        basalLeafSheathColour: riceData.basalLeafSheathColour,
        lsAnthocyaninColouration: riceData.lsAnthocyaninColouration,
        liguleLength: riceData.liguleLength,
        liguleShape: riceData.liguleShape,
        liguleShapeCultivatedSpecies: riceData.liguleShapeCultivatedSpecies,
        liguleShapeWildSpecies: riceData.liguleShapeWildSpecies,
        liguleMarginShapeWildSpecies: riceData.liguleMarginShapeWildSpecies,
        liguleMarginHairiness: riceData.liguleMarginHairiness,
        ligulePubesence: riceData.ligulePubesence,
        liguleColour: riceData.liguleColour,
        rhizomeandStolonFormation: riceData.rhizomeandStolonFormation,
        seedlingHeight: riceData.seedlingHeight,
        timestamp: serverTimestamp(),
      };
      const rsColRef = doc(db, `/SPR/Rice_Seasons/Seasons/${season}/Stages/Reproductive_Stage/RS_Raw_Rice_Data`, `${riceData.accessionId}_${season}_${riceData.riceYear}`);
      const rsPayLoad = {
        accessionId: riceData.accessionId,
        tagId: `${riceData.accessionId}_${season}_${riceData.riceYear}`,
        riceYear: riceData.riceYear,
        antherLength: riceData.antherLength,
        antherColour: riceData.antherColour,
        awnsPresenceWildSpecies: riceData.awnsPresenceWildSpecies,
        awnsDistributionCultivatedSpecies: riceData.awnsDistributionCultivatedSpecies,
        awnsDistributionEarlyobs: riceData.awnsDistributionEarlyobs,
        awnLength: riceData.awnLength,
        awnsThickness: riceData.awnsThickness,
        lemmaColourofApicusearlyobs: riceData.lemmaColourofApicusearlyobs,
        lemmaAnthocyaninColourationofAreaBelowApiculusEarlyobs: riceData.lemmaAnthocyaninColourationofAreaBelowApiculusEarlyobs,
        lemmaandPaleaColourEarlyobs: riceData.lemmaandPaleaColourEarlyobs,
        maleSterility: riceData.maleSterility,
        stigmaColour: riceData.stigmaColour,
        panicleArrangementofPrimaryBranches: riceData.panicleArrangementofPrimaryBranches,
        panicleNumberofBasalPrimaryBranches: riceData.panicleNumberofBasalPrimaryBranches,
        panicleDistancefromBasetoLowestSpikeletInsertion: riceData.panicleDistancefromBasetoLowestSpikeletInsertion,
        panicleTextureofMainAxis: riceData.panicleTextureofMainAxis,
        panicleNumberPerPlant: riceData.panicleNumberPerPlant,
        panicleLength: riceData.panicleLength,
        panicleAttitudeofMainAxis: riceData.panicleAttitudeofMainAxis,
        panicleAttitudeofBranches: riceData.panicleAttitudeofBranches,
        panicleSecondaryBranching: riceData.panicleSecondaryBranching,
        panicleExsertion: riceData.panicleExsertion,
        panicleShattering: riceData.panicleShattering,
        timestamp: serverTimestamp(),
      };
      const gcColRef = doc(db, `/SPR/Rice_Seasons/Seasons/${season}/Stages/Grain_Characteristics/GC_Raw_Rice_Data`, `${riceData.accessionId}_${season}_${riceData.riceYear}`);
      const gcPayLoad = {
        accessionId: riceData.accessionId,
        tagId: `${riceData.accessionId}_${season}_${riceData.riceYear}`,
        riceYear: riceData.riceYear,
        awnColour: riceData.awnColour,
        caryopsisLength: riceData.caryopsisLength,
        caryopsisWidth: riceData.caryopsisWidth,
        caryopsisShape: riceData.caryopsisShape,
        caryopsisPericarpColour: riceData.caryopsisPericarpColour,
        endorspermType: riceData.endorspermType,
        grainLength: riceData.grainLength,
        grainWidth: riceData.grainWidth,
        grainThickness: riceData.grainThickness,
        grain100GrainWeight: riceData.grain100GrainWeight,
        grain10GrainWeight: riceData.grain10GrainWeight,
        lemmaAnthocyaninColourationofKeel: riceData.lemmaAnthocyaninColourationofKeel,
        lemmaAnthocyaninColourationofAreaBelowApiculusLateobs: riceData.lemmaAnthocyaninColourationofAreaBelowApiculusLateobs,
        lemmaColourofApiculusLateobs: riceData.lemmaColourofApiculusLateobs,
        lemmaShapeofApiculus: riceData.lemmaShapeofApiculus,
        lemmaandPaleaPubesence: riceData.lemmaandPaleaPubesence,
        lemmaandPaleaColourLateobs: riceData.lemmaandPaleaColourLateobs,
        panicleLengthLateobs: riceData.panicleLengthLateobs,
        panicleThreshability: riceData.panicleThreshability,
        spikeletFertility: riceData.spikeletFertility,
        sterileLemmaLength: riceData.sterileLemmaLength,
        longerSterileLemmaLength: riceData.longerSterileLemmaLength,
        sterileLemmaShape: riceData.sterileLemmaShape,
        sterileLemmaColour: riceData.sterileLemmaColour,
        timestamp: serverTimestamp(),
      };
      const ycColRef = doc(db, `/SPR/Rice_Seasons/Seasons/${season}/Stages/Yield_Components/YC_Raw_Rice_Data/`, `${riceData.accessionId}_${season}_${riceData.riceYear}`);
      const ycPayLoad = {
        accessionId: riceData.accessionId,
        tagId: `${riceData.accessionId}_${season}_${riceData.riceYear}`,
        riceYear: riceData.riceYear,
        cavans: riceData.cavans,
        kilogram: riceData.kilogram,
        grainYield: riceData.grainYield,
        tonHa: riceData.tonHa,
        cookedRiceAroma: riceData.cookedRiceAroma,
        grainAroma: riceData.grainAroma,
        leafAroma: riceData.leafAroma,

        timestamp: serverTimestamp(),
      };

      const riceListDocRef = doc(db, `/SPR/Rice_Accessions/Rice_List/${season}/Raw_Rice_List/`, `${riceData.accessionId}_${season}_${riceData.riceYear}`);
      const riceListPayLoad = {
        accessionId: riceData.accessionId,
        riceYear: riceData.riceYear,
        riceSeason: riceData.riceSeason

      }

      if (riceDataExists === true || riceData.accessionId === ' ' || riceData.accessionId === 'Accession') {
        alert('Change Accession')
      }


      else {
        await setDoc(vsColRef, vsPayLoad);
        await setDoc(rsColRef, rsPayLoad);
        await setDoc(gcColRef, gcPayLoad);
        await setDoc(ycColRef, ycPayLoad);
        await setDoc(riceListDocRef, riceListPayLoad);
        setIsModalOpen(false)
        setRiceData(initialState);
      }
    } catch (error) {
      alert(error);
    }
  };


  // Stages Nav Active State ---------------->
  const [state, setState] = useState(1)
  const activeOn = (index) => {
    setState(index)
  }

  // Stages Nav ---------------->
  const [toggleState, setToggleState] = useState(1)
  const toggleTab = (index) => {
    setToggleState(index)
  }

  // Change Seasons
  const [seasonToOutlet, setSeasonToOutlet] = useState('All')
  const changeSeason = (e) => {
    setSeasonToOutlet(e.target.value)
  }


  // Get All Accessions for Select
  const [riceAccessions, setRiceAccessions] = useState([]);
  useEffect(() => {
    const collectionRef = collection(db, "SPR/Rice_Accessions/Accession_IDs");
    const q = query(collectionRef, orderBy("timestamp", "asc"));
    const unsub = onSnapshot(q, (snapshot) => {
      setRiceAccessions(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
    return unsub;
  }, []);

  // Get All Rice List to check if Exisiting
  const [riceDataExists, setRiceDataExists] = useState(false)
  const [riceList, setRiceList] = useState([]);

  useEffect(() => {
    const collectionRef = collectionGroup(db, "Raw_Rice_List");
    const unsub = onSnapshot(collectionRef, (snapshot) => {
      setRiceList(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
    return unsub;
  }, []);


  useEffect(() => {

    const result = riceList.find(rice => rice.id === `${riceData.accessionId}_${season}_${riceData.riceYear}`)
    if (result === undefined) {
      console.log('undefine');
      setRiceDataExists(false)
    }
    else {
      console.log('exisst');
      setRiceDataExists(true)
    }
  }, [riceData.accessionId, season, riceData.riceYear])



  const years = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2030]
  console.log(riceData.riceSeason);

  return (
    <>
      <div className=' w-full hidden sm:flex flex-col rounded-xl  bg-white opacity-90 p-2'>
        {/* Header */}
        <header className="page-header   flex items-center">
          <button className=" w-8 h-8 p-2 rounded-full  bg-gradient-to-b from-sprPrimary to-sprPrimaryDarkest hover:bg-gradient-to-t hover:from-sprPrimaryLight hover:to-sprPrimaryLight drop-shadow-md" onClick={() => setIsModalOpen(true)}>
            <img src={addIcon} alt="" />
          </button>
          <h1 className="text-3xl font-bold text-sprBlack opacity-80 pl-2">Rice Data</h1>
        </header>
        {/* Options */}
        <div className="flex  items-center gap-3  bg-white py-1">
          <div className=" flex  items-center gap-1 sm:gap-3   rounded-full">
            {/* Search Bar */}
            <div className="relative drop-shadow-md hidden sm:block">
              <input
                className=" pl-2 py-2 text-sm placeholder:text-sprPrimary/50 text-sprPrimary focus:outline-none focus:border-none  rounded-full "
                type="text"
                placeholder="Find a Rice"
              />
              <button className="  h-full px-2 rounded-full absolute right-0 bg-sprPrimaryLight">
                <SearchIcon stroke="white" />
              </button>
            </div>
            {/* Season */}
            <div className="drop-shadow-md flex " >
              <div className="bg-sprPrimaryLight text-white h-full text-sm  p-2 rounded-full pl-3 pr-10 ">Season</div>
              <div className=" -ml-9">
                <select value={seasonToOutlet} name="riceSeason" onChange={changeSeason} className="rounded-full py-2 text-sprPrimary text-sm  ">
                  <option value="All">All</option>
                  <option value="Dry_Season">Dry</option>
                  <option value="Wet_Season">Wet</option>
                </select>
              </div>



            </div>

          </div>





        </div>
        {/* Main */}
        <section className=" w-full flex flex-auto overflow-auto rounded-lg scrollbar  mt-2 border  border-slate-200" >
          <div className="">

            <RiceTables onChange={setPage} />

          </div>

          <div className=" h-full w-full flex  flex-auto overflow-auto scrollbar">

            <div className="  flex flex-auto max-w-0 max-h-0 divide-y divide-slate-400 ">
              {getPage()}


            </div>
          </div>
        </section>
        {/* Modal */}
        <ModalAddRiceData open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="flex ">
            <h1 className="page-header text-2xl font-bold">Add Rice Data</h1>
          </div>
          <div className="flex-auto flex flex-col overflow-hidden">
            <form
              className="flex flex-col h-full"
              onSubmit={handleSubmit}
            >
              <div className={riceDataExists === true ? "block text-red-400" : "hidden"}>*Rice Data Already Exists</div>
              <div className="flex whitespace-nowrap  gap-2 my-2">
                {/* Accession */}
                <div className="drop-shadow-md flex" >
                  <div className="bg-sprPrimaryLight text-white h-full text-sm  p-2 rounded-full pl-3 pr-10">Accession</div>
                  <div className=" -ml-9">
                    <select className="rounded-full py-2 text-sprPrimary text-sm " name="accessionId" id="" onChange={handleChange} required>
                      <option value='Accession' >Accession</option>
                      {riceAccessions.map((rice) =>
                        <option value={rice.accessionId}  >{rice.accessionId}</option>)}
                    </select>
                  </div>



                </div>
                {/* Season */}
                <div className="drop-shadow-md flex" >
                  <div className="bg-sprPrimaryLight text-white h-full text-sm  p-2 rounded-full pl-3 pr-10">Season</div>
                  <div className=" -ml-9">
                    <select className="rounded-full py-2 text-sprPrimary text-sm " value={riceData.riceSeason} name="riceSeason" onChange={handleChange}>
                      <option value="Dry">Dry</option>
                      <option value="Wet">Wet</option>
                    </select>
                  </div>



                </div>
                {/* Year */}
                <div className="drop-shadow-md flex" >
                  <div className="bg-sprPrimaryLight text-white h-full text-sm  p-2 rounded-full pl-3 pr-10">Year</div>
                  <div className=" -ml-9">
                    <select className="rounded-full py-2 text-sprPrimary text-sm " value={riceData.riceYear} name="riceYear" onChange={handleChange}>
                      {
                        years.map((e) =>
                          <option value={e} >{e}</option>

                        )
                      }
                    </select>
                  </div>



                </div>

              </div>

              {/* Tab Nav */}
              <div className=" flex  ">

                <div className="flex cursor-pointer ">
                  <div className={toggleState === 1 ? "group border-b-2 border-b-sprPrimary flex items-end" : "group flex  items-end"} onClick={() => toggleTab(1)}>
                    <div className="w-8 h-8 ">
                      {/* <img src={vegetativeStageIcon} alt="" /> */}
                      <VSicon className={toggleState === 1 ? "" : "group-hover:stroke-sprPrimaryLight"} fill="none" stroke={toggleState !== 1 ? "#888A89" : "#AFBE00"} />
                    </div>
                    <h6 className={toggleState === 1 ? "text-sm md:block hidden text-sprPrimary" : "text-sm md:block hidden group-hover:text-sprPrimaryLight text-sprInactiveGray"}>Vegetative Stage</h6>
                  </div>

                  <div className={toggleState === 2 ? "group border-b-2 border-b-sprPrimary flex items-end" : "group flex items-end"} onClick={() => toggleTab(2)}>
                    <div className="h-8 w-8 ">
                      {/* <img src={reproductiveStageIcon} alt="" /> */}
                      <RSicon className={toggleState === 2 ? "" : "group-hover:stroke-sprPrimaryLight"} fill="none" stroke={toggleState !== 2 ? "#888A89" : "#AFBE00"} />
                    </div>
                    <h6 className={toggleState === 2 ? "text-sm md:block hidden text-sprPrimary" : "text-sm md:block hidden group-hover:text-sprPrimaryLight text-sprInactiveGray"}>Reproductive Stage</h6>
                  </div>

                  <div className={toggleState === 3 ? "group border-b-2 border-b-sprPrimary flex items-end" : "group flex items-end"} onClick={() => toggleTab(3)}>
                    <div className="h-8 w-8 ">
                      {/* <img src={grainCharacteristicsIcon} alt="" /> */}
                      <GCicon className={toggleState === 3 ? "" : "group-hover:stroke-sprPrimaryLight"} fill="none" stroke={toggleState !== 3 ? "#888A89" : "#AFBE00"} />
                    </div>
                    <h6 className={toggleState === 3 ? "text-sm md:block hidden text-sprPrimary" : "text-sm md:block hidden group-hover:text-sprPrimaryLight text-sprInactiveGray"}>Grain Characteristics</h6>

                  </div>

                  <div className={toggleState === 4 ? "group border-b-2 border-b-sprPrimary flex items-end" : "group flex items-end"} onClick={() => toggleTab(4)}>
                    <div className="w-8 h-8 ">
                      {/* <img src={yieldComponentsIcon} alt="" /> */}
                      <YCicon className={toggleState === 4 ? "" : "group-hover:stroke-sprPrimaryLight"} fill="none" stroke={toggleState !== 4 ? "#888A89" : "#AFBE00"} />
                    </div>
                    <h6 className={toggleState === 4 ? "text-sm md:block hidden text-sprPrimary" : "text-sm md:block hidden group-hover:text-sprPrimaryLight text-sprInactiveGray"}>Yield Components</h6>
                  </div>
                </div>
              </div>

              {/* Inputs */}
              <div className=" flex-auto overflow-auto scrollbar">
                {/* Vegetative Stage*/}
                <div className={toggleState === 1 ? "flex flex-col h-96 " : "hidden"}>
                  <div className="flex flex-col p-2 pb-0">
                    <div className="text-xs uppercase font-medium">Auricle</div>
                    <div className="grid grid-cols-2 gap-4 bg-white text-sm">
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Auricle: colour</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:outline-none focus:border-none focus:ring-2 focus:ring-sprPrimary" type="text" name="auricleColor"
                          value={riceData.auricleColor} onChange={handleChange} /></div>
                    </div>

                  </div>
                  <div className="flex flex-col p-2 pb-0">
                    <div className="uppercase text-xs font-medium">Coleoptile</div>
                    <div className="grid grid-cols-2 gap-4 bg-white text-sm">
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Coleoptile: anthocyanin colouration</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="coleoptileAnthocyaninColouration"
                          value={riceData.coleoptileAnthocyaninColouration} onChange={handleChange} /></div>
                    </div>



                  </div>
                  <div className="flex flex-col p-2 pb-0">
                    <div className="uppercase text-xs font-medium">Collar</div>
                    <div className="grid grid-cols-2 gap-4 bg-white text-sm">
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Collar: colour</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="collarColour"
                          value={riceData.collarColour} onChange={handleChange} /></div>
                    </div>



                  </div>
                  <div className="flex flex-col p-2 pb-0">
                    <div className="uppercase text-xs font-medium">Culm</div>
                    <div className="grid grid-cols-2 gap-4 bg-white text-sm">
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Culm: habit</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="culmHabit"
                          value={riceData.culmHabit} onChange={handleChange} /></div>
                      <div className="flex flex-col px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Culm: kneeing ability</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="culmKneeingAbility"
                          value={riceData.culmKneeingAbility} onChange={handleChange} /></div>
                      <div className="flex flex-col px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Culm: length [cm]</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="culmLength"
                          value={riceData.culmLength} onChange={handleChange} /></div>
                      <div className="flex flex-col px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Culm: number</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="culmNumber"
                          value={riceData.culmNumber} onChange={handleChange} /></div>
                      <div className="flex flex-col px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Culm: diameter at basal internode [mm]</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="culmDiameteratBasalInternode"
                          value={riceData.culmDiameteratBasalInternode} onChange={handleChange} /></div>
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Culm: anthocyanin colouration on nodes</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="culmAnthocyaninColourationonNodes"
                          value={riceData.culmAnthocyaninColourationonNodes} onChange={handleChange} /></div>
                      <div className="flex flex-col px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Culm: underlying node colour</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="culmUnderlyingNodeColour"
                          value={riceData.culmUnderlyingNodeColour} onChange={handleChange} /></div>
                      <div className="flex flex-col px-6">
                        <div className=" flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Culm: internode anthocyanin</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="culmInternodeAnthocyanin"
                          value={riceData.culmInternodeAnthocyanin} onChange={handleChange} /></div>
                      <div className="flex flex-col px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Culm: underlying internode colouration</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="culmUnderlyingInternodeColouration"
                          value={riceData.culmUnderlyingInternodeColouration} onChange={handleChange} /></div>
                      <div className="flex flex-col px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Culm: lodging resistance</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="culmLodgingResistance"
                          value={riceData.culmLodgingResistance} onChange={handleChange} /></div>
                      <div className="flex flex-col px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Culm: strength</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="culmStrength"
                          value={riceData.culmStrength} onChange={handleChange} /></div>
                    </div>



                  </div>
                  <div className="flex flex-col p-2 pb-0">
                    <div className="uppercase text-xs font-medium">Flag Leaf</div>
                    <div className="grid grid-cols-2 gap-4 bg-white text-sm">
                      <div className="flex flex-col px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Flag leaf: length [cm]</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="flagLeafLegnth"
                          value={riceData.flagLeafLegnth} onChange={handleChange} /></div>
                      <div className="flex flex-col px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Flag leaf: width [cm]</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="flagLeafWidth"
                          value={riceData.flagLeafWidth} onChange={handleChange} /></div>
                      <div className="flex flex-col px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Flag leaf: attitude (early observation)</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="flagLeafAttitudeEarlyobs"
                          value={riceData.flagLeafAttitudeEarlyobs} onChange={handleChange} /></div>
                      <div className="flex flex-col px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Flag leaf: attitude (late observation)</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="flagLeafAttitudeLateobs"
                          value={riceData.flagLeafAttitudeLateobs} onChange={handleChange} /></div>
                    </div>



                  </div>
                  <div className="flex flex-col p-2 pb-0">
                    <div className="uppercase text-xs font-medium">Leaf</div>
                    <div className="grid grid-cols-2 gap-4 bg-white text-sm">
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Leaf margin: pubescence</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="leafMarginPubesence"
                          value={riceData.leafMarginPubesence} onChange={handleChange} /></div>
                      <div className="flex flex-col px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Leaf: senescence</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="leafSenesence"
                          value={riceData.leafSenesence} onChange={handleChange} /></div>
                    </div>



                  </div>
                  <div className="flex flex-col p-2 pb-0">
                    <div className="uppercase text-xs font-medium">Leaf Blade</div>
                    <div className="grid grid-cols-2 gap-4 bg-white text-sm">
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Leaf blade: presence/absence of anthocyanin colouration</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="lbPresenceAbsenceofAnthocyaninColouration"
                          value={riceData.lbPresenceAbsenceofAnthocyaninColouration} onChange={handleChange} /></div>
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Leaf blade: distribution of anthocyanin colouration</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="lbDistributionofAnthocyaninColouration"
                          value={riceData.lbDistributionofAnthocyaninColouration} onChange={handleChange} /></div>
                      <div className="flex flex-col px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Leaf blade: intensity of green colour</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="lbIntensityofGreenColour"
                          value={riceData.lbIntensityofGreenColour} onChange={handleChange} /></div>
                      <div className="flex flex-col px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Leaf blade: attitude</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="lbAttitude"
                          value={riceData.lbAttitude} onChange={handleChange} /></div>
                      <div className="flex flex-col px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Leaf blade: pubescence</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="lbPubesence"
                          value={riceData.lbPubesence} onChange={handleChange} /></div>
                      <div className="flex flex-col px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Leaf blade pubescence on blade surface</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="lbPubesenceonBladeSurface"
                          value={riceData.lbPubesenceonBladeSurface} onChange={handleChange} /></div>
                      <div className="flex flex-col px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Leaf blade: length [cm]</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="lbLength"
                          value={riceData.lbLength} onChange={handleChange} /></div>
                      <div className="flex flex-col px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Leaf blade: width [cm]</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="lbWidth"
                          value={riceData.lbWidth} onChange={handleChange} /></div>
                    </div>



                  </div>
                  <div className="flex flex-col p-2 pb-0">
                    <div className="uppercase text-xs font-medium">Leaf Sheath</div>
                    <div className="grid grid-cols-2 gap-4 bg-white text-sm">
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Basal leaf sheath: colour</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="basalLeafSheathColour"
                          value={riceData.basalLeafSheathColour} onChange={handleChange} /></div>
                      <div className="flex flex-col px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Leaf sheath: anthocyanin colouration</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="lsAnthocyaninColouration"
                          value={riceData.lsAnthocyaninColouration} onChange={handleChange} /></div>
                    </div>



                  </div>
                  <div className="flex flex-col p-2 pb-0">
                    <div className="uppercase text-xs font-medium">Ligule</div>
                    <div className="grid grid-cols-2 gap-4 bg-white text-sm">
                      <div className="flex flex-col px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Ligule length [mm]</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="liguleLength"
                          value={riceData.liguleLength} onChange={handleChange} /></div>
                      <div className="flex flex-col px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Ligule shape</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="liguleShape"
                          value={riceData.liguleShape} onChange={handleChange} /></div>
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Ligule shape (cultivated species)</label></div>
                        <input className="rounded-full px-1 py-px  border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="liguleShapeCultivatedSpecies"
                          value={riceData.liguleShapeCultivatedSpecies} onChange={handleChange} /></div>
                      <div className="flex flex-col px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Ligule shape (wild species)</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="liguleShapeWildSpecies"
                          value={riceData.liguleShapeWildSpecies} onChange={handleChange} /></div>
                      <div className="flex flex-col px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Ligule margin shape (wild species)</label></div>
                        <input className="rounded-full px-1 py-px  border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="liguleMarginShapeWildSpecies"
                          value={riceData.liguleMarginShapeWildSpecies} onChange={handleChange} /></div>
                      <div className="flex flex-col px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Ligule margin hairiness</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="liguleMarginHairiness"
                          value={riceData.liguleMarginHairiness} onChange={handleChange} /></div>
                      <div className="flex flex-col px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Ligule pubescence</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="ligulePubesence"
                          value={riceData.ligulePubesence} onChange={handleChange} /></div>
                      <div className="flex flex-col px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Ligule colour</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="liguleColour"
                          value={riceData.liguleColour} onChange={handleChange} /></div>
                    </div>



                  </div>
                  <div className="flex flex-col p-2 pb-0">
                    <div className="uppercase text-xs font-medium">Rhizome and Stolon</div>
                    <div className="grid grid-cols-2 gap-4 bg-white text-sm">
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Rhizome and stolon: formation</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="rhizomeandStolonFormation"
                          value={riceData.rhizomeandStolonFormation} onChange={handleChange} /></div>
                    </div>



                  </div>
                  <div className="flex flex-col p-2 pb-0">
                    <div className="uppercase text-xs font-medium">Seedling</div>
                    <div className="grid grid-cols-2 gap-4 bg-white text-sm">
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Seedling: height [cm]</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="seedlingHeight"
                          value={riceData.seedlingHeight} onChange={handleChange} /></div>
                    </div>



                  </div>


                </div>
                {/* Reproductive Stage */}
                <div className={toggleState === 2 ? "flex flex-col h-96" : "hidden"}>

                  <div className="flex flex-col p-2 pb-0">
                    <div className="text-xs uppercase font-medium">Anther</div>
                    <div className="grid grid-cols-2 gap-4 bg-white text-sm">
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Anther: length [mm]</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="antherLength" value={riceData.antherLength} onChange={handleChange} /></div>
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Anther: colour</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="antherColour" value={riceData.antherColour} onChange={handleChange} /></div>
                    </div>



                  </div>
                  <div className="flex flex-col p-2 pb-0">
                    <div className="text-xs uppercase font-medium">Awns</div>
                    <div className="grid grid-cols-2 gap-4 bg-white text-sm">
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Awns: presence (wild species)</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="awnsPresenceWildSpecies" value={riceData.awnsPresenceWildSpecies} onChange={handleChange} /></div>
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Awns: distribution (cultivated species)</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="awnsDistributionCultivatedSpecies" value={riceData.awnsDistributionCultivatedSpecies} onChange={handleChange} /></div>
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Awns: colour (early observation)</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="awnsDistributionEarlyobs" value={riceData.awnsDistributionEarlyobs} onChange={handleChange} /></div>
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Awn length [mm]</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="awnLength" value={riceData.awnLength} onChange={handleChange} /></div>
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Awns: thickness [mm]</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="awnsThickness" value={riceData.awnsThickness} onChange={handleChange} /></div>
                    </div>



                  </div>
                  <div className="flex flex-col p-2 pb-0">
                    <div className="text-xs uppercase font-medium">Lemma</div>
                    <div className="grid grid-cols-2 gap-4 bg-white text-sm">
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Lemma: colour of apiculus (early observation)</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="lemmaColourofApicusearlyobs" value={riceData.lemmaColourofApicusearlyobs} onChange={handleChange} /></div>
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Lemma: anthocyanin colouration of area below apiculus (early observation)</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="lemmaAnthocyaninColourationofAreaBelowApiculusEarlyobs" value={riceData.lemmaAnthocyaninColourationofAreaBelowApiculusEarlyobs} onChange={handleChange} /></div>
                    </div>



                  </div>
                  <div className="flex flex-col p-2 pb-0">
                    <div className="text-xs uppercase font-medium">Lemma and Palea</div>
                    <div className="grid grid-cols-2 gap-4 bg-white text-sm">
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Lemma and palea: colour (early observation)</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="lemmaandPaleaColourEarlyobs" value={riceData.lemmaandPaleaColourEarlyobs} onChange={handleChange} /></div>
                    </div>



                  </div>
                  <div className="flex flex-col p-2 pb-0">
                    <div className="text-xs uppercase font-medium">Male Sterility</div>
                    <div className="grid grid-cols-2 gap-4 bg-white text-sm">
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Male sterility</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="maleSterility" value={riceData.maleSterility} onChange={handleChange} /></div>
                    </div>

                  </div>
                  <div className="flex flex-col p-2 pb-0">
                    <div className="text-xs uppercase font-medium">Stigma</div>
                    <div className="grid grid-cols-2 gap-4 bg-white text-sm">
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Stigma Colour</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="stigmaColour" value={riceData.stigmaColour} onChange={handleChange} /></div>
                    </div>



                  </div>
                  <div className="flex flex-col p-2 pb-0">
                    <div className="text-xs uppercase font-medium">Panicle</div>
                    <div className="grid grid-cols-2 gap-4 bg-white text-sm">
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Panicle: arrangement of primary branches</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="panicleArrangementofPrimaryBranches" value={riceData.panicleArrangementofPrimaryBranches} onChange={handleChange} /></div>
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Panicle: number of basal primary branches</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="panicleNumberofBasalPrimaryBranches" value={riceData.panicleNumberofBasalPrimaryBranches} onChange={handleChange} /></div>
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Panicle: distance from base to lowest spikelet insertion [mm]</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="panicleDistancefromBasetoLowestSpikeletInsertion" value={riceData.panicleDistancefromBasetoLowestSpikeletInsertion} onChange={handleChange} /></div>
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Panicle: texture of main axis</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="panicleTextureofMainAxis" value={riceData.panicleTextureofMainAxis} onChange={handleChange} /></div>
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Panicle: number per plant</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="panicleNumberPerPlant" value={riceData.panicleNumberPerPlant} onChange={handleChange} /></div>
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Panicle: length [cm]</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="panicleLength" value={riceData.panicleLength} onChange={handleChange} /></div>
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Panicle: attitude of main axis</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="panicleAttitudeofMainAxis" value={riceData.panicleAttitudeofMainAxis} onChange={handleChange} /></div>
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Panicle: attitude of branches</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="panicleAttitudeofBranches" value={riceData.panicleAttitudeofBranches} onChange={handleChange} /></div>
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Panicle: secondary branching</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="panicleSecondaryBranching" value={riceData.panicleSecondaryBranching} onChange={handleChange} /></div>
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Panicle: exsertion</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="panicleExsertion" value={riceData.panicleExsertion} onChange={handleChange} /></div>
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Panicle: shattering</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="panicleShattering" value={riceData.panicleShattering} onChange={handleChange} /></div>
                    </div>



                  </div>


                </div>
                {/* Grain Characteristics*/}
                <div className={toggleState === 3 ? "flex flex-col h-96" : "hidden"} >
                  <div className="flex flex-col p-2 pb-0">
                    <div className="text-xs uppercase font-medium">Awn</div>
                    <div className="grid grid-cols-2 gap-4 bg-white text-sm">
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="" >Awn colour (late observation) </label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="awnColour" value={riceData.awnColour} onChange={handleChange} /></div>
                    </div>



                  </div>
                  <div className="flex flex-col p-2 pb-0">
                    <div className="text-xs uppercase font-medium">Caryopsis</div>
                    <div className="grid grid-cols-2 gap-4 bg-white text-sm">
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Caryopsis: length [mm]</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="caryopsisLength" value={riceData.caryopsisLength} onChange={handleChange} /></div>
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Caryopsis: width [mm]</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="caryopsisWidth" value={riceData.caryopsisWidth} onChange={handleChange} /></div>
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Caryopsis: shape</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="caryopsisShape" value={riceData.caryopsisShape} onChange={handleChange} /></div>
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Caryopsis: pericarp colour</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="caryopsisPericarpColour" value={riceData.caryopsisPericarpColour} onChange={handleChange} /></div>
                    </div>



                  </div>
                  <div className="flex flex-col p-2 pb-0">
                    <div className="text-xs uppercase font-medium">Endosperm</div>
                    <div className="grid grid-cols-2 gap-4 bg-white text-sm">
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Endosperm type</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="endorspermType" value={riceData.endorspermType} onChange={handleChange} /></div>
                    </div>



                  </div>
                  <div className="flex flex-col p-2 pb-0">
                    <div className="text-xs uppercase font-medium">Grain</div>
                    <div className="grid grid-cols-2 gap-4 bg-white text-sm">
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Grain: length [mm]</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="grainLength" value={riceData.grainLength} onChange={handleChange} /></div>
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Grain: width [mm]</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="grainWidth" value={riceData.grainWidth} onChange={handleChange} /></div>
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Grain: thickness [mm]</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="grainThickness" value={riceData.grainThickness} onChange={handleChange} /></div>
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Grain: 100-grain weight [g]</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="grain100GrainWeight" value={riceData.grain100GrainWeight} onChange={handleChange} /></div>
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Grain: 10-grain weight [g]</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="grain10GrainWeight" value={riceData.grain10GrainWeight} onChange={handleChange} /></div>
                    </div>



                  </div>
                  <div className="flex flex-col p-2 pb-0">
                    <div className="text-xs uppercase font-medium">Lemma</div>
                    <div className="grid grid-cols-2 gap-4 bg-white text-sm">
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Lemma: anthocyanin colouration of keel</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="lemmaAnthocyaninColourationofKeel" value={riceData.lemmaAnthocyaninColourationofKeel} onChange={handleChange} /></div>
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Lemma: anthocyanin colouration of area below apiculus (late observation)</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="lemmaAnthocyaninColourationofAreaBelowApiculusLateobs" value={riceData.lemmaAnthocyaninColourationofAreaBelowApiculusLateobs} onChange={handleChange} /></div>
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Lemma: colour of apiculus (late observation)</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="lemmaColourofApiculusLateobs" value={riceData.lemmaColourofApiculusLateobs} onChange={handleChange} /></div>
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Lemma: shape of apiculus</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="lemmaShapeofApiculus" value={riceData.lemmaShapeofApiculus} onChange={handleChange} /></div>
                    </div>



                  </div>
                  <div className="flex flex-col p-2 pb-0">
                    <div className="text-xs uppercase font-medium">Lemma and Palea</div>
                    <div className="grid grid-cols-2 gap-4 bg-white text-sm">
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Lemma and palea pubescence</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="lemmaandPaleaPubesence" value={riceData.lemmaandPaleaPubesence} onChange={handleChange} /></div>
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Lemma and palea colour (late observation)</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="lemmaandPaleaColourLateobs" value={riceData.lemmaandPaleaColourLateobs} onChange={handleChange} /></div>
                    </div>



                  </div>
                  <div className="flex flex-col p-2 pb-0">
                    <div className="text-xs uppercase font-medium">Panicle</div>
                    <div className="grid grid-cols-2 gap-4 bg-white text-sm">
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Panicle: length (late observation)</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="panicleLengthLateobs" value={riceData.panicleLengthLateobs} onChange={handleChange} /></div>
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Panicle: threshability</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="panicleThreshability" value={riceData.panicleThreshability} onChange={handleChange} /></div>
                    </div>



                  </div>
                  <div className="flex flex-col p-2 pb-0">
                    <div className="text-xs uppercase font-medium">Spikelet</div>
                    <div className="grid grid-cols-2 gap-4 bg-white text-sm">
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Spikelet: fertility</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="spikeletFertility" value={riceData.spikeletFertility} onChange={handleChange} /></div>
                    </div>



                  </div>
                  <div className="flex flex-col p-2 pb-0">
                    <div className="text-xs uppercase font-medium">Sterile Lemma</div>
                    <div className="grid grid-cols-2 gap-4 bg-white text-sm">
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Sterile lemma length [mm]</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="sterileLemmaLength" value={riceData.sterileLemmaLength} onChange={handleChange} /></div>
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Longer sterile lemma length [mm]</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="longerSterileLemmaLength" value={riceData.longerSterileLemmaLength} onChange={handleChange} /></div>
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Sterile lemma shape</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="sterileLemmaShape" value={riceData.sterileLemmaShape} onChange={handleChange} /></div>
                      <div className="flex flex-col bg-white px-6">
                        <div className="flex flex-col -space-y-1">
                          <label className="text-sprPrimary" htmlFor="">Sterile lemma: colour</label></div>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="sterileLemmaColour" value={riceData.sterileLemmaColour} onChange={handleChange} /></div>
                    </div>



                  </div>
                </div>
                {/* Yield Components*/}
                <div className={toggleState === 4 ? "flex flex-col h-96" : "hidden"} >
                  <div className="flex flex-col p-2 pb-0">
                    <div className="grid grid-cols-2 gap-4 bg-white text-sm">
                      <div className="flex flex-col bg-white px-6">
                        <label className="text-sprPrimary" htmlFor="">Cavans</label>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="cavans" value={riceData.cavans} onChange={handleChange} /></div>
                      <div className="flex flex-col bg-white px-6">
                        <label className="text-sprPrimary" htmlFor="">Kilogram</label>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="kilogram" value={riceData.kilogram} onChange={handleChange} /></div>
                      <div className="flex flex-col bg-white px-6">
                        <label className="text-sprPrimary" htmlFor="">Grain Yield</label>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="grainYield" value={riceData.grainYield} onChange={handleChange} /></div>
                      <div className="flex flex-col bg-white px-6">
                        <label className="text-sprPrimary" htmlFor="">Ton/Ha</label>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="tonHa" value={riceData.tonHa} onChange={handleChange} /></div>
                    </div>



                  </div>
                  <div className="flex flex-col p-2 pb-0">
                    <div className="text-xs uppercase font-medium">Aroma</div>
                    <div className="grid grid-cols-2 gap-4 bg-white text-sm">
                      <div className="flex flex-col bg-white px-6">
                        <label className="text-sprPrimary" htmlFor="">Cooked Rice Aroma</label>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="cookedRiceAroma" value={riceData.cookedRiceAroma} onChange={handleChange} /></div>
                      <div className="flex flex-col bg-white px-6">
                        <label className="text-sprPrimary" htmlFor="">Grain Aroma</label>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="grainAroma" value={riceData.grainAroma} onChange={handleChange} /></div>
                      <div className="flex flex-col bg-white px-6">
                        <label className="text-sprPrimary" htmlFor="">Leaf Aroma</label>
                        <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="leafAroma" value={riceData.leafAroma} onChange={handleChange} /></div>
                    </div>



                  </div>
                </div>
              </div>

              {/* Cancel and Save Button */}
              <div className="text-right space-x-2">
                <button
                  className="bg-sprGray30 rounded-full py-2 px-3 font-medium text-sm text-white drop-shadow-2xl shadow-slate-300"
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-sprPrimary rounded-full py-2 px-3 font-medium text-sm text-white shadow-slate-300"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </ModalAddRiceData >
      </div>


    </>
  );
}


