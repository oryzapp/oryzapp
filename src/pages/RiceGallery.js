import { useEffect, useState } from "react"
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../firebase-config";

export default function RiceGallery() {

  const [imageList, setImageList] = useState([])
  const imageListRef = ref(storage, "images/")
  useEffect(() => {
    try {
      listAll(imageListRef).then((response) => {
        console.log(response.items);
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            setImageList((prev) => [...prev, url])
            console.log(imageList);
          })
        })
      })

    } catch (error) {
      console.log(error);
    }
  }, [])

  return (
    <>
      <div className=' w-full flex flex-col rounded-xl bg-white opacity-90 p-2'>
        {/* Header */}
        <header className="flex items-center">
          <h1 className="text-3xl font-bold text-sprBlack opacity-80">Rice Gallery</h1>
        </header>
        {/* Options */}
        <div className="flex  items-center gap-3 ">
          <div className="relative drop-shadow-sm">
            <input
              className=" pl-2 py-1 text-sm placeholder:text-sprPrimary/40 text-sprPrimary focus:outline-none focus:border-none  rounded-full "
              type="text"
              placeholder="Find a Rice"
            />
            <button className=" w-8 h-full rounded-full absolute right-0 bg-sprPrimaryLight">
              o
            </button>
          </div>
          <div className="relative py-1 bg-white rounded-full drop-shadow-sm">
            Filter
            <div className=" hidden absolute w-28 h-auto rounded-sm p-2 z-50  bg-white">
              <label className="block" htmlFor="">
                <input type="checkbox" name="Season" id="Season" />
                Season
              </label>
              <label className="block" htmlFor="">
                <input type="checkbox" name="Season" id="Season" />
                Year
              </label>
              <label className="block" htmlFor="">
                <input type="checkbox" name="Season" id="Season" />
                Variety
              </label>
            </div>
          </div>
        </div>
        {/* Main */}
        <section className=" w-full flex-auto overflow-auto rounded-sm scrollbar">
          <div className="h-96">
            <div className=" grid grid-cols-2 lg:grid-cols-5 p-3">
              {imageList.map((item) => (
                <div className="bg-sprPrimarySuperLight m-1 p-2 flex justify-center items-start relative rounded-xl ">
                  {/* <div className="absolute bottom-0 bg-sprPrimaryLight h-1/4 w-full rounded-xl p-2">
                  <div className="flex flex-col ">
                    <h1 className=" text-sm whitespace-nowrap sm:text-xl font-bold text-sprGray ">
                      CL-500
                    </h1>
                    <h6 className="text-xs font-medium text-sprGray60">
                      Wet Season
                    </h6>
                    <h6 className="text-xs font-medium text-sprGray60">
                      poop
                    </h6>
                  </div>
                </div> */}
                  <img className="w-full rounded-md" src={item} />
                </div>

              ))}
            </div>
          </div>


        </section>
      </div>


    </>
  );
}
