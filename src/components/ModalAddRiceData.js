import React from 'react'
import ReactDom  from 'react-dom'

const ModalAddRiceData = ({open, children, onClose}) => {
  if(!open) return null
  
  return ReactDom.createPortal (
   <>
    <div className=" fixed left-0 right-0 bottom-0 top-0  bg-black opacity-70 " onClick={onClose}/>
    <div className=" hidden sm:flex flex-col absolute left-20 right-20 bottom-16 top-16  bg-white rounded-md  p-8  px-6 md:left-52 md:right-52  lg:left-80 lg:right-80  ">
     
      {children}
    </div>
  </>,
  document.getElementById('portal')
  )
}

export default ModalAddRiceData