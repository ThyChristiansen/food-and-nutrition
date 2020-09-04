
export const getRecipeReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_RECIPES':
      console.log("----from getRecipeReducer >", action.payload.results)
      return action.payload.results;
    default:
      return state;
  }
};