
import { useRef } from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth, login, signup } from "../firebase-config"
import { ReactComponent as OryzappLogo } from "../assets/oryzapp-logo.svg"
import { ReactComponent as LoginBackground } from "../assets/login-background.svg"
import { addDoc, collection, doc, onSnapshot, setDoc } from "firebase/firestore"
import db from "../firebase-config";
import { decode, encode } from "string-encode-decode"
import { auth } from "../firebase-config";
import QrScanner from "qr-scanner"
import { async } from "@firebase/util"
import { onAuthStateChanged } from "firebase/auth"
import ModalSuccess from "../components/ModalSuccess"




export default function Login() {

	const [loginWithUsername, setLoginWithusername] = useState(false)
	const currentUser = useAuth()
	const navigate = useNavigate()

	// email and password input
	const [state, setState] = useState({
		fname:'',
		lname:'',
		email: '',
		password: ''
	})
	// reset email and password input
	const initialState = {
		fname:'',
		lname:'',
		email: '',
		password: ''
	}
	// When inputs change
	const handleChange = (e) => {
		setState(
			{
				...state,
				[e.target.name]: e.target.value,
			}
		)
	}
	
	useEffect(() => {

	})

	// print errors
	const [errorMessage, setErrorMessage] = useState('error')
	const [isError, setIsError] = useState(false)

	// Users----------------->
	const [users, setUsers] = useState([])
	useEffect(() => {
	  const collectionRef = collection(db, 'AUTH')
	  const unsub = onSnapshot(collectionRef, (snapshot) => {
		setUsers(
		  snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
		);
	  });
  
	  return unsub;
	}, [])

	// Login--------------->
	const handleLogIn = async (e) => {
		try {
			e.preventDefault();

			const matchUser = users?.find((dbUser) => dbUser?.email === state?.email)

			if( matchUser === undefined){
				setIsError(true)
				setErrorMessage('* Account does not exist')
				setState(initialState)
				setTimeout(()=>{
					setIsError(false)
				},5000)
				
			}
			else{
				if(matchUser.role === 'Disabled'){
				setIsError(true)
				setErrorMessage('*Account is Disabled')
				setTimeout(()=>{
					setIsError(false)
				},5000)
				}
				else{
					setIsError(false)
					await login(state.email, state.password)
					navigate('/')
				}
			}

		} catch (error) {
			console.log(error.message);
			if(error.message === 'Firebase: Error (auth/wrong-password).'){
				setIsError(true)
				setErrorMessage('* Password You entered is incorrect')
				setState(
					{
						email: state.email,
						password: ''
					}
				)
				setTimeout(()=>{
					setIsError(false)
				},5000) 
			}
			if(error.message.includes('(auth/too-many-requests).')){
				setIsError(true)
				setErrorMessage('*Too many attempts please try again after a while')
				setState(
					{
						email: state.email,
						password: ''
					}
				)
				setTimeout(()=>{
					setIsError(false)
				},5000)
			}
			

		}
	}
// Sign Up User
	const handleSignUp = async (e) => {
		try {
			e.preventDefault(); 

			const matchUser = users?.find((dbUser) => dbUser?.email === state?.email)
			console.log(matchUser);
			if( matchUser !== undefined){
				setIsError(true)
				setErrorMessage('* Email already in use')
			}
			else{
				if (state.password.length <= 6) {
					
					setIsError(true)
					setErrorMessage('* Password should be at least 8 Characters')
					setState({
						fname:'',
						lname:'',
						email:state.email,
						password:''
					})
				}
				else{
					// Encrypt Password to save to database
					setIsError(false)
					const enPass = encode(state.password)
					const collectionRef = doc(db, "AUTH",state.email)
					const payLoad = {
						fname:state.fname,
						lname:state.lname,
						email: state.email,
						password: enPass,
						role: 'Guest',
						type:'New',
						searchIndex: `${state.fname} ${state.lname} ${state.email} `
					}
					// // Store Credentials
					await setDoc(collectionRef, payLoad);
					
					// // Signing Up
					await signup(state.email, state.password)
					
				
					navigate('/')

				}

			 }
		
			
		} catch (error) {
			console.log(error);
		}
	}

// Qr Scanner log In
const scanRef = useRef(null)

const video = document.getElementById('qr-scan')              

const startScanning = async () =>{
try {
	
	const qrScanner = new QrScanner(video,result =>
	{ 
		try {
			const parsed = JSON.parse(result.data)
			const scannedEmail = parsed.email
			const scannedPassword = decode(parsed.password)
			console.log(scannedEmail);
			console.log(scannedPassword);
			
			const logginIn = async () =>{
				await login(scannedEmail, scannedPassword)
				navigate('/')
			}

			const matchUser = users?.find((dbUser) => dbUser?.email === scannedEmail)
			
			if(matchUser.role === 'Disabled'){
				setIsError(true)
				setErrorMessage('* Sorry your account is disabled')
					
			}
			else{
				logginIn()
				setTimeout(()=>{
				qrScanner.destroy()
				}, 1000)
			}		
			} 
		catch (error) 
			{
				console.log(error);
			}
	}, 	
	{
		highlightScanRegion: true,
		highlightCodeOutline: true,
	})


	qrScanner.start()
	setTimeout(()=>{
				qrScanner.destroy()
			}, 15000)
} catch (error) {
	console.log(error);
}
}



// For Prompt

	return (
		<div className="h-full bg-white absolute top-0 bottom-0 right-0 left-0 flex justify-center items-center">
			{/* Background */}
			{/* <div className=" absolute h-screen w-screen ">
				<div className="h-full w-full bg-white/30 backdrop-blur-lg absolute z-10"></div>
				<LoginBackground  className="absolute bottom-0"/>
			</div> */}

			<div className="bg-white  p-4 pt-10 -mt-16 rounded-xl  w-80 flex flex-col items-center justify-center drop-shadow-xl z-50 ">
				{/* Logo */}
				<div className=" m-2 mb-6">
					<OryzappLogo className="h-10" />
				</div>
				{/* Error Message */}
				{isError === true ? <div className="text-sprTertiary/80 text-sm text-center">{errorMessage}</div>:<></>}
				{/* Signup */}
				<div className={loginWithUsername === 'signup' ? "w-52 h-auto rounded-lg" : " hidden"}>
					<form onSubmit={handleSignUp}>
						<div className="flex flex-col pb-3">
							<label className="ary text-sprPrimary" htmlFor="">First Name</label>
							<input onChange={handleChange} type="text" name="fname" value={state.fname} className="rounded-full h-8 p-2  text-gray-700 ring-2 ring-sprPrimary/60 focus:outline-none focus:bg-sprPrimary/10" required />
						</div>
						<div className="flex flex-col pb-3">
							<label className="ary text-sprPrimary" htmlFor="">Last Name</label>
							<input onChange={handleChange} type="text" name="lname" value={state.lname} className="rounded-full h-8 p-2  text-gray-700 ring-2 ring-sprPrimary/60 focus:outline-none focus:bg-sprPrimary/10" required />
						</div>
						<div className="flex flex-col pb-3">
							<label className="ary text-sprPrimary" htmlFor="">Email</label>
							<input onChange={handleChange} type="email" name="email" value={state.email} className="rounded-full h-8 p-2  text-gray-700 ring-2 ring-sprPrimary/60 focus:outline-none focus:bg-sprPrimary/10" required />
						</div>
						<div className="flex flex-col pb-3">
							<label htmlFor="" className=" text-sprPrimary">Password</label>
							<input onChange={handleChange} type="password" name="password" value={state.password} className="rounded-full h-8 p-3 text-gray-700 ring-2 ring-sprPrimary/60 focus:outline-none focus:bg-sprPrimary/10" required />
						</div>
						<button className="bg-sprPrimary/80  hover:bg-sprPrimary/50 active:bg-sprPrimary  w-full rounded-full py-2 text-white font-medium" type='submit'>Sign Up</button>
					</form>

				</div>
				{/* Login */}
				<div className={loginWithUsername === true ? "w-52 h-52 rounded-lg " : " hidden"}>
					<form onSubmit={handleLogIn}>
						<div className="flex flex-col pb-3">
							<label className="text-yellow-500" htmlFor="">Email</label>
							<input onChange={handleChange} type="email" name="email" value={state.email} className="rounded-full h-8 p-2  text-gray-700 ring-2 ring-yellow-300 focus:outline-none focus:bg-yellow-100/50" required  />
						</div>

						<div className="flex flex-col pb-3">
							<label htmlFor="" className="text-yellow-500">Password</label>

							<input onChange={handleChange} type="password" name="password" value={state.password} className="rounded-full h-8 p-3 text-gray-700 ring-2 ring-yellow-300 focus:outline-none focus:bg-yellow-100/50" required />
						</div>
						<button className="bg-yellow-500 hover:bg-yellow-300 active:bg-yellow-600 w-full rounded-full py-2 text-white font-medium" type='submit'>Login</button>
					</form>
				</div>
				{/* QR Scan */}
				<div className={loginWithUsername === false ? "bg-slate-200 w-52 h-52 rounded-lg mb-3" : "hidden"}>
					<video id="qr-scan" ref={scanRef} className="h-full w-full "></video>
				</div>
					<button onClick={()=>{
						startScanning()
						}}
						className={loginWithUsername === false ?"bg-yellow-400 rounded-full p-2 text-white font-medium hover:bg-yellow-200 active:bg-yellow-500":"hidden"}
						>
							Scan Code</button>

				<div className="mb-4 text-slate-500">OR</div>

				<div className={loginWithUsername === true ? "hidden" : "cursor-pointer"} onClick={() => {
					setLoginWithusername(true)
					setState(initialState)
				setIsError(false)
				}}><u className="text-yellow-500 font-light underline">Log In with Email</u></div>

				<div className={loginWithUsername === false ? "hidden" : "cursor-pointer"} onClick={() => {
					setState(initialState)
					setLoginWithusername(false)
				setIsError(false)

				}}><u className="text-yellow-500 font-light" >Log In with Scanner</u></div>
				<div className={loginWithUsername === 'signup' ? "hidden" : "pt-2 cursor-pointer flex text-sm"} onClick={() => {
					setState(initialState)
					setLoginWithusername('signup')
					setIsError(false)
					
				}}><p className="font-light text-sprGray">Don't have an account?</p> <p className="text-yellow-500 font-light underline">Sign Up</p></div>
				{/* <div className="w-full h-32 "></div> */}

			</div>
		</div>
	)
}

// Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).
// Firebase: Error (auth/wrong-password).