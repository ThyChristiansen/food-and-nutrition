const landingPageReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ANSWER':
      console.log("---->", action.payload)
      return action.payload;
    case 'SET_RECIPE':
      console.log("---->", action.payload.recipes)
      return action.payload.recipes;
    default:
      return state;
  }
};


export default landingPageReducer;
