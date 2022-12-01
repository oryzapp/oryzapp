import { collection, onSnapshot } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { ReactComponent as SearchIcon } from "../assets/search-icon.svg"
import closeIcon from "../assets/close.svg";

import db from "../firebase-config";


export default function ModalSearch({open, closeModal}) {
    const [riceAccessions, setRiceAccessions] = useState([])
    // Get All Accessions
    useEffect(()=>{
        const collectionRef = collection(db, "SPR/Rice_Accessions/Accession_IDs");
        const unsub = onSnapshot(collectionRef, (snapshot) => {
			setRiceAccessions(
				snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
			);
		});
		return unsub;
    },[])
    // console.log(riceAccessions);

    // Get Search Input
    const [searchInput, setSearchInput] = useState('')
  
//  useEffect(()=>{
//    if(searchInput !== ''){
//     console.log('I am Find');
//     riceAccessions.map((rice)=>{
//         const match = rice.searchIndex     
//         const trial = match.includes(searchInput)
//         if (trial === true){
//             console.log('I exist' + rice.accessionId)
//         }
//     })
//    }
//    else{
//     console.log('none');
//    }
//  },[searchInput])
const [searched, setSearched] = useState([])
 useEffect(()=>{

    var searchList = []
   if(searchInput !== ''){
    console.log('I am Find');
    riceAccessions.map((rice)=>{
        // const index = rice.searchIndex
        // console.log(index);
        // console.log(rice.searchIndex);
        const match = rice.searchIndex
        // console.log('bbbbb');
        // console.log(typeof match);
        // console.log(match);
        const trial = match.includes(searchInput)
        if (trial === true){
            // console.log('trial exists-----------------' + trial);
            console.log('I exist' + rice.accessionId)
            // setSearched(rice.accessionId)
            searchList.push(rice.accessionId)

        }
        // match.searchIndex.includes(('Boom'))
        // console.log(match);
    })
   }
   else{
    console.log('none');
   }
   console.log('I am Searched');
   console.log(searchList);
   setSearched(searchList)
 },[searchInput])

    if(!open) return null;
  return (
    <div>
		    <div className=" fixed left-0 right-0 bottom-0 top-0 z-50 bg-black opacity-70 " />
				<div className=" hidden sm:flex flex-col absolute left-20 right-20 bottom-32 top-16 z-50 bg-white rounded-md  p-8   md:left-52 md:right-52   lg:bottom-40 lg:left-96 lg:right-96  ">
                    <div className='flex gap-2 items-center'>
                        <SearchIcon className='stroke-sprPrimary'/>
                        <div className='flex-auto relative flex items-center'>
                          <input type="text" className='bg-slate-200 w-full rounded-full p-1 text-sm' placeholder='Search Accession' value={searchInput} onChange={e=> setSearchInput(e.target.value)}/>
                            {/* <img src={closeIcon} className='-m-5 h-3 hover:stroke-black' /> */}
                        

                        </div>
                    </div>
                    <div className='bg-blue-200 flex-auto'>
                        {
                         searchInput !== ''?
                         <div>{searched.map((item)=>(
                            <div>{item}</div>
                         ))}</div>:
                         <div>Nope</div>
                        }                            
                    </div>

                </div>
    </div>
  )
}
