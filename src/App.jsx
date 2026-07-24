import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";

import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import ApplyJobs from "./Components/JobsComponent/ApplyJobs/ApplyJobs";
import Internship from "./Components/JobsComponent/Internship/Internship";
import WorkFromHome from "./Components/JobsComponent/WorkFromHome/WorkFromHome";

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
                    element={<ApplyJobs/>}
                />

                <Route
                    path="/jobs/internship"
                    element={<Internship/>}
                />

                <Route
                    path="/jobs/work-from-home"
                    element={<WorkFromHome/>}
                />

                {/* Resume Builder */}
                <Route
                    path="/resume-builder/create"
                    element={<h1>Create Resume</h1>}
                />

                <Route
                    path="/resume-builder/my-resumes"
                    element={<h1>My Resumes</h1>}
                />

                <Route
                    path="/resume-builder/templates"
                    element={<h1>Resume Templates</h1>}
                />

                <Route
                    path="/resume-builder/ats-score"
                    element={<h1>ATS Score</h1>}
                />

                <Route
                    path="/resume-builder/ai-suggestions"
                    element={<h1>AI Suggestions</h1>}
                />

                <Route
                    path="/resume-builder/analyzer"
                    element={<h1>Resume Analyzer</h1>}
                />

                {/* Code Editor */}
                <Route
                    path="/code-editor/html-css"
                    element={<h1>HTML / CSS Editor</h1>}
                />

                <Route
                    path="/code-editor/javascript"
                    element={<h1>JavaScript Editor</h1>}
                />

                <Route
                    path="/code-editor/react"
                    element={<h1>React Editor</h1>}
                />

                <Route
                    path="/code-editor/saved"
                    element={<h1>Saved Codes</h1>}
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