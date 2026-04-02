const { calculateWPM, calculateCPM, updateMistakes } = require("../script.js");

test("WPM calculation works correctly", () => {
  const result = calculateWPM(250, 10, 60, 30);
  expect(result).toBeGreaterThan(0);
});

test("WPM should be 0 if time not started", () => {
  const result = calculateWPM(100, 5, 60, 60);
  expect(result).toBe(0);
});

test("WPM should never be negative", () => {
  const result = calculateWPM(5, 10, 60, 30);
  expect(result).toBe(0);
});

test("CPM calculation is correct", () => {
  const result = calculateCPM(200, 20);
  expect(result).toBe(180);
});

test("Mistakes increase when character is incorrect", () => {
  const result = updateMistakes(false, 3);
  expect(result).toBe(4);
});

test("Mistakes stay same when character is correct", () => {
  const result = updateMistakes(true, 3);
  expect(result).toBe(3);
});

test("CPM cannot be negative", () => {
  const result = calculateCPM(5, 10);
  expect(result).toBeLessThanOrEqual(0);
});