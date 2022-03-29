import React from "react";
import { Card } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useStyles } from "../muiStyled/muiStyles";

function Favorite({ favorite }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const returnToHome = () => {
    dispatch({ type: "UPDATE_FAVORITE_CITY_KEY", payload: favorite.Key });
    navigate("/");
  };

  const classes = useStyles();
  return (
    <div className="fav-child">
      <Card className={classes.favCard} onClick={returnToHome}>
        <div className="fav-detail">{favorite.LocalizedName}</div>
        <div className="fav-detail">
          {favorite.temp.value} {favorite.temp.unit}{" "}
        </div>
        <div className="fav-detail">{favorite.weather}</div>
      </Card>
    </div>
  );
}

export default Favorite;
