export const generateDate = ({
  manualDate = new Date(),
  year = 0,
  month = 0,
  date = 0,
  minutes = 0,
  second = 0,
}) => {
  const now = new Date(manualDate.getTime())
  now.setMonth(now.getMonth() + month + (year * 12));
  now.setDate(now.getDate() + date);
  now.setMinutes(now.getMinutes() + minutes);
  now.setSeconds(now.getSeconds() + second);

  return now;
}
