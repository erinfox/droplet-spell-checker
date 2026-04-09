import { useState, useEffect } from "react";
import { loadDictionary } from "./utils/dictionary";
import { stripText } from "./utils/stripText";
import { spellChecker } from "./utils/spellChecker";
import { getSuggestions } from "./utils/compareWordsLogic";

function App() {
  const [dictionary, setDictionary] = useState(null);
  const [inputText, setInputText] = useState("");
  const [misspelledWords, setMisspelledWords] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    async function initDictionary() {
      const words = await loadDictionary();
      setDictionary(words);
    }
    initDictionary();
  }, []);

  const handleButtonClick = () => {
    // gets misspelled word
    const misspelled = spellChecker(stripText(inputText), dictionary);
    setMisspelledWords(misspelled);

    // gets word suggestions
    const wordSuggestions = misspelled.map((word) => ({
      word,
      suggestions: getSuggestions(word, dictionary),
    }));
    setHasChecked(true);
    setSuggestions(wordSuggestions);
  };

  const handleClearText = () => {
    setInputText("");
    setHasChecked(false);
    setMisspelledWords([]);
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Spell Checker</h1>
        <p className="text-gray-500 mb-6 text-sm">
          Paste or type text below to check your spelling.
        </p>

        <textarea
          className="w-full h-48 p-4 bg-white border border-gray-200 rounded-xl shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          placeholder="Type or paste your text here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <div className="flex gap-3 mt-4">
          <button
            className={`px-5 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors ${!inputText ? "opacity-40 cursor-not-allowed" : ""}`}
            onClick={handleButtonClick}
            disabled={!inputText}
          >
            Check Spelling
          </button>
          <button
            className="px-5 py-2 rounded-lg text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
            onClick={handleClearText}
          >
            Clear
          </button>
        </div>

        {hasChecked && (
          <div className="mt-8">
            {misspelledWords.length > 0 ? (
              <>
                <p className="text-sm font-medium text-gray-700 mb-4">
                  Found {misspelledWords.length} misspelled{" "}
                  {misspelledWords.length === 1 ? "word" : "words"}
                </p>
                <ol className="space-y-3">
                  {misspelledWords.map((word, index) => {
                    const match = suggestions.find((s) => s.word === word);
                    return (
                      <li
                        key={index}
                        className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
                      >
                        <span className="text-red-600 font-semibold">
                          {word}
                        </span>
                        <p className="text-gray-500 text-sm mt-1">
                          Suggestions: {match?.suggestions.join(", ")}
                        </p>
                      </li>
                    );
                  })}
                </ol>
              </>
            ) : (
              <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                <span className="text-green-600">✓</span>
                <span className="text-sm font-medium">
                  No spelling mistakes found!
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
