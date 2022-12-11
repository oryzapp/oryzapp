import React from 'react'
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import db from "../firebase-config";
import { useEffect } from 'react';
import { useState } from 'react';
import closeIcon from "../assets/close.svg";
import { ReactComponent as CloseIcon } from '../assets/close.svg';


export default function ModalGrainUpdate({open, closeModal, modalId,modalYear, modalSeason, gcRiceData}) {
    console.log(modalSeason);
    // Container for the data from GC
    const [riceData, setRiceData] = useState({
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
    }) 
	
    // Pass gcRiceData to riceData
    useEffect(()=>{
        setRiceData(
            {
                awnColour: gcRiceData.awnColour,
                caryopsisLength: gcRiceData.caryopsisLength,
                caryopsisWidth: gcRiceData.caryopsisWidth,
                caryopsisShape: gcRiceData.caryopsisShape,
                caryopsisPericarpColour: gcRiceData.caryopsisPericarpColour,
                endorspermType: gcRiceData.endorspermType,
                grainLength: gcRiceData.grainLength,
                grainWidth: gcRiceData.grainWidth,
                grainThickness: gcRiceData.grainThickness,
                grain100GrainWeight: gcRiceData.grain100GrainWeight,
                grain10GrainWeight: gcRiceData.grain10GrainWeight,
                lemmaAnthocyaninColourationofKeel: gcRiceData.lemmaAnthocyaninColourationofKeel,
                lemmaAnthocyaninColourationofAreaBelowApiculusLateobs: gcRiceData.lemmaAnthocyaninColourationofAreaBelowApiculusLateobs,
                lemmaColourofApiculusLateobs: gcRiceData.lemmaColourofApiculusLateobs,
                lemmaShapeofApiculus: gcRiceData.lemmaShapeofApiculus,
                lemmaandPaleaPubesence: gcRiceData.lemmaandPaleaPubesence,
                lemmaandPaleaColourLateobs: gcRiceData.lemmaandPaleaColourLateobs,
                panicleLengthLateobs: gcRiceData.panicleLengthLateobs,
                panicleThreshability: gcRiceData.panicleThreshability,
                spikeletFertility: gcRiceData.spikeletFertility,
                sterileLemmaLength: gcRiceData.sterileLemmaLength,
                longerSterileLemmaLength: gcRiceData.longerSterileLemmaLength,
                sterileLemmaShape: gcRiceData.sterileLemmaShape,
                sterileLemmaColour: gcRiceData.sterileLemmaColour,
            }
        )
    },[gcRiceData])

   // Get Inputs
	const handleChange = (e) =>{
        setRiceData({
          ...riceData,
          [e.target.name]: e.target.value,
        });
      }

    
    // Submit the Edit
    const submitEdit =async (e) => {
        try {
          e.preventDefault()
          
        
          const docRef = doc(db, `SPR/Rice_Seasons/Seasons/${modalSeason}_Season/Stages/Grain_Characteristics/GC_Raw_Rice_Data`, modalId)
          const gcPayLoad = {
            awnColour:riceData.awnColour,
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
            searchIndex:`${riceData.accessionId} Shelf ${riceData.shelfNum} ${riceData.awnColour} ${ riceData.caryopsisLength} ${ riceData.caryopsisWidth} ${riceData.caryopsisShape} ${riceData.caryopsisPericarpColour} ${riceData.endorspermType} ${riceData.grainLength} ${riceData.grainWidth} ${riceData.grainThickness} ${riceData.grain100GrainWeight} ${ riceData.lemmaAnthocyaninColourationofKeel} ${ riceData.lemmaAnthocyaninColourationofAreaBelowApiculusLateobs} ${riceData.lemmaColourofApiculusLateobs} ${riceData.lemmaShapeofApiculus} ${riceData.lemmaandPaleaPubesence} ${riceData.lemmaandPaleaColourLateobs} ${riceData.panicleLengthLateobs} ${riceData.panicleThreshability} ${riceData.spikeletFertility} ${riceData.sterileLemmaLength} ${riceData.longerSterileLemmaLength} ${riceData.sterileLemmaShape} ${riceData.sterileLemmaShape} ${riceData.sterileLemmaColour} `,
            timestamp: serverTimestamp(),
          };
          await updateDoc(docRef, gcPayLoad);
          closeModal()
          alert('Updated')
        } catch (error) {
          console.log(error);
        }
        }


      


    if (!open) return null;

  return (
   <div>
    <form onSubmit={submitEdit}>
		<div className=" fixed left-0 right-0 bottom-0 top-0 z-50 bg-black opacity-70 " />
			<div className=" hidden sm:flex flex-col absolute left-20 right-20 bottom-32 top-16 z-50 bg-white rounded-md  p-8   md:left-52 md:right-52  lg:left-96 lg:right-96  ">
                <div className="absolute right-4 top-4 z-50 ">
                    {/* <button onClick={()=>{closeModal()}} >
                    <img className="relative" src={closeIcon} alt="" />
                    </button> */}
                    <CloseIcon className='group-hover:stroke-white stroke-sprGray50 hover:stroke-sprGray80 active:stroke-sprPrimary h-5' onClick={closeModal}/>
                </div>
                <div className="flex-auto flex flex-col  overflow-hidden">
                    <h1 className="page-header text-2xl font-bold text-sprGray70 inline-block">Update Grain Data</h1> 
                    <p className="font-medium text-xl text-sprPrimaryDark">{modalId}</p>
                    <div className="  flex overflow-auto flex-auto scrollbar">
                        <div className='flex-auto flex flex-col text-sprBlack '>
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
                    </div>
                    <div className="flex gap-2 justify-end">
                        <button
                                className="bg-sprGray30 rounded-full py-2 px-3 text-sm font-medium text-white shadow-slate-300"
                                onClick={() => {
                                    closeModal()
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
   </div>
  )
}
