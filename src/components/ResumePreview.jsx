import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Globe,
  Calendar,
  Building,
  GraduationCap
} from 'lucide-react';

const ResumePreview = ({ data }) => {
  const downloadPDF = () => {
    window.print();
  };

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <Card className="glass card-hover overflow-hidden">
      <div className="bg-gradient-primary p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">{data.personalInfo.name || 'Your Name'}</h1>
            <p className="text-lg opacity-90 mb-4">Professional Resume</p>
          </div>
          <Button
            onClick={downloadPDF}
            variant="outline"
            size="sm"
            className="border-white text-white hover:bg-white hover:text-primary"
          >
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-4 text-sm">
          {data.personalInfo.email && (
            <div className="flex items-center space-x-1">
              <Mail className="w-4 h-4" />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center space-x-1">
              <Phone className="w-4 h-4" />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.address && (
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{data.personalInfo.address}</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-3 mt-4">
          {data.personalInfo.linkedin && (
            <a 
              href={data.personalInfo.linkedin} 
              className="flex items-center space-x-1 hover:underline"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          )}
          {data.personalInfo.github && (
            <a 
              href={data.personalInfo.github} 
              className="flex items-center space-x-1 hover:underline"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          )}
          {data.personalInfo.portfolio && (
            <a 
              href={data.personalInfo.portfolio} 
              className="flex items-center space-x-1 hover:underline"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Globe className="w-4 h-4" />
              <span>Portfolio</span>
            </a>
          )}
        </div>
      </div>

      <CardContent className="p-6 space-y-8">
        {/* Work Experience */}
        {data.workExperience.some(exp => exp.company) && (
          <section>
            <h2 className="text-xl font-bold text-primary mb-4 flex items-center">
              <Building className="w-5 h-5 mr-2" />
              Work Experience
            </h2>
            
            <div className="space-y-6">
              {data.workExperience.filter(exp => exp.company).map((exp, index) => (
                <div key={index} className="border-l-2 border-primary pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{exp.position}</h3>
                      <p className="text-muted-foreground font-medium">{exp.company}</p>
                      {exp.location && (
                        <p className="text-sm text-muted-foreground flex items-center mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          {exp.location}
                        </p>
                      )}
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </div>
                    </div>
                  </div>
                  
                  {exp.description && (
                    <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education.some(edu => edu.institution) && (
          <section>
            <h2 className="text-xl font-bold text-primary mb-4 flex items-center">
              <GraduationCap className="w-5 h-5 mr-2" />
              Education
            </h2>
            
            <div className="space-y-4">
              {data.education.filter(edu => edu.institution).map((edu, index) => (
                <div key={index} className="border-l-2 border-secondary pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {edu.degree} {edu.field && `in ${edu.field}`}
                      </h3>
                      <p className="text-muted-foreground font-medium">{edu.institution}</p>
                      {edu.location && (
                        <p className="text-sm text-muted-foreground flex items-center mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          {edu.location}
                        </p>
                      )}
                      {edu.gpa && (
                        <p className="text-sm text-muted-foreground mt-1">
                          GPA: {edu.gpa}
                        </p>
                      )}
                      {edu.honors && (
                        <p className="text-sm text-accent font-medium mt-1">
                          {edu.honors}
                        </p>
                      )}
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {Object.values(data.skills).some(skillArr => skillArr.length > 0) && (
          <section>
            <h2 className="text-xl font-bold text-primary mb-4">Skills</h2>
            
            <div className="space-y-4">
              {Object.entries(data.skills).map(([category, skills]) => {
                if (skills.length === 0) return null;
                
                return (
                  <div key={category}>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                      {category} Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects.some(project => project.title) && (
          <section>
            <h2 className="text-xl font-bold text-primary mb-4">Projects</h2>
            
            <div className="space-y-6">
              {data.projects.filter(project => project.title).map((project, index) => (
                <div key={index} className="border-l-2 border-accent pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
                    <div className="flex space-x-2">
                      {project.githubLink && (
                        <a 
                          href={project.githubLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.liveLink && (
                        <a 
                          href={project.liveLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary"
                        >
                          <Globe className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  {project.description && (
                    <p className="text-muted-foreground text-sm leading-relaxed mb-2">
                      {project.description}
                    </p>
                  )}
                  
                  {project.techStack && project.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.techStack.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {data.certifications.some(cert => cert.name) && (
          <section>
            <h2 className="text-xl font-bold text-primary mb-4">Certifications</h2>
            
            <div className="space-y-3">
              {data.certifications.filter(cert => cert.name).map((cert, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-foreground">{cert.name}</h3>
                    <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    {cert.date && formatDate(cert.date)}
                    {cert.expiryDate && (
                      <div className="text-xs">
                        Expires: {formatDate(cert.expiryDate)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </CardContent>
    </Card>
  );
};

export default ResumePreview;