import styles from "../styles/Imagelist.module.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useValue } from "../context/photoContext";
import { useEffect, useState } from "react";
import { db, storage } from "../firebase";
import { onSnapshot, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { deleteObject, ref } from "firebase/storage";
import Loader from "./loader";

const Imagelist = () => {
  const [imageArray, setImage] = useState([]);
  const { albumId } = useParams();
  const { createAlbum, removeImage, imageAddress,setloader,loader } = useValue();
  useEffect(() => {
    createAlbum.map((album) => {
      if (albumId === album.id) {
        document.title = album.album;
      }
      return album;
    });
  }, [albumId, createAlbum]);
  useEffect(() => {
    onSnapshot(collection(db, "albums", albumId, "images"), (snapshot) => {
      const images = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      console.log("i",snapshot.docs)
      setImage(images);
    });
  }, [albumId,setloader]);
  // console.log("image=>",imageArray)

  const removeImageN = async (imageId, albumId, imagePath) => {
    const storageRef = ref(storage, imagePath);
    removeImage(imageId, albumId);
    await deleteObject(storageRef)
      .then(() => {
        toast.success("image deleted succeffully");
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  
  return (
    <>
      <div className={styles.imagelist}>
        <div className={styles.imagelisttop}>
          <Link to={`/`}>
            <span>
              <img
                src="https://iridescent-faloodeh-3725ab.netlify.app/assets/back.png"
                alt=""
              />
            </span>
          </Link>
          <h2>{imageArray.length > 0 ? "" : "NO Image Found"}</h2>
          <Link to={`/imageform/${albumId}`}>
            <button>Add Image</button>
          </Link>
        </div>
        <div className={styles.imageContainer}>
        {loader&& <Loader/>}
          {!loader&&imageArray.map((image, index) => (
            <div key={index} className={styles.imageContainerframe}>
              <div className={styles.imageContainerframei}>
                {/* <h1>{image.id},{image.imagePath}</h1> */}
                <Link
                  to={`/update/${albumId}`}
                  onClick={() => imageAddress(image.id, image.imagePath)}
                >
                  <img
                    src="https://iridescent-faloodeh-3725ab.netlify.app/assets/edit.png"
                    alt=""
                  />
                </Link>
              </div>
              <div className={styles.imageContainerframeDelete}>
                <img
                  onClick={() =>
                    removeImageN(image.id, albumId, image.imagePath)
                  }
                  src="https://iridescent-faloodeh-3725ab.netlify.app/assets/trash-bin.png"
                  alt=""
                />
              </div>
              <div className={styles.imageContainerImg}>
                <img
                  className={styles.imageContainerImgB}
                  src={image.imageUrl}
                  alt={image.title}
                />
              </div>
              <span>{image.title}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Imagelist;
