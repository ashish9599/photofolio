import { createContext, useContext, useEffect, useState } from "react";
import { db } from "./firebase";
import {updateDoc, deleteDoc,onSnapshot, collection,doc ,setDoc} from "firebase/firestore";
import { toast } from "react-toastify";
const photoContext=createContext();
export const useValue=()=>{
    const value=useContext(photoContext);
    return value;
}


export const PhotoProvider=({children})=>{
  const [createAlbum,setAlbum]=useState([]);
  const [update,setUpdate]=useState(false);
  const [imageId,setImageId]=useState('');
const [searching,setSearching]=useState(true);
  // dd
  const [searcN,setSearchN]=useState('');
const [searchDone,setSearchDone]=useState(true);  


useEffect(()=>{
onSnapshot(collection(db,"albums"),(snapshot)=>{
// console.log(snapshot);
  const album=snapshot.docs.map((doc)=>{ 
     return {
      id:doc.id,
      ...doc.data()
 }
})
setAlbum(album);
})

},[])
const addPhotos=async(AlbumInput)=>{
    const docRef=doc(collection(db,"albums"));
   await setDoc(docRef, {
    album:AlbumInput,
    createdOn:new Date()
  });
}
 const handleupdate=async(albumId,title,imageUrl,update)=>{
    // e.preventDefault()
    if(!update){
       const docRef=doc(collection(db, "albums" ,albumId,'images'));
      await setDoc(docRef, {
        title:title,
        imageUrl:imageUrl,
        createdOn:new Date()
      });
      toast.success(" Image Added succeffuly")
      
    }else{
      const docRef=doc(db,"albums",albumId ,"images",imageId);
      await updateDoc(docRef,{
        title:title,
        imageUrl:imageUrl,
      });
      toast.success(" Image updated succeffuly")
      setUpdate(!update);
      // console.log(update);
    }
      
  }
  
  const remove=async (id)=>{
    const docRef=doc(db,"albums",id);
    await deleteDoc(docRef);
  }
  const removeImage=async (id,albumId)=>{
  const docRef=doc(db,"albums",albumId ,"images",id);
     await deleteDoc(docRef);
}
  const updateImage= (id)=>{
setUpdate(!update);
setImageId(id);
  
}




    return (
        <photoContext.Provider value={{
        addPhotos,handleupdate,searchDone,setSearchDone,
          removeImage,  remove,createAlbum
             ,updateImage,update,setUpdate , setSearchN,searcN
                   ,searching,setSearching
  
}}>
             {children}
        </photoContext.Provider>
    )
  }
  
  
  
  
  