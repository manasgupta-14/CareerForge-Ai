const WEAK_VERBS = [
    "responsible for", "worked on", "helped with", "did", "handled",
    "duties included", "tasked with", "in charge of",
];

const ACTION_VERBS = [
    "led", "built", "created", "designed", "developed", "managed",
    "launched", "implemented", "improved", "increased", "reduced",
    "optimized", "automated", "delivered", "achieved", "drove",
    "spearheaded", "streamlined", "architected", "coordinated",
    "mentored", "negotiated", "analyzed", "generated", "resolved",
];

const SECTION_KEYWORDS = {
    contact: ["email", "phone", "@"],
    summary: ["summary", "objective", "profile"],
    experience: ["experience", "employment", "work history"],
    education: ["education", "degree", "university", "college"],
    skills: ["skills", "technologies", "tools"],
};

const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
const PHONE_RE = /(\+?\d[\d\s().-]{7,}\d)/;

const clamp = (n, min = 0, max = 100) => Math.max(min, Math.min(max, n));

const countWords = (text) =>
    (text.trim().match(/\S+/g) || []).length;

export const resumeToText = (resume) => {
    if (!resume) return "";

    const parts = [];

    parts.push(resume.personal?.fullName || "");
    parts.push(resume.personal?.email || "");
    parts.push(resume.personal?.phone || "");
    parts.push(resume.personal?.location || "");
    parts.push(resume.targetRole || "");
    parts.push("Summary");
    parts.push(resume.summary || "");

    parts.push("Experience");
    (resume.experience || []).forEach((exp) => {
        parts.push(`${exp.title || ""} ${exp.company || ""} ${exp.location || ""}`);
        parts.push(exp.description || "");
    });

    parts.push("Education");
    (resume.education || []).forEach((edu) => {
        parts.push(`${edu.degree || ""} ${edu.school || ""} ${edu.location || ""}`);
    });

    parts.push("Skills");
    parts.push((resume.skills || []).join(", "));

    if ((resume.projects || []).length) {
        parts.push("Projects");
        resume.projects.forEach((p) => {
            parts.push(`${p.name || ""} ${p.description || ""}`);
        });
    }

    if ((resume.certifications || []).length) {
        parts.push("Certifications");
        parts.push(resume.certifications.join(", "));
    }

    return parts.filter(Boolean).join("\n");
};

const extractKeywords = (jobKeywordsStr) =>
    (jobKeywordsStr || "")
        .split(/[,\n]/)
        .map((k) => k.trim().toLowerCase())
        .filter(Boolean);

/**
 * Runs a simple rule-based ATS-style check against resume text.
 * @param {string} text - plain resume text
 * @param {string} jobKeywords - comma separated keywords from a job description (optional)
 */
