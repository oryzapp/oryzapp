import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";
import { ReactComponent as OryzappLogo } from "../assets/oryzapp-logo.svg"
import { ReactComponent as ProfileIcon } from "../assets/profile.svg"
import { auth } from "../firebase-config";
import ModalClick from "./ModalClick";
import ModalTopbar from "./ModalClick";
import ModalSignout from "./ModalTopbarBox";

export default function Topbar() {


  const [user,setUser] = useState([])
  useEffect(()=>{
		const unsub = onAuthStateChanged(auth, async (user) => {
      setUser(user)
      
    })
    return unsub

  })

  const [isModalOpen, setIsModalOpen] = useState(false)


  return (
    <div className=" my-2 -ml-4  mr-2   pl-4 sm:pl-8 sm:pr-2 py-3 flex items-center space  sm:bg-white rounded-xl">
      <div className="flex-auto ml-4 sm:ml-0">
        <OryzappLogo className="h-6" />
      </div>
      <div className=" h-6 w-full flex flex-auto gap-2 justify-end">
        <p className="hidden sm:block">
          Kumusta, <strong className="text-sprPrimary">{user?.email}</strong>
        </p>
        <div className="h-6 w-6 rounded-full bg-sprPrimaryLight/20 relative" onClick={() => { setIsModalOpen(true)}}>
          <ProfileIcon className="fill-sprPrimary"/>
        </div>
      </div>
      <ModalClick open={isModalOpen} closeModal={()=>{setIsModalOpen(false)}}/>
    </div>
  );
}
