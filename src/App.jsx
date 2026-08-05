import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./Context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

import Navbar from "./Components/Navbar/Navbar";

import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Profile from "./Pages/Profile/Profile";

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

import QuizHub from "./Pages/Quiz/QuizHub";
import QuizPlay from "./Pages/Quiz/QuizPlay";
import MockInterview from "./Pages/Quiz/MockInterview";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>

                <Navbar />

                <Routes>

                    <Route path="/" element={<Home />} />

                    <Route
                        path="/jobs/apply-jobs"
                        element={<Apply_Jobs />}
                    />

                    <Route
                        path="/jobs/internship"
                        element={<InternshipHome />}
                    />

                    <Route
                        path="/jobs/work-from-home"
                        element={<Work_From_Home />}
                    />

                    <Route
                        path="/resume-builder/create"
                        element={<Create />}
                    />

                    <Route
                        path="/resume-builder/my-resumes"
                        element={
                            <ProtectedRoute>
                                <MyResumes />
                            </ProtectedRoute>
                        }
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
                        element={
                            <ProtectedRoute>
                                <SavedCodes />
                            </ProtectedRoute>
                        }
                    />

                    <Route path="/quiz" element={<QuizHub />} />

                    <Route
                        path="/quiz/mock-interview"
                        element={<MockInterview />}
                    />

                    <Route
                        path="/quiz/:category"
                        element={<QuizPlay />}
                    />

                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />

                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />

                    <Route path="*" element={<h1>404 - Page Not Found</h1>} />

                </Routes>

            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;