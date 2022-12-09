import { useEffect, useState } from "react"
import { getDownloadURL, getMetadata, listAll, ref } from "firebase/storage";
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
            setImageList((prev) => [...prev, {name:item.name, url}])
          })
        })
      })

      // // Get metadata properties
      // getMetadata(imageListRef)
      //   .then((metadata) => {
      //     // Metadata now contains the metadata for 'images/forest.jpg'
      //     // console.log('beeee');
      //     // console.log(metadata.size);
      //   })
      //   .catch((error) => {
      //     // Uh-oh, an error occurred!
      //   });

    } catch (error) {
      console.log(error);
    }
  }, [])

  console.log(imageList);

  

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
                        <div className="bg-sprPrimarySuperLight m-1 p-2 flex justify-center items-start relative rounded-xl flex-col">
                          <div className="h-40 bg-white  rounded-md">
                        <img className="w-full" src={item.url} />

                          </div>
                        <div className="">
                        <h1 className="font-semibold">{item.name}</h1>
                        </div>
                        </div>
                      ))}
            </div>
         </div>
        </section>
      </div>
    </>
  );
}

// import { useEffect, useState } from "react"
// import { getDownloadURL, getMetadata, listAll, ref } from "firebase/storage";
// import { storage } from "../firebase-config";

// export default function RiceGallery() {

//   const [imageInfo, setImageInfo] = useState([])
//   const imageListRef = ref(storage, "images")
//   useEffect(() => {
//     console.log(imageInfo);
//     var imageInfoArr = []
//     try {
//       listAll(imageListRef).then((response) => {
//         // console.log(response.items);
//         response.items.forEach((item) => {
//           // console.log(item.fullPath);
//           // console.log(item.name);
//           // setImageName((prev)=>[...prev, item.name])
//           getDownloadURL(item).then((url) => {
//             // console.log(url);
//             // console.log(item.name);
//             // setImageList((prev) => [...prev, url])
//             // setImageInfo((info))
//             // console.log(imageList);
//             imageInfoArr.push({ name: item.name, url : url })
//           })
//         })
//       })
//       setImageInfo(imageInfoArr)

//     } catch (error) {
//       console.log(error);
//     }
//   }, [])

//  console.log(imageInfo)
// //  imageInfo.map((item)=>{
// //   console.log(item.name);
// //  })


//   return (
//     <>
//       <div className=' h-full w-full flex flex-col rounded-t-xl sm:rounded-xl bg-white opacity-90 p-2'>
//         {/* Header */}
//         <header className="flex items-center">
//           <h1 className="text-3xl font-bold text-sprBlack opacity-80">Rice Gallery</h1>
//         </header>
      
//         {/* Main */}
//         {/* <section className=" w-full flex-auto overflow-auto rounded-sm scrollbar">
//           <div className="h-96">
//             <div className=" grid grid-cols-2 lg:grid-cols-5 p-3">
//               {imageList.map((item) => (
//                 <div className="bg-sprPrimarySuperLight m-1 p-2 flex justify-center items-start relative rounded-xl ">
                
//                   <img className="w-full rounded-md" src={item} />
//                 </div>

//               ))}
//             </div>
//           </div>


//         </section> */}
//         <section className="flex-auto overflow-auto  scrollbar bg-white rounded-lg border border-slate-200 w-full">
//   <div className="flex w-full max-h-0 sm:max-h-0 sm:max-w-0  lg:max-w-full relative bg-yellow-400">
//   <div className=" grid grid-cols-2 lg:grid-cols-5 p-3">

//                  {
//                     imageInfo.map((item)=>( 
//                     <div className="bg-yellow-900">
//                       {/* <div>{item.name}</div> */}
//                       <div>trial</div>
//                       <div>
//                         {/* <img className="h-20" src={item.url} alt="" /> */}
//                         <div className="h-20 bg-blue-100"></div>
//                       </div>
//                     </div>
//                     ))
//                  }

             
//             </div>
//   </div>
  
 


// </section>
//       </div>


//     </>
//   );
// }
