// This function uses the dictionary.txt file
// reads the response as a plain text string
// turns it into an array, split on each word
// removes any empty lines and makes it lowercase
// creates a new set called 'words'

// Example, the first 2 words are "aa aah"
// .spilt on each new line and gets: ['aa', 'aah']
// .map loops each word and .trims/removes and spaces or characters and makes it all lowerCase
// .filter removes any empty strings if there are blank lines
// so, words = Set { 'aa', 'aah', 'aal', ... }
// it returns an error in the console and an empty set if there's an error

export async function loadDictionary() {
  try {
    const response = await fetch("/dictionary.txt");
    const text = await response.text();
    const words = new Set(
      text.split("\n").map((word) => word.trim().toLowerCase()),
    );
    return words;
  } catch (error) {
    console.error("Failed to load dictionary:", error);
    return new Set();
  }
}
