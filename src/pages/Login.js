
import { useRef } from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth, login, signup } from "../firebase-config"
import { ReactComponent as OryzappLogo } from "../assets/oryzapp-logo.svg"
import { addDoc, collection, setDoc } from "firebase/firestore"
import db from "../firebase-config";
import { decode, encode } from "string-encode-decode"
import { auth } from "../firebase-config";




export default function Login() {
	const [loginWithUsername, setLoginWithusername] = useState(false)
	const currentUser = useAuth()
	const navigate = useNavigate()

	const [state, setState] = useState({
		email: '',
		password: ''
	})

	const initialState = {
		email: '',
		password: ''
	}

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

	const handleLogIn = async (e) => {


		try {
			e.preventDefault();
			await login(state.email, state.password)
			navigate('/')
		} catch (error) {
			console.log(error);
		}
	}


	const handleSignUp = async (e) => {


		try {
			e.preventDefault();

			// Encrypt Password to save to database
			const enPass = encode(state.password)
			console.log(enPass);

			const collectionRef = collection(db, "AUTH")
			const payLoad = {
				email: state.email,
				password: enPass,
				role: 'user'
			}
			console.log('payload');
			console.log(payLoad);

			await addDoc(collectionRef, payLoad);
			await signup(state.email, state.password)
			// await auth.signOut();
			// navigate('/login');
			navigate('/')

		} catch (error) {
			console.log(error);
		}
	}




	return (
		<div className="h-full bg-white absolute top-0 bottom-0 right-0 left-0 flex justify-center items-center">
			<div className="bg-slate-100  p-4 pt-10 -mt-16 rounded-xl  w-80 flex flex-col items-center drop-shadow-xl ">
				<div className=" m-2 mb-6">
					<OryzappLogo className="h-10" />
				</div>
				<div>currently logged in as {currentUser?.email}</div>
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
							<input onChange={handleChange} type="pasword" name="password" value={state.password} className="rounded-full h-8 p-3 text-gray-700" required />
						</div>
						<button className="bg-yellow-500 w-full rounded-full py-2 text-white font-medium">Login</button>
					</form>
				</div>
				<div className={loginWithUsername === false ? "bg-slate-200 w-52 h-52 rounded-lg" : "hidden"}>
				</div>

				<div className="mb-4 text-slate-500">OR</div>

				<div className={loginWithUsername === true ? "hidden" : "cursor-pointer"} onClick={() => {
					setLoginWithusername(true)
					setState(initialState)
				}}><u className="text-yellow-500 font-light underline">Log In with Username</u></div>
				<div className={loginWithUsername === false ? "hidden" : "cursor-pointer"} onClick={() => {
					setState(initialState)
					setLoginWithusername(false)
				}}><u className="text-yellow-500 font-light" >Log In with Scanner</u></div>
				<div className={loginWithUsername !== true ? "hidden" : "pt-2 cursor-pointer flex text-sm"} onClick={() => {
					setState(initialState)
					setLoginWithusername('signup')
				}}><p className="font-light text-sprGray">Don't have an account?</p> <p className="text-yellow-500 font-light underline">Sign Up</p></div>


				{/* <div className="w-full h-32 "></div> */}






			</div>
		</div>
	)
}