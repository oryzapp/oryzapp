import { useEffect, useState } from "react";
import ModalRiceInfo from "../components/ModalRiceInfo";
import closeIcon from '../assets/close.svg'
import QrScanner from "qr-scanner";
import { collectionGroup, onSnapshot } from "firebase/firestore";
import db from '../firebase-config'
export default function ScanCode() {


  const [modalIsOpen, setModalIsOpen] = useState(false)


  // Read Code from File Input
  const [qrData, setQrData] = useState("No Result")
  const readCode = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    QrScanner.scanImage(file, { returnDetailedScanResult: true })
      .then(result => setQrData(result.data))
      .catch(e => console.log(e));
  }


  // Get All Rice Data
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

  console.log(riceList);

  // Check if Rice Data Exists --------->
  useEffect(() => {

    const result = riceList.find(rice => rice.id === qrData)
    if (result === undefined) {
      console.log('undefine');
      setRiceDataExists(false)
    }
    else {
      console.log('exisst');
      setRiceDataExists(true)
    }
  }, [qrData])

  // Open View Rice Info Modal
  const openViewInfoModal = () => {
    setModalIsOpen(true)
  }


  return (
    <>
      {/* Header */}
      <header className=" flex items-center">
        <h1 className="text-3xl font-bold text-sprBlack opacity-80">
          Scan Code
        </h1>
      </header>

      {/* Main */}
      <section className=" w-full flex flex-auto overflow-auto rounded-sm scrollbar">
        <div className="flex flex-auto h-full bg-blue-300">
          <div className="bg-red-600 flex flex-auto flex-col">
            <div className="bg-yellow-500 w-full  p-20  h-3/4">
              <div className="bg-violet-400  flex">
                <div className="bg-green-800 flex-auto">dd</div>
                <div className="bg-green-600 flex-auto">dd</div>
              </div>
              <div className="bg-pink-500 h-full">b</div>
            </div>
            <div className="bg-green-400 h-1/4">bee</div>
          </div>
          <div className="hidden md:flex bg-blue-800 flex-auto">H</div>
        </div>

        <ModalRiceInfo open={modalIsOpen} >
          <div className=" fixed left-0 right-0 bottom-0 top-0 z-50 bg-black opacity-70 " />
          <div className=" flex flex-col absolute left-3 right-3 bottom-16 top-16 sm:left-12 sm:right-12 md:left-28 md:right-28 lg:left-1/4 lg:right-1/4 z-50 bg-red-500 rounded-md  px-6 pt-10 pb-6   ">
            <div className="absolute right-5 z-50 ">
              <button onClick={() => setModalIsOpen(false)}>
                <img className="relative" src={closeIcon} alt="" />
              </button>
            </div>
          </div>
        </ModalRiceInfo>

      </section>
    </>
  );
}

  //  <div className="bg-blue-400 md:w-1/4 flex flex-col">
  //         <div className="bg-yellow-500 h-3/4 p-16 flex flex-col items-center">
  //           <h3 className="bg-blue-300">
  //             Scan Here
  //           </h3>
  //           <div className="bg-slate-300 h-60 w-60 rounded-md ">

  //           </div>
  //         </div>

  //         <div className="bg-yellow-800 h-1/4">
  //           <input type="file" onChange={(e) => readCode(e)} />
  //           <div className={riceDataExists === true ? "block" : "hidden"}>
  //             the code is {qrData}
  //             <button className="bg-sprPrimary rounded-full" onClick={openViewInfoModal}>View</button>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="hidden md:block bg-red-600 w-3/4" >
  //         Hi
  //       </div>