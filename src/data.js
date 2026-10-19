/**
 * All portfolio content lives here.
 * Edit this file to update your info — App.jsx renders it automatically.
 */

export const profile = {
  name: 'Jiayi (Chesley) Guo',
  shortName: 'Chesley Guo',
  title: 'MEng in Development Engineering @ UC Berkeley',
  focus: 'Data Science · Causal Inference · AI Product',
  tagline:
    'I turn messy real-world data into evidence for better products and policies, from evaluating LLMs at TikTok to measuring the causal impact of speed cameras with the Oakland Department of Transportation.',
  bio: [
    "I'm a Master of Engineering student in Development Engineering at UC Berkeley (AI/Data Analytics track), graduating in December 2026. Before Berkeley, I earned my B.S. in Information Sciences with a Data Science track from the University of Illinois Urbana-Champaign.",
    'My work sits at the intersection of data science, AI, and product. I have built causal inference models on multi-year panel data, designed evaluation metrics for large language models, and run data-driven growth experiments for real-time communication products used by developers worldwide.',
    'I care about rigorous analysis that leads to real decisions, and I enjoy working across algorithm, product, and business teams to get things shipped.',
  ],
  location: 'Berkeley, CA',
  email: 'chesleyguo@berkeley.edu',
  linkedin: 'https://www.linkedin.com/in/jg1023',
  openTo: ['Data Scientist', 'AI Product Manager', 'Research & Analytics'],
  availability: 'Available for full-time roles starting January 2027',
};

export const socials = [
  { label: 'LinkedIn', url: profile.linkedin },
  { label: 'Email', url: `mailto:${profile.email}` },
];

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'research', label: 'Research' },
  { id: 'skills', label: 'Skills' },
  { id: 'honors', label: 'Honors' },
  { id: 'contact', label: 'Contact' },
];

export const education = [
  {
    school: 'University of California, Berkeley',
    degree: 'Master of Engineering (MEng), Development Engineering',
    detail: 'AI/Data Analytics Track · Certificate in Entrepreneurship & Technology',
    gpa: '3.82',
    date: 'Expected Dec 2026',
  },
  {
    school: 'University of Illinois Urbana-Champaign',
    degree: 'B.S. in Information Sciences',
    detail: 'Data Science Track · Minor in Computer Science',
    gpa: '3.91',
    date: 'Aug 2024',
  },
];

export const experience = [
  {
    company: 'Tencent',
    role: 'Product Manager Intern',
    team: 'Cloud & Smart Industries Group: Real-Time Communication',
    date: 'May 2025 – Aug 2025',
    location: 'Shanghai, China',
    highlights: [
      'Drove feature improvements across the RTC product suite (Conversational AI, Call, Conference, Live Streaming, In-game Voice Chat, Beauty AR) using event tracking and user behavior data.',
      'Led LinkedIn and TikTok marketing and localization, producing technical blogs, promo videos, and live webinars that reached 800+ developers and startups.',
      'Built an affiliate program with 100+ KOLs, generating 2.5k+ impressions and lifting conversion through performance-based partnerships.',
      'Designed A/B tests and content ecosystem maps to compare content strategies and optimize campaigns with data.',
    ],
  },
  {
    company: 'ByteDance (TikTok)',
    role: 'AI Strategy Product Manager Intern',
    team: 'TikTok AI Innovation Center',
    date: 'Nov 2024 – Jan 2025',
    location: 'Shanghai, China',
    highlights: [
      'Improved in-house video understanding and text generation LLMs, raising description accuracy and reducing hallucinations.',
      'Wrote PRDs defining core LLM capabilities (video tagging, summarization, question answering) and designed evaluation metrics for accuracy, semantic relevance, and logical reasoning.',
      'Coordinated algorithm engineers, data annotation vendors, and infrastructure teams to move models through training and deployment.',
      'Built metric dashboards from user scenarios and feedback to guide model iteration.',
    ],
  },
  {
    company: 'Shanghai Artificial Intelligence Laboratory',
    role: 'Research Intern, OpenTrust Lab',
    team: 'LLM Safety & Trustworthy AI',
    date: 'Jun 2024 – Aug 2024',
    location: 'Shanghai, China',
    highlights: [
      'Conducted literature research on LLM security and trustworthiness, supporting AI safety experiments.',
      'Ran global content and social media for the ICML 2024 TiFA workshop (Trustworthy Multi-modal Foundation Models and AI Agents), iterating on strategy with engagement data.',
      'Built event operations for the Security Forum at the 2024 World Artificial Intelligence Conference (WAIC), hosting hundreds of attendees.',
    ],
  },
  {
    company: 'CSC Financial Co., Ltd.',
    role: 'Financial Planning & Analysis Intern',
    team: 'FP&A',
    date: 'Jul 2023 – Aug 2023',
    location: 'Changzhou, China',
    highlights: [
      'Built financial models for forecasting and budgeting, improving accuracy and efficiency.',
      'Ran competitor and market analyses and presented growth recommendations directly to senior management.',
    ],
  },
];

