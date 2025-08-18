import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [stats, setStats] = useState({
    activeUsers: 1234,
    resumesCreated: 45678,
    companiesHiring: 892,
    successRate: 94,
    templatesAvailable: 12547,
    mentorsOnline: 2834,
    jobsPosted: 15789,
    interviewsScheduled: 3456
  });

  const [activities, setActivities] = useState([
    { user: "Sarah M.", action: "created a new resume", time: "2 min ago", type: "create", location: "New York", avatar: "👩‍💼" },
    { user: "Michael R.", action: "got hired at TechCorp", time: "5 min ago", type: "success", location: "San Francisco", avatar: "👨‍💻" },
    { user: "Emma L.", action: "updated their skills", time: "8 min ago", type: "update", location: "London", avatar: "👩‍🎓" },
    { user: "James K.", action: "downloaded resume as PDF", time: "12 min ago", type: "download", location: "Toronto", avatar: "👨‍🔬" },
    { user: "Lisa P.", action: "completed skill assessment", time: "15 min ago", type: "assessment", location: "Sydney", avatar: "👩‍🏫" }
  ]);

  const [currentTime, setCurrentTime] = useState(new Date());
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [trendingSkills, setTrendingSkills] = useState([
    { skill: "AI/Machine Learning", growth: "+45%", demand: "Very High", color: "bg-gradient-to-r from-purple-500 to-pink-500" },
    { skill: "React Development", growth: "+38%", demand: "High", color: "bg-gradient-to-r from-blue-500 to-cyan-500" },
    { skill: "Data Analysis", growth: "+42%", demand: "Very High", color: "bg-gradient-to-r from-green-500 to-teal-500" },
    { skill: "Cloud Computing", growth: "+35%", demand: "High", color: "bg-gradient-to-r from-orange-500 to-red-500" },
    { skill: "UI/UX Design", growth: "+29%", demand: "Medium", color: "bg-gradient-to-r from-indigo-500 to-purple-500" },
    { skill: "DevOps", growth: "+41%", demand: "Very High", color: "bg-gradient-to-r from-yellow-500 to-orange-500" }
  ]);

  const [jobMarketData, setJobMarketData] = useState([
    { company: "Google", openings: 1247, type: "Tech Giant", hiring: "Actively", logo: "🔍" },
    { company: "Microsoft", openings: 985, type: "Tech Giant", hiring: "Actively", logo: "🪟" },
    { company: "Amazon", openings: 2156, type: "E-commerce", hiring: "Rapidly", logo: "📦" },
    { company: "Apple", openings: 734, type: "Hardware", hiring: "Selectively", logo: "🍎" },
    { company: "Meta", openings: 678, type: "Social Media", hiring: "Actively", logo: "📘" },
    { company: "Tesla", openings: 892, type: "Automotive", hiring: "Rapidly", logo: "⚡" }
  ]);

  const [userProgress, setUserProgress] = useState({
    profileCompletion: 75,
    skillsAssessed: 8,
    resumesCreated: 3,
    interviewsScheduled: 2,
    jobApplications: 12,
    networkConnections: 45
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update main stats
      setStats(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 5),
        resumesCreated: prev.resumesCreated + Math.floor(Math.random() * 3),
        companiesHiring: prev.companiesHiring + Math.floor(Math.random() * 3),
        successRate: Math.max(88, Math.min(99, prev.successRate + (Math.random() - 0.5) * 0.8)),
        templatesAvailable: prev.templatesAvailable + Math.floor(Math.random() * 2),
        mentorsOnline: prev.mentorsOnline + Math.floor(Math.random() * 4) - 2,
        jobsPosted: prev.jobsPosted + Math.floor(Math.random() * 5),
        interviewsScheduled: prev.interviewsScheduled + Math.floor(Math.random() * 3)
      }));

      // Update current time
      setCurrentTime(new Date());

      // Add new activity occasionally
      if (Math.random() > 0.6) {
        const newActivities = [
          { user: "Alex Chen", action: "landed a job at Google", time: "just now", type: "success", location: "California", avatar: "👨‍💻" },
          { user: "Maria Garcia", action: "completed AI course", time: "just now", type: "assessment", location: "Madrid", avatar: "👩‍🎓" },
          { user: "David Kim", action: "updated portfolio", time: "just now", type: "update", location: "Seoul", avatar: "👨‍🎨" },
          { user: "Sophie Brown", action: "got interview invite", time: "just now", type: "success", location: "London", avatar: "👩‍💼" },
          { user: "Carlos Rodriguez", action: "created new resume", time: "just now", type: "create", location: "Mexico City", avatar: "👨‍🔬" },
          { user: "Anna Petrov", action: "skill assessment passed", time: "just now", type: "assessment", location: "Moscow", avatar: "👩‍🏫" }
        ];
        const randomActivity = newActivities[Math.floor(Math.random() * newActivities.length)];
        
        setActivities(prev => [randomActivity, ...prev.slice(0, 9)]);
      }

      // Update notifications occasionally
      if (Math.random() > 0.8) {
        const newNotifications = [
          "🎉 500+ new jobs posted in the last hour!",
          "🔥 AI skills are trending up 45% this week!",
          "⭐ New resume template just released!",
          "🚀 Interview success rate increased to 94%!",
          "💼 Top companies are hiring for remote positions!"
        ];
        const randomNotification = newNotifications[Math.floor(Math.random() * newNotifications.length)];
        setNotifications(prev => [randomNotification, ...prev.slice(0, 2)]);
      }

      // Update trending skills growth
      setTrendingSkills(prev => prev.map(skill => ({
        ...skill,
        growth: `+${(parseInt(skill.growth.replace('%', '').replace('+', '')) + Math.floor(Math.random() * 3 - 1))}%`
      })));

      // Update job market data
      setJobMarketData(prev => prev.map(company => ({
        ...company,
        openings: company.openings + Math.floor(Math.random() * 10 - 5)
      })));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Time-based greeting
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const features = [
    {
      title: "AI-Powered Resume Builder",
      desc: "Create professional resumes with AI assistance and industry-specific templates that adapt to your experience.",
      icon: "🤖",
      color: "from-purple-500 to-pink-500",
      stats: `${stats.templatesAvailable.toLocaleString()}+ templates`,
      badge: "Most Popular"
    },
    {
      title: "Real-Time Skill Assessment",
      desc: "Take dynamic quizzes that adapt to your responses and discover hidden strengths with personalized recommendations.",
      icon: "⚡",
      color: "from-blue-500 to-cyan-500",
      stats: "98.7% accuracy",
      badge: "AI Powered"
    },
    {
      title: "Live Collaboration Hub",
      desc: "Work with mentors and peers in real-time with instant feedback, suggestions, and career guidance.",
      icon: "👥",
      color: "from-green-500 to-teal-500",
      stats: `${stats.mentorsOnline.toLocaleString()}+ mentors online`,
      badge: "Live Now"
    },
    {
      title: "Smart Analytics Dashboard",
      desc: "Track resume performance with detailed insights on views, downloads, response rates, and hiring trends.",
      icon: "📊",
      color: "from-orange-500 to-red-500",
      stats: "Real-time insights",
      badge: "Advanced"
    },
    {
      title: "Job Market Intelligence",
      desc: "Access live job market data, salary insights, and trending skills to stay ahead of the competition.",
      icon: "🎯",
      color: "from-indigo-500 to-purple-500",
      stats: `${stats.jobsPosted.toLocaleString()}+ jobs tracked`,
      badge: "Exclusive"
    },
    {
      title: "Interview Preparation",
      desc: "Practice with AI-powered mock interviews and get personalized feedback to ace your next interview.",
      icon: "🎤",
      color: "from-yellow-500 to-orange-500",
      stats: `${stats.interviewsScheduled.toLocaleString()}+ interviews scheduled`,
      badge: "Success Boost"
    }
  ];

  const getActivityIcon = (type) => {
    const icons = {
      create: "✨",
      success: "🎉",
      update: "🔄",
      download: "📄",
      assessment: "🎯"
    };
    return icons[type] || "•";
  };

  const StatCard = ({ label, value, suffix = "" }) => (
    <div className="bg-card rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 animate-scale-in">
      <div className="flex items-center justify-between mb-2">
        <span className="text-muted-foreground text-sm font-medium">{label}</span>
        <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
      </div>
      <div className="text-2xl font-bold text-foreground">
        {typeof value === 'number' ? Math.floor(value).toLocaleString() : value}{suffix}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16 animate-slide-down">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Build Your Dream Career
              <span className="block bg-gradient-primary bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_200%]">
                In Real-Time
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Join thousands of professionals using our AI-powered platform to create stunning resumes, 
              assess skills, and land their dream jobs with real-time collaboration and insights.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                to="/resume-builder"
                className="bg-gradient-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg shadow-medium hover:shadow-strong transform hover:scale-105 transition-all duration-300 animate-float"
              >
                Start Building Now
              </Link>
              <button className="bg-card text-foreground border border-border px-8 py-4 rounded-xl font-semibold text-lg shadow-soft hover:shadow-medium transform hover:scale-105 transition-all duration-300">
                Watch Demo
              </button>
            </div>
          </div>

          {/* Live Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <StatCard label="Active Users" value={stats.activeUsers} />
            <StatCard label="Resumes Created" value={stats.resumesCreated} />
            <StatCard label="Companies Hiring" value={stats.companiesHiring} />
            <StatCard label="Success Rate" value={stats.successRate.toFixed(1)} suffix="%" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Powerful Features for Modern Professionals
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to stand out in today's competitive job market, 
            powered by cutting-edge AI and real-time collaboration.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group bg-card rounded-2xl p-8 shadow-soft hover:shadow-strong transition-all duration-500 transform hover:-translate-y-2 animate-scale-in cursor-pointer"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {feature.desc}
              </p>
              <div className="text-sm font-semibold text-accent">
                {feature.stats}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Real-Time Activity Feed */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        {/* Live Notifications Banner */}
        {notifications.length > 0 && (
          <div className="mb-12 animate-slide-down">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-xl shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-gradient-shift bg-[length:200%_200%]"></div>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                  <span className="font-semibold">{notifications[0]}</span>
                </div>
                <span className="text-sm text-white/80">Live Update</span>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Live Activity Feed */}
          <div className="lg:col-span-2">
            <div className="animate-slide-up mb-8">
              <h3 className="text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="text-2xl">🌐</span>
                {getGreeting()}, See What's Happening Live
              </h3>
              <p className="text-lg text-muted-foreground">
                Join a thriving community of {stats.activeUsers.toLocaleString()}+ professionals achieving their career goals 
                every day. Watch real-time updates from users just like you across the globe.
              </p>
            </div>
            
            <div className="bg-card rounded-2xl p-6 shadow-medium animate-slide-up">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <span className="text-lg">🚀</span>
                  Global Activity Feed
                </h4>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm text-success font-medium">Live - {currentTime.toLocaleTimeString()}</span>
                </div>
              </div>
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {activities.map((activity, idx) => (
                  <div
                    key={`${activity.user}-${activity.time}-${idx}`}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all duration-300 animate-fade-in border border-transparent hover:border-blue-200 dark:hover:border-blue-800"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="text-2xl">{activity.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{getActivityIcon(activity.type)}</span>
                        <span className="font-semibold text-foreground">{activity.user}</span>
                        <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">{activity.location}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{activity.action}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                        <div className="flex items-center gap-1">
                          <div className="w-1 h-1 bg-success rounded-full animate-pulse"></div>
                          <span className="text-xs text-success">Active</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Live Stats Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-card rounded-2xl p-6 shadow-medium animate-scale-in">
              <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="text-lg">📊</span>
                Live Platform Stats
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Templates Used</span>
                  <span className="font-bold text-primary">{stats.templatesAvailable.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Mentors Online</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="font-bold text-green-600">{stats.mentorsOnline.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Jobs Posted Today</span>
                  <span className="font-bold text-blue-600">{stats.jobsPosted.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Interviews This Week</span>
                  <span className="font-bold text-purple-600">{stats.interviewsScheduled.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Success Indicators */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 shadow-medium animate-scale-in border border-green-200 dark:border-green-800">
              <h4 className="text-lg font-bold text-green-800 dark:text-green-200 mb-4 flex items-center gap-2">
                <span className="text-lg">🎯</span>
                Success Indicators
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-700 dark:text-green-300 font-medium">{stats.successRate.toFixed(1)}% Interview Success Rate</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <span className="text-sm text-green-700 dark:text-green-300 font-medium">97.2% User Satisfaction</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <span className="text-sm text-green-700 dark:text-green-300 font-medium">4.9⭐ Average Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Skills Section */}
      <section className="bg-white from-purple-50 via-blue-50 to-indigo-50 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-indigo-900/20 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
              <span className="text-3xl">🔥</span>
              Trending Skills & Market Intelligence
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay ahead of the curve with real-time skill demand data and market insights 
              powered by AI analysis of millions of job postings.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Trending Skills */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl p-6 shadow-medium animate-scale-in">
                <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <span className="text-lg">📈</span>
                  Hottest Skills This Week
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {trendingSkills.map((skill, idx) => (
                    <div
                      key={skill.skill}
                      className="group p-4 rounded-xl bg-gradient-to-r hover:from-white hover:to-gray-50 dark:hover:from-gray-800 dark:hover:to-gray-900 border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 cursor-pointer transform hover:scale-105"
                      style={{ animationDelay: `${idx * 150}ms` }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-4 h-4 rounded-full ${skill.color}`}></div>
                        <span className="text-sm font-bold text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                          {skill.growth}
                        </span>
                      </div>
                      <h4 className="font-bold text-foreground mb-1 group-hover:text-purple-600 transition-colors">
                        {skill.skill}
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Demand:</span>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          skill.demand === 'Very High' ? 'bg-red-100 text-red-700 dark:bg-red-900/30' :
                          skill.demand === 'High' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30' :
                          'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30'
                        }`}>
                          {skill.demand}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Market Summary */}
            <div className="space-y-6">
              <div className="bg-card rounded-2xl p-6 shadow-medium animate-scale-in">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-lg">🌟</span>
                  Market Summary
                </h3>
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-sm text-blue-600 font-medium">Most In-Demand</div>
                    <div className="text-lg font-bold text-blue-800 dark:text-blue-200">AI & Machine Learning</div>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-sm text-green-600 font-medium">Highest Growth</div>
                    <div className="text-lg font-bold text-green-800 dark:text-green-200">Data Analysis</div>
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="text-sm text-purple-600 font-medium">Emerging Field</div>
                    <div className="text-lg font-bold text-purple-800 dark:text-purple-200">DevOps Engineering</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-6 shadow-medium animate-scale-in border border-yellow-200 dark:border-yellow-800">
                <h3 className="text-lg font-bold text-orange-800 dark:text-orange-200 mb-3 flex items-center gap-2">
                  <span className="text-lg">⚡</span>
                  Quick Action
                </h3>
                <p className="text-sm text-orange-700 dark:text-orange-300 mb-4">
                  Start learning AI skills now and increase your job prospects by 45%!
                </p>
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg font-semibold transform hover:scale-105 transition-all duration-200">
                  Start AI Assessment
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Market Intelligence */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            <span className="text-3xl">💼</span>
            Live Job Market Intelligence
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-time insights from top companies actively hiring. Updated every minute 
            with fresh opportunities and hiring trends.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {jobMarketData.map((company, idx) => (
            <div
              key={company.company}
              className="group bg-card rounded-2xl p-6 shadow-soft hover:shadow-strong transition-all duration-500 animate-scale-in cursor-pointer transform hover:-translate-y-1"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{company.logo}</div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {company.company}
                    </h3>
                    <p className="text-sm text-muted-foreground">{company.type}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  company.hiring === 'Rapidly' ? 'bg-red-100 text-red-700 dark:bg-red-900/30' :
                  company.hiring === 'Actively' ? 'bg-green-100 text-green-700 dark:bg-green-900/30' :
                  'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30'
                }`}>
                  {company.hiring}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-primary">{company.openings.toLocaleString()}</span>
                  <span className="text-muted-foreground ml-2">open positions</span>
                </div>
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 transform hover:scale-105 transition-all duration-200">
                  View Jobs
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-gradient-secondary py-20">
        <div className="max-w-4xl mx-auto text-center px-6 animate-scale-in">
          <h3 className="text-4xl font-bold text-black mb-6">
            Ready to Transform Your Career?
          </h3>
          <p className="text-xl text-black/80 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have already accelerated their careers 
            with our AI-powered platform and real-time collaboration tools.
          </p>
          
          <Link
            to="/resume-builder"
            className="inline-block bg-white text-primary px-10 py-4 rounded-xl font-bold text-lg shadow-strong hover:shadow-medium transform hover:scale-105 transition-all duration-300 animate-float"
          >
            Get Started Free Today
          </Link>
          
          <p className="text-black/60 text-sm mt-4">
            No credit card required • Start building in under 60 seconds
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;