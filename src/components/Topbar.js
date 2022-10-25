import oryzaLogo from "../assets/oryzapp-logo.svg";

export default function Topbar() {
  return (
    <div className=" my-2 -ml-4  mr-2 pl-8 pr-2 py-3 flex items-center space  bg-white rounded-xl">

      <div className="flex-auto">
        <img src={oryzaLogo} alt="" />
      </div>
      <div className="bg-blue-200 h-6 w-full flex flex-auto gap-2 justify-end">
        <p>Kumusta, Juaan</p>
        <div className="h-6 w-6 rounded-full bg-black"></div>
      </div>
    </div>
  );
}
