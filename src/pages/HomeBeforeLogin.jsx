import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Create Professional Resumes",
    desc: "Fill out easy forms with personalized templates to build resumes that get noticed by hiring managers.",
    icon: (
      <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h6l6 6v10a2 2 0 01-2 2z" />
      </svg>
    ),
    stats: "10+ Templates"
  },
  {
    title: "AI-Powered Suggestions",
    desc: "Get smart tips to improve your resume phrasing and highlight your best skills with cutting-edge AI.",
    icon: (
      <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    stats: "95% Accuracy"
  },
  {
    title: "Real-Time Collaboration",
    desc: "Work together with friends, mentors, or career coaches to build the perfect resume in real-time.",
    icon: (
      <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    stats: "Live Editing"
  },
  {
    title: "Multiple Export Formats",
    desc: "Download your resume in PDF, Word, or plain text format with one click and share instantly.",
    icon: (
      <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    stats: "3 Formats"
  },
];

const additionalFeatures = [
  {
    title: "Cover Letter Builder",
    desc: "Create matching cover letters that complement your resume perfectly.",
    icon: "📄"
  },
  {
    title: "ATS Optimization",
    desc: "Ensure your resume passes Applicant Tracking Systems with our optimization tools.",
    icon: "🎯"
  },
  {
    title: "LinkedIn Integration",
    desc: "Import your LinkedIn profile data directly into your resume with one click.",
    icon: "💼"
  },
  {
    title: "Skill Assessment",
    desc: "Take our quiz to identify and highlight your strongest skills effectively.",
    icon: "🧠"
  },
  {
    title: "Version Control",
    desc: "Keep track of different resume versions and revert to previous ones easily.",
    icon: "🔄"
  },
  {
    title: "Analytics Dashboard",
    desc: "Track how many times your resume has been viewed and downloaded.",
    icon: "📊"
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Engineer",
    company: "Google",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b1b1?w=150&h=150&fit=crop&crop=face",
    text: "Got my dream job at Google within 3 weeks! The AI suggestions were spot-on.",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Product Manager",
    company: "Microsoft",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    text: "The collaboration feature helped me get feedback from 5 industry experts.",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "Data Scientist",
    company: "Netflix",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    text: "ATS optimization feature got my resume through every screening process.",
    rating: 5
  }
];

const stats = [
  { number: "50K+", label: "Resumes Created", icon: "📄" },
  { number: "95%", label: "Success Rate", icon: "✅" },
  { number: "500+", label: "Companies Hiring", icon: "🏢" },
  { number: "24/7", label: "Support Available", icon: "🎧" },
];

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                ResumeAI
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/login" className="text-gray-600 hover:text-emerald-600 transition-colors">Login</Link>
              <Link
                to="/signup"
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-2 rounded-full font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 space-y-8">
            <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span>✨ AI-Powered Resume Building</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight">
              Build Your{' '}
              <span className="bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
                Perfect Resume
              </span>{' '}
              in Minutes
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
              Create stunning, ATS-optimized resumes with our AI-powered platform. Get personalized suggestions, 
              collaborate in real-time, and land your dream job faster than ever before.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/signup"
                className="group bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-emerald-600 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center space-x-2"
              >
                <span>Start Building Now</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                to="/demo"
                className="border-2 border-emerald-500 text-emerald-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-emerald-50 transition-all flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Watch Demo</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Free to start</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>ATS optimized</span>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-2xl blur-2xl opacity-20 animate-pulse"></div>
              <img
                src="https://cdn.dribbble.com/users/648/screenshots/15086874/media/3aa53bf0a786779edb9b0983d9882f4d.png"
                alt="AI-powered resume builder interface showing professional templates"
                className="relative w-full rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-500 transform hover:scale-105"
              />
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-6 -left-6 bg-white rounded-xl shadow-lg p-4 animate-bounce">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">AI Writing</span>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4 animate-bounce delay-150">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Live Preview</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="bg-white py-12 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">{stat.icon}</div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Features That{' '}
            <span className="bg-gradient-to-r from-emerald-500 to-blue-600 bg-clip-text text-transparent">
              Empower You
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive suite of AI-powered tools helps you create resumes that stand out 
            and get you hired faster than traditional resume builders.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`group bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer hover:-translate-y-2 border border-gray-100 ${
                isVisible.features ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <div className="inline-block bg-gradient-to-r from-emerald-100 to-blue-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                {feature.stats}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-emerald-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Even More Powerful Features</h2>
            <p className="text-xl text-gray-600">Everything you need to create the perfect resume and land your dream job</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 group">
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600">See how ResumeAI helped professionals land their dream jobs</p>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-8 md:p-12 shadow-xl">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-24 h-24 rounded-full object-cover shadow-lg"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex justify-center md:justify-start mb-4">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="text-xl text-gray-700 mb-6 italic">
                    "{testimonials[currentTestimonial].text}"
                  </blockquote>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonials[currentTestimonial].name}</div>
                    <div className="text-gray-600">
                      {testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Testimonial indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial ? 'bg-emerald-500 w-8' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-6 text-white">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto leading-relaxed">
            Join over 50,000 professionals who've successfully created winning resumes with ResumeAI. 
            Start building your future today with our AI-powered platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/resume-builder"
              className="group bg-white text-emerald-600 px-10 py-4 rounded-full font-bold text-xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl flex items-center space-x-3"
            >
              <span>Start Building Now</span>
              <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            
            <div className="text-white/90 text-sm">
              <div>✨ No credit card required</div>
              <div>🚀 Start in under 30 seconds</div>
            </div>
          </div>
          
          <div className="mt-12 flex justify-center items-center space-x-8 text-white/70">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">R</span>
                </div>
                <span className="text-2xl font-bold">ResumeAI</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                The AI-powered resume builder that helps professionals create winning resumes 
                and land their dream jobs faster.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.1.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.162-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Product</h4>
              <div className="space-y-2 text-gray-400">
                <Link to="/resume-builder" className="block hover:text-white transition-colors">Resume Builder</Link>
                <Link to="/cover-letter" className="block hover:text-white transition-colors">Cover Letter Builder</Link>
                <Link to="/templates" className="block hover:text-white transition-colors">Templates</Link>
                <Link to="/ai-writing" className="block hover:text-white transition-colors">AI Writing Assistant</Link>
                <Link to="/ats-checker" className="block hover:text-white transition-colors">ATS Checker</Link>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Resources</h4>
              <div className="space-y-2 text-gray-400">
                <Link to="/blog" className="block hover:text-white transition-colors">Career Blog</Link>
                <Link to="/resume-examples" className="block hover:text-white transition-colors">Resume Examples</Link>
                <Link to="/career-advice" className="block hover:text-white transition-colors">Career Advice</Link>
                <Link to="/interview-tips" className="block hover:text-white transition-colors">Interview Tips</Link>
                <Link to="/salary-guide" className="block hover:text-white transition-colors">Salary Guide</Link>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Support</h4>
              <div className="space-y-2 text-gray-400">
                <Link to="/help" className="block hover:text-white transition-colors">Help Center</Link>
                <Link to="/contact" className="block hover:text-white transition-colors">Contact Support</Link>
                <Link to="/privacy" className="block hover:text-white transition-colors">Privacy Policy</Link>
                <Link to="/terms" className="block hover:text-white transition-colors">Terms of Service</Link>
                <Link to="/pricing" className="block hover:text-white transition-colors">Pricing</Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; 2024 ResumeAI. All rights reserved. Built with ❤️ for job seekers worldwide.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">Trusted by 50K+ professionals</span>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-gray-400 text-sm ml-1">4.9/5</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}