// category must match one of the `researchFilters` ids below
// link: optional URL (paper, poster, repo); omit to hide the link
export const research = [
  {
    title: 'Causal Impact of Automated Speed Enforcement',
    org: 'UC Berkeley School of Information × Oakland DOT',
    role: 'Student Team Data Scientist · Prof. Alex Hughes',
    date: 'Aug 2026 – Present',
    category: 'causal',
    featured: true,
    description:
      'Building Difference-in-Differences models on 3 years of high-frequency speed and violation data to isolate the effect of speed cameras on speed distributions, severe speeding, and repeat-offense behavior. All work runs in a secure GCP environment under CPRA/CCPA compliance.',
    tags: ['Causal Inference', 'Diff-in-Diff', 'Panel Data', 'GCP', 'Python'],
  },
  {
    title: 'AI/ML for U.S. Landfill Methane Emissions',
    org: 'UC Berkeley College of Engineering',
    role: 'Research Assistant · Prof. Alice Agogino',
    date: 'Jul 2026 – Present',
    category: 'ml',
    description:
      'Using machine learning and sensor data to characterize landfill methane emission patterns, regional disparities, and health impacts, to support evidence-based mitigation policy.',
    tags: ['Machine Learning', 'Sensor Data', 'AI for Social Good', 'Policy'],
  },
  {
    title: 'Cough Acoustics for Disease Prognosis',
    org: 'Shanghai Key Lab of Multidimensional Information Processing',
    role: 'Research Assistant · Prof. Jiangang Chen (ECNU)',
    date: 'Oct 2021 – Dec 2022',
    category: 'ml',
    description:
      'Collected cough recordings from 78 hospital patients and grew the dataset to 535 samples with voice activity detection, denoising, and augmentation. An ensemble XGBoost + Random Forest model reached 93.3% accuracy and predicted recovery time within 3 days.',
    tags: ['Audio ML', 'XGBoost', 'Random Forest', 'librosa', 'SciPy'],
  },
  {
    title: 'Metabolomics of Sarcopenia & Aging',
    org: 'Global Health Institute, Duke Kunshan University',
    role: 'Health Research Data Analyst Intern · Prof. Chenkai Wu',
    date: 'Mar 2022 – Aug 2022',
    category: 'health',
    description:
      'Analyzed 249 metabolites from the UK Biobank (300k+ participants) using PCA and multinomial logistic regression to study links between metabolites, sarcopenia, and aging, then built Cox proportional hazards models for mortality risk prediction.',
    tags: ['UK Biobank', 'PCA', 'Logistic Regression', 'Survival Analysis', 'R'],
  },
  {
    title: 'Belt and Road Health Cooperation Analysis',
    org: 'Vanke School of Public Health, Tsinghua University',
    role: 'Research Assistant · Prof. Kun Tang',
    date: 'Nov 2022 – Mar 2023',
    category: 'health',
    description:
      'Cleaned and mined medical cooperation memorandums with Belt and Road countries since 2016, then linked them to IHME disease burden (DALYs) data in a multi-country evaluation model.',
    tags: ['Text Mining', 'Keyword Extraction', 'Global Health', 'IHME DALYs'],
  },
  {
    title: 'AI Chatbot for Cross-Cultural Academic Search',
    org: 'School of Information Sciences, UIUC',
    role: 'Research Assistant · Prof. Yun Huang',
    date: 'Jan 2024 – May 2024',
    category: 'hci',
    description:
      'Reviewed cross-cultural HCI research on academic information seeking and helped specify an AI chatbot with multilingual support, context-aware queries, and digital library API integration.',
    tags: ['HCI', 'Conversational AI', 'Requirements Design', 'UX Research'],
  },
];

