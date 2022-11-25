import { collection } from "firebase/firestore";
import { useEffect } from "react";
import ReactDom from "react-dom";
import closeIcon from "../assets/close.svg";
import { ReactComponent as CalendarIcon } from "../assets/calendar-icon.svg"
import { ReactComponent as WetIcon } from "../assets/wet-icon.svg"
import { ReactComponent as DryIcon } from "../assets/dry-icon.svg"


export default function ModalAccessionsInfo({ open, modalId, closeModal, children }) {

    useEffect(() => {

    })


    const years = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2030]



    if (!open) return null;
    return ReactDom.createPortal(
        <>
            <div className=" fixed left-0 right-0 bottom-0 top-0 z-50 bg-black opacity-70 " />
            <div className=" flex flex-col absolute left-3 right-3 bottom-16 top-16 sm:left-12 sm:right-12 md:left-28 md:right-28 lg:left-1/4 lg:right-1/4 z-50 bg-white rounded-xl  px-4 pt-8 pb-4   ">
                {/* button */}
                <div className="absolute right-5 z-50 ">
                    <button onClick={closeModal} >
                        <img className="relative" src={closeIcon} alt="" />
                    </button>
                </div>
                {/* main */}
                <div className="bg-violet-500 flex-auto flex flex-col">
                    <div className="bg-green-900 w-full h-1/4 flex ">
                        <div className="bg-pink-600  w-1/4 p-3">
                            <div className="bg-yellow-400 h-full">image</div>
                        </div>
                        <div className="bg-pink-100 flex flex-col flex-auto">
                            <h1 className="text-2xl text-sprPrimaryDarkest font-bold">{modalId}</h1>

                        </div>
                    </div>
                    <div className=" w-full flex-auto flex flex-col ">
                        <div className=" bg-yellow-600 flex gap-3  w-3/4">
                            <div className="flex-auto bg-sprPrimaryOffLight flex p-2 justify-center rounded-t-lg">
                                <CalendarIcon stroke="#AFBE00" className="h-6" />
                                <select className=" bg-transparent text-sprPrimary text-lg font-medium " name="riceYear" >
                                    {
                                        years.map((e) =>
                                            <option value={e} >{e}</option>

                                        )
                                    }
                                </select>
                            </div>
                            <div className="flex-auto bg-yellow-200 flex  p-2 justify-center items-center rounded-t-lg gap-2">
                                <WetIcon fill="#AFBE00" className="h-6" />
                                <h1 className=" text-sprPrimary text-lg font-medium" >Wet Season</h1>

                            </div>
                            <div className="flex-auto bg-yellow-200 flex  p-2 justify-center items-center rounded-t-lg gap-2">
                                <DryIcon stroke="#AFBE00" className="h-6" />
                                <h1 className=" text-sprPrimary text-lg font-medium" >Dry Season</h1>

                            </div>

                        </div>
                        <div className="bg-sprPrimaryOffLight flex-auto">Contente</div>

                    </div>

                </div>
            </div>
        </>,
        document.getElementById('portal')
    )
}
