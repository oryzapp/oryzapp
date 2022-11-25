import { useEffect, useState } from "react";
import ModalRiceInfo from "../components/ModalAccessionsInfo";
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



  }


  console.log(qrData);



  // Get All Rice Data
  const [riceDataExists, setRiceDataExists] = useState(false)
  const [riceList, setRiceList] = useState([]);

  useEffect(() => {
    try {
      const collectionRef = collection(db, "SPR/Rice_Accessions/Accession_IDs");
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


  // Check if Rice Accession Exists --------->
  const [currentData, setCurrentData] = useState([])

  useEffect(() => {

    const result = riceList.find(rice => rice.accessionId === qrData)
    if (result === undefined) {
      console.log('doesnt');
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
  }



  // Get Stages Data
  // const [vsData, setvsData] = useState([])
  // const [rsData, setrsData] = useState([])
  // const [gcData, setgcData] = useState([])
  // const [ycData, setycData] = useState([])

  // const getData = async () => {


  //   const vsDocRef = doc(db, `/SPR/Rice_Seasons/Seasons/${currentData.riceSeason}_Season/Stages/Vegetative_Stage/VS_Raw_Rice_Data`, currentData.id)
  //   const rsDocRef = doc(db, `/SPR/Rice_Seasons/Seasons/${currentData.riceSeason}_Season/Stages/Reproductive_Stage/RS_Raw_Rice_Data`, currentData.id)
  //   const gcDocRef = doc(db, `/SPR/Rice_Seasons/Seasons/${currentData.riceSeason}_Season/Stages/Grain_Characteristics/GC_Raw_Rice_Data`, currentData.id)
  //   const ycDocRef = doc(db, `/SPR/Rice_Seasons/Seasons/${currentData.riceSeason}_Season/Stages/Yield_Components/YC_Raw_Rice_Data`, currentData.id)

  //   const vsDocSnap = await getDoc(vsDocRef)
  //   const rsDocSnap = await getDoc(rsDocRef)
  //   const gcDocSnap = await getDoc(gcDocRef)
  //   const ycDocSnap = await getDoc(ycDocRef)
  //   console.log(ycDocSnap);

  //   const transferVSData = vsDocSnap.data()
  //   const transferRSData = rsDocSnap.data()
  //   const transferGCData = gcDocSnap.data()
  //   const transferYCData = ycDocSnap.data()
  //   setvsData(transferVSData)
  //   setrsData(transferRSData)
  //   setgcData(transferGCData)
  //   setycData(transferYCData)
  //   console.log('such fun');
  //   console.log(ycData);

  // }


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
          {/* Scanner and File Upload */}
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
              {/* Prompt */}
              <div className=" flex justify-center items-center rounded-lg">

                <div className={riceDataExists === true ? 'w-64  rounded-lg bg-slate-100 drop-shadow-md flex justify-between p-2 items-center' : 'hidden'}>
                  <div className="">
                    <h1 className="text-xl font-bold text-sprBlack opacity-80">
                      {currentData?.accessionId}
                    </h1>
                    <h6 className="text-xs font-medium text-sprGray60">
                      {currentData?.classification}
                    </h6>

                  </div>
                  <button className=" text-white text-sm bg-gradient-to-b from-sprPrimary to-sprPrimaryDarkest h-8 w-16  hidden sm:block  rounded-full shadow-lg shadow-slate-300 hover:bg-gradient-to-t hover:from-sprPrimaryLight hover:to-sprPrimaryLight " onClick={() => {
                    setViewMdLg(true)
                    // getData()
                  }}>
                    view
                  </button>
                  <button className=" text-white text-sm bg-gradient-to-b from-sprPrimary to-sprPrimaryDarkest h-8 w-16   sm:hidden  rounded-full shadow-lg shadow-slate-300 " onClick={() => {
                    openViewInfoModal()
                    // getData()
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

                </div>
              </div>

            </div>
          </div>


        </div>



      </div >
    </div >


  );
}

