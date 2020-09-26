export const getFavoriteRecipe = (state = [], action) => {
  switch (action.type) {
    case 'SET_FAVORITE_LIST':
      console.log("---->", action.payload)
      return action.payload;
    default:
      return state;
  }
};