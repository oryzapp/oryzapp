import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";
import { ReactComponent as OryzappLogo } from "../assets/oryzapp-logo.svg"
import { ReactComponent as ProfileIcon } from "../assets/profile.svg"
import { ReactComponent as ProfileIcon2 } from "../assets/profile2.svg"
import { ReactComponent as Settings } from "../assets/settings.svg"
import {ReactComponent as OutIcon} from '../assets/logout.svg'
import { auth } from "../firebase-config";
import ModalProfile from "./ModalProfile";
import { doc, getDoc, setDoc } from "firebase/firestore";
import db from "../firebase-config";
import { useNavigate } from "react-router-dom";
import clsuLogo from "../assets/clsu-logo.png"
import clsuRETLogo from "../assets/clsu-ret-logo.png"
import ModalSettings from "./ModalSettings";


export default function Topbar() {

    const navigate = useNavigate()

  const [user,setUser] = useState([])
  const [userEmail,setUserEmail] = useState([])
  const[userInfo, setUserInfo] = useState([])

  const getUserInfo = async () =>{
    console.log(userEmail);

    const docRef = doc(db, 'AUTH',userEmail)
    const docSnap = await getDoc(docRef);
    setUserInfo(docSnap.data())

  }

  console.log(userInfo);

  useEffect(()=>{
    
    getUserInfo()

		const unsub = onAuthStateChanged(auth, async (user) => {
      console.log(user);
      console.log(user.email);
      setUser(user)
      setUserEmail(user?.email)

      
    }
    )


    
    return unsub

  },[user])

   const onSignOut = async () => {

	    const docRef = doc(db, 'AUTH',userEmail)
      const docSnap = await getDoc(docRef);
      
      const payLoad = {
        fname:docSnap.data()?.fname,
        lname:docSnap.data()?.lname,
       email: docSnap.data().email,
						password: docSnap.data().password,
						role: docSnap.data().role,
						type:'Old',
						searchIndex: `${docSnap.data().fname} ${docSnap.data().lname} ${docSnap.data().email}`
      }

      // Store Credentials
      await setDoc(docRef, payLoad);

      await auth.signOut()
			navigate('/login');
      // console.log(docSnap.data());
    
  }

  const [isProfileandlogout, setIsProfileandLogout] = useState(false)
  const [isProfileOn, setIsProfileOn] = useState(false)  
  const [isSettingsOn, setIsSettingsOn] = useState(false)  


  return (
    <>

<ModalProfile  open={isProfileOn} closeModal={()=>{
      setIsProfileOn(false)
    }}/>
<ModalSettings  open={isSettingsOn} closeModal={()=>{
      setIsSettingsOn(false)
    }}/>
     
      <div className=" my-2 -ml-4  mr-2   pl-4 sm:pl-8 sm:pr-2 py-3 flex items-center space  sm:bg-white rounded-xl">
      <div className="flex-auto ml-4 sm:ml-0 flex space-x-2">
      {/* <img src={clsuLogo} alt="" className="w-6 h-6 rounded-full" />
				<img src={clsuRETLogo} alt="" className="w-6 h-6 rounded-full" /> */}
        <OryzappLogo className="h-6" />
        
      </div>
      <div className=" h-6 w-full flex flex-auto gap-2 justify-end">
        <p className="hidden sm:block">
          Kumusta, <strong className="text-sprPrimary">{userInfo.fname}</strong>
        </p>
        <div className="h-6 w-6 rounded-full bg-sprPrimaryLight/20 relative" onClick={() => { setIsProfileandLogout(true)}}>
          <ProfileIcon className="fill-sprPrimary"/>
        </div>

        <div className={isProfileandlogout === true?'':'hidden'}>
            <div className=' h-screen w-screen top-0 bottom-0 right-0 left-0 z-30 absolute ' onClick={()=>{setIsProfileandLogout(false)}}/>
            <div className='w-32  bg-white absolute right-5 top-12 z-50 rounded-md drop-shadow-sm'>
          <div className='flex items-center p-3 group hover:bg-sprPrimaryLight rounded-t-md active:bg-sprPrimary ' onClick={()=>{setIsProfileOn(true)}} >
                  <ProfileIcon2 className='h-5 fill-sprGray70 group-hover:fill-white active:text-white '/>
                  <p className=' group-hover:text-white active:text-white cursor-pointer' >Profile</p>
          </div>
          <div className='flex items-center p-3 group hover:bg-sprPrimaryLight rounded-t-md active:bg-sprPrimary ' onClick={()=>{setIsSettingsOn(true)}} >
                  <Settings className='h-5 fill-sprGray70 group-hover:fill-white active:text-white '/>
                  <p className=' group-hover:text-white active:text-white cursor-pointer' >Settings</p>
          </div>
          <div className='flex items-center p-3 group hover:bg-sprPrimaryLight rounded-b-md active:bg-sprPrimary '>
                  <OutIcon className='h-5 fill-sprGray70 group-hover:fill-white active:text-white '/>
                  <p className=' group-hover:text-white active:text-white cursor-pointer'onClick={onSignOut} >Sign Out</p>
          </div>
            </div>
        </div>

      </div>

      
    </div>
    </>
  
  );
}
