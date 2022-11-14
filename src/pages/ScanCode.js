import { useEffect, useState } from "react";
import ModalRiceInfo from "../components/ModalRiceInfo";
import closeIcon from '../assets/close.svg'
import QrScanner from "qr-scanner";
import { collectionGroup, onSnapshot } from "firebase/firestore";
import db from '../firebase-config'


// Icons
import { ReactComponent as ScanCodeIcon } from '../assets/qr-code-icon.svg'
import { ReactComponent as ImageIcon } from '../assets/image-icon.svg'
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

  // Scan or Upload Image
  const [isScan, setIsScan] = useState(true)

  // Open View Rice Info Modal
  const openViewInfoModal = () => {
    setModalIsOpen(true)
  }


  return (
    <div className="flex  bg-blue-900  h-full">
      <div className="bg-red-800 w-full md:w-5/12 flex flex-col">
        {/* Header */}
        <header className="  bg-red-600">
          <h1 className="text-3xl font-bold text-sprBlack opacity-80 p-2">
            Scan Code
          </h1>
        </header>
        <div className="bg-blue-500 flex-auto flex flex-col">
          <div className="bg-green-800 h-full flex justify-center items-center flex-col gap-6 ">
            <div className="bg-yellow-500 h-72 w-64 flex flex-col  ">
              <div className="bg-blue-700 flex ">
                <div className={isScan === true ? 'w-1/2 h-8 rounded-t-lg bg-sprPrimary flex justify-center items-center' : 'w-1/2 h-8 rounded-t-lg bg-sprPrimarySuperLight flex justify-center items-center'} onClick={() => setIsScan(true)}>
                  <ScanCodeIcon />
                </div>
                <div className={isScan === false ? 'w-1/2 h-8 rounded-t-lg bg-sprPrimary flex justify-center items-center' : 'w-1/2 h-8 rounded-t-lg bg-sprPrimarySuperLight flex justify-center items-center'} onClick={() => setIsScan(false)}>


                  <ImageIcon className="w-6" fill="none" />
                </div>
              </div>
              <div className={isScan === true ? 'bg-green-600 flex-auto rounded-b-lg' : 'hidden'}>
                scan
              </div>
              <div className={isScan === false ? 'flex flex-col gap-5 justify-center items-center bg-green-600 flex-auto rounded-b-lg  sprBorderDashed' : 'hidden'}>
                <ImageIcon fill="none" className="w-16" />
                <div className="bg-sprPrimary relative rounded-full hover:bg-sprPrimaryLight">
                  <h6 className="absolute left-4 top-1 text-white font-medium">Choose File</h6>
                  <input className="opacity-0 w-32" type="file" onChange={(e) => readCode(e)} />

                </div>

              </div>

            </div>
            <div className="bg-green-600 flex justify-center items-center rounded-lg">

              <div className={riceDataExists === true ? 'w-64  rounded-lg bg-yellow-300 flex justify-between p-2' : 'hidden'}>
                <div className="">
                  <h1 className="text-xl font-bold text-sprBlack opacity-80">
                    CL_XXX
                  </h1>
                  <h6 className="text-xs font-medium text-sprGray60">
                    cccc
                  </h6>
                  <h6 className="text-xs font-medium text-sprGray60">
                    ccc
                  </h6>
                </div>
                <button className=" text-white text-sm bg-gradient-to-b from-sprPrimary to-sprPrimaryDark h-8 w-14 sm:h-6 sm:w-12 rounded-full shadow-lg shadow-slate-300 " onClick={openViewInfoModal}>
                  view
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>

      <div className="bg-red-900 hidden md:flex md:flex-auto">bbssssssss</div>

    </div>
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


// {/* Header */ }
// <header className=" flex items-center w-1/2 bg-red-600">
//   <h1 className="text-3xl font-bold text-sprBlack opacity-80">
//     Scan Code
//   </h1>
// </header>

// {/* Main */ }
// <section className=" w-full h-full flex flex-auto overflow-auto rounded-sm scrollbar bg-blue-500">
//   beeee
//   <div className="flex flex-auto h-full bg-blue-300">
//     bee
//   </div>

//   <ModalRiceInfo open={modalIsOpen} >
//     <div className=" fixed left-0 right-0 bottom-0 top-0 z-50 bg-black opacity-70 " />
//     <div className=" flex flex-col absolute left-3 right-3 bottom-16 top-16 sm:left-12 sm:right-12 md:left-28 md:right-28 lg:left-1/4 lg:right-1/4 z-50 bg-red-500 rounded-md  px-6 pt-10 pb-6   ">
//       <div className="absolute right-5 z-50 ">
//         <button onClick={() => setModalIsOpen(false)}>
//           <img className="relative" src={closeIcon} alt="" />
//         </button>
//       </div>
//     </div>
//   </ModalRiceInfo>

// </section>