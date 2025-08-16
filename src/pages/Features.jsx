// Features.jsx
import React from "react";
import { CheckCircleIcon, SparklesIcon, UsersIcon, Cog6ToothIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

const featuresData = [
  {
    title: "User Registration/Login",
    description:
      "Create accounts to save progress, access resumes later, and login using Google or LinkedIn for convenience.",
    icon: CheckCircleIcon,
    category: "Minimum",
  },
  {
    title: "Resume Templates",
    description:
      "Choose from a variety of customizable templates with live preview before selection.",
    icon: SparklesIcon,
    category: "Minimum",
  },
  {
    title: "Form Sections",
    description:
      "Input personal info, work experience, education, skills, certifications, and projects with helpful tips.",
    icon: Cog6ToothIcon,
    category: "Minimum",
  },
  {
    title: "Preview & Edit",
    description:
      "See real-time preview of your resume and adjust formatting, fonts, and colors effortlessly.",
    icon: CheckCircleIcon,
    category: "Minimum",
  },
  {
    title: "Download Options",
    description:
      "Download your resume in PDF, Word, or plain text formats.",
    icon: ArrowTopRightOnSquareIcon,
    category: "Minimum",
  },
  {
    title: "One-Click Resume Generation",
    description:
      "Instantly generate a fully formatted resume from your input data.",
    icon: SparklesIcon,
    category: "Unique",
  },
  {
    title: "Skill Assessment",
    description:
      "Take a brief quiz to discover your skills and get suggestions for inclusion in your resume.",
    icon: Cog6ToothIcon,
    category: "Unique",
  },
  {
    title: "Customizable Sections",
    description:
      "Add or remove sections like portfolio, certifications, or projects as needed.",
    icon: CheckCircleIcon,
    category: "Unique",
  },
  {
    title: "LinkedIn Integration",
    description:
      "Import your LinkedIn profile to automatically populate fields.",
    icon: ArrowTopRightOnSquareIcon,
    category: "Unique",
  },
  {
    title: "Cover Letter Builder",
    description:
      "Create and customize a professional cover letter to accompany your resume.",
    icon: UsersIcon,
    category: "Unique",
  },
  {
    title: "Tagging Project Mates",
    description:
      "Tag collaborators on projects. They get notified and collaborations appear in dashboards.",
    icon: UsersIcon,
    category: "Unique",
  },
  {
    title: "Real-Time Collaboration",
    description:
      "Multiple users can edit a resume simultaneously for group projects or shared applications.",
    icon: UsersIcon,
    category: "Challenging",
  },
  {
    title: "AI-Powered Suggestions",
    description:
      "Get AI-based improvements for phrasing, skill highlights, and overall resume quality.",
    icon: SparklesIcon,
    category: "Challenging",
  },
  {
    title: "Export & Share",
    description:
      "Generate shareable links for easy distribution to employers or mentors.",
    icon: ArrowTopRightOnSquareIcon,
    category: "Challenging",
  },
  {
    title: "Version Control",
    description:
      "Track different resume versions and revert to any previous version if needed.",
    icon: Cog6ToothIcon,
    category: "Challenging",
  },
  {
    title: "Analytics Dashboard",
    description:
      "Get insights on downloads, shares, and resume performance.",
    icon: UsersIcon,
    category: "Challenging",
  },
  {
    title: "AI Career Path Analyzer",
    description:
      "Receive personalized recommendations for skills, certifications, and learning paths based on your career goals.",
    icon: SparklesIcon,
    category: "Challenging",
  },
];

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col space-y-3 hover:scale-105 transform transition-all duration-300">
    <div className="flex items-center space-x-3">
      <Icon className="h-8 w-8 text-blue-500" />
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
    </div>
    <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
  </div>
);

const Features = () => {
  const categories = ["Minimum", "Unique", "Challenging"];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
        Resume Builder Features
      </h1>

      {categories.map((category) => (
        <section key={category} className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            {category} Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuresData
              .filter((feature) => feature.category === category)
              .map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Features;
