const language = (state=0, action) => {
  switch(action.type){
    case 'LANGUAGE':
      return action.payload;
    default:
      return state;
  }
};
export default language;