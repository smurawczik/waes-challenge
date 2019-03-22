export const onTextareaChange = (value) => dispatch => {
 dispatch({
  type: 'ON_TEXTAREA_CHANGE',
  payload: value
 })
}

export const onHighlight = (data) => dispatch => {
 dispatch({
  type: 'ON_HIGHLIGHT',
  payload: { value: data.value, color: data.color, start: data.start, end: data.end }
 })
}