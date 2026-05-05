// This function takes whatever is entered into the textarea
// and strips it of all the fancy things with regex magic

export function stripText(text: string): string[] {
  return text
    .split(/\s+/)
    .map((word) => word.replace(/[^a-z]/gi, ""))
    .filter(Boolean);
}
