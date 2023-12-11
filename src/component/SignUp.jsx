import styles from "../styles/Albumform.module.css";

import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
// import { useValue } from "../context/photoContext";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const SignUp = () => {
  const [credential, setCredential] = useState({
    name: "",
    email: "",
    password: "",
    conform: "",
  });
  // const [signUp, setSignUp] = useState({name:"",email:"",password:"",conform:""});
  const titleRef = useRef(null);
  const { SignInUser } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, name, conform } = credential;
    if (conform !== password) {
      return toast.error("Password doesnot match with confirm password");
    }
    try {
      SignInUser(email, password, name);
      navigate("/login");
      
      setCredential({ name: "", email: "", password: "", conform: "" });
    } catch (error) {
      console.log(error);
    }
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
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="name"
            required
            id="name"
            ref={titleRef}
            name="name"
            value={credential.name}
            onChange={onchange}
          />
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            placeholder="email"
            required
            value={credential.email}
            id="email"
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
            minLength={6}
          />
          <label htmlFor="conform">Conform Password</label>
          <input
            type="password"
            placeholder="conform Password"
            required
            value={credential.conform}
            id="conform"
            name="conform"
            onChange={onchange}
          />
          <div style={{ width: "58%" }}>
            <button type="submit" style={{ width: "100%", marginTop: "7px" }}>
              {" "}
              Sign-Up
            </button>
          </div>

          <div>
            <p style={{ color: "black", margin: "0px", fontWeight: "600" }}>
              You already have an account?
              <Link to={"/login"}>Login</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};
export default SignUp;
