export const reducers = (state = { highlights: [] }, action) => {
 switch (action.type) {
  case 'ON_TEXTAREA_CHANGE':
    return {
      ...state,
      mainTextareaValue: action.payload,
    }

  case 'ON_HIGHLIGHT':
    if (hasFreeRange(state.highlights, action.payload)) {
      const innerRangedHighlights = rangeIsBiggerThanHighlight(state.highlights, action.payload);
      const highlights = state.highlights.filter((h, i) => innerRangedHighlights.indexOf(i));
      const newHighlights = highlights.concat(action.payload);
      return {
        ...state,
        highlights: newHighlights.sort((prev, next) => prev.start - next.start),
      }
    } else {
      return state;
    }
  case 'FILTERED_HIGHLIGHTS':
  default:
    return state
 }
}

/**
this function verifies if new payload is inside any of actual highlights
to prevent them from being added
@param highlights - current highlights
@param payload - new highlight
@return if payload range is inside any highlight range
*/
export const hasFreeRange = (highlights, payload) => {
  const ranges = highlights.map(h => [h.start, h.end]);

  return !ranges.some(range => {
    return (
      (payload.start > range[0] && payload.start < range[1])
      ||
      (payload.end > range[0] && payload.end < range[1])
    )
  })
}

export const rangeIsBiggerThanHighlight = (highlights, payload) => {
  const ranges = highlights.map(h => [h.start, h.end]);

  return ranges.filter(range => {
    return (payload.start < range[0] && payload.end > range[1])
  }).map((filtered, i) => i);
}