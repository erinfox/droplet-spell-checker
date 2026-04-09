import { stripText } from "../stripText";

describe("stripText", () => {
  test("splits text into words", () => {
    expect(stripText("hello world")).toEqual(["hello", "world"]);
  });

  test("removes non-letter characters", () => {
    expect(stripText("hello, world!")).toEqual(["hello", "world"]);
  });

  test("handles multiple spaces", () => {
    expect(stripText("hello  world")).not.toContain("");
  });

  test("handles newlines", () => {
    expect(stripText("hello\nworld")).toEqual(["hello", "world"]);
  });
});
