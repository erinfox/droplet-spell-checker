#!/usr/bin/env node

// /*
//  * +---------+
//  * |         |
//  * | D I C T |
//  * | I O N A |
//  * | R Y     |
//  * |         |
//  * +---------+
//  */

import fs from "fs";
import path from "path";
import { stripText } from "./src/utils/stripText.js";
import { spellChecker } from "./src/utils/spellChecker.js";
import { getSuggestions } from "./src/utils/compareWordsLogic.js";

const [, , dictionaryPath, inputPath] = process.argv;

if (!dictionaryPath || !inputPath) {
  console.error("Usage: node cli.js dictionary.txt file-to-check.txt");
  process.exit(1);
}

// load dictionary
const dictionaryText = fs.readFileSync(path.resolve(dictionaryPath), "utf-8");
const dictionary = new Set(
  dictionaryText.split("\n").map((word) => word.trim().toLowerCase()),
);
dictionary.add("i");
dictionary.add("a");

// load input file
const inputText = fs.readFileSync(path.resolve(inputPath), "utf-8");
const words = stripText(inputText);
const misspelled = spellChecker(words, dictionary);

if (misspelled.length === 0) {
  console.log("✓ No spelling mistakes found!");
} else {
  console.log(`Found ${misspelled.length} misspelled word(s):\n`);
  misspelled.forEach((word) => {
    const suggestions = getSuggestions(word, dictionary);
    console.log(`  ${word}`);
    console.log(`  Suggestions: ${suggestions.join(", ")}\n`);
  });
}
