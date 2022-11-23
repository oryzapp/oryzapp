import { useState } from "react";
import { ReactComponent as OryzappLogo } from "../assets/oryzapp-logo.svg"

export default function Topbar() {

  const [show, setShow] = useState(false)


  return (
    <div className=" my-2 -ml-4  mr-2   pl-4 sm:pl-8 sm:pr-2 py-3 flex items-center space  sm:bg-white rounded-xl">
      <div className="flex-auto ml-4 sm:ml-0">
        <OryzappLogo className="h-6" />
      </div>
      <div className=" h-6 w-full flex flex-auto gap-2 justify-end">
        <p className="hidden sm:block">
          Kumusta, <strong className="text-sprPrimary">Juaan</strong>
        </p>
        <div className="h-6 w-6 rounded-full bg-black relative" onClick={() => { setShow(true) }}>
          <div className={show === true ? "bg-white rounded-md drop-shadow-md z-50 absolute right-0 top-10 p-2" : "hidden"}>
            <ul className="divide-y divide-slate-200">
              <h3>Something here</h3>
              <h3>Something here</h3>
              <h3>Sign Out</h3>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
