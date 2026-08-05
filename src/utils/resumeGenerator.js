const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
const PHONE_RE = /(\+?\d[\d\s().-]{7,}\d)/;
const LINKEDIN_RE = /(linkedin\.com\/[^\s,]+)/i;
const URL_RE = /(https?:\/\/[^\s,]+|(?:www\.)[^\s,]+\.[a-z]{2,}[^\s,]*)/i;

const clean = (s = "") => s.replace(/\s+/g, " ").trim();

const splitSentences = (text) =>
    text
        .split(/(?<=[.!?])\s+|\n+/)
        .map((s) => s.trim())
        .filter(Boolean);

const guessName = (text) => {
    const firstLine = text.split("\n").map((l) => l.trim()).find(Boolean) || "";
    const words = firstLine.split(/\s+/);
    if (
        words.length >= 2 &&
        words.length <= 4 &&
        !EMAIL_RE.test(firstLine) &&
        !/\d/.test(firstLine) &&
        firstLine.length < 40
    ) {
        return firstLine;
    }
    return "";
};

const guessSkills = (text) => {
    const skillsLineMatch = text.match(/skills?\s*[:\-]\s*(.+)/i);
    if (skillsLineMatch) {
        return skillsLineMatch[1]
            .split(/[,|]/)
            .map((s) => clean(s))
            .filter(Boolean)
            .slice(0, 20);
    }

    const KNOWN = [
        "JavaScript", "TypeScript", "React", "Node.js", "Python", "Java",
        "C++", "SQL", "MongoDB", "AWS", "Docker", "Kubernetes", "Git",
        "HTML", "CSS", "Redux", "Express", "Django", "Flask", "Figma",
        "Excel", "Communication", "Leadership", "Project Management",
        "Data Analysis", "Machine Learning", "Photoshop", "SEO",
    ];

    return KNOWN.filter((skill) =>
        new RegExp(`\\b${skill.replace(/[.+]/g, "\\$&")}\\b`, "i").test(text)
    );
};

const guessSummarySentence = (sentences) => {
    const withYears = sentences.find((s) => /\d+\+?\s*years?/i.test(s));
    if (withYears) return withYears;
    return sentences[0] || "";
};

