import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { X, CheckCircle, Circle, Star, Trophy } from 'lucide-react';

const SkillAssessment = ({ onClose, onSkillsSelected }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [recommendedSkills, setRecommendedSkills] = useState([]);

  const questions = [
    {
      id: 1,
      category: 'Programming Languages',
      question: 'Which programming languages are you proficient in?',
      type: 'multiple',
      options: [
        'JavaScript', 'Python', 'Java', 'C++', 'C#', 'Go', 
        'Rust', 'PHP', 'Ruby', 'Swift', 'Kotlin', 'TypeScript'
      ]
    },
    {
      id: 2,
      category: 'Web Development',
      question: 'What web development technologies do you know?',
      type: 'multiple',
      options: [
        'React', 'Vue.js', 'Angular', 'Node.js', 'Express.js', 
        'Django', 'Flask', 'Laravel', 'Next.js', 'Nuxt.js'
      ]
    },
    {
      id: 3,
      category: 'Database & Storage',
      question: 'Which databases and storage solutions have you worked with?',
      type: 'multiple',
      options: [
        'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQLite', 
        'DynamoDB', 'Firebase', 'Elasticsearch', 'Cassandra'
      ]
    },
    {
      id: 4,
      category: 'Cloud & DevOps',
      question: 'What cloud and DevOps tools do you use?',
      type: 'multiple',
      options: [
        'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 
        'Jenkins', 'GitHub Actions', 'Terraform', 'Ansible'
      ]
    },
    {
      id: 5,
      category: 'Design & UI/UX',
      question: 'Which design and UI/UX tools are you familiar with?',
      type: 'multiple',
      options: [
        'Figma', 'Adobe XD', 'Sketch', 'Photoshop', 'Illustrator', 
        'Tailwind CSS', 'Bootstrap', 'Material-UI', 'Styled Components'
      ]
    }
  ];

  const handleAnswerSelect = (option) => {
    const questionId = questions[currentQuestion].id;
    const currentAnswers = answers[questionId] || [];
    
    if (currentAnswers.includes(option)) {
      setAnswers({
        ...answers,
        [questionId]: currentAnswers.filter(answer => answer !== option)
      });
    } else {
      setAnswers({
        ...answers,
        [questionId]: [...currentAnswers, option]
      });
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = () => {
    const allSelectedSkills = Object.values(answers).flat();
    
    // Add some suggested skills based on selected ones
    const suggestions = [];
    
    if (allSelectedSkills.includes('JavaScript')) {
      suggestions.push('ES6+', 'DOM Manipulation', 'AJAX');
    }
    if (allSelectedSkills.includes('React')) {
      suggestions.push('JSX', 'React Hooks', 'Redux', 'Context API');
    }
    if (allSelectedSkills.includes('Node.js')) {
      suggestions.push('RESTful APIs', 'Express.js', 'NPM');
    }
    if (allSelectedSkills.includes('Python')) {
      suggestions.push('Django', 'Flask', 'Pandas', 'NumPy');
    }
    if (allSelectedSkills.includes('AWS')) {
      suggestions.push('EC2', 'S3', 'Lambda', 'RDS');
    }
    
    setRecommendedSkills([...allSelectedSkills, ...suggestions]);
    setShowResults(true);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <Card className="glass max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="w-6 h-6 text-warning" />
                <span>Skill Assessment Results</span>
              </CardTitle>
              <Button variant="outline" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-full mb-4">
                <Star className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Assessment Complete!</h3>
              <p className="text-muted-foreground">
                Based on your responses, we've identified {recommendedSkills.length} skills for your resume.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Recommended Skills:</h4>
              <div className="flex flex-wrap gap-2">
                {recommendedSkills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {questions.map((question, index) => {
                const questionAnswers = answers[question.id] || [];
                return (
                  <Card key={question.id} className="p-4">
                    <h5 className="font-medium text-sm text-primary mb-2">
                      {question.category}
                    </h5>
                    <div className="flex flex-wrap gap-1">
                      {questionAnswers.map((answer, answerIndex) => (
                        <Badge key={answerIndex} variant="outline" className="text-xs">
                          {answer}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="flex space-x-3">
              <Button
                onClick={() => onSkillsSelected(recommendedSkills)}
                className="flex-1 btn-gradient text-white"
              >
                Add Skills to Resume
              </Button>
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Close
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const currentAnswers = answers[question.id] || [];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="glass max-w-2xl w-full">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Skill Assessment</CardTitle>
            <Button variant="outline" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">{question.category}</h3>
            <p className="text-muted-foreground">{question.question}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {question.options.map((option, index) => {
              const isSelected = currentAnswers.includes(option);
              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  className={`
                    p-3 text-sm border rounded-lg transition-all duration-200 text-left
                    ${isSelected 
                      ? 'bg-primary text-primary-foreground border-primary shadow-md' 
                      : 'hover:bg-muted border-border hover:border-primary/50'
                    }
                  `}
                >
                  <div className="flex items-center space-x-2">
                    {isSelected ? (
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 flex-shrink-0" />
                    )}
                    <span className="truncate">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {currentAnswers.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">Selected ({currentAnswers.length}):</p>
              <div className="flex flex-wrap gap-2">
                {currentAnswers.map((answer, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {answer}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={previousQuestion}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            <Button
              onClick={nextQuestion}
              className="bg-primary hover:bg-primary-hover"
              disabled={currentAnswers.length === 0}
            >
              {currentQuestion === questions.length - 1 ? 'Complete Assessment' : 'Next Question'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillAssessment;