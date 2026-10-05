export const METRIC_CONFIG = [
    {
        key: "formatting",
        label: "Formatting",
        defaultValue: 7,
        icon: "🎨",
    },
    {
        key: "contentQuality",
        label: "Content Quality",
        defaultValue: 6,
        icon: "📝",
    },
    {
        key: "atsCompatibility",
        label: "ATS Compatibility",
        defaultValue: 6,
        icon: "🤖",
    },
    {
        key: "keywordUsage",
        label: "Keyword Usage",
        defaultValue: 5,
        icon: "🔍",
    },
    {
        key: "quantifiableAchievements",
        label: "Quantified Results",
        defaultValue: 4,
        icon: "📊",
    },
];

export const buildPresenceChecklist = (text) => {

  const hay = (text || "").toLowerCase();

    return [

        {
        label: "Contact Information",
        present: /email|phone|linkedin|github|@/.test(hay),
        },

        {
        label: "Education Section",
        present: /education|university|degree|college/.test(hay),
        },

        {
        label: "Experience Section",
        present: /experience|employment|work history/.test(hay),
        },

        {
        label: "Skills Section",
        present: /skills|technologies|tools|framework/.test(hay),
        },

    ];
};