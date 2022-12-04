import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect } from "react";
import ReactDom from "react-dom";

import { ReactComponent as CloseIcon } from "../assets/close.svg"
import { ReactComponent as CalendarIcon } from "../assets/calendar-icon.svg"
import { ReactComponent as WetIcon } from "../assets/wet-icon.svg"
import { ReactComponent as DryIcon } from "../assets/dry-icon.svg"
import { useState } from "react";
import db from "../firebase-config";



export default function ModalAccessionsInfo({ open, modalId, closeModal }) {
    console.log('I am Modal');
    console.log(modalId);

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

    if(vsData.length === 0 && rsData.length === 0 && gcData.length === 0 && ycData.length === 0){
        console.log('Empty');
    }
    else{
        console.log('not empty');
    }

    if (!open) return null;
    return ReactDom.createPortal(
        <>
            <div className=" fixed left-0 right-0 bottom-0 top-0 z-50 bg-black opacity-70 " />
            <div className=" flex flex-col absolute left-3 right-3 bottom-16 top-16 sm:left-12 sm:right-12 md:left-28 md:right-28 lg:left-1/4 lg:right-1/4 z-50 bg-white rounded-xl  px-4 pt-8 pb-4   ">
                {/* button */}
                <div className="absolute right-4 top-4 z-50 ">
                
                    <CloseIcon className='group-hover:stroke-white stroke-sprGray50 hover:stroke-sprGray80 active:stroke-sprPrimary h-5' onClick={closeModal} />
                </div>
                {/* main */}
                <div className=" flex-auto flex flex-col gap-2">
                    <div className=" w-full h-1/4 flex ">
                        <div className="  bg-yellow-300 w-1/4  rounded-md">
                            <div className=" h-full rounded-md"></div>
                        </div>

                        {riceAccessions.map((rice) => (
                            <div className=" flex flex-col flex-auto p-3 pt-0">
                                <h1 className="text-4xl text-sprPrimaryDarkest font-semibold ">{rice.accessionId}</h1>
                                <h1 className="text-lg text-sprGray60 font-medium">Source: {rice.source === '' ? "---" : rice.source}</h1>
                                <h1 className="text-lg text-sprGray60 font-medium">Variety: {rice.variety === '' ? "---" : rice.variety}</h1>
                                <h1 className="text-lg text-sprGray60 font-medium"> Classification: {rice.classification === ''? "---" : rice.classification}</h1>


                            </div>

                        ))}

                    </div>
                    <div className=" w-full flex-auto flex flex-col ">
                        <div className="  flex gap-3  w-3/4">
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
                            <div className={season === 'Wet_Season' ? "cursor-pointer flex-auto bg-sprPrimary flex  p-2 justify-center items-center rounded-t-lg gap-2" : "cursor-pointer flex-auto bg-slate-200 flex  p-2 justify-center items-center rounded-t-lg gap-2"}>
                                <WetIcon fill={season === 'Wet_Season' ? "white" : "rgba(18, 20, 20, 0.5)"} className="h-6" />
                                <h1 className={season === 'Wet_Season' ? " text-white text-md font-medium" : " text-sprGray50 text-md font-medium"} onClick={() => {
                                    setSeason('Wet_Season')
                                }}>Wet Season</h1>

                            </div>
                            <div className={season === 'Dry_Season' ? "cursor-pointer flex-auto bg-sprPrimary flex  p-2 justify-center items-center rounded-t-lg gap-2" : "cursor-pointer flex-auto bg-slate-200 flex  p-2 justify-center items-center rounded-t-lg gap-2"}>
                                <DryIcon stroke={season === 'Dry_Season' ? "white" : "rgba(18, 20, 20, 0.5)"} className="h-6" />
                                <h1 className={season === 'Dry_Season' ? " text-white text-md font-medium" : " text-sprGray50 text-md font-medium"} onClick={() => {
                                    setSeason('Dry_Season')
                                }}>Dry Season</h1>

                            </div>

                        </div>
                        <div className="bg-sprPrimaryOffLight flex-auto overflow-auto scrollbar rounded-b-md rounded-r-md">
                            {vsData.length === 0 && rsData.length === 0 && gcData.length === 0 && ycData.length === 0 ? <div>Empty Image</div> :
                              <div className="  max-h-0  p-4">

                              {vsData.map((vsData) => (
                                  <div>
                                      {/* vegetative stage */}
                                      <h1 className="text-sm uppercase font-medium text-sprPrimary">Vegetative Stage</h1>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">coleoptile Anthocyanin Colouration :</p>
                                              {vsData.coleoptileAnthocyaninColouration}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Seedling Height : </p>
                                              {vsData.seedlingHeight}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Basal Leaf Sheath Colour : </p>
                                              {vsData.basalLeafSheathColour}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Leaf Sheath Anthocyanin Colouration :</p>
                                              {vsData.lsAnthocyaninColouration}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Leaf Blade Presence/Absence of Anthocyanin Colouration : </p>
                                              {vsData.lbPresenceAbsenceofAnthocyaninColouration}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Leaf Blade Distribution of Anthocyanin Colouration :</p>
                                              {vsData.lbDistributionofAnthocyaninColouration}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Leaf Blade Intensity of Green Colour :</p>
                                              {vsData.lbIntensityofGreenColour}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Leaf Blade Attitude :</p>
                                              {vsData.lbAttitude}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Leaf Blade Pubesence :</p>
                                              {vsData.lbPubesence}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Leaf Blade Pubesence on Blade Surface :</p>
                                              {vsData.lbPubesenceonBladeSurface}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Leaf Margin Pubesence :</p>
                                              {vsData.leafMarginPubesence}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Auricle Color :</p>
                                              {vsData.auricleColor}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Collar Colour :</p>
                                              {vsData.collarColour}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Ligule Length :</p>
                                              {vsData.liguleLength}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Ligule Shape :</p>
                                              {vsData.liguleShape}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Ligule Shape Cultivated Species :</p>
                                              {vsData.liguleShapeCultivatedSpecies}</div>
                                      </div>
                                      <div className="text-sprBalck">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Ligule Shape Wild Species :</p>
                                              {vsData.liguleShapeWildSpecies}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Ligule Margin Shape Wild Species :</p>
                                              {vsData.liguleMarginShapeWildSpecies}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Ligule Margin Hairiness :</p>
                                              {vsData.liguleMarginHairiness}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Ligule Pubesence :</p>
                                              {vsData.ligulePubesence}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Ligule Colour :</p>
                                              {vsData.liguleColour}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Leaf Blade Length(cm) :</p>
                                              {vsData.lbLength}</div>
                                      </div>
                                      <div className="text-spr-Black">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Leaf Blade Width(cm):</p>
                                              {vsData.lbWidth}</div>
                                      </div>
                                      <div className="text-sprBalck">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Flag Lea fLegnth :</p>
                                              {vsData.flagLeafLegnth}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Flag Leaf Width :</p>
                                              {vsData.flagLeafWidth}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Flag Leaf Attitude Early Obs :</p>
                                              {vsData.flagLeafAttitudeEarlyobs}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Culm Habit :</p>
                                              {vsData.culmHabit}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Culm Kneeing Ability : </p>
                                              {vsData.culmKneeingAbility}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Culm Length : </p>
                                              {vsData.culmLength}</div>
                                      </div>

                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Culm Number :</p>
                                              {vsData.culmNumber}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Culm Diameter at Basal Internode :</p>
                                              {vsData.culmDiameteratBasalInternode}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Culm Anthocyanin Colouration on Nodes :</p>
                                              {vsData.culmAnthocyaninColourationonNodes}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Culm Underlying Node Colour :</p>
                                              {vsData.culmUnderlyingNodeColour}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          <div className="flex flex-auto"><p className="text-sprGray60">Culm Internode Anthocyanin :</p>
                                              {vsData.culmInternodeAnthocyanin}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Culm Underlying Internode Colouration :</p>
                                              {vsData.culmUnderlyingInternodeColouration}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Culm Lodging Resistance :</p>
                                              {vsData.culmLodgingResistance}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Culm Strength :</p>
                                              {vsData.culmStrength}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                         
                                          <div className="flex flex-auto">
                                              <p className="text-sprGray60">Flag Leaf Attitude Late Obs :</p>
                                              {vsData.flagLeafAttitudeLateobs}
                                          </div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Leaf Senesence :</p>
                                              {vsData.leafSenesence}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Rhizome and Stolon Formation :</p>
                                              {vsData.rhizomeandStolonFormation}</div>
                                      </div>
                                  </div>
                              )

                              )}

                              {rsData.map((rsData) => (
                                  <div>
                                      <h1 className="text-sm uppercase font-medium text-sprPrimary">Reproductive Stage</h1>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Male Sterility :</p>
                                              {rsData.maleSterility}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Stigma Colour :</p>
                                              {rsData.stigmaColour}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Anther Length : </p>
                                              {rsData.antherLength}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Anther Colour :</p>
                                              {rsData.antherColour}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="fle flex-auto"><p className="text-sprGray60">Lemma And Palea Colour Early Obs :</p>
                                              {rsData.lemmaandPaleaColourEarlyobs}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Lemma Colour of Apicus Early Obs :</p>
                                              {rsData.lemmaColourofApicusearlyobs}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Lemma Anthocyanin Colouration of Area Below Apiculus Early Obs :</p>
                                              {rsData.lemmaAnthocyaninColourationofAreaBelowApiculusEarlyobs}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Awns Presence Wild Species : </p>
                                              {rsData.awnsPresenceWildSpecies}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                         
                                          <div className="flex flex-auto"><p className="text-sprGray60">Awns Distribution Cultivated Species : </p>
                                              {rsData.awnsDistributionCultivatedSpecies}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Awns Distribution Early Obs :</p>
                                              {rsData.awnsDistributionEarlyobs}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Awn Length : </p>
                                              {rsData.awnLength}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Awns Thickness :</p>
                                              {rsData.awnsThickness}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Panicle Arrangement of Primary Branches :</p>
                                              {rsData.panicleArrangementofPrimaryBranches}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Panicle Number of Basal Primary Branches : </p>
                                              {rsData.panicleNumberofBasalPrimaryBranches}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Panicle Distance from Base to Lowest Spikelet Insertion :</p>
                                              {rsData.panicleDistancefromBasetoLowestSpikeletInsertion}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Panicle Texture of Main Axis :</p>
                                              {rsData.panicleTextureofMainAxis}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Panicle Number Per Plant :</p>
                                              {rsData.panicleNumberPerPlant}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Panicle Length : </p>
                                              {rsData.panicleLength}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Panicle Attitude of Main Axis :</p>
                                              {rsData.panicleAttitudeofMainAxis}</div></div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Panicle Attitude of Branches :</p>
                                              {rsData.panicleAttitudeofBranches}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprBlack">Panicle Secondary Branching :</p>
                                              {rsData.panicleSecondaryBranching}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Panicle Exsertion :</p>
                                              {rsData.panicleExsertion}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                         
                                          <div className="flex flex-auto"><p className="text-sprGray60">Panicle Shattering : </p>
                                              {rsData.panicleShattering}</div>
                                      </div>
                                  </div>
                              ))}

                              {gcData.map((gcData) => (
                                  <div>
                                      {/* grain Characteristics */}

                                      <h1 className="text-sm uppercase font-medium text-sprPrimary">Grain Characteristics</h1>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Panicle Length Late Obs :</p>
                                              {gcData.panicleLengthLateobs}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Panicle Threshability :</p>
                                              {gcData.panicleThreshability}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Awn Colour :</p>
                                              {gcData.awnColour}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Lemma and Palea Pubesence :</p>
                                              {gcData.lemmaandPaleaPubesence}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Lemma and Palea Colour Late Obs :</p>
                                              {gcData.lemmaandPaleaColourLateobs}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Lemma Anthocyanin Colouration of Keel :</p>
                                              {gcData.lemmaAnthocyaninColourationofKeel}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Lemma Anthocyanin Colouration of Area Below Apiculus Late Obs :</p>
                                              {gcData.lemmaAnthocyaninColourationofAreaBelowApiculusLateobs}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Lemma Colour of Apiculus Late Obs :</p>
                                              {gcData.lemmaColourofApiculusLateobs}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Lemma Shape of Apiculus :</p>
                                              {gcData.lemmaShapeofApiculus}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Sterile Lemma Length :</p>
                                              {gcData.sterileLemmaLength}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Longer Sterile Lemma Length :</p>
                                              {gcData.longerSterileLemmaLength}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Sterile LemmaShape :</p>
                                              {gcData.sterileLemmaShape}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Sterile Lemma Colour :</p>
                                              {gcData.sterileLemmaColour}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Spikelet Fertility :</p>
                                              {gcData.spikeletFertility}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Grain Length :</p>
                                              {gcData.grainLength}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Grain Width :</p>
                                              {gcData.grainWidth}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                         
                                          <div className="flex flex-auto"><p className="text-sprGray60">grain Thickness :</p>
                                              {gcData.grainThickness}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                         
                                          <div className="flex flex-auto"><p className="text-sprGray60">Grain 100 Grain Weight :</p>
                                              {gcData.grain100GrainWeight}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                    
                                          <div className="flex flex-auto"><p className="text-sprGray60">Grain 10 Grain Weight :</p>
                                              {gcData.grain10GrainWeight}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                         
                                          <div className="flex flex-auto"><p className="text-sprGray60">Caryopsis Length :</p>
                                              {gcData.caryopsisLength}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                  
                                          <div className="flex flex-auto"><p className="text-sprGray60">Caryopsis Width :</p>
                                              {gcData.caryopsisWidth}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                          
                                          <div className="flex flex-auto"><p className="text-sprGray60">Caryopsis Shape :</p>
                                              {gcData.caryopsisShape}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                       
                                          <div className="flex flex-auto"><p className="text-sprGray60">Caryopsis Pericarp Colour :</p>
                                              {gcData.caryopsisPericarpColour}</div>
                                      </div>
                                      <div className="text-sprBlack">
                                        
                                          <div className="flex flex-auto"><p className="text-sprGray60">Endorsperm Type :</p>
                                              {gcData.endorspermType}</div>
                                      </div>
                                  </div>
                              ))}
                              {ycData.map((ycData) => (
                                  <div>
                                      {/* yield components */}
                                      <h1 className="text-sm uppercase font-medium text-sprPrimary">Yield Components</h1>
                                      <div className="text-sprBlack">
                                          <p className="text-sprGray60">Cavans :</p>
                                          {ycData.cavans}</div>
                                      <div className="text-sprBlack">
                                          <p className="text-sprGray60">Kilogram :</p>
                                          {ycData.kilogram}</div>
                                      <div className="text-sprBlack">
                                          <p className="text-sprGray60">Grain Yield :</p>
                                          {ycData.grainYield}</div>
                                      <div className="text-sprBlack">
                                          <p className="text-sprGray60">Ton/Ha :</p>
                                          {ycData.tonHa}</div>
                                      <div className="text-sprBlack">
                                          <p className="text-sprGray60">Cooked Rice Aroma :</p>
                                          {ycData.cookedRiceAroma}</div>
                                      <div className="text-sprBlack">
                                          <p className="text-sprGray60">Grain Aroma :</p>
                                          {ycData.grainAroma}</div>
                                      <div className="text-sprBlack">
                                          <p className="text-sprGray60">Leaf Aroma :</p>
                                          {ycData.leafAroma}</div>
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
