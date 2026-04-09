# Spell Checker

A browser based spell checker built with React. Paste or type text into the textarea, hit **Check Spelling**, and get a list of misspelled words with suggested corrections.

🔗 **Live demo:** https://droplet-spell-checker.vercel.app/

---

## Features

- Outputs a list of incorrectly spelled words
- Suggests corrections for each misspelled word using Levenshtein distance
- Skips proper nouns (capitalized words)
- Accessible UI (tested with jest-axe)
- CLI support via `node cli.js`

---

## Running Locally

**Prerequisites:** Node v24.14.1

```sh
npm install
npm run dev
```

---

## Running Tests

```sh
npm test
```

---

## CLI Usage

```sh
node cli.js dictionary.txt file-to-check.txt
```

---

## Technologies

- React
- Vite
- JavaScript
- Tailwind CSS
- Jest
- React Testing Library
- jest-axe
- Vercel

---

## Planning and Approach

Before writing any code, I built out a structured to do list similar to how I'd organize tickets and subtickets. Breaking it down, that way cleared my head and let me focus on one thing at a time. From there, Claude helped me work through each piece bytalking through data structures (Set vs array for dictionary lookup), regex for text stripping, the distance algorithm for suggestions, accessible UI design, and getting everything together in React.

I wanted to try Vite for scaffolding since my previous company used it but I wasn't directly involved when it was added.

Here's an example of how I broke down the work:

- Setup project
  - React & Vite
  - Tailwind CSS
  - Jest & React Testing Library & jest-axe
  - Add dictionary file to the repo

- Add logic
  - Load/parse dictionary file
  - Parse input text to words (strip punctuation, case sensitive, etc.)
  - Flag misspelled words
  - Handle proper nouns
  - Show suggestions

- Testing
  - Generate unit tests

- UI
  - Textarea input
  - Display misspelled words
  - Display suggested words
  - A11y/mobile friendly

- SHIP
  - Write a README
  - Include AI transcript
  - Include these notes
  - Email

---

## How I Used AI

After reading the project instructions, I opened Claude and used it as a coding buddy throughout, mostly for rubber ducking, quick lookups, and getting unstuck. I wasn't looking for Claude to write the project for me (but I did for tests, regex, ally design help, and algorithm implementation for suggested words). To see my conversation with Claude, check out `ai-transcript.md`.

---

## Known Gaps / Future Work

- **Surrounding context** — the spec calls for showing the misspelled word with surrounding text. Not yet implemented.
- **Proper noun handling** — current logic skips any capitalized word, which means misspelled words at the start of a sentence also get a free pass. I think it's still buggy. More testing and refinement needed.
- **TypeScript** — left out to keep the timing short. I have not used it before but willing to learn with focused time in the future.
- **Performance** — Performance optimization (How could I make this faster for the user who paste big files/text?)
