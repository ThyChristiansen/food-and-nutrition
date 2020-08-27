const answerReducer = (state =[], action) => {
  switch (action.type) {
    case 'SET_ANSWER':
      console.log("---->",action.payload)
      return action.payload;
    default:
      return state;
  }
};

export default answerReducer;