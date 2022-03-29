import React from "react";
import Favorite from "./Favorite";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Badge } from "@mui/material";

function Favorites() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "RESET_FAV_KEY" });
  }, []);

  const storeData = useSelector((state) => state);
  return (
    <div>
      {storeData.favorites.length > 0 ? (
        <div className="fav-main">
          {storeData.favorites.map((fav) => {
            return <Favorite key={fav.Key} favorite={fav} />;
          })}
        </div>
      ) : (
        <Badge color="primary">There Is No Favorite Cities</Badge>
      )}
    </div>
  );
}

export default Favorites;
