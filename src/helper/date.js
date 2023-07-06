export const convertISODateTime = (getISO) => {
  const date = new Date(getISO);
  const style = { dateStyle: "full", timeStyle: "short" };

  return new Intl.DateTimeFormat("en", style).format(date);
};
