const key = "9estwCtFpErxDm1o6Kzn64K4yysJyOMs";

async function getCity(city) {
  try {
    const url =
      "https://dataservice.accuweather.com/locations/v1/cities/search";
    const query = `?apikey=${key}&q=${city}`;

    const resp = await fetch(url + query);
    const data = await resp.json();

    return data[0];
  } catch (err) {
    throw new Error("Failed to fetch city key ");
  }
}

async function getCurrentCondition(cityKey) {
  try {
    const url = `https://dataservice.accuweather.com/currentconditions/v1/${cityKey}`;
    const query = `?apikey=${key}`;
    const resp = await fetch(url + query);
    const data = await resp.json();

    return data[0];
  } catch (err) {
    throw new Error("Failed to fetch the Cuttent Condition of the city");
  }
}

async function getFiveForecasts(cityKey) {
  try {
    const url = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}`;
    const query = `?apikey=${key}&metric=true`;
    const resp = await fetch(url + query);
    const data = await resp.json();

    return data.DailyForecasts;
  } catch (err) {
    throw new Error("failed to fetch  forecasts Api Data");
  }
}

async function getAutoCompApi(cityInput) {
  try {
    const url =
      "https://dataservice.accuweather.com/locations/v1/cities/autocomplete";
    const query = `?apikey=${key}&q=${cityInput}`;
    const resp = await fetch(url + query);
    const data = await resp.json();
    return data;
  } catch (err) {
    throw new Error("failed to fetch City autocomplete  Api");
  }
}

async function getCurrentLocationGeo(lat, lon) {
  try {
    const currPos = `${lat},${lon}`;
    //console.log(currPos);

    const url =
      "https://dataservice.accuweather.com/locations/v1/cities/geoposition/search";
    const query = `?apikey=${key}&q=${currPos}`;
    const resp = await fetch(url + query);
    const data = await resp.json();
    return data;
  } catch (err) {
    throw new Error("failed to fetch the Current Location ");
  }
}

export default {
  getCity,
  getFiveForecasts,
  getCurrentCondition,
  getAutoCompApi,
  getCurrentLocationGeo,
};
