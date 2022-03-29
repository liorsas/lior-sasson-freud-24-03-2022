import React from "react";
import { Route, Routes } from "react-router-dom";
import Favorite from "./Favorites";
import Home from "./Home";
import Main from "./Main";

function MainPage() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="" element={<Home />}></Route>
          <Route path="favorite" element={<Favorite />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default MainPage;
