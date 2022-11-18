import { ReactComponent as SearchIcon } from "../assets/search-icon.svg"
export default function SearchBar() {
    return (
        <div className=" flex  items-center gap-1 sm:gap-3   rounded-full">

            <div className="relative drop-shadow-md ">
                <input
                    className=" pl-2 py-2  w-36 text-sm placeholder:text-sprPrimary/50 text-sprPrimary focus:outline-none focus:border-none  rounded-full "
                    type="text"
                    placeholder="Find a Rice"
                />
                <button className="  h-full px-2 rounded-full absolute right-0 bg-sprPrimaryLight">
                    <SearchIcon />
                </button>
            </div>
        </div>
    )
}
