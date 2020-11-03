export const saveIndex: (index: number) => void = (index) => {
  window.sessionStorage.setItem('@index', `${index}`);
};

export const getIndex: () => number | null = () => {
  const value = window.sessionStorage.getItem('@index');
  if (value === null) return value;
  return Number(value);
};

export default {
  saveIndex,
  getIndex,
};
