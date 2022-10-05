import Mainbar from "./components/Mainbar";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

function App() {
  return (
    <div className="bg-sprGray flex flex-col">
      <div >
      <Topbar/>
      </div>
      <div className="h-screen  flex flex-auto gap-2">
      <Sidebar/>
      <Mainbar/>
      </div>
      
    </div>
  );
}

export default App;
