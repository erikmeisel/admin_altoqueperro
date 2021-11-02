import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, updateDoc, doc, addDoc,deleteDoc } from 'firebase/firestore/lite';
let firebaseConfig = {
  apiKey: "AIzaSyCJbQVG3LMv5eEDMZ4s6PpBbCKsiceDfs8",
  authDomain: "1:577052019206:android:e4fb80fb9cea5c494f5187",
  databaseURL: "https://altoqueperro-821dd-default-rtdb.firebaseio.com",
  projectId: "altoqueperro-821dd",
  storageBucket: "altoqueperro-821dd.appspot.com",
  messagingSenderId: "1:577052019206:android:e4fb80fb9cea5c494f5187",
  appId: "1:577052019206:android:e4fb80fb9cea5c494f5187",
};
let app = initializeApp(firebaseConfig);
let db = getFirestore(app);

export async function get(col) {
  const dataCol = collection(db, col);
  const dataSnapshot = await getDocs(dataCol);
  const dataList = dataSnapshot.docs.map(doc => { return {id:doc.id,data:doc.data()}});
  return dataList;
}    
export async function update(col,id,value) {
  const docRef = doc(db, col+'/'+id);
  return await updateDoc(docRef, value);
}    
export async function create(col,value) {
  const docRef = collection(db, col);
  return await addDoc(docRef, value);
}    
export async function del(col,id) {
  const docRef = doc(db, col+'/'+id);
  return await deleteDoc(docRef);
}    

export default  {app,db} 
