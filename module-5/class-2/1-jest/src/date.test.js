const { isDate, throwIfNotDate, isPastDate, isFutureDate, isCurrentDayOfMonth } = require("./date.js");

describe("date", () => {

  const DAY_IN_MS = 86_400_000;
  const now = new Date();
  const fiveSecondsAgo = new Date(now.getTime() - 5000);
  const fiveSecondsAhead = new Date(now.getTime() + 5000);

  describe("isDate", () => {
    test("should return true for a date object", () => {
      expect(isDate(new Date())).toBe(true);
      // expect(isDate(new Date())).toBeTruthy();
    });

    // more?
    test("should return false for a string", () => {
      expect(isDate("not a date")).toBe(false);
      // expect(isDate("not a date")).toBeFalsy();
    });

    // Parametrized tests. Each value is a seperate test and counts towards total tests number.
    test.each([
      "not a date",
      42,
      null,
      true,
      false,
      undefined,
    ])("should return false for a non date value", (value) => {
      expect(isDate(value)).toBe(false);
    });
  });

  // It is based on the previous function `isDate`
  describe("throwIfNotDate", () => {
    test.each([
      "not a date",
      42,
      null,
      true,
      false,
      undefined,
    ])("should throw when passed not a date", (value) => {
      expect(() => throwIfNotDate(value)).toThrow(Error);
    });

    test.each([
      now,
      fiveSecondsAgo,
      fiveSecondsAhead,
      new Date(),
      new Date(0),
      new Date(2077, 4, 20),
    ])("should not throw when passed a date", (value) => {
      expect(() => throwIfNotDate(value)).not.toThrow(Error);
    });
  });

  describe("isPastDate", () => {
    // Is this even need after we tested the `throwIfNotDate` ?
    test("should throw when passed not a date", () => {
      expect(() => isPastDate("not a date")).toThrow(Error);
    });

    // more?
    test("should return true for date before now", () => {
      expect(isPastDate(fiveSecondsAgo)).toBeTruthy();
    });

    test("should return false for a date after now", () => {
      expect(isPastDate(fiveSecondsAhead)).toBeFalsy();
    });
  });

  describe("isFutureDate", () => {
    // test cases?
    test("should return true for a date ahead of now", () => {
      expect(isFutureDate(fiveSecondsAhead)).toBeTruthy();
    });

    test("should return false for a date before now", () => {
      expect(isFutureDate(fiveSecondsAgo)).toBeFalsy();
    });

    test("should return false for a current date", () => {
      expect(isFutureDate(now)).toBeFalsy();
    });
  });

  // Is this a good function to test? shouldn't the time be as argument?
  // Maybe we should figure out if this function even makes sense?
  // describe("isCurrentDate", () => {
  describe("isCurrentDayOfMonth", () => {
    test("should return true for a current date", () => {
      // console.log("test", { dayOfMonth: now.getDate() });
      expect(isCurrentDayOfMonth(now)).toBeTruthy();
    });

    test("should return false for a date before", () => {
      const pastDate = new Date(Date.now() - DAY_IN_MS - 123);

      expect(isCurrentDayOfMonth(pastDate)).toBeFalsy();
    });

    test("should return false for a date after", () => {
      const futureDate = new Date(Date.now() + DAY_IN_MS + 123);

      expect(isCurrentDayOfMonth(futureDate)).toBeFalsy();
    });
  });

  describe("can we test?", () => {
    test("Can we write the tests?", () => {
      expect("I think so. At least the basics ;) ").toBeTruthy();
    });
  });

});