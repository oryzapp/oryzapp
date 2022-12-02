import { collection, onSnapshot } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { ReactComponent as SearchIcon } from "../assets/search-icon.svg"
import closeIcon from "../assets/close.svg";

import db from "../firebase-config";
import ModalAccessionsInfo from './ModalAccessionsInfo';


export default function ModalSearch({ open, closeModal }) {
  const [riceAccessions, setRiceAccessions] = useState([])
  // Get All Accessions
  useEffect(() => {
    const collectionRef = collection(db, "SPR/Rice_Accessions/Accession_IDs");
    const unsub = onSnapshot(collectionRef, (snapshot) => {
      setRiceAccessions(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
    return unsub;
  }, [])

  const [searchInput, setSearchInput] = useState('')
  const [searched, setSearched] = useState([])
  useEffect(() => {

    var searchList = []
    if (searchInput !== '') {
      console.log('I am Find');
      riceAccessions.map((rice) => {
        const match = rice.searchIndex.toLowerCase()
        const search = match.includes(searchInput)
        if (search === true) {
          console.log('I exist' + rice.accessionId)
          searchList.push({
            accession: rice.accessionId,
            variety: rice.variety,
            classification: rice.classification,
            source: rice.source
          })
        }
      })
    }
    else {
      console.log('none');
    }
    setSearched(searchList)
  }, [searchInput])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentAccessionId, setCurrentAccessionId] = useState('')
  if (!open) return null;
  return (
    <div>
      <div className=" fixed left-0 right-0 bottom-0 top-0 z-50 bg-black opacity-70 " />
      <div className=" hidden sm:flex gap-3 flex-col absolute left-20 right-20 bottom-32 top-16 z-50 bg-white rounded-md  p-8   md:left-52 md:right-52   lg:bottom-40 lg:left-96 lg:right-96  ">
        <div className="absolute right-5 z-50 ">
          <button onClick={() => { closeModal() }} >
            <img className="relative" src={closeIcon} alt="" />
          </button>
        </div>
        <div className='flex gap-2 items-center'>
          <SearchIcon className='stroke-sprPrimary' />
          <div className='flex-auto relative flex items-center'>
            <input type="text" className='bg-slate-100 w-full rounded-full p-1 text-sm' placeholder='Search Accession' value={searchInput} onChange={e => setSearchInput(e.target.value)} />
            <img src={closeIcon} className='-m-5 h-3 hover:stroke-black' onClick={() => {
              setSearchInput('')
            }} />


          </div>
        </div>
        <div className='bg-slate-100 flex-auto overflow-auto scrollbar rounded-sm'>
          {
            searchInput !== '' ?
              <div>{searched.map((item) => (
                <div className='bg-slate-200 m-2 rounded-md p-2 hover:bg-sprPrimaryOffLight active:bg-sprPrimary' onClick={() => {
                  setIsModalOpen(true)
                  setCurrentAccessionId(item.accession)
                }}>
                  <div className='text-xl font-bold'>{item.accession}</div>
                  <div className='flex flex-col '>
                    <div className='text-xs font-medium text-sprGray80'>{item.variety}</div>
                    <div className='text-xs font-medium text-sprGray80'>{item.source}</div>
                    <div className='text-xs font-medium text-sprGray80'>{item.classification}</div>
                  </div>
                </div>
              ))}</div> :
              <div className='flex justify-center items-center  h-full'>
                <h1 className='text-sprGray50  '>No Recent Searches</h1>
              </div>
          }
        </div>

      </div>

      <ModalAccessionsInfo open={isModalOpen} modalId={currentAccessionId} closeModal={() => { setIsModalOpen(false) }} />
    </div>
  )
}
