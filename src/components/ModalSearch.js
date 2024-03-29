import { collection, onSnapshot } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { ReactComponent as SearchIcon } from "../assets/search-icon.svg"
// import closeIcon from "../assets/close.svg";
import { ReactComponent as CloseIcon } from '../assets/close.svg';

import db from "../firebase-config";
import ModalAccessionsInfo from './ModalAccessionsInfo';
import { useRef } from 'react';


export default function ModalSearch({ open, closeModal }) {
  const [riceAccessions, setRiceAccessions] = useState([])
  const searchRef = useRef(null)
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
      riceAccessions.map((rice) => {
        const match = rice.searchIndex.toLowerCase()
        const search = match.includes(searchInput)
        if (search === true) {
          searchList.push({
            id:rice.id,
            accession: rice.accessionId,
            variety: rice.variety,
            classification: rice.classification,
            source: rice.source
          })
        }
      })
    }
    setSearched(searchList)
  }, [searchInput])

  useEffect(()=>{
    const inputSearch = document.getElementById('input-search')
    inputSearch?.focus()
  },[open])


  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentAccessionId, setCurrentAccessionId] = useState('')

  var key = 0;
  if (!open) return null;
  return (
    <div>
      <div className=" fixed left-0 right-0 bottom-0 top-0 z-50 bg-black opacity-70 " onClick={()=>{
        closeModal()
        setSearchInput('')
      }} />
      <div className="flex gap-3 flex-col absolute left-5 right-5 sm:left-20 sm:right-20 bottom-32 top-16 z-50 bg-white rounded-md  p-8   md:left-52 md:right-52   lg:bottom-40 lg:left-96 lg:right-96  " >
        <div className="absolute top-3 right-3 z-50 ">
          <CloseIcon className='group-hover:stroke-white stroke-sprGray50 hover:stroke-sprGray80 active:stroke-sprPrimary h-5' onClick={()=>{
        closeModal()
        setSearchInput('')
      }}/>
        </div>
        <div className='flex pt-3 gap-2 items-center'>
          <SearchIcon className='stroke-sprPrimary' />
          <div className='flex-auto relative flex items-center'>
            <input ref={searchRef} type="text" id='input-search' className=' bg-slate-100 w-full rounded-full p-1 text-sm focus:outline-none focus:ring-1 focus:ring-sprPrimary focus:bg-sprPrimaryOffLight/30' placeholder='Search Accession' value={searchInput} onChange={e => setSearchInput(e.target.value)} />
            <CloseIcon className='-m-5 h-4 rounded-full p-1 hover:bg-sprGray10 stroke-sprGray40 hover:stroke-sprGray50 active:stroke-sprPrimary' onClick={() => {
              setSearchInput('')
            }} />


          </div>
        </div>
        <div className='bg-slate-100 flex-auto overflow-auto scrollbar rounded-sm'>
          {
            searchInput !== '' ?
              <div>{searched.map((item) => (
                <div className='bg-white m-2 rounded-md p-2 hover:bg-sprPrimaryOffLight/80 active:bg-sprPrimary' onClick={() => {
                  setIsModalOpen(true)
                  setCurrentAccessionId(item.accession)
                }}>
                  <div className='text-xl font-bold text-sprPrimaryDark'>CL-R{item.accession}</div>
                  <div className='flex flex-col '>
                    <div className='text-xs font-medium text-sprGray80' key={`${item.id}${key+=1}`}>{item.variety}</div>
                    <div className='text-xs font-medium text-sprGray80' key={`${item.id}${key+=1}`}>{item.source}</div>
                    <div className='text-xs font-medium text-sprGray80'key={`${item.id}${key+=1}`}>{item.classification}</div>
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
