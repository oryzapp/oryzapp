import oryzaLogo from "../assets/oryzapp-logo.svg";

export default function Topbar() {
  return (
    <div className=" my-2 -ml-4  mr-2  pl-4 sm:pl-8 sm:pr-2 py-3 flex items-center space  sm:bg-white rounded-xl">
      <div className="flex-auto">
        <img src={oryzaLogo} alt="" />
      </div>
      <div className=" h-6 w-full flex flex-auto gap-2 justify-end">
        <p className="hidden sm:block">
          Kumusta, <strong className="text-sprPrimary">Juaan</strong>
        </p>
        <div className="h-6 w-6 rounded-full bg-black"></div>
      </div>
    </div>
  );
}
