import { useEffect, useState } from "react";
import QrScanner from "qr-scanner";
import { collection, collectionGroup, doc, getDoc, onSnapshot, query, where } from "firebase/firestore";
import db from '../firebase-config'
import BackgroundImage from '../assets/background-image.svg'


// Icons
import { ReactComponent as ScanCodeIcon } from '../assets/qr-code-icon.svg'
import { ReactComponent as ImageIcon } from '../assets/image-icon.svg'
import ModalRiceList from "../components/ModalRiceList";
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

  console.log('belo');
  console.log(riceList);


  // Check if Rice Accession Exists --------->
  const [currentData, setCurrentData] = useState([])
  const [ycData, setYcData] = useState([])

  
  console.log('I am current Data' + currentData.id);
  const getYcData = async () => {
 

			try {
        const docRef = doc(db,`SPR/Rice_Seasons/Seasons/${currentData.riceSeason}_Season/Stages/Yield_Components/YC_Raw_Rice_Data`, currentData.id);
        const docSnap = await getDoc(docRef);

        // const picDocRef = doc = doc(db,'SPR/Rice_Accessions/Accession_IDs',)
     
        setYcData(docSnap.data())
      
      } catch (error) {
        console.log(error);
      }


  }

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


  // Scan with Webcam
const video = document.getElementById('qr-scan')              


console.log(qrData);
const startScanning = async () =>{
const qrScanner = new QrScanner(video,result =>
		{ 
      setQrData(result.data)
		setTimeout(()=>{
			qrScanner.destroy()
		}, 15000)
		}, 
		{
		highlightScanRegion: true,
		highlightCodeOutline: true,
		}
		)
		qrScanner.start()
    setTimeout(()=>{
			qrScanner.destroy()
		}, 5000)
		

}
console.log('I am data');
console.log(qrData);
console.log(ycData.searchIndex);
  return (
    <div className='bg-slate-50 rounded-t-xl  sm:rounded-xl h-full w-full flex flex-col p-2'>
      {/* Header */}
      <header className=" ">
        <h1 className="text-3xl font-bold text-sprBlack opacity-80 ">
          Scan Code
        </h1>
      </header>
      {/* main */}
      <section className="flex-auto overflow-auto  scrollbar bg-white rounded-lg border border-slate-200 w-full">
      <div className="flex w-full h-full sm:max-h-full lg:max-w-full relative items-center ">

        <div className=" lg:bg-white lg:drop-shadow-sm w-full flex flex-col items-center gap-5 z-10 lg:p-20 lg:mx-40 rounded-lg relative"  >

          <div className=" h-72 w-64 flex flex-col ">
            <div className=" flex cursor-pointer">
              <div className={isScan === true ? 'w-1/2 h-10 rounded-t-lg bg-sprPrimary flex justify-center items-center' : 'w-1/2 h-10 rounded-t-lg bg-sprPrimarySuperLight flex justify-center items-center'} 
              onClick={() => {
              setIsScan(true)
              setQrData('No Result')}
              }>
                <ScanCodeIcon fill={isScan === true ? "white" : "#CFD491"} />
              </div>
              <div className={isScan === false ? 'w-1/2 h-10 rounded-t-lg bg-sprPrimary flex justify-center items-center' : 'w-1/2 h-10 rounded-t-lg bg-sprPrimarySuperLight flex justify-center items-center'} 
              onClick={() => {
                setIsScan(false)
                setQrData('No Result')
                }}>


                <ImageIcon className="w-7" fill="none" stroke={isScan === false ? "white" : "#CFD491"} />
              </div>
            </div>
            <div className={isScan === true ? 'bg-slate-100 p-2 flex-auto rounded-b-lg flex flex-col justify-center items-center gap-2' : 'hidden'}>
					<video id="qr-scan" className="h-full w-full "></video>


              <button onClick={()=>{
						startScanning()
						}}
						className="bg-sprPrimary  rounded-full p-2 w-40 text-white font-medium hover:bg-yellow-200 active:bg-yellow-500"
						>
							Scan Code</button>
            </div>
            <div className={isScan === false ? 'flex flex-col gap-5 justify-center items-center bg-slate-100 flex-auto rounded-b-lg  sprBorderDashed' : 'hidden'} >
              <ImageIcon fill="none" stroke="#CFD491" className="w-16" />
              <div className="bg-sprPrimaryLight relative rounded-full hover:bg-sprPrimary ">
                <h6 className="absolute left-4 top-1  text-white font-medium" >Choose File</h6>
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
                  CL-R{currentData?.accessionId}
                </h1>
                
                <h6 className="text-xs font-medium text-sprGray60">
                  Shelf #{currentData?.shelfNum}
                </h6>

              </div>
              <button className=" text-white text-sm bg-gradient-to-b from-sprPrimary to-sprPrimaryDarkest h-8 w-16   rounded-full shadow-lg shadow-slate-300 hover:bg-gradient-to-t hover:from-sprPrimaryLight hover:to-sprPrimaryLight " onClick={() => {
              setIsModalOpen(true)
              getYcData()
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
 
</section>
    
{/* Modal */}
            <ModalRiceList open={isModalOpen} closeModal={()=>{setIsModalOpen(false)}} currentData={currentData} ycData={ycData}/>

    </div >


  );
}

