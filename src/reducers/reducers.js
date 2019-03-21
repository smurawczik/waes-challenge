export default (state = {}, action) => {
 switch (action.type) {
  case 'ON_TEXTAREA_CHANGE':
   return {
    mainTextareaValue: action.payload
   }
  default:
   return state
 }
}