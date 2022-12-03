import { async } from "@firebase/util";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import db from "./firebase-config";

export const addRiceAccession = async () => {
  const accessionId = prompt("Accession ID");
  const classification = prompt("classification");
  const variety = prompt("variety");
  const source = prompt("source");

  const collectionRef = collection(db, "SPR/Rice_Accessions/Accession_IDs");
  const payLoad = {
    accessionId,
    classification,
    variety,
    source,
    timestamp: serverTimestamp(),
  };
  await addDoc(collectionRef, payLoad);
};

export const editRiceAccessionID = async (id) => {
  const accessionId = prompt("Accession ID");
  const classification = prompt("classification");
  const variety = prompt("variety");
  const source = prompt("source");

  const docRef = doc(db, "SPR/Rice_Accessions/Accession_IDs", id);
  const payLoad = {
    accessionId,
    classification,
    variety,
    source,
    timestamp: serverTimestamp(),
  };

  updateDoc(docRef, payLoad);
};


export const deleteRiceAccession = async (id) => {
  try {
    const docRef = doc(db, "SPR/Rice_Accessions/Accession_IDs", id);
    await deleteDoc(docRef);
    return alert('Accession Deleted')

  } catch (error) {
    console.log(error);
  }

};


// Responsive (sorta) template for table
{/* <section className={showTable === true ? "flex-auto overflow-auto  scrollbar bg-white rounded-lg border border-slate-200 w-full" : "hidden"}>
  <div className="flex w-full max-h-0 sm:max-h-0 sm:max-w-0  lg:max-w-full relative bg-yellow-400">

    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi quasi blanditiis consectetur ut nesciunt provident ratione numquam! Ab voluptates ipsa perferendis nihil numquam alias quos impedit totam incidunt nisi beatae, deserunt praesentium doloremque mollitia officiis repellat repellendus. Impedit molestiae sunt, quos inventore incidunt fuga ea id. Excepturi id ex porro praesentium sapiente aliquam qui beatae, pariatur sit consectetur quisquam placeat labore minus blanditiis iste atque quis corporis totam ipsum! Quae laudantium quas ad debitis? Perspiciatis excepturi non optio voluptas iusto quidem hic, perferendis fugit nisi, eveniet dicta temporibus sunt reprehenderit provident nihil beatae amet consequatur placeat adipisci porro! Voluptas reprehenderit molestiae dolores possimus, animi perspiciatis! Dolore repellat adipisci minima vel incidunt commodi nesciunt dolorum iste nostrum in, quam assumenda asperiores velit soluta ipsum quis fuga ea ipsa distinctio? Eius architecto, similique corporis provident autem delectus vel amet quos ipsum quod a consequatur consectetur. Doloribus eligendi quibusdam autem quae ratione molestias nobis ullam delectus atque sit, sed inventore in repudiandae beatae consequatur quaerat reiciendis sapiente numquam voluptate. Corporis voluptatum sequi saepe fugiat consequuntur aliquid quos, vel quod repellat, hic eligendi ipsam ducimus ipsum incidunt. Unde sapiente non mollitia aliquid blanditiis aspernatur dolor, consequuntur sit nobis odit explicabo, nihil facere nulla impedit.
  </div>
</section> */}