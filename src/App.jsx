import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Video from "./Pages/Video/Video";
import Home from "./Pages/Home/Home";
import { useState } from "react";

function App() {
  const [sidebar, setSidebar] = useState(true);
  return (
    <div>
      <Navbar setSidebar={setSidebar} />
      <Routes>
        <Route path="/" element={<Home sidebar={sidebar} />} />
        <Route path="/video/:categoryId/:videoId" element={<Video />} />
      </Routes>
    </div>
  );
}

export default App;
