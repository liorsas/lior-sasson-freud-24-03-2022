import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Autocomplete, Button } from "@mui/material";
import { Box } from "@mui/system";

import WeatherApiUtils from "../utils/WeatherApiUtils";
import ForeCast from "./ForeCast";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import useGeoLocation from "../utils/useGeoLocation";
import { useStyles } from "../muiStyled/muiStyles";
import ErrorHandler from "./ErrorHandler";

function Home() {
  const dispatch = useDispatch();
  const location = useGeoLocation();
  const [searchResults, setSearchResults] = useState([]);
  const [dailyForecasts, setDailyForecast] = useState([]);
  const [currentCont, setCurrentCont] = useState({});
  const [cityInput, setCityInput] = useState("");
  const [selectedValueObj, setSelectedValueObj] = useState({});
  const [cityDetails, setCityDetails] = useState({});
  const [error, setError] = useState({ isOpen: false, message: "" });

  const storeDate = useSelector((state) => state);

  const classes = useStyles();

  // get default city forecasts and current condition
  const defCityForecasts = async () => {
    try {
      if (!storeDate.favoriteCity) {
        if (JSON.stringify(location.loaded) === true) {
          JSON.stringify(location.coordinates.lat);
          let geoData = await WeatherApiUtils.getCurrentLocationGeo(
            JSON.stringify(location.coordinates.lat),
            JSON.stringify(location.coordinates.lon)
          );
          const respForeCasts = await WeatherApiUtils.getFiveForecasts(
            geoData.Key
          );

          const respCurrentCont = await WeatherApiUtils.getCurrentCondition(
            geoData.Key
          );
          setDailyForecast(respForeCasts);

          setCurrentCont(respCurrentCont);

          setCityDetails(geoData);
        }
        if (JSON.stringify(!location.loaded)) {
          const data = await WeatherApiUtils.getCity("tel aviv");
          const cityKey = data.Key;

          const respForeCasts = await WeatherApiUtils.getFiveForecasts(cityKey);

          const respCurrentCont = await WeatherApiUtils.getCurrentCondition(
            cityKey
          );
          setDailyForecast(respForeCasts);

          setCurrentCont(respCurrentCont);
          setCityDetails(data);
        }
      } else {
        const respForeCasts = await WeatherApiUtils.getFiveForecasts(
          storeDate.favoriteCity
        );

        const respCurrentCont = await WeatherApiUtils.getCurrentCondition(
          storeDate.favoriteCity
        );

        let check = storeDate.favorites.find(
          (el) => el.Key === storeDate.favoriteCity
        );

        let cityObj = {
          Key: check.Key,
          LocalizedName: check.LocalizedName,
        };

        setCityDetails(cityObj);
        setDailyForecast(respForeCasts);
        setCurrentCont(respCurrentCont);
      }
    } catch (err) {
      console.log(err);
      setError({ isOpen: true, message: err.message });
    }
  };

  //get autocomplete data from search

  const fetchAutoCompleteData = async () => {
    try {
      if (cityInput !== "") {
        let data = await WeatherApiUtils.getAutoCompApi(cityInput);

        setSearchResults(data);
      }
    } catch (err) {
      console.log(err.message);
      setError({ isOpen: true, message: err.message });
    }
  };

  //when value is selected render the screen
  async function renderNewCity() {
    try {
      const cityKey = selectedValueObj?.Key;

      const respForeCasts = await WeatherApiUtils.getFiveForecasts(cityKey);
      const respCurrentCont = await WeatherApiUtils.getCurrentCondition(
        cityKey
      );
      setDailyForecast(respForeCasts);
      setCurrentCont(respCurrentCont);
      setCityDetails(selectedValueObj);
      setSelectedValueObj({});
    } catch (err) {
      console.log(err.message);
      setError({ isOpen: true, message: err.message });
    }
  }

  //BUTTON onClick - addToFavorites
  const addCityToFavorites = () => {
    let CheckExists = storeDate.favorites.find(
      (el) => el.Key === cityDetails.Key
    );

    if (!CheckExists) {
      let cityObj = {
        Key: cityDetails.Key,
        LocalizedName: cityDetails.LocalizedName,
        weather: currentCont.WeatherText,
        temp: {
          value: currentCont.Temperature.Metric.Value,
          unit: currentCont.Temperature.Metric.Unit,
        },
      };
      dispatch({ type: "ADD_TO_FAVORITES", payload: cityObj });
    } else {
      dispatch({ type: "REMOVE_FROM_FAVORITES", payload: cityDetails.Key });
    }
  };

  useEffect(() => {
    defCityForecasts();
  }, []);

  useEffect(() => {
    fetchAutoCompleteData();
  }, [cityInput]);

  useEffect(() => {
    if (selectedValueObj?.Key !== undefined) {
      renderNewCity();
    }
  }, [selectedValueObj]);

  return (
    <div>
      <div className="main-search">
        <Stack sx={{ width: 300, margin: "auto" }}>
          <Autocomplete
            id="city-search"
            getOptionLabel={(searchResults) => searchResults.LocalizedName}
            options={searchResults}
            sx={{ width: 300 }}
            isOptionEqualToValue={(option, value) =>
              option.LocalizedName === value.LocalizedName
            }
            noOptionsText={"no available cities"}
            renderOption={(props, searchResults) => (
              <Box component="li" {...props} key={searchResults.Key}>
                {searchResults.LocalizedName}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                {...params}
                label="search for cities"
              />
            )}
            onChange={(e, obj) => {
              setSelectedValueObj(obj);

              setCityInput(e.target.value);
            }}
          />
        </Stack>
      </div>
      <ErrorHandler {...error} />
      <div className="main-home">
        <div className="city-det">
          {cityDetails.LocalizedName} <br />{" "}
          {currentCont.Temperature?.Metric.Value}{" "}
          {currentCont.Temperature?.Metric.Unit}
        </div>
        <div className="home-btn">
          <FavoriteBorderOutlinedIcon
            fontSize="large"
            className={
              storeDate.favorites.find((el) => el.Key === cityDetails.Key)
                ? "colorRed"
                : "withoutColor"
            }
          />
          <Button
            className={classes.root}
            variant="outlined"
            onClick={addCityToFavorites}
          >
            Add To Favorite
          </Button>
        </div>

        <div className="weather-txt">
          <h2>{currentCont?.WeatherText}</h2>
        </div>
        <div className="forecasts-main">
          {dailyForecasts.map((item) => {
            return (
              <ForeCast
                key={item.Date}
                forecast={item}
                day={
                  ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
                    new Date(item.Date).getDay()
                  ]
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
