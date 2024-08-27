export function isCurrentDateSmallerOrEqual(targetDate: string) {
  const currentDate = new Date();
  const givenDate = new Date(targetDate);

  // Set time to 00:00:00 for comparison
  currentDate.setHours(0, 0, 0, 0);
  givenDate.setHours(0, 0, 0, 0);

  return currentDate <= givenDate;
}
