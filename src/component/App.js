import Imageform from "./Imageform";
import Imagelist from "./Imagelist";
import Albumlist from "./Albumlist";
import Navbar from "./Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./login";
import SignUp from "./SignUp";
import Updateform from "./Updatefom";
import Profile from "./Profile";
import Loader from "./loader";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Albumlist />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signUp" element={<SignUp />} />
          <Route exact path="/image/:albumId" element={<Imagelist />} />
          <Route exact path="/imageform/:albumid" element={<Imageform />} />
          <Route exact path="/update/:albumid" element={<Updateform />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="*" element={<Loader />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
