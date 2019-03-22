export default (state = { highlights: [] }, action) => {
 switch (action.type) {
  case 'ON_TEXTAREA_CHANGE':
   return {
    ...state,
    mainTextareaValue: action.payload,
   }

  case 'ON_HIGHLIGHT':
   return {
    ...state,
    highlights: state.highlights.concat(action.payload),
   }
  default:
   return state
 }
}