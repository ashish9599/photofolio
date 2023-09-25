import styles from '../styles/Imagelist.module.css'
import {Link} from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useValue } from '../photoContext'
import { useEffect, useState } from 'react'
import { db } from "../firebase";
import {onSnapshot, collection} from "firebase/firestore";
import { toast } from 'react-toastify'

const Imagelist=()=>{
  const [imageArray,setImage]=useState([]);
    const {albumId}=useParams();
   console.log(albumId);

const{createAlbum,setUpdate,removeImage,updateImage}=useValue();
useEffect(()=>{
    // setSearching(true);
    setUpdate(false);
})

useEffect(()=>{
    createAlbum.map((album)=>{
        if(albumId===album.id){
            document.title=album.album
        }
        return album;
        })
// console.log(typeof(createAlbum));        
   },[albumId,createAlbum])
useEffect(()=>{
    const unsub=onSnapshot(collection(db, "albums" ,albumId,'images'),(snapshot)=>{
    // console.log(snapshot);
      const images=snapshot.docs.map((doc)=>{ 
         return {
          id:doc.id,
          ...doc.data()
     }
    })
    setImage(images);
    })
    
    },[albumId]);   
const removeImageN=(imageId,albumId)=>{
  removeImage(imageId,albumId);
toast.success("image deleted succeffully")
}
    return (
   <>
   <div  className={styles.imagelist}>
    <div className={styles.imagelisttop}>
        <Link to={`/`}>
        <span>
            <img src="https://iridescent-faloodeh-3725ab.netlify.app/assets/back.png" alt="" />
        </span>
        </Link>
        <h2>{imageArray.length>0?"":"NO Image Found"}</h2>
    <Link to={`/imageform/${albumId}`}>
        <button>Add Image</button>
       </Link>
    </div>
     <div className={styles.imageContainer}>
        {imageArray.map((image,index)=>(

            <div key={index} className={styles.imageContainerframe}>
                  <div className={styles.imageContainerframei}>
                    <Link to={`/imageform/${albumId}`}>
                     <img onClick={()=>updateImage(image.id)} src="https://iridescent-faloodeh-3725ab.netlify.app/assets/edit.png" alt="" />
                     </Link>
                   </div>
                  <div className={styles.imageContainerframeDelete}>
                   <img onClick={()=>removeImageN(image.id,albumId)} src="https://iridescent-faloodeh-3725ab.netlify.app/assets/trash-bin.png" alt="" />
                 </div>
                 <div className={styles.imageContainerImg}>

                 <img className={styles.imageContainerImgB} src={image.imageUrl} alt={image.title} />
                 </div>
                 <span >{image.title}</span>
             </div>
     ))}
     </div>



   </div>
   </>
        )
    
    }
    export default Imagelist;