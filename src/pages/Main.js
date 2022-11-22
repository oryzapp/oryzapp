import { useState } from "react"
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

const Main = () => {
	const [page, setPage] = useState('dashboard');

	const getPage = () => {
		console.log(page)
		switch (page) {
			case 'dashboard':
				return <Dash />
			case 'users':
				return <ManageUsers />
			case 'rice-list':
				return <RiceList />
			case 'rice-accessions':
				return <RiceAccessions />
			case 'rice-data':
				return <RiceData />
			case 'rice-gallery':
				return <RiceGallery />
			case 'scan-code':
				return <ScanCode />

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