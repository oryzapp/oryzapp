import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";
import { ReactComponent as OryzappLogo } from "../assets/oryzapp-logo.svg"
import { ReactComponent as ProfileIcon } from "../assets/profile.svg"
import { ReactComponent as ProfileIcon2 } from "../assets/profile2.svg"
import { ReactComponent as Settings } from "../assets/settings.svg"
import { ReactComponent as OutIcon } from '../assets/logout.svg'
import { auth } from "../firebase-config";
import ModalProfile from "./ModalProfile";
import { doc, getDoc, setDoc } from "firebase/firestore";
import db from "../firebase-config";
import { useNavigate } from "react-router-dom";
import clsuLogo from "../assets/clsu-logo.png"
import clsuRETLogo from "../assets/clsu-ret-logo.png"
import ModalSettings from "./ModalSettings";
import { QRCodeCanvas } from "qrcode.react";
import { ReactComponent as EditIcon } from '../assets/edit-icon.svg'



export default function Topbar() {

  const navigate = useNavigate()

  const [user, setUser] = useState([])
  const [userEmail, setUserEmail] = useState([])
  const [userInfo, setUserInfo] = useState([])

  const getUserInfo = async () => {
    console.log(userEmail);

    const docRef = doc(db, 'AUTH', userEmail)
    const docSnap = await getDoc(docRef);
    setUserInfo(docSnap.data())

  }

  console.log(userInfo);


  useEffect(() => {

    getUserInfo()

    const unsub = onAuthStateChanged(auth, async (user) => {
      console.log(user);
      console.log(user.email);
      setUser(user)
      setUserEmail(user?.email)
    }
    )
    return unsub

  }, [user])

  const onSignOut = async () => {

    const docRef = doc(db, 'AUTH', userEmail)
    const docSnap = await getDoc(docRef);

    const payLoad = {
      fname: docSnap.data()?.fname,
      lname: docSnap.data()?.lname,
      email: docSnap.data().email,
      password: docSnap.data().password,
      role: docSnap.data().role,
      type: 'Old',
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

  const toQRCode = {
    email: userInfo?.email,
    password: userInfo?.password
  }

  // Download QR Code-------------->
  const downloadQR = () => {
    const canvas = document.getElementById(`qr-gen`);
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${userInfo?.email}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }



  return (
    <>

      <ModalProfile open={isProfileOn} closeModal={() => {
        setIsProfileOn(false)
      }} />
      <ModalSettings open={isSettingsOn} closeModal={() => {
        setIsSettingsOn(false)
      }} />

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
          <div className="h-6 w-6 rounded-full bg-slate-200 relative flex justify-center cursor-pointer" onClick={() => { setIsProfileandLogout(true) }}>
            <ProfileIcon className="fill-sprPrimary" />
            <h6 className='text-slate-900 uppercase'></h6>
            {/* <div className="bg-yellow-300 absolute top-0 bottom-0 right-0 left-0 h-screen w-screen z-30">bbb</div> */}

          </div>
        </div>

        <div className={isProfileandlogout === true ? '' : 'hidden'}>
          <div className=' h-screen w-screen top-0 bottom-0 right-0 left-0 z-30 absolute bg-blue-900/10' onClick={() => { setIsProfileandLogout(false) }} />
          <div className='  bg-white min-w-60 absolute right-5 top-12 z-50 rounded-md drop-shadow-sm p-3'>
            <div className=" flex border-b-2 border-slate-100">
              <h1 className="font-bold text-slate-900  text-center flex-auto">{userInfo.fname} {userInfo.lname}</h1>
              <EditIcon className="fill-slate-700 cursor-pointer hover:fill-slate-400 active:fill-slate-900 h-5 " onClick={() => { setIsSettingsOn(true) }} />
            </div>
            <div className="flex flex-col justify-center items-center p-3">


              <div className=" cursor-pointer  h-32 w-32 flex items-center justify-center hover:bg-sprPrimary/50 " onClick={downloadQR}>
                <QRCodeCanvas className='rounded-md ' value={JSON.stringify(toQRCode)} bgColor="rgba(0, 0,0, 0)" fgColor="rgba(18, 20, 20, 0.8)" includeMargin={false} size={100} />
                <QRCodeCanvas className='rounded-md hidden ' id={`qr-gen`} value={JSON.stringify(toQRCode)} bgColor="#FFFFFF" fgColor="rgba(18, 20, 20, 0.8)" includeMargin={true} size={200} />

              </div>
              {/* <h6 className="text-sm mb-3 underline text-sprPrimary"> <small>Download QR Code</small> </h6> */}

              <h1 className="font-medium text-sm">{userInfo.role} </h1>
              <h6 className="text-xs">{userInfo.email}</h6>


            </div>
            <div className="border-t-2 border-slate-100">
              {/* <div className='flex space-x-3 items-center group hover:bg-sprPrimaryLight  active:bg-sprPrimary rounded-md py-3 px-1' onClick={() => { setIsSettingsOn(true) }} >
                <Settings className='h-5 fill-sprGray70 group-hover:fill-white active:text-white ' />
                <p className=' group-hover:text-white active:text-white cursor-pointer' >Settings</p>
              </div> */}
              <div className='flex space-x-3  items-center group hover:bg-sprPrimaryLight  active:bg-sprPrimary rounded-md py-3 px-1 '>
                <OutIcon className='h-5 fill-sprGray70 group-hover:fill-white active:text-white ' />
                <p className=' group-hover:text-white active:text-white cursor-pointer' onClick={onSignOut} >Sign Out</p>
              </div>
            </div>
            {/* <div className='flex items-center p-3 group hover:bg-sprPrimaryLight rounded-t-md active:bg-sprPrimary ' onClick={() => { setIsProfileOn(true) }} >
              <ProfileIcon2 className='h-5 fill-sprGray70 group-hover:fill-white active:text-white ' />
              <p className=' group-hover:text-white active:text-white cursor-pointer' >Profile</p>
            </div>
            <div className='flex items-center p-3 group hover:bg-sprPrimaryLight rounded-t-md active:bg-sprPrimary ' onClick={() => { setIsSettingsOn(true) }} >
              <Settings className='h-5 fill-sprGray70 group-hover:fill-white active:text-white ' />
              <p className=' group-hover:text-white active:text-white cursor-pointer' >Settings</p>
            </div>
            <div className='flex items-center p-3 group hover:bg-sprPrimaryLight rounded-b-md active:bg-sprPrimary '>
              <OutIcon className='h-5 fill-sprGray70 group-hover:fill-white active:text-white ' />
              <p className=' group-hover:text-white active:text-white cursor-pointer' onClick={onSignOut} >Sign Out</p>
            </div> */}
          </div>
        </div>


      </div>
    </>

  );
}
