import React from 'react'
import { ReactComponent as CloseIcon } from '../assets/close.svg';
import { ReactComponent as IllusThree } from '../assets/empty-illustration-3.svg';


export default function ModalRiceList({open, closeModal, currentData, ycData}) {
    console.log(currentData);
    console.log('Hi I am YC DATA');
    console.log(ycData.cavans);
    if (!open) return null;
  return (
      <div>
                <div className=" fixed left-0 right-0 bottom-0 top-0 z-50 bg-black opacity-70 " />
                
              
            <div className=" flex flex-col absolute left-3 right-3 bottom-16 top-16 sm:left-12 sm:right-12 md:left-28 md:right-28 lg:left-1/4 lg:right-1/4 z-50  rounded-xl  px-4 pt-8 pb-4  ">
                
             <div className='bg-white relative px-12 pt-4 pb-8 rounded-xl'>
                  {/* button */}
             <div className="absolute right-4 top-4 z-50 ">                                                
                
                <CloseIcon className='group-hover:stroke-white stroke-sprGray50 hover:stroke-sprGray80 active:stroke-sprPrimary h-5' onClick={closeModal} />
            </div>
             <div >
               <p className='text-4xl font-semibold text-sprPrimary '>CL-R{currentData.accessionId}</p>
               <div className='bg-sprPrimarySuperLight/10 rounded-md p-3 mb-4'>
                
                <p className='text-sprPrimary'>Season : {currentData.riceSeason} Season</p>
                <p className='text-sprPrimary'>Year: {currentData.riceYear}</p>
                <p className='text-sprPrimary'>Shelf Number : {currentData.shelfNum}</p>
                </div>
               </div>
                <div className='bg-sprPrimarySuperLight/25 rounded-md p-3'>
               <div className='flex mb-2'>
               <p className='inline-block flex-auto '>Cavans</p>
                <div className='bg-white w-1/2 px-2 rounded-full'>{ycData.cavans === ''?'---':ycData.cavans}</div>
               </div>
               <div className='flex mb-2'>
               <p className='inline-block flex-auto '>Cooked Rice Aroma</p>
                <div className='bg-white w-1/2 px-2 rounded-full'>{ycData.cookedRiceAroma=== ''?'---':ycData.cookedRiceAroma}</div>
               </div>
               <div className='flex mb-2'>
               <p className='inline-block flex-auto '>Grain Aroma</p>
                <div className='bg-white w-1/2 px-2 rounded-full'>{ycData.grainAroma=== ''?'---':ycData.grainAroma}</div>
               </div>
               <div className='flex mb-2'>
               <p className='inline-block flex-auto '>Grain Yield</p>
                <div className='bg-white w-1/2 px-2 rounded-full'>{ycData.grainYield === ''?'---': ycData.grainYield}</div>
               </div>
               <div className='flex mb-2'>
               <p className='inline-block flex-auto '>Kilogram</p>
                <div className='bg-white w-1/2 px-2 rounded-full'>{ycData.kilogram === ''?'---': ycData.kilogram}</div>
               </div>
               <div className='flex mb-2'>
               <p className='inline-block flex-auto '>Leaf Aroma</p>
                <div className='bg-white w-1/2 px-2 rounded-full'>{ycData.leafAroma === ''?'---': ycData.leafAroma}</div>
               </div>
               <div className='flex mb-2'>
               <p className='inline-block flex-auto '>Cavans</p>
                <div className='bg-white w-1/2 px-2 rounded-full'>{ycData.cavans === ''?'---':ycData.cavans}</div>
               </div>

               
            
                </div>
             </div>

                </div>


        </div>
  )
}
