import { useState, useEffect } from "react";
import { loadDictionary } from "./utils/dictionary";
import { stripText } from "./utils/stripText";
import { spellChecker } from "./utils/spellChecker";

function App() {
  const [dictionary, setDictionary] = useState(null);
  const [inputText, setInputText] = useState("");
  const [misspelledWords, setMisspelledWords] = useState([]);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    async function initDictionary() {
      const words = await loadDictionary();
      setDictionary(words);
    }
    initDictionary();
  }, []);

  const handleButtonClick = () => {
    setMisspelledWords(spellChecker(stripText(inputText), dictionary));
    setHasChecked(true);
  };

  const handleClearText = () => {
    setInputText("");
    setHasChecked(false);
    setMisspelledWords([]);
  };
  return (
    <div className="min-h-screen bg-rose-300 flex flex-col items-center justify-center">
      <h1 className="text-white text-4xl font-bold pb-6">Spell Checker</h1>
      <textarea
        className="w-full max-w-2xl h-48 p-4 mx-6 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="yo yo yo paste or type text here....."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button
        className={`mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 ${!inputText ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={handleButtonClick}
        disabled={!inputText}
      >
        Check Spelling
      </button>
      {hasChecked &&
        (misspelledWords.length > 0 ? (
          <>
            <div className="flex justify-center p-4 text-gray-600">
              <button onClick={handleClearText}>clear text</button>
            </div>
            <div className="mt-6 w-full max-w-2xl">
              <p className="mb-2">You have some misspelled words.....</p>
              <ol className="list-decimal list-inside space-y-1">
                {misspelledWords.map((word, index) => (
                  <li key={index} className="text-red-500">
                    {word}
                  </li>
                ))}
              </ol>
            </div>
          </>
        ) : (
          <div>
            <div className="pt-4">Your spelling is great!</div>
          </div>
        ))}
    </div>
  );
}

export default App;
