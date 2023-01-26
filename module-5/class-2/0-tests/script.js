const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);
// const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(0); // failing
// const capitalize = text => text.toUpperCase().slice(0, 1) + text.slice(1); // refactor
// const capitalize = text => text.slice(0, 1).toUpperCase() + text.slice(1); // refactor


const result = capitalize("dupa");
console.log(result);


const testCases = [
  { label: "Should capitalize adam to Adam", input: "adam", expectedResult: "Adam" },
  { label: "Should capitalize beth to Beth", input: "beth", expectedResult: "Beth" },
  { label: "Should capitalize cecil to Cecil", input: "cecil", expectedResult: "Cecil" },
  { label: "Should capitalize kuba to Kuba", input: "kuba", expectedResult: "Kuba" },
];

const testSuiteResult = testCases
  .map(({ label, input, expectedResult }, i) => {
    const result = capitalize(input);
    const testResult = result === expectedResult;

    console.log(i + 1, testResult ? "✅" : "❌", label);
    if (!testResult) console.log({ result, expectedResult });

    return testResult;
  }).every(Boolean);

console.log(`${testSuiteResult ? "✅" : "❌"} ${testSuiteResult ? "All tests passed!" : "Some tests failed!"}`);
