export const combined = (defaultState, reducers) => (state = defaultState, action = {}) => {
  if (action.type && (typeof reducers[action.type] === 'function')) {
    return reducers[action.type](state, action);
  }

  return state;
};

export const fetchStart = state => ({
  ...state,
  loading: true,
});

export const fetchSuccess = (state, action) => ({
  ...state,
  loading: false,
  data: action.data,
  ready: true,
});

export const fetchError = (state, action) => ({
  ...state,
  loading: false,
  error: action.error,
});
