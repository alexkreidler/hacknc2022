function randomDate(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

export const recentYearsRandomDate = () =>
  randomDate(new Date(2012, 0, 1), new Date());
