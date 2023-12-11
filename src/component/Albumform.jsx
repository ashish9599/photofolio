import styles from "../styles/Albumform.module.css";
import { useValue } from "../context/photoContext";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
const Albumform = ({ setShowAlbum, showAlbum }) => {
  const [AlbumInput, setInputData] = useState("");
  const { currentUser } = useAuth();

  const titleRef = useRef(null);
  const { addAlbum } = useValue();
  const handleSubmit = (e) => {
    e.preventDefault();
    addAlbum(AlbumInput, currentUser.uid);
    toast.success("Album Added succeffully");
    setInputData("");
    setShowAlbum(!showAlbum);
  };
  useEffect(() => {
    titleRef.current.focus();
  }, []);
  const clear = (e) => {
    setInputData("");
  };
  return (
    <>
      <div className={styles.albumform}>
        <span>Create Album</span>
        <form onSubmit={handleSubmit}>
          <label htmlFor="album">Album</label>
          <input
            id="album"
            type="text"
            placeholder="Album"
            required
            value={AlbumInput}
            ref={titleRef}
            onChange={(e) => setInputData(e.target.value)}
          />
          <div>
            <button onClick={(e) => clear(e)}>Clear</button>
            <button type="submit"> Create</button>
          </div>
        </form>
      </div>
    </>
  );
};
export default Albumform;
