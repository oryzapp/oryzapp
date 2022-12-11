import { useEffect, useState } from "react"
import { getDownloadURL, getMetadata, listAll, ref } from "firebase/storage";
import { storage } from "../firebase-config";
import ModalViewImage from "../components/ModalViewImage";

export default function RiceGallery() {

  const [imageList, setImageList] = useState([])
  const imageListRef = ref(storage, "images/")
  useEffect(() => {
    try {
      listAll(imageListRef).then((response) => {
        console.log(response.items);
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            setImageList((prev) => [...prev, {name:item.name, url}])
          })
        })
      })

     
    } catch (error) {
      console.log(error);
    }
  }, [])

  console.log(imageList);

  const [isModalOpen, setIsModalOpen] = useState(false)
  const[modalItems, setModalItems] = useState({
    url:'',
    accession:''
  })

  

  imageList.sort((a,b)=> a.name > b.name ? 1 : -1 )

  console.log(modalItems);

  return (
    <>
      <div className=' h-full w-full flex flex-col rounded-t-xl sm:rounded-xl bg-white opacity-90 p-2'>
        {/* Header */}
        <header className="flex items-center">
          <h1 className="text-3xl font-bold text-sprBlack opacity-80">Rice Gallery</h1>
        </header>
        {/* Main */}
        <section className="flex-auto overflow-auto  scrollbar bg-white rounded-lg border border-slate-200 w-full">
          <div className="flex w-full max-h-0 lg:max-w-full relative bg-yellow-400">
            <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 p-3">
                      {imageList.map((item) => (
                        <div className="group m-1 p-2 flex justify-center items-start relative rounded-xl flex-col border border-slate-100 shadow-md shadow-slate-100  hover:bg-sprPrimarySuperLight active:bg-sprPrimary" onClick={()=>{
                          setIsModalOpen(true)
                          setModalItems(
                            {
                              url:item.url,
                              accession:item.name
                            }
                          )
                        }}>
                          <div className=" bg-white h-32 overflow-hidden rounded-md">
                        <img className="w-full rounded-md" src={item.url} />

                          </div>
                        <div className="">
                        <h1 className="font-semibold group-hover:text-sprPrimary group-active:text-white">CL-R{item.name}</h1>
                        </div>
                        </div>
                      ))}
            </div>
         </div>
        </section>
      </div>
      <ModalViewImage open={isModalOpen} close={()=>setIsModalOpen(false)} modalItems={modalItems}/>
    </>
  );
}
