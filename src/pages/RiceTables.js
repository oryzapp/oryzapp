import { useState } from "react";
import { ReactComponent as RSicon } from "../assets/reproductive-stage-icon.svg";
import { ReactComponent as GCicon } from "../assets/grain-characteristics-icon.svg";
import { ReactComponent as VSicon } from "../assets/vegetative-stage-icon.svg";
import { ReactComponent as YCicon } from "../assets/yield-components-icon.svg";

const RiceTables = ({ onChange, activeStage }) => {
    const [state, setState] = useState(1)


    const handleClick = (page, index) => {
        setState(index)
        onChange(page)
    }

    return (
        <nav className=" h-full w-12 ">
            <ul className="flex flex-col h-full gap-1">
                <button className={state === 1 ? "group flex items-center justify-center  flex-auto   bg-sprPrimary500 rounded-l-lg relative" :
                    " group flex items-center justify-center   flex-auto  hover:bg-sprPrimary300 bg-slate-100 rounded-l-lg relative"}
                    onClick={() => {
                        handleClick('vegetative-stage', 1)
                        activeStage('Vegetative_Stage')
                    }}>
                    <VSicon className={state !== 1 ? " group-hover:stroke-white stroke-slate-500" : "stroke-white"} />
                    < p className="text-xs whitespace-nowrap bg-slate-500 text-white p-1 font-medium rounded-md absolute left-0 bottom-8 hidden group-hover:block z-50   ">Vegetative Stage</p>
                </button>
                <button className={state === 2 ? "group flex items-center justify-center  flex-auto  bg-sprPrimary500 rounded-l-lg relative" :
                    " group flex items-center justify-center   flex-auto  hover:bg-sprPrimary300 bg-slate-100 rounded-l-lg relative"}
                    onClick={() => {
                        handleClick('reproductive-stage', 2)
                        activeStage('Reproductive_Stage')
                    }}>
                    <RSicon className={state !== 2 ? " group-hover:stroke-white stroke-slate-500" : "stroke-white "} />
                    <p className="text-xs whitespace-nowrap bg-slate-500 text-white p-1 font-medium rounded-md absolute left-0 bottom-8 hidden group-hover:block z-50 ">Reproductive Stage</p>
                </button>
                <button className={state === 3 ? "group flex items-center justify-center flex-auto  bg-sprPrimary500 rounded-l-lg relative" :
                    "group flex items-center justify-center   flex-auto  hover:bg-sprPrimary300 bg-slate-100 rounded-l-lg relative"}
                    onClick={() => {
                        handleClick('grain-characteristics', 3)
                        activeStage('Grain_Characteristics')

                    }}>
                    <GCicon className={state !== 3 ? " group-hover:stroke-white stroke-slate-500" : "stroke-white "} />
                    <p className="text-xs whitespace-nowrap bg-slate-500 text-white p-1 font-medium rounded-md absolute left-0 bottom-8  hidden group-hover:block  z-50 ">Grain Characteristics</p>
                </button>
                <button className={state === 4 ? "group flex items-center  justify-center flex-auto  bg-sprPrimary500  rounded-l-lg relative" :
                    " group flex items-center justify-center   flex-auto hover:bg-sprPrimary300 bg-slate-100 rounded-l-lg relative"}
                    onClick={() => {
                        handleClick('yield-components', 4)
                        activeStage('Yield_Components')
                    }}>
                    <YCicon className={state !== 4 ? " group-hover:fill-white fill-slate-500" : "fill-white "} />
                    <p className="text-xs whitespace-nowrap bg-slate-500 text-white p-1 font-medium rounded-md absolute left-0 bottom-8 hidden group-hover:block  z-50 ">Yield Components</p>
                </button>
            </ul>
        </nav>


    )
}

export default RiceTables

