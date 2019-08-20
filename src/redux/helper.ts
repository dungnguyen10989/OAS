export const status = {
  start: '@@FETCH_START/',
  success: '@@FETCH_SUCCESS/',
  failure: '@@FETCH_FAILURE/',
  cancel: '@@CANCEL/'
};

export const removeDuplicates = (myArr: Array<any>, key: string) => {
  return myArr.filter((obj, pos, arr) => {
    return arr.map(mapObj => mapObj[key]).indexOf(obj[key]) === pos;
  });
};

export const migrateUnitsData = (data: any[]): { key: string; value: any }[] => {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const _data = keys.map((key, index) => ({
    key,
    value: values[index]
  }));
  return _data;
};
