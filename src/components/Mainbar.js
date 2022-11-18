import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import RiceList from "./../pages/RiceList";
import RiceAccessions from "./../pages/RiceAccessions";
import Dashboard from "./../pages/Dashboard";
import ManageUsers from "./../pages/ManageUsers";
import RiceData from "./../pages/RiceData";
import RiceGallery from "./../pages/RiceGallery";
import ScanCode from "./../pages/ScanCode";
import VegetativeStage from "./../pages/VegetativeStage";
import ReproductiveStage from "./../pages/ReproductiveStage";
import GrainCharacteristics from "./../pages/GrainCharacteristics";
import YieldComponents from "./../pages/YieldComponents";
import ModalAddRiceData from "./ModalAddRiceData";
import Login from "../pages/Login";
import { useAuth } from "../firebase-config"

export default function Mainbar() {
  const currentUser = useAuth()
  return (
    <div className=" h-full max-h-full w-full max-w-full  p-3 flex flex-col gap-2 rounded-t-xl sm:rounded-xl bg-white opacity-90 overflow-hidden relative sm:ml-0 ">
      <Routes>
        <Route exact path="/" element={<Dashboard />} ></Route>
        <Route path="/manage-users" element={<ManageUsers />} />
        <Route path="/rice-list" element={<RiceList />} />
        <Route path="/rice-accessions" element={<RiceAccessions />} />
        <Route path="/rice-data" element={<RiceData />}>
          <Route path="vegetative-stage" element={<VegetativeStage />} />
          <Route path="reproductive-stage" element={<ReproductiveStage />} />
          <Route
            path="grain-characteristics"
            element={<GrainCharacteristics />}
          />
          <Route path="yield-components" element={<YieldComponents />} />
          <Route path="add-rice-data" element={<ModalAddRiceData />} />
        </Route>
        <Route path="/rice-gallery" element={<RiceGallery />} />
        <Route path="/scan-code" element={<ScanCode />} />
      </Routes>
    </div>
  );
}
