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
import { ReactComponent as EditIcon } from "../assets/edit-icon.svg"
import { ReactComponent as SearchIcon } from "../assets/search-icon.svg"
import { ReactComponent as EmptyIllustration } from "../assets/empty-illustration.svg"
import { ReactComponent as ImageIcon } from "../assets/image-icon.svg"
import { ReactComponent as ExcelIcon } from "../assets/excel-icon.svg"
import { v4 } from "uuid";
import { QRCodeCanvas } from "qrcode.react";
import ModalAccessionsInfo from "../components/ModalAccessionsInfo";
import ModalDelete from "../components/ModalDelete";
import { ReactComponent as CloseIcon } from "../assets/close.svg";
import ModalSuccess from "../components/ModalSuccess";

export default function RiceAccessions() {

	// Open and Close Modal ------------------->
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isRiceInfoModalOpen, setIsRiceInfoModalOpen] = useState(false);
	// Data in Modal
	const [modalId, setModalId] = useState('')

	// Handle Form Submit ------------------>
	const [imageUpload, setImageUpload] = useState(null)

	const [isPromptOpen, setIsPromptOpen] = useState(false)
	const [message, setMessage] = useState('')

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();

			if (accessionExists === true) {
				alert('Change Accession')
			}
			else {
				let downloadURL = '';
				let imageType = ''
				const imageRef = ref(storage, `images/${state.accession} `)
				if (imageUpload !== null) {
					await uploadBytes(imageRef, imageUpload)
					await getDownloadURL(imageRef).then(url => downloadURL = url)

					if (imageUpload.type === 'image/png') {
						imageType = '.png'
					}

					if (imageUpload.type === 'image/jpeg' || imageUpload.type === 'image/jpg') {
						imageType = '.jpg'
					}
				}

				const collectionRef = collection(db, "SPR/Rice_Accessions/Accession_IDs");
				const payLoad = {
					searchIndex: `${state.accession} ${state.variety} ${state.source} ${state.classification}`,
					accessionId: state.accession,
					classification: state.classification,
					variety: state.variety,
					source: state.source,
					imageUrl: downloadURL,
					imageFilename: `${state.accession}`,
					timestamp: serverTimestamp(),
				};
				await addDoc(collectionRef, payLoad);
				setIsModalOpen(false)
				setState(initialState)
				setMessage('Accession Added Successfully')
				setIsPromptOpen(true)
				setTimeout(() => {
					setIsPromptOpen(false)
				}, 1000)
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

	// Check Accession If Exists--------------->
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
	const [existingImage, setExistingImage] = useState('')
	const editRiceAccessionID = async (id, imageUrl) => {
		setIsEdit(true)
		setExistingImage(imageUrl)
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
			let downloadURL = existingImage;
			let imageType = '';
			if (imageUpload !== null) {
				const imageRef = ref(storage, `images/${state.accession} `)
				await uploadBytes(imageRef, imageUpload)
				await getDownloadURL(imageRef).then(url => downloadURL = url)
				if (imageUpload.type === 'image/png') {
					imageType = '.png'
				}

				if (imageUpload.type === 'image/jpeg' || imageUpload.type === 'image/jpg') {
					imageType = '.jpg'
				}
			}
			const docRef = doc(db, "SPR/Rice_Accessions/Accession_IDs", editId);
			const payLoad = {
				searchIndex: `${state.accession} ${state.variety} ${state.source} ${state.classification}`,
				classification: state.classification,
				variety: state.variety,
				source: state.source,
				imageUrl: downloadURL,
				imageFilename: `${state.accession}`,
				timestamp: serverTimestamp(),
			};

			await updateDoc(docRef, payLoad);
			setIsModalOpen(false)
			setState(initialState)
			setIsEdit(false)
			setMessage('Accession Updated Successfully')
			setIsPromptOpen(true)
			setTimeout(() => {
				setIsPromptOpen(false)
			}, 1000)
		} catch (error) {
			console.log(error);
		}
	}
	// Search Box ----------------------->
	const [searchInput, setSearchInput] = useState('')
	const handleSearchInput = (e) => {
		setSearchInput(e.target.value)
	}

	// Display  -------------------->
	const [riceAccessions, setRiceAccessions] = useState([]);

	// Display All -------------------->
	useEffect(() => {
		try {
			const collectionRef = collection(db, "SPR/Rice_Accessions/Accession_IDs");
			const unsub = onSnapshot(collectionRef, (snapshot) => {
				setRiceAccessions(
					snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
				);
				// setRiceAccessions(riceAccessions.sort())
			});

			return unsub;
		} catch (error) {
			console.log(error);
		}
	}, [searchInput]);

	// Sort Rice Accesssions
	riceAccessions.sort((a, b) => {
		return a.accessionId - b.accessionId
	})



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
						id: rice.id,
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

	// Count accessions ------------------>
	var list = 0

	// Delete Modal----------------->
	const [isDelModalOpen, setIsDelModalOpen] = useState(false)
	const [delId, setDelId] = useState('')
	const [delUrl, setDelUrl] = useState('')

	// Export Excel
	const exportExcel = () => {
		var XLSX = require("xlsx");
		var wb = XLSX.utils.book_new()
		if (searchInput === '') {
			var ws = XLSX.utils.json_to_sheet(riceAccessions)
		}
		else {
			var ws = XLSX.utils.json_to_sheet(searched)
		}


		XLSX.utils.book_append_sheet(wb, ws, `Special Purpose Rice Accessions`)

		XLSX.writeFile(wb, `Special_Purpose_Rice_Accessions.xlsx`)
	}

	useEffect(() => {
		const accessionInput = document.getElementById('input-accession')
		accessionInput?.focus()
	}, [isModalOpen])




	return (
		<>
			<div className="absolute top-0">

				<ModalSuccess open={isPromptOpen} close={() => { setIsPromptOpen(false) }} message={message} />
			</div>

			<div className='h-full w-full flex flex-col rounded-t-xl  sm:rounded-xl bg-white opacity-90 p-2 overflow-hidden'>

				{/* Header */}
				<header className=" flex items-center">
					<button
						className=" hidden sm:block w-8 h-8 p-2 rounded-full bg-gradient-to-b from-sprPrimary500 to-sprPrimary700 hover:bg-gradient-to-t hover:from-sprPrimary300 hover:to-sprPrimary300 drop-shadow-md"
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
							<form onSubmit={e => e.preventDefault()}>
								<input
									className=" pl-2 py-2 text-sm placeholder:text-sprPrimary500/50 text-sprPrimary500 focus:outline-none focus:border-none  rounded-full  "
									type="text"
									placeholder="Find a Rice"
									value={searchInput}
									onChange={handleSearchInput}
								/>
								<button className="  h-full px-2 rounded-full absolute right-0  bg-sprPrimary300">
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
						<div className="flex w-full max-h-0  lg:max-w-full  relative bg-yellow-400">
							<div className=' flex-col relative h-full w-full'>


								<div className=' sticky top-0 hidden sm:flex  border-b border-slate-200'>
									<div className='w-10 h-fit px-3 py-1 bg-white text-sprPrimary700 '>#</div>
									<div className=' w-full h-fit py-1 bg-white px-3 text-sprPrimary700'>Accession</div>
									<div className='w-full h-fit py-1 bg-white px-3 text-sprPrimary700'>Classification</div>
									<div className=' w-full h-fit py-1 bg-white px-3 text-sprPrimary700'>Variety</div>
									<div className='w-full h-fit py-1 bg-white px-3 text-sprPrimary700'>Source</div>
									<div className=' w-24 py-1 bg-white px-3 whitespace-nowrap flex flex-col justify-center  group relative' onClick={() => { exportExcel() }}>
										<ExcelIcon className='stroke-sprPrimary500 px-3 h-5 hover:stroke-sprPrimarySuperLight active:stroke-sprPrimary500' />
										<small className='hidden group-hover:block absolute right-0 top-6  bg-slate-900 rounded-sm text-white font-medium px-2'>Export Table</small>
									</div>
								</div>
								{
									searchInput === ''
										? <>{
											riceAccessions.map((rice) => (
												<div className='hidden sm:flex group cursor-pointer border-b border-slate-200 ' onClick={() => {
												}}>
													<div className='group-hover:bg-slate-200 group-active:bg-sprPrimary500  w-10 h-auto  bg-white p-3 text-sprPrimary500 ' >{list = list + 1} </div>
													<div className='group-hover:bg-slate-200 group-active:bg-sprPrimary500 w-full h-auto  bg-slate-50 p-3 text-slate-900'>{rice.accession === "" ? "---" : `CL-R${rice.accessionId}`}</div>
													<div className='group-hover:bg-slate-200 group-active:bg-sprPrimary500 w-full h-auto bg-slate-100 p-3 text-slate-900'>{rice.classification === "" ? "---" : rice.classification}</div>
													<div className='group-hover:bg-slate-200 group-active:bg-sprPrimary500 w-full h-auto bg-slate-50 p-3 text-slate-900'>{rice.variety === "" ? "---" : rice.variety}</div>
													<div className='group-hover:bg-slate-200 group-active:bg-sprPrimary500 w-full h-auto bg-slate-100 p-3 text-slate-900'>{rice.source === "" ? "---" : rice.source}</div>
													<div className='group-hover:bg-slate-50 group-active:bg-sprPrimary500   w-fit bg-white p-3  flex space-x-2'>
														<button
															className=" text-white text-sm bg-gradient-to-b from-sprPrimary500 to-sprPrimary700 rounded-full  hover:bg-gradient-to-t hover:from-sprPrimary300 hover:to-sprPrimary300 h-8 w-14 sm:h-6 sm:w-12 shadow-slate-300 "
															onClick={() => {
																setIsRiceInfoModalOpen(true)
																setModalId(rice.accessionId)
															}}
														>
															view
														</button>
														<button
															className=" max-h-6 lg:block p-1 bg-gradient-to-b from-sprPrimary500 to-sprPrimary700 hover:bg-gradient-to-t hover:from-sprPrimary300 hover:to-sprPrimary300   rounded-full   shadow-slate-300 "
															onClick={() => {
																editRiceAccessionID(rice.id, rice.imageUrl);
															}}
														>
															{/* <div className="w-4 h-4"><img src={editIcon} alt="" /></div> */}
															<EditIcon className="w-4 h-4 fill-white" />
														</button>
														<button
															className=" max-h-6 lg:block p-1 bg-gradient-to-b from-sprPrimary500 to-sprPrimary700 rounded-full  hover:bg-gradient-to-t hover:from-sprPrimary300 hover:to-sprPrimary300 shadow-slate-300 "
															onClick={() => {
																setDelId(rice.id)
																setModalId(rice.accessionId)
																setDelUrl(rice.imageUrl);
																setIsDelModalOpen(true)


															}}
														>
															<div className="w-4 h-4"><img src={delIcon} alt="" /></div>

														</button>
													</div>

												</div>
											))
										}</>

										: <>{
											searched.map((rice) => (
												<div className='hidden sm:flex group cursor-pointer border-b border-slate-200 ' onClick={() => {
													setIsRiceInfoModalOpen(true)
													setModalId(rice.accessionId)
												}}>
													<div className='group-hover:bg-slate-200 group-active:bg-sprPrimary500  w-10 h-auto  bg-white p-3 text-sprPrimary500' >{list = list + 1} </div>
													<div className='group-hover:bg-slate-200 group-active:bg-sprPrimary500 w-full h-auto  bg-slate-50 p-3 text-slate-900'>{rice.accession === "" ? "---" : `CL-R${rice.accessionId}`}</div>
													<div className='group-hover:bg-slate-200 group-active:bg-sprPrimary500 w-full h-auto bg-slate-100 p-3 text-slate-900'>{rice.classification === "" ? "---" : rice.classification}</div>
													<div className='group-hover:bg-slate-200 group-active:bg-sprPrimary500 w-full h-auto bg-slate-50 p-3 text-slate-900'>{rice.variety === "" ? "---" : rice.variety}</div>
													<div className='group-hover:bg-slate-200 group-active:bg-sprPrimary500 w-full h-auto bg-slate-100 p-3 text-slate-900'>{rice.source === "" ? "---" : rice.source}</div>
													<div className='group-hover:bg-slate-50 group-active:bg-sprPrimary500   w-fit bg-white p-3  flex space-x-2'>
														<button
															className=" text-white text-sm bg-gradient-to-b from-sprPrimary500 to-sprPrimary700 rounded-full  hover:bg-gradient-to-t hover:from-sprPrimary300 hover:to-sprPrimary300 h-8 w-14 sm:h-6 sm:w-12 shadow-slate-300 "
															onClick={() => {
																setIsRiceInfoModalOpen(true)
																setModalId(rice.accessionId)
															}}
														>
															view
														</button>
														<button
															className=" max-h-6 lg:block p-1 bg-gradient-to-b from-sprPrimary500 to-sprPrimary700 hover:bg-gradient-to-t hover:from-sprPrimary300 hover:to-sprPrimary300   rounded-full   shadow-slate-300 "
															onClick={() => {
																editRiceAccessionID(rice.id, rice.imageUrl);
															}}
														>
															{/* <div className="w-4 h-4"><img src={editIcon} alt="" /></div> */}
															<EditIcon className="w-4 h-4 fill-white" />
														</button>
														<button
															className=" max-h-6 lg:block p-1 bg-gradient-to-b from-sprPrimary500 to-sprPrimary700 rounded-full  hover:bg-gradient-to-t hover:from-sprPrimary300 hover:to-sprPrimary300 shadow-slate-300 "
															onClick={() => {
																setDelId(rice.id)
																setModalId(rice.accessionId)
																setDelUrl(rice.imageUrl);
																setIsDelModalOpen(true)


															}}
														>
															<div className="w-4 h-4"><img src={delIcon} alt="" /></div>

														</button>
													</div>


												</div>
											))
										}</>
								}
								<div className='w-full sm:hidden flex flex-col gap-2 p-2'>
									{
										searchInput === ''
											? <>
												{riceAccessions.map((rice) => (
													<div className="flex justify-between items-center  bg-slate-50">
														<div className="flex flex-col -space-y-3">
															<div className="px-6 py-4 text-3xl font-bold text-slate-800">CL-R{rice.accessionId}</div>
															<div className="px-6 py-2 text-md font-normal text-slate-800">{rice.classification} Season</div>
															<div className="px-6 py-2 text-md font-normal text-slate-800">{rice.variety}</div>
															<div className="px-6 py-2 text-md font-normal text-slate-800">{rice.source}</div>

														</div>
														<button className="mr-8 bg-sprPrimary500 hover:bg-sprPrimary500 active:bg-sprPrimary500 rounded-full p-1 px-2 text-white font-medium text-xl"
															onClick={() => {
																setIsRiceInfoModalOpen(true)
																setModalId(rice.accessionId)
															}}
														>view</button>
													</div>
												))}
											</>
											: <>
												{searched.map((rice) => (
													<div className="flex justify-between items-center  bg-slate-50">
														<div className="flex flex-col -space-y-3">
															<div className="px-6 py-4 text-3xl font-bold text-slate-800">CL-R{rice.accessionId}</div>
															<div className="px-6 py-2 text-md font-normal text-slate-800">{rice.classification} Season</div>
															<div className="px-6 py-2 text-md font-normal text-slate-800">{rice.variety}</div>
															<div className="px-6 py-2 text-md font-normal text-slate-800">{rice.source}</div>

														</div>
														<button className="mr-8 bg-sprPrimary500 hover:bg-sprPrimary500 active:bg-sprPrimary500 rounded-full p-1 px-2 text-white font-medium text-xl"
															onClick={() => {
																setIsRiceInfoModalOpen(true)
																setModalId(rice.accessionId)
															}}
														>view</button>
													</div>
												))}
											</>
									}

								</div>

							</div>



						</div>

					}
				</section>



				{/* Modals */}
				{/* Success Prompt */}

				{/* Add Rice Accession */}
				<ModalAddRiceAcc open={isModalOpen} >
					<div className="absolute right-4 top-4 z-50  ">
						<CloseIcon className='group-hover:stroke-white stroke-slate-500 hover:stroke-slate-800 active:stroke-sprPrimary500 h-5' onClick={() => {
							setIsModalOpen(false)
							setIsEdit(false)
							setState(initialState)
						}} />
					</div>
					<div className="flex">
						<h1 className="page-header text-2xl font-bold text-slate-800">{isEdit === false ? 'Add Rice Accession' : 'Edit Rice Accession'}</h1>
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
										<p className="text-2xl sm:text-4xl font-medium whitespace-nowrap text-sprPrimary500">CL-R</p>
										<input
											id="input-accession"
											className=" caret-sprPrimary500 w-full text-2xl sm:text-4xl font-medium  placeholder-sprPrimary300/20 text-sprPrimary500 focus:outline-none focus:ring-transparent bg-transparent"
											type="text"
											placeholder="XXXX"
											name="accession"
											value={state.accession}
											onChange={handleChange}
											required
											readOnly={isEdit === true ? true : false}
										/>
									</div>
									<p className="text-sprPrimary300 text-sm">{isEdit === false ? 'Enter Rice Accession ID Above' : '------------------'}</p>
								</div>
								<div className="flex flex-auto flex-row  w-full ">
									<div className="flex flex-col justify-center -space-y-2  w-1/2  mb-4">
										<div className="p-1 sm:p-2  flex flex-col ">
											<label className="text-sprPrimary500">Variety</label>
											<input

												className="caret-sprPrimary500 rounded-full sm:p-2 bg-slate-100 focus:outline-none focus:ring-1 focus:ring-sprPrimary500 focus:bg-white "
												type="text"
												name="variety"
												value={state.variety}
												onChange={handleChange}
											/>
										</div>
										<div className="p-1 sm:p-2  flex flex-col">
											<label className="text-sprPrimary500">Source</label>
											<input
												className="caret-sprPrimary500 rounded-full sm:p-2 bg-slate-100 focus:outline-none focus:ring-1 focus:ring-sprPrimary500 focus:bg-white "
												type="text"
												name="source"
												value={state.source}
												onChange={handleChange}
											/>
										</div>
										<div className="p-1 sm:p-2  flex flex-col">
											<label className="caret-sprPrimary500 text-sprPrimary500">Classification</label>
											<input
												className="rounded-full sm:p-2 bg-slate-100 focus:outline-none focus:ring-1 focus:ring-sprPrimary500 focus:bg-white "
												type="text"
												name="classification"
												value={state.classification}
												onChange={handleChange}
											/>
										</div>
									</div>
									<div className="flex justify-center items-center  w-1/2 ">
										<div className="group  rounded-b-lg  sprBorderDashed w-28 h-28 sm:w-52 sm:h-52  flex flex-col sm:gap-5 p-4  justify-center items-center bg-slate-100 overflow-hidden ">
											<ImageIcon fill="none" stroke="#CFD491" className="w-12 sm:w-16" />
											<div className="bg-sprPrimary300 group-hover:bg-sprPrimaryOffLight group-active:bg-sprPrimary500 relative rounded-full  ">
												<h6 className="absolute  left-1 top-2 sm:left-3 sm:top-1  text-white text-xs sm:text-sm  whitespace-nowrap font-medium" >Choose Image</h6>
												<input className="opacity-0 w-24 sm:w-32 " type="file" onChange={(e) => {
													setImageUpload(e.target.files[0])
												}} />

											</div>
											{imageUpload !== null ? <>{imageUpload.name}</> : <></>}
										</div>
									</div>
								</div>
							</div>
							<div className="text-right space-x-2 p-1">
								<button
									className="bg-slate-300 hover:bg-slate-100 hover:text-slate-300 active:bg-slate-500 active:text-white rounded-full py-2 px-3 text-sm font-medium text-white shadow-slate-300"
									onClick={() => {
										setIsModalOpen(false);
										setState(initialState)
										setIsEdit(false)
										setImageUpload(null)
									}}
								>
									Cancel
								</button>

								<button
									type="submit"
									className="bg-gradient-to-b from-sprPrimary500 to-sprPrimary700  active:bg-gradient-to-b active:from-sprPrimary500 active:to-sprPrimary700 hover:bg-gradient-to-t hover:from-sprPrimary300 hover:to-sprPrimary300 rounded-full py-2 px-3 text-sm font-medium text-white shadow-slate-300"

								>
									{isEdit === false ? 'Save' : 'Update'}
								</button>
							</div>

						</form>

					</div>


				</ModalAddRiceAcc>

				{/* Rice Accession Info */}
				<ModalAccessionsInfo open={isRiceInfoModalOpen} modalId={modalId} closeModal={() => { setIsRiceInfoModalOpen(false) }}  >

				</ModalAccessionsInfo>

				{/* Delete Prompt */}
				<ModalDelete open={isDelModalOpen} closeModal={() => { setIsDelModalOpen(false) }} modalId={modalId} delId={delId} delUrl={delUrl}>

				</ModalDelete>
			</div>

		</>
	);
}


// Delete all using batch