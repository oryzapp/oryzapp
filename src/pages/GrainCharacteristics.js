import { collection, collectionGroup, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { ReactComponent as EditIcon } from '../assets/edit-icon.svg'
import ModalGrainUpdate from "../components/ModalGrainUpdate";

import db from "../firebase-config";




export default function GrainCharacteristics({ season }) {
  // List and Filter ---------------------------->
  const [riceData, setRiceData] = useState([])
  useEffect(() => {

    let riceCollectionRef = collectionGroup(db, "GC_Raw_Rice_Data");

    if (season === 'All') {
      riceCollectionRef = collectionGroup(db, "GC_Raw_Rice_Data");
    }
    if (season === "Wet_Season") {
      riceCollectionRef = query(collection(db, `/SPR/Rice_Seasons/Seasons/${season}/Stages/Grain_Characteristics/GC_Raw_Rice_Data`))
    }
    if (season === "Dry_Season") {
      riceCollectionRef = query(collection(db, `/SPR/Rice_Seasons/Seasons/${season}/Stages/Grain_Characteristics/GC_Raw_Rice_Data`))
    }

    onSnapshot(riceCollectionRef, (snapshot) => {
      setRiceData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

  }, [season]);

   // Update Grain Characteristics
   const [isModalOpen, setIsModalOpen] = useState(false)
   const [modalId, setModalId] = useState('')
   const [modalYear, setModalYear] = useState('')
   const [modalSeason, setModalSeason] = useState('')

  //  Get GC Data
  const [gcRiceData, setGcRiceData] = useState('')

	const getRiceData=(id)=>{
		const find = riceData.find((rice)=> rice.tagId === id )
    console.log(find);
		setGcRiceData(find)
	}
  console.log('I am gcRiceData');
  console.log(gcRiceData);


  return (
    <>
      <div className="  flex text-sm text-sprGray60">
        <table className="">
          <thead className="text-xs uppercase font-medium text-center bg-sprPrimaryOffLight">Accession</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium text-sprPrimary">Accession</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3"> {rice.accessionId === "" ? "---" : rice.accessionId}</div>
              ))}
            </div>
          </tbody>
        </table>
        <table className="">
          <thead className="text-xs uppercase font-medium text-center bg-sprPrimaryLight">Awn</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium text-sprPrimary">Colour</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 bg-slate-50"> {rice.awnColour === "" ? "---" : rice.awnColour}</div>
              ))}
            </div>
          </tbody>
        </table>
        <table className="">
          <thead className="text-xs uppercase font-medium text-center bg-sprPrimaryOffLight">Caryopsis</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium text-sprPrimary">Length</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 "> {rice.caryopsisLength === "" ? "---" : rice.caryopsisLength}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium text-sprPrimary">Width</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 bg-slate-50"> {rice.caryopsisWidth === "" ? "---" : rice.caryopsisWidth}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium text-sprPrimary">Shape</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3"> {rice.caryopsisShape === "" ? "---" : rice.caryopsisShape}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Pericarp Colour</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.caryopsisPericarpColour === "" ? "---" : rice.caryopsisPericarpColour}</div>
              ))}
            </div>
          </tbody>
        </table>
        <table className="">
          <thead className="text-xs uppercase font-medium text-center bg-sprPrimaryLight">Endorsperm</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium text-sprPrimary">Colour</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3"> {rice.endorspermType === "" ? "---" : rice.endorspermType}</div>
              ))}
            </div>
          </tbody>
        </table>
        <table className="">
          <thead className="text-xs uppercase font-medium text-center bg-sprPrimaryOffLight">Grain</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium text-sprPrimary">Habit</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 bg-slate-50"> {rice.grainLength === "" ? "---" : rice.grainLength}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium text-sprPrimary">Width</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3"> {rice.grainWidth === "" ? "---" : rice.grainWidth}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium text-sprPrimary">Thickness</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 bg-slate-50"> {rice.grainThickness === "" ? "---" : rice.grainThickness}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">100 Grain Weight</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.grain100GrainWeight === "" ? "---" : rice.grain100GrainWeight}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">10 Grain Weight</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.grain10GrainWeight === "" ? "---" : rice.grain10GrainWeight}</div>
              ))}
            </div>
          </tbody>
        </table>
        <table className="">
          <thead className="text-xs uppercase font-medium text-center bg-sprPrimaryLight">Lemma</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Anthocyanin Colouration of Keel</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.lemmaAnthocyaninColourationofKeel === "" ? "---" : rice.lemmaAnthocyaninColourationofKeel}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Anthocyanin Colouration of Area Below Apiculus Late Observation</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 bg-slate-50"> {rice.lemmaAnthocyaninColourationofAreaBelowApiculusLateobs === "" ? "---" : rice.lemmaAnthocyaninColourationofAreaBelowApiculusLateobs}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Colour of Apiculus Late Observation</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3"> {rice.lemmaColourofApiculusLateobs === "" ? "---" : rice.lemmaColourofApiculusLateobs}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Shape of Apiculus</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.lemmaShapeofApiculus === "" ? "---" : rice.lemmaShapeofApiculus}</div>
              ))}
            </div>
          </tbody>
        </table>
        <table className="">
          <thead className="text-xs uppercase font-medium text-center bg-sprPrimaryOffLight">Lemma and Palea</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium text-sprPrimary">Pubesence</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3"> {rice.lemmaandPaleaPubesence === "" ? "---" : rice.lemmaandPaleaPubesence}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Colour Late Observation</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.lemmaandPaleaColourLateobs === "" ? "---" : rice.lemmaandPaleaColourLateobs}</div>
              ))}
            </div>
          </tbody>
        </table>
        <table className="">
          <thead className="text-xs uppercase font-medium text-center bg-sprPrimaryLight">Panicle</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Length Late Observation</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.panicleLengthLateobs === "" ? "---" : rice.panicleLengthLateobs}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium text-sprPrimary">Threshability</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 bg-slate-50"> {rice.panicleThreshability === "" ? "---" : rice.panicleThreshability}</div>
              ))}
            </div>
          </tbody>
        </table>
        <table className="">
          <thead className="text-xs uppercase font-medium text-center bg-sprPrimaryOffLight">Spikelet</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium text-sprPrimary">Fertility</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3"> {rice.spikeletFertility === "" ? "---" : rice.spikeletFertility}</div>
              ))}
            </div>
          </tbody>
        </table>
        <table className="">
          <thead className="text-xs uppercase font-medium text-center bg-sprPrimaryLight">Sterile</thead>
          <tbody className=" flex ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Lemma Length</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap bg-slate-50"> {rice.sterileLemmaLength === "" ? "---" : rice.sterileLemmaLength}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Longer Sterile Lemma Length</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 whitespace-nowrap"> {rice.longerSterileLemmaLength === "" ? "---" : rice.longerSterileLemmaLength}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Lemma Shape</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3 bg-slate-50"> {rice.sterileLemmaShape === "" ? "---" : rice.sterileLemmaShape}</div>
              ))}
            </div>
            <div className="hidden sm:block flex-auto divide-y divide-slate-300 ">
              <div className="px-6 py-3 font-medium whitespace-nowrap text-sprPrimary">Lemma Colour</div>
              {riceData.map((rice) => (
                <div className="px-6 py-3"> {rice.sterileLemmaColour === "" ? "---" : rice.sterileLemmaColour}</div>
              ))}
            </div>
          </tbody>
        </table>

        <table className=" text-sm sticky right-0 ">
          <thead className="text-xs font-medium uppercase text-center bg-white">
            <p className="opacity-0">Action</p>
          </thead>
          <tbody className=" flex bg-white   ">
            <div className="hidden sm:block flex-auto divide-y divide-slate-300  ">
              <div className=" py-3 font-medium text-sprPrimary opacity-0">Action</div>
              {riceData.map((rice) => (
                <div className=" px-1 py-2 flex gap-1 border-l border-slate-400">
                  <button
                    className=" p-1 mb-1   bg-gradient-to-b from-sprPrimary to-sprPrimaryDarkest hover:bg-gradient-to-t hover:from-sprPrimaryLight hover:to-sprPrimaryLight   rounded-full   shadow-slate-300 "
                    onClick={() => {
                      setIsModalOpen(true)
                      setModalId(rice.id)
                      setModalSeason(rice.riceSeason)
                      setModalYear(rice.riceYear)
                      getRiceData(rice.id)
                    }}
                  >
                    <EditIcon className="h-4" />
                  </button>

                </div>
              ))}
            </div>
          </tbody>
        </table>

        <ModalGrainUpdate open={isModalOpen} closeModal={()=>{setIsModalOpen(false)}} modalId={modalId}  modalYear={modalYear} modalSeason={modalSeason} gcRiceData={gcRiceData}/>
      </div>

    </>


  )
}
