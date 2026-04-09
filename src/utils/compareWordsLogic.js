// both of these function were taken line by line from claude
// see AI notes

export function compareWords(a, b) {
  const grid = [];

  for (let i = 0; i <= b.length; i++) {
    grid[i] = [i];
    for (let j = 1; j <= a.length; j++) {
      if (i === 0) {
        grid[i][j] = j;
      } else if (a[j - 1] === b[i - 1]) {
        grid[i][j] = grid[i - 1][j - 1];
      } else {
        grid[i][j] =
          1 +
          Math.min(
            grid[i - 1][j], // delete
            grid[i][j - 1], // insert
            grid[i - 1][j - 1], // substitute
          );
      }
    }
  }

  return grid[b.length][a.length];
}

export function getSuggestions(misspelledWord, dictionary) {
  return Array.from(dictionary)
    .map((word) => ({ word, distance: compareWords(misspelledWord, word) }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 5)
    .map(({ word }) => word);
}
