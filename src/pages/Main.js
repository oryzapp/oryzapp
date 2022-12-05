import { useEffect, useState } from "react"
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import Dash from './Dash';
import ManageUsers from "./ManageUsers";
import RiceList from "./RiceList";
import RiceAccessions from "./RiceAccessions";
import RiceData from "./RiceData";
import RiceGallery from "./RiceGallery";
import ScanCode from "./ScanCode";
import RiceTables from "./RiceTables";
import { collection, onSnapshot } from "firebase/firestore";
import db, { auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';


const Main = () => {
	const navigate = useNavigate()

	const [page, setPage] = useState('dashboard');
	const [isAdmin, setIsAdmin] = useState(false)

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

	// Authentication--------->
	useEffect(() => {
		const unsub = onAuthStateChanged(auth, async (user) => {

			const matchUser = users.find((dbUser) => dbUser.email === user.email)
			console.log(matchUser.role);

			if (user !== null) {

				if (matchUser.role === 'Administrator') {
					setIsAdmin(true)
					console.log('user-is-admin');
				}
				if (matchUser.role === 'User') {
					setIsAdmin(false)
					setPage('scan-code')
					console.log('user-is-not-admin');
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
		})
		return unsub

	}, [users])

	// Navigation of Pages
	const getPage = () => {
		if (isAdmin === true) {
			switch (page) {
				case 'dashboard':
					return <Dash />
				case 'users':
					return <ManageUsers />
				case 'rice-accessions':
					return <RiceAccessions />
				case 'rice-list':
					return <RiceList />
				case 'rice-data':
					return <RiceData />
				case 'rice-gallery':
					return <RiceGallery />
				case 'scan-code':
					return <ScanCode />

			}
		}
		else {
			switch (page) {

				case 'rice-gallery':
					return <RiceGallery />
				case 'scan-code':
					return <ScanCode />

			}
		}
	}

	return (
		<div className=" bg-sprBackground flex flex-col h-screen relative ">
			<div className="">
				<Topbar />
			</div>
			<div className=" px-2 py-0 flex-col-reverse h-full max-h-full flex  sm:gap-2 sm:flex-row sm:p-0 sm:pb-2 sm:pr-2  ">
				<Sidebar onChange={setPage} />
				{getPage()}

			</div>
		</div>
	)
}

export default Main