export const runAtsCheck = (text, jobKeywords = "") => {
    const lower = text.toLowerCase();
    const wordCount = countWords(text);
    const issues = [];
    const passes = [];
    let score = 0;
    const maxScore = 100;

    const hasEmail = EMAIL_RE.test(text);
    const hasPhone = PHONE_RE.test(text);
    if (hasEmail && hasPhone) {
        score += 15;
        passes.push("Email and phone number are both present.");
    } else {
        issues.push(
            !hasEmail && !hasPhone
                ? "No email or phone number detected — recruiters and ATS software need a way to contact you."
                : !hasEmail
                ? "No email address detected."
                : "No phone number detected."
        );
    }

    let sectionScore = 0;
    Object.entries(SECTION_KEYWORDS).forEach(([section, keywords]) => {
        const found = keywords.some((k) => lower.includes(k));
        if (found) {
            sectionScore += 5;
        } else {
            issues.push(`Missing or unclear "${section}" section.`);
        }
    });
    score += sectionScore;
    if (sectionScore === 25) passes.push("All core sections (contact, summary, experience, education, skills) are present.");

    if (wordCount >= 250 && wordCount <= 900) {
        score += 15;
        passes.push(`Good length (${wordCount} words) — easy for ATS and recruiters to parse.`);
    } else if (wordCount < 250) {
        score += Math.round((wordCount / 250) * 15);
        issues.push(`Resume looks short (${wordCount} words). Aim for 250–900 words with concrete detail.`);
    } else {
        score += 8;
        issues.push(`Resume looks long (${wordCount} words). Consider trimming to the most relevant, recent experience.`);
    }

    const actionCount = ACTION_VERBS.filter((v) => lower.includes(v)).length;
    const weakCount = WEAK_VERBS.filter((v) => lower.includes(v)).length;
    if (actionCount >= 4 && weakCount === 0) {
        score += 15;
        passes.push(`Strong use of action verbs (${actionCount} found).`);
    } else if (actionCount >= 2) {
        score += 9;
        issues.push("Use more strong action verbs (e.g. led, built, improved, increased) to open bullet points.");
    } else {
        score += 3;
        issues.push("Bullet points rely on weak phrasing. Start each one with a strong action verb.");
    }
    if (weakCount > 0) {
        issues.push(`Avoid passive phrases like "responsible for" or "worked on" — found ${weakCount} instance(s).`);
    }

    const numberMatches = text.match(/\d+%?/g) || [];
    if (numberMatches.length >= 4) {
        score += 15;
        passes.push("Multiple quantified achievements (numbers, %, metrics) found — great for credibility.");
    } else if (numberMatches.length >= 1) {
        score += 8;
        issues.push("Add more measurable results (numbers, %, time saved, revenue, team size) to your bullet points.");
    } else {
        issues.push("No numbers or metrics found. Quantify your impact wherever possible (e.g. \"reduced load time by 40%\").");
    }

    const hasTabsOrWeirdChars = /\t{2,}|[■●◆]/.test(text);
    const hasBullets = /[•\-*]\s/.test(text) || /\n\s*[-•]/.test(text);
    if (!hasTabsOrWeirdChars) {
        score += 5;
        passes.push("No unusual characters or tables detected that could confuse ATS parsers.");
    } else {
        issues.push("Unusual symbols/characters detected — some ATS software can't parse tables, icons, or special bullets.");
    }
    if (hasBullets) {
        score += 5;
        passes.push("Uses bullet points for readability.");
    } else {
        issues.push("Use bullet points to break up experience descriptions instead of long paragraphs.");
    }

    let keywordMatch = null;
    const keywords = extractKeywords(jobKeywords);
    if (keywords.length) {
        const matched = keywords.filter((k) => lower.includes(k));
        const pct = Math.round((matched.length / keywords.length) * 100);
        keywordMatch = { matched, missing: keywords.filter((k) => !matched.includes(k)), pct };
        score += Math.round((pct / 100) * 5);
        if (pct < 50) {
            issues.push(`Only ${pct}% of the target job keywords appear in your resume — tailor your skills/experience wording to match.`);
        } else {
            passes.push(`${pct}% of target job keywords found in your resume.`);
        }
    }

    score = clamp(Math.round(score));

    let rating = "Needs Work";
    if (score >= 85) rating = "Excellent";
    else if (score >= 70) rating = "Good";
    else if (score >= 50) rating = "Fair";

    return {
        score,
        maxScore,
        rating,
        wordCount,
        issues,
        passes,
        keywordMatch,
        hasEmail,
        hasPhone,
        actionCount,
        weakCount,
        numberCount: numberMatches.length,
    };
};

export const generateSuggestions = (resume) => {
    const suggestions = [];
    const text = resumeToText(resume);
    const lower = text.toLowerCase();

    if (!resume.summary || countWords(resume.summary) < 20) {
        suggestions.push({
            section: "Summary",
            tip: "Write a 2–3 sentence summary highlighting your years of experience, core strengths, and the role you're targeting.",
        });
    }

    if (!resume.experience || resume.experience.length === 0) {
        suggestions.push({
            section: "Experience",
            tip: "Add at least one work, internship, or project experience with 2–4 bullet points describing your impact.",
        });
    } else {
        resume.experience.forEach((exp, i) => {
            const desc = (exp.description || "").toLowerCase();
            if (!/\d/.test(desc)) {
                suggestions.push({
                    section: `Experience #${i + 1} (${exp.title || "role"})`,
                    tip: "Add a number or metric — team size, % improvement, time saved, revenue impact — to make this achievement concrete.",
                });
            }
            if (WEAK_VERBS.some((v) => desc.includes(v))) {
                suggestions.push({
                    section: `Experience #${i + 1} (${exp.title || "role"})`,
                    tip: `Replace passive phrasing with a strong action verb, e.g. "${ACTION_VERBS[i % ACTION_VERBS.length]}..." instead of "responsible for..."`,
                });
            }
        });
    }

    if (!resume.skills || resume.skills.length < 5) {
        suggestions.push({
            section: "Skills",
            tip: "List at least 5–10 relevant skills (tools, languages, frameworks, soft skills) so ATS keyword matching picks you up.",
        });
    }

    if (!resume.education || resume.education.length === 0) {
        suggestions.push({
            section: "Education",
            tip: "Add your highest degree, institution, and graduation year.",
        });
    }

    if (!resume.personal?.linkedin) {
        suggestions.push({
            section: "Contact",
            tip: "Add a LinkedIn URL — recruiters commonly look for it.",
        });
    }

    if (countWords(text) < 200) {
        suggestions.push({
            section: "Overall",
            tip: "Your resume is quite short. Expand on projects, achievements, or relevant coursework to fill it out.",
        });
    }

    if (!/\b(led|managed|owned)\b/.test(lower) && (resume.experience || []).length > 1) {
        suggestions.push({
            section: "Overall",
            tip: "If you led any initiative, mentored others, or owned a deliverable end-to-end, call that out explicitly — leadership language stands out.",
        });
    }

    if (suggestions.length === 0) {
        suggestions.push({
            section: "Overall",
            tip: "Your resume covers the essentials well. Fine-tune the wording per job description for the best keyword match.",
        });
    }

    return suggestions;
};

export const countWordsInText = countWords;
