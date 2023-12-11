import styles from "../styles/Albumlist.module.css";
import { useValue } from "../context/photoContext";
import Albumform from "./Albumform";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import Login from "./login";
const Albumlist = () => {
  const [showAlbum, setShowAlbum] = useState(false);
  const { searcN, createAlbum, remove, searchDone, setSearchDone } = useValue();
  const { currentUser } = useAuth();

  const removeAl = (id) => {
    remove(id);
    toast.success("Deleted Succeffully");
  };
  if (!currentUser) {
    return <Login />;
  }
  return (
    <>
      <div>
        {showAlbum && (
          <Albumform setShowAlbum={setShowAlbum} showAlbum={showAlbum} />
        )}
        <div className={styles.imageWrapper}>
          <div>
            <div className={styles.imageWrappertop}>
              <h2>Your album</h2>
              <button
                className={!showAlbum ? styles.blue : styles.red}
                onClick={() => setShowAlbum(!showAlbum)}
              >
                {!showAlbum ? "Add Album" : "Cancle"}
              </button>
            </div>
            <div className={styles.albumlistContainer}>
              {searcN && searchDone ? (
                <div>
                  <div className={styles.albumlisttop}>
                    <Link to={`/`} onClick={() => setSearchDone(false)}>
                      <span>
                        <img
                          src="https://iridescent-faloodeh-3725ab.netlify.app/assets/back.png"
                          alt=""
                        />
                      </span>
                    </Link>
                  </div>

                  <div
                    className={styles.albumlistContainerlist}
                    key={searcN.id}
                  >
                    <button onClick={() => removeAl(searcN.id)}>X</button>
                    <Link to={`/image/${searcN.id}`}>
                      <img
                        src="https://iridescent-faloodeh-3725ab.netlify.app/assets/photos.png"
                        alt=""
                      />
                      <span>{searcN.album}</span>
                    </Link>
                  </div>
                </div>
              ) : (
                createAlbum.map((album, i) => {
                  return (
                    <div
                      className={styles.albumlistContainerlist}
                      key={album.id}
                    >
                      <button onClick={() => removeAl(album.id)}>X</button>
                      <Link to={`/image/${album.id}`}>
                        <img
                          src="https://iridescent-faloodeh-3725ab.netlify.app/assets/photos.png"
                          alt=""
                        />
                        <span>{album.album}</span>
                      </Link>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Albumlist;
