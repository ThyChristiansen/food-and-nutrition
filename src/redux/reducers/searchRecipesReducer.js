
export const getRecipeTitleReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_AUTO_COMPLETE_RECIPES':
      console.log("----from getRecipeTitleReducer >", action.payload)
      return action.payload;
    default:
      return state;
  }
};