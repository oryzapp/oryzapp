import { useNavigate } from "react-router-dom";
import Scanner from "../components/Scanner";
export default function ScanCode() {
  const navigate = useNavigate()
  return (
    <>
      {/* Header */}
      <header className=" flex items-center">
        <h1 className="text-3xl font-bold text-sprBlack opacity-80">
          Scan Code
        </h1>
      </header>

      {/* Main */}
      <section className=" w-full flex flex-auto overflow-auto rounded-sm scrollbar">
        <div className="bg-blue-400 w-1/4 flex flex-col">
          <Scanner />
        </div>
        <div className="bg-red-600 w-3/4" ></div>

      </section>
    </>
  );
}
