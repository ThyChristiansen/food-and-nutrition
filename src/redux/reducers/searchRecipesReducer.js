export const getRecipeReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_RECIPES':
      // console.log("----from getRecipeReducer ", action.payload.results)
      return action.payload.results;
    default:
      return state;
  }
};

export const getRecipeSummrizeReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_RECIPE_INFO':
      // console.log("----from get Recipe Info Reducer", action.payload)
      return [action.payload];
    case 'SET_RECIPE_SUMMARY':
      console.log("----from get Recipe summary Reducer", action.payload)
      return action.payload;
    default:
      return state;
  }
};

export const getRecipeDetailReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_RECIPE_INFO':
      console.log("----from get Recipe Info Reducer", action.payload)
      return [action.payload];
    
    default:
      return state;
  }
};





