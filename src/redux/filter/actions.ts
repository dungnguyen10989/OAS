export const types = {
  SET_FILTER: 'SET_FILTER',
  RESET_FILTER: 'RESET_FILTER',
  SET_FILTER_TYPE: 'SET_FILTER_TYPE'
};

export const actions = {
  setFilter: (payload?: any) => ({ type: types.SET_FILTER, payload }),
  setFilterType: (payload?: any) => ({ type: types.SET_FILTER_TYPE, payload }),
  resetFilter: (payload?: any) => ({ type: types.RESET_FILTER, payload })
};
