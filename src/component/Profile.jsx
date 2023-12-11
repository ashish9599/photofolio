import { useAuth } from "../context/AuthContext";
import styles from "../styles/Albumform.module.css";
const Profile = () => {
  const { currentUser } = useAuth();
  console.log(currentUser);
  return (
    <>
      <div className={styles.albumform}>
        <div>
          <h1>{currentUser.displayName}</h1>
        </div>
        <div>
          <h1>{currentUser.email}</h1>
        </div>
        <div>
          <h1>loads</h1>
        </div>
        <div>
          <h1>loads</h1>
        </div>
      </div>
    </>
  );
};
export default Profile;
