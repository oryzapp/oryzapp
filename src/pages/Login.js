import { useRef } from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth, login } from "../firebase-config"
import { ReactComponent as OryzappLogo } from "../assets/oryzapp-logo.svg"

export default function Login() {
	const [loginWithUsername, setLoginWithusername] = useState(false)
	const currentUser = useAuth()
	const navigate = useNavigate()
	const handleLogIn = async () => {
		// console.log(emailRef.current.value);
		// console.log(passwordRef.current.value);
		try {
			await login(emailRef.current.value, passwordRef.current.value)
			navigate('/')
		} catch (error) {
			alert(error)
		}
	}

	const emailRef = useRef()
	const passwordRef = useRef()

	return (
		<div className="h-full bg-white absolute top-0 bottom-0 right-0 left-0 flex justify-center items-center">
			<div className="bg-slate-100  p-4 pt-10 -mt-16 rounded-xl  w-80 flex flex-col items-center drop-shadow-xl ">
				<div className=" m-2 mb-6">
					<OryzappLogo className="h-10" />
				</div>
				{/* <div>currently logged in as {currentUser?.email}</div> */}
				<div className={loginWithUsername === true ? "w-52 h-52 rounded-lg mb-4" : " hidden"}>

					<div className="flex flex-col pb-3">
						<label className="text-yellow-500" htmlFor="">Email</label>
						<input ref={emailRef} type="text" name="email" id="" className="rounded-full h-8 p-2  text-gray-700" required />
					</div>

					<div className="flex flex-col pb-3">
						<label htmlFor="" className="text-yellow-500">Password</label>
						<input ref={passwordRef} type="text" name="email" id="" className="rounded-full h-8 p-3 text-gray-700" required />
					</div>
					<button className="bg-yellow-500 w-full rounded-full py-2 text-white font-medium" onClick={handleLogIn}>Login</button>
				</div>
				<div className={loginWithUsername === false ? "bg-slate-200 w-52 h-52 rounded-lg mb-4" : "hidden"}>

				</div>

				<div className="mb-4 text-slate-500">OR</div>
				<div className={loginWithUsername === true ? "hidden" : "cursor-pointer"} onClick={() => {
					setLoginWithusername(true)
				}}><u className="text-yellow-500 font-light underline">Log In with Username</u></div>
				<div className={loginWithUsername === false ? "hidden" : "cursor-pointer"} onClick={() => {
					setLoginWithusername(false)
				}}><u className="text-yellow-500 font-light" >Log In with Scanner</u></div>

				<div className="w-full h-32 "></div>






			</div>
		</div>
	)
}
