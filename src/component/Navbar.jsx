import { Outlet } from "react-router-dom";
import styles from "../styles/Navbar.module.css";
import { Link } from "react-router-dom";
import { useValue } from "../context/photoContext";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
const Navbar = () => {
  const [searchBox, setSearchBox] = useState("");
  const { createAlbum, setSearchN, setSearchDone, searching } = useValue();
  const { currentUser, signOut } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchBox.length === 0) {
      return toast.error("Please write in search");
    }
    const newSearch = createAlbum.find((album) => album.album === searchBox);

    if (newSearch) {
      setSearchN(newSearch);
      setSearchDone(true);
    } else {
      toast.error("Not found");
    }
    setSearchBox("");
  };

  return (
    <>
      <div className={styles.navbarWrapper}>
        <Link to={"/"} className={styles.link}>
          <div className={styles.navbarWrapperlogo}>
            <img
              src="https://iridescent-faloodeh-3725ab.netlify.app/assets/logo.png"
              alt=""
            />
            <p>AshGall</p>
          </div>
        </Link>
        {currentUser && (
          <div className={styles.searchContainer}>
            <form action="">
              <input
                onChange={(e) => setSearchBox(e.target.value)}
                value={searchBox}
                type="text"
                placeholder="Search Album"
              />
              <button type="submit" onClick={(e) => handleSearch(e)}>
                <img
                  src="https://t4.ftcdn.net/jpg/01/09/46/77/240_F_109467785_eeYWH2tY4CnkDl9BtuYO6hWjk7hH0okU.jpg"
                  alt=""
                />
              </button>
            </form>
            <div className={styles.searchlist}>
              <ul>
                {searchBox.length > 1 &&
                  searching &&
                  createAlbum.map((menu, i) => (
                    <Link
                      to={`/image/${menu.id}`}
                      key={i}
                      onClick={() => setSearchBox("")}
                    >
                      <li>{menu.album}</li>
                    </Link>
                  ))}
              </ul>
            </div>
          </div>
        )}
        {currentUser ? (
          <div className={styles.navbarlogin}>
            <Link to="/profile" style={{ textDecoration: "none" }}>
              <h5 style={{ color: "white", padding: "10px", fontSize: "1rem" }}>
                {currentUser.displayName}
              </h5>
            </Link>
            <button onClick={() => signOut()}>logout</button>
          </div>
        ) : (
          <div className={styles.navbarlogin}>
            <Link to={`/login`}>
              <button>Login</button>
            </Link>
            <Link to={`/signUp`}>
              <button> SignUp</button>
            </Link>
          </div>
        )}
      </div>
      <Outlet />
    </>
  );
};
export default Navbar;
