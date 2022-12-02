import { useEffect, useState } from "react";
import ModalRiceInfo from "../components/ModalAccessionsInfo";
import closeIcon from '../assets/close.svg'
import QrScanner from "qr-scanner";
import { collection, collectionGroup, doc, getDoc, onSnapshot, query, where } from "firebase/firestore";
import db from '../firebase-config'
import BackgroundImage from '../assets/background-image.svg'


// Icons
import { ReactComponent as ScanCodeIcon } from '../assets/qr-code-icon.svg'
import { ReactComponent as ImageIcon } from '../assets/image-icon.svg'
import ModalViewAccessionOnly from "../components/ModalViewAccessionOnly";
import { useRef } from "react";
import ModalAccessionsInfo from "../components/ModalAccessionsInfo";
export default function ScanCode() {


  const [isModalOpen, setIsModalOpen] = useState(false)


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

  console.log(riceList);


  // Check if Rice Accession Exists --------->
  const [currentData, setCurrentData] = useState([])

  useEffect(() => {

    const result = riceList.find(rice => rice.id === qrData)
    if (result === undefined) {
      setRiceDataExists(false)
    }
    else {
      setCurrentData(result)
      setRiceDataExists(true)

    }
  }, [qrData])

  // Scan or Upload Image
  const [isScan, setIsScan] = useState(true)

  // Open View Rice Info Modal
  const openViewInfoModal = () => {
    setIsModalOpen(true)
  }

  
console.log('I am currentData');
console.log(currentData);

  return (
    <div className='bg-slate-50 rounded-t-xl  sm:rounded-xl h-full w-full flex flex-col  p-2'>
      {/* Header */}
      <header className=" ">
        <h1 className="text-3xl font-bold text-sprBlack opacity-80 p-2">
          Scan Code
        </h1>
      </header>
      {/* main */}
      <div className="flex h-full relative justify-center items-center">

        <div className=" lg:bg-white lg:drop-shadow-sm w-full flex flex-col items-center gap-5 z-10 lg:p-20 lg:mx-40 rounded-lg relative"  >

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
              {/* <video ref={scanRef}></video> */}
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

            <div className={riceDataExists === true ? 'w-64  rounded-lg bg-slate-50 drop-shadow-md flex justify-between p-2 items-center' : 'hidden'}>
              <div className="">
                <h1 className="text-xl font-bold text-sprBlack opacity-80">
                  {currentData?.accessionId}
                </h1>
                <h6 className="text-xs font-medium text-sprGray60">
                  {currentData?.riceSeason}
                </h6>
                <h6 className="text-xs font-medium text-sprGray60">
                  {currentData?.riceYear}
                </h6>

              </div>
              <button className=" text-white text-sm bg-gradient-to-b from-sprPrimary to-sprPrimaryDarkest h-8 w-16   rounded-full shadow-lg shadow-slate-300 hover:bg-gradient-to-t hover:from-sprPrimaryLight hover:to-sprPrimaryLight " onClick={() => {
              }}>
                view
              </button>

            </div>
            <div className={riceDataExists === false ? "w-64 rounded-lg bg-slate-50 p-2 text-center font-medium text-sprGray60" : "hidden"}>No Results</div>
          </div>
          {/* background */}
          <div className=" hidden lg:flex items-end  w-full  absolute bottom-0 rounded-xl  -z-10" >
            <img src={BackgroundImage} alt="" className="w-full h-1/2" />

          </div>

        </div>
        <div className=" flex items-end  w-full lg:w-1/2 absolute bottom-0  lg:hidden " >
          <img src={BackgroundImage} alt="" className="w-full h-1/2" />

        </div>
      </div>

    </div >


  );
}

