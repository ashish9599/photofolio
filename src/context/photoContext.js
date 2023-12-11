import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import {
  updateDoc,
  deleteDoc,
  collection,
  doc,
  setDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useAuth } from "./AuthContext";

const photoContext = createContext();
export const useValue = () => {
  const value = useContext(photoContext);
  return value;
};

export const PhotoProvider = ({ children }) => {
  const [createAlbum, setAlbum] = useState([]);
  const [searching, setSearching] = useState(true);
  const [imgPath, setImgPath] = useState("");
  const [imageId, setImageID] = useState("");
  const [searcN, setSearchN] = useState("");
  const [searchDone, setSearchDone] = useState(true);
  const [loader, setloader] = useState(false);
  useEffect(() => {
    document.title = "AshGall";
  }, []);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetching = async () => {
      try {
        const docRef = collection(db, "albums");
        const q = query(docRef, where("uid", "==", `${currentUser.uid}`));

        const querySnapshot = await getDocs(q);

        const album = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setAlbum(album);
      } catch (error) {
        console.log(error);
      }
    };
    currentUser && fetching();
  });

  const addAlbum = async (AlbumInput, uid) => {
    const docRef = doc(collection(db, "albums"));
    await setDoc(docRef, {
      album: AlbumInput,
      uid: uid,
      createdOn: new Date(),
    });
  };

  const addImage = async (albumId, title, imageUrl, imagePath) => {
    const docRef = doc(collection(db, "albums", albumId, "images"));
    await setDoc(docRef, {
      title: title,
      albumId: albumId,
      imageUrl: imageUrl,
      imagePath: imagePath,
      createdOn: new Date(),
    });
  };

  const uploadImage = async (albumId, title, imageUrl, imagePath) => {
    const docRef = doc(db, "albums", albumId, "images", imageId);

    await updateDoc(docRef, {
      title: title,
      albumId: albumId,
      imagePath: imagePath,
      imageUrl: imageUrl,
    });
  };

  const remove = async (id) => {
    const docRef = doc(db, "albums", id);
    await deleteDoc(docRef);
  };
  const removeImage = async (id, albumId) => {
    const docRef = doc(db, "albums", albumId, "images", id);
    await deleteDoc(docRef);
  };
  const imageAddress = (imgId, oldImgPath) => {
    setImageID(imgId);
    setImgPath(oldImgPath);
  };

  return (
    <photoContext.Provider
      value={{
        addAlbum,
        addImage,
        uploadImage,
        searchDone,
        setSearchDone,
        removeImage,
        remove,
        createAlbum,
        setSearchN,
        searcN,
        searching,
        setSearching,
        setImageID,
        imageId,
        imageAddress,
        imgPath,
        loader,
        setloader
      }}
    >
      {children}
    </photoContext.Provider>
  );
};
