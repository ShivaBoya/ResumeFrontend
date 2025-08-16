// ResumeBuilder.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/contants";

// Utility to download file
const downloadFile = (content, filename, type) => {
  const blob = new Blob([content], { type });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
};

const ResumeBuilder = () => {
  const navigate = useNavigate();
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      address: "",
      linkedin: "",
      github: "",
    },
    workExperience: [
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    education: [
      { institution: "", degree: "", startDate: "", endDate: "", grade: "" },
    ],
    skills: [""],
    certifications: [{ name: "", issuer: "", year: "" }],
    projects: [
      {
        title: "",
        description: "",
        techStack: [""],
        githublink: "",
        collaborators: [],
      },
    ],
    coverLetter: { title: "", content: "" },
    theme: { font: "Arial", color: "#000000", layout: "classic" },
    versions: [],
  });
  const [isExisting, setIsExisting] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const token = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  // Fetch existing resume
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await axios.get(BASE_URL+"/resume/getresume", {
          headers: {
            Authorization: `Bearer ${token}`,
            RefreshToken: `Refresh ${refreshToken}`,
          },
        });
        if (res.data?.resume) {
          setResumeData(res.data.resume);
          setIsExisting(true);
        }
      } catch {
        console.log("No existing resume, creating new.");
      }
    };
    fetchResume();
  }, [token, refreshToken]);

  // Handle field change
  const handleChange = (section, field, value, index = null) => {
    if (Array.isArray(resumeData[section])) {
      const updatedArray = [...resumeData[section]];
      updatedArray[index][field] = value;
      setResumeData({ ...resumeData, [section]: updatedArray });
    } else {
      setResumeData({
        ...resumeData,
        [section]: { ...resumeData[section], [field]: value },
      });
    }
  };

  const handleAdd = (section, newItem) => {
    setResumeData({
      ...resumeData,
      [section]: [...resumeData[section], newItem],
    });
  };

  const handleRemove = (section, index) => {
    const updatedArray = [...resumeData[section]];
    updatedArray.splice(index, 1);
    setResumeData({ ...resumeData, [section]: updatedArray });
  };

  // Save / update resume
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isExisting
        ? BASE_URL+"/resume/update"
        : BASE_URL+"/resume/create";

      const res = await axios({
        method: isExisting ? "put" : "post",
        url,
        data: resumeData,
        headers: {
          Authorization: `Bearer ${token}`,
          RefreshToken: `Refresh ${refreshToken}`,
        },
      });

      const newAccessToken = res.headers["new-access-token"];
      if (newAccessToken) localStorage.setItem("accessToken", newAccessToken);

      alert(res.data.message || "Resume saved successfully!");
      navigate("/my-resumes");
    } catch (err) {
      console.error(err.response?.data || err);
      alert(err.response?.data?.message || "Failed to save resume");
    }
  };

  // One-Click Generate Resume (example: formats in plain HTML string)
  const generateResumeContent = () => {
    return `
      <h1>${resumeData.personalInfo.name}</h1>
      <p>Email: ${resumeData.personalInfo.email}</p>
      <p>Phone: ${resumeData.personalInfo.phone}</p>
      <h2>Skills</h2>
      <ul>${resumeData.skills.map((s) => `<li>${s}</li>`).join("")}</ul>
    `;
  };

  // Download resume
  const handleDownload = (format) => {
    const content = generateResumeContent();
    if (format === "pdf") {
      alert("PDF generation will require jsPDF or similar library");
    } else if (format === "doc") {
      downloadFile(content, "resume.doc", "application/msword");
    } else {
      downloadFile(content, "resume.txt", "text/plain");
    }
  };

  // Example: AI suggestion placeholder
  const handleAISuggestions = () => {
    alert("AI analysis running... Suggestions will appear here.");
  };

  // Example: Skill Assessment Quiz
  const handleSkillAssessment = () => {
    alert("Skill assessment quiz placeholder.");
  };

  // Example: LinkedIn Import
  const handleLinkedInImport = () => {
    alert("LinkedIn import placeholder.");
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Create Your Resume
      </h2>

      <div className="mb-6 flex flex-wrap gap-4 justify-center">
        <button
          onClick={() => navigate("/my-resumes")}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          My Resumes
        </button>
        <button
          onClick={() => setPreviewMode(!previewMode)}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Toggle Preview
        </button>
        <button
          onClick={() => handleDownload("txt")}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Download TXT
        </button>
        <button
          onClick={() => handleDownload("doc")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Download DOC
        </button>
        <button
          onClick={handleAISuggestions}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          AI Suggestions
        </button>
        <button
          onClick={handleSkillAssessment}
          className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
        >
          Skill Assessment
        </button>
        <button
          onClick={handleLinkedInImport}
          className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
        >
          Import LinkedIn
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Info */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Personal Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(resumeData.personalInfo).map((key) => (
              <input
                key={key}
                type="text"
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                value={resumeData.personalInfo[key]}
                onChange={(e) =>
                  handleChange("personalInfo", key, e.target.value)
                }
                className="border rounded p-2 w-full"
              />
            ))}
          </div>
        </section>

        {/* Work Experience */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Work Experience</h3>
          {resumeData.workExperience.map((exp, idx) => (
            <div key={idx} className="border p-4 rounded mb-4 space-y-2">
              {Object.keys(exp).map((field) => (
                <input
                  key={field}
                  type="text"
                  placeholder={field}
                  value={exp[field]}
                  onChange={(e) =>
                    handleChange("workExperience", field, e.target.value, idx)
                  }
                  className="border rounded p-2 w-full"
                />
              ))}
              <button
                type="button"
                onClick={() => handleRemove("workExperience", idx)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              handleAdd("workExperience", {
                company: "",
                position: "",
                startDate: "",
                endDate: "",
                description: "",
              })
            }
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Experience
          </button>
        </section>

        {/* Education */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Education</h3>
          {resumeData.education.map((edu, idx) => (
            <div key={idx} className="border p-4 rounded mb-4 space-y-2">
              {Object.keys(edu).map((field) => (
                <input
                  key={field}
                  type="text"
                  placeholder={field}
                  value={edu[field]}
                  onChange={(e) =>
                    handleChange("education", field, e.target.value, idx)
                  }
                  className="border rounded p-2 w-full"
                />
              ))}
              <button
                type="button"
                onClick={() => handleRemove("education", idx)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              handleAdd("education", {
                institution: "",
                degree: "",
                startDate: "",
                endDate: "",
                grade: "",
              })
            }
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Education
          </button>
        </section>

        {/* Skills */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Skills</h3>
          {resumeData.skills.map((skill, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Skill"
                value={skill}
                onChange={(e) => {
                  const updated = [...resumeData.skills];
                  updated[idx] = e.target.value;
                  setResumeData({ ...resumeData, skills: updated });
                }}
                className="border rounded p-2 w-full"
              />
              <button
                type="button"
                onClick={() => handleRemove("skills", idx)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAdd("skills", "")}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Skill
          </button>
        </section>

        {/* Certifications */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Certifications</h3>
          {resumeData.certifications.map((cert, idx) => (
            <div key={idx} className="border p-4 rounded mb-4 space-y-2">
              {Object.keys(cert).map((field) => (
                <input
                  key={field}
                  type="text"
                  placeholder={field}
                  value={cert[field]}
                  onChange={(e) =>
                    handleChange("certifications", field, e.target.value, idx)
                  }
                  className="border rounded p-2 w-full"
                />
              ))}
              <button
                type="button"
                onClick={() => handleRemove("certifications", idx)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              handleAdd("certifications", { name: "", issuer: "", year: "" })
            }
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Certification
          </button>
        </section>

        {/* Projects */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Projects</h3>
          {resumeData.projects.map((proj, idx) => (
            <div key={idx} className="border p-4 rounded mb-4 space-y-2">
              {Object.keys(proj).map((field) => {
                if (field === "techStack") {
                  return (
                    <input
                      key={field}
                      type="text"
                      placeholder="TechStack (comma separated)"
                      value={proj.techStack.join(", ")}
                      onChange={(e) =>
                        handleChange(
                          "projects",
                          field,
                          e.target.value.split(",").map((s) => s.trim()),
                          idx
                        )
                      }
                      className="border rounded p-2 w-full"
                    />
                  );
                }
                return (
                  <input
                    key={field}
                    type="text"
                    placeholder={field}
                    value={proj[field]}
                    onChange={(e) =>
                      handleChange("projects", field, e.target.value, idx)
                    }
                    className="border rounded p-2 w-full"
                  />
                );
              })}
              <button
                type="button"
                onClick={() => handleRemove("projects", idx)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              handleAdd("projects", {
                title: "",
                description: "",
                techStack: [""],
                githublink: "",
              })
            }
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Project
          </button>
        </section>

        {/* Cover Letter */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Cover Letter</h3>
          <input
            type="text"
            placeholder="Title"
            value={resumeData.coverLetter.title}
            onChange={(e) =>
              handleChange("coverLetter", "title", e.target.value)
            }
            className="border rounded p-2 w-full mb-2"
          />
          <textarea
            placeholder="Content"
            value={resumeData.coverLetter.content}
            onChange={(e) =>
              handleChange("coverLetter", "content", e.target.value)
            }
            className="border rounded p-2 w-full"
          ></textarea>
        </section>

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded w-full hover:bg-green-700 transition"
        >
          {isExisting ? "Update Resume" : "Save Resume"}
        </button>
      </form>
      {/* Live Preview */}
      {previewMode && (
        <div className="mt-10 p-6 border rounded bg-gray-50">
          <h3 className="text-2xl font-bold mb-4">Live Preview</h3>
          <div dangerouslySetInnerHTML={{ __html: generateResumeContent() }} />
        </div>
      )}
    </div>
  );
};

export default ResumeBuilder;






// import React, { useState, useEffect, useRef } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
// import { Button } from '../ui/button';
// import  Input  from '../ui/input';
// import { Textarea } from '../ui/textarea';
// import { Badge } from '../ui/badge';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
// import { Progress } from '../ui/progress';
// import { useToast } from '../hook/use-toast';
// import { 
//   User, 
//   Briefcase, 
//   GraduationCap, 
//   Award, 
//   Code, 
//   FileText,
//   Download,
//   Eye,
//   Plus,
//   Trash2,
//   Sparkles,
//   Save,
//   Users,
//   Share2,
//   Palette,
//   Type,
//   Layout,
//   Lightbulb,
//   Star,
//   Trophy,
//   X,
//   CheckCircle,
//   Circle,
//   Calendar,
//   MapPin,
//   Building,
//   Github,
//   Linkedin,
//   Globe,
//   Mail,
//   Phone,
//   Copy,
//   Send,
//   UserPlus,
//   Bell,
//   History,
//   Zap,
//   Wand2,
//   FileDown,
//   Link2,
//   Settings,
//   Target,
//   TrendingUp,
//   BookOpen,
//   Layers,
//   PenTool
// } from 'lucide-react';

// const ResumeBuilder = () => {
//   const { toast } = useToast();
//   const previewRef = useRef(null);
  
//   const [resumeData, setResumeData] = useState({
//     personalInfo: {
//       name: '',
//       email: '',
//       phone: '',
//       address: '',
//       linkedin: '',
//       github: '',
//       portfolio: '',
//       summary: ''
//     },
//     workExperience: [
//       {
//         company: '',
//         position: '',
//         location: '',
//         startDate: '',
//         endDate: '',
//         current: false,
//         description: '',
//         achievements: [],
//         collaborators: []
//       }
//     ],
//     education: [
//       {
//         institution: '',
//         degree: '',
//         field: '',
//         location: '',
//         startDate: '',
//         endDate: '',
//         gpa: '',
//         honors: '',
//         coursework: []
//       }
//     ],
//     skills: {
//       technical: [],
//       soft: [],
//       languages: [],
//       tools: []
//     },
//     certifications: [
//       {
//         name: '',
//         issuer: '',
//         date: '',
//         expiryDate: '',
//         credentialId: '',
//         verificationLink: ''
//       }
//     ],
//     projects: [
//       {
//         title: '',
//         description: '',
//         techStack: [],
//         githubLink: '',
//         liveLink: '',
//         collaborators: [],
//         startDate: '',
//         endDate: '',
//         highlights: []
//       }
//     ],
//     coverLetter: {
//       title: '',
//       content: '',
//       targetCompany: '',
//       targetPosition: ''
//     },
//     customSections: [],
//     theme: {
//       template: 'modern',
//       colorScheme: 'blue',
//       fontFamily: 'inter',
//       layout: 'single-column'
//     }
//   });

//   const [activeTab, setActiveTab] = useState('personal');
//   const [showPreview, setShowPreview] = useState(true);
//   const [showSkillAssessment, setShowSkillAssessment] = useState(false);
//   const [showThemeCustomizer, setShowThemeCustomizer] = useState(false);
//   const [showAISuggestions, setShowAISuggestions] = useState(false);
//   const [showShareModal, setShowShareModal] = useState(false);
//   const [showVersionHistory, setShowVersionHistory] = useState(false);
//   const [savedVersions, setSavedVersions] = useState([]);
//   const [shareableLink, setShareableLink] = useState('');
//   const [collaborators, setCollaborators] = useState([]);
//   const [suggestions, setSuggestions] = useState([]);
//   const [currentSkillQuestion, setCurrentSkillQuestion] = useState(0);
//   const [skillAnswers, setSkillAnswers] = useState({});
//   const [isImportingLinkedIn, setIsImportingLinkedIn] = useState(false);

//   // Tips and examples for each section
//   const tips = {
//     personal: {
//       name: "Use your full professional name as it appears on official documents",
//       email: "Use a professional email address (avoid nicknames or numbers)",
//       phone: "Include country code if applying internationally",
//       summary: "Write 2-3 sentences highlighting your key strengths and career goals"
//     },
//     experience: {
//       description: "Use action verbs and quantify your achievements (e.g., 'Increased sales by 25%')",
//       achievements: "Focus on results and impact rather than just responsibilities"
//     },
//     education: {
//       gpa: "Only include if 3.5 or higher",
//       coursework: "List relevant courses that showcase specific skills"
//     },
//     skills: {
//       technical: "Include programming languages, frameworks, and tools",
//       soft: "Add interpersonal skills like leadership, communication, teamwork"
//     },
//     projects: {
//       description: "Explain the problem you solved and your approach",
//       highlights: "Mention key features, technologies used, and impact"
//     }
//   };

//   // Skill assessment questions
//   const skillQuestions = [
//     {
//       id: 1,
//       category: 'Programming Languages',
//       question: 'Which programming languages are you proficient in?',
//       options: [
//         'JavaScript', 'Python', 'Java', 'C++', 'C#', 'Go', 
//         'Rust', 'PHP', 'Ruby', 'Swift', 'Kotlin', 'TypeScript'
//       ]
//     },
//     {
//       id: 2,
//       category: 'Web Development',
//       question: 'What web development technologies do you know?',
//       options: [
//         'React', 'Vue.js', 'Angular', 'Node.js', 'Express.js', 
//         'Django', 'Flask', 'Laravel', 'Next.js', 'Nuxt.js'
//       ]
//     },
//     {
//       id: 3,
//       category: 'Database & Storage',
//       question: 'Which databases have you worked with?',
//       options: [
//         'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQLite', 
//         'DynamoDB', 'Firebase', 'Elasticsearch', 'Cassandra'
//       ]
//     },
//     {
//       id: 4,
//       category: 'Cloud & DevOps',
//       question: 'What cloud and DevOps tools do you use?',
//       options: [
//         'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 
//         'Jenkins', 'GitHub Actions', 'Terraform', 'Ansible'
//       ]
//     },
//     {
//       id: 5,
//       category: 'Design & Tools',
//       question: 'Which design and development tools are you familiar with?',
//       options: [
//         'Figma', 'Adobe XD', 'Sketch', 'Photoshop', 'Git', 
//         'VS Code', 'IntelliJ', 'Postman', 'Jira', 'Slack'
//       ]
//     }
//   ];

//   // Color schemes
//   const colorSchemes = {
//     blue: { primary: '#3B82F6', secondary: '#1E40AF', accent: '#60A5FA' },
//     purple: { primary: '#8B5CF6', secondary: '#7C3AED', accent: '#A78BFA' },
//     green: { primary: '#10B981', secondary: '#059669', accent: '#34D399' },
//     orange: { primary: '#F59E0B', secondary: '#D97706', accent: '#FBBF24' },
//     red: { primary: '#EF4444', secondary: '#DC2626', accent: '#F87171' }
//   };

//   // Template layouts
//   const templates = {
//     modern: 'Modern - Clean and minimalist design',
//     creative: 'Creative - Bold and eye-catching',
//     professional: 'Professional - Traditional and formal',
//     compact: 'Compact - Maximum information in minimal space'
//   };

//   // Font families
//   const fontFamilies = {
//     inter: 'Inter - Modern and readable',
//     roboto: 'Roboto - Clean and professional',
//     poppins: 'Poppins - Friendly and approachable',
//     playfair: 'Playfair Display - Elegant and sophisticated'
//   };

//   // Initialize data from localStorage
//   useEffect(() => {
//     const savedData = localStorage.getItem('resumeData');
//     const savedVersions = localStorage.getItem('resumeVersions');
    
//     if (savedData) {
//       setResumeData(JSON.parse(savedData));
//     }
//     if (savedVersions) {
//       setSavedVersions(JSON.parse(savedVersions));
//     }
    
//     // Generate shareable link
//     setShareableLink(`${window.location.origin}/resume/${Date.now()}`);
//   }, []);

//   // Auto-save functionality
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       localStorage.setItem('resumeData', JSON.stringify(resumeData));
//     }, 1000);
    
//     return () => clearTimeout(timer);
//   }, [resumeData]);

//   // Update field utility
//   const updateField = (section, field, value, index = null) => {
//     setResumeData(prev => {
//       const newData = { ...prev };
      
//       if (index !== null && Array.isArray(newData[section])) {
//         newData[section] = [...newData[section]];
//         newData[section][index] = {
//           ...newData[section][index],
//           [field]: value
//         };
//       } else {
//         newData[section] = {
//           ...newData[section],
//           [field]: value
//         };
//       }
      
//       return newData;
//     });
//   };

//   // Array manipulation utilities
//   const addArrayItem = (section, newItem) => {
//     setResumeData(prev => ({
//       ...prev,
//       [section]: [...prev[section], newItem]
//     }));
//   };

//   const removeArrayItem = (section, index) => {
//     setResumeData(prev => ({
//       ...prev,
//       [section]: prev[section].filter((_, i) => i !== index)
//     }));
//   };

//   // Skill management
//   const addSkill = (category, skill) => {
//     if (skill.trim()) {
//       setResumeData(prev => ({
//         ...prev,
//         skills: {
//           ...prev.skills,
//           [category]: [...prev.skills[category], skill.trim()]
//         }
//       }));
//     }
//   };

//   const removeSkill = (category, index) => {
//     setResumeData(prev => ({
//       ...prev,
//       skills: {
//         ...prev.skills,
//         [category]: prev.skills[category].filter((_, i) => i !== index)
//       }
//     }));
//   };

//   // Version control
//   const saveVersion = (name = '') => {
//     const version = {
//       id: Date.now(),
//       name: name || `Version ${savedVersions.length + 1}`,
//       timestamp: new Date().toISOString(),
//       data: { ...resumeData }
//     };
    
//     const newVersions = [version, ...savedVersions];
//     setSavedVersions(newVersions);
//     localStorage.setItem('resumeVersions', JSON.stringify(newVersions));
    
//     toast({
//       title: "Version Saved!",
//       description: `Resume version "${version.name}" has been saved.`,
//     });
//   };

//   const loadVersion = (version) => {
//     setResumeData(version.data);
//     toast({
//       title: "Version Loaded",
//       description: `Loaded version "${version.name}"`,
//     });
//   };

//   // AI Suggestions
//   const generateAISuggestions = () => {
//     const mockSuggestions = [
//       {
//         section: 'summary',
//         suggestion: 'Consider adding quantified achievements to your summary',
//         type: 'improvement'
//       },
//       {
//         section: 'experience',
//         suggestion: 'Use more action verbs like "implemented", "optimized", "led"',
//         type: 'enhancement'
//       },
//       {
//         section: 'skills',
//         suggestion: 'Add emerging technologies relevant to your field',
//         type: 'addition'
//       }
//     ];
    
//     setSuggestions(mockSuggestions);
//     setShowAISuggestions(true);
//   };

//   // LinkedIn Integration (Mock)
//   const importFromLinkedIn = async () => {
//     setIsImportingLinkedIn(true);
    
//     // Simulate API call
//     setTimeout(() => {
//       const linkedInData = {
//         personalInfo: {
//           name: 'John Doe',
//           email: 'john.doe@email.com',
//           linkedin: 'https://linkedin.com/in/johndoe',
//           summary: 'Experienced software developer with 5+ years in full-stack development'
//         },
//         workExperience: [
//           {
//             company: 'Tech Corp',
//             position: 'Senior Developer',
//             location: 'San Francisco, CA',
//             startDate: '2021-01',
//             endDate: '',
//             current: true,
//             description: 'Lead development of web applications using React and Node.js'
//           }
//         ]
//       };
      
//       setResumeData(prev => ({
//         ...prev,
//         ...linkedInData
//       }));
      
//       setIsImportingLinkedIn(false);
//       toast({
//         title: "LinkedIn Data Imported!",
//         description: "Your LinkedIn profile data has been imported successfully.",
//       });
//     }, 2000);
//   };

//   // Collaboration features
//   const addCollaborator = (email) => {
//     const newCollaborator = {
//       id: Date.now(),
//       email,
//       name: email.split('@')[0],
//       role: 'viewer',
//       addedAt: new Date().toISOString()
//     };
    
//     setCollaborators(prev => [...prev, newCollaborator]);
//     toast({
//       title: "Collaborator Added",
//       description: `${email} has been invited to collaborate.`,
//     });
//   };

//   const tagCollaborator = (section, index, collaboratorEmail) => {
//     const updatedData = { ...resumeData };
//     if (!updatedData[section][index].collaborators) {
//       updatedData[section][index].collaborators = [];
//     }
//     updatedData[section][index].collaborators.push(collaboratorEmail);
//     setResumeData(updatedData);
//   };

//   // Export functions
//   const exportToPDF = () => {
//     window.print();
//     toast({
//       title: "Exporting to PDF",
//       description: "Your resume is being prepared for download.",
//     });
//   };

//   const exportToWord = () => {
//     // Mock Word export
//     toast({
//       title: "Exporting to Word",
//       description: "Your resume will be downloaded as a Word document.",
//     });
//   };

//   const exportToPlainText = () => {
//     const textContent = generatePlainTextResume();
//     const blob = new Blob([textContent], { type: 'text/plain' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'resume.txt';
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   const generatePlainTextResume = () => {
//     let text = `${resumeData.personalInfo.name}\n`;
//     text += `Email: ${resumeData.personalInfo.email}\n`;
//     text += `Phone: ${resumeData.personalInfo.phone}\n\n`;
    
//     if (resumeData.personalInfo.summary) {
//       text += `SUMMARY\n${resumeData.personalInfo.summary}\n\n`;
//     }
    
//     // Add other sections...
//     return text;
//   };

//   // Share functionality
//   const shareResume = () => {
//     navigator.clipboard.writeText(shareableLink);
//     toast({
//       title: "Link Copied!",
//       description: "Shareable link has been copied to clipboard.",
//     });
//   };

//   // Skill Assessment
//   const handleSkillAnswer = (option) => {
//     const questionId = skillQuestions[currentSkillQuestion].id;
//     const currentAnswers = skillAnswers[questionId] || [];
    
//     if (currentAnswers.includes(option)) {
//       setSkillAnswers({
//         ...skillAnswers,
//         [questionId]: currentAnswers.filter(answer => answer !== option)
//       });
//     } else {
//       setSkillAnswers({
//         ...skillAnswers,
//         [questionId]: [...currentAnswers, option]
//       });
//     }
//   };

//   const nextSkillQuestion = () => {
//     if (currentSkillQuestion < skillQuestions.length - 1) {
//       setCurrentSkillQuestion(currentSkillQuestion + 1);
//     } else {
//       completeSkillAssessment();
//     }
//   };

//   const completeSkillAssessment = () => {
//     const allSkills = Object.values(skillAnswers).flat();
//     allSkills.forEach(skill => {
//       addSkill('technical', skill);
//     });
//     setShowSkillAssessment(false);
//     setCurrentSkillQuestion(0);
//     setSkillAnswers({});
//   };

//   // Custom sections
//   const addCustomSection = () => {
//     const sectionName = prompt('Enter section name:');
//     if (sectionName) {
//       setResumeData(prev => ({
//         ...prev,
//         customSections: [
//           ...prev.customSections,
//           {
//             id: Date.now(),
//             name: sectionName,
//             content: '',
//             items: []
//           }
//         ]
//       }));
//     }
//   };

//   // Format date utility
//   const formatDate = (date) => {
//     if (!date) return '';
//     return new Date(date).toLocaleDateString('en-US', { 
//       month: 'short', 
//       year: 'numeric' 
//     });
//   };

//   // Resume Preview Component
//   const ResumePreview = () => (
//     <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto" ref={previewRef}>
//       {/* Header */}
//       <div className={`text-center mb-8 pb-6 border-b-2`} style={{ borderColor: colorSchemes[resumeData.theme.colorScheme].primary }}>
//         <h1 className="text-4xl font-bold mb-2" style={{ color: colorSchemes[resumeData.theme.colorScheme].primary }}>
//           {resumeData.personalInfo.name || 'Your Name'}
//         </h1>
        
//         <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
//           {resumeData.personalInfo.email && (
//             <div className="flex items-center gap-1">
//               <Mail className="w-4 h-4" />
//               <span>{resumeData.personalInfo.email}</span>
//             </div>
//           )}
//           {resumeData.personalInfo.phone && (
//             <div className="flex items-center gap-1">
//               <Phone className="w-4 h-4" />
//               <span>{resumeData.personalInfo.phone}</span>
//             </div>
//           )}
//           {resumeData.personalInfo.address && (
//             <div className="flex items-center gap-1">
//               <MapPin className="w-4 h-4" />
//               <span>{resumeData.personalInfo.address}</span>
//             </div>
//           )}
//         </div>
        
//         <div className="flex justify-center gap-4 mt-3">
//           {resumeData.personalInfo.linkedin && (
//             <a href={resumeData.personalInfo.linkedin} className="flex items-center gap-1 text-blue-600 hover:underline">
//               <Linkedin className="w-4 h-4" />
//               <span>LinkedIn</span>
//             </a>
//           )}
//           {resumeData.personalInfo.github && (
//             <a href={resumeData.personalInfo.github} className="flex items-center gap-1 text-gray-700 hover:underline">
//               <Github className="w-4 h-4" />
//               <span>GitHub</span>
//             </a>
//           )}
//           {resumeData.personalInfo.portfolio && (
//             <a href={resumeData.personalInfo.portfolio} className="flex items-center gap-1 text-purple-600 hover:underline">
//               <Globe className="w-4 h-4" />
//               <span>Portfolio</span>
//             </a>
//           )}
//         </div>
//       </div>

//       {/* Summary */}
//       {resumeData.personalInfo.summary && (
//         <section className="mb-8">
//           <h2 className="text-xl font-bold mb-3" style={{ color: colorSchemes[resumeData.theme.colorScheme].primary }}>
//             Professional Summary
//           </h2>
//           <p className="text-gray-700 leading-relaxed">{resumeData.personalInfo.summary}</p>
//         </section>
//       )}

//       {/* Work Experience */}
//       {resumeData.workExperience.some(exp => exp.company) && (
//         <section className="mb-8">
//           <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: colorSchemes[resumeData.theme.colorScheme].primary }}>
//             <Briefcase className="w-5 h-5" />
//             Work Experience
//           </h2>
          
//           {resumeData.workExperience.filter(exp => exp.company).map((exp, index) => (
//             <div key={index} className="mb-6 last:mb-0">
//               <div className="flex justify-between items-start mb-2">
//                 <div>
//                   <h3 className="text-lg font-semibold">{exp.position}</h3>
//                   <p className="text-gray-600 font-medium">{exp.company}</p>
//                   {exp.location && (
//                     <p className="text-sm text-gray-500 flex items-center gap-1">
//                       <MapPin className="w-3 h-3" />
//                       {exp.location}
//                     </p>
//                   )}
//                 </div>
//                 <div className="text-right text-sm text-gray-500">
//                   <div className="flex items-center gap-1">
//                     <Calendar className="w-3 h-3" />
//                     {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
//                   </div>
//                 </div>
//               </div>
              
//               {exp.description && (
//                 <p className="text-gray-700 mb-2">{exp.description}</p>
//               )}
              
//               {exp.achievements && exp.achievements.length > 0 && (
//                 <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
//                   {exp.achievements.map((achievement, i) => (
//                     <li key={i}>{achievement}</li>
//                   ))}
//                 </ul>
//               )}
              
//               {exp.collaborators && exp.collaborators.length > 0 && (
//                 <div className="mt-2">
//                   <p className="text-xs text-gray-500">Collaborated with: {exp.collaborators.join(', ')}</p>
//                 </div>
//               )}
//             </div>
//           ))}
//         </section>
//       )}

//       {/* Education */}
//       {resumeData.education.some(edu => edu.institution) && (
//         <section className="mb-8">
//           <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: colorSchemes[resumeData.theme.colorScheme].primary }}>
//             <GraduationCap className="w-5 h-5" />
//             Education
//           </h2>
          
//           {resumeData.education.filter(edu => edu.institution).map((edu, index) => (
//             <div key={index} className="mb-4 last:mb-0">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h3 className="text-lg font-semibold">
//                     {edu.degree} {edu.field && `in ${edu.field}`}
//                   </h3>
//                   <p className="text-gray-600 font-medium">{edu.institution}</p>
//                   {edu.location && (
//                     <p className="text-sm text-gray-500 flex items-center gap-1">
//                       <MapPin className="w-3 h-3" />
//                       {edu.location}
//                     </p>
//                   )}
//                   {edu.gpa && (
//                     <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
//                   )}
//                   {edu.honors && (
//                     <p className="text-sm font-medium" style={{ color: colorSchemes[resumeData.theme.colorScheme].accent }}>
//                       {edu.honors}
//                     </p>
//                   )}
//                 </div>
//                 <div className="text-right text-sm text-gray-500">
//                   <div className="flex items-center gap-1">
//                     <Calendar className="w-3 h-3" />
//                     {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </section>
//       )}

//       {/* Skills */}
//       {Object.values(resumeData.skills).some(skillArr => skillArr.length > 0) && (
//         <section className="mb-8">
//           <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: colorSchemes[resumeData.theme.colorScheme].primary }}>
//             <Code className="w-5 h-5" />
//             Skills
//           </h2>
          
//           {Object.entries(resumeData.skills).map(([category, skills]) => {
//             if (skills.length === 0) return null;
            
//             return (
//               <div key={category} className="mb-3">
//                 <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
//                   {category} Skills
//                 </h3>
//                 <div className="flex flex-wrap gap-2">
//                   {skills.map((skill, index) => (
//                     <span
//                       key={index}
//                       className="px-3 py-1 text-sm rounded-full"
//                       style={{
//                         backgroundColor: colorSchemes[resumeData.theme.colorScheme].primary + '20',
//                         color: colorSchemes[resumeData.theme.colorScheme].primary
//                       }}
//                     >
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             );
//           })}
//         </section>
//       )}

//       {/* Projects */}
//       {resumeData.projects.some(project => project.title) && (
//         <section className="mb-8">
//           <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: colorSchemes[resumeData.theme.colorScheme].primary }}>
//             <FileText className="w-5 h-5" />
//             Projects
//           </h2>
          
//           {resumeData.projects.filter(project => project.title).map((project, index) => (
//             <div key={index} className="mb-6 last:mb-0">
//               <div className="flex justify-between items-start mb-2">
//                 <h3 className="text-lg font-semibold">{project.title}</h3>
//                 <div className="flex gap-2">
//                   {project.githubLink && (
//                     <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">
//                       <Github className="w-4 h-4" />
//                     </a>
//                   )}
//                   {project.liveLink && (
//                     <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">
//                       <Globe className="w-4 h-4" />
//                     </a>
//                   )}
//                 </div>
//               </div>
              
//               {project.description && (
//                 <p className="text-gray-700 mb-2">{project.description}</p>
//               )}
              
//               {project.techStack && project.techStack.length > 0 && (
//                 <div className="flex flex-wrap gap-1 mb-2">
//                   {project.techStack.map((tech, techIndex) => (
//                     <span
//                       key={techIndex}
//                       className="px-2 py-1 text-xs rounded border"
//                       style={{ borderColor: colorSchemes[resumeData.theme.colorScheme].primary }}
//                     >
//                       {tech}
//                     </span>
//                   ))}
//                 </div>
//               )}
              
//               {project.highlights && project.highlights.length > 0 && (
//                 <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
//                   {project.highlights.map((highlight, i) => (
//                     <li key={i}>{highlight}</li>
//                   ))}
//                 </ul>
//               )}
              
//               {project.collaborators && project.collaborators.length > 0 && (
//                 <div className="mt-2">
//                   <p className="text-xs text-gray-500">Team: {project.collaborators.join(', ')}</p>
//                 </div>
//               )}
//             </div>
//           ))}
//         </section>
//       )}

//       {/* Certifications */}
//       {resumeData.certifications.some(cert => cert.name) && (
//         <section className="mb-8">
//           <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: colorSchemes[resumeData.theme.colorScheme].primary }}>
//             <Award className="w-5 h-5" />
//             Certifications
//           </h2>
          
//           {resumeData.certifications.filter(cert => cert.name).map((cert, index) => (
//             <div key={index} className="flex justify-between items-center mb-3">
//               <div>
//                 <h3 className="font-semibold">{cert.name}</h3>
//                 <p className="text-sm text-gray-600">{cert.issuer}</p>
//                 {cert.credentialId && (
//                   <p className="text-xs text-gray-500">ID: {cert.credentialId}</p>
//                 )}
//               </div>
//               <div className="text-right text-sm text-gray-500">
//                 {cert.date && formatDate(cert.date)}
//                 {cert.expiryDate && (
//                   <div className="text-xs">
//                     Expires: {formatDate(cert.expiryDate)}
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </section>
//       )}

//       {/* Custom Sections */}
//       {resumeData.customSections.map((section, index) => (
//         <section key={section.id} className="mb-8">
//           <h2 className="text-xl font-bold mb-4" style={{ color: colorSchemes[resumeData.theme.colorScheme].primary }}>
//             {section.name}
//           </h2>
//           <div className="text-gray-700">
//             {section.content}
//           </div>
//         </section>
//       ))}
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
//       {/* Header */}
//       <div className="bg-white/90 backdrop-blur-sm border-b sticky top-0 z-50 shadow-sm">
//         <div className="container mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
//                 <FileText className="w-6 h-6 text-white" />
//               </div>
//               <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 Resume Builder Pro
//               </h1>
//             </div>
            
//             <div className="flex items-center space-x-2">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => setShowSkillAssessment(true)}
//                 className="border-blue-200 text-blue-600 hover:bg-blue-50"
//               >
//                 <Sparkles className="w-4 h-4 mr-2" />
//                 Skill Quiz
//               </Button>
              
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={generateAISuggestions}
//                 className="border-purple-200 text-purple-600 hover:bg-purple-50"
//               >
//                 <Wand2 className="w-4 h-4 mr-2" />
//                 AI Suggestions
//               </Button>
              
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => setShowThemeCustomizer(true)}
//                 className="border-green-200 text-green-600 hover:bg-green-50"
//               >
//                 <Palette className="w-4 h-4 mr-2" />
//                 Themes
//               </Button>
              
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => setShowPreview(!showPreview)}
//                 className="border-gray-200"
//               >
//                 <Eye className="w-4 h-4 mr-2" />
//                 {showPreview ? 'Hide' : 'Show'} Preview
//               </Button>
              
//               <div className="relative group">
//                 <Button
//                   size="sm"
//                   className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
//                 >
//                   <Download className="w-4 h-4 mr-2" />
//                   Export
//                 </Button>
//                 <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
//                   <div className="p-2">
//                     <button
//                       onClick={exportToPDF}
//                       className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded flex items-center gap-2"
//                     >
//                       <FileDown className="w-4 h-4" />
//                       Export as PDF
//                     </button>
//                     <button
//                       onClick={exportToWord}
//                       className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded flex items-center gap-2"
//                     >
//                       <FileText className="w-4 h-4" />
//                       Export as Word
//                     </button>
//                     <button
//                       onClick={exportToPlainText}
//                       className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded flex items-center gap-2"
//                     >
//                       <FileText className="w-4 h-4" />
//                       Export as Text
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto px-6 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Form Section */}
//           <div className="space-y-6">
//             {/* Quick Actions */}
//             <div className="flex flex-wrap gap-3">
//               <Button
//                 onClick={importFromLinkedIn}
//                 disabled={isImportingLinkedIn}
//                 size="sm"
//                 variant="outline"
//                 className="border-blue-200 text-blue-600 hover:bg-blue-50"
//               >
//                 <Linkedin className="w-4 h-4 mr-2" />
//                 {isImportingLinkedIn ? 'Importing...' : 'Import LinkedIn'}
//               </Button>
              
//               <Button
//                 onClick={() => setShowShareModal(true)}
//                 size="sm"
//                 variant="outline"
//                 className="border-green-200 text-green-600 hover:bg-green-50"
//               >
//                 <Share2 className="w-4 h-4 mr-2" />
//                 Share
//               </Button>
              
//               <Button
//                 onClick={() => setShowVersionHistory(true)}
//                 size="sm"
//                 variant="outline"
//                 className="border-orange-200 text-orange-600 hover:bg-orange-50"
//               >
//                 <History className="w-4 h-4 mr-2" />
//                 Versions
//               </Button>
              
//               <Button
//                 onClick={addCustomSection}
//                 size="sm"
//                 variant="outline"
//                 className="border-purple-200 text-purple-600 hover:bg-purple-50"
//               >
//                 <Plus className="w-4 h-4 mr-2" />
//                 Add Section
//               </Button>
//             </div>

//             <Card className="bg-white/70 backdrop-blur-sm shadow-lg border-0">
//               <CardHeader>
//                 <CardTitle className="flex items-center space-x-2">
//                   <Zap className="w-5 h-5 text-blue-500" />
//                   <span>Build Your Resume</span>
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//                   <TabsList className="grid grid-cols-4 lg:grid-cols-7 mb-6 bg-gray-100">
//                     <TabsTrigger value="personal" className="flex flex-col items-center space-y-1 data-[state=active]:bg-blue-500 data-[state=active]:text-white">
//                       <User className="w-4 h-4" />
//                       <span className="text-xs hidden sm:block">Personal</span>
//                     </TabsTrigger>
//                     <TabsTrigger value="experience" className="flex flex-col items-center space-y-1 data-[state=active]:bg-blue-500 data-[state=active]:text-white">
//                       <Briefcase className="w-4 h-4" />
//                       <span className="text-xs hidden sm:block">Experience</span>
//                     </TabsTrigger>
//                     <TabsTrigger value="education" className="flex flex-col items-center space-y-1 data-[state=active]:bg-blue-500 data-[state=active]:text-white">
//                       <GraduationCap className="w-4 h-4" />
//                       <span className="text-xs hidden sm:block">Education</span>
//                     </TabsTrigger>
//                     <TabsTrigger value="skills" className="flex flex-col items-center space-y-1 data-[state=active]:bg-blue-500 data-[state=active]:text-white">
//                       <Code className="w-4 h-4" />
//                       <span className="text-xs hidden sm:block">Skills</span>
//                     </TabsTrigger>
//                     <TabsTrigger value="certifications" className="flex flex-col items-center space-y-1 data-[state=active]:bg-blue-500 data-[state=active]:text-white">
//                       <Award className="w-4 h-4" />
//                       <span className="text-xs hidden sm:block">Certs</span>
//                     </TabsTrigger>
//                     <TabsTrigger value="projects" className="flex flex-col items-center space-y-1 data-[state=active]:bg-blue-500 data-[state=active]:text-white">
//                       <FileText className="w-4 h-4" />
//                       <span className="text-xs hidden sm:block">Projects</span>
//                     </TabsTrigger>
//                     <TabsTrigger value="cover-letter" className="flex flex-col items-center space-y-1 data-[state=active]:bg-blue-500 data-[state=active]:text-white">
//                       <PenTool className="w-4 h-4" />
//                       <span className="text-xs hidden sm:block">Cover</span>
//                     </TabsTrigger>
//                   </TabsList>

//                   {/* Personal Info Tab */}
//                   <TabsContent value="personal" className="space-y-6">
//                     <div className="flex items-center justify-between">
//                       <h3 className="text-lg font-semibold text-blue-600">Personal Information</h3>
//                       <div className="flex items-center gap-2">
//                         <Lightbulb className="w-4 h-4 text-yellow-500" />
//                         <span className="text-xs text-gray-500">Tips available</span>
//                       </div>
//                     </div>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       {Object.entries(resumeData.personalInfo).map(([key, value]) => (
//                         <div key={key} className="space-y-2">
//                           <label className="block text-sm font-medium text-gray-700 capitalize">
//                             {key.replace(/([A-Z])/g, ' $1')}
//                             {tips.personal[key] && (
//                               <div className="group relative inline-block ml-2">
//                                 <Lightbulb className="w-3 h-3 text-yellow-500 cursor-help" />
//                                 <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block w-64 p-2 bg-black text-white text-xs rounded shadow-lg z-10">
//                                   {tips.personal[key]}
//                                 </div>
//                               </div>
//                             )}
//                           </label>
//                           {key === 'summary' ? (
//                             <Textarea
//                               value={value}
//                               onChange={(e) => updateField('personalInfo', key, e.target.value)}
//                               placeholder={`Enter your ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
//                               className="w-full border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
//                               rows={3}
//                             />
//                           ) : (
//                             <Input
//                               value={value}
//                               onChange={(e) => updateField('personalInfo', key, e.target.value)}
//                               placeholder={`Enter your ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
//                               className="w-full border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
//                             />
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   </TabsContent>

//                   {/* Work Experience Tab */}
//                   <TabsContent value="experience" className="space-y-6">
//                     <div className="flex justify-between items-center">
//                       <h3 className="text-lg font-semibold text-blue-600">Work Experience</h3>
//                       <Button
//                         onClick={() => addArrayItem('workExperience', {
//                           company: '', position: '', location: '', startDate: '', endDate: '',
//                           current: false, description: '', achievements: [], collaborators: []
//                         })}
//                         size="sm"
//                         className="bg-blue-500 hover:bg-blue-600"
//                       >
//                         <Plus className="w-4 h-4 mr-2" />
//                         Add Experience
//                       </Button>
//                     </div>
                    
//                     {resumeData.workExperience.map((exp, index) => (
//                       <Card key={index} className="p-4 border-l-4 border-l-blue-400 bg-blue-50/50">
//                         <div className="flex justify-between items-start mb-4">
//                           <h4 className="font-medium text-gray-800">Experience #{index + 1}</h4>
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             onClick={() => removeArrayItem('workExperience', index)}
//                             className="text-red-500 border-red-200 hover:bg-red-50"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </Button>
//                         </div>
                        
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                           <Input
//                             value={exp.company}
//                             onChange={(e) => updateField('workExperience', 'company', e.target.value, index)}
//                             placeholder="Company Name"
//                             className="border-gray-200 focus:border-blue-400"
//                           />
//                           <Input
//                             value={exp.position}
//                             onChange={(e) => updateField('workExperience', 'position', e.target.value, index)}
//                             placeholder="Position"
//                             className="border-gray-200 focus:border-blue-400"
//                           />
//                           <Input
//                             value={exp.location}
//                             onChange={(e) => updateField('workExperience', 'location', e.target.value, index)}
//                             placeholder="Location"
//                             className="border-gray-200 focus:border-blue-400"
//                           />
//                           <div className="flex space-x-2">
//                             <Input
//                               type="date"
//                               value={exp.startDate}
//                               onChange={(e) => updateField('workExperience', 'startDate', e.target.value, index)}
//                               className="border-gray-200 focus:border-blue-400"
//                             />
//                             <Input
//                               type="date"
//                               value={exp.endDate}
//                               onChange={(e) => updateField('workExperience', 'endDate', e.target.value, index)}
//                               disabled={exp.current}
//                               className="border-gray-200 focus:border-blue-400"
//                             />
//                           </div>
//                         </div>
                        
//                         <div className="mb-4">
//                           <label className="flex items-center space-x-2">
//                             <input
//                               type="checkbox"
//                               checked={exp.current}
//                               onChange={(e) => updateField('workExperience', 'current', e.target.checked, index)}
//                               className="rounded border-blue-300 text-blue-500 focus:ring-blue-400"
//                             />
//                             <span className="text-sm text-gray-700">Currently working here</span>
//                           </label>
//                         </div>
                        
//                         <div className="space-y-4">
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                               Description
//                               <div className="group relative inline-block ml-2">
//                                 <Lightbulb className="w-3 h-3 text-yellow-500 cursor-help" />
//                                 <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block w-64 p-2 bg-black text-white text-xs rounded shadow-lg z-10">
//                                   {tips.experience.description}
//                                 </div>
//                               </div>
//                             </label>
//                             <Textarea
//                               value={exp.description}
//                               onChange={(e) => updateField('workExperience', 'description', e.target.value, index)}
//                               placeholder="Describe your role and responsibilities..."
//                               className="border-gray-200 focus:border-blue-400"
//                               rows={3}
//                             />
//                           </div>
                          
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                               Key Achievements
//                             </label>
//                             <div className="space-y-2">
//                               {exp.achievements.map((achievement, achIndex) => (
//                                 <div key={achIndex} className="flex gap-2">
//                                   <Input
//                                     value={achievement}
//                                     onChange={(e) => {
//                                       const newAchievements = [...exp.achievements];
//                                       newAchievements[achIndex] = e.target.value;
//                                       updateField('workExperience', 'achievements', newAchievements, index);
//                                     }}
//                                     placeholder="Achievement or accomplishment"
//                                     className="flex-1 border-gray-200 focus:border-blue-400"
//                                   />
//                                   <Button
//                                     variant="outline"
//                                     size="sm"
//                                     onClick={() => {
//                                       const newAchievements = exp.achievements.filter((_, i) => i !== achIndex);
//                                       updateField('workExperience', 'achievements', newAchievements, index);
//                                     }}
//                                     className="text-red-500 border-red-200"
//                                   >
//                                     <Trash2 className="w-4 h-4" />
//                                   </Button>
//                                 </div>
//                               ))}
//                               <Button
//                                 variant="outline"
//                                 size="sm"
//                                 onClick={() => {
//                                   const newAchievements = [...exp.achievements, ''];
//                                   updateField('workExperience', 'achievements', newAchievements, index);
//                                 }}
//                                 className="border-blue-200 text-blue-600"
//                               >
//                                 <Plus className="w-4 h-4 mr-2" />
//                                 Add Achievement
//                               </Button>
//                             </div>
//                           </div>
                          
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                               Collaborators (Email addresses)
//                             </label>
//                             <div className="flex gap-2">
//                               <Input
//                                 placeholder="colleague@company.com"
//                                 className="flex-1 border-gray-200 focus:border-blue-400"
//                                 onKeyPress={(e) => {
//                                   if (e.key === 'Enter' && e.target.value) {
//                                     const newCollaborators = [...(exp.collaborators || []), e.target.value];
//                                     updateField('workExperience', 'collaborators', newCollaborators, index);
//                                     e.target.value = '';
//                                   }
//                                 }}
//                               />
//                               <Button
//                                 variant="outline"
//                                 size="sm"
//                                 onClick={(e) => {
//                                   const input = e.target.parentElement.querySelector('input');
//                                   if (input.value) {
//                                     const newCollaborators = [...(exp.collaborators || []), input.value];
//                                     updateField('workExperience', 'collaborators', newCollaborators, index);
//                                     input.value = '';
//                                   }
//                                 }}
//                                 className="border-green-200 text-green-600"
//                               >
//                                 <UserPlus className="w-4 h-4" />
//                               </Button>
//                             </div>
//                             {exp.collaborators && exp.collaborators.length > 0 && (
//                               <div className="mt-2 flex flex-wrap gap-2">
//                                 {exp.collaborators.map((collaborator, colIndex) => (
//                                   <Badge key={colIndex} variant="secondary" className="flex items-center gap-1">
//                                     {collaborator}
//                                     <button
//                                       onClick={() => {
//                                         const newCollaborators = exp.collaborators.filter((_, i) => i !== colIndex);
//                                         updateField('workExperience', 'collaborators', newCollaborators, index);
//                                       }}
//                                       className="ml-1 hover:text-red-500"
//                                     >
//                                       ×
//                                     </button>
//                                   </Badge>
//                                 ))}
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       </Card>
//                     ))}
//                   </TabsContent>

//                   {/* Education Tab */}
//                   <TabsContent value="education" className="space-y-6">
//                     <div className="flex justify-between items-center">
//                       <h3 className="text-lg font-semibold text-blue-600">Education</h3>
//                       <Button
//                         onClick={() => addArrayItem('education', {
//                           institution: '', degree: '', field: '', location: '',
//                           startDate: '', endDate: '', gpa: '', honors: '', coursework: []
//                         })}
//                         size="sm"
//                         className="bg-blue-500 hover:bg-blue-600"
//                       >
//                         <Plus className="w-4 h-4 mr-2" />
//                         Add Education
//                       </Button>
//                     </div>
                    
//                     {resumeData.education.map((edu, index) => (
//                       <Card key={index} className="p-4 border-l-4 border-l-green-400 bg-green-50/50">
//                         <div className="flex justify-between items-start mb-4">
//                           <h4 className="font-medium text-gray-800">Education #{index + 1}</h4>
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             onClick={() => removeArrayItem('education', index)}
//                             className="text-red-500 border-red-200 hover:bg-red-50"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </Button>
//                         </div>
                        
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <Input
//                             value={edu.institution}
//                             onChange={(e) => updateField('education', 'institution', e.target.value, index)}
//                             placeholder="Institution Name"
//                             className="border-gray-200 focus:border-green-400"
//                           />
//                           <Input
//                             value={edu.degree}
//                             onChange={(e) => updateField('education', 'degree', e.target.value, index)}
//                             placeholder="Degree"
//                             className="border-gray-200 focus:border-green-400"
//                           />
//                           <Input
//                             value={edu.field}
//                             onChange={(e) => updateField('education', 'field', e.target.value, index)}
//                             placeholder="Field of Study"
//                             className="border-gray-200 focus:border-green-400"
//                           />
//                           <Input
//                             value={edu.location}
//                             onChange={(e) => updateField('education', 'location', e.target.value, index)}
//                             placeholder="Location"
//                             className="border-gray-200 focus:border-green-400"
//                           />
//                           <Input
//                             type="date"
//                             value={edu.startDate}
//                             onChange={(e) => updateField('education', 'startDate', e.target.value, index)}
//                             className="border-gray-200 focus:border-green-400"
//                           />
//                           <Input
//                             type="date"
//                             value={edu.endDate}
//                             onChange={(e) => updateField('education', 'endDate', e.target.value, index)}
//                             className="border-gray-200 focus:border-green-400"
//                           />
//                           <div className="relative">
//                             <Input
//                               value={edu.gpa}
//                               onChange={(e) => updateField('education', 'gpa', e.target.value, index)}
//                               placeholder="GPA (optional)"
//                               className="border-gray-200 focus:border-green-400"
//                             />
//                             <div className="group absolute top-0 right-2 h-full flex items-center">
//                               <Lightbulb className="w-3 h-3 text-yellow-500 cursor-help" />
//                               <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block w-48 p-2 bg-black text-white text-xs rounded shadow-lg z-10">
//                                 {tips.education.gpa}
//                               </div>
//                             </div>
//                           </div>
//                           <Input
//                             value={edu.honors}
//                             onChange={(e) => updateField('education', 'honors', e.target.value, index)}
//                             placeholder="Honors/Awards"
//                             className="border-gray-200 focus:border-green-400"
//                           />
//                         </div>
                        
//                         <div className="mt-4">
//                           <label className="block text-sm font-medium text-gray-700 mb-2">
//                             Relevant Coursework
//                             <div className="group relative inline-block ml-2">
//                               <Lightbulb className="w-3 h-3 text-yellow-500 cursor-help" />
//                               <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block w-64 p-2 bg-black text-white text-xs rounded shadow-lg z-10">
//                                 {tips.education.coursework}
//                               </div>
//                             </div>
//                           </label>
//                           <div className="space-y-2">
//                             {edu.coursework.map((course, courseIndex) => (
//                               <div key={courseIndex} className="flex gap-2">
//                                 <Input
//                                   value={course}
//                                   onChange={(e) => {
//                                     const newCoursework = [...edu.coursework];
//                                     newCoursework[courseIndex] = e.target.value;
//                                     updateField('education', 'coursework', newCoursework, index);
//                                   }}
//                                   placeholder="Course name"
//                                   className="flex-1 border-gray-200 focus:border-green-400"
//                                 />
//                                 <Button
//                                   variant="outline"
//                                   size="sm"
//                                   onClick={() => {
//                                     const newCoursework = edu.coursework.filter((_, i) => i !== courseIndex);
//                                     updateField('education', 'coursework', newCoursework, index);
//                                   }}
//                                   className="text-red-500 border-red-200"
//                                 >
//                                   <Trash2 className="w-4 h-4" />
//                                 </Button>
//                               </div>
//                             ))}
//                             <Button
//                               variant="outline"
//                               size="sm"
//                               onClick={() => {
//                                 const newCoursework = [...edu.coursework, ''];
//                                 updateField('education', 'coursework', newCoursework, index);
//                               }}
//                               className="border-green-200 text-green-600"
//                             >
//                               <Plus className="w-4 h-4 mr-2" />
//                               Add Course
//                             </Button>
//                           </div>
//                         </div>
//                       </Card>
//                     ))}
//                   </TabsContent>

//                   {/* Skills Tab */}
//                   <TabsContent value="skills" className="space-y-6">
//                     <div className="flex justify-between items-center">
//                       <h3 className="text-lg font-semibold text-blue-600">Skills</h3>
//                       <Button
//                         onClick={() => setShowSkillAssessment(true)}
//                         size="sm"
//                         className="bg-purple-500 hover:bg-purple-600"
//                       >
//                         <Target className="w-4 h-4 mr-2" />
//                         Take Skill Quiz
//                       </Button>
//                     </div>
                    
//                     {Object.entries(resumeData.skills).map(([category, skills]) => (
//                       <Card key={category} className="p-4 bg-purple-50/50 border-l-4 border-l-purple-400">
//                         <div className="flex items-center justify-between mb-3">
//                           <h4 className="font-medium capitalize text-gray-800">{category} Skills</h4>
//                           <div className="group relative">
//                             <Lightbulb className="w-4 h-4 text-yellow-500 cursor-help" />
//                             <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block w-64 p-2 bg-black text-white text-xs rounded shadow-lg z-10">
//                               {tips.skills[category] || `Add your ${category} skills here`}
//                             </div>
//                           </div>
//                         </div>
                        
//                         <div className="flex flex-wrap gap-2 mb-3">
//                           {skills.map((skill, index) => (
//                             <Badge
//                               key={index}
//                               variant="secondary"
//                               className="flex items-center space-x-1 bg-purple-100 text-purple-800"
//                             >
//                               <span>{skill}</span>
//                               <button
//                                 onClick={() => removeSkill(category, index)}
//                                 className="ml-1 hover:text-red-500"
//                               >
//                                 ×
//                               </button>
//                             </Badge>
//                           ))}
//                         </div>
                        
//                         <div className="flex space-x-2">
//                           <Input
//                             placeholder={`Add ${category} skill`}
//                             className="flex-1 border-gray-200 focus:border-purple-400"
//                             onKeyPress={(e) => {
//                               if (e.key === 'Enter' && e.target.value.trim()) {
//                                 addSkill(category, e.target.value);
//                                 e.target.value = '';
//                               }
//                             }}
//                           />
//                           <Button
//                             onClick={(e) => {
//                               const input = e.target.parentElement.querySelector('input');
//                               if (input.value.trim()) {
//                                 addSkill(category, input.value);
//                                 input.value = '';
//                               }
//                             }}
//                             size="sm"
//                             className="bg-purple-500 hover:bg-purple-600"
//                           >
//                             <Plus className="w-4 h-4" />
//                           </Button>
//                         </div>
//                       </Card>
//                     ))}
//                   </TabsContent>

//                   {/* Certifications Tab */}
//                   <TabsContent value="certifications" className="space-y-6">
//                     <div className="flex justify-between items-center">
//                       <h3 className="text-lg font-semibold text-blue-600">Certifications</h3>
//                       <Button
//                         onClick={() => addArrayItem('certifications', {
//                           name: '', issuer: '', date: '', expiryDate: '', credentialId: '', verificationLink: ''
//                         })}
//                         size="sm"
//                         className="bg-blue-500 hover:bg-blue-600"
//                       >
//                         <Plus className="w-4 h-4 mr-2" />
//                         Add Certification
//                       </Button>
//                     </div>
                    
//                     {resumeData.certifications.map((cert, index) => (
//                       <Card key={index} className="p-4 border-l-4 border-l-yellow-400 bg-yellow-50/50">
//                         <div className="flex justify-between items-start mb-4">
//                           <h4 className="font-medium text-gray-800">Certification #{index + 1}</h4>
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             onClick={() => removeArrayItem('certifications', index)}
//                             className="text-red-500 border-red-200 hover:bg-red-50"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </Button>
//                         </div>
                        
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <Input
//                             value={cert.name}
//                             onChange={(e) => updateField('certifications', 'name', e.target.value, index)}
//                             placeholder="Certification Name"
//                             className="border-gray-200 focus:border-yellow-400"
//                           />
//                           <Input
//                             value={cert.issuer}
//                             onChange={(e) => updateField('certifications', 'issuer', e.target.value, index)}
//                             placeholder="Issuing Organization"
//                             className="border-gray-200 focus:border-yellow-400"
//                           />
//                           <Input
//                             type="date"
//                             value={cert.date}
//                             onChange={(e) => updateField('certifications', 'date', e.target.value, index)}
//                             placeholder="Issue Date"
//                             className="border-gray-200 focus:border-yellow-400"
//                           />
//                           <Input
//                             type="date"
//                             value={cert.expiryDate}
//                             onChange={(e) => updateField('certifications', 'expiryDate', e.target.value, index)}
//                             placeholder="Expiry Date (optional)"
//                             className="border-gray-200 focus:border-yellow-400"
//                           />
//                           <Input
//                             value={cert.credentialId}
//                             onChange={(e) => updateField('certifications', 'credentialId', e.target.value, index)}
//                             placeholder="Credential ID"
//                             className="border-gray-200 focus:border-yellow-400"
//                           />
//                           <Input
//                             value={cert.verificationLink}
//                             onChange={(e) => updateField('certifications', 'verificationLink', e.target.value, index)}
//                             placeholder="Verification Link"
//                             className="border-gray-200 focus:border-yellow-400"
//                           />
//                         </div>
//                       </Card>
//                     ))}
//                   </TabsContent>

//                   {/* Projects Tab */}
//                   <TabsContent value="projects" className="space-y-6">
//                     <div className="flex justify-between items-center">
//                       <h3 className="text-lg font-semibold text-blue-600">Projects</h3>
//                       <Button
//                         onClick={() => addArrayItem('projects', {
//                           title: '', description: '', techStack: [], githubLink: '', liveLink: '',
//                           collaborators: [], startDate: '', endDate: '', highlights: []
//                         })}
//                         size="sm"
//                         className="bg-blue-500 hover:bg-blue-600"
//                       >
//                         <Plus className="w-4 h-4 mr-2" />
//                         Add Project
//                       </Button>
//                     </div>
                    
//                     {resumeData.projects.map((project, index) => (
//                       <Card key={index} className="p-4 border-l-4 border-l-indigo-400 bg-indigo-50/50">
//                         <div className="flex justify-between items-start mb-4">
//                           <h4 className="font-medium text-gray-800">Project #{index + 1}</h4>
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             onClick={() => removeArrayItem('projects', index)}
//                             className="text-red-500 border-red-200 hover:bg-red-50"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </Button>
//                         </div>
                        
//                         <div className="space-y-4">
//                           <Input
//                             value={project.title}
//                             onChange={(e) => updateField('projects', 'title', e.target.value, index)}
//                             placeholder="Project Title"
//                             className="border-gray-200 focus:border-indigo-400"
//                           />
                          
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                               Description
//                               <div className="group relative inline-block ml-2">
//                                 <Lightbulb className="w-3 h-3 text-yellow-500 cursor-help" />
//                                 <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block w-64 p-2 bg-black text-white text-xs rounded shadow-lg z-10">
//                                   {tips.projects.description}
//                                 </div>
//                               </div>
//                             </label>
//                             <Textarea
//                               value={project.description}
//                               onChange={(e) => updateField('projects', 'description', e.target.value, index)}
//                               placeholder="Describe the project, technologies used, and your role"
//                               className="border-gray-200 focus:border-indigo-400"
//                               rows={3}
//                             />
//                           </div>
                          
//                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <Input
//                               value={project.githubLink}
//                               onChange={(e) => updateField('projects', 'githubLink', e.target.value, index)}
//                               placeholder="GitHub Repository Link"
//                               className="border-gray-200 focus:border-indigo-400"
//                             />
//                             <Input
//                               value={project.liveLink}
//                               onChange={(e) => updateField('projects', 'liveLink', e.target.value, index)}
//                               placeholder="Live Demo Link"
//                               className="border-gray-200 focus:border-indigo-400"
//                             />
//                             <Input
//                               type="date"
//                               value={project.startDate}
//                               onChange={(e) => updateField('projects', 'startDate', e.target.value, index)}
//                               className="border-gray-200 focus:border-indigo-400"
//                             />
//                             <Input
//                               type="date"
//                               value={project.endDate}
//                               onChange={(e) => updateField('projects', 'endDate', e.target.value, index)}
//                               className="border-gray-200 focus:border-indigo-400"
//                             />
//                           </div>
                          
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">Tech Stack</label>
//                             <div className="flex flex-wrap gap-2 mb-2">
//                               {project.techStack.map((tech, techIndex) => (
//                                 <Badge key={techIndex} variant="outline" className="flex items-center gap-1">
//                                   {tech}
//                                   <button
//                                     onClick={() => {
//                                       const newTechStack = project.techStack.filter((_, i) => i !== techIndex);
//                                       updateField('projects', 'techStack', newTechStack, index);
//                                     }}
//                                     className="ml-1 hover:text-red-500"
//                                   >
//                                     ×
//                                   </button>
//                                 </Badge>
//                               ))}
//                             </div>
//                             <div className="flex gap-2">
//                               <Input
//                                 placeholder="Add technology"
//                                 className="flex-1 border-gray-200 focus:border-indigo-400"
//                                 onKeyPress={(e) => {
//                                   if (e.key === 'Enter' && e.target.value.trim()) {
//                                     const newTechStack = [...project.techStack, e.target.value.trim()];
//                                     updateField('projects', 'techStack', newTechStack, index);
//                                     e.target.value = '';
//                                   }
//                                 }}
//                               />
//                               <Button
//                                 variant="outline"
//                                 size="sm"
//                                 onClick={(e) => {
//                                   const input = e.target.parentElement.querySelector('input');
//                                   if (input.value.trim()) {
//                                     const newTechStack = [...project.techStack, input.value.trim()];
//                                     updateField('projects', 'techStack', newTechStack, index);
//                                     input.value = '';
//                                   }
//                                 }}
//                                 className="border-indigo-200 text-indigo-600"
//                               >
//                                 <Plus className="w-4 h-4" />
//                               </Button>
//                             </div>
//                           </div>
                          
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                               Key Highlights
//                               <div className="group relative inline-block ml-2">
//                                 <Lightbulb className="w-3 h-3 text-yellow-500 cursor-help" />
//                                 <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block w-64 p-2 bg-black text-white text-xs rounded shadow-lg z-10">
//                                   {tips.projects.highlights}
//                                 </div>
//                               </div>
//                             </label>
//                             <div className="space-y-2">
//                               {project.highlights.map((highlight, highlightIndex) => (
//                                 <div key={highlightIndex} className="flex gap-2">
//                                   <Input
//                                     value={highlight}
//                                     onChange={(e) => {
//                                       const newHighlights = [...project.highlights];
//                                       newHighlights[highlightIndex] = e.target.value;
//                                       updateField('projects', 'highlights', newHighlights, index);
//                                     }}
//                                     placeholder="Project highlight or achievement"
//                                     className="flex-1 border-gray-200 focus:border-indigo-400"
//                                   />
//                                   <Button
//                                     variant="outline"
//                                     size="sm"
//                                     onClick={() => {
//                                       const newHighlights = project.highlights.filter((_, i) => i !== highlightIndex);
//                                       updateField('projects', 'highlights', newHighlights, index);
//                                     }}
//                                     className="text-red-500 border-red-200"
//                                   >
//                                     <Trash2 className="w-4 h-4" />
//                                   </Button>
//                                 </div>
//                               ))}
//                               <Button
//                                 variant="outline"
//                                 size="sm"
//                                 onClick={() => {
//                                   const newHighlights = [...project.highlights, ''];
//                                   updateField('projects', 'highlights', newHighlights, index);
//                                 }}
//                                 className="border-indigo-200 text-indigo-600"
//                               >
//                                 <Plus className="w-4 h-4 mr-2" />
//                                 Add Highlight
//                               </Button>
//                             </div>
//                           </div>
                          
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                               Team Members (for collaboration tracking)
//                             </label>
//                             <div className="flex gap-2">
//                               <Input
//                                 placeholder="teammate@email.com"
//                                 className="flex-1 border-gray-200 focus:border-indigo-400"
//                                 onKeyPress={(e) => {
//                                   if (e.key === 'Enter' && e.target.value.trim()) {
//                                     const newCollaborators = [...(project.collaborators || []), e.target.value.trim()];
//                                     updateField('projects', 'collaborators', newCollaborators, index);
//                                     e.target.value = '';
//                                   }
//                                 }}
//                               />
//                               <Button
//                                 variant="outline"
//                                 size="sm"
//                                 onClick={(e) => {
//                                   const input = e.target.parentElement.querySelector('input');
//                                   if (input.value.trim()) {
//                                     const newCollaborators = [...(project.collaborators || []), input.value.trim()];
//                                     updateField('projects', 'collaborators', newCollaborators, index);
//                                     input.value = '';
//                                   }
//                                 }}
//                                 className="border-green-200 text-green-600"
//                               >
//                                 <UserPlus className="w-4 h-4" />
//                               </Button>
//                             </div>
//                             {project.collaborators && project.collaborators.length > 0 && (
//                               <div className="mt-2 flex flex-wrap gap-2">
//                                 {project.collaborators.map((collaborator, colIndex) => (
//                                   <Badge key={colIndex} variant="secondary" className="flex items-center gap-1">
//                                     <Users className="w-3 h-3" />
//                                     {collaborator}
//                                     <button
//                                       onClick={() => {
//                                         const newCollaborators = project.collaborators.filter((_, i) => i !== colIndex);
//                                         updateField('projects', 'collaborators', newCollaborators, index);
//                                       }}
//                                       className="ml-1 hover:text-red-500"
//                                     >
//                                       ×
//                                     </button>
//                                   </Badge>
//                                 ))}
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       </Card>
//                     ))}
//                   </TabsContent>

//                   {/* Cover Letter Tab */}
//                   <TabsContent value="cover-letter" className="space-y-6">
//                     <h3 className="text-lg font-semibold text-blue-600">Cover Letter</h3>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <Input
//                         value={resumeData.coverLetter.title}
//                         onChange={(e) => updateField('coverLetter', 'title', e.target.value)}
//                         placeholder="Cover Letter Title"
//                         className="border-gray-200 focus:border-blue-400"
//                       />
//                       <Input
//                         value={resumeData.coverLetter.targetPosition}
//                         onChange={(e) => updateField('coverLetter', 'targetPosition', e.target.value)}
//                         placeholder="Target Position"
//                         className="border-gray-200 focus:border-blue-400"
//                       />
//                       <Input
//                         value={resumeData.coverLetter.targetCompany}
//                         onChange={(e) => updateField('coverLetter', 'targetCompany', e.target.value)}
//                         placeholder="Target Company"
//                         className="border-gray-200 focus:border-blue-400"
//                       />
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Cover Letter Content
//                       </label>
//                       <Textarea
//                         value={resumeData.coverLetter.content}
//                         onChange={(e) => updateField('coverLetter', 'content', e.target.value)}
//                         placeholder="Write your cover letter content here..."
//                         className="border-gray-200 focus:border-blue-400"
//                         rows={12}
//                       />
//                     </div>
                    
//                     <div className="bg-blue-50 p-4 rounded-lg">
//                       <h4 className="font-semibold text-blue-800 mb-2">Cover Letter Tips:</h4>
//                       <ul className="text-sm text-blue-700 space-y-1">
//                         <li>• Address the hiring manager by name if possible</li>
//                         <li>• Mention the specific position you're applying for</li>
//                         <li>• Highlight 2-3 key achievements that relate to the job</li>
//                         <li>• Show enthusiasm for the company and role</li>
//                         <li>• Keep it concise (1 page maximum)</li>
//                         <li>• End with a strong call to action</li>
//                       </ul>
//                     </div>
//                   </TabsContent>
//                 </Tabs>
//               </CardContent>
//             </Card>

//             {/* Auto-save indicator */}
//             <div className="text-center">
//               <div className="inline-flex items-center gap-2 text-sm text-gray-500">
//                 <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//                 <span>Auto-saving your progress...</span>
//               </div>
//             </div>
//           </div>

//           {/* Preview Section */}
//           {showPreview && (
//             <div className="lg:sticky lg:top-24 lg:h-fit">
//               <div className="mb-4 flex justify-between items-center">
//                 <h3 className="text-lg font-semibold text-gray-800">Live Preview</h3>
//                 <Button
//                   onClick={() => saveVersion()}
//                   size="sm"
//                   className="bg-green-500 hover:bg-green-600"
//                 >
//                   <Save className="w-4 h-4 mr-2" />
//                   Save Version
//                 </Button>
//               </div>
//               <ResumePreview />
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Skill Assessment Modal */}
//       {showSkillAssessment && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <Card className="bg-white/95 backdrop-blur-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//             <CardHeader>
//               <div className="flex justify-between items-center">
//                 <CardTitle className="flex items-center space-x-2">
//                   <Trophy className="w-6 h-6 text-purple-500" />
//                   <span>Skill Assessment</span>
//                 </CardTitle>
//                 <Button variant="outline" size="sm" onClick={() => setShowSkillAssessment(false)}>
//                   <X className="w-4 h-4" />
//                 </Button>
//               </div>
//               <div className="space-y-2">
//                 <div className="flex justify-between text-sm text-gray-500">
//                   <span>Question {currentSkillQuestion + 1} of {skillQuestions.length}</span>
//                   <span>{Math.round(((currentSkillQuestion + 1) / skillQuestions.length) * 100)}% Complete</span>
//                 </div>
//                 <Progress value={((currentSkillQuestion + 1) / skillQuestions.length) * 100} className="w-full" />
//               </div>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div>
//                 <h3 className="text-lg font-semibold mb-2">{skillQuestions[currentSkillQuestion].category}</h3>
//                 <p className="text-gray-600">{skillQuestions[currentSkillQuestion].question}</p>
//               </div>

//               <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//                 {skillQuestions[currentSkillQuestion].options.map((option, index) => {
//                   const isSelected = (skillAnswers[skillQuestions[currentSkillQuestion].id] || []).includes(option);
//                   return (
//                     <button
//                       key={index}
//                       onClick={() => handleSkillAnswer(option)}
//                       className={`
//                         p-3 text-sm border rounded-lg transition-all duration-200 text-left
//                         ${isSelected 
//                           ? 'bg-blue-500 text-white border-blue-500 shadow-md' 
//                           : 'hover:bg-gray-50 border-gray-200 hover:border-blue-300'
//                         }
//                       `}
//                     >
//                       <div className="flex items-center space-x-2">
//                         {isSelected ? (
//                           <CheckCircle className="w-4 h-4 flex-shrink-0" />
//                         ) : (
//                           <Circle className="w-4 h-4 flex-shrink-0" />
//                         )}
//                         <span className="truncate">{option}</span>
//                       </div>
//                     </button>
//                   );
//                 })}
//               </div>

//               {(skillAnswers[skillQuestions[currentSkillQuestion].id] || []).length > 0 && (
//                 <div>
//                   <p className="text-sm font-medium mb-2">
//                     Selected ({(skillAnswers[skillQuestions[currentSkillQuestion].id] || []).length}):
//                   </p>
//                   <div className="flex flex-wrap gap-2">
//                     {(skillAnswers[skillQuestions[currentSkillQuestion].id] || []).map((answer, index) => (
//                       <Badge key={index} variant="secondary" className="text-xs">
//                         {answer}
//                       </Badge>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               <div className="flex justify-between pt-4">
//                 <Button
//                   variant="outline"
//                   onClick={() => setCurrentSkillQuestion(Math.max(0, currentSkillQuestion - 1))}
//                   disabled={currentSkillQuestion === 0}
//                 >
//                   Previous
//                 </Button>
//                 <Button
//                   onClick={nextSkillQuestion}
//                   className="bg-blue-500 hover:bg-blue-600"
//                   disabled={(skillAnswers[skillQuestions[currentSkillQuestion].id] || []).length === 0}
//                 >
//                   {currentSkillQuestion === skillQuestions.length - 1 ? 'Complete Assessment' : 'Next Question'}
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       )}

//       {/* Theme Customizer Modal */}
//       {showThemeCustomizer && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <Card className="bg-white/95 backdrop-blur-sm max-w-lg w-full">
//             <CardHeader>
//               <div className="flex justify-between items-center">
//                 <CardTitle className="flex items-center space-x-2">
//                   <Palette className="w-6 h-6 text-purple-500" />
//                   <span>Customize Theme</span>
//                 </CardTitle>
//                 <Button variant="outline" size="sm" onClick={() => setShowThemeCustomizer(false)}>
//                   <X className="w-4 h-4" />
//                 </Button>
//               </div>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div>
//                 <h4 className="font-semibold mb-3">Color Scheme</h4>
//                 <div className="grid grid-cols-5 gap-3">
//                   {Object.entries(colorSchemes).map(([key, scheme]) => (
//                     <button
//                       key={key}
//                       onClick={() => updateField('theme', 'colorScheme', key)}
//                       className={`w-12 h-12 rounded-lg border-2 transition-all ${
//                         resumeData.theme.colorScheme === key ? 'border-gray-800 scale-110' : 'border-gray-200'
//                       }`}
//                       style={{ backgroundColor: scheme.primary }}
//                     />
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <h4 className="font-semibold mb-3">Template</h4>
//                 <div className="space-y-2">
//                   {Object.entries(templates).map(([key, description]) => (
//                     <button
//                       key={key}
//                       onClick={() => updateField('theme', 'template', key)}
//                       className={`w-full text-left p-3 rounded-lg border transition-all ${
//                         resumeData.theme.template === key 
//                           ? 'border-blue-500 bg-blue-50' 
//                           : 'border-gray-200 hover:border-gray-300'
//                       }`}
//                     >
//                       <div className="font-medium capitalize">{key}</div>
//                       <div className="text-sm text-gray-600">{description}</div>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <h4 className="font-semibold mb-3">Font Family</h4>
//                 <div className="space-y-2">
//                   {Object.entries(fontFamilies).map(([key, description]) => (
//                     <button
//                       key={key}
//                       onClick={() => updateField('theme', 'fontFamily', key)}
//                       className={`w-full text-left p-3 rounded-lg border transition-all ${
//                         resumeData.theme.fontFamily === key 
//                           ? 'border-blue-500 bg-blue-50' 
//                           : 'border-gray-200 hover:border-gray-300'
//                       }`}
//                     >
//                       <div className="font-medium">{description}</div>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       )}

//       {/* Share Modal */}
//       {showShareModal && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <Card className="bg-white/95 backdrop-blur-sm max-w-md w-full">
//             <CardHeader>
//               <div className="flex justify-between items-center">
//                 <CardTitle className="flex items-center space-x-2">
//                   <Share2 className="w-6 h-6 text-green-500" />
//                   <span>Share Resume</span>
//                 </CardTitle>
//                 <Button variant="outline" size="sm" onClick={() => setShowShareModal(false)}>
//                   <X className="w-4 h-4" />
//                 </Button>
//               </div>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium mb-2">Shareable Link</label>
//                 <div className="flex gap-2">
//                   <Input
//                     value={shareableLink}
//                     readOnly
//                     className="flex-1"
//                   />
//                   <Button
//                     onClick={shareResume}
//                     size="sm"
//                     className="bg-green-500 hover:bg-green-600"
//                   >
//                     <Copy className="w-4 h-4" />
//                   </Button>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-2">Add Collaborators</label>
//                 <div className="flex gap-2">
//                   <Input
//                     placeholder="colleague@email.com"
//                     className="flex-1"
//                     onKeyPress={(e) => {
//                       if (e.key === 'Enter' && e.target.value) {
//                         addCollaborator(e.target.value);
//                         e.target.value = '';
//                       }
//                     }}
//                   />
//                   <Button
//                     onClick={(e) => {
//                       const input = e.target.parentElement.querySelector('input');
//                       if (input.value) {
//                         addCollaborator(input.value);
//                         input.value = '';
//                       }
//                     }}
//                     size="sm"
//                     className="bg-blue-500 hover:bg-blue-600"
//                   >
//                     <Send className="w-4 h-4" />
//                   </Button>
//                 </div>
//               </div>

//               {collaborators.length > 0 && (
//                 <div>
//                   <h4 className="font-medium mb-2">Current Collaborators</h4>
//                   <div className="space-y-2">
//                     {collaborators.map(collaborator => (
//                       <div key={collaborator.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
//                         <div>
//                           <div className="font-medium">{collaborator.name}</div>
//                           <div className="text-sm text-gray-600">{collaborator.email}</div>
//                         </div>
//                         <Badge variant="secondary">{collaborator.role}</Badge>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       )}

//       {/* Version History Modal */}
//       {showVersionHistory && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <Card className="bg-white/95 backdrop-blur-sm max-w-md w-full max-h-[80vh] overflow-y-auto">
//             <CardHeader>
//               <div className="flex justify-between items-center">
//                 <CardTitle className="flex items-center space-x-2">
//                   <History className="w-6 h-6 text-orange-500" />
//                   <span>Version History</span>
//                 </CardTitle>
//                 <Button variant="outline" size="sm" onClick={() => setShowVersionHistory(false)}>
//                   <X className="w-4 h-4" />
//                 </Button>
//               </div>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               {savedVersions.length === 0 ? (
//                 <div className="text-center py-8 text-gray-500">
//                   <History className="w-12 h-12 mx-auto mb-4 opacity-50" />
//                   <p>No saved versions yet</p>
//                   <p className="text-sm">Click "Save Version" to create your first backup</p>
//                 </div>
//               ) : (
//                 <div className="space-y-3">
//                   {savedVersions.map(version => (
//                     <div key={version.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                       <div>
//                         <div className="font-medium">{version.name}</div>
//                         <div className="text-sm text-gray-600">
//                           {new Date(version.timestamp).toLocaleString()}
//                         </div>
//                       </div>
//                       <Button
//                         onClick={() => {
//                           loadVersion(version);
//                           setShowVersionHistory(false);
//                         }}
//                         size="sm"
//                         variant="outline"
//                         className="border-orange-200 text-orange-600 hover:bg-orange-50"
//                       >
//                         Load
//                       </Button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       )}

//       {/* AI Suggestions Modal */}
//       {showAISuggestions && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <Card className="bg-white/95 backdrop-blur-sm max-w-lg w-full">
//             <CardHeader>
//               <div className="flex justify-between items-center">
//                 <CardTitle className="flex items-center space-x-2">
//                   <Wand2 className="w-6 h-6 text-purple-500" />
//                   <span>AI Suggestions</span>
//                 </CardTitle>
//                 <Button variant="outline" size="sm" onClick={() => setShowAISuggestions(false)}>
//                   <X className="w-4 h-4" />
//                 </Button>
//               </div>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               {suggestions.length === 0 ? (
//                 <div className="text-center py-8 text-gray-500">
//                   <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
//                   <p>Analyzing your resume...</p>
//                 </div>
//               ) : (
//                 <div className="space-y-3">
//                   {suggestions.map((suggestion, index) => (
//                     <div key={index} className="p-4 border rounded-lg">
//                       <div className="flex items-start gap-3">
//                         <div className="flex-shrink-0">
//                           {suggestion.type === 'improvement' && <TrendingUp className="w-5 h-5 text-yellow-500" />}
//                           {suggestion.type === 'enhancement' && <Star className="w-5 h-5 text-blue-500" />}
//                           {suggestion.type === 'addition' && <Plus className="w-5 h-5 text-green-500" />}
//                         </div>
//                         <div className="flex-1">
//                           <div className="font-medium capitalize">{suggestion.section}</div>
//                           <div className="text-sm text-gray-600 mt-1">{suggestion.suggestion}</div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ResumeBuilder;