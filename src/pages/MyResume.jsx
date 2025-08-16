import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Award, 
  FolderOpen, 
  FileText, 
  Edit3, 
  Plus,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ExternalLink,
  Loader2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Star,
  Download,
  Share2,
  Eye,
  Copy,
  Check,
  Heart,
  Zap,
  TrendingUp,
  Clock,
  Globe,
  Building
} from "lucide-react";

const MyResumes = () => {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});
  const [favoriteSkills, setFavoriteSkills] = useState(new Set());
  const [copied, setCopied] = useState('');
  const [viewMode, setViewMode] = useState('detailed'); // 'detailed' | 'compact'
  const [animationPhase, setAnimationPhase] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    fetchResume();
    // Stagger animations
    const timer = setInterval(() => {
      setAnimationPhase(prev => prev + 1);
    }, 200);
    return () => clearInterval(timer);
  }, []);

  const fetchResume = async () => {
    if (!token) {
      setError("Please login first.");
      setLoading(false);
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/resume/getresume", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResume(res.data.resume);
      setError(null);
      // Initialize expanded sections
      setExpandedSections({
        workExperience: true,
        education: true,
        projects: false,
        certifications: false
      });
    } catch (err) {
      console.error(err.response?.data || err);
      
      if (err.response?.status === 401 || err.response?.status === 403) {
        setError("Session expired. Redirecting to login...");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError("Failed to fetch your resume. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleFavoriteSkill = (skill) => {
    setFavoriteSkills(prev => {
      const newSet = new Set(prev);
      if (newSet.has(skill)) {
        newSet.delete(skill);
      } else {
        newSet.add(skill);
      }
      return newSet;
    });
  };

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const DynamicCard = ({ children, className = "", delay = 0, section = null }) => (
    <div 
      className={`
        bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-6 
        shadow-soft hover:shadow-medium transition-all duration-500 ease-out
        transform hover:-translate-y-1 hover:scale-[1.02]
        ${hoveredCard === section ? 'ring-2 ring-primary/20' : ''}
        ${className}
      `}
      style={{ 
        animationDelay: `${delay}ms`,
        background: `linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--card)/0.8) 100%)`
      }}
      onMouseEnter={() => setHoveredCard(section)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      {children}
    </div>
  );

  const AnimatedSectionHeader = ({ icon: Icon, title, count = null, section, isExpandable = false }) => (
    <div 
      className={`flex items-center justify-between mb-6 group ${isExpandable ? 'cursor-pointer' : ''}`}
      onClick={isExpandable ? () => toggleSection(section) : undefined}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
            <Icon className="w-6 h-6 text-primary-foreground" />
          </div>
          {count > 0 && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-success text-success-foreground rounded-full flex items-center justify-center text-xs font-bold animate-bounce-in">
              {count}
            </div>
          )}
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          {count !== null && (
            <p className="text-sm text-muted-foreground">
              {count} {count === 1 ? 'item' : 'items'}
            </p>
          )}
        </div>
      </div>
      {isExpandable && (
        <div className="p-2 rounded-lg hover:bg-muted transition-colors">
          {expandedSections[section] ? (
            <ChevronUp className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
      )}
    </div>
  );

  const InteractiveContactInfo = ({ icon: Icon, value, href = null, type }) => {
    const content = (
      <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-all duration-300 group cursor-pointer">
        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all">
          <Icon className="w-4 h-4 text-primary group-hover:text-primary-foreground" />
        </div>
        <span className="text-sm text-foreground group-hover:text-primary transition-colors">
          {value}
        </span>
        <button
          onClick={(e) => {
            e.preventDefault();
            copyToClipboard(value, type);
          }}
          className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-primary/10 rounded"
        >
          {copied === type ? (
            <Check className="w-4 h-4 text-success" />
          ) : (
            <Copy className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
      </div>
    );

    return href ? (
      <a href={href} className="block">
        {content}
      </a>
    ) : content;
  };

  const DynamicSkillBadge = ({ skill, index }) => (
    <div 
      className={`
        relative inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 cursor-pointer
        ${favoriteSkills.has(skill) 
          ? 'bg-primary text-primary-foreground border-primary shadow-lg scale-105' 
          : 'bg-primary/5 text-primary border-primary/20 hover:bg-primary/10 hover:border-primary/40'
        }
        transform hover:scale-105 hover:-translate-y-0.5
        animate-fade-in
      `}
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={() => toggleFavoriteSkill(skill)}
    >
      <span className="text-sm font-medium">{skill}</span>
      <Heart 
        className={`w-3 h-3 transition-all ${favoriteSkills.has(skill) ? 'fill-current' : ''}`} 
      />
      {favoriteSkills.has(skill) && (
        <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
      )}
    </div>
  );

  const AnimatedInfoItem = ({ label, value, icon: Icon = null }) => (
    <div className="space-y-2 p-3 rounded-lg hover:bg-muted/50 transition-colors group">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-primary" />}
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide group-hover:text-primary transition-colors">
          {label}
        </p>
      </div>
      <p className="text-foreground font-medium">{value}</p>
    </div>
  );

  const StatsCard = ({ icon: Icon, label, value, trend = null }) => (
    <div className="bg-gradient-primary/5 border border-primary/20 rounded-lg p-4 text-center group hover:bg-gradient-primary/10 transition-all duration-300">
      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-primary group-hover:scale-110 transition-all">
        <Icon className="w-4 h-4 text-primary group-hover:text-primary-foreground" />
      </div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
      {trend && (
        <div className="flex items-center justify-center gap-1 mt-1">
          <TrendingUp className="w-3 h-3 text-success" />
          <span className="text-xs text-success">{trend}</span>
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-secondary flex items-center justify-center">
        <div className="text-center space-y-6 animate-bounce-in">
          <div className="relative">
            <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto" />
            <div className="absolute inset-0 w-16 h-16 border-4 border-primary/20 rounded-full mx-auto animate-ping" />
          </div>
          <h2 className="text-3xl font-bold text-foreground">Loading your resume...</h2>
          <p className="text-muted-foreground animate-pulse">Preparing your professional story</p>
          <div className="flex justify-center gap-1">
            {[...Array(3)].map((_, i) => (
              <div 
                key={i}
                className="w-2 h-2 bg-primary rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-secondary flex items-center justify-center">
        <div className="text-center space-y-8 max-w-md mx-auto p-6 animate-scale-in">
          <div className="relative">
            <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="w-10 h-10 text-destructive" />
            </div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-destructive/20 rounded-full mx-auto animate-ping" />
          </div>
          <h2 className="text-3xl font-bold text-foreground">Oops! Something went wrong</h2>
          <p className="text-muted-foreground text-lg">{error}</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-medium font-medium"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate("/")}
              className="bg-muted text-muted-foreground px-6 py-3 rounded-lg hover:bg-muted/80 transition-all duration-300 font-medium"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="min-h-screen bg-gradient-secondary">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center space-y-10 animate-fade-in">
            <div className="relative">
              <div className="w-32 h-32 bg-muted/50 rounded-full flex items-center justify-center mx-auto">
                <FileText className="w-16 h-16 text-muted-foreground" />
              </div>
              <div className="absolute inset-0 w-32 h-32 border-4 border-muted/20 rounded-full mx-auto animate-ping" />
            </div>
            <div className="space-y-4">
              <h2 className="text-5xl font-bold text-foreground">No Resume Found</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                You haven't created a resume yet. Let's get started and build your professional profile that will make you stand out!
              </p>
            </div>
            <button
              onClick={() => navigate("/resume-builder")}
              className="inline-flex items-center gap-3 bg-gradient-primary text-primary-foreground px-10 py-5 rounded-xl hover:shadow-strong transition-all duration-300 transform hover:scale-105 font-bold text-lg group"
            >
              <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform" />
              Create Your First Resume
              <Zap className="w-6 h-6 group-hover:animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    { icon: Briefcase, label: "Experience", value: resume.workExperience?.length || 0 },
    { icon: GraduationCap, label: "Education", value: resume.education?.length || 0 },
    { icon: FolderOpen, label: "Projects", value: resume.projects?.length || 0, trend: "+2 this month" },
    { icon: Award, label: "Certifications", value: resume.certifications?.length || 0 }
  ];

  return (
    <div className="min-h-screen bg-gradient-secondary">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Dynamic Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            My Professional Resume
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Your career story, beautifully presented and dynamically enhanced
          </p>
          
          {/* Action Bar */}
          <div className="flex justify-center gap-4 mb-8">
            <button className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-all">
              <Download className="w-4 h-4" />
              Download PDF
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-all">
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button 
              onClick={() => setViewMode(viewMode === 'detailed' ? 'compact' : 'detailed')}
              className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-all"
            >
              <Eye className="w-4 h-4" />
              {viewMode === 'detailed' ? 'Compact' : 'Detailed'} View
            </button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} style={{ animationDelay: `${index * 100}ms` }}>
                <StatsCard {...stat} />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Personal Info & Contact */}
          <div className="lg:col-span-1 space-y-6">
            {/* Personal Info Card */}
            {resume.personalInfo && (
              <DynamicCard delay={100} section="personal">
                <AnimatedSectionHeader icon={User} title="Personal Information" />
                <div className="space-y-4">
                  {resume.personalInfo.name && (
                    <h2 className="text-3xl font-bold text-foreground">{resume.personalInfo.name}</h2>
                  )}
                  {resume.personalInfo.title && (
                    <p className="text-lg text-primary font-semibold bg-primary/10 px-3 py-1 rounded-lg inline-block">
                      {resume.personalInfo.title}
                    </p>
                  )}
                  
                  <div className="space-y-2 pt-4 border-t border-border">
                    {resume.personalInfo.email && (
                      <InteractiveContactInfo 
                        icon={Mail} 
                        value={resume.personalInfo.email}
                        href={`mailto:${resume.personalInfo.email}`}
                        type="email"
                      />
                    )}
                    {resume.personalInfo.phone && (
                      <InteractiveContactInfo 
                        icon={Phone} 
                        value={resume.personalInfo.phone}
                        href={`tel:${resume.personalInfo.phone}`}
                        type="phone"
                      />
                    )}
                    {resume.personalInfo.location && (
                      <InteractiveContactInfo 
                        icon={MapPin} 
                        value={resume.personalInfo.location} 
                        type="location"
                      />
                    )}
                    {resume.personalInfo.website && (
                      <InteractiveContactInfo 
                        icon={Globe} 
                        value={resume.personalInfo.website}
                        href={resume.personalInfo.website}
                        type="website"
                      />
                    )}
                  </div>

                  {resume.personalInfo.summary && (
                    <div className="pt-4 border-t border-border">
                      <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Professional Summary
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">{resume.personalInfo.summary}</p>
                    </div>
                  )}
                </div>
              </DynamicCard>
            )}

            {/* Skills */}
            {resume.skills?.length > 0 && (
              <DynamicCard delay={300} section="skills">
                <AnimatedSectionHeader icon={Code} title="Skills" count={resume.skills.length} />
                <div className="flex flex-wrap gap-3">
                  {resume.skills.map((skill, idx) => (
                    <DynamicSkillBadge key={idx} skill={skill} index={idx} />
                  ))}
                </div>
                {favoriteSkills.size > 0 && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                      <Heart className="w-4 h-4 text-destructive fill-current" />
                      Favorite Skills ({favoriteSkills.size})
                    </p>
                  </div>
                )}
              </DynamicCard>
            )}
          </div>

          {/* Right Column - Experience, Education, etc. */}
          <div className="lg:col-span-2 space-y-6">
            {/* Work Experience */}
            {resume.workExperience?.length > 0 && (
              <DynamicCard delay={200} section="experience">
                <AnimatedSectionHeader 
                  icon={Briefcase} 
                  title="Work Experience" 
                  count={resume.workExperience.length}
                  section="workExperience"
                  isExpandable={true}
                />
                <div 
                  className={`transition-all duration-500 ${
                    expandedSections.workExperience ? 'opacity-100 max-h-none' : 'opacity-50 max-h-32 overflow-hidden'
                  }`}
                >
                  <div className="space-y-6">
                    {resume.workExperience.map((exp, idx) => (
                      <div 
                        key={idx} 
                        className="border-l-4 border-primary/30 pl-6 pb-6 last:pb-0 hover:border-primary/60 transition-colors group"
                      >
                        <div className="space-y-3">
                          {exp.jobTitle && (
                            <h4 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                              {exp.jobTitle}
                            </h4>
                          )}
                          <div className="flex flex-wrap items-center gap-4 text-sm">
                            {exp.company && (
                              <AnimatedInfoItem 
                                label="Company" 
                                value={exp.company}
                                icon={Building}
                              />
                            )}
                            {exp.startDate && exp.endDate && (
                              <AnimatedInfoItem 
                                label="Duration" 
                                value={`${exp.startDate} - ${exp.endDate}`}
                                icon={Calendar}
                              />
                            )}
                            {exp.location && (
                              <AnimatedInfoItem 
                                label="Location" 
                                value={exp.location}
                                icon={MapPin}
                              />
                            )}
                          </div>
                          {exp.description && (
                            <p className="text-muted-foreground leading-relaxed bg-muted/30 p-3 rounded-lg">
                              {exp.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </DynamicCard>
            )}

            {/* Education */}
            {resume.education?.length > 0 && (
              <DynamicCard delay={400} section="education">
                <AnimatedSectionHeader 
                  icon={GraduationCap} 
                  title="Education" 
                  count={resume.education.length}
                  section="education"
                  isExpandable={true}
                />
                <div 
                  className={`transition-all duration-500 ${
                    expandedSections.education ? 'opacity-100 max-h-none' : 'opacity-50 max-h-32 overflow-hidden'
                  }`}
                >
                  <div className="space-y-6">
                    {resume.education.map((edu, idx) => (
                      <div 
                        key={idx} 
                        className="border-l-4 border-primary/30 pl-6 pb-6 last:pb-0 hover:border-primary/60 transition-colors group"
                      >
                        <div className="space-y-3">
                          {edu.degree && (
                            <h4 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                              {edu.degree}
                            </h4>
                          )}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {edu.institution && (
                              <AnimatedInfoItem 
                                label="Institution" 
                                value={edu.institution}
                                icon={Building}
                              />
                            )}
                            {edu.graduationYear && (
                              <AnimatedInfoItem 
                                label="Year" 
                                value={edu.graduationYear}
                                icon={Calendar}
                              />
                            )}
                            {edu.gpa && (
                              <AnimatedInfoItem 
                                label="GPA" 
                                value={edu.gpa}
                                icon={Star}
                              />
                            )}
                          </div>
                          {edu.description && (
                            <p className="text-muted-foreground leading-relaxed bg-muted/30 p-3 rounded-lg">
                              {edu.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </DynamicCard>
            )}

            {/* Projects */}
            {resume.projects?.length > 0 && (
              <DynamicCard delay={500} section="projects">
                <AnimatedSectionHeader 
                  icon={FolderOpen} 
                  title="Projects" 
                  count={resume.projects.length}
                  section="projects"
                  isExpandable={true}
                />
                <div 
                  className={`transition-all duration-500 ${
                    expandedSections.projects ? 'opacity-100 max-h-none' : 'opacity-50 max-h-32 overflow-hidden'
                  }`}
                >
                  <div className="space-y-6">
                    {resume.projects.map((proj, idx) => (
                      <div 
                        key={idx} 
                        className="border border-border rounded-lg p-4 hover:border-primary/30 transition-all hover:shadow-lg group"
                      >
                        <div className="space-y-4">
                          {proj.name && (
                            <h4 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                              {proj.name}
                            </h4>
                          )}
                          {proj.description && (
                            <p className="text-muted-foreground leading-relaxed">{proj.description}</p>
                          )}
                          {proj.technologies && (
                            <div className="flex flex-wrap gap-2">
                              {(Array.isArray(proj.technologies) ? proj.technologies : proj.technologies.split(', ')).map((tech, techIdx) => (
                                <span 
                                  key={techIdx} 
                                  className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                          {proj.url && (
                            <a 
                              href={proj.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                            >
                              <ExternalLink className="w-4 h-4" />
                              View Project
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </DynamicCard>
            )}

            {/* Certifications */}
            {resume.certifications?.length > 0 && (
              <DynamicCard delay={600} section="certifications">
                <AnimatedSectionHeader 
                  icon={Award} 
                  title="Certifications" 
                  count={resume.certifications.length}
                  section="certifications"
                  isExpandable={true}
                />
                <div 
                  className={`transition-all duration-500 ${
                    expandedSections.certifications ? 'opacity-100 max-h-none' : 'opacity-50 max-h-32 overflow-hidden'
                  }`}
                >
                  <div className="space-y-4">
                    {resume.certifications.map((cert, idx) => (
                      <div 
                        key={idx} 
                        className="border border-border rounded-lg p-4 hover:border-primary/30 transition-all hover:shadow-lg group"
                      >
                        <div className="space-y-3">
                          {cert.name && (
                            <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">
                              {cert.name}
                            </h4>
                          )}
                          <div className="flex flex-wrap items-center gap-4">
                            {cert.issuer && (
                              <AnimatedInfoItem 
                                label="Issuer" 
                                value={cert.issuer}
                                icon={Building}
                              />
                            )}
                            {cert.date && (
                              <AnimatedInfoItem 
                                label="Date" 
                                value={cert.date}
                                icon={Calendar}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </DynamicCard>
            )}

            {/* Cover Letter */}
            {resume.coverLetter?.title && (
              <DynamicCard delay={700} section="coverLetter">
                <AnimatedSectionHeader icon={FileText} title="Cover Letter" />
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-foreground">{resume.coverLetter.title}</h4>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap bg-muted/30 p-4 rounded-lg">
                      {resume.coverLetter.content}
                    </p>
                  </div>
                </div>
              </DynamicCard>
            )}
          </div>
        </div>

        {/* Enhanced Edit Button */}
        <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: '800ms' }}>
          <button
            onClick={() => navigate("/resume-builder")}
            className="group inline-flex items-center gap-3 bg-gradient-primary text-primary-foreground px-10 py-5 rounded-xl hover:shadow-strong transition-all duration-300 transform hover:scale-105 font-bold text-lg"
          >
            <Edit3 className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            Edit Resume
            <Zap className="w-6 h-6 group-hover:animate-bounce" />
          </button>
        </div>

        {/* Last Updated */}
        <div className="text-center mt-8 text-sm text-muted-foreground flex items-center justify-center gap-2">
          <Clock className="w-4 h-4" />
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default MyResumes;