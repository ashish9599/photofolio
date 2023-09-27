import styles from '../styles/Albumform.module.css'
import {useValue} from '../photoContext';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
const Albumform=({setShowAlbum,showAlbum})=>{
    const [AlbumInput,setInputData]=useState('');
  console.log(typeof(AlbumInput));
  console.log(typeof(''));
    const titleRef =useRef(null);
    const {addPhotos} =useValue();
    const handleSubmit=(e)=>{
        e.preventDefault();
      
        addPhotos(AlbumInput);
        toast.success("Album Added succeffully")
        setInputData('');
        setShowAlbum(!showAlbum);
    }
    useEffect(()=>{
        titleRef.current.focus();
       },[])
       const clear=(e)=>{
       setInputData('');
      }
    return (
        <>
     <div className={styles.albumform} >
        <span>Create Album</span>
        <form  onSubmit={handleSubmit}>
            <input  type="text" placeholder='Album' required 
            value={AlbumInput}
            ref={titleRef}
            onChange={(e)=>setInputData(
                e.target.value
                )}
            />
            <button onClick={(e)=>clear(e)}>Clear</button>
            <button type='submit' > Create</button>
        </form>
     </div>
        </>
    )
    
    }
    export default Albumform;