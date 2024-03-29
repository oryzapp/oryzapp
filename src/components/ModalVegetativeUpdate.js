import React from "react";
import closeIcon from "../assets/close.svg";
import ReactDom from "react-dom";
import { useEffect } from "react";
import { useState } from "react";
import { collection, doc, onSnapshot, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import db from "../firebase-config";
import { ReactComponent as CloseIcon } from "../assets/close.svg";
import ModalSuccess from "./ModalSuccess";

export default function ModalVegetativeUpdate({ open, closeModal, modalId, modalYear, modalSeason, vsRiceData, }) {

  const [riceData, setRiceData] = useState({
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

  })
  const [isPromptOpen, setIsPromptOpen] = useState(false)


  // When Edit is Clicked Pass VsData is set on riceData to show on Input.
  useEffect(() => {
    setRiceData({
      auricleColor: vsRiceData.auricleColor,
      coleoptileAnthocyaninColouration: vsRiceData.coleoptileAnthocyaninColouration,
      collarColour: vsRiceData.collarColour,
      culmHabit: vsRiceData.culmHabit,
      culmKneeingAbility: vsRiceData.culmKneeingAbility,
      culmLength: vsRiceData.culmLength,
      culmNumber: vsRiceData.culmNumber,
      culmDiameteratBasalInternode: vsRiceData.culmDiameteratBasalInternode,
      culmAnthocyaninColourationonNodes: vsRiceData.culmAnthocyaninColourationonNodes,
      culmUnderlyingNodeColour: vsRiceData.culmUnderlyingNodeColour,
      culmInternodeAnthocyanin: vsRiceData.culmInternodeAnthocyanin,
      culmUnderlyingInternodeColouration: vsRiceData.culmUnderlyingInternodeColouration,
      culmLodgingResistance: vsRiceData.culmLodgingResistance,
      culmStrength: vsRiceData.culmStrength,
      flagLeafLegnth: vsRiceData.flagLeafLegnth,
      flagLeafWidth: vsRiceData.flagLeafWidth,
      flagLeafAttitudeEarlyobs: vsRiceData.flagLeafAttitudeEarlyobs,
      flagLeafAttitudeLateobs: vsRiceData.flagLeafAttitudeLateobs,
      leafMarginPubesence: vsRiceData.leafMarginPubesence,
      leafSenesence: vsRiceData.leafSenesence,
      lbPresenceAbsenceofAnthocyaninColouration: vsRiceData.lbPresenceAbsenceofAnthocyaninColouration,
      lbDistributionofAnthocyaninColouration: vsRiceData.lbDistributionofAnthocyaninColouration,
      lbIntensityofGreenColour: vsRiceData.lbIntensityofGreenColour,
      lbAttitude: vsRiceData.lbAttitude,
      lbPubesence: vsRiceData.lbPubesence,
      lbPubesenceonBladeSurface: vsRiceData.lbPubesenceonBladeSurface,
      lbLength: vsRiceData.lbLength,
      lbWidth: vsRiceData.lbWidth,
      basalLeafSheathColour: vsRiceData.basalLeafSheathColour,
      lsAnthocyaninColouration: vsRiceData.lsAnthocyaninColouration,
      liguleLength: vsRiceData.liguleLength,
      liguleShape: vsRiceData.liguleShape,
      liguleShapeCultivatedSpecies: vsRiceData.liguleShapeCultivatedSpecies,
      liguleShapeWildSpecies: vsRiceData.liguleShapeWildSpecies,
      liguleMarginShapeWildSpecies: vsRiceData.liguleMarginShapeWildSpecies,
      liguleMarginHairiness: vsRiceData.liguleMarginHairiness,
      ligulePubesence: vsRiceData.ligulePubesence,
      liguleColour: vsRiceData.liguleColour,
      rhizomeandStolonFormation: vsRiceData.rhizomeandStolonFormation,
      seedlingHeight: vsRiceData.seedlingHeight,

    })
  }, [vsRiceData])

  console.log('Rice Data');
  console.log(riceData);
  console.log(vsRiceData.auricleColor);

  // Get Inputs
  const handleChange = (e) => {
    setRiceData({
      ...riceData,
      [e.target.name]: e.target.value,
    });
    console.log(riceData);
  }

  // Submit the Edit
  const submitEdit = async (e) => {
    try {
      e.preventDefault()
      console.log('hello');
      console.log(modalYear);
      console.log(modalSeason);
      console.log(modalId);

      const docRef = doc(db, `SPR/Rice_Seasons/Seasons/${modalSeason}_Season/Stages/Vegetative_Stage/VS_Raw_Rice_Data`, modalId)
      const vsPayLoad = {
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
        searchIndex: `${riceData.accessionId} Shelf ${riceData.shelfNum}  ${riceData.auricleColor} ${riceData.coleoptileAnthocyaninColouration} ${riceData.collarColour} ${riceData.culmHabit} ${riceData.culmKneeingAbility} ${riceData.culmLength} ${riceData.culmNumber} ${riceData.culmDiameteratBasalInternode} ${riceData.culmAnthocyaninColourationonNodes} ${riceData.culmUnderlyingNodeColour} ${riceData.culmInternodeAnthocyanin} ${riceData.culmUnderlyingInternodeColouration} ${riceData.culmLodgingResistance} ${riceData.culmStrength} ${riceData.flagLeafLegnth} ${riceData.flagLeafWidth} ${riceData.flagLeafAttitudeEarlyobs} ${riceData.flagLeafAttitudeLateobs} ${riceData.leafMarginPubesence} ${riceData.leafSenesence} ${riceData.lbPresenceAbsenceofAnthocyaninColouration} ${riceData.lbDistributionofAnthocyaninColouration} ${riceData.lbIntensityofGreenColour} ${riceData.lbAttitude}${riceData.lbPubesence} ${riceData.lbPubesenceonBladeSurface} ${riceData.lbLength} ${riceData.lbWidth} ${riceData.basalLeafSheathColour} ${riceData.lsAnthocyaninColouration} ${riceData.liguleLength} ${riceData.liguleShape} ${riceData.liguleShapeCultivatedSpecies} ${riceData.liguleShapeWildSpecies} ${riceData.liguleMarginShapeWildSpecies} ${riceData.liguleMarginHairiness} ${riceData.ligulePubesence} ${riceData.liguleColour} ${riceData.rhizomeandStolonFormation} ${riceData.seedlingHeight}`,
        timestamp: serverTimestamp(),
      };
      await updateDoc(docRef, vsPayLoad);
      setIsPromptOpen(true)
      setTimeout(() => {
        setIsPromptOpen(false)
        closeModal()
      }, 1000)
    } catch (error) {
      console.log(error);
    }



  }

  if (!open) return null;
  return ReactDom.createPortal(
    <>
      <div className="absolute top-0 z-100 text-center">
        <ModalSuccess open={isPromptOpen} close={() => { setIsPromptOpen(false) }} message={'Vegetative Stage Data Updated Successfully!'} />
      </div>
      <form onSubmit={submitEdit} className='z-0'>
        <div className=" fixed left-0 right-0 bottom-0 top-0  bg-black opacity-70 " onClick={closeModal} />
        <div className=" hidden sm:flex flex-col absolute left-20 right-20 bottom-32 top-16  bg-white rounded-md  p-8   md:left-52 md:right-52  lg:left-96 lg:right-96  ">
          <div className="absolute right-4  top-4 z-50 ">
            <CloseIcon className='group-hover:stroke-white stroke-sprGray50 hover:stroke-sprGray80 active:stroke-sprPrimary h-5' onClick={closeModal} />
          </div>
          <div className="flex-auto flex flex-col  overflow-hidden ">
            <h1 className="page-header text-2xl font-bold text-sprGray70 inline-block">Update Vegetative Data</h1>
            <p className="font-medium text-xl text-sprPrimaryDark">{modalId}</p>
            <div className=" flex overflow-auto scrollbar">
              <div className=" flex-auto flex flex-col  ">

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
            </div>
            <div className="flex gap-2 justify-end">
              <button
                className="bg-sprGray30 rounded-full py-2 px-3 text-sm font-medium text-white shadow-slate-300"
                onClick={() => {
                  closeModal()
                  // setRiceData(initialState)
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="bg-sprPrimary rounded-full py-2 px-3 text-sm font-medium text-white shadow-slate-300"

              >
                Update
              </button>
            </div>

          </div>
        </div>
      </form>
    </>,
    document.getElementById("portal")
  );
}

