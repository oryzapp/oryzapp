import { collection, collectionGroup, onSnapshot, query } from "firebase/firestore";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useRef, useState } from "react";
import db from "../firebase-config";
import downloadIcon from '../assets/download-icon.svg'
import addIcon from '../assets/add-icon.svg'
export default function RiceList() {



  const [riceList, setRiceList] = useState([]);
  const [qrCode, setQrCode] = useState('')
  const [listOn, setListOn] = useState(false)
  const [season, setSeason] = useState('All')

  useEffect(() => {
    let riceCollectionRef = collectionGroup(db, "Raw_Rice_List");

    if (season === 'All') {
      riceCollectionRef = collectionGroup(db, "Raw_Rice_List");
    }
    if (season === "Wet_Season") {
      riceCollectionRef = query(collection(db, `SPR/Rice_Accessions/Rice_List/${season}/Raw_Rice_List`))
    }
    if (season === "Dry_Season") {
      riceCollectionRef = query(collection(db, `SPR/Rice_Accessions/Rice_List/${season}/Raw_Rice_List`))
    }

    onSnapshot(riceCollectionRef, (snapshot) => {
      setRiceList(snapshot.docs.map((doc) => doc.data()));
    });
  }, [season]);

  const downloadQR = (accessionId) => {
    console.log(accessionId);
    const canvas = document.getElementById("qr-gen");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${accessionId}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }


  const changeSeason = (e) => {
    console.log(`1 ${season}`);
    setSeason(e.target.value)
    console.log(`2 ${season}`);
  }
  console.log(riceList);

  return (
    <>
      {/* Header */}
      {/* <header className="   ">
        
        <h1 className="text-3xl font-bold text-sprBlack opacity-80">
          Rice List
        </h1>
      </header> */}
      <header className="  flex items-center">

        <h1 className="text-3xl font-bold text-sprBlack opacity-80 ">
          Rice List</h1>
      </header>
      {/* Options */}
      <div className="flex  items-center gap-3  bg-slate-100 rounded-full">
        <div className="relative drop-shadow-sm">
          <input
            className=" pl-2 py-1 text-sm placeholder:text-sprGray40  rounded-full "
            type="text"
            placeholder="Find a Rice"
          />
          <button className=" w-8 h-full rounded-full absolute right-0 bg-sprPrimaryLight">
            o
          </button>
        </div>
        <div className="relative py-1 bg-white rounded-full drop-shadow-sm">
          Filter
          <div className=" hidden absolute w-28 h-auto rounded-sm p-2 z-50  bg-white">
            <label className="block" htmlFor="">
              <input type="checkbox" name="Season" id="Season" />
              Season
            </label>
            <label className="block" htmlFor="">
              <input type="checkbox" name="Season" id="Season" />
              Year
            </label>
            <label className="block" htmlFor="">
              <input type="checkbox" name="Season" id="Season" />
              Variety
            </label>
          </div>
        </div>
        <select value={season} name="riceSeason" onChange={changeSeason}>
          <option value="All">All</option>
          <option value="Dry_Season">Dry</option>
          <option value="Wet_Season">Wet</option>
        </select>

        <div className="block">
          <button onClick={() => setListOn(true)}
          >
            list
          </button>
          <button onClick={() => setListOn(false)}
          >
            grid
          </button>
        </div>

      </div>
      {/* Main */}
      <section className={listOn === true ? "flex-auto overflow-auto rounded-sm scrollbar " : "hidden"}>
        {riceList.length === 0 ? <div>Empty Image</div> : <div className="bg-red-500 flex h-96">
          <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-500">
            <div className="px-6 py-3 ">Accession</div>
            {riceList.map((rice) => (
              <div className="px-6 py-3"> {rice.accessionId}</div>
            ))}
          </div>
          <div className=" hidden sm:block flex-auto divide-y divide-slate-400 bg-red-400">
            <div className="px-6 py-3">Season </div>
            {riceList.map((rice) => (
              <div className="px-6 py-3"> {rice.season}</div>
            ))}
          </div>
          <div className="hidden sm:block flex-auto divide-y divide-slate-400 bg-blue-600">
            <div className="px-6 py-3">Year</div>
            {riceList.map((rice) => (
              <div className="px-6 py-3"> {rice.year}</div>
            ))}
          </div>
          <div className="divide-y divide-slate-400 bg-blue-700 w-full sm:w-auto ">
            <div className="px-6 py-3 opacity-0 hidden sm:block">Action</div>
            {riceList.map((rice) => (
              <div className="px-6 py-3 flex items-center justify-between gap-2">
                <div className=" sm:hidden">
                  <h1 className="text-2xl font-bold text-sprBlack opacity-80">
                    {rice.accessionId}
                  </h1>
                  <h6 className="text-md font-medium text-sprGray60">
                    {rice.season}
                  </h6>
                  <h6 className="text-md font-medium text-sprGray60">
                    {rice.year}
                  </h6>
                </div>
                <button
                  className=" text-white text-sm bg-gradient-to-b from-sprPrimary to-sprPrimaryDark h-8 w-14 sm:h-6 sm:w-12 rounded-full shadow-lg shadow-slate-300 "
                  onClick={() => {
                    console.log("hi");
                  }}
                >
                  view
                </button>

              </div>
            ))}
          </div>
        </div>}
      </section >

      <section className={listOn === false ? "flex-auto overflow-auto rounded-sm scrollbar " : "hidden"}>
        {riceList.length === 0 ? <div>Empty Image</div> : <div className=" grid sm:grid-cols-3  lg:grid-cols-6   gap-2  grid-colors-black p-2 bg-white h-12 " >

          {riceList.map((rice) => (
            <div className="flex  sm:flex-col bg-white  p-4 pt-2 pr-6 sm:pr-4   rounded-md border-solid border-2 border-sprPrimaryLight">

              <div className="flex  justify-center p-4">
                <QRCodeCanvas id="qr-gen" className="hidden sm:block rounded-xl" value={rice.accessionId} bgColor="#FAFAFA" fgColor="rgba(18, 20, 20, 0.8)" includeMargin={true} size={100} />
                <QRCodeCanvas className="sm:hidden" value={rice.accessionId} fgColor="rgba(18, 20, 20, 0.9)" size={50} />
              </div>
              <div className=" flex flex-auto  space-x-8 justify-between items-center sm:items-start ">
                <div className="">
                  <h1 className="text-xl font-bold text-sprBlack opacity-80">
                    {rice.accessionId}
                  </h1>
                  <h6 className="text-xs font-medium text-sprGray60">
                    {rice.riceSeason}
                  </h6>
                  <h6 className="text-xs font-medium text-sprGray60">
                    {rice.riceYear}
                  </h6>
                </div>
                <div className="flex items-center space-x-2 sm:pt-1 ">
                  <button className=" text-white text-sm bg-gradient-to-b from-sprPrimary to-sprPrimaryDark h-8 w-14 sm:h-6 sm:w-12 rounded-full shadow-lg shadow-slate-300 ">
                    view
                  </button>
                  <button
                    className=" bg-sprPrimary rounded-full shadow-lg shadow-slate-300  " onClick={() => downloadQR(rice.accessionId)}
                  >
                    <div className="sm:w-6 sm:h-6"><img src={downloadIcon} alt="" /></div>
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>}

      </section>
    </>
  );
}
