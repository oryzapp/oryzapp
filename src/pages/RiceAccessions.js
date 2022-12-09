import {
	addDoc,
	collection,
	collectionGroup,
	doc,
	getDoc,
	onSnapshot,
	orderBy,
	query,
	serverTimestamp,
	updateDoc,
	where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import ModalAddRiceAcc from "../components/ModalAddRiceAcc";
import db from "../firebase-config";
import { storage } from "../firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import {
	addRiceAccession,
	editRiceAccessionID,
	deleteRiceAccession,
} from "./../util";
import addIcon from '../assets/add-icon.svg'

import closeIcon from "../assets/close.svg";
import delIcon from "../assets/delete-icon.svg"
import editIcon from "../assets/edit-icon.svg"
import downloadIcon from "../assets/download-icon.svg"
import { ReactComponent as SearchIcon } from "../assets/search-icon.svg"
import { ReactComponent as EmptyIllustration } from "../assets/empty-illustration.svg"
import { ReactComponent as ImageIcon } from "../assets/image-icon.svg"
import { ReactComponent as ExcelIcon } from "../assets/excel-icon.svg"
import { v4 } from "uuid";
import { QRCodeCanvas } from "qrcode.react";
import ModalAccessionsInfo from "../components/ModalAccessionsInfo";
import ModalDelete from "../components/ModalDelete";
import { ReactComponent as CloseIcon } from "../assets/close.svg";

