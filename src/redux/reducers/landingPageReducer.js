export const answerReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ANSWER':
      console.log("---->", action.payload)
      return action.payload
    default:
      return state;
  }
};

export const getRandomRecipeReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_RANDOM_RECIPE':
      console.log("---->", action.payload.recipes)
      return action.payload.recipes;
    default:
      return state;
  }
};


