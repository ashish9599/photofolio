import styles from "../styles/Imageform.module.css";
import { storage } from "../firebase";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useValue } from "../context/photoContext";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const Imageform = () => {
  const [etitle, setTitle] = useState("");
  const titleRef = useRef(null);
  const { albumid } = useParams();
  const { addImage, setloader } = useValue();
  const navigate = useNavigate();
  const clearImageInput = (e) => {
    setTitle("");
  };
  const handleImageSubmit = async (e, albumid) => {
    e.preventDefault();
    setloader(true);
    const title = e.target[0].value;
    const file = e.target[1].files[0];
    if (!file) {
      return toast.info("Please fill the form");
    }
    navigate(`/image/${albumid}`);
    // console.log("file=>",file);
    try {
      const storageRef = ref(storage, `Album/${Date.now()}-${title}`);
      await uploadBytesResumable(storageRef, file).then((upload) => {
        let imagePath = upload.metadata.fullPath;
        getDownloadURL(storageRef).then((imageUrl) => {
          addImage(albumid, title, imageUrl, imagePath);
        });
      });
    } catch (error) {
      console.log(error);
    }
    setTitle("");
    setloader(false);
  };
  useEffect(() => {
    titleRef.current.focus();
  }, []);

  return (
    <>
      <div className={styles.imageform}>
        <Link to={`/image/${albumid}`}>
          <span>
            <img
              src="https://iridescent-faloodeh-3725ab.netlify.app/assets/back.png"
              alt=""
            />
          </span>
        </Link>
        <span>Create Image</span>
        <form action="" onSubmit={(e) => handleImageSubmit(e, albumid)}>
          <input
            type="text"
            placeholder="Title"
            ref={titleRef}
            value={etitle}
            required
            onChange={(e) => setTitle(e.target.value)}
          />

          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img
              src="https://iridescent-faloodeh-3725ab.netlify.app/assets/photos.png"
              alt=""
            />
            <span>Add an Image</span>
          </label>
          <div className={styles.imageformbuttonWrapper}>
            <button onClick={(e) => clearImageInput(e)}>Clear</button>
            <button type="submit" className={styles.add}>
              Add
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default Imageform;
