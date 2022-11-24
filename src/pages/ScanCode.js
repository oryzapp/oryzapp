import { useEffect, useState } from "react";
import ModalRiceInfo from "../components/ModalRiceInfo";
import closeIcon from '../assets/close.svg'
import QrScanner from "qr-scanner";
import { collection, collectionGroup, doc, getDoc, onSnapshot, query, where } from "firebase/firestore";
import db from '../firebase-config'


// Icons
import { ReactComponent as ScanCodeIcon } from '../assets/qr-code-icon.svg'
import { ReactComponent as ImageIcon } from '../assets/image-icon.svg'
export default function ScanCode() {


  const [modalIsOpen, setModalIsOpen] = useState(false)


  // Read Code from File Input
  const [qrData, setQrData] = useState("No Result")
  const readCode = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    QrScanner.scanImage(file, { returnDetailedScanResult: true })
      .then(result => {
        setQrData(result.data)
        setRiceDataExists(true)
      })
      .catch(setRiceDataExists(false));

    console.log('wazzu[[[[');
    console.log(qrData);

  }



  console.log('hpp hppp');
  console.log(qrData);


  // Get All Rice Data
  const [riceDataExists, setRiceDataExists] = useState(false)
  const [riceList, setRiceList] = useState([]);

  useEffect(() => {
    try {
      const collectionRef = collectionGroup(db, "Raw_Rice_List");
      const unsub = onSnapshot(collectionRef, (snapshot) => {
        setRiceList(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
      return unsub;
    } catch (error) {
      console.log(error);
    }
  }, []);

  console.log('rice');
  console.log(riceList);
  console.log('current');

  // Check if Rice Data Exists --------->
  const [currentData, setCurrentData] = useState([])

  console.log(currentData);
  useEffect(() => {

    const result = riceList.find(rice => rice.id === qrData)
    if (result === undefined) {
      setRiceDataExists(false)
    }
    else {
      setCurrentData(result)
      console.log('exisst');
      setRiceDataExists(true)

    }
  }, [qrData])

  // Scan or Upload Image
  const [isScan, setIsScan] = useState(true)

  // Open View Rice Info Modal
  const openViewInfoModal = () => {
    setModalIsOpen(true)
    // console.log(riceList.find(rice => rice.id === qrData));
  }



  // Get Stages Data
  const [vsData, setvsData] = useState([])
  const [rsData, setrsData] = useState([])
  const [gcData, setgcData] = useState([])
  const [ycData, setycData] = useState([])

  const getData = async () => {


    const vsDocRef = doc(db, `/SPR/Rice_Seasons/Seasons/${currentData.riceSeason}_Season/Stages/Vegetative_Stage/VS_Raw_Rice_Data`, currentData.id)
    const rsDocRef = doc(db, `/SPR/Rice_Seasons/Seasons/${currentData.riceSeason}_Season/Stages/Reproductive_Stage/RS_Raw_Rice_Data`, currentData.id)
    const gcDocRef = doc(db, `/SPR/Rice_Seasons/Seasons/${currentData.riceSeason}_Season/Stages/Grain_Characteristics/GC_Raw_Rice_Data`, currentData.id)
    const ycDocRef = doc(db, `/SPR/Rice_Seasons/Seasons/${currentData.riceSeason}_Season/Stages/Yield_Components/YC_Raw_Rice_Data`, currentData.id)

    const vsDocSnap = await getDoc(vsDocRef)
    const rsDocSnap = await getDoc(rsDocRef)
    const gcDocSnap = await getDoc(gcDocRef)
    const ycDocSnap = await getDoc(ycDocRef)
    console.log(ycDocSnap);

    const transferVSData = vsDocSnap.data()
    const transferRSData = rsDocSnap.data()
    const transferGCData = gcDocSnap.data()
    const transferYCData = ycDocSnap.data()
    setvsData(transferVSData)
    setrsData(transferRSData)
    setgcData(transferGCData)
    setycData(transferYCData)
    console.log('such fun');
    console.log(ycData);

  }


  // View On Md-Lg Screen
  const [viewMdLg, setViewMdLg] = useState(false)

  return (
    <div className='bg-white rounded-t-xl  sm:rounded-xl h-full w-full flex flex-col  p-2'>
      < div className="flex    h-full" >
        <div className={viewMdLg === true ? "w-5/12  flex flex-col" : " w-full  flex flex-col"}>
          {/* Header */}
          <header className="">
            <h1 className="text-3xl font-bold text-sprBlack opacity-80 p-2">
              Scan Code
            </h1>
          </header>
          <div className="flex-auto flex flex-col drop-shadow-md" >
            <div className=" h-full flex justify-center items-center flex-col gap-6 ">
              <div className=" h-72 w-64 flex flex-col  ">
                <div className=" flex ">
                  <div className={isScan === true ? 'w-1/2 h-10 rounded-t-lg bg-sprPrimary flex justify-center items-center' : 'w-1/2 h-10 rounded-t-lg bg-sprPrimarySuperLight flex justify-center items-center'} onClick={() => setIsScan(true)}>
                    <ScanCodeIcon fill={isScan === true ? "white" : "#CFD491"} />
                  </div>
                  <div className={isScan === false ? 'w-1/2 h-10 rounded-t-lg bg-sprPrimary flex justify-center items-center' : 'w-1/2 h-10 rounded-t-lg bg-sprPrimarySuperLight flex justify-center items-center'} onClick={() => setIsScan(false)}>


                    <ImageIcon className="w-7" fill="none" stroke={isScan === false ? "white" : "#CFD491"} />
                  </div>
                </div>
                <div className={isScan === true ? 'bg-slate-100 flex-auto rounded-b-lg' : 'hidden'}>
                  <video ></video>
                </div>
                <div className={isScan === false ? 'flex flex-col gap-5 justify-center items-center bg-slate-100 flex-auto rounded-b-lg  sprBorderDashed' : 'hidden'} >
                  <ImageIcon fill="none" stroke="#CFD491" className="w-16" />
                  <div className="bg-sprPrimaryLight relative rounded-full ">
                    <h6 className="absolute left-4 top-1 text-white font-medium" >Choose File</h6>
                    <input className="opacity-0 w-32" type="file" onChange={(e) => {
                      readCode(e)
                    }} />

                  </div>

                </div>

              </div>

              <div className=" flex justify-center items-center rounded-lg">

                <div className={riceDataExists === true ? 'w-64  rounded-lg bg-slate-100 drop-shadow-md flex justify-between p-2 items-center' : 'hidden'}>
                  <div className="">
                    <h1 className="text-xl font-bold text-sprBlack opacity-80">
                      {currentData?.accessionId}
                    </h1>
                    <h6 className="text-xs font-medium text-sprGray60">
                      {currentData?.riceSeason + ' Season'}
                    </h6>
                    <h6 className="text-xs font-medium text-sprGray60">
                      {currentData?.riceYear}
                    </h6>
                  </div>
                  <button className=" text-white text-sm bg-gradient-to-b from-sprPrimary to-sprPrimaryDarkest h-8 w-16  hidden sm:block  rounded-full shadow-lg shadow-slate-300 hover:bg-gradient-to-t hover:from-sprPrimaryLight hover:to-sprPrimaryLight " onClick={() => {
                    setViewMdLg(true)
                    getData()
                  }}>
                    view
                  </button>
                  <button className=" text-white text-sm bg-gradient-to-b from-sprPrimary to-sprPrimaryDarkest h-8 w-16   sm:hidden  rounded-full shadow-lg shadow-slate-300 " onClick={() => {
                    openViewInfoModal()
                    getData()
                  }}>
                    view
                  </button>
                </div>
                <div className={riceDataExists === false ? "w-64 rounded-lg bg-slate-100 p-2 text-center font-medium text-sprGray60" : "hidden"}>No Results</div>
              </div>

            </div>

          </div>
        </div>

        <div className={viewMdLg === true ? "bg-red-900 md:flex  md:flex-auto overflow-auto rounded-lg scrollbar" : "bg-red-900 hidden  md:flex-auto"}>
          <div className={riceDataExists === true ? "flex w-full flex-col p-6 rounded-lg h-96" : "hidden"}>
            <div className="bg-yellow-400 flex  ">
              <header className="  bg-red-600">
                <h1 className="text-3xl  font-bold text-sprBlack opacity-80 p-2">
                  Rice Info
                </h1>
              </header>
              <div className="bg-yellow-400">
              </div>
            </div>
            <div className="bg-violet-500 flex-auto flex">
              <div className="bg-green-600 w-1/4 flex flex-col">
                <div className="bg-pink-600  w-full p-3">
                  <div className="bg-yellow-400 h-full">image</div></div>
                <div className="bg-pink-300 h-3/4 w-full">
                  <h1>{currentData.accessionId}</h1>
                  <p>Season: {currentData.riceSeason} Season</p>
                  <p>Year: {currentData.riceYear}</p>
                </div>
              </div>
              <main className="bg-green-600 w-3/4">
                <section className="text-xs">
                  {/* vegetative stage */}
                  <h1 className="text-sm uppercase font-medium text-sprPrimary">Vegetative Stage</h1>
                  <div className="text-sprBlack"><small className="text-sprPrimary">7.3.1</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">coleoptile Anthocyanin Colouration :</p>
                      {vsData.coleoptileAnthocyaninColouration}</div>
                  </div>
                  <div className="text-sprBlack"><small className="text-sprPrimary">7.3.2</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Seedling Height : </p>
                      {vsData.seedlingHeight}</div>
                  </div>
                  <div className="text-sprBlack"><small className="text-sprPrimary">7.3.3</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Basal Leaf Sheath Colour : </p>
                      {vsData.basalLeafSheathColour}</div>
                  </div>
                  <div className="text-sprBlack"><small className="text-sprPrimary">7.3.4</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Leaf Sheath Anthocyanin Colouration :</p>
                      {vsData.lsAnthocyaninColouration}</div>
                  </div>
                  <div className="text-sprBlack"><small className="text-sprPrimary">7.3.5</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Leaf Blade Presence/Absence of Anthocyanin Colouration : </p>
                      {vsData.lbPresenceAbsenceofAnthocyaninColouration}</div>
                  </div>
                  <div className="text-sprBlack"><small className="text-sprPrimary">7.3.6</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Leaf Blade Distribution of Anthocyanin Colouration :</p>
                      {vsData.lbDistributionofAnthocyaninColouration}</div>
                  </div>
                  <div className="text-sprBlack"><small className="text-sprPrimary">7.3.7</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Leaf Blade Intensity of Green Colour :</p>
                      {vsData.lbIntensityofGreenColour}</div>
                  </div>
                  <div className="text-sprBlack"><small className="text-sprPrimary">7.3.8</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Leaf Blade Attitude :</p>
                      {vsData.lbAttitude}</div>
                  </div>
                  <div className="text-sprBlack"><small className="text-sprPrimary">7.3.9</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Leaf Blade Pubesence :</p>
                      {vsData.lbPubesence}</div>
                  </div>
                  <div className="text-sprBlack"><small className="text-sprPrimary">7.3.9.1</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Leaf Blade Pubesence on Blade Surface :</p>
                      {vsData.lbPubesenceonBladeSurface}</div>
                  </div>
                  <div className="text-sprBlack"><small className="text-sprPrimary">7.3.10</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Leaf Margin Pubesence :</p>
                      {vsData.leafMarginPubesence}</div>
                  </div>
                  <div className="text-sprBlack"><small className="text-sprPrimary">7.3.11</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Auricle Color :</p>
                      {vsData.auricleColor}</div>
                  </div>
                  <div className="text-sprBlack"><small className="text-sprPrimary">7.3.12</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Collar Colour :</p>
                      {vsData.collarColour}</div>
                  </div>
                  <div className="text-sprBlack"><small className="text-sprPrimary">7.3.13</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Ligule Length :</p>
                      {vsData.liguleLength}</div>
                  </div>
                  <div className="text-sprBlack"><small className="text-sprPrimary">7.3.14</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Ligule Shape :</p>
                      {vsData.liguleShape}</div>
                  </div>
                  <div className="text-sprBlack"><small className="text-sprPrimary">7.3.14.1</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Ligule Shape Cultivated Species :</p>
                      {vsData.liguleShapeCultivatedSpecies}</div>
                  </div>
                  <div className="text-sprBalck"><small className="text-sprPrimary">7.3.14.2</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Ligule Shape Wild Species :</p>
                      {vsData.liguleShapeWildSpecies}</div>
                  </div>
                  <div className="text-sprBlack"><small className="text-sprPrimary">7.3.15</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Ligule Margin Shape Wild Species :</p>
                      {vsData.liguleMarginShapeWildSpecies}</div>
                  </div>
                  <div className="text-sprBlack"><small className="text-sprPrimary">7.3.15.1</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Ligule Margin Hairiness :</p>
                      {vsData.liguleMarginHairiness}</div>
                  </div>
                  <div className="text-sprBlack"><small className="text-sprPrimary">7.3.16</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Ligule Pubesence :</p>
                      {vsData.ligulePubesence}</div>
                  </div>
                  <div className="text-sprBlack"><small className="text-sprPrimary">7.3.17</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Ligule Colour :</p>
                      {vsData.liguleColour}</div>
                  </div>
                  <div className="text-sprBlack"><small className="text-sprPrimary">7.3.18</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Leaf Blade Length(cm) :</p>
                      {vsData.lbLength}</div>
                  </div>
                  <div className="text-spr-Black"><small className="text-sprPrimary">7.3.19</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Leaf Blade Width(cm):</p>
                      {vsData.lbWidth}</div>
                  </div>
                  <div className="text-sprBalck"><small className="text-sprPrimary">7.3.20</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Flag Lea fLegnth :</p>
                      {vsData.flagLeafLegnth}</div>
                  </div>
                  <div className="text-sprBlack"><small className="text-sprPrimary">7.3.21</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Flag Leaf Width :</p>
                      {vsData.flagLeafWidth}</div>
                  </div>
                  <div className="text-sprBlack"><small className="text-sprPrimary">7.3.22</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Flag Leaf Attitude Early Obs :</p>
                      {vsData.flagLeafAttitudeEarlyobs}</div>
                  </div>
                  <div className="text-sprBlack"><small className="text-sprPrimary">7.3.23</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Culm Habit :</p>
                      {vsData.culmHabit}</div>
                  </div>
                  <div className="text-sprBlack"><small className="text-sprPrimary">7.3.24</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Culm Kneeing Ability : </p>
                      {vsData.culmKneeingAbility}</div>
                  </div>
                  <div className="text-sprBlack"><small className="text-sprPrimary">7.3.25</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Culm Length : </p>
                      {vsData.culmLength}</div>
                  </div>

                  <div className="text-sprBlack"><small className="text-sprPrimary">7.3.26</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Culm Number :</p>
                      {vsData.culmNumber}</div>
                  </div>
                  <div className="text-sprBlack"><small className="text-sprPrimary">7.3.27</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Culm Diameter at Basal Internode :</p>
                      {vsData.culmDiameteratBasalInternode}</div>
                  </div>
                  <div className="text-sprBlack"><small className="text-sprPrimary">7.3.28</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Culm Anthocyanin Colouration on Nodes :</p>
                      {vsData.culmAnthocyaninColourationonNodes}</div>
                  </div>
                  <div className="text-sprBlack"><small className="text-sprPrimary">7.3.29</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Culm Underlying Node Colour :</p>
                      {vsData.culmUnderlyingNodeColour}</div>
                  </div>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.3.30</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Culm Internode Anthocyanin :</p>
                      {vsData.culmInternodeAnthocyanin}</div>
                  </div>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.3.31</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Culm Underlying Internode Colouration :</p>
                      {vsData.culmUnderlyingInternodeColouration}</div>
                  </div>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.3.32</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Culm Lodging Resistance :</p>
                      {vsData.culmLodgingResistance}</div>
                  </div>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.3.33</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Culm Strength :</p>
                      {vsData.culmStrength}</div>
                  </div>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.3.34</small>
                    <div className="flex flex-auto">
                      <p className="text-sprGray60">Flag Leaf Attitude Late Obs :</p>
                      {vsData.flagLeafAttitudeLateobs}
                    </div>
                  </div>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.3.35</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Leaf Senesence :</p>
                      {vsData.leafSenesence}</div>
                  </div>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.3.36</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Rhizome and Stolon Formation :</p>
                      {vsData.rhizomeandStolonFormation}</div>
                  </div>



                  {/* reprductive Stage */}
                  <h1 className="text-sm uppercase font-medium text-sprPrimary">Reproductive Stage</h1>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.4.1</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Male Sterility :</p>
                      {rsData.maleSterility}</div>
                  </div>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.4.2</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Stigma Colour :</p>
                      {rsData.stigmaColour}</div>
                  </div>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.4.3</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Anther Length : </p>
                      {rsData.antherLength}</div>
                  </div>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.4.4</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Anther Colour :</p>
                      {rsData.antherColour}</div>
                  </div>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.4.5</small>
                    <div className="fle flex-auto"><p className="text-sprGray60">Lemma And Palea Colour Early Obs :</p>
                      {rsData.lemmaandPaleaColourEarlyobs}</div>
                  </div>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.4.6</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Lemma Colour of Apicus Early Obs :</p>
                      {rsData.lemmaColourofApicusearlyobs}</div>
                  </div>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.4.7</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Lemma Anthocyanin Colouration of Area Below Apiculus Early Obs :</p>
                      {rsData.lemmaAnthocyaninColourationofAreaBelowApiculusEarlyobs}</div>
                  </div>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.4.8</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Awns Presence Wild Species : </p>
                      {rsData.awnsPresenceWildSpecies}</div>
                  </div>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.4.9</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Awns Distribution Cultivated Species : </p>
                      {rsData.awnsDistributionCultivatedSpecies}</div>
                  </div>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.4.10</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Awns Distribution Early Obs :</p>
                      {rsData.awnsDistributionEarlyobs}</div>
                  </div>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.4.11</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Awn Length : </p>
                      {rsData.awnLength}</div>
                  </div>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.4.12</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Awns Thickness :</p>
                      {rsData.awnsThickness}</div>
                  </div>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.4.13</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Panicle Arrangement of Primary Branches :</p>
                      {rsData.panicleArrangementofPrimaryBranches}</div>
                  </div>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.4.14</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Panicle Number of Basal Primary Branches : </p>
                      {rsData.panicleNumberofBasalPrimaryBranches}</div>
                  </div>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.4.15</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Panicle Distance from Base to Lowest Spikelet Insertion :</p>
                      {rsData.panicleDistancefromBasetoLowestSpikeletInsertion}</div>
                  </div>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.4.16</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Panicle Texture of Main Axis :</p>
                      {rsData.panicleTextureofMainAxis}</div>
                  </div>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.4.17</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Panicle Number Per Plant :</p>
                      {rsData.panicleNumberPerPlant}</div>
                  </div>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.4.18</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Panicle Length : </p>
                      {rsData.panicleLength}</div>
                  </div>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.4.19</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Panicle Attitude of Main Axis :</p>
                      {rsData.panicleAttitudeofMainAxis}</div></div>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.4.20</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Panicle Attitude of Branches :</p>
                      {rsData.panicleAttitudeofBranches}</div>
                  </div>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.4.21</small>
                    <div className="flex flex-auto"><p className="text-sprBlack">Panicle Secondary Branching :</p>
                      {rsData.panicleSecondaryBranching}</div>
                  </div>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.4.22</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Panicle Exsertion :</p>
                      {rsData.panicleExsertion}</div>
                  </div>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.4.23</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Panicle Shattering : </p>
                      {rsData.panicleShattering}</div>
                  </div>


                  {/* grain Characteristics */}

                  <h1 className="text-sm uppercase font-medium text-sprPrimary">Grain Characteristics</h1>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.5.1</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Panicle Length Late Obs :</p>
                      {gcData.panicleLengthLateobs}</div>
                  </div>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.5.2</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Panicle Threshability :</p>
                      {gcData.panicleThreshability}</div>
                  </div>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.5.3</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Awn Colour :</p>
                      {gcData.awnColour}</div>
                  </div>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.5.4</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Lemma and Palea Pubesence :</p>
                      {gcData.lemmaandPaleaPubesence}</div>
                  </div>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.5.5</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Lemma and Palea Colour Late Obs :</p>
                      {gcData.lemmaandPaleaColourLateobs}</div>
                  </div>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.5.6</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Lemma Anthocyanin Colouration of Keel :</p>
                      {gcData.lemmaAnthocyaninColourationofKeel}</div>
                  </div>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.5.7</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Lemma Anthocyanin Colouration of Area Below Apiculus Late Obs :</p>
                      {gcData.lemmaAnthocyaninColourationofAreaBelowApiculusLateobs}</div>
                  </div>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.5.8</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Lemma Colour of Apiculus Late Obs :</p>
                      {gcData.lemmaColourofApiculusLateobs}</div>
                  </div>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.5.9</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Lemma Shape of Apiculus :</p>
                      {gcData.lemmaShapeofApiculus}</div>
                  </div>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.5.10</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Sterile Lemma Length :</p>
                      {gcData.sterileLemmaLength}</div>
                  </div>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.5.11</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Longer Sterile Lemma Length :</p>
                      {gcData.longerSterileLemmaLength}</div>
                  </div>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.5.12</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Sterile LemmaShape :</p>
                      {gcData.sterileLemmaShape}</div>
                  </div>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.5.13</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Sterile Lemma Colour :</p>
                      {gcData.sterileLemmaColour}</div>
                  </div>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.5.14</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Spikelet Fertility :</p>
                      {gcData.spikeletFertility}</div>
                  </div>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.5.15</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Grain Length :</p>
                      {gcData.grainLength}</div>
                  </div>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.5.16</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Grain Width :</p>
                      {gcData.grainWidth}</div>
                  </div>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.5.17</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">grain Thickness :</p>
                      {gcData.grainThickness}</div>
                  </div>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.5.18</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Grain 100 Grain Weight :</p>
                      {gcData.grain100GrainWeight}</div>
                  </div>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.5.19</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Grain 10 Grain Weight :</p>
                      {gcData.grain10GrainWeight}</div>
                  </div>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.5.20</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Caryopsis Length :</p>
                      {gcData.caryopsisLength}</div>
                  </div>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.5.21</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Caryopsis Width :</p>
                      {gcData.caryopsisWidth}</div>
                  </div>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.5.22</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Caryopsis Shape :</p>
                      {gcData.caryopsisShape}</div>
                  </div>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.5.23</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Caryopsis Pericarp Colour :</p>
                      {gcData.caryopsisPericarpColour}</div>
                  </div>
                  <div className="text-sprBlack">
                    <small className="text-sprPrimary">7.5.24</small>
                    <div className="flex flex-auto"><p className="text-sprGray60">Endorsperm Type :</p>
                      {gcData.endorspermType}</div>
                  </div>


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
                </section>
              </main>
            </div>
          </div>


        </div>

        <ModalRiceInfo open={modalIsOpen} >
          <div className=" fixed left-0 right-0 bottom-0 top-0 z-50 bg-black opacity-70 " />
          <div className=" flex flex-col absolute left-3 right-3 bottom-16 top-16 sm:left-12 sm:right-12 md:left-28 md:right-28 lg:left-1/4 lg:right-1/4 z-50 bg-white rounded-xl  px-4 pt-8 pb-4   ">
            <div className="absolute right-5 z-50 ">
              <button onClick={() => setModalIsOpen(false)}>
                <img className="relative" src={closeIcon} alt="" />
              </button>
            </div>
            <div className="bg-yellow-400 flex  ">
              <header className="  bg-red-600">
                <h1 className="text-3xl font-bold text-sprBlack opacity-80 p-2">
                  Rice Info
                </h1>
              </header>
              <div className="bg-yellow-400">
              </div>
            </div>
            <div className="bg-violet-500 flex-auto flex flex-col">
              <div className="bg-green-600 w-full h-1/4 flex ">
                <div className="bg-pink-600  w-1/2 p-3">
                  <div className="bg-yellow-400 h-full">image</div></div>
                <div className="bg-pink-300 flex flex-col flex-auto">
                  <h1>{currentData.accessionId}</h1>
                  <p>Season: {currentData.riceSeason} Season</p>
                  <p>Year: {currentData.riceYear}</p>
                </div>
              </div>
              <div className="bg-green-600 w-full flex-auto">
                {/* vegetative stage */}
                <h1 className="text-sm uppercase font-medium text-sprPrimary">Vegetative Stage</h1>
                <div className="text-sprBlack"><small className="text-sprPrimary">7.3.1</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">coleoptile Anthocyanin Colouration :</p>
                    {vsData.coleoptileAnthocyaninColouration}</div>
                </div>
                <div className="text-sprBlack"><small className="text-sprPrimary">7.3.2</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Seedling Height : </p>
                    {vsData.seedlingHeight}</div>
                </div>
                <div className="text-sprBlack"><small className="text-sprPrimary">7.3.3</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Basal Leaf Sheath Colour : </p>
                    {vsData.basalLeafSheathColour}</div>
                </div>
                <div className="text-sprBlack"><small className="text-sprPrimary">7.3.4</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Leaf Sheath Anthocyanin Colouration :</p>
                    {vsData.lsAnthocyaninColouration}</div>
                </div>
                <div className="text-sprBlack"><small className="text-sprPrimary">7.3.5</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Leaf Blade Presence/Absence of Anthocyanin Colouration : </p>
                    {vsData.lbPresenceAbsenceofAnthocyaninColouration}</div>
                </div>
                <div className="text-sprBlack"><small className="text-sprPrimary">7.3.6</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Leaf Blade Distribution of Anthocyanin Colouration :</p>
                    {vsData.lbDistributionofAnthocyaninColouration}</div>
                </div>
                <div className="text-sprBlack"><small className="text-sprPrimary">7.3.7</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Leaf Blade Intensity of Green Colour :</p>
                    {vsData.lbIntensityofGreenColour}</div>
                </div>
                <div className="text-sprBlack"><small className="text-sprPrimary">7.3.8</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Leaf Blade Attitude :</p>
                    {vsData.lbAttitude}</div>
                </div>
                <div className="text-sprBlack"><small className="text-sprPrimary">7.3.9</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Leaf Blade Pubesence :</p>
                    {vsData.lbPubesence}</div>
                </div>
                <div className="text-sprBlack"><small className="text-sprPrimary">7.3.9.1</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Leaf Blade Pubesence on Blade Surface :</p>
                    {vsData.lbPubesenceonBladeSurface}</div>
                </div>
                <div className="text-sprBlack"><small className="text-sprPrimary">7.3.10</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Leaf Margin Pubesence :</p>
                    {vsData.leafMarginPubesence}</div>
                </div>
                <div className="text-sprBlack"><small className="text-sprPrimary">7.3.11</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Auricle Color :</p>
                    {vsData.auricleColor}</div>
                </div>
                <div className="text-sprBlack"><small className="text-sprPrimary">7.3.12</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Collar Colour :</p>
                    {vsData.collarColour}</div>
                </div>
                <div className="text-sprBlack"><small className="text-sprPrimary">7.3.13</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Ligule Length :</p>
                    {vsData.liguleLength}</div>
                </div>
                <div className="text-sprBlack"><small className="text-sprPrimary">7.3.14</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Ligule Shape :</p>
                    {vsData.liguleShape}</div>
                </div>
                <div className="text-sprBlack"><small className="text-sprPrimary">7.3.14.1</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Ligule Shape Cultivated Species :</p>
                    {vsData.liguleShapeCultivatedSpecies}</div>
                </div>
                <div className="text-sprBalck"><small className="text-sprPrimary">7.3.14.2</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Ligule Shape Wild Species :</p>
                    {vsData.liguleShapeWildSpecies}</div>
                </div>
                <div className="text-sprBlack"><small className="text-sprPrimary">7.3.15</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Ligule Margin Shape Wild Species :</p>
                    {vsData.liguleMarginShapeWildSpecies}</div>
                </div>
                <div className="text-sprBlack"><small className="text-sprPrimary">7.3.15.1</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Ligule Margin Hairiness :</p>
                    {vsData.liguleMarginHairiness}</div>
                </div>
                <div className="text-sprBlack"><small className="text-sprPrimary">7.3.16</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Ligule Pubesence :</p>
                    {vsData.ligulePubesence}</div>
                </div>
                <div className="text-sprBlack"><small className="text-sprPrimary">7.3.17</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Ligule Colour :</p>
                    {vsData.liguleColour}</div>
                </div>
                <div className="text-sprBlack"><small className="text-sprPrimary">7.3.18</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Leaf Blade Length(cm) :</p>
                    {vsData.lbLength}</div>
                </div>
                <div className="text-spr-Black"><small className="text-sprPrimary">7.3.19</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Leaf Blade Width(cm):</p>
                    {vsData.lbWidth}</div>
                </div>
                <div className="text-sprBalck"><small className="text-sprPrimary">7.3.20</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Flag Lea fLegnth :</p>
                    {vsData.flagLeafLegnth}</div>
                </div>
                <div className="text-sprBlack"><small className="text-sprPrimary">7.3.21</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Flag Leaf Width :</p>
                    {vsData.flagLeafWidth}</div>
                </div>
                <div className="text-sprBlack"><small className="text-sprPrimary">7.3.22</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Flag Leaf Attitude Early Obs :</p>
                    {vsData.flagLeafAttitudeEarlyobs}</div>
                </div>
                <div className="text-sprBlack"><small className="text-sprPrimary">7.3.23</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Culm Habit :</p>
                    {vsData.culmHabit}</div>
                </div>
                <div className="text-sprBlack"><small className="text-sprPrimary">7.3.24</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Culm Kneeing Ability : </p>
                    {vsData.culmKneeingAbility}</div>
                </div>
                <div className="text-sprBlack"><small className="text-sprPrimary">7.3.25</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Culm Length : </p>
                    {vsData.culmLength}</div>
                </div>

                <div className="text-sprBlack"><small className="text-sprPrimary">7.3.26</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Culm Number :</p>
                    {vsData.culmNumber}</div>
                </div>
                <div className="text-sprBlack"><small className="text-sprPrimary">7.3.27</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Culm Diameter at Basal Internode :</p>
                    {vsData.culmDiameteratBasalInternode}</div>
                </div>
                <div className="text-sprBlack"><small className="text-sprPrimary">7.3.28</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Culm Anthocyanin Colouration on Nodes :</p>
                    {vsData.culmAnthocyaninColourationonNodes}</div>
                </div>
                <div className="text-sprBlack"><small className="text-sprPrimary">7.3.29</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Culm Underlying Node Colour :</p>
                    {vsData.culmUnderlyingNodeColour}</div>
                </div>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.3.30</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Culm Internode Anthocyanin :</p>
                    {vsData.culmInternodeAnthocyanin}</div>
                </div>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.3.31</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Culm Underlying Internode Colouration :</p>
                    {vsData.culmUnderlyingInternodeColouration}</div>
                </div>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.3.32</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Culm Lodging Resistance :</p>
                    {vsData.culmLodgingResistance}</div>
                </div>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.3.33</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Culm Strength :</p>
                    {vsData.culmStrength}</div>
                </div>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.3.34</small>
                  <div className="flex flex-auto">
                    <p className="text-sprGray60">Flag Leaf Attitude Late Obs :</p>
                    {vsData.flagLeafAttitudeLateobs}
                  </div>
                </div>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.3.35</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Leaf Senesence :</p>
                    {vsData.leafSenesence}</div>
                </div>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.3.36</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Rhizome and Stolon Formation :</p>
                    {vsData.rhizomeandStolonFormation}</div>
                </div>



                {/* reprductive Stage */}
                <h1 className="text-sm uppercase font-medium text-sprPrimary">Reproductive Stage</h1>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.4.1</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Male Sterility :</p>
                    {rsData.maleSterility}</div>
                </div>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.4.2</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Stigma Colour :</p>
                    {rsData.stigmaColour}</div>
                </div>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.4.3</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Anther Length : </p>
                    {rsData.antherLength}</div>
                </div>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.4.4</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Anther Colour :</p>
                    {rsData.antherColour}</div>
                </div>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.4.5</small>
                  <div className="fle flex-auto"><p className="text-sprGray60">Lemma And Palea Colour Early Obs :</p>
                    {rsData.lemmaandPaleaColourEarlyobs}</div>
                </div>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.4.6</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Lemma Colour of Apicus Early Obs :</p>
                    {rsData.lemmaColourofApicusearlyobs}</div>
                </div>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.4.7</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Lemma Anthocyanin Colouration of Area Below Apiculus Early Obs :</p>
                    {rsData.lemmaAnthocyaninColourationofAreaBelowApiculusEarlyobs}</div>
                </div>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.4.8</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Awns Presence Wild Species : </p>
                    {rsData.awnsPresenceWildSpecies}</div>
                </div>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.4.9</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Awns Distribution Cultivated Species : </p>
                    {rsData.awnsDistributionCultivatedSpecies}</div>
                </div>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.4.10</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Awns Distribution Early Obs :</p>
                    {rsData.awnsDistributionEarlyobs}</div>
                </div>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.4.11</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Awn Length : </p>
                    {rsData.awnLength}</div>
                </div>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.4.12</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Awns Thickness :</p>
                    {rsData.awnsThickness}</div>
                </div>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.4.13</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Panicle Arrangement of Primary Branches :</p>
                    {rsData.panicleArrangementofPrimaryBranches}</div>
                </div>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.4.14</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Panicle Number of Basal Primary Branches : </p>
                    {rsData.panicleNumberofBasalPrimaryBranches}</div>
                </div>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.4.15</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Panicle Distance from Base to Lowest Spikelet Insertion :</p>
                    {rsData.panicleDistancefromBasetoLowestSpikeletInsertion}</div>
                </div>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.4.16</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Panicle Texture of Main Axis :</p>
                    {rsData.panicleTextureofMainAxis}</div>
                </div>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.4.17</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Panicle Number Per Plant :</p>
                    {rsData.panicleNumberPerPlant}</div>
                </div>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.4.18</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Panicle Length : </p>
                    {rsData.panicleLength}</div>
                </div>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.4.19</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Panicle Attitude of Main Axis :</p>
                    {rsData.panicleAttitudeofMainAxis}</div></div>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.4.20</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Panicle Attitude of Branches :</p>
                    {rsData.panicleAttitudeofBranches}</div>
                </div>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.4.21</small>
                  <div className="flex flex-auto"><p className="text-sprBlack">Panicle Secondary Branching :</p>
                    {rsData.panicleSecondaryBranching}</div>
                </div>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.4.22</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Panicle Exsertion :</p>
                    {rsData.panicleExsertion}</div>
                </div>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.4.23</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Panicle Shattering : </p>
                    {rsData.panicleShattering}</div>
                </div>


                {/* grain Characteristics */}

                <h1 className="text-sm uppercase font-medium text-sprPrimary">Grain Characteristics</h1>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.5.1</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Panicle Length Late Obs :</p>
                    {gcData.panicleLengthLateobs}</div>
                </div>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.5.2</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Panicle Threshability :</p>
                    {gcData.panicleThreshability}</div>
                </div>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.5.3</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Awn Colour :</p>
                    {gcData.awnColour}</div>
                </div>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.5.4</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Lemma and Palea Pubesence :</p>
                    {gcData.lemmaandPaleaPubesence}</div>
                </div>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.5.5</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Lemma and Palea Colour Late Obs :</p>
                    {gcData.lemmaandPaleaColourLateobs}</div>
                </div>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.5.6</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Lemma Anthocyanin Colouration of Keel :</p>
                    {gcData.lemmaAnthocyaninColourationofKeel}</div>
                </div>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.5.7</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Lemma Anthocyanin Colouration of Area Below Apiculus Late Obs :</p>
                    {gcData.lemmaAnthocyaninColourationofAreaBelowApiculusLateobs}</div>
                </div>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.5.8</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Lemma Colour of Apiculus Late Obs :</p>
                    {gcData.lemmaColourofApiculusLateobs}</div>
                </div>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.5.9</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Lemma Shape of Apiculus :</p>
                    {gcData.lemmaShapeofApiculus}</div>
                </div>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.5.10</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Sterile Lemma Length :</p>
                    {gcData.sterileLemmaLength}</div>
                </div>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.5.11</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Longer Sterile Lemma Length :</p>
                    {gcData.longerSterileLemmaLength}</div>
                </div>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.5.12</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Sterile LemmaShape :</p>
                    {gcData.sterileLemmaShape}</div>
                </div>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.5.13</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Sterile Lemma Colour :</p>
                    {gcData.sterileLemmaColour}</div>
                </div>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.5.14</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Spikelet Fertility :</p>
                    {gcData.spikeletFertility}</div>
                </div>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.5.15</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Grain Length :</p>
                    {gcData.grainLength}</div>
                </div>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.5.16</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Grain Width :</p>
                    {gcData.grainWidth}</div>
                </div>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.5.17</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">grain Thickness :</p>
                    {gcData.grainThickness}</div>
                </div>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.5.18</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Grain 100 Grain Weight :</p>
                    {gcData.grain100GrainWeight}</div>
                </div>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.5.19</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Grain 10 Grain Weight :</p>
                    {gcData.grain10GrainWeight}</div>
                </div>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.5.20</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Caryopsis Length :</p>
                    {gcData.caryopsisLength}</div>
                </div>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.5.21</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Caryopsis Width :</p>
                    {gcData.caryopsisWidth}</div>
                </div>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.5.22</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Caryopsis Shape :</p>
                    {gcData.caryopsisShape}</div>
                </div>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.5.23</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Caryopsis Pericarp Colour :</p>
                    {gcData.caryopsisPericarpColour}</div>
                </div>
                <div className="text-sprBlack">
                  <small className="text-sprPrimary">7.5.24</small>
                  <div className="flex flex-auto"><p className="text-sprGray60">Endorsperm Type :</p>
                    {gcData.endorspermType}</div>
                </div>


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

            </div>
          </div>
        </ModalRiceInfo>

      </div >
    </div >


  );
}

