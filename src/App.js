import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import pages
import Landing from "./pages/Landing Page/Landing";
import Multistep from "./pages/Multistep Page/Multistep";
import Resume from "./pages/Resume Page/Resume";

function App() {
  // finnaly state, where if The information returned successfully from the backup fits into this array,
  // which I use to display the information in the last component
  const [resumeInfo, setResumeInfo] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route
          path="/create"
          element={
            <Multistep setResumeInfo={setResumeInfo} resumeInfo={resumeInfo} />
          }
        ></Route>
        <Route
          path="/userResume"
          element={<Resume resumeInfo={resumeInfo} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
