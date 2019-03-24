export const reducers = (state = { highlights: [] }, action) => {
 switch (action.type) {
  case 'ON_TEXTAREA_CHANGE':
    return {
      ...state,
      highlights: [],
      mainTextareaValue: action.payload,
    }

  case 'ON_HIGHLIGHT':
    if (hasFreeRange(state.highlights, action.payload)) {
      const overwriteOverlaps = removableHighlights(state.highlights, action.payload);
      const highlights = state.highlights.filter((h, i) => overwriteOverlaps.indexOf(h.id));
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
  const ranges = highlightsToRange(highlights);

  return !ranges.some(range => {
    return (
      (payload.start >= range[0] && payload.start <= range[1])
      ||
      (payload.end >= range[0] && payload.end <= range[1])
    )
  })
}

/*
this function uses its criteria to see which highlights should be overwritten / deleted
looks for: 
  - ranges bigger than actual ranges
  - equality in range and color
*/
export const removableHighlights = (highlights, payload) => {
  return highlights.filter(highlight => {
    return (
      (payload.start === highlight.start && payload.end === highlight.end && payload.color === highlight.color)
      || 
      (payload.start < highlight.start && payload.end > highlight.end)
    )
  }).map((filtered, i) => filtered.id);
}

export const highlightsToRange = (highlights) => {
  return highlights.map(h => [h.start, h.end]);
}