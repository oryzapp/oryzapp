import { Navigate } from 'react-router-dom';
import { useAuthState } from '../components/AuthProvider';
import LoadingPage from './Loading';
import { auth } from '../firebase-config';
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import Mainbar from '../components/Mainbar';

export default function Dashboard() {
  const { status } = useAuthState();


  if (status === 'fetched') {

    return (

      <div className=" bg-sprBackground flex flex-col h-screen relative ">
        <div className="">
         
          <Topbar />
        </div>
        <div className=" px-2 py-0 flex-col-reverse h-full max-h-full flex  sm:gap-2 sm:flex-row sm:p-0 sm:pb-2 sm:pr-2 ">
          <Sidebar />
          <Mainbar />
        </div>
      </div>
    );
  } else if (status === 'pending') {
    return (
      <LoadingPage />
    )
  }
}