export default function RiceAccessions() {

	// Open and Close Modal ------------------->
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isRiceInfoModalOpen, setIsRiceInfoModalOpen] = useState(false);
	// Data in Modal
	const [modalId, setModalId] = useState('')

	console.log('Modal id:' + modalId);

	// Handle Form Submit ------------------>
	const [imageUpload, setImageUpload] = useState(null)

	const [imageUrl,setImageUrl] = useState('')

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			
			if (accessionExists === true) {
				alert('Change Accession')
			}
			else {
				const imageRef = ref(storage, `images/${state.accession} `)
				if (imageUpload !== null) {
					await uploadBytes(imageRef, imageUpload)
					await getDownloadURL(imageRef).then(url=>setImageUrl(url))
					console.log('inside if');
					console.log(imageUrl);
				}
				console.log('outside if');
					console.log(imageUrl);

				const collectionRef = collection(db, "SPR/Rice_Accessions/Accession_IDs");
				const payLoad = {
				searchIndex: `${state.accession} ${state.variety} ${state.source} ${state.classification}`,
				accessionId: state.accession,
				classification: state.classification,
				variety: state.variety,
				source: state.source,
				imageUrl:imageUrl,
				timestamp: serverTimestamp(),
			};
			console.log(payLoad);
				await addDoc(collectionRef, payLoad);
				setIsModalOpen(false)
				setState(initialState)
			alert('Saved!')

			}
		} catch (error) {
			alert(error);
		}
	};

	// Form Inputs --------------------->
	const [state, setState] = useState({
		accession: "",
		variety: "",
		source: "",
		classification: "",
	});
	// For Resetting Inputs ------------------->
	const initialState = {
		accession: "",
		variety: "",
		source: "",
		classification: "",
	}

	const handleChange = (e) => {
		setState({                                                                                
			...state,
			[e.target.name]: e.target.value,
		});
	};

	// Check Accession If Exists
	const [accessionExists, setAccessionExists] = useState(false)
	useEffect(() => {


		const result = riceAccessions.find(rice => rice.accessionId === state.accession)
		if (result === undefined) {
			setAccessionExists(false)
		}
		else {
			setAccessionExists(true)
		}


	}, [state.accession])


	// Open Edit Rice Accession ---------->
	const [isEdit, setIsEdit] = useState(false)
	const [editId, setEditId] = useState('')
	const editRiceAccessionID = async (id) => {
		setIsEdit(true)
		setIsModalOpen(true)
		setEditId(id)
		riceAccessions.map((rice) => {
			if (rice.id === id) {
				setState({
					accession: rice.accessionId,
					variety: rice.variety,
					source: rice.source,
					classification: rice.classification,
				}
				)
			}
		})



	};
	// Submit Edit ---------------->
	const submitEdit = async (e) => {
		try {
			e.preventDefault()
		
			if (imageUpload !== null) {
				const imageRef = ref(storage, `images/${state.accession} `)
				await uploadBytes(imageRef, imageUpload)
				await getDownloadURL(imageRef).then(url=>setImageUrl(url))
			}
			const docRef = doc(db, "SPR/Rice_Accessions/Accession_IDs", editId);
			const payLoad = {
				searchIndex: `${state.accession} ${state.variety} ${state.source} ${state.classification}`,
				classification: state.classification,
				variety: state.variety,
				source: state.source,
				imageUrl:imageUrl,
				timestamp: serverTimestamp(),
			};

			await updateDoc(docRef, payLoad);
			setIsModalOpen(false)
			setState(initialState)
			setIsEdit(false)
			alert('updated!')
		} catch (error) {
			console.log(error);
		}
	}
	// Search Box ----------------------->
	const [searchInput, setSearchInput] = useState('')
	const handleSearchInput = (e) => {
		setSearchInput(e.target.value)
	}

	// Search Entered ----------------->
	const startSearch = (e) => {
		e.preventDefault()
	}

	// Display on Search -------------------->
	const [riceAccessions, setRiceAccessions] = useState([]);


	// Display All -------------------->
	useEffect(() => {
		try {
			const collectionRef = collection(db, "SPR/Rice_Accessions/Accession_IDs");
			const unsub = onSnapshot(collectionRef, (snapshot) => {
				setRiceAccessions(
					snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
				);
			});

			return unsub;
		} catch (error) {
			console.log(error);
		}
	}, [searchInput]);



	// DB Data to Array Search for Searching---->
	const [searched, setSearched] = useState([])
	useEffect(() => {
		var searchList = []

		if (searchInput !== "") {
			riceAccessions.map((rice) => {
				const match = rice.searchIndex.toLowerCase()
				const search = match.includes(searchInput)
				if (search === true) {
					searchList.push({
						accessionId: rice.accessionId,
						classification: rice.classification,
						variety: rice.variety,
						source: rice.source
					})

				}
			})
		}


		setSearched(searchList)
	}, [searchInput])

	console.log(searched);


	// Count accessions ------------------>
	var list = 0

	// Delete Modal----------------->
	const [isDelModalOpen, setIsDelModalOpen] = useState(false)
	const [delId, setDelId] = useState('')
	console.log(delId);

	// Export Excel
	  const exportExcel = () => {
        var XLSX = require("xlsx");
        console.log('exporting');
        var wb= XLSX.utils.book_new()
		if(searchInput === ''){
			var ws = XLSX.utils.json_to_sheet(riceAccessions)
		}
		else{
			var ws = XLSX.utils.json_to_sheet(searched)
		}


        XLSX.utils.book_append_sheet(wb,ws,`Special Purpose Rice Accessions`)

        XLSX.writeFile(wb, `Special_Purpose_Rice_Accessions.xlsx`)
    }

	useEffect(()=>{
		const accessionInput = document.getElementById('input-accession')
		console.log(accessionInput);
		accessionInput?.focus()
	},[isModalOpen])



	return (
		<>
			<div className='h-full w-full flex flex-col rounded-t-xl  sm:rounded-xl bg-slate-50 opacity-90 p-2'>

				{/* Header */}
				<header className=" flex items-center">
					<button
						className=" hidden sm:block w-8 h-8 p-2 rounded-full bg-gradient-to-b from-sprPrimary to-sprPrimaryDarkest hover:bg-gradient-to-t hover:from-sprPrimaryLight hover:to-sprPrimaryLight drop-shadow-md"
						onClick={() => setIsModalOpen(true)}
					>
						<img src={addIcon} alt="" />
					</button>
					<h1 className="text-3xl font-bold text-sprBlack opacity-80 pl-2">
						Rice Accessions
					</h1>
				</header>
				{/* Options */}
				<div className="flex justify-between  pt-1 pb-3">

					<div className="flex  items-center gap-3 bg-white rounded-full">
						<div className="relative drop-shadow-md">
							<form onSubmit={startSearch}>
								<input
									className=" pl-2 py-2 text-sm placeholder:text-sprPrimary/50 text-sprPrimary focus:outline-none focus:border-none  rounded-full  "
									type="text"
									placeholder="Find a Rice"
									value={searchInput}
									onChange={handleSearchInput}
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
					{riceAccessions.length === 0 ? <div className="flex justify-center items-center pt-32 flex-col gap-8 "><EmptyIllustration /><p className="font-medium text-xl text-sprPrimaryOffLight">Plenty of space in the field </p></div> :
						<div className="flex w-full max-h-0 sm:max-h-0 sm:max-w-0 lg:max-w-full  relative bg-yellow-400">
							<div className="hidden sm:flex flex-col  divide-y divide-slate-200 relative h-full ">
								<div className="  text-sprPrimary bg-white sticky top-0 px-6 py-2 text-sm font-medium">
									#
								</div>
								{
									searchInput === '' ? <>
										{riceAccessions.map((rice) => (
											<div className="px-6 py-2 font-medium text-sprPrimaryLight"> {list = list + 1} </div>
										))}
									</> :
										<>
											{searched.map((rice) => (
												<div className="px-6 py-2 font-medium text-sprPrimaryLight"> {list = list + 1} </div>
											))}
										</>
								}
							</div>
							<div className="hidden sm:flex flex-col flex-auto  divide-y divide-slate-200 relative h-full">
								<div className="text-sprPrimary bg-white sticky top-0 px-8 py-2 text-sm font-medium">
									Accessions
								</div>
								{
									searchInput === '' ? <>
										{riceAccessions.map((rice) => (
											<div className="px-8 py-2 text-md font-medium text-sprGray60 whitespace-nowrap bg-slate-50"> CL-R{rice.accessionId === "" ? "---" : rice.accessionId} </div>
										))}</> : <>
										{searched.map((rice) => (
											<div className="px-8 py-2 text-md font-medium text-sprGray60 whitespace-nowrap bg-slate-50"> CL-R{rice.accessionId === "" ? "---" : rice.accessionId} </div>
										))}</>
								}

							</div>
							<div className="hidden sm:flex flex-col flex-auto divide-y divide-slate-200   relative h-full">
								<div className=" text-sprPrimary px-8 py-2 bg-white sticky top-0 text-sm font-medium">
									Classification
								</div>
								{
									searchInput === '' ?
										<>{riceAccessions.map((rice) => (
											<div className="px-8 py-2 text-md font-medium text-sprGray60 whitespace-nowrap bg-slate-100"> {rice.classification === "" ? "---" : rice.classification}</div>
										))}</> :
										<>{searched.map((rice) => (
											<div className="px-8 py-2 text-md font-medium text-sprGray60 whitespace-nowrap bg-slate-100"> {rice.classification === "" ? "---" : rice.classification}</div>
										))}</>

								}
							</div>
							<div className="hidden sm:flex flex-col flex-auto divide-y divide-slate-200 relative h-full">
								<div className="text-sprPrimary bg-white px-8 py-2 sticky top-0 text-sm font-medium">
									Variety
								</div>
								{searchInput === '' ? <>
									{riceAccessions.map((rice) => (
										<div className="px-8 py-2 text-md font-medium text-sprGray60 whitespace-nowrap bg-slate-50"> {rice.variety === "" ? "---" : rice.variety}</div>
									))}</> : <>
									{searched.map((rice) => (
										<div className="px-8 py-2 text-md font-medium text-sprGray60 whitespace-nowrap bg-slate-50"> {rice.variety === "" ? "---" : rice.variety}</div>
									))}</>}

							</div>
							<div className="hidden sm:flex flex-col flex-auto divide-y divide-slate-200 relative h-full ">
								<div className="text-sprPrimary bg-white  px-8 py-2 sticky top-0 text-sm font-medium">
									Source
								</div>
								{searchInput === '' ? <>
									{riceAccessions.map((rice) => (
										<div className="px-8 py-2 text-md font-medium text-sprGray60 whitespace-nowrap bg-slate-100" > {rice.source === "" ? "---" : rice.source}</div>
									))}</> : <>
									{searched.map((rice) => (
										<div className="px-8 py-2 text-md font-medium text-sprGray60 whitespace-nowrap bg-slate-100" > {rice.source === "" ? "---" : rice.source}</div>
									))}</>}
							</div>
							<div className="hidden sm:flex flex-col  divide-y sm:divide-y bg-white divide-white h-full sticky right-0">
								<div className=" text-sprPrimary flex justify-center bg-white  px-10 py-2 sticky top-0 text-sm font-medium">
										  <h1 className="group" onClick={()=>{exportExcel()}}>
                                    <ExcelIcon className='stroke-sprPrimary h-5 hover:stroke-sprPrimarySuperLight active:stroke-sprPrimary'/>
                                    <small className=' hidden group-hover:block absolute whitespace-nowrap right-2 bg-sprGray60 rounded-sm p-1 text-white' >Export as Excel</small>
									</h1>
								</div>
								{searchInput === '' ? <>
									{riceAccessions.map((rice) => (
										<div className="p-6 py-2 text-md font-medium text-sprGray60 whitespace-nowrap" >
											<div className="flex gap-2">
												<button
													// className=" text-white text-sm bg-gradient-to-b from-sprPrimary to-sprPrimaryDarkest hover:bg-gradient-to-t hover:from-sprPrimaryLight hover:to-sprPrimaryLight drop-shadow-md h-8 w-14 sm:h-6 sm:w-12 rounded-full  shadow-slate-300 "
													className=" text-white text-sm bg-gradient-to-b from-sprPrimary to-sprPrimaryDarkest rounded-full  hover:bg-gradient-to-t hover:from-sprPrimaryLight hover:to-sprPrimaryLight h-8 w-14 sm:h-6 sm:w-12 shadow-slate-300 "
													onClick={() => {
														setIsRiceInfoModalOpen(true)
														setModalId(rice.accessionId)

													}}
												>
													view
												</button>
												<button
													className=" lg:block p-1 bg-gradient-to-b from-sprPrimary to-sprPrimaryDarkest hover:bg-gradient-to-t hover:from-sprPrimaryLight hover:to-sprPrimaryLight   rounded-full   shadow-slate-300 "
													onClick={() => {
														editRiceAccessionID(rice.id);
													}}
												>
													<div className="w-4 h-4"><img src={editIcon} alt="" /></div>
												</button>
												<button
													className=" lg:block p-1 bg-gradient-to-b from-sprPrimary to-sprPrimaryDarkest rounded-full  hover:bg-gradient-to-t hover:from-sprPrimaryLight hover:to-sprPrimaryLight shadow-slate-300 "
													onClick={() => {
														// deleteRiceAccession(rice.id);
														setDelId(rice.id)
														setModalId(rice.accessionId)

														setIsDelModalOpen(true)
														console.log('delId');

													}}
												>
													<div className="w-4 h-4"><img src={delIcon} alt="" /></div>

												</button>
											</div>
										</div>
									))}
								</> : <>{searched.map((rice) => (
									<div className="p-6 py-2 text-md font-medium text-sprGray60 whitespace-nowrap" >
										<div className="flex gap-2">
											<button
												// className=" text-white text-sm bg-gradient-to-b from-sprPrimary to-sprPrimaryDarkest hover:bg-gradient-to-t hover:from-sprPrimaryLight hover:to-sprPrimaryLight drop-shadow-md h-8 w-14 sm:h-6 sm:w-12 rounded-full  shadow-slate-300 "
												className=" text-white text-sm bg-gradient-to-b from-sprPrimary to-sprPrimaryDarkest rounded-full  hover:bg-gradient-to-t hover:from-sprPrimaryLight hover:to-sprPrimaryLight h-8 w-14 sm:h-6 sm:w-12 shadow-slate-300 "
												onClick={() => {
													setIsRiceInfoModalOpen(true)
													setModalId(rice.accessionId)

												}}
											>
												view
											</button>
											<button
												className=" lg:block p-1 bg-gradient-to-b from-sprPrimary to-sprPrimaryDarkest hover:bg-gradient-to-t hover:from-sprPrimaryLight hover:to-sprPrimaryLight   rounded-full   shadow-slate-300 "
												onClick={() => {
													editRiceAccessionID(rice.id);
												}}
											>
												<div className="w-4 h-4"><img src={editIcon} alt="" /></div>
											</button>
											<button
												className=" lg:block p-1 bg-gradient-to-b from-sprPrimary to-sprPrimaryDarkest rounded-full  hover:bg-gradient-to-t hover:from-sprPrimaryLight hover:to-sprPrimaryLight shadow-slate-300 "
												onClick={() => {
													// deleteRiceAccession(rice.id);
													setDelId(rice.id)
													setModalId(rice.accessionId)

													setIsDelModalOpen(true)
													console.log('delId');

												}}
											>
												<div className="w-4 h-4"><img src={delIcon} alt="" /></div>

											</button>
										</div>
									</div>
								))}</>}
							</div>

							{/* Mobile */}
							<div className="w-full flex  sm:hidden flex-col mx-2 gap-2 py-2 ">
								{ searchInput === ''?
								<>
								{riceAccessions.map((rice) => (
									<div className="flex justify-between items-center  bg-slate-50">
									<div className="flex flex-col -space-y-3">
										<div className="px-6 py-4 text-3xl font-bold text-sprGray80"> CL-R{rice.accessionId} </div>
										<div className="px-6 py-2 text-md font-normal text-sprPrimaryLight"> {rice.classification === '' ? "---" : rice.classification} </div>
										<div className="px-6 py-2 text-md font-normal text-sprPrimaryLight"> {rice.variety === '' ? "---" : rice.variety} </div>
									</div>
										<button className="mr-8 bg-sprPrimary hover:bg-sprPrimaryLight active:bg-sprPrimary rounded-full p-1 px-2 text-white font-medium text-xl" onClick={() => {
													setIsRiceInfoModalOpen(true)
													setModalId(rice.accessionId)

												}}>view</button>
									</div>
								))}
								</>:
								<>
								{searched.map((rice) => (
									<div className="flex justify-between items-center  bg-slate-50">
									<div className="flex flex-col -space-y-3">
										<div className="px-6 py-4 text-3xl font-bold text-sprGray80"> CL-R{rice.accessionId} </div>
										<div className="px-6 py-2 text-md font-normal text-sprPrimaryLight"> {rice.classification === '' ? "---" : rice.classification} </div>
										<div className="px-6 py-2 text-md font-normal text-sprPrimaryLight"> {rice.variety === '' ? "---" : rice.variety} </div>
									</div>
										<button className="mr-8 bg-sprPrimary hover:bg-sprPrimaryLight active:bg-sprPrimary rounded-full p-1 px-2 text-white font-medium text-xl" onClick={() => {
													setIsRiceInfoModalOpen(true)
													setModalId(rice.accessionId)

												}}>view</button>
									</div>
								))}</>}


							</div>

						</div>
					}
				</section>



				{/* Modals */}
				{/* Add Rice Accession */}
				<ModalAddRiceAcc open={isModalOpen} >
					<div className="absolute right-4 top-4 z-50  ">
						<CloseIcon className='group-hover:stroke-white stroke-sprGray50 hover:stroke-sprGray80 active:stroke-sprPrimary h-5' onClick={() => {
							setIsModalOpen(false)
							setIsEdit(false)
							setState(initialState)
						}}/>
					</div>
					<div className="flex">
						<h1 className="page-header text-2xl font-bold text-sprGray70">{isEdit === false ? 'Add Rice Accession':'Edit Rice Accession'}</h1>
					</div>
					<div className="flex flex-auto flex-col overflow-hidden ">
						<form className="flex flex-col h-full "
					onSubmit={isEdit === true ? submitEdit : handleSubmit}>
						<div className=" flex-auto flex flex-col overflow-auto scrollbar">
						<div className="p-4 " >
								<div className={isEdit === true ? "hidden" : "block"}>
									<div className={accessionExists === true ? "block text-red-500 text-sm" : "hidden"}>*Accession already exists</div>

								</div>
								<div className="flex">
									<p className="text-2xl sm:text-4xl font-medium whitespace-nowrap text-sprPrimary">CL-R</p>
									<input
										id="input-accession"
										className=" caret-sprPrimary w-full text-2xl sm:text-4xl font-medium  placeholder-sprPrimaryLight/20 text-sprPrimary focus:outline-none focus:ring-transparent bg-transparent"
										type="text"
										placeholder="XXXX"
										name="accession"
										value={state.accession}
										onChange={handleChange}
										required
										readOnly={isEdit === true ? true : false}
									/>
								</div>
								<p className="text-sprPrimaryLight text-sm">{isEdit === false ? 'Enter Rice Accession ID Above':'------------------'}</p>
							</div>
						<div className="flex flex-auto flex-row  w-full ">
								<div className="flex flex-col justify-center -space-y-2  w-1/2  mb-4">
									<div className="p-1 sm:p-2  flex flex-col ">
										<label className="text-sprPrimary">Variety</label>
										<input

											className="caret-sprPrimary rounded-full sm:p-2  border border-sprPrimary focus:outline-none focus:ring-1 focus:ring-sprPrimary focus:bg-sprPrimaryOffLight/30"
											type="text"
											name="variety"
											value={state.variety}
											onChange={handleChange}
										/>
									</div>
									<div className="p-1 sm:p-2  flex flex-col">
										<label className="text-sprPrimary">Source</label>
										<input
											className="caret-sprPrimary rounded-full sm:p-2 border border-sprPrimary focus:outline-none focus:ring-1 focus:ring-sprPrimary focus:bg-sprPrimaryOffLight/30"
											type="text"
											name="source"
											value={state.source}
											onChange={handleChange}
										/>
									</div>
									<div className="p-1 sm:p-2  flex flex-col">
										<label className="caret-sprPrimary text-sprPrimary">Classification</label>
										<input
											className="rounded-full sm:p-2 border border-sprPrimary focus:outline-none focus:ring-1 focus:ring-sprPrimaryfocus:bg-sprPrimaryOffLight/30"
											type="text"
											name="classification"
											value={state.classification}
											onChange={handleChange}
										/>
									</div>
								</div>
								<div className="flex justify-center items-center    w-1/2 ">
									<div className="group  rounded-b-lg  sprBorderDashed w-28 h-28 sm:w-52 sm:h-52  flex flex-col sm:gap-5 p-4  justify-center items-center bg-slate-100 ">
										<ImageIcon fill="none" stroke="#CFD491" className="w-12 sm:w-16" />
										<div className="bg-sprPrimaryLight group-hover:bg-sprPrimaryOffLight group-active:bg-sprPrimary relative rounded-full   ">
											<h6 className="absolute  left-1 top-2 sm:left-3 sm:top-1  text-white text-xs sm:text-sm  whitespace-nowrap font-medium" >Choose Image</h6>
											<input className="opacity-0 w-24 sm:w-32 " type="file" onChange={(e) => {
												setImageUpload(e.target.files[0])
											}} />

										</div>
									</div>
								</div>
						</div>
						</div>
						<div className="text-right space-x-2 p-1">
								<button
									className="bg-sprGray30 hover:bg-sprGray10 active:bg-sprGray50 rounded-full py-2 px-3 text-sm font-medium text-white shadow-slate-300"
									onClick={() => {
										setIsModalOpen(false);
										setState(initialState)
										setIsEdit(false)
									}}
								>
									Cancel
								</button>

								<button
									type="submit"
									className="bg-gradient-to-b from-sprPrimary to-sprPrimaryDarkest  active:bg-gradient-to-b active:from-sprPrimary active:to-sprPrimaryDarkest hover:bg-gradient-to-t hover:from-sprPrimaryLight hover:to-sprPrimaryLight rounded-full py-2 px-3 text-sm font-medium text-white shadow-slate-300"

								>
									{isEdit === false ? 'Save':'Update'}
								</button>
							</div>

						</form>
							
					</div>
						
					
				</ModalAddRiceAcc>

				{/* Rice Accession Info */}
				<ModalAccessionsInfo open={isRiceInfoModalOpen} modalId={modalId} closeModal={() => { setIsRiceInfoModalOpen(false) }}  >

				</ModalAccessionsInfo>

				{/* Delete Prompt */}
				<ModalDelete open={isDelModalOpen} closeModal={() => { setIsDelModalOpen(false) }} modalId={modalId} delId={delId}>

				</ModalDelete>
			</div>

		</>
	);
}


// Delete all using batch