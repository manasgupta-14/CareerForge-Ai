import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";

import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";

function App() {
    return (
        <>
            <BrowserRouter>

                <Navbar />

                <Routes>
                    <Route path="/" element={<Home />} />

                    <Route path="/jobs" element={<h1>Jobs</h1>} />

                    <Route
                        path="/resume-builder"
                        element={<h1>AI Resume Builder</h1>}
                    />

                    <Route
                        path="/code-editor"
                        element={<h1>Online Code Editor</h1>}
                    />

                    <Route path="/quiz" element={<h1>Quiz</h1>} />

                    <Route path="/about" element={<About />} />

                    <Route path="/contact" element={<Contact />} />

                    <Route path="/login" element={<h1>Login</h1>} />

                    <Route path="/register" element={<h1>Register</h1>} />
                </Routes>

            </BrowserRouter>
        </>
    );
}

export default App;