const isDate = (maybeDate) => maybeDate instanceof Date; // may be not quite exhaustive

const throwIfNotDate = (d) => {
  if (!isDate(d)) throw new Error("This is not a date! Are you an Excel?");
};

const isPastDate = (date) => {
  throwIfNotDate(date);

  return date.getTime() < Date.now();
};

const isFutureDate = (date) => {
  throwIfNotDate(date);

  return date.getTime() > Date.now();
};

const isCurrentDayOfMonth = (date) => {
  throwIfNotDate(date);

  const dayOfMonth = new Date().getDate();
  // console.log("isCurrentDate", { dayOfMonth });

  return date.getDate() === dayOfMonth;
};

module.exports = { isDate, throwIfNotDate, isPastDate, isFutureDate, isCurrentDayOfMonth };