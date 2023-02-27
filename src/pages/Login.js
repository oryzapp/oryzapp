
import { useRef } from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth, login, signup } from "../firebase-config"
import { ReactComponent as OryzappLogo } from "../assets/oryzapp-logo.svg"
import { ReactComponent as OryzappNewLogo } from "../assets/oryzapp-new-logo.svg"
import { addDoc, collection, doc, onSnapshot, setDoc } from "firebase/firestore"
import db from "../firebase-config";
import { decode, encode } from "string-encode-decode"
import palayBG from "../assets/palay-background.png"
import clsuLogo from "../assets/clsu-logo.png"
import clsuRETLogo from "../assets/clsu-ret-logo.png"
import { auth } from "../firebase-config";
import QrScanner from "qr-scanner"
import { async } from "@firebase/util"
import { onAuthStateChanged } from "firebase/auth"
import ModalSuccess from "../components/ModalSuccess"




export default function Login() {

	const currentUser = useAuth()
	const navigate = useNavigate()

	// Email, Scan, or SignUp
	const [mode, setMode] = useState('email')
 
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

	// print errors--------------->
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
// Sign Up User--------------->
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
// Qr Scanner log In--------------->
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

	return (
		<div className="h-full  absolute top-0 bottom-0 right-0 left-0 flex justify-center items-center">
			{/* Background */}
			<div className=" absolute h-screen w-screen overflow-hidden ">
				<div className="h-full w-full bg-black/30 backdrop-blur-sm absolute z-10 font-"></div>
				<img src={palayBG} alt="" className=" h-full sm:w-full" />
			</div>

		<div className="  hidden md:flex w-1/2 h-full  z-50  justify-center items-center space-x-10">
			<img src={clsuLogo}  className="md:h-48 lg:h-64" alt="" />
			<img src={clsuRETLogo} className="md:h-48 lg:h-64" alt="" />

		</div>
		<div className="bg-white  w-full md:w-1/2 h-full flex flex-col z-50 px-16 lg:px-32 justify-center  space-y-3">
			<OryzappNewLogo className="h-16 md:h-24"/>
			<h1 className="text-2xl md:text-3xl  font-semibold whitespace-nowrap text-center text-slate-800">Welcome Researcher.</h1>
			
			{/* Email Login */}
				<form onSubmit={handleLogIn}>
					<div className={mode === 'email' ?'flex flex-col space-y-3':'hidden'}>
						<input onChange={handleChange} type="email" name="email" value={state.email}  placeholder="Email" className="bg-slate-100  text-base   rounded-full font-light p-3 focus:outline-2 focus:outline-sprPrimary "/>
						<input onChange={handleChange} type="password" name="password" placeholder="Password" className="bg-slate-100 text-base   rounded-full font-light p-3 focus:outline-2 focus:outline-sprPrimary"/>
						<button type="submit" className="bg-sprPrimary text-base  font-bold text-white rounded-full p-3 ">Login</button>
					</div>
				</form>

			{/* Scanner Login */}
			<div className={mode==='scanner' ? 'flex flex-col  justify-center  items-center space-y-3':'hidden'}>
				<div className="bg-slate-200 w-52 h-52 rounded-lg">
					<video id="qr-scan" ref={scanRef} className="h-full w-full"></video>
				</div>
			<button type="submit" className="bg-sprPrimary text-base  font-bold text-white rounded-full p-3">Scan Code</button>
			</div>

			{/* Signup */}
			<form onSubmit={handleSignUp}>

			<div className={mode === 'signup' ?'flex flex-col space-y-3 ':'hidden'}>
				<div className="flex flex-col">
					<label  className="text-sm text-slate-500" htmlFor="fname">
						First Name
					</label>
					<input required type="text" placeholder="e.g. Juan" className="bg-slate-100 text-base   rounded-full font-light p-3 focus:outline-2 focus:outline-sprPrimary"/>
				</div>
				<div className="flex flex-col text-slate-500">
					<label className="text-sm" htmlFor="fname">
						Email
					</label>
					<input required onChange={handleChange} type="email" name="email" value={state.email} placeholder="e.g. delacruz.juan@clsu2.edu.ph" className="bg-slate-100 text-base   rounded-full font-light p-3 focus:outline-2 focus:outline-sprPrimary"/>
				</div>
				<div className="flex flex-col text-slate-500">
					<label className="text-sm" htmlFor="fname">
						Password
					</label>
					<input required onChange={handleChange} type="password" name="password" value={state.password} placeholder="e.g. Juan" className="bg-slate-100 text-base   rounded-full font-light p-3 focus:outline-2 focus:outline-sprPrimary"/>
				</div>
			<button type="submit" className="bg-sprPrimary text-base  font-bold text-white rounded-full p-3">Sign Up</button>

			</div>
			</form>


			<div className="flex flex-col  items-center space-y-2">
				<h3 className="text-slate-500">OR</h3>
				<div className="flex flex-col items-center ">
				<h3 className={mode === 'scanner' ? 'underline text-amber-500 cursor-pointer block': 'hidden'} onClick={()=>{setMode('email')}} >Login with Email</h3>
				<h3 className={mode === 'email' ? 'underline text-amber-500 cursor-pointer block': 'hidden'} onClick={()=>{setMode('scanner')}} >Login with Scanner</h3>
				<h3 className={mode === 'signup'?'hidden':'text-slate-500'}>Don't have an account? <u className="text-amber-500 cursor-pointer" onClick={()=>{setMode('signup')}} >Sign Up</u></h3>
				</div>
				
			</div>

		</div>
			
			
		</div>
	)
}

// Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).
// Firebase: Error (auth/wrong-password).