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
import ModalRiceInfo from "../components/ModalAccessionsInfo";
import db from "../firebase-config";
import { storage } from "../firebase-config";
import { ref, uploadBytes } from "firebase/storage"
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
import { ReactComponent as ListIcon } from "../assets/list-icon.svg"
import { ReactComponent as GridIcon } from "../assets/grid-icon.svg"
import { v4 } from "uuid";
import { QRCodeCanvas } from "qrcode.react";
import ModalAccessionsInfo from "../components/ModalAccessionsInfo";
import ModalDelete from "../components/ModalDelete";

export default function RiceAccessions() {

	// Open and Close Modal ------------------->
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isRiceInfoModalOpen, setIsRiceInfoModalOpen] = useState(false);
	// Data in Modal
	const [modalId, setModalId] = useState('')

	console.log('Modal id:' + modalId);

	// Handle Form Submit ------------------>
	const [imageUpload, setImageUpload] = useState(null)

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			const collectionRef = collection(db, "SPR/Rice_Accessions/Accession_IDs");
			const payLoad = {
				searchIndex: `${state.accession} ${state.variety} ${state.source} ${state.classification}`,
				accessionId: state.accession,
				classification: state.classification,
				variety: state.variety,
				source: state.source,
				timestamp: serverTimestamp(),
			};

			if (accessionExists === true) {
				alert('Change Accession')
			}
			else {
				if (imageUpload !== null) {
					const imageRef = ref(storage, `images/${state.accession} `)
					uploadBytes(imageRef, imageUpload).then(() => {
						alert("image uploaded")
					})
				}

				await addDoc(collectionRef, payLoad);



				setIsModalOpen(false)
				setState(initialState)
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
			const docRef = doc(db, "SPR/Rice_Accessions/Accession_IDs", editId);
			const payLoad = {
				searchIndex: `${state.accession} ${state.variety} ${state.source} ${state.classification}`,
				classification: state.classification,
				variety: state.variety,
				source: state.source,
				timestamp: serverTimestamp(),
			};

			if (imageUpload !== null) {
				const imageRef = ref(storage, `images/${state.accession} `)
				uploadBytes(imageRef, imageUpload).then(() => {
					alert("image uploaded")
				})
			}
			await updateDoc(docRef, payLoad);
			setIsModalOpen(false)
			setState(initialState)
			setIsEdit(false)
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

		// if (searchInput !== "") {
		// 	riceAccessions.map((rice) => {


		// 		const match = rice.accessionId.toLowerCase()
		// 		const search = match.includes(searchInput)
		// 		if (search === true) {
		// 			searchList.push({
		// 				accessionId: rice.accessionId,
		// 				classification: rice.classification,
		// 				variety: rice.variety,
		// 				source: rice.source
		// 			})

		// 		}
		// 	})
		// }


		// setSearched(searchList)
	}, [searchInput])

	console.log(searched);


	// Count accessions ------------------>
	var list = 0

	// Delete Modal----------------->
	const [isDelModalOpen, setIsDelModalOpen] = useState(false)
	const [delId, setDelId] = useState('')
	console.log(delId);



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
											<div className="px-8 py-2 text-md font-medium text-sprGray60 whitespace-nowrap bg-slate-50"> {rice.accessionId === "" ? "---" : rice.accessionId} </div>
										))}</> : <>
										{searched.map((rice) => (
											<div className="px-8 py-2 text-md font-medium text-sprGray60 whitespace-nowrap bg-slate-50"> {rice.accessionId === "" ? "---" : rice.accessionId} </div>
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
								<div className=" text-sprPrimary bg-white  px-10 py-2 sticky top-0 text-sm font-medium">
									<h1 className="opacity-0">
										Action
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
													className="hidden lg:block p-1 bg-gradient-to-b from-sprPrimary to-sprPrimaryDarkest hover:bg-gradient-to-t hover:from-sprPrimaryLight hover:to-sprPrimaryLight   rounded-full   shadow-slate-300 "
													onClick={() => {
														editRiceAccessionID(rice.id);
													}}
												>
													<div className="w-4 h-4"><img src={editIcon} alt="" /></div>
												</button>
												<button
													className="hidden lg:block p-1 bg-gradient-to-b from-sprPrimary to-sprPrimaryDarkest rounded-full  hover:bg-gradient-to-t hover:from-sprPrimaryLight hover:to-sprPrimaryLight shadow-slate-300 "
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
							<div className="bg-yellow-300 w-full flex sm:hidden flex-col divide-y divide-slate-300">
								{riceAccessions.map((rice) => (
									<div className="flex flex-col -space-y-3">
										<div className="px-6 py-2 text-2xl font-bold text-sprGray"> {rice.accessionId} </div>
										<div className="px-6 py-2 text-md font-normal text-sprPrimaryLight"> {rice.classification === '' ? "---" : rice.classification} </div>

									</div>
								))}


							</div>

						</div>
					}
				</section>



				{/* Modals */}
				{/* Add Rice Accession */}
				<ModalAddRiceAcc open={isModalOpen} >
					<div className="absolute right-5 z-50 ">
						<button onClick={() => {
							setIsModalOpen(false)
							setIsEdit(false)
							setState(initialState)
						}}>
							<img className="relative" src={closeIcon} alt="" />
						</button>
					</div>
					<div className="flex">
						<h1 className="page-header text-2xl font-bold text-sprGray70">Add Rice Accession</h1>
					</div>
					<div className="flex-auto relative">
						<form
							className="flex flex-col h-full "
							onSubmit={isEdit === true ? submitEdit : handleSubmit}
						>
							<div className="p-4">
								<div className={isEdit === true ? "hidden" : "block"}>
									<div className={accessionExists === true ? "block text-red-500 text-sm" : "hidden"}>*Accession already exists</div>

								</div>
								<input
									className=" w-full text-4xl font-medium py-px placeholder-sprPrimaryLight/50 text-sprPrimary focus:outline-none focus:ring-transparent bg-transparent"
									type="text"
									placeholder="CL-XXXX"
									name="accession"
									value={state.accession}
									onChange={handleChange}
									required
									readOnly={isEdit === true ? true : false}
								/>
							</div>
							<div className="flex flex-auto flex-col lg:flex-row pb-20  w-full">
								<div className="flex flex-col  -space-y-2  w-1/2">


									<div className="p-4  flex flex-col ">
										<label className="text-sprPrimary">Variety</label>
										<input

											className="rounded-full p-2  border border-sprPrimary focus:outline-none focus:ring-1 focus:ring-sprPrimary focus:bg-sprPrimaryLight/30"
											type="text"
											name="variety"
											value={state.variety}
											onChange={handleChange}
										/>
									</div>
									<div className="p-4  flex flex-col">
										<label className="text-sprPrimary">Source</label>
										<input
											className="rounded-full p-2 border border-sprPrimary focus:outline-none focus:ring-1 focus:ring-sprPrimary focus:bg-sprPrimaryLight/30"
											type="text"
											name="source"
											value={state.source}
											onChange={handleChange}
										/>
									</div>
									<div className="p-4  flex flex-col">
										<label className="text-sprPrimary">Classification</label>
										<input
											className="rounded-full p-2 border border-sprPrimary focus:outline-none focus:ring-1 focus:ring-sprPrimary focus:bg-sprPrimaryLight/30"
											type="text"
											name="classification"
											value={state.classification}
											onChange={handleChange}
										/>
									</div>
								</div>
								<div className="flex justify-center items-center   w-1/2">

									<div className=" rounded-b-lg  sprBorderDashed w-3/4 h-3/4  flex flex-col gap-5  justify-center items-center bg-slate-100 ">
										<ImageIcon fill="none" stroke="#CFD491" className="w-16" />
										<div className="bg-sprPrimaryLight relative rounded-full ">
											<h6 className="absolute left-4 top-1 text-white font-medium" >Choose Image</h6>
											<input className="opacity-0 w-32" type="file" onChange={(e) => {
												setImageUpload(e.target.files[0])
											}} />

										</div>
									</div>
								</div>
							</div>
							<div className="text-right space-x-2">
								<button
									className="bg-sprGray30 rounded-full py-2 px-3 text-sm font-medium text-white shadow-slate-300"
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
									className="bg-sprPrimary rounded-full py-2 px-3 text-sm font-medium text-white shadow-slate-300"

								>
									Save
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

