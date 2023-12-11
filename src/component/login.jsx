import styles from "../styles/Albumform.module.css";

import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const Login = () => {
  const [credential, setCredential] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const { loginUser } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setCredential({ email: "", password: "" });
    const { email, password } = credential;

    loginUser(email, password);
    navigate("/");
  };
  useEffect(() => {
    titleRef.current.focus();
  }, []);
  const onchange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className={styles.albumform}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            placeholder="email"
            required
            value={credential.email}
            id="email"
            ref={titleRef}
            name="email"
            onChange={onchange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="PassWord"
            id="password"
            required
            name="password"
            onChange={onchange}
            value={credential.password}
          />
          <div style={{ width: "58%" }}>
            <button type="submit" style={{ width: "100%", marginTop: "7px" }}>
              {" "}
              login
            </button>
          </div>
          <div>
            <p style={{ color: "black", margin: "0px", fontWeight: "600" }}>
              You don't hava a acount?
              <Link to={"/signUp"} style={{ color: "darkblue" }}>
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};
export default Login;
