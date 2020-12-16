export const allPost = (state = [], action) => {
    switch (action.type) {
      case 'SET_ALL_POST':
        return action.payload;
      default:
        return state;
    }
  };