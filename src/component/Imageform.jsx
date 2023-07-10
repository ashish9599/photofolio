import styles from '../styles/Imageform.module.css'
import { useValue } from '../photoContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
const Imageform=()=>{
  const [ImageInput,setImageData]=useState({title:"",imageUrl:""});
  // setupdate
  const titleRef =useRef(null);
  const {albumid}=useParams();
  const {update,handleupdate}=useValue();
  const navigate=useNavigate();
  const clearImageInput=()=>{
    setImageData({title:"",imageUrl:""});
  }
 const handleImageSubmit=async(e,albumid)=>{
  e.preventDefault();
  if(ImageInput.imageUrl==""||ImageInput.title==""){
    toast.info("Please fill all the fields")
    return;
  }
  handleupdate(albumid,ImageInput,update);
  setImageData({title:"",imageUrl:""});
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
            <input type="text"  placeholder='Title' required
            value={ImageInput.title}
            ref={titleRef}
            onChange={(e)=>setImageData({title:e.target.value,imageUrl:ImageInput.imageUrl})}
            />
            <input type="text" placeholder='Image Url' required
            value={ImageInput.imageUrl}
             onChange={(e)=>setImageData({title:ImageInput.title,imageUrl:e.target.value})}
           
            />
            <div className={styles.imageformbuttonWrapper}> 

            <button onClick={()=>clearImageInput()}>Clear</button>
              <button type='submit' className={update?styles.update:styles.add}> {update?"Update":"Add"}</button>
            </div>
           </form>
        </div>
        </>
    )
    }
    export default Imageform;