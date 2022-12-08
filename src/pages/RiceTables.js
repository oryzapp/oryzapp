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
        <nav className=" h-full w-9 ">
            <ul className="flex flex-col h-full gap-1">
                <button className={state === 1 ? "group flex items-center  flex-auto   bg-sprPrimary rounded-l-lg relative" :
                    " group flex items-center  flex-auto  hover:bg-sprPrimaryLight bg-slate-100 rounded-l-lg relative"}
                    onClick={() => {
                        handleClick('vegetative-stage', 1)
                        activeStage('Vegetative_Stage')
                    }}>
                    <VSicon className=" group-hover:stroke-white" fill="none" stroke={state !== 1 ? "#888A89" : "white"} />
                    <p className="text-xs whitespace-nowrap bg-sprGray60 text-white p-1 font-medium rounded-md absolute bottom-8 hidden group-hover:block   ">Vegetative Stage</p>
                </button>
                <button className={state === 2 ? "group flex items-center  flex-auto  bg-sprPrimary rounded-l-lg relative" :
                    " group flex items-center  flex-auto  hover:bg-sprPrimaryLight bg-slate-100 rounded-l-lg relative"}
                    onClick={() =>{
                        handleClick('reproductive-stage', 2)
                        activeStage('Reproductive_Stage')
                    }}>
                    <RSicon className=" group-hover:stroke-white" fill="none" stroke={state !== 2 ? "#888A89" : "white"} />
                    <p className="text-xs whitespace-nowrap bg-sprGray60 text-white p-1 font-medium rounded-md absolute bottom-8 hidden group-hover:block   ">Reproductive Stage</p>
                </button>
                <button className={state === 3 ? "group flex items-center  flex-auto  bg-sprPrimary rounded-l-lg relative" :
                    "group flex items-center  flex-auto  hover:bg-sprPrimaryLight bg-slate-100 rounded-l-lg relative"}
                    onClick={() => {
                        handleClick('grain-characteristics', 3)
                        activeStage('Grain_Characteristics')

                    }}>
                    <GCicon className=" group-hover:stroke-white" fill="none" stroke={state !== 3 ? "#888A89" : "white"} />
                    <p className="text-xs whitespace-nowrap bg-sprGray60 text-white p-1 font-medium rounded-md absolute bottom-8  hidden group-hover:block   ">Grain Characteristics</p>
                </button>
                <button className={state === 4 ? "group flex items-center  flex-auto  bg-sprPrimary  rounded-l-lg relative" :
                    " group flex items-center  flex-auto hover:bg-sprPrimaryLight bg-slate-100 rounded-l-lg relative"}
                    onClick={() => {
                    handleClick('yield-components', 4)
                    activeStage('Yield_Components')
                    }}>
                    <YCicon className=" group-hover:stroke-white" fill="none" stroke={state !== 4 ? "#888A89" : "white"} />
                    <p className="text-xs whitespace-nowrap bg-sprGray60 text-white p-1 font-medium rounded-md absolute bottom-8 hidden group-hover:block   ">Yield Components</p>
                </button>
            </ul>
        </nav>


    )
}

export default RiceTables

