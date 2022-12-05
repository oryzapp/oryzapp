import React from 'react'
import ModalSignout from './ModalSignout'

export default function ModalClick({open, closeModal}) {
  if (!open) return null;

  return (
    <div>
    <div className='absolute top-0 bottom-0 right-0 left-0 z-20' ></div>
<ModalSignout />
    </div>
  )
}
