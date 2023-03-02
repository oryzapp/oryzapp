import React, { useEffect, useState } from 'react'
import db from "../firebase-config";
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { ReactComponent as CloseIcon } from '../assets/close.svg';
import ModalSuccess from './ModalSuccess';




export default function ModalYieldUpdate({ open, closeModal, modalId, modalYear, modalSeason, ycRiceData }) {
  const [riceData, setRiceData] = useState({
    cavans: '',
    kilogram: '',
    grainYield: '',
    tonHa: '',
    cookedRiceAroma: '',
    grainAroma: '',
    leafAroma: '',
  })

  // Success Prompt
  const [isPromptOpen, setIsPromptOpen] = useState(false)

  // When Edit is Clicked Passed YcData is set on riceData to show on Input.
  useEffect(() => {
    setRiceData({
      cavans: ycRiceData.cavans,
      kilogram: ycRiceData.kilogram,
      grainYield: ycRiceData.grainYield,
      tonHa: ycRiceData.tonHa,
      cookedRiceAroma: ycRiceData.cookedRiceAroma,
      grainAroma: ycRiceData.grainAroma,
      leafAroma: ycRiceData.leafAroma,
    })
  }, [ycRiceData])
  // Get Inputs
  const handleChange = (e) => {
    setRiceData({
      ...riceData,
      [e.target.name]: e.target.value,
    });
  }

  // Submit the Edit
  const submitEdit = async (e) => {
    try {
      e.preventDefault()


      const docRef = doc(db, `SPR/Rice_Seasons/Seasons/${modalSeason}_Season/Stages/Yield_Components/YC_Raw_Rice_Data`, modalId)
      const ycPayLoad = {
        cavans: riceData.cavans,
        kilogram: riceData.kilogram,
        grainYield: riceData.grainYield,
        tonHa: riceData.tonHa,
        cookedRiceAroma: riceData.cookedRiceAroma,
        grainAroma: riceData.grainAroma,
        leafAroma: riceData.leafAroma,
        searchIndex: `${riceData.accessionId} ${riceData.shelfNum} ${riceData.cavans} ${riceData.kilogram} ${riceData.grainYield} ${riceData.tonHa} ${riceData.cookedRiceAroma} ${riceData.grainAroma} ${riceData.leafAroma}`,
        timestamp: serverTimestamp(),
      };
      await updateDoc(docRef, ycPayLoad);
      setIsPromptOpen(true)
      setTimeout(() => {
        setIsPromptOpen(false)
        closeModal()
      }, 1000)
    } catch (error) {
      console.log(error);
    }
  }

  if (!open) return null;
  return (
    <div>
      <div className="absolute top-0  right-0 bottom-0 left-0 text-center " >
        <ModalSuccess open={isPromptOpen} close={() => { setIsPromptOpen(false) }} message={'Yield Data Updated Successfully!'} />
      </div>
      <form onSubmit={submitEdit}>
        <div className=" fixed left-0 right-0 bottom-0 top-0  bg-black opacity-70 " onClick={closeModal} />
        <div className=" hidden sm:flex flex-col absolute left-20 right-20 bottom-32 top-16 z-40 bg-white rounded-md  p-8   md:left-52 md:right-52  lg:left-96 lg:right-96  ">
          <div className="absolute right-4 top-4 z-50 ">

            <CloseIcon className='group-hover:stroke-white stroke-sprGray50 hover:stroke-sprGray80 active:stroke-sprPrimary h-5' onClick={closeModal} />
          </div>

          <div className="flex-auto flex flex-col  overflow-hidden">
            <h1 className="page-header text-2xl font-bold text-sprGray70 inline-block">Update Yield Data</h1>
            <p className="font-medium text-xl text-sprPrimaryDark">{modalId}</p>
            <div className="  flex overflow-auto flex-auto pt-3 text-sprBlack scrollbar">
              <div className='flex-auto flex flex-col'>
                <div className="flex flex-col p-2 pb-0">
                  <div className="grid grid-cols-2 gap-4 bg-white text-sm">
                    <div className="flex flex-col bg-white px-6">
                      <label className="text-sprPrimary" htmlFor="">Cavans</label>
                      <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="cavans" value={riceData.cavans} onChange={handleChange} /></div>
                    <div className="flex flex-col bg-white px-6">
                      <label className="text-sprPrimary" htmlFor="">Kilogram</label>
                      <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="kilogram" value={riceData.kilogram} onChange={handleChange} /></div>
                    <div className="flex flex-col bg-white px-6">
                      <label className="text-sprPrimary" htmlFor="">Grain Yield</label>
                      <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="grainYield" value={riceData.grainYield} onChange={handleChange} /></div>
                    <div className="flex flex-col bg-white px-6">
                      <label className="text-sprPrimary" htmlFor="">Ton/Ha</label>
                      <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="tonHa" value={riceData.tonHa} onChange={handleChange} /></div>
                  </div>



                </div>
                <div className="flex flex-col pt-3 p-2 pb-0">
                  <div className="text-xs uppercase text-sprBlack font-medium">Aroma</div>
                  <div className="grid grid-cols-2 gap-4 bg-white text-sm">
                    <div className="flex flex-col bg-white px-6">
                      <label className="text-sprPrimary" htmlFor="">Cooked Rice Aroma</label>
                      <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="cookedRiceAroma" value={riceData.cookedRiceAroma} onChange={handleChange} /></div>
                    <div className="flex flex-col bg-white px-6">
                      <label className="text-sprPrimary" htmlFor="">Grain Aroma</label>
                      <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="grainAroma" value={riceData.grainAroma} onChange={handleChange} /></div>
                    <div className="flex flex-col bg-white px-6">
                      <label className="text-sprPrimary" htmlFor="">Leaf Aroma</label>
                      <input className="rounded-full px-1 py-px border border-sprInactiveGray focus:border-none focus:outline-none focus:ring-2 focus:ring-sprPrimary" type="text" name="leafAroma" value={riceData.leafAroma} onChange={handleChange} /></div>
                  </div>



                </div>

              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <button
                className="bg-sprGray30 rounded-full py-2 px-3 text-sm font-medium text-white shadow-slate-300"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-sprPrimary rounded-full py-2 px-3 text-sm font-medium text-white shadow-slate-300"
              >
                Update
              </button>
            </div>



          </div>


        </div>
      </form>
    </div>
  )
}