export const parseFreeTextToResume = (rawText, targetRole = "") => {
    const text = rawText || "";
    const sentences = splitSentences(text);

    const emailMatch = text.match(EMAIL_RE);
    const phoneMatch = text.match(PHONE_RE);
    const linkedinMatch = text.match(LINKEDIN_RE);
    const portfolioMatch = text.match(URL_RE);

    const result = {
        personal: {
            fullName: guessName(text),
            email: emailMatch ? emailMatch[0] : "",
            phone: phoneMatch ? clean(phoneMatch[0]) : "",
            location: "",
            linkedin: linkedinMatch ? `https://${linkedinMatch[0].replace(/^https?:\/\//i, "")}` : "",
            portfolio: portfolioMatch && !linkedinMatch ? portfolioMatch[0] : "",
        },
        targetRole: targetRole || "",
        summary: clean(guessSummarySentence(sentences)),
        skills: guessSkills(text),
        experience: [],
        education: [],
        projects: [],
        certifications: [],
    };

    const roleAtCompany = text.match(
        /([A-Z][A-Za-z .]{2,40})\s+at\s+([A-Z][A-Za-z0-9&.,' ]{2,40})(?:\s*\(?([\d]{4}\s*[-–—]\s*(?:[\d]{4}|present))\)?)?/i
    );
    if (roleAtCompany) {
        const [, title, company, range] = roleAtCompany;
        let start = "", end = "";
        if (range) {
            const parts = range.split(/[-–—]/).map((p) => p.trim());
            start = parts[0] || "";
            end = parts[1] || "";
        }
        result.experience.push({
            id: `exp_${Date.now()}`,
            title: clean(title),
            company: clean(company),
            location: "",
            start,
            end,
            current: /present/i.test(end),
            description: sentences
                .filter((s) => s !== roleAtCompany[0])
                .slice(0, 3)
                .join(" "),
        });
    }

    const degreeMatch = text.match(
        /(B\.?Tech|M\.?Tech|Bachelor(?:'s)?|Master(?:'s)?|B\.?Sc|M\.?Sc|MBA|Ph\.?D|Diploma)[^.\n]{0,60}?(?:from|,|-)\s*([A-Z][A-Za-z0-9&.,' ]{3,60})/i
    );
    if (degreeMatch) {
        result.education.push({
            id: `edu_${Date.now()}`,
            degree: clean(degreeMatch[0].split(/from|,|-/i)[0]),
            school: clean(degreeMatch[2]),
            location: "",
            start: "",
            end: "",
        });
    }

    return result;
};

export const CHAT_QUESTIONS = [
    { key: "fullName", prompt: "Let's build your resume together. What's your full name?", group: "personal" },
    { key: "targetRole", prompt: "Nice to meet you! What job title/role are you targeting?", group: "meta" },
    { key: "email", prompt: "What's your email address?", group: "personal" },
    { key: "phone", prompt: "And your phone number?", group: "personal" },
    { key: "location", prompt: "Which city/location should appear on your resume?", group: "personal" },
    { key: "summary", prompt: "Give me a quick 1–2 sentence summary of your professional background (years of experience, strengths, what you're looking for).", group: "meta" },
    { key: "experience", prompt: "Tell me about your most recent job: role, company, and 2-3 things you did there. (e.g. \"Software Engineer at Acme Corp, 2021-2023 — built the payments dashboard, cut load time by 40%\")", group: "list-experience" },
    { key: "moreExperience", prompt: "Got it! Do you have another role to add? Type it the same way, or type \"no\" to move on.", group: "list-experience-more" },
    { key: "education", prompt: "What's your highest education? (e.g. \"B.Tech in Computer Science, XYZ University, 2019-2023\")", group: "list-education" },
    { key: "skills", prompt: "List your top skills, separated by commas (e.g. React, Node.js, SQL, Communication).", group: "personal" },
    { key: "projects", prompt: "Any notable project to add? (name + one line) Type \"skip\" if not.", group: "list-projects" },
];

const parseExperienceAnswer = (answer) => {
    const roleAtCompany = answer.match(
        /(.+?)\s+at\s+(.+?)(?:,|\s*\(?)\s*([\d]{4}\s*[-–—]\s*(?:[\d]{4}|present))?[,)]?\s*[-–—:]?\s*(.*)$/i
    );

    if (roleAtCompany) {
        const [, title, company, range, rest] = roleAtCompany;
        let start = "", end = "";
        if (range) {
            const parts = range.split(/[-–—]/).map((p) => p.trim());
            start = parts[0] || "";
            end = parts[1] || "";
        }
        return {
            id: `exp_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
            title: clean(title),
            company: clean(company),
            location: "",
            start,
            end,
            current: /present/i.test(end),
            description: clean(rest) || "",
        };
    }

    return {
        id: `exp_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        title: "",
        company: "",
        location: "",
        start: "",
        end: "",
        current: false,
        description: clean(answer),
    };
};

const parseEducationAnswer = (answer) => {
    const parts = answer.split(",").map((p) => clean(p));
    const yearMatch = answer.match(/([\d]{4}\s*[-–—]\s*(?:[\d]{4}|present))/i);
    let start = "", end = "";
    if (yearMatch) {
        const yr = yearMatch[1].split(/[-–—]/).map((p) => p.trim());
        start = yr[0] || "";
        end = yr[1] || "";
    }

    return {
        id: `edu_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        degree: parts[0] || clean(answer),
        school: parts[1] || "",
        location: "",
        start,
        end,
    };
};

const parseProjectAnswer = (answer) => {
    const [name, ...rest] = answer.split(/[-–—:]/);
    return {
        id: `proj_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        name: clean(name) || "Project",
        description: clean(rest.join(" ")) || clean(answer),
        link: "",
    };
};

export const buildResumeFromChat = (answers) => {
    const experience = (answers.experienceAnswers || [])
        .filter((a) => a && !/^no$/i.test(a.trim()))
        .map(parseExperienceAnswer);

    const education = answers.education
        ? [parseEducationAnswer(answers.education)]
        : [];

    const projects = answers.projects && !/^skip$/i.test(answers.projects.trim())
        ? [parseProjectAnswer(answers.projects)]
        : [];

    const skills = (answers.skills || "")
        .split(",")
        .map((s) => clean(s))
        .filter(Boolean);

    return {
        personal: {
            fullName: clean(answers.fullName || ""),
            email: clean(answers.email || ""),
            phone: clean(answers.phone || ""),
            location: clean(answers.location || ""),
            linkedin: "",
            portfolio: "",
        },
        targetRole: clean(answers.targetRole || ""),
        summary: clean(answers.summary || ""),
        experience,
        education,
        skills,
        projects,
        certifications: [],
    };
};