export const researchFilters = [
  { id: 'all', label: 'All' },
  { id: 'causal', label: 'Causal Inference' },
  { id: 'ml', label: 'Machine Learning' },
  { id: 'health', label: 'Health Data Science' },
  { id: 'hci', label: 'HCI & AI Products' },
];

export const skills = [
  {
    icon: '🐍',
    group: 'Programming & Data',
    items: ['Python', 'Pandas', 'NumPy', 'scikit-learn', 'Statsmodels', 'SQL', 'R'],
  },
  {
    icon: '📈',
    group: 'Statistics & Machine Learning',
    items: [
      'Difference-in-Differences',
      'Regression Modeling',
      'PCA',
      'Survival Analysis',
      'XGBoost',
      'Random Forest',
      'Feature Engineering',
    ],
  },
  {
    icon: '🤖',
    group: 'AI & LLMs',
    items: [
      'LLM Evaluation Metrics',
      'Prompt Engineering',
      'Few-shot & Chain-of-Thought',
      'Data Annotation Management',
      'Claude Code',
      'Cursor',
      'GitHub Copilot',
    ],
  },
  {
    icon: '📊',
    group: 'Visualization & Tools',
    items: ['Tableau', 'Power BI', 'Excel', 'Dashboards', 'Google Cloud Platform'],
  },
  {
    icon: '🧭',
    group: 'Product & Growth',
    items: [
      'PRDs & Requirements',
      'Event Tracking',
      'User Personas',
      'A/B Testing',
      'Competitive Analysis',
      'Localization',
    ],
  },
  {
    icon: '🎨',
    group: 'Design & Languages',
    items: [
      'Photoshop',
      'Illustrator',
      'Premiere Pro',
      'Mandarin (Native)',
      'English (Fluent)',
      'Japanese (Basic)',
      'Spanish (Basic)',
    ],
  },
];

export const honors = [
  { year: '2025', title: 'NSF Fellowship in Digital Transformation of Development (DToD)' },
  { year: '2024', title: 'Phi Kappa Phi Honor Society' },
  { year: '2024', title: 'WeCu Scholar, UIUC (200+ hours of volunteer service)' },
  { year: '2023', title: 'MIT Policy Hackathon, Top 3 Finalist (Equitable Access to Healthcare)' },
  { year: '2023', title: 'James Scholar Honor & Dean’s List, UIUC School of Information Sciences' },
  { year: '2023', title: 'Kaggle Competition Expert' },
  { year: '2023', title: 'Google Advanced Data Analytics Certificate' },
  { year: '2022', title: 'Meritorious Winner, Interdisciplinary Contest in Modeling (ICM)' },
  { year: '2022', title: 'HarvardX Data Analysis for Life Sciences Professional Certificate' },
  { year: '2021', title: 'National Second Prize, China Undergraduate Mathematical Contest in Modeling' },
];

export const extensionStudy = [
  'MIT MicroMasters in Statistics and Data Science (2024–2025)',
  'Oxford Machine Learning Summer School: ML × Health (2023)',
  'SJTU–THU–PKU Computer Science International Summer School (2023)',
  'Tsinghua VSPH-GSS: Advancing Global Health in a Changing World (2022)',
];
