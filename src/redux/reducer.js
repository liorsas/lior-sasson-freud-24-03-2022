function reducer(
  state = {
    favorites: [],
    favoriteCity: "",
  },
  action
) {
  switch (action.type) {
    case "ADD_TO_FAVORITES":
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case "REMOVE_FROM_FAVORITES":
      let newArr = state.favorites.filter((el) => el.Key !== action.payload);
      return {
        ...state,
        favorites: newArr,
      };

    case "UPDATE_FAVORITE_CITY_KEY":
      return {
        ...state,
        favoriteCity: action.payload,
      };
    case "RESET_FAV_KEY":
      return {
        ...state,
        favoriteCity: "",
      };

    default:
      return state;
  }
}

export default reducer;
