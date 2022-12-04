import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import db from "../firebase-config";
import { storage } from "../firebase-config";
import { ref, uploadBytes } from "firebase/storage"

import addIcon from '../assets/add-icon.svg'

import editIcon from "../assets/edit-icon.svg"
import downloadIcon from "../assets/download-icon.svg"
import { ReactComponent as SearchIcon } from "../assets/search-icon.svg"
import { ReactComponent as EmptyIllustration } from "../assets/empty-illustration.svg"
import { ReactComponent as UserIcon } from '../assets/user-icon.svg';
import { ReactComponent as AdminIcon } from '../assets/admin-icon.svg';
import { ReactComponent as DisabledIcon } from "../assets/disabled-icon.svg"
import { ReactComponent as View } from "../assets/view.svg"
import ModalEditUsers from "../components/ModalEditUsers";
import ModalChangeRole from "../components/ModalChangeRole";

export default function ManageUsers() {

  // Open and Close Modal ------------------->
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalChangeRoleOpen, setIsModalChangeRoleOpen] = useState(false);

  // Id, role, email
  const [modalId, setModalId] = useState('')
  const [modalRole, setModalRole] = useState('')
  const [modalEmail, setModalEmail] = useState('')
  const [roleChoice, setRoleChoice] = useState('')
  const [modalPassword, setModalPassword] = useState('')

  // Search Box ----------------------->
  const [searchInput, setSearchInput] = useState('')
  const handleSearchInput = (e) => {
    setSearchInput(e.target.value)
  }

  // Display All Oryzapp Users
  const [oryzappUsers, setOryzappUsers] = useState([])
  useEffect(() => {
    try {
      const collectionRef = collection(db, "AUTH");
      const unsub = onSnapshot(collectionRef, (snapshot) => {
        setOryzappUsers(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });

      return unsub;
    } catch (error) {
      console.log(error);
    }
  }, [searchInput]);

  console.log('Oryzapp Users');
  console.log(oryzappUsers);

  // DB Data to Array Search for Searching---->
  const [searched, setSearched] = useState([])
  useEffect(() => {
    var searchList = []

    if (searchInput !== "") {
      oryzappUsers.map((user) => {
        const match = user.searchIndex.toLowerCase()
        const search = match.includes(searchInput)
        if (search === true) {
          searchList.push({
            id: user.id,
            email: user.email,
            role: user.role
          })

        }
      })
    }


    setSearched(searchList)
  }, [searchInput])

  console.log(searched);


  // Count Users ------------------>
  var list = 0




  return (
    <>
      <div className='h-full w-full flex flex-col rounded-t-xl  sm:rounded-xl bg-slate-50 opacity-90 p-2'>

        {/* Header */}
        <header className=" flex items-center">
          <h1 className="text-3xl font-bold text-sprBlack opacity-80 pl-2">
            Manage Users
          </h1>
        </header>
        {/* Options */}
        <div className="flex justify-between  pt-1 pb-3">

          <div className="flex  items-center gap-3 bg-white rounded-full">
            <div className="relative drop-shadow-md">
              <form >
                <input
                  className=" pl-2 py-2 text-sm placeholder:text-sprPrimary/50 text-sprPrimary focus:outline-none focus:border-none  rounded-full  "
                  type="text"
                  placeholder="Find a Rice"
                  value={searchInput}
                // onChange={handleSearchInput}
                />
                <button className="  h-full px-2 rounded-full absolute right-0  bg-sprPrimaryLight">
                  <SearchIcon stroke=" white" />
                </button>
              </form>
            </div>

          </div>

        </div>

        {/* Main */}
        {/* List */}
        <section className="flex-auto overflow-auto  scrollbar bg-white rounded-lg border border-slate-200 w-full">
          {oryzappUsers.length === 0 ? <div className="flex justify-center items-center pt-32 flex-col gap-8 "><EmptyIllustration /><p className="font-medium text-xl text-sprPrimaryOffLight">Plenty of space in the field </p></div> :
            <div className="flex w-full max-h-0 sm:max-h-0 sm:max-w-0 lg:max-w-full  relative bg-yellow-400">
              <div className="hidden sm:flex flex-col  divide-y divide-slate-200 relative h-full ">
                <div className="  text-sprPrimary bg-white sticky top-0 px-6 py-4 text-sm font-medium">
                  #
                </div>
                {
                  searchInput === '' ? <>
                    {oryzappUsers.map((rice) => (
                      <div className="px-6 py-4 font-medium text-sprPrimaryLight"> {list = list + 1} </div>
                    ))}
                  </> :
                    <>
                      {searched.map((rice) => (
                        <div className="px-6 py-4 font-medium text-sprPrimaryLight"> {list = list + 1} </div>
                      ))}
                    </>
                }
              </div>
              <div className="hidden sm:flex flex-col flex-auto  divide-y divide-slate-200 relative h-full">
                <div className="text-sprPrimary bg-white sticky top-0 px-8 py-4 text-sm font-medium">
                  Email
                </div>
                {
                  searchInput === '' ? <>
                    {oryzappUsers.map((user) => (
                      <div className="px-8 py-4 text-md font-medium text-sprGray60 whitespace-nowrap bg-slate-50"> {user.email === "" ? "---" : user.email} </div>
                    ))}</> : <>
                    {searched.map((user) => (
                      <div className="px-8 py-4 text-md font-medium text-sprGray60 whitespace-nowrap bg-slate-50">{user.email === "" ? "---" : user.email} </div>
                    ))}</>
                }

              </div>
             

              <div className="hidden sm:flex flex-col  divide-y sm:divide-y divide-slate-200 bg-slate-50 h-full sticky right-0">
                <div className=" text-sprPrimary bg-white  px-10 py-4 sticky top-0 text-sm font-medium">
                  <h1 className="opacity-0">
                    Action
                  </h1>
                </div>
                {searchInput === '' ? <>
                  {oryzappUsers.map((user) => (
                    <div className="px-6 py-4 text-md font-medium text-sprGray60 whitespace-nowrap" >
                      <div className="flex gap-2">
                       
                        <button className=" group flex gap-1 items-center justify-center px-2  hover:bg-sprPrimaryOffLight active:bg-sprPrimary rounded-full h-6 mr-2" 
                        onClick={()=>{
                          setIsModalOpen(true)
                          setModalId(user.id)
                          setModalEmail(user.email)
                          setModalRole(user.role)
                          setModalPassword(user.password)
                        }}>
                           <View className= 'fill-sprPrimary h-7  group-active:fill-white ' />

                               
                        </button>
                        <button className={user.role === 'Administrator' ? " flex gap-1 items-center justify-center px-2 bg-sprPrimary rounded-full h-6": " flex gap-1 items-center justify-center px-2 bg-sprGray40 rounded-full h-6"}
                         onClick={()=>{
                          setIsModalChangeRoleOpen(true)
                          setModalId(user.id)
                          setModalEmail(user.email)
                          setRoleChoice('Administrator')
                         }
                         }
                         disabled={user.role === 'Administrator' ? true : false}
                        >
                           <AdminIcon className='fill-white h-3  ' />
                                <h1 className='hidden lg:block text-white font-medium text-md'>Administrator</h1>
                        </button>
                        
                        <button className={user.role === 'User' ? " flex gap-1 items-center justify-center px-2 bg-yellow-400 rounded-full h-6": " flex gap-1 items-center justify-center px-2 bg-sprGray40 rounded-full h-6"}
                        onClick={()=>{
                          setIsModalChangeRoleOpen(true)
                          setModalId(user.id)
                          setModalEmail(user.email)
                          setRoleChoice('User')
                         }
                         }
                         disabled={user.role === 'User' ? true : false}
                        >
                           <UserIcon className='fill-white h-4  ' />
                                <h1 className='hidden lg:block text-white font-medium text-md'>User Only</h1>
                        </button>
                        
                        <button className={user.role === 'Disabled' ? " flex gap-1 items-center justify-center px-2 bg-sprTertiary rounded-full h-6": " flex gap-1 items-center justify-center px-2 bg-sprGray40 rounded-full h-6"}
                         onClick={()=>{
                          setIsModalChangeRoleOpen(true)
                          setModalId(user.id)
                          setModalEmail(user.email)
                          setRoleChoice('Disabled')
                         }
                         }
                         disabled={user.role === 'Disabled' ? true : false}
                        >
                           <DisabledIcon className='stroke-white h-4  ' />
                                <h1 className='hidden lg:block text-white font-medium text-md'>Disabled</h1>
                        </button>
                        

                      </div>
                    </div>
                  ))}
                </> : 
                
                <>{searched.map((user) => (
                  <div className="px-6 py-4 text-md font-medium text-sprGray60 whitespace-nowrap" >
                      <div className="flex gap-2">
                       
                        <button className=" group flex gap-1 items-center justify-center px-2  hover:bg-sprPrimaryOffLight active:bg-sprPrimary rounded-full h-6 mr-2" 
                        onClick={()=>{
                          setIsModalOpen(true)
                          setModalId(user.id)
                          setModalEmail(user.email)
                          setModalRole(user.role)
                          setModalPassword(user.password)

                        }}>
                           <View className= 'fill-sprPrimary h-7  group-active:fill-white ' />

                               
                        </button>
                        <button className={user.role === 'Administrator' ? " flex gap-1 items-center justify-center px-2 bg-sprPrimary rounded-full h-6": " flex gap-1 items-center justify-center px-2 bg-sprGray40 rounded-full h-6"}
                         onClick={()=>{
                          setIsModalChangeRoleOpen(true)
                          setModalId(user.id)
                          setModalEmail(user.email)
                          setRoleChoice('Administrator')
                         }
                         }
                         disabled={user.role === 'Administrator' ? true : false}
                        >
                           <AdminIcon className='fill-white h-3  ' />
                                <h1 className='hidden lg:block text-white font-medium text-md'>Administrator</h1>
                        </button>
                        
                        <button className={user.role === 'User' ? " flex gap-1 items-center justify-center px-2 bg-yellow-400 rounded-full h-6": " flex gap-1 items-center justify-center px-2 bg-sprGray40 rounded-full h-6"}
                        onClick={()=>{
                          setIsModalChangeRoleOpen(true)
                          setModalId(user.id)
                          setModalEmail(user.email)
                          setRoleChoice('User')
                         }
                         }
                         disabled={user.role === 'User' ? true : false}
                        >
                           <UserIcon className='fill-white h-4  ' />
                                <h1 className='hidden lg:block text-white font-medium text-md'>User Only</h1>
                        </button>
                        
                        <button className={user.role === 'Disabled' ? " flex gap-1 items-center justify-center px-2 bg-sprTertiary rounded-full h-6": " flex gap-1 items-center justify-center px-2 bg-sprGray40 rounded-full h-6"}
                         onClick={()=>{
                          setIsModalChangeRoleOpen(true)
                          setModalId(user.id)
                          setModalEmail(user.email)
                          setRoleChoice('Disabled')
                         }
                         }
                         disabled={user.role === 'Disabled' ? true : false}
                        >
                           <DisabledIcon className='stroke-white h-4  ' />
                                <h1 className='hidden lg:block text-white font-medium text-md'>Disabled</h1>
                        </button>
                        

                      </div>
                    </div>
                ))}</>}
              </div>



            </div>
          }
        </section>


      </div>
     
      <ModalEditUsers open={isModalOpen} closeModal={() => { setIsModalOpen(false) }} modalId={modalId} modalEmail={modalEmail}  modalRole={modalRole} modalPassword= {modalPassword}  />
      <ModalChangeRole open={isModalChangeRoleOpen} closeModal={() => { setIsModalChangeRoleOpen(false) }} modalId={modalId} roleChoice={roleChoice} modalEmail={modalEmail}   />

    </>
  );
}

