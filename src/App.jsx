import { useState, useEffect } from "react";
import { loadDictionary } from "./utils/dictionary";
import { stripText } from "./utils/stripText";

function App() {
  const [dictionary, setDictionary] = useState(null);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    async function initDictionary() {
      const words = await loadDictionary();
      setDictionary(words);
    }
    initDictionary();
  }, []);
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
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        onClick={() => console.log(stripText(inputText))}
      >
        Check Spelling
      </button>
    </div>
  );
}

export default App;
