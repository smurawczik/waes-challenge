export const onTextareaChange = (value) => dispatch => {
 dispatch({
  type: 'ON_TEXTAREA_CHANGE',
  payload: value
 })
}

export const onHighlight = (highlight) => dispatch => {
 dispatch({
  type: 'ON_HIGHLIGHT',
  payload: highlight,
 })
}