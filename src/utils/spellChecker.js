// This function takes the stripped words
// then checks each one against the dictionary

// loops thought each word, keeps it if its NOT in the dictionary
// returns the array of misspelled words

export function spellChecker(words, dictionary) {
  return words.filter((word) => !dictionary.has(word.toLowerCase()));
}
