import { compareWords, getSuggestions } from "../compareWordsLogic";

describe("compareWords", () => {
  test("returns 0 for identical words", () => {
    expect(compareWords("hello", "hello")).toBe(0);
  });

  test("returns 1 for one substitution", () => {
    expect(compareWords("cat", "bat")).toBe(1);
  });

  test("returns 1 for one insertion", () => {
    expect(compareWords("cat", "cats")).toBe(1);
  });

  test("returns 1 for one deletion", () => {
    expect(compareWords("cats", "cat")).toBe(1);
  });
});

describe("getSuggestions", () => {
  const dictionary = new Set(["store", "stored", "stores", "stare", "score"]);

  test("returns up to 5 suggestions", () => {
    expect(getSuggestions("storee", dictionary).length).toBeLessThanOrEqual(5);
  });

  test("returns closest match first", () => {
    const suggestions = getSuggestions("storee", dictionary);
    expect(suggestions[0]).toBe("store");
  });
});
