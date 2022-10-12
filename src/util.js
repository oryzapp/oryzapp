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
  const docRef = doc(db, "SPR/Rice_Accessions/Accession_IDs", id);
  await deleteDoc(docRef);
};
