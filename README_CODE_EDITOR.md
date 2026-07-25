# Code Editor Feature — Setup Notes

Naye pages/components add kiye gaye hain existing project mein.
In sab ko chalane ke liye ye npm packages install karo (agar already
nahi hain):

    npm install @monaco-editor/react react-router-dom lucide-react

(react-router-dom aur lucide-react shayad already installed honge,
Navbar.jsx mein use ho rahe the.)

## Naye/Changed files

- src/App.jsx                                 (routes updated)
- src/utils/codeStorage.js                    (localStorage helper — saved snippets)
- src/Components/CodeEditorComponent/
    - EditorToolbar/EditorToolbar.jsx + .css  (shared top bar: Run/Save/Reset)
    - SaveModal/SaveModal.jsx + .css          (title prompt before saving)
    - ConsolePanel/ConsolePanel.jsx + .css    (JS editor console output)
- src/Pages/CodeEditor/
    - HtmlCssEditor.jsx                       (/code-editor/html-css)
    - JavascriptEditor.jsx                    (/code-editor/javascript)
    - ReactEditor.jsx                         (/code-editor/react)
    - SavedCodes.jsx + SavedCodes.css         (/code-editor/saved)
    - CodeEditor.css                          (shared layout for the 3 editors)

## Kaise kaam karta hai

- **HTML/CSS editor** — do Monaco tabs (index.html / style.css), 400ms
  debounce ke baad iframe srcDoc update ho jaata hai (live preview).
- **JavaScript editor** — Monaco JS editor + "Run" button. Code ek
  sandboxed hidden iframe mein chalta hai, console.log/warn/error
  postMessage se capture hoke Console panel mein dikhta hai.
- **React editor** — JSX likho (`function App(){...}`), preview iframe
  React + ReactDOM + Babel-standalone CDN se load karke in-browser
  transpile + render karta hai. Typing rukne ke 700ms baad auto-refresh
  hota hai, errors preview ke upar red banner mein dikhte hain.
- **Saved Codes** — teeno editors se "Save" kiya hua data
  `localStorage` (key: `code_editor_snippets`) mein store hota hai.
  Yahan se "Open in Editor" click karne par us editor page par
  `?load=<id>` query param ke saath navigate hota hai aur code load
  ho jaata hai.

## Known limitations / next steps

- React editor sirf single-file `App.jsx`-style component support
  karta hai (no imports / multiple files) — abhi ke liye keep-it-simple.
- localStorage-based storage hai, isliye ek hi browser tak limited hai
  (no backend/DB). Agar backend chahiye, batao — API integrate kar
  denge existing `src/API/` pattern follow karke.
- Monaco CDN se load hota hai by default (`@monaco-editor/react`),
  isliye pehli load thodi slow ho sakti hai; offline/self-hosted
  chahiye to bata dena, config change kar denge.
- All files syntax-checked with esbuild locally — ek baar apne
  machine par `npm run dev` chala ke visually bhi verify kar lena.
