import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect } from "react";
import ReactDom from "react-dom";

import { ReactComponent as CloseIcon } from "../assets/close.svg"
import { ReactComponent as CalendarIcon } from "../assets/calendar-icon.svg"
import { ReactComponent as WetIcon } from "../assets/wet-icon.svg"
import { ReactComponent as DryIcon } from "../assets/dry-icon.svg"
import { ReactComponent as EmptyIllTwo } from "../assets/empty-illustration-2.svg"
import { useState } from "react";
import db from "../firebase-config";



export default function ModalAccessionsInfo({ open, modalId, closeModal }) {
    const [riceAccessions, setRiceAccessions] = useState([])

    useEffect(() => {
        if (open === false) {
            setYear('2018')
        }
        if(modalId !== undefined){
            const collectionRef = collection(db, "SPR/Rice_Accessions/Accession_IDs");
        const q = query(collectionRef, where('accessionId', '==', modalId));

        const unsub = onSnapshot(q, (snapshot) => {
            setRiceAccessions(
                snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
        });

        return unsub;

        }

    }, [open])
    console.log('I am modal');
    console.log(riceAccessions);

    const [season, setSeason] = useState('Wet_Season')
    const [year, setYear] = useState('2018')

    const [vsData, setVsData] = useState([])
    const [rsData, setRsData] = useState([])
    const [gcData, setGcData] = useState([])
    const [ycData, setYcData] = useState([])

    useEffect(() => {
        try {
            const vsDocRef = collection(db, `/SPR/Rice_Seasons/Seasons/${season}/Stages/Vegetative_Stage/VS_Raw_Rice_Data`)

            const vsQuery = query(vsDocRef, where("tagId", "==", `${modalId}_${season}_${year}`))

            const unsub = onSnapshot(vsQuery, (snapshot) => {
                setVsData(
                    snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
                );
            });

            return unsub;
        } catch (error) {
            console.log(error);
        }


    }, [season, year, open])
    useEffect(() => {
        const rsDocRef = collection(db, `/SPR/Rice_Seasons/Seasons/${season}/Stages/Reproductive_Stage/RS_Raw_Rice_Data`)

        const rsQuery = query(rsDocRef, where("tagId", "==", `${modalId}_${season}_${year}`))

        const unsub = onSnapshot(rsQuery, (snapshot) => {
            setRsData(
                snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
        });

        return unsub;


    }, [season, year, open])
    useEffect(() => {
        const gcDocRef = collection(db, `/SPR/Rice_Seasons/Seasons/${season}/Stages/Grain_Characteristics/GC_Raw_Rice_Data`)

        const gcQuery = query(gcDocRef, where("tagId", "==", `${modalId}_${season}_${year}`))

        const unsub = onSnapshot(gcQuery, (snapshot) => {
            setGcData(
                snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
        });

        return unsub;


    }, [season, year, open])
    useEffect(() => {
        const ycDocRef = collection(db, `/SPR/Rice_Seasons/Seasons/${season}/Stages/Yield_Components/YC_Raw_Rice_Data`)

        const ycQuery = query(ycDocRef, where("tagId", "==", `${modalId}_${season}_${year}`))

        const unsub = onSnapshot(ycQuery, (snapshot) => {
            setYcData(
                snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
        });

        return unsub;


    }, [season, year, open])

    const years = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2030]

   

    if (!open) return null;
    return ReactDom.createPortal(
        <>
            <div className=" fixed left-0 right-0 bottom-0 top-0 z-50 bg-black opacity-70 " onClick={closeModal}/>
            <div className=" flex flex-col absolute left-3 right-3 bottom-16 top-16 sm:left-12 sm:right-12 md:left-28 md:right-28 lg:left-1/4 lg:right-1/4 z-50 bg-white rounded-xl  px-4 pt-8 pb-4   ">
                {/* button */}
                <div className="absolute right-4 top-4 z-50 ">
                
                    <CloseIcon className='group-hover:stroke-white stroke-sprGray50 hover:stroke-sprGray80 active:stroke-sprPrimary h-5' onClick={closeModal} />
                </div>
                {/* main */}
                <div className=" flex-auto flex flex-col gap-2">
                    <div className="w-full h-1/4 flex items-start" >
                        <div className="  bg-slate-100  sm:w-1/3 max-h-28  rounded-md overflow-hidden">
                           
                            {riceAccessions.map((rice)=>(
                                <div>{rice.imageUrl === ''? <div className=" w-full rounded-md"></div>:<img src={rice.imageUrl} alt="" className=" rounded-md w-full "/>}</div>
                            ))}
                        </div>

                        {riceAccessions.map((rice) => (
                            <div className=" flex flex-col flex-auto p-3 pt-0 -space-y-1">
                                <h1 className=" text-xl sm:text-4xl text-sprPrimaryDarkest font-semibold ">CL-R{rice.accessionId}</h1>
                                <h1 className="sm:text-lg text-sprGray60 font-medium">Source: {rice.source === '' ? "---" : rice.source}</h1>
                                <h1 className="sm:text-lg text-sprGray60 font-medium">Variety: {rice.variety === '' ? "---" : rice.variety}</h1>
                                <h1 className="sm:text-lg text-sprGray60 font-medium"> Classification: {rice.classification === ''? "---" : rice.classification}</h1>


                            </div>

                        ))}

                    </div>
                    <div className=" w-full flex-auto flex flex-col ">
                        <div className="  flex gap-3  sm:w-3/4">
                            <div className="flex-auto bg-sprPrimaryOffLight flex p-2 justify-center gap-2 rounded-t-lg">
                                <CalendarIcon stroke="#AFBE00" className="h-6" />
                                <select className=" bg-transparent text-sprPrimary text-md font-medium " name="riceYear" onChange={(e) => { setYear(e.target.value) }}>
                                    {
                                        years.map((e) =>
                                            <option value={e} >{e}</option>

                                        )
                                    }
                                </select>
                            </div>
                            <div className={season === 'Wet_Season' ? "cursor-pointer flex-auto bg-sprPrimary flex  p-2 justify-center items-center rounded-t-lg gap-2" : "cursor-pointer flex-auto bg-slate-200 flex  p-2 justify-center items-center rounded-t-lg gap-2"} onClick={() => {
                                    setSeason('Wet_Season')
                                }}>
                                <WetIcon fill={season === 'Wet_Season' ? "white" : "rgba(18, 20, 20, 0.5)"} className="h-6" />
                                <h1 className={season === 'Wet_Season' ? " text-white text-md font-medium whitespace-nowrap hidden sm:block" : " text-sprGray50 text-md font-medium whitespace-nowrap hidden sm:block"} >Wet Season</h1>
                            </div>
                            <div className={season === 'Dry_Season' ? "cursor-pointer flex-auto bg-sprPrimary flex  p-2 justify-center items-center rounded-t-lg gap-2" : "cursor-pointer flex-auto bg-slate-200 flex  p-2 justify-center items-center rounded-t-lg gap-2"}  onClick={() => {
                                    setSeason('Dry_Season')
                                }}>
                                <DryIcon stroke={season === 'Dry_Season' ? "white" : "rgba(18, 20, 20, 0.5)"} className="h-6" />
                                <h1 className={season === 'Dry_Season' ? " text-white text-md font-medium whitespace-nowrap hidden sm:block" : " text-sprGray50 text-md font-medium whitespace-nowrap hidden sm:block"}>Dry Season</h1>

                            </div>

                        </div>
                        <div className="bg-sprPrimaryOffLight flex-auto overflow-auto scrollbar rounded-b-md rounded-r-md ">
                            {vsData.length === 0 && rsData.length === 0 && gcData.length === 0 && ycData.length === 0 ? 
                            <div className="h-full flex flex-col justify-center items-center gap-3">
                                <EmptyIllTwo className="stroke-white"/>
                                <h1 className="text-xl font-medium text-white">Plenty more room here</h1>
                            </div> :
                            <div className="  max-h-0  p-4">
                              {vsData.map((vsData) => (
                                  <div className="bg-white p-2 rounded-md text-sm">
                                      {/* vegetative stage */}
                                      <h1 className="text-sm uppercase font-medium text-sprPrimary">Vegetative Stage</h1>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">coleoptile Anthocyanin Colouration :</p>
                                              {vsData.coleoptileAnthocyaninColouration === "" ? "---" : vsData.coleoptileAnthocyaninColouration}</div> 
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Seedling Height : </p>
                                              {vsData.seedlingHeight === "" ? "---" : vsData.seedlingHeight}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Basal Leaf Sheath Colour : </p>
                                              {vsData.basalLeafSheathColour === "" ? "---" : vsData.basalLeafSheathColour}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Leaf Sheath Anthocyanin Colouration :</p>
                                              {vsData.lsAnthocyaninColouration === "" ? "---" : vsData.lsAnthocyaninColouration}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Leaf Blade Presence/Absence of Anthocyanin Colouration : </p>
                                              {vsData.lbPresenceAbsenceofAnthocyaninColouration === "" ? "---" : vsData.lbPresenceAbsenceofAnthocyaninColouration}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Leaf Blade Distribution of Anthocyanin Colouration :</p>
                                              {vsData.lbDistributionofAnthocyaninColouration === "" ? "---" : vsData.lbDistributionofAnthocyaninColouration}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Leaf Blade Intensity of Green Colour :</p>
                                              {vsData.lbIntensityofGreenColour === "" ? "---" : vsData.lbIntensityofGreenColour}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto "><p className="text-sprGray60">Leaf Blade Attitude :</p>
                                              {vsData.lbAttitude === "" ? "---" : vsData.lbAttitude}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Leaf Blade Pubesence :</p>
                                              {vsData.lbPubesence === "" ? "---" : vsData.lbPubesence}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Leaf Blade Pubesence on Blade Surface :</p>
                                              {vsData.lbPubesenceonBladeSurface === "" ? "---" : vsData.lbPubesenceonBladeSurface}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Leaf Margin Pubesence :</p>
                                              {vsData.leafMarginPubesence === "" ? "---" : vsData.leafMarginPubesence}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Auricle Color :</p>
                                              {vsData.auricleColor === "" ? "---" : vsData.auricleColor}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Collar Colour :</p>
                                              {vsData.collarColour === "" ? "---" : vsData.collarColour}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Ligule Length :</p>
                                              {vsData.liguleLength === "" ? "---" : vsData.liguleLength}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Ligule Shape :</p>
                                              {vsData.liguleShape === "" ? "---" : vsData.liguleShape} </div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Ligule Shape Cultivated Species :</p>
                                              {vsData.liguleShapeCultivatedSpecies === "" ? "---" : vsData.liguleShapeCultivatedSpecies}</div>
                                      </div>
                                      <div className="text-sprBalck">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Ligule Shape Wild Species :</p>
                                              {vsData.liguleShapeWildSpecies === "" ? "---" : vsData.liguleShapeWildSpecies}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Ligule Margin Shape Wild Species :</p>
                                              {vsData.liguleMarginShapeWildSpecies === "" ? "---" : vsData.liguleMarginShapeWildSpecies}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Ligule Margin Hairiness :</p>
                                              {vsData.liguleMarginHairiness === "" ? "---" : vsData.liguleMarginHairiness}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Ligule Pubesence :</p>
                                              {vsData.ligulePubesence === "" ? "---" : vsData.ligulePubesence}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Ligule Colour :</p>
                                              {vsData.liguleColour === "" ? "---" : vsData.liguleColour}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Leaf Blade Length(cm) :</p>
                                              {vsData.lbLength === "" ? "---" : vsData.lbLength}</div>
                                      </div>
                                      <div className="text-spr-Black">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Leaf Blade Width(cm):</p>
                                              {vsData.lbWidth === "" ? "---" : vsData.lbWidth}</div>
                                      </div>
                                      <div className="text-sprBalck">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Flag Lea fLegnth :</p>
                                              {vsData.flagLeafLegnth === "" ? "---" : vsData.flagLeafLegnth}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Flag Leaf Width :</p>
                                              {vsData.flagLeafWidth === "" ? "---" : vsData.flagLeafWidth}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Flag Leaf Attitude Early Obs :</p>
                                              {vsData.flagLeafAttitudeEarlyobs === "" ? "---" : vsData.flagLeafAttitudeEarlyobs}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Culm Habit :</p>
                                              {vsData.culmHabit === "" ? "---" : vsData.culmHabit}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Culm Kneeing Ability : </p>
                                              {vsData.culmKneeingAbility === "" ? "---" : vsData.culmKneeingAbility}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Culm Length : </p>
                                              {vsData.culmLength === "" ? "---" : vsData.culmLength}</div>
                                      </div>

                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Culm Number :</p>
                                              {vsData.culmNumber === "" ? "---" : vsData.culmNumber}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Culm Diameter at Basal Internode :</p>
                                              {vsData.culmDiameteratBasalInternode === "" ? "---" : vsData.culmDiameteratBasalInternode}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Culm Anthocyanin Colouration on Nodes :</p>
                                              {vsData.culmAnthocyaninColourationonNodes === "" ? "---" : vsData.culmAnthocyaninColourationonNodes}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Culm Underlying Node Colour :</p>
                                              {vsData.culmUnderlyingNodeColour === "" ? "---" : vsData.culmUnderlyingNodeColour}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Culm Internode Anthocyanin :</p>
                                              {vsData.culmInternodeAnthocyanin === "" ? "---" : vsData.culmInternodeAnthocyanin}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Culm Underlying Internode Colouration :</p>
                                              {vsData.culmUnderlyingInternodeColouration === "" ? "---" : vsData.culmUnderlyingInternodeColouration}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Culm Lodging Resistance :</p>
                                              {vsData.culmLodgingResistance === "" ? "---" : vsData.culmLodgingResistance}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Culm Strength :</p>
                                              {vsData.culmStrength === "" ? "---" : vsData.culmStrength}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                         
                                          <div className="flex flex-auto">
                                              <p className="text-sprGray60">Flag Leaf Attitude Late Obs :</p>
                                              {vsData.flagLeafAttitudeLateobs === "" ? "---" : vsData.flagLeafAttitudeLateobs}
                                          </div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Leaf Senesence :</p>
                                              {vsData.leafSenesence === "" ? "---" : vsData.leafSenesence}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Rhizome and Stolon Formation :</p>
                                              {vsData.rhizomeandStolonFormation === "" ? "---" : vsData.rhizomeandStolonFormation}</div>
                                      </div>
                                  </div>
                              )

                              )}
                              {rsData.map((rsData) => (
                                  <div className="bg-white p-2 mt-4 rounded-md text-sm">
                                      <h1 className="text-sm uppercase font-medium text-sprPrimary">Reproductive Stage</h1>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Male Sterility :</p>
                                              {rsData.maleSterility === "" ? "---" : rsData.maleSterility}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Stigma Colour :</p>
                                              {rsData.stigmaColour === "" ? "---" : rsData.stigmaColour}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Anther Length : </p>
                                              {rsData.antherLength === "" ? "---" : rsData.antherLength}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Anther Colour :</p>
                                              {rsData.antherColour === "" ? "---" : rsData.antherColour}</div>
                                      </div>
                                      {/* <div className="text-sprBlack">
                                          
                                          <div className="fle flex-auto"><p className="text-sprGray60">Lemma and Palea Colour Early Obs :</p>
                                              {rsData.lemmaandPaleaColourEarlyobs === "" ? "---" : rsData.lemmaandPaleaColourEarlyobs}</div>
                                      </div> */}
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Lemma And Palea Colour Early Obs :</p>
                                              {rsData.lemmaandPaleaColourEarlyobs === "" ? "---" : rsData.lemmaandPaleaColourEarlyobs}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Lemma Colour of Apicus Early Obs :</p>
                                              {rsData.lemmaColourofApicusearlyobs === "" ? "---" : rsData.lemmaColourofApicusearlyobs}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Lemma Anthocyanin Colouration of Area Below Apiculus Early Obs :</p>
                                              {rsData.lemmaAnthocyaninColourationofAreaBelowApiculusEarlyobs === "" ? "---" : rsData.lemmaAnthocyaninColourationofAreaBelowApiculusEarlyobs}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Awns Presence Wild Species : </p>
                                              {rsData.awnsPresenceWildSpecies === "" ? "---" : rsData.awnsPresenceWildSpecies}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                         
                                          <div className="flex flex-auto"><p className="text-sprGray60">Awns Distribution Cultivated Species : </p>
                                              {rsData.awnsDistributionCultivatedSpecies === "" ? "---" : rsData.awnsDistributionCultivatedSpecies}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Awns Colour Early Obs :</p>
                                              {rsData.awnsDistributionEarlyobs === "" ? "---" : rsData.awnsDistributionEarlyobs}</div>
                                              {/* this is awns colour early observation */}
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Awn Length : </p>
                                              {rsData.awnLength === "" ? "---" : rsData.awnLength}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Awns Thickness :</p>
                                              {rsData.awnsThickness === "" ? "---" : rsData.awnsThickness}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Panicle Arrangement of Primary Branches :</p>
                                              {rsData.panicleArrangementofPrimaryBranches === "" ? "---" : rsData.panicleArrangementofPrimaryBranches}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Panicle Number of Basal Primary Branches : </p>
                                              {rsData.panicleNumberofBasalPrimaryBranches === "" ? "---" : rsData.panicleNumberofBasalPrimaryBranches}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Panicle Distance from Base to Lowest Spikelet Insertion :</p>
                                              {rsData.panicleDistancefromBasetoLowestSpikeletInsertion === "" ? "---" : rsData.panicleDistancefromBasetoLowestSpikeletInsertion}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Panicle Texture of Main Axis :</p>
                                              {rsData.panicleTextureofMainAxis === "" ? "---" : rsData.panicleTextureofMainAxis}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Panicle Number Per Plant :</p>
                                              {rsData.panicleNumberPerPlant === "" ? "---" : rsData.panicleNumberPerPlant}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Panicle Length : </p>
                                              {rsData.panicleLength === "" ? "---" : rsData.panicleLength}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Panicle Attitude of Main Axis :</p>
                                              {rsData.panicleAttitudeofMainAxis === "" ? "---" : rsData.panicleAttitudeofMainAxis}</div></div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Panicle Attitude of Branches :</p>
                                              {rsData.panicleAttitudeofBranches === "" ? "---" : rsData.panicleAttitudeofBranches}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Panicle Secondary Branching :</p>
                                              {rsData.panicleSecondaryBranching === "" ? "---" : rsData.panicleSecondaryBranching}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Panicle Exsertion :</p>
                                              {rsData.panicleExsertion === "" ? "---" : rsData.panicleExsertion}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                         
                                          <div className="flex flex-auto"><p className="text-sprGray60">Panicle Shattering : </p>
                                              {rsData.panicleShattering === "" ? "---" : rsData.panicleShattering}</div>
                                      </div>
                                  </div>
                              ))}
                              {gcData.map((gcData) => (
                                  <div className="bg-white p-2 rounded-md mt-4 text-sm">
                                      {/* grain Characteristics */}

                                      <h1 className="text-sm uppercase font-medium text-sprPrimary">Grain Characteristics</h1>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Panicle Length Late Obs :</p>
                                              {gcData.panicleLengthLateobs === "" ? "---" : gcData.panicleLengthLateobs}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Panicle Threshability :</p>
                                              {gcData.panicleThreshability === "" ? "---" : gcData.panicleThreshability}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Awn Colour Late Obs :</p>
                                              {gcData.awnColour === "" ? "---" : gcData.awnColour}</div>
                                              {/* awn color late obseration not just awn color */}
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Lemma and Palea Pubesence :</p>
                                              {gcData.lemmaandPaleaPubesence === "" ? "---" : gcData.lemmaandPaleaPubesence}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Lemma and Palea Colour Late Obs :</p>
                                              {gcData.lemmaandPaleaColourLateobs === "" ? "---" : gcData.lemmaandPaleaColourLateobs}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Lemma Anthocyanin Colouration of Keel :</p>
                                              {gcData.lemmaAnthocyaninColourationofKeel === "" ? "---" : gcData.lemmaAnthocyaninColourationofKeel}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Lemma Anthocyanin Colouration of Area Below Apiculus Late Obs :</p>
                                              {gcData.lemmaAnthocyaninColourationofAreaBelowApiculusLateobs === "" ? "---" : gcData.lemmaAnthocyaninColourationofAreaBelowApiculusLateobs}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Lemma Colour of Apiculus Late Obs :</p>
                                              {gcData.lemmaColourofApiculusLateobs === "" ? "---" : gcData.lemmaAnthocyaninColourationofAreaBelowApiculusLateobs}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Lemma Shape of Apiculus :</p>
                                              {gcData.lemmaShapeofApiculus === "" ? "---" : gcData.lemmaShapeofApiculus}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Sterile Lemma Length :</p>
                                              {gcData.sterileLemmaLength === "" ? "---" : gcData.sterileLemmaLength}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Longer Sterile Lemma Length :</p>
                                              {gcData.longerSterileLemmaLength === "" ? "---" : gcData.longerSterileLemmaLength}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Sterile LemmaShape :</p>
                                              {gcData.sterileLemmaShape === "" ? "---" : gcData.sterileLemmaShape}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Sterile Lemma Colour :</p>
                                              {gcData.sterileLemmaColour === "" ? "---" : gcData.sterileLemmaColour}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Spikelet Fertility :</p>
                                              {gcData.spikeletFertility === "" ? "---" : gcData.spikeletFertility}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Grain Length :</p>
                                              {gcData.grainLength === "" ? "---" : gcData.grainLength} </div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Grain Width :</p>
                                              {gcData.grainWidth === "" ? "---" : gcData.grainWidth}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                         
                                          <div className="flex flex-auto"><p className="text-sprGray60">grain Thickness :</p>
                                              {gcData.grainThickness === "" ? "---" : gcData.grainThickness}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                         
                                          <div className="flex flex-auto"><p className="text-sprGray60">Grain 100 Grain Weight :</p>
                                              {gcData.grain100GrainWeight === "" ? "---" : gcData.grain100GrainWeight}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                    
                                          <div className="flex flex-auto"><p className="text-sprGray60">Grain 10 Grain Weight :</p>
                                              {gcData.grain10GrainWeight === "" ? "---" : gcData.grain10GrainWeight}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                         
                                          <div className="flex flex-auto"><p className="text-sprGray60">Caryopsis Length :</p>
                                              {gcData.caryopsisLength === "" ? "---" : gcData.caryopsisLength}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                  
                                          <div className="flex flex-auto"><p className="text-sprGray60">Caryopsis Width :</p>
                                              {gcData.caryopsisWidth === "" ? "---" : gcData.caryopsisWidth}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Caryopsis Shape :</p>
                                              {gcData.caryopsisShape === "" ? "---" : gcData.caryopsisShape}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                       
                                          <div className="flex flex-auto"><p className="text-sprGray60">Caryopsis Pericarp Colour :</p>
                                              {gcData.caryopsisPericarpColour === "" ? "---" : gcData.caryopsisPericarpColour}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                        
                                          <div className="flex flex-auto"><p className="text-sprGray60">Endorsperm Type :</p>
                                              {gcData.endorspermType === "" ? "---" : gcData.endorspermType}</div>
                                      </div>
                                  </div>
                              ))}
                              {ycData.map((ycData) => (
                                  <div className="bg-white p-2 rounded-md mt-4 text-sm">
                                      {/* yield components */}
                                      <h1 className="text-sm uppercase font-medium text-sprPrimary">Yield Components</h1>
                                      <div className="text-sprBlack">
                                          <p className="text-sprGray60">Cavans :</p>
                                          {ycData.cavans === "" ? "---" : ycData.cavans}</div>
                                      <div className="text-sprBlack">
                                          <p className="text-sprGray60">Kilogram :</p>
                                          {ycData.kilogram === "" ? "---" : ycData.kilogram}</div>
                                      <div className="text-sprBlack">
                                          <p className="text-sprGray60">Grain Yield :</p>
                                          {ycData.grainYield === "" ? "---" : ycData.grainYield}</div>
                                      <div className="text-sprBlack">
                                          <p className="text-sprGray60">Ton/Ha :</p>
                                          {ycData.tonHa === "" ? "---" : ycData.tonHa}</div>
                                      <div className="text-sprBlack">
                                          <p className="text-sprGray60">Cooked Rice Aroma :</p>
                                          {ycData.cookedRiceAroma === "" ? "---" : ycData.cookedRiceAroma}</div>
                                      <div className="text-sprBlack">
                                          <p className="text-sprGray60">Grain Aroma :</p>
                                          {ycData.grainAroma === "" ? "---" : ycData.grainAroma}</div>
                                      <div className="text-sprBlack">
                                          <p className="text-sprGray60">Leaf Aroma :</p>
                                          {ycData.leafAroma === "" ? "---" : ycData.leafAroma}</div>
                                  </div>
                              ))}
                            </div>
                            }
                          
                        </div>

                    </div>

                </div>
            </div>
        </>,
        document.getElementById('portal')
    )
}
