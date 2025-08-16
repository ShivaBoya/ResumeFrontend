import React from "react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Build Your Resume",
    desc: "Create or update your resume using customizable templates with real-time preview.",
    icon: (
      <svg
        className="w-8 h-8 text-green-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h6l6 6v10a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: "Skill Assessment Quiz",
    desc: "Take a quick quiz to discover your strengths and get tailored skill suggestions.",
    icon: (
      <svg
        className="w-8 h-8 text-purple-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
  },
  {
    title: "Real-Time Collaboration",
    desc: "Collaborate on resumes with your project mates and mentors in real time.",
    icon: (
      <svg
        className="w-8 h-8 text-blue-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M15 11a4 4 0 01-6 0" />
      </svg>
    ),
  },
  {
    title: "Resume Analytics",
    desc: "Track how often your resume has been viewed or downloaded by recruiters.",
    icon: (
      <svg
        className="w-8 h-8 text-yellow-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 17a4 4 0 014-4h3M9 12a4 4 0 00-4 4v3" />
      </svg>
    ),
  },
];

export default function AfterLoginHome() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 max-w-7xl mx-auto">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          Welcome Back, Ready to Boost Your Career?
        </h1>
        <p className="text-gray-700 max-w-xl mx-auto">
          Use powerful tools and insights to craft a standout resume and advance your professional journey.
        </p>
      </header>

      <section className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 mb-16">
        {features.map(({ title, desc, icon }, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow p-6 flex flex-col items-center text-center hover:shadow-lg transition cursor-default"
          >
            <div className="mb-4">{icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
            <p className="text-gray-600">{desc}</p>
          </div>
        ))}
      </section>

      <section className="text-center">
        <Link
          to="/resume-builder"
          className="inline-block bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-lg font-semibold text-lg shadow-lg transition"
        >
          Build Your Resume Now
        </Link>
      </section>
    </div>
  );
}
