import { useState } from "react";
import ModalRiceInfo from "../components/ModalRiceInfo";
import closeIcon from '../assets/close.svg'
import { QrReader } from "react-qr-reader";
export default function ScanCode() {

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [qrData, setQrData] = useState('No Result')
  return (
    <>
      {/* Header */}
      <header className=" flex items-center">
        <h1 className="text-3xl font-bold text-sprBlack opacity-80">
          Scan Code
        </h1>
      </header>

      {/* Main */}
      <section className=" w-full flex flex-auto overflow-auto rounded-sm scrollbar">
        <div className="bg-blue-400 w-1/4 flex flex-col">
          <div className="bg-yellow-500 h-3/4 p-16 flex flex-col items-center">
            <h3 className="bg-blue-300">
              Scan Here
            </h3>
            <div className="bg-slate-300 h-60 w-60 rounded-md ">
              <QrReader onResult={(result, error) => {
                if (!!result) {
                  setQrData(result?.text);
                }
                if (!!error) {
                  console.info(error);
                }
              }}
                style={{ height: '100%' }}
              />

            </div>
          </div>

          <div className="bg-yellow-800 h-1/4">b</div>
        </div>
        <div className="bg-red-600 w-3/4" >
          <ModalRiceInfo open={modalIsOpen} >
            <div className=" fixed left-0 right-0 bottom-0 top-0 z-50 bg-black opacity-70 " />
            <div className=" flex flex-col absolute left-3 right-3 bottom-16 top-16 sm:left-12 sm:right-12 md:left-28 md:right-28 lg:left-1/4 lg:right-1/4 z-50 bg-red-500 rounded-md  px-6 pt-10 pb-6   ">
              <div className="absolute right-5 z-50 ">
                <button onClick={() => setModalIsOpen(false)}>
                  <img className="relative" src={closeIcon} alt="" />
                </button>
              </div>
            </div>
          </ModalRiceInfo>
        </div>

      </section>
    </>
  );
}
