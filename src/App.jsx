import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";

import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import Apply_Jobs from "./Pages/Jobs/Apply_Jobs";
import Work_From_Home from "./Pages/Jobs/Work_From_Home";
import InternshipHome from "./Pages/Jobs/InternshipHome";

import Create from "./Pages/ResumeBuilder/Create";
import MyResumes from "./Pages/ResumeBuilder/MyResumes";
import Templates from "./Pages/ResumeBuilder/Templates";
import AtsScore from "./Pages/ResumeBuilder/AtsScore";
import AiSuggestions from "./Pages/ResumeBuilder/AiSuggestions";
import Analyzer from "./Pages/ResumeBuilder/Analyzer";

import HtmlCssEditor from "./Pages/CodeEditor/HtmlCssEditor";
import JavascriptEditor from "./Pages/CodeEditor/JavascriptEditor";
import ReactEditor from "./Pages/CodeEditor/ReactEditor";
import SavedCodes from "./Pages/CodeEditor/SavedCodes";

function App() {
    return (
        <BrowserRouter>

            <Navbar />

            <Routes>

                {/* Home */}
                <Route path="/" element={<Home />} />

                {/* Jobs */}
                <Route
                    path="/jobs/apply-jobs"
                    element={<Apply_Jobs/>}
                />

                <Route
                    path="/jobs/internship"
                    element={<InternshipHome/>}
                />

                <Route
                    path="/jobs/work-from-home"
                    element={<Work_From_Home/>}
                />

                {/* Resume Builder */}
                <Route
                    path="/resume-builder/create"
                    element={<Create />}
                />

                <Route
                    path="/resume-builder/my-resumes"
                    element={<MyResumes />}
                />

                <Route
                    path="/resume-builder/templates"
                    element={<Templates />}
                />

                <Route
                    path="/resume-builder/ats-score"
                    element={<AtsScore />}
                />

                <Route
                    path="/resume-builder/ai-suggestions"
                    element={<AiSuggestions />}
                />

                <Route
                    path="/resume-builder/analyzer"
                    element={<Analyzer />}
                />

                {/* Code Editor */}
                <Route
                    path="/code-editor/html-css"
                    element={<HtmlCssEditor />}
                />

                <Route
                    path="/code-editor/javascript"
                    element={<JavascriptEditor />}
                />

                <Route
                    path="/code-editor/react"
                    element={<ReactEditor />}
                />

                <Route
                    path="/code-editor/saved"
                    element={<SavedCodes />}
                />

                {/* Quiz */}
                <Route
                    path="/quiz/html"
                    element={<h1>HTML Quiz</h1>}
                />

                <Route
                    path="/quiz/css"
                    element={<h1>CSS Quiz</h1>}
                />

                <Route
                    path="/quiz/javascript"
                    element={<h1>JavaScript Quiz</h1>}
                />

                <Route
                    path="/quiz/react"
                    element={<h1>React Quiz</h1>}
                />

                <Route
                    path="/quiz/mock-interview"
                    element={<h1>Mock Interview</h1>}
                />

                {/* Other Pages */}
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />

                {/* Auth */}
                <Route path="/login" element={<h1>Login</h1>} />
                <Route path="/register" element={<h1>Register</h1>} />

                {/* 404 Page */}
                <Route path="*" element={<h1>404 - Page Not Found</h1>} />

            </Routes>

        </BrowserRouter>
    );
}

export default App;