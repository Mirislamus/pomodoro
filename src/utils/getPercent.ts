const getPercent = (value: number, max: number): number => {
  if (value === 0) return 0;

  const elapsedPercentage = (value / max) * 100;

  const remainingPercentage = 100 - elapsedPercentage;

  return Math.round(remainingPercentage);
};

export default getPercent;
