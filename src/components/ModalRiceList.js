import React from 'react'
import { ReactComponent as CloseIcon } from '../assets/close.svg';
import { ReactComponent as IllusThree } from '../assets/empty-illustration-3.svg';


export default function ModalRiceList({open, closeModal, currentData}) {
    console.log(currentData);
    if (!open) return null;
  return (
      <div>
            <form>
                <div className=" fixed left-0 right-0 bottom-0 top-0 z-50 bg-black opacity-70 " />
                <div className=" flex flex-col fixed left-0 right-0 bottom-0 top-0  z-50  justify-center items-center ">
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

                </div>
            </form>


        </div>
  )
}
