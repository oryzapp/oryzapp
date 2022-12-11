import React from 'react'

export default function ModalViewImage({open, close, modalItems}) {
   
    if(!open) return null;
  return (
    <div className='absolute top-0 bottom-0 right-0 left-0 bg-black/80 z-50 flex justify-center items-center' onClick={close}>
        <div className='w-3/4  sm:w-1/2  bg-white rounded-md flex justify-center items-left p-4 px-6  flex-col'>
            <h1 className='text-2xl font-bold'>CL-R{modalItems.accession}</h1>
            <img className='rounded-sm h-auto max-h-96' src={modalItems.url} alt="" />
        </div>
    </div>
  )
}
