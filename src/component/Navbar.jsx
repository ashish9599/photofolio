import { Outlet } from 'react-router-dom';
import styles from '../styles/Navbar.module.css'
import { Link } from 'react-router-dom';
import { useValue } from '../photoContext';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
const Navbar=()=>{
    const titleRef =useRef(null);
    const [searchBox,setSearchBox]=useState('');
  
    const {createAlbum,setSearchN,setSearchDone}=useValue();
    useEffect(()=>{
        titleRef.current.focus();
       },[])

       const handleSearch=(e)=>{
        e.preventDefault();
        const newSearch= createAlbum.find((album)=>album.album==searchBox)
        // console.log(newSearch);
        if(newSearch){ 
          setSearchN(newSearch)
          setSearchDone(true);
        }else{
          toast.error("Not found")
        }
        setSearchBox('');
      }


    return (
    <>
    <div className={styles.navbarWrapper}>
           <Link to={'/'} onClick={()=>setSearchDone(false)}>
        <div className={styles.navbarWrapperlogo}>
            <img src="https://iridescent-faloodeh-3725ab.netlify.app/assets/logo.png" alt="" />
            <p>AshGall</p>
        </div>
           </Link>
        <div className={styles.searchContainer}>
            <form action="">
                <input ref={titleRef} onChange={(e)=>setSearchBox(e.target.value)} value={searchBox} type="text"  placeholder='Search'/>
                <button type='submit' onClick={(e)=>handleSearch(e)} >
                    <img src="https://t4.ftcdn.net/jpg/01/09/46/77/240_F_109467785_eeYWH2tY4CnkDl9BtuYO6hWjk7hH0okU.jpg" alt="" />
                </button>
            </form>
        </div>
    </div>
    <Outlet/>
    </>
)

}
export default Navbar;