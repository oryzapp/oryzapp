import React from "react";
import closeIcon from "../assets/close.svg";
import ReactDom from "react-dom";

export default function ModalRiceAcc({ open, children }) {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div className=" fixed left-0 right-0 bottom-0 top-0 z-50 bg-black opacity-70 " />
      <div className=" flex flex-col absolute left-20 right-20 bottom-32 top-16 z-50 bg-white rounded-md  px-10 pt-10 pb-6  md:left-52 md:right-52  lg:left-96 lg:right-96  ">
          
        {children}
      </div>
    </>,
    document.getElementById("portal")
  );
}
