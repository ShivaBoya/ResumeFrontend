import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Templates = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [liveStats, setLiveStats] = useState({
    totalDownloads: 15234,
    activeUsers: 89,
    templatesUsed: 1247
  });

  // Simulate real-time stats updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        totalDownloads: prev.totalDownloads + Math.floor(Math.random() * 5),
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 3) - 1,
        templatesUsed: prev.templatesUsed + Math.floor(Math.random() * 3)
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const categories = [
    { id: "all", name: "All Templates", count: 24, icon: "📋" },
    { id: "modern", name: "Modern", count: 8, icon: "✨" },
    { id: "creative", name: "Creative", count: 6, icon: "🎨" },
    { id: "professional", name: "Professional", count: 5, icon: "💼" },
    { id: "minimal", name: "Minimal", count: 3, icon: "🎯" },
    { id: "academic", name: "Academic", count: 2, icon: "🎓" }
  ];

  const templates = [
    {
      id: 1,
      name: "Modern Professional",
      category: "modern",
      popularity: 98,
      downloads: 12543,
      rating: 4.9,
      preview: "/api/placeholder/300/400",
      color: "from-blue-500 to-cyan-500",
      features: ["ATS Friendly", "Clean Layout", "Color Customizable"],
      description: "Perfect for tech professionals and startups"
    },
    {
      id: 2,
      name: "Creative Designer",
      category: "creative",
      popularity: 95,
      downloads: 8932,
      rating: 4.8,
      preview: "/api/placeholder/300/400",
      color: "from-purple-500 to-pink-500",
      features: ["Portfolio Section", "Visual Elements", "Custom Colors"],
      description: "Ideal for designers and creative professionals"
    },
    {
      id: 3,
      name: "Executive Elite",
      category: "professional",
      popularity: 92,
      downloads: 15678,
      rating: 4.9,
      preview: "/api/placeholder/300/400",
      color: "from-gray-700 to-gray-900",
      features: ["Executive Summary", "Achievement Focus", "Premium Layout"],
      description: "For C-level executives and senior management"
    },
    {
      id: 4,
      name: "Tech Innovator",
      category: "modern",
      popularity: 89,
      downloads: 9876,
      rating: 4.7,
      preview: "/api/placeholder/300/400",
      color: "from-green-500 to-teal-500",
      features: ["Skills Matrix", "Project Showcase", "Tech Stack"],
      description: "Perfect for software engineers and developers"
    },
    {
      id: 5,
      name: "Minimal Clean",
      category: "minimal",
      popularity: 87,
      downloads: 7234,
      rating: 4.6,
      preview: "/api/placeholder/300/400",
      color: "from-slate-600 to-slate-800",
      features: ["Clean Typography", "Space Efficient", "Easy to Read"],
      description: "Minimalist design for any profession"
    },
    {
      id: 6,
      name: "Academic Scholar",
      category: "academic",
      popularity: 85,
      downloads: 4567,
      rating: 4.8,
      preview: "/api/placeholder/300/400",
      color: "from-indigo-600 to-blue-700",
      features: ["Publication List", "Research Focus", "Academic Format"],
      description: "Designed for researchers and academics"
    },
    {
      id: 7,
      name: "Startup Founder",
      category: "creative",
      popularity: 91,
      downloads: 6789,
      rating: 4.7,
      preview: "/api/placeholder/300/400",
      color: "from-orange-500 to-red-500",
      features: ["Startup Experience", "Leadership Focus", "Vision Statement"],
      description: "For entrepreneurs and startup professionals"
    },
    {
      id: 8,
      name: "Sales Pro",
      category: "professional",
      popularity: 88,
      downloads: 8901,
      rating: 4.6,
      preview: "/api/placeholder/300/400",
      color: "from-emerald-500 to-green-600",
      features: ["Achievement Metrics", "Sales Numbers", "Client Results"],
      description: "Optimized for sales professionals"
    }
  ];

  const trendingTemplates = [
    { name: "Modern Professional", uses: "+23% this week", trend: "up" },
    { name: "Creative Designer", uses: "+18% this week", trend: "up" },
    { name: "Tech Innovator", uses: "+15% this week", trend: "up" },
    { name: "Executive Elite", uses: "+12% this week", trend: "up" }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handlePreview = (template) => {
    setPreviewTemplate(template);
  };

  const closePreview = () => {
    setPreviewTemplate(null);
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Header Section */}
      <section className="bg-gradient-primary/10 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 animate-slide-down">
            <h1 className="text-5xl font-bold text-foreground mb-4">
              Choose Your Perfect
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                Resume Template
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover professionally designed templates crafted by experts. 
              Each template is ATS-friendly and fully customizable to match your unique style.
            </p>
          </div>

          {/* Live Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 text-center animate-scale-in">
              <div className="text-2xl font-bold text-foreground">{liveStats.totalDownloads.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Downloads</div>
              <div className="flex items-center justify-center gap-1 mt-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-xs text-success">Live</span>
              </div>
            </div>
            <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 text-center animate-scale-in" style={{animationDelay: '100ms'}}>
              <div className="text-2xl font-bold text-foreground">{liveStats.activeUsers}</div>
              <div className="text-sm text-muted-foreground">Active Users Now</div>
              <div className="flex items-center justify-center gap-1 mt-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{animationDelay: '500ms'}}></div>
                <span className="text-xs text-accent">Online</span>
              </div>
            </div>
            <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 text-center animate-scale-in" style={{animationDelay: '200ms'}}>
              <div className="text-2xl font-bold text-foreground">{liveStats.templatesUsed.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Used Today</div>
              <div className="flex items-center justify-center gap-1 mt-2">
                <div className="w-2 h-2 bg-warning rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                <span className="text-xs text-warning">Growing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <div className="bg-card rounded-xl p-6 shadow-soft animate-slide-up">
              <h3 className="font-semibold text-foreground mb-4">Search Templates</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name or style..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-muted rounded-lg border border-border focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                <div className="absolute left-3 top-3.5 text-muted-foreground">
                  🔍
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-card rounded-xl p-6 shadow-soft animate-slide-up" style={{animationDelay: '100ms'}}>
              <h3 className="font-semibold text-foreground mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                      selectedCategory === category.id
                        ? "bg-primary text-primary-foreground shadow-soft"
                        : "hover:bg-muted text-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{category.icon}</span>
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <span className="text-sm opacity-75">{category.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Trending */}
            <div className="bg-card rounded-xl p-6 shadow-soft animate-slide-up" style={{animationDelay: '200ms'}}>
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                🔥 Trending This Week
              </h3>
              <div className="space-y-3">
                {trendingTemplates.map((template, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <div>
                      <div className="font-medium text-sm text-foreground">{template.name}</div>
                      <div className="text-xs text-success flex items-center gap-1">
                        📈 {template.uses}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Templates Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                {selectedCategory === "all" ? "All Templates" : categories.find(c => c.id === selectedCategory)?.name} 
                <span className="text-muted-foreground ml-2">({filteredTemplates.length})</span>
              </h2>
              <div className="flex items-center gap-4">
                <select className="bg-card border border-border rounded-lg px-4 py-2 text-foreground">
                  <option>Most Popular</option>
                  <option>Newest First</option>
                  <option>Highest Rated</option>
                  <option>Most Downloaded</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTemplates.map((template, idx) => (
                <div
                  key={template.id}
                  className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-strong transition-all duration-500 animate-scale-in cursor-pointer"
                  style={{animationDelay: `${idx * 50}ms`}}
                >
                  {/* Template Preview */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-20`}></div>
                    <img 
                      src={template.preview} 
                      alt={template.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Overlay Actions */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-3">
                        <button
                          onClick={() => handlePreview(template)}
                          className="bg-white/90 text-foreground px-4 py-2 rounded-lg font-semibold hover:bg-white transition-colors"
                        >
                          👁️ Preview
                        </button>
                        <Link
                          to={`/resume-builder?template=${template.id}`}
                          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                        >
                          ✨ Use Template
                        </Link>
                      </div>
                    </div>

                    {/* Popular Badge */}
                    {template.popularity > 90 && (
                      <div className="absolute top-3 right-3 bg-gradient-primary text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                        🔥 Hot
                      </div>
                    )}
                  </div>

                  {/* Template Info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {template.name}
                      </h3>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">⭐</span>
                        <span className="text-sm font-semibold text-foreground">{template.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {template.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {template.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <span className="text-muted-foreground">
                          📥 {template.downloads.toLocaleString()}
                        </span>
                        <span className="text-success">
                          📊 {template.popularity}% match
                        </span>
                      </div>
                      <Link
                        to={`/resume-builder?template=${template.id}`}
                        className="bg-gradient-primary text-white px-4 py-2 rounded-lg font-semibold hover:shadow-medium transition-all transform hover:scale-105"
                      >
                        Select
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredTemplates.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No templates found</h3>
                <p className="text-muted-foreground">Try adjusting your search or category filters</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-scale-in">
          <div className="bg-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-strong">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h3 className="text-xl font-bold text-foreground">{previewTemplate.name}</h3>
                <p className="text-muted-foreground">{previewTemplate.description}</p>
              </div>
              <button
                onClick={closePreview}
                className="w-10 h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <img 
                    src={previewTemplate.preview} 
                    alt={previewTemplate.name}
                    className="w-full rounded-lg shadow-medium"
                  />
                </div>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Template Features</h4>
                    <div className="space-y-2">
                      {previewTemplate.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="text-success">✓</span>
                          <span className="text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Template Stats</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Rating</span>
                        <span className="text-foreground font-semibold">⭐ {previewTemplate.rating}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Downloads</span>
                        <span className="text-foreground font-semibold">{previewTemplate.downloads.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Popularity</span>
                        <span className="text-success font-semibold">{previewTemplate.popularity}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Link
                      to={`/resume-builder?template=${previewTemplate.id}`}
                      className="flex-1 bg-gradient-primary text-white py-3 rounded-lg font-semibold text-center hover:shadow-medium transition-all transform hover:scale-105"
                    >
                      Use This Template
                    </Link>
                    <button className="px-6 py-3 border border-border rounded-lg font-semibold text-foreground hover:bg-muted transition-colors">
                      Save for Later
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <section className="bg-gradient-secondary py-16 mt-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h3 className="text-3xl font-bold text-black mb-4">
            Can't Find the Perfect Template?
          </h3>
          <p className="text-black/80 text-lg mb-8">
            Our AI-powered custom template generator can create a unique design just for you based on your industry and preferences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gray-100 text-primary px-8 py-3 rounded-lg font-semibold hover:shadow-medium transition-all transform hover:scale-105">
              🤖 Generate Custom Template
            </button>
            <Link
              to="/resume-builder"
              className="bg-black/10 border border-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all"
            >
              Start from Scratch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Templates;