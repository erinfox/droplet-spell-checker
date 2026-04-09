// This function takes the stripped words
// then checks each one against the dictionary Set

// loops thought each word, keeps it if its NOT in the dictionary
// lowercases the word
// two conditions that must BOTH be true to flag the word:

// 1. !dictionary.has(lowerCaseWord)
//    the word is NOT in the dictionary
//    "storee" → not in dictionary → true
//    "store" → in dictionary → false, not flagged

// 2. word[0] === word[0].toLowerCase()
//    the first letter is lowercase
//    "storee" → 's' === 's' → true
//    "Erin" → 'E' === 'e' → false, not flagged (proper noun)

// both must be true — misspelled AND not a proper noun

export function spellChecker(words, dictionary) {
  return words.filter((word) => {
    const lowerCaseWord = word.toLowerCase();
    return !dictionary.has(lowerCaseWord) && word[0] === word[0].toLowerCase();
  });
}
