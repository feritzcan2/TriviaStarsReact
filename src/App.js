import React from "react";
import "./App.css";
import DropDownPanel from "./Components/DropDownPanel";
import { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import {
  Router,
  BrowserRouter,
  Routes, //replaces "Switch" used till v5
  Route,
} from "react-router-dom";
import StoryScreen from "./Components/StoryScreen";
import Home from "./Components/Home";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reviews/:catagoryId" element={<StoryScreen />} />
      </Routes>
    </div>
  );
}

// function App() {
//   return (
//     <div className="App">
//         <div className="container">
//         <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/home" element={<Home />} />
//              <Route path="/story/:cocugunAdi" element={<StoryScreen />} />
//         </Routes>
//         </div>
//     </div>
//   );
// }

export default App;
