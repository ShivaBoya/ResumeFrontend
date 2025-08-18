// ResumeBuilder.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/contants";

// Utility to download file

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

 

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Create Your Resume
      </h2>

     

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
     
      
    </div>
  );
};

export default ResumeBuilder;




