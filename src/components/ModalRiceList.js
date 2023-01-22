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
                
                {/* <div className=" flex flex-col fixed left-0 right-0 bottom-0 top-0  z-50  justify-center items-center ">
                    <div className='h-96 w-96 bg-white rounded-md relative flex justify-center items-center flex-col p-4 gap-2 '>
                        <div className="absolute top-4  right-4 z-50 ">
                            <CloseIcon className='group-hover:stroke-white stroke-sprGray50 hover:stroke-sprGray80 active:stroke-sprPrimary h-5' onClick={closeModal} />
                        </div>
                        <div className="flex flex-col gap-4 z-10  bg-sprPrimaryLight  rounded-md p-8">
                            <h1 className='text-3xl font-bold text-white'>CL-R{currentData.accessionId}</h1>
                            <div className='flex '>
                                <h3 className='font-medium text-xl text-sprPrimaryDarkest'>Season:</h3>
                                
                                <h3 className='text-xl  font-medium text-white'> {currentData.riceSeason} Season</h3>
                            </div>
                            <div className='flex '>
                                <h3 className='font-medium text-xl text-sprPrimaryDarkest'>Year:</h3>
                                <h3 className='text-xl  font-medium text-white'> {currentData.riceYear}</h3>
                            </div>
                            <div className='flex '>
                                <h3 className='font-medium text-xl text-sprPrimaryDarkest'>Shelf No. :</h3>
                                <h3 className='text-xl  font-medium text-white'> #{currentData.shelfNum} </h3>
                            </div>
                            
                        </div>
                       
<div className='w-full h-full flex justify-center items-center absolute p-5' >
<IllusThree className='stroke-yellow-400/10'/>
</div>
                    </div>
                </div> */}
            <div className=" flex flex-col absolute left-3 right-3 bottom-16 top-16 sm:left-12 sm:right-12 md:left-28 md:right-28 lg:left-1/4 lg:right-1/4 z-50 bg-white rounded-xl  px-4 pt-8 pb-4   ">
                  {/* button */}
             <div className="absolute right-4 top-4 z-50 ">
                
                <CloseIcon className='group-hover:stroke-white stroke-sprGray50 hover:stroke-sprGray80 active:stroke-sprPrimary h-5' onClick={closeModal} />
            </div>
               <div>
               <p className='text-4xl font-semibold text-sprPrimary'>CL-R{currentData.accessionId}</p>
                <p className='text-sprPrimary'>{currentData.riceSeason} Season</p>
                <p className='text-sprPrimary'>Year {currentData.riceYear}</p>
                <p className='text-sprPrimary'>Shelf Number {currentData.shelfNum}</p>

               </div>
                <div>
                <p>Cavans</p>
                {ycData.cavans === ''?'---':ycData.cavans}
                <p>Cooked Rice Aroma</p>
                {ycData.cookedRiceAroma=== ''?'---':ycData.cookedRiceAroma}
                <p>Grain Aroma</p>
                {ycData.grainAroma=== ''?'---':ycData.grainAroma}
                <p>Grain Yield</p>
                {ycData.grainYield === ''?'---': ycData.grainYield}
                <p>Kilogram</p>
                {ycData.kilogram === ''?'---': ycData.kilogram} 
                <p>Leaf Aroma</p>
                {ycData.leafAroma === ''?'---': ycData.leafAroma}
                </div>

                </div>


        </div>
  )
}
