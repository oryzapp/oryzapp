
import { useRef } from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth, login, signup } from "../firebase-config"
import { ReactComponent as OryzappLogo } from "../assets/oryzapp-logo.svg"
import { addDoc, collection, setDoc } from "firebase/firestore"
import db from "../firebase-config";
import { decode, encode } from "string-encode-decode"
import { auth } from "../firebase-config";
import QrScanner from "qr-scanner"
import { async } from "@firebase/util"




export default function Login() {

	const [loginWithUsername, setLoginWithusername] = useState(false)
	const currentUser = useAuth()
	const navigate = useNavigate()

	// email and password input
	const [state, setState] = useState({
		email: '',
		password: ''
	})
	// reset email and password input
	const initialState = {
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
	const [error, setError] = useState(false)
	const [errorPassword, setErrorPassword] = useState(false)

	const handleLogIn = async (e) => {


		try {
			e.preventDefault();
			await login(state.email, state.password)
			console.log('try state');
			console.log(state);

			setError(false)
			navigate('/')

		} catch (error) {
			console.log('umm waht');
			console.log(state);
			setError(true)
			// setTimeout(() => { setError(false) }, 20000)
			setState(initialState)

		}
	}




	const handleSignUp = async (e) => {
		try {
			e.preventDefault();
			// Saving to Database
			if (state.password.length <= 6) {
				setErrorPassword(true)
				setTimeout(() => { setErrorPassword(false) }, 20000)
			}
			else {
				// Encrypt Password to save to database
				const enPass = encode(state.password)
				console.log(enPass);

				const collectionRef = collection(db, "AUTH")
				const payLoad = {
					email: state.email,
					password: enPass,
					role: 'User',
					searchIndex: `${state.email} User`
				}
				await addDoc(collectionRef, payLoad);
			}
			// Signing Up
			await signup(state.email, state.password)
			navigate('/')
		} catch (error) {
			// setError(true)
			console.log(error);
		}
	}

	// Qr Scanner


	const scanRef = useRef(null)

	const [isStopped, setIsStopped] = useState(true)

const video = document.getElementById('qr-scan')              

const startScanning = async () =>{
const qrScanner = new QrScanner(video,result =>
		{ 
		console.log(result.data)
		const parsed = JSON.parse(result.data)
		console.log(parsed.email);
		console.log(decode(parsed.password));
		const scannedEmail = parsed.email
		const scannedPassword = decode(parsed.password)
		
		// setState({
		// 	email: scannedEmail,
		// 	password: scannedPassword
		// })

		// console.log('setState');
		// console.log(state);
		
		const logginIn = async () =>{
			await login(scannedEmail, scannedPassword)
			navigate('/')
		}

		logginIn()


		setTimeout(()=>{
			qrScanner.destroy()
		}, 3000)
		}, 
		{
		highlightScanRegion: true,
		highlightCodeOutline: true,
		}
		)
		qrScanner.start()
}




	return (
		<div className="h-full bg-white absolute top-0 bottom-0 right-0 left-0 flex justify-center items-center">
			<div className="bg-slate-100  p-4 pt-10 -mt-16 rounded-xl  w-80 flex flex-col items-center justify-center drop-shadow-xl ">
				<div className=" m-2 mb-6">
					<OryzappLogo className="h-10" />
				</div>
				{errorPassword == true ? <div className="text-sprTertiary/80 text-sm text-center">*Password should be at least 8 characters</div> : <></>}
				{error == true ? <div className="text-sprTertiary/80 text-sm text-center">*Incorrect username or password</div> : <></>}
				<div className={loginWithUsername === 'signup' ? "w-52 h-52 rounded-lg " : " hidden"}>
					<form onSubmit={handleSignUp}>
						<div className="flex flex-col pb-3">
							<label className="ary text-sprPrimary" htmlFor="">Email</label>
							<input onChange={handleChange} type="email" name="email" value={state.email} className="rounded-full h-8 p-2  text-gray-700" required />
						</div>

						<div className="flex flex-col pb-3">
							<label htmlFor="" className=" text-sprPrimary">Password</label>
							<input onChange={handleChange} type="password" name="password" value={state.password} className="rounded-full h-8 p-3 text-gray-700" required />
						</div>
						<button className="bg-sprPrimary  w-full rounded-full py-2 text-white font-medium" >Sign Up</button>
					</form>

				</div>
				<div className={loginWithUsername === true ? "w-52 h-52 rounded-lg " : " hidden"}>

					<form onSubmit={handleLogIn}>
						<div className="flex flex-col pb-3">
							<label className="text-yellow-500" htmlFor="">Email</label>
							<input onChange={handleChange} type="email" name="email" value={state.email} className="rounded-full h-8 p-2  text-gray-700" required />
						</div>

						<div className="flex flex-col pb-3">
							<label htmlFor="" className="text-yellow-500">Password</label>

							<input onChange={handleChange} type="password" name="password" value={state.password} className="rounded-full h-8 p-3 text-gray-700" required />
						</div>
						<button className="bg-yellow-500 hover:bg-yellow-500/50 active:bg-yellow-500 w-full rounded-full py-2 text-white font-medium">Login</button>
					</form>
				</div>
				<div className={loginWithUsername === false ? "bg-slate-200 w-52 h-52 rounded-lg" : "hidden"}>
					<video id="qr-scan" ref={scanRef} className="h-full w-full"></video>
				</div>
					<button onClick={()=>{
						startScanning()


						setIsStopped(false)}}>Scan Code</button>

				<div className="mb-4 text-slate-500">OR</div>

				<div className={loginWithUsername === true ? "hidden" : "cursor-pointer"} onClick={() => {
					setLoginWithusername(true)
					setState(initialState)
					setError(false)
					setIsStopped(true)
				}}><u className="text-yellow-500 font-light underline">Log In with Username</u></div>
				<div className={loginWithUsername === false ? "hidden" : "cursor-pointer"} onClick={() => {
					setState(initialState)
					setLoginWithusername(false)
					setError(false)
					setIsStopped(true)

				}}><u className="text-yellow-500 font-light" >Log In with Scanner</u></div>
				<div className={loginWithUsername !== true ? "hidden" : "pt-2 cursor-pointer flex text-sm"} onClick={() => {
					setState(initialState)
					setLoginWithusername('signup')
					setError(false)
					setIsStopped(false)
					
				}}><p className="font-light text-sprGray">Don't have an account?</p> <p className="text-yellow-500 font-light underline">Sign Up</p></div>


				{/* <div className="w-full h-32 "></div> */}






			</div>
		</div>
	)
}