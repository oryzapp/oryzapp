import { button, Route, Routes } from "react-router-dom";
import Dahsboard from "../pages/Dashboard";
import RiceList from "./../pages/RiceList";
import RiceAccessions from "./../pages/RiceAccessions";
import VegetativeStage from "../pages/VegetativeStage";

import { ReactComponent as DashBIcon } from "../assets/dashboard-icon.svg";
import { ReactComponent as MUsersIcon } from "../assets/manage-users-icon.svg";
import { ReactComponent as RiceAccIcon } from "../assets/rice-accessions-icon.svg";
import { ReactComponent as RiceLIcon } from "../assets/rice-list-icon.svg";
import { ReactComponent as RiceDIcon } from "../assets/rice-data-icon.svg";
import { ReactComponent as RiceGIcon } from "../assets/rice-gallery-icon.svg";
import { ReactComponent as SQRIcon } from "../assets/scan-qr-code-icon.svg";

import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
import { collection, onSnapshot } from "firebase/firestore";
import db from "../firebase-config";


export default function Sidebar({ onChange }) {

  	 // Window Width------------>
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const handleResize = () => {
    setWindowWidth(window.innerWidth)
  }

 

  const [scanNav, setScanNav] = useState({
    index: 7,
    order: 'order-last'
  })

  const [dashNav, setDashNav] = useState({
    index:1,
    order:'order-first'
  })

  useEffect(()=>{
    window.addEventListener('resize', handleResize)

     if(windowWidth <= 480){

      setScanNav({
         index: 1,
        order: 'order-first'
      })
      setDashNav({
         index:7,
        order:'order-last'
      })
      }
      else{
        setScanNav({
         index: 7,
        order: 'order-last'
      })
      setDashNav({
         index:1,
        order:'order-first'
      })

      }
  },[windowWidth])
 
  // For Navigation
  const navigate = useNavigate()

  const [state, setState] = useState(1)

  const handleClick = (page, index) => {
    setState(index)
    onChange(page)
  }

  const [isAdmin, setIsAdmin] = useState('default')

  // Users
  const [users, setUsers] = useState([])
  useEffect(() => {
    // Users
    const collectionRef = collection(db, 'AUTH')
    const unsub = onSnapshot(collectionRef, (snapshot) => {
      setUsers(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });

    return unsub;
  }, [])

  // Authentication--------------->
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      try {
        if (user !== null) {
        const matchUser = users.find((dbUser) => dbUser.email === user.email)

        if (matchUser.role === 'Administrator') {
          setIsAdmin(true)
        }
        if (matchUser.role === 'Guest') {
          setIsAdmin(false)
        }
        if(matchUser.role === 'Disabled') {
        await auth.signOut();
        navigate('/login');
      }
      }
      else {
        await auth.signOut();
        navigate('/login');

      }
        
      } catch (error) {
        console.log(error);
      }
      
      
    })
    return unsub

  }, [users])




  return (
    <div className=" sidenav flex  flex-col  whitespace-nowrap w-auto  mb-2 rounded-b-xl sm:rounded-l-none sm:rounded-r-xl bg-white opacity-90 sm:h-full sm:p-3  ">
      <nav className="flex flex-row  sm:flex-col ">

        {isAdmin === 'default' ? <></> : <></>}



        {isAdmin === true?
      <>
        
       <button onClick={() => handleClick('dashboard', dashNav.index)} className={state === dashNav.index ? ` flex justify-center  flex-auto   sm:justify-start bg-sprPrimary rounded-lg px-3 py-2 ${dashNav.order}  ` : ` group flex justify-center  flex-auto   sm:justify-start  px-3 py-2 hover:bg-slate-200 rounded-lg  ${dashNav.order}`}>
          <div className="flex items-center space-x-1  "  >
            <div className="rounded-xl h-6 w-6  ">
              <DashBIcon className=" group-hover:stroke-sprInactiveGray" fill="none" stroke={state !== dashNav.index ? "#888A89" : "white"} />
            </div>
            <h3 className={state === dashNav.index ? "nav-text hidden md:block text-white font-medium text-md" : "nav-text hidden  md:block text-sprInactiveGray font-medium text-md"}>Dashboard</h3>
          </div>
        </button>

       <button onClick={() => handleClick('users', 2)} className={state === 2 ? "hidden sm:flex justify-center  flex-auto   sm:justify-start bg-sprPrimary rounded-lg px-3 py-2 " : "group hidden  sm:flex justify-center  flex-auto   sm:justify-start  px-3 py-2 hover:bg-slate-200 rounded-lg  "}>
          <div className="flex items-center  space-x-1   " >
            <div className="rounded-xl h-6 w-6  ">
              <MUsersIcon className=" group-hover:stroke-sprInactiveGray" fill="none" stroke={state !== 2 ? "#888A89" : "white"} />
            </div>
            <h3 className={state === 2 ? "nav-text hidden md:block text-white font-medium text-md" : "nav-text hidden  md:block text-sprInactiveGray font-medium text-md"}>Manage Users</h3>
          </div>
        </button> 
        <button onClick={() => handleClick('rice-accessions', 3)} className={state === 3 ? "flex justify-center  flex-auto   sm:justify-start bg-sprPrimary rounded-lg px-3 py-2 " : "group flex justify-center  flex-auto   sm:justify-start  px-3 py-2 hover:bg-slate-200 rounded-lg "} >
          <div className="flex items-center space-x-1   " >
            <div className="rounded-xl h-6 w-6">
              <RiceAccIcon className=" group-hover:stroke-sprInactiveGray" fill="none" stroke={state !== 3 ? "#888A89" : "white"} />
            </div>
            <h3 className={state === 3 ? "nav-text hidden md:block text-white font-medium text-md" : "nav-text hidden  md:block text-sprInactiveGray font-medium text-md"}>Rice Accessions</h3>
          </div>
        </button> 

       <button onClick={() => handleClick('rice-list', 4)} className={state === 4 ? "flex justify-center  flex-auto   sm:justify-start bg-sprPrimary rounded-lg px-3 py-2 " : "group flex justify-center  flex-auto   sm:justify-start  px-3 py-2 hover:bg-slate-200 rounded-lg "} >
          <div className="flex items-center space-x-1   " >
            <div className="rounded-xl h-6 w-6">
              <RiceLIcon className=" group-hover:stroke-sprInactiveGray" fill="none" stroke={state !== 4 ? "#888A89" : "white"} />
            </div>
            <h3 className={state === 4 ? "nav-text hidden md:block text-white font-medium text-md" : "nav-text hidden  md:block text-sprInactiveGray font-medium text-md"}>Rice List</h3>
          </div>
        </button> 

       <button onClick={() => handleClick('rice-data', 5)} className={state === 5 ? "hidden sm:flex justify-center  flex-auto   sm:justify-start bg-sprPrimary rounded-lg px-3 py-2" : " group hidden sm:flex justify-center  flex-auto   sm:justify-start  px-3 py-2 hover:bg-slate-200 rounded-lg "} >
          <div className="flex items-center space-x-1 " >
            <div className="rounded-xl h-6 w-6 ">
              <RiceDIcon className=" group-hover:stroke-sprInactiveGray" fill="none" stroke={state !== 5 ? "#888A89" : "white"} />
            </div>
            <h3 className={state === 5 ? "nav-text hidden md:block text-white font-medium text-md" : "nav-text hidden  md:block text-sprInactiveGray font-medium text-md"}>Agronomic Traits</h3>
          </div>
        </button> 
         <button onClick={() => handleClick('rice-gallery',6 )} className={state === 6 ? "flex justify-center  flex-auto   sm:justify-start bg-sprPrimary rounded-lg px-3 py-2" : "group flex justify-center  flex-auto   sm:justify-start  px-3 py-2 hover:bg-slate-200 rounded-lg "} >
          <div className="flex items-center space-x-1  ">
            <div className="rounded-xl h-6 w-6 ">
              <RiceGIcon className=" group-hover:stroke-sprInactiveGray" fill="none" stroke={state !== 6 ? "#888A89" : "white"} />
            </div>
            <h3 className={state === 6 ? "nav-text hidden md:block text-white font-medium text-md" : "nav-text hidden  md:block text-sprInactiveGray font-medium text-md"}>Rice Gallery</h3>
          </div>
        </button>

         <button onClick={() => handleClick('scan-code', scanNav.index)} className={state === scanNav.index ? ` flex justify-center  flex-auto   sm:justify-start bg-sprPrimary rounded-lg px-3 py-2 ${scanNav.order}  ` : `group flex justify-center  flex-auto   sm:justify-start  px-3 py-2 hover:bg-slate-200 rounded-lg ${scanNav.order}`} >
          <div className="flex items-center space-x-1  ">
            <div className="rounded-xl h-6 w-6 ">
              <SQRIcon className=" group-hover:stroke-sprInactiveGray" fill="none" stroke={state !== scanNav.index ? "#888A89" : "white"} />
            </div>
            <h3 className={state === scanNav.index ? "nav-text hidden md:block text-white font-medium text-md" : "nav-text hidden  md:block text-sprInactiveGray font-medium text-md" }>Scan Code</h3>
          </div>
        </button>
        <div  className=" hover:bg-slate-900/40 group rounded-full absolute w-5 h-5 bg-slate-900/20 hidden sm:block text-center text-white bottom-5">?
        <small className="hidden group-hover:block absolute left-6 bottom-4 p-2 text-xs font-light rounded-sm bg-slate-900/20">Developers<br /> Melvin C. Magat <br /> Blanche Jairus Peralta <br />Jessica M.  Velasco</small>
        </div>

      

       
      </>  :<></>
      }

      

        {isAdmin === false ? <>
         <button onClick={() => handleClick('scan-code', 1)} className={state === 1 ? " flex justify-center  flex-auto   sm:justify-start bg-sprPrimary rounded-lg px-3 py-2  " : "group flex justify-center  flex-auto   sm:justify-start  px-3 py-2 hover:bg-slate-200 rounded-lg "} >
          <div className="flex items-center space-x-1  ">
            <div className="rounded-xl h-6 w-6 ">
              <SQRIcon className=" group-hover:stroke-sprInactiveGray" fill="none" stroke={state !== 1 ? "#888A89" : "white"} />
            </div>
            <h3 className={state === 1 ? "nav-text hidden md:block text-white font-medium text-md" : "nav-text hidden  md:block text-sprInactiveGray font-medium text-md"}>Scan Code</h3>

          </div>
        </button>
        <button onClick={() => handleClick('rice-list', 2)} className={state === 2 ? "flex justify-center  flex-auto   sm:justify-start bg-sprPrimary rounded-lg px-3 py-2 " : "group flex justify-center  flex-auto   sm:justify-start  px-3 py-2 hover:bg-slate-200 rounded-lg "} >
          <div className="flex items-center space-x-1   " >
            <div className="rounded-xl h-6 w-6">
              <RiceLIcon className=" group-hover:stroke-sprInactiveGray" fill="none" stroke={state !== 2 ? "#888A89" : "white"} />
            </div>
            <h3 className={state === 2 ? "nav-text hidden md:block text-white font-medium text-md" : "nav-text hidden  md:block text-sprInactiveGray font-medium text-md"}>Rice List</h3>
          </div>
        </button> 
        <button onClick={() => handleClick('guest-rice-list', 3)} className={state === 3 ? "flex justify-center  flex-auto   sm:justify-start bg-sprPrimary rounded-lg px-3 py-2 " : "group flex justify-center  flex-auto   sm:justify-start  px-3 py-2 hover:bg-slate-200 rounded-lg "} >
          <div className="flex items-center space-x-1   " >
            <div className="rounded-xl h-6 w-6">
              <RiceLIcon className=" group-hover:stroke-sprInactiveGray" fill="none" stroke={state !== 3 ? "#888A89" : "white"} />
            </div>
            <h3 className={state === 3 ? "nav-text hidden md:block text-white font-medium text-md" : "nav-text hidden  md:block text-sprInactiveGray font-medium text-md"}>Rice List</h3>
          </div>
        </button> 

        
       <button onClick={() => handleClick('rice-gallery',4 )} className={state === 4 ? "flex justify-center  flex-auto   sm:justify-start bg-sprPrimary rounded-lg px-3 py-2" : "group flex justify-center  flex-auto   sm:justify-start  px-3 py-2 hover:bg-slate-200 rounded-lg  "} >
          <div className="flex items-center space-x-1  ">
            <div className="rounded-xl h-6 w-6 ">
              <RiceGIcon className=" group-hover:stroke-sprInactiveGray" fill="none" stroke={state !== 4 ? "#888A89" : "white"} />
            </div>
            <h3 className={state === 4 ? "nav-text hidden md:block text-white font-medium text-md" : "nav-text hidden  md:block text-sprInactiveGray font-medium text-md"}>Rice Gallery</h3>
          </div>
        </button>

        <div  className=" hover:bg-slate-900/40 group rounded-full absolute w-5 h-5 bg-slate-900/20 hidden sm:block text-center text-white bottom-5">?
        <small className="hidden group-hover:block absolute left-6 bottom-4 p-2 text-xs font-light rounded-sm bg-slate-900/20">Developers<br /> Melvin C. Magat <br /> Blanche Jairus Peralta <br />Jessica M.  Velasco</small>
        </div>
      
        </>:<></>}

      </nav>
    </div >
  );
}

