import Imageform from "./Imageform"
import Imagelist from "./Imagelist"
import Albumlist from "./Albumlist"
import Navbar from "./Navbar";
import { BrowserRouter ,Route ,Routes} from "react-router-dom";

const  App=()=> {
  return (
<>
<BrowserRouter>
              <Navbar/>
              <Routes>
              <Route exact path="/" element={<Albumlist/>}/>  
              <Route exact path="/image/:albumId" element={<Imagelist/>}/>  
              <Route exact path="/imageform/:albumid" element={<Imageform/>}/>  
              </Routes>
             </BrowserRouter>
    
</>
  
  );
}

export default App;
