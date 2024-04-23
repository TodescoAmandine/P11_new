import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Userpage from "./pages/UserPage";


const App = () => {
  return (
<BrowserRouter>
<Routes>
<Route path="/" element={<Home />} />
<Route path="/login" element={<Login />} />
<Route path="/userpage" element={<Userpage />} />
<Route path="*" element={<h1>Page not found</h1>} />
</Routes>
  </BrowserRouter>
);
};

export default App;