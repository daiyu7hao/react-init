const theme = (state='blue', action) => {
  switch(action.type){
    case 'THEME':
      return action.payload;
    default:
      return state;
  }
};
export default theme;