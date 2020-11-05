export const getDivisionKor: (division: string) => string = (division) => {
  if (division === 'adult') return '일반부';
  if (division === 'high') return '고등부';
  if (division === 'middle') return '중등부';
  if (division === 'elementary') return '초등부';
  return 'NULL';
};

export default {
  getDivisionKor,
};
