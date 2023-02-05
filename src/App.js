import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useForm } from "react-hook-form";

// import pages
import Landing from "./pages/Landing Page/Landing";
import Multistep from "./pages/Multistep Page/Multistep";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/create" element={<Multistep />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
