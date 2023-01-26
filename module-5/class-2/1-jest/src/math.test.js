// const { plus, subtract, multiply, divide } = require("./math.js");
const math = require("./math.js");

const debug = false;

describe("math", () => {
  beforeAll(() => debug && console.log("Let the testing begin!"));
  afterAll(() => debug && console.log("Let the testing end!"));

  beforeEach(() => debug && console.log("Get ready for another test!"));
  afterEach(() => debug && console.log("Hopefuly it passed!"));

  // beforeAll
  // beforeEach
  test("should add 2 and 2 resulting in 4", () => {
    debug && console.log("We will try to add 2 and 2. I wonder what the result should be?");

    const result = math.plus(2, 2);

    expect(result).toBe(4);
  });
  // afterEach

  // beforeEach
  test("should multiply 2 and 2 resulting in 4", () => {
    debug && console.log("We will try to multiply 2 and 2. I wonder what the result should be?");

    // const result = math.plus(2, 2);
    const result = math.multiply(2, 2);

    expect(result).toBe(4);
  });
  // afterEach
  // afterAll
});