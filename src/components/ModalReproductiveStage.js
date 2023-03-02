import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import closeIcon from "../assets/close.svg";
import { ReactComponent as CloseIcon } from '../assets/close.svg';
import db from "../firebase-config";
import ModalSuccess from './ModalSuccess';



export default function ModalReproductiveStage( {open, closeModal, modalId, modalYear, modalSeason, rsRiceData}) {
	console.log(modalSeason);
		// Container for the data from RS 
		const[riceData, setRiceData] = useState({
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
		})

const [isPromptOpen, setIsPromptOpen] = useState(false)

		// Pass rsRiceData to riceData
		useEffect(()=>{
			setRiceData(
				{
					antherLength: rsRiceData.antherLength,
					antherColour: rsRiceData.antherColour,
					awnsPresenceWildSpecies: rsRiceData.awnsPresenceWildSpecies,
					awnsDistributionCultivatedSpecies: rsRiceData.awnsDistributionCultivatedSpecies,
					awnsDistributionEarlyobs: rsRiceData.awnsDistributionEarlyobs,
					awnLength: rsRiceData.awnLength,
					awnsThickness: rsRiceData.awnsThickness,
					lemmaColourofApicusearlyobs: rsRiceData.lemmaColourofApicusearlyobs,
					lemmaAnthocyaninColourationofAreaBelowApiculusEarlyobs: riceData.lemmaAnthocyaninColourationofAreaBelowApiculusEarlyobs,
					lemmaandPaleaColourEarlyobs: rsRiceData.lemmaandPaleaColourEarlyobs,
					maleSterility: rsRiceData.maleSterility,
					panicleArrangementofPrimaryBranches: rsRiceData.panicleArrangementofPrimaryBranches,
					panicleNumberofBasalPrimaryBranches: rsRiceData.panicleNumberofBasalPrimaryBranches,
					panicleDistancefromBasetoLowestSpikeletInsertion: rsRiceData.panicleDistancefromBasetoLowestSpikeletInsertion,
					panicleTextureofMainAxis: rsRiceData.panicleTextureofMainAxis ,
					panicleNumberPerPlant: rsRiceData.panicleNumberPerPlant,
					panicleLength: rsRiceData.panicleLength,
					panicleAttitudeofMainAxis: rsRiceData.panicleAttitudeofMainAxis,
					panicleAttitudeofBranches: rsRiceData.panicleAttitudeofBranches,
					panicleSecondaryBranching: rsRiceData.panicleSecondaryBranching,
					panicleExsertion: rsRiceData.panicleExsertion,
					panicleShattering: rsRiceData.panicleShattering,
					stigmaColour: rsRiceData.stigmaColour,
				}
			)
		}, [rsRiceData])

		console.log('--------------');
		console.log(riceData);

		// Get Inputs
	const handleChange = (e) =>{
  setRiceData({
    ...riceData,
    [e.target.name]: e.target.value,
  });
  console.log(riceData);
}

// Submit the Edit
const submitEdit =async (e) => {
try {
  e.preventDefault()
  

  const docRef = doc(db, `SPR/Rice_Seasons/Seasons/${modalSeason}_Season/Stages/Reproductive_Stage/RS_Raw_Rice_Data`, modalId)
  const rsPayLoad = {
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
					panicleArrangementofPrimaryBranches: riceData.panicleArrangementofPrimaryBranches,
					panicleNumberofBasalPrimaryBranches: riceData.panicleNumberofBasalPrimaryBranches,
					panicleDistancefromBasetoLowestSpikeletInsertion: riceData.panicleDistancefromBasetoLowestSpikeletInsertion,
					panicleTextureofMainAxis: riceData.panicleTextureofMainAxis ,
					panicleNumberPerPlant: riceData.panicleNumberPerPlant,
					panicleLength: riceData.panicleLength,
					panicleAttitudeofMainAxis: riceData.panicleAttitudeofMainAxis,
					panicleAttitudeofBranches: riceData.panicleAttitudeofBranches,
					panicleSecondaryBranching: riceData.panicleSecondaryBranching,
					panicleExsertion: riceData.panicleExsertion,
					panicleShattering: riceData.panicleShattering,
					stigmaColour: riceData.stigmaColour,
        searchIndex:`${riceData.accessionId} Shelf ${riceData.shelfNum} ${riceData.antherLength} ${riceData.antherColour} ${riceData.awnsPresenceWildSpecies} ${riceData.awnsDistributionCultivatedSpecies} ${riceData.awnsDistributionEarlyobs} ${riceData.awnLength} ${riceData.awnsThickness} ${ riceData.lemmaColourofApicusearlyobs} ${ riceData.lemmaAnthocyaninColourationofAreaBelowApiculusEarlyobs} ${riceData.lemmaandPaleaColourEarlyobs} ${riceData.maleSterility} ${ riceData.stigmaColour} ${riceData.panicleArrangementofPrimaryBranches} ${riceData.panicleNumberofBasalPrimaryBranches} ${riceData.panicleDistancefromBasetoLowestSpikeletInsertion} ${riceData.panicleTextureofMainAxis} ${riceData.panicleNumberPerPlant} ${riceData.panicleLength} ${riceData.panicleAttitudeofMainAxis} ${riceData.panicleAttitudeofBranches} ${riceData.panicleSecondaryBranching} ${riceData.panicleExsertion} ${riceData.panicleShattering}`,
					timestamp: serverTimestamp(),
  };
  await updateDoc(docRef, rsPayLoad);
  setIsPromptOpen(true)
  setTimeout(()=>{
      setIsPromptOpen(false)
      closeModal()
  }, 1000)
} catch (error) {
  console.log(error);
}
}


    if (!open) return null;
  return (
    <>
     <div className='z-50'>
     <div className="absolute top-0  right-0 bottom-0 left-0 text-center " >
      <ModalSuccess open={isPromptOpen} close={()=>{setIsPromptOpen(false)}} message={'Reproductive Data Updated Successfully!'}/>
      </div>
      <form onSubmit={submitEdit}>
				<div className=" fixed left-0 right-0 bottom-0 top-0  bg-black opacity-70 " onClick={closeModal}/>
				<div className=" hidden sm:flex flex-col absolute left-20 right-20 bottom-32 top-16 z-40 bg-white rounded-md  p-8   md:left-52 md:right-52  lg:left-96 lg:right-96  ">
					<div className="absolute right-4 top-4 z-50 ">
											{/* <button onClick={()=>{
												closeModal()
												// setRiceData(initialState)
											}} >
													<img className="relative" src={closeIcon} alt="" />
											</button> */}
                <CloseIcon className='group-hover:stroke-white stroke-sprGray50 hover:stroke-sprGray80 active:stroke-sprPrimary h-5' onClick={closeModal}/>
					</div>
					<div className="flex-auto flex flex-col  overflow-hidden ">
						<h1 className="page-header text-2xl font-bold text-sprGray70 inline-block">Update Reproductive Data</h1> 
						<p className="font-medium text-xl text-sprPrimaryDark">{modalId}</p>
						<div className="  flex overflow-auto flex-auto scrollbar">
							<div className=" flex-auto flex flex-col text-sprBlack  ">
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
     </div>
		
    </>
  )
}
