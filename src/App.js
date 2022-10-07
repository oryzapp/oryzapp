import Mainbar from "./components/Mainbar";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

function App() {
  return (
    <div className="bg-sprBackground flex flex-col h-screen">
      <div>
        <Topbar />
      </div>
      <div className=" flex flex-auto gap-2 bg-black ">
        <Sidebar />
        <Mainbar />
      </div>
    </div>
  );
}

export default App;
