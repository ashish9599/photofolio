import styles from '../styles/Imageform.module.css'
import { storage } from "../firebase";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useValue } from '../photoContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

const Imageform=()=>{
  const [etitle,setTitle]=useState('');
  const titleRef =useRef(null);
  const {albumid}=useParams();
  const {update,handleupdate}=useValue();
  const navigate=useNavigate();
  const clearImageInput=(e)=>{
    
    setTitle('');
  }
  console.log(update)
  const handleImageSubmit=async(e,albumid)=>{
    e.preventDefault();
    const title=e.target[0].value;
    const file=e.target[1].files[0];
    if(!file){
       return toast.info("Please fill the form");
    }
      const storageRef = ref(storage, `Album/${albumid}`);
    //  if(!update){
       await  uploadBytesResumable(storageRef, file)
    //  }else{
      // Create a reference to the file whose metadata we want to change
// var forestRef = storageRef.child('images/forest.jpg');

// // Create file metadata to update
// var newMetadata = {
//   cacheControl: 'public,max-age=300',
//   contentType: 'image/jpeg'
// };

// // Update metadata properties
// forestRef.updateMetadata(newMetadata)
//   .then((metadata) => {
//     // Updated metadata for 'images/forest.jpg' is returned in the Promise
//   }).catch((error) => {
//     // Uh-oh, an error occurred!
//   });
    //  }
      const imageUrl=await getDownloadURL(storageRef);
      handleupdate(albumid,title,imageUrl,update);
      setTitle("");
      navigate(`/image/${albumid}`)
}
useEffect(()=>{
  titleRef.current.focus();
 },[])
 
return (
        <>
         <div  className={styles.imageform}>
         <Link to={`/image/${albumid}`}>
          <span>
             <img src="https://iridescent-faloodeh-3725ab.netlify.app/assets/back.png" alt="" />
          </span>
        </Link>
        <span>{update?"Update Image":"Create Image"}</span>
        <form action="" onSubmit={(e)=>handleImageSubmit(e,albumid)}>
            <input type="text"  placeholder='Title' 
            ref={titleRef}
            value={etitle}
            required
            onChange={(e)=>setTitle(e.target.value)}
            />
                  
            <input  style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src="https://iridescent-faloodeh-3725ab.netlify.app/assets/photos.png" alt="" />        
            <span>Add an Image</span>
          </label>
            <div className={styles.imageformbuttonWrapper}> 

            <button onClick={(e)=>clearImageInput(e)}>Clear</button>
              <button type='submit' className={update?styles.update:styles.add}> {update?"Update":"Add"}</button>
            </div>
           </form>
        </div>
        </>
    )
    }
    export default Imageform;