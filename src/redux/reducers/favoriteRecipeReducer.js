export const getFavoriteRecipe = (state = [], action) => {
  switch (action.type) {
    case 'SET_FAVORITE_LIST':
      // console.log("---->", action.payload)
      return action.payload;
    default:
      return state;
  }
};

export const getTriedRecipe = (state = [], action) => {
  switch (action.type) {
    case 'SET_TRIED_LIST':
      // console.log("---->", action.payload)
      return action.payload;
    default:
      return state;
  }
};


export const setNotification = (state = [], action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      // console.log( "Add new favorite recipe", action.payload)
      return action.payload;
    default:
      return state;
  }
};