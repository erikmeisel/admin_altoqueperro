import  firebase  from 'firebase/compat';
import { getFirestore, collection, getDocs, updateDoc, doc, addDoc,deleteDoc } from 'firebase/firestore/lite';
import env from '../config/.env'

let app = firebase.initializeApp(env.firebaseConfig);
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

export async function uploadFile(file){
  try {
    let stoRef = await app.firebase.storage().ref('images/'+ file.name).put(file)
    let downloadUrl = stoRef.ref.getDownloadURL()
    return downloadUrl
  } catch(ex) {
    console.log(ex)
    return null
  }
}

export default  {app,db} 
