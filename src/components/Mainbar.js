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

export default function Mainbar() {
  return (
    <div className="w-full max-w-full mr-2 mb-2 p-3 flex flex-col gap-2 rounded-xl bg-white opacity-90 ">
      <Routes>
        <Route path="/" element={<Dashboard />} />
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
        </Route>
        <Route path="/rice-gallery" element={<RiceGallery />} />
        <Route path="/scan-code" element={<ScanCode />} />
      </Routes>
    </div>
  );
}
