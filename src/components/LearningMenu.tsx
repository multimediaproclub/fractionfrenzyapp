import React, { useState } from 'react';
import { ArrowLeft, Play, BookOpen, Lightbulb, CheckCircle, ExternalLink } from 'lucide-react';

interface LearningMenuProps {
  onBack: () => void;
}

interface Topic {
  id: string;
  title: string;
  description: string;
  examples: {
    problem: string;
    solution: string[];
    answer: string;
  }[];
  videoReferences: {
    title: string;
    description: string;
    searchTerms: string;
    platform: string;
  }[];
}

const LearningMenu: React.FC<LearningMenuProps> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const categories = {
    addition: {
      title: 'Fraction Addition',
      color: 'from-blue-500 to-purple-600',
      topics: {
        'similar-fractions': {
          id: 'similar-fractions',
          title: 'Similar Fractions (Same Denominators)',
          description: 'When fractions have the same denominator, we simply add the numerators and keep the denominator unchanged.',
          examples: [
            {
              problem: '2/5 + 1/5',
              solution: [
                'Both fractions have the same denominator: 5',
                'Add the numerators: 2 + 1 = 3',
                'Keep the same denominator: 5',
                'Result: 3/5'
              ],
              answer: '3/5'
            },
            {
              problem: '3/8 + 2/8',
              solution: [
                'Both fractions have the same denominator: 8',
                'Add the numerators: 3 + 2 = 5',
                'Keep the same denominator: 8',
                'Result: 5/8'
              ],
              answer: '5/8'
            }
          ],
          videoReferences: [
            {
              title: 'Adding Fractions with Same Denominators',
              description: 'Learn the basics of adding fractions when denominators are the same',
              searchTerms: 'adding fractions same denominator tutorial',
              platform: 'Khan Academy / YouTube'
            },
            {
              title: 'Similar Fractions Addition Practice',
              description: 'Step-by-step examples and practice problems',
              searchTerms: 'similar fractions addition examples',
              platform: 'Math Antics / YouTube'
            }
          ]
        },
        'dissimilar-fractions': {
          id: 'dissimilar-fractions',
          title: 'Dissimilar Fractions (Different Denominators)',
          description: 'When fractions have different denominators, we must find a common denominator before adding.',
          examples: [
            {
              problem: '1/3 + 1/4',
              solution: [
                'Find the LCD of 3 and 4: LCD = 12',
                'Convert 1/3 to twelfths: 1/3 = 4/12',
                'Convert 1/4 to twelfths: 1/4 = 3/12',
                'Add: 4/12 + 3/12 = 7/12'
              ],
              answer: '7/12'
            },
            {
              problem: '2/5 + 1/6',
              solution: [
                'Find the LCD of 5 and 6: LCD = 30',
                'Convert 2/5 to thirtieths: 2/5 = 12/30',
                'Convert 1/6 to thirtieths: 1/6 = 5/30',
                'Add: 12/30 + 5/30 = 17/30'
              ],
              answer: '17/30'
            }
          ],
          videoReferences: [
            {
              title: 'Adding Fractions with Different Denominators',
              description: 'Master finding common denominators and adding unlike fractions',
              searchTerms: 'adding fractions different denominators LCD',
              platform: 'Khan Academy / YouTube'
            },
            {
              title: 'Least Common Denominator Method',
              description: 'Learn efficient methods for finding LCD',
              searchTerms: 'least common denominator fractions tutorial',
              platform: 'Professor Dave Explains / YouTube'
            }
          ]
        },
        'mixed-numbers': {
          id: 'mixed-numbers',
          title: 'Mixed Numbers',
          description: 'Convert mixed numbers to improper fractions, add them, then convert back if needed.',
          examples: [
            {
              problem: '1 1/2 + 2 1/3',
              solution: [
                'Convert 1 1/2 to improper: (1×2+1)/2 = 3/2',
                'Convert 2 1/3 to improper: (2×3+1)/3 = 7/3',
                'Find LCD of 2 and 3: LCD = 6',
                'Convert: 3/2 = 9/6 and 7/3 = 14/6',
                'Add: 9/6 + 14/6 = 23/6',
                'Convert back: 23/6 = 3 5/6'
              ],
              answer: '3 5/6'
            }
          ],
          videoReferences: [
            {
              title: 'Adding Mixed Numbers',
              description: 'Complete guide to adding mixed numbers with different methods',
              searchTerms: 'adding mixed numbers tutorial step by step',
              platform: 'Khan Academy / YouTube'
            },
            {
              title: 'Mixed Numbers to Improper Fractions',
              description: 'Learn conversion techniques for mixed numbers',
              searchTerms: 'convert mixed numbers improper fractions',
              platform: 'Math Antics / YouTube'
            }
          ]
        }
      }
    },
    subtraction: {
      title: 'Fraction Subtraction',
      color: 'from-green-500 to-blue-500',
      topics: {
        'similar-fractions': {
          id: 'similar-fractions',
          title: 'Similar Fractions (Same Denominators)',
          description: 'When fractions have the same denominator, subtract the numerators and keep the denominator unchanged.',
          examples: [
            {
              problem: '4/7 - 2/7',
              solution: [
                'Both fractions have the same denominator: 7',
                'Subtract the numerators: 4 - 2 = 2',
                'Keep the same denominator: 7',
                'Result: 2/7'
              ],
              answer: '2/7'
            },
            {
              problem: '5/6 - 1/6',
              solution: [
                'Both fractions have the same denominator: 6',
                'Subtract the numerators: 5 - 1 = 4',
                'Keep the same denominator: 6',
                'Simplify: 4/6 = 2/3'
              ],
              answer: '2/3'
            }
          ],
          videoReferences: [
            {
              title: 'Subtracting Fractions with Same Denominators',
              description: 'Basic subtraction of fractions with like denominators',
              searchTerms: 'subtracting fractions same denominator',
              platform: 'Khan Academy / YouTube'
            }
          ]
        },
        'dissimilar-fractions': {
          id: 'dissimilar-fractions',
          title: 'Dissimilar Fractions (Different Denominators)',
          description: 'Find a common denominator before subtracting fractions with different denominators.',
          examples: [
            {
              problem: '3/4 - 1/3',
              solution: [
                'Find the LCD of 4 and 3: LCD = 12',
                'Convert 3/4 to twelfths: 3/4 = 9/12',
                'Convert 1/3 to twelfths: 1/3 = 4/12',
                'Subtract: 9/12 - 4/12 = 5/12'
              ],
              answer: '5/12'
            }
          ],
          videoReferences: [
            {
              title: 'Subtracting Fractions with Different Denominators',
              description: 'Learn to subtract unlike fractions using common denominators',
              searchTerms: 'subtracting fractions different denominators',
              platform: 'Math Antics / YouTube'
            }
          ]
        },
        'mixed-numbers': {
          id: 'mixed-numbers',
          title: 'Mixed Numbers',
          description: 'Convert mixed numbers to improper fractions, subtract, then convert back if needed.',
          examples: [
            {
              problem: '3 1/2 - 1 1/4',
              solution: [
                'Convert 3 1/2 to improper: (3×2+1)/2 = 7/2',
                'Convert 1 1/4 to improper: (1×4+1)/4 = 5/4',
                'Find LCD of 2 and 4: LCD = 4',
                'Convert: 7/2 = 14/4',
                'Subtract: 14/4 - 5/4 = 9/4',
                'Convert back: 9/4 = 2 1/4'
              ],
              answer: '2 1/4'
            }
          ],
          videoReferences: [
            {
              title: 'Subtracting Mixed Numbers',
              description: 'Complete guide to subtracting mixed numbers',
              searchTerms: 'subtracting mixed numbers tutorial',
              platform: 'Khan Academy / YouTube'
            }
          ]
        }
      }
    },
    multiplication: {
      title: 'Fraction Multiplication',
      color: 'from-orange-500 to-red-500',
      topics: {
        'proper-improper': {
          id: 'proper-improper',
          title: 'Proper and Improper Fractions',
          description: 'Multiply fractions by multiplying numerators together and denominators together.',
          examples: [
            {
              problem: '2/3 × 3/4',
              solution: [
                'Multiply numerators: 2 × 3 = 6',
                'Multiply denominators: 3 × 4 = 12',
                'Result: 6/12',
                'Simplify: 6/12 = 1/2'
              ],
              answer: '1/2'
            },
            {
              problem: '5/2 × 3/5',
              solution: [
                'Multiply numerators: 5 × 3 = 15',
                'Multiply denominators: 2 × 5 = 10',
                'Result: 15/10',
                'Simplify: 15/10 = 3/2 = 1 1/2'
              ],
              answer: '1 1/2'
            }
          ],
          videoReferences: [
            {
              title: 'Multiplying Fractions',
              description: 'Learn the basic rules for multiplying fractions',
              searchTerms: 'multiplying fractions tutorial',
              platform: 'Khan Academy / YouTube'
            },
            {
              title: 'Proper and Improper Fraction Multiplication',
              description: 'Practice with different types of fractions',
              searchTerms: 'multiplying proper improper fractions',
              platform: 'Math Antics / YouTube'
            }
          ]
        },
        'whole-mixed': {
          id: 'whole-mixed',
          title: 'Whole Numbers and Mixed Numbers',
          description: 'Convert mixed numbers to improper fractions, then multiply. Whole numbers can be written as fractions.',
          examples: [
            {
              problem: '3 × 2/5',
              solution: [
                'Write whole number as fraction: 3 = 3/1',
                'Multiply: 3/1 × 2/5',
                'Multiply numerators: 3 × 2 = 6',
                'Multiply denominators: 1 × 5 = 5',
                'Result: 6/5 = 1 1/5'
              ],
              answer: '1 1/5'
            },
            {
              problem: '2 1/3 × 1 1/2',
              solution: [
                'Convert 2 1/3 to improper: 7/3',
                'Convert 1 1/2 to improper: 3/2',
                'Multiply: 7/3 × 3/2 = 21/6',
                'Simplify: 21/6 = 7/2 = 3 1/2'
              ],
              answer: '3 1/2'
            }
          ],
          videoReferences: [
            {
              title: 'Multiplying Mixed Numbers',
              description: 'Step-by-step guide to multiplying mixed numbers',
              searchTerms: 'multiplying mixed numbers tutorial',
              platform: 'Khan Academy / YouTube'
            },
            {
              title: 'Multiplying Whole Numbers and Fractions',
              description: 'Learn to multiply whole numbers with fractions',
              searchTerms: 'multiplying whole numbers fractions',
              platform: 'Professor Dave Explains / YouTube'
            }
          ]
        }
      }
    },
    division: {
      title: 'Fraction Division',
      color: 'from-purple-500 to-pink-500',
      topics: {
        'proper-improper': {
          id: 'proper-improper',
          title: 'Proper and Improper Fractions',
          description: 'To divide fractions, multiply by the reciprocal (flip the second fraction).',
          examples: [
            {
              problem: '2/3 ÷ 1/4',
              solution: [
                'Change division to multiplication by reciprocal',
                'Reciprocal of 1/4 is 4/1',
                'Calculate: 2/3 × 4/1',
                'Multiply: (2×4)/(3×1) = 8/3',
                'Convert: 8/3 = 2 2/3'
              ],
              answer: '2 2/3'
            },
            {
              problem: '5/2 ÷ 3/4',
              solution: [
                'Change to multiplication by reciprocal',
                'Reciprocal of 3/4 is 4/3',
                'Calculate: 5/2 × 4/3',
                'Multiply: (5×4)/(2×3) = 20/6',
                'Simplify: 20/6 = 10/3 = 3 1/3'
              ],
              answer: '3 1/3'
            }
          ],
          videoReferences: [
            {
              title: 'Dividing Fractions',
              description: 'Master the reciprocal method for dividing fractions',
              searchTerms: 'dividing fractions reciprocal method',
              platform: 'Khan Academy / YouTube'
            },
            {
              title: 'Why Do We Flip and Multiply?',
              description: 'Understand the reasoning behind the division rule',
              searchTerms: 'why flip multiply dividing fractions',
              platform: 'Math Antics / YouTube'
            }
          ]
        },
        'whole-mixed': {
          id: 'whole-mixed',
          title: 'Whole Numbers and Mixed Numbers',
          description: 'Convert to improper fractions, then use the reciprocal method for division.',
          examples: [
            {
              problem: '6 ÷ 2/3',
              solution: [
                'Write whole number as fraction: 6 = 6/1',
                'Change to multiplication by reciprocal',
                'Reciprocal of 2/3 is 3/2',
                'Calculate: 6/1 × 3/2 = 18/2 = 9'
              ],
              answer: '9'
            },
            {
              problem: '2 1/2 ÷ 1 1/4',
              solution: [
                'Convert 2 1/2 to improper: 5/2',
                'Convert 1 1/4 to improper: 5/4',
                'Change to multiplication: 5/2 × 4/5',
                'Multiply: (5×4)/(2×5) = 20/10 = 2'
              ],
              answer: '2'
            }
          ],
          videoReferences: [
            {
              title: 'Dividing Mixed Numbers',
              description: 'Complete guide to dividing mixed numbers',
              searchTerms: 'dividing mixed numbers tutorial',
              platform: 'Khan Academy / YouTube'
            },
            {
              title: 'Dividing Whole Numbers by Fractions',
              description: 'Learn to divide whole numbers by fractions',
              searchTerms: 'dividing whole numbers by fractions',
              platform: 'Professor Dave Explains / YouTube'
            }
          ]
        }
      }
    }
  };

  const handleVideoSearch = (searchTerms: string) => {
    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchTerms)}`;
    window.open(searchUrl, '_blank');
  };

  if (selectedTopic && selectedCategory) {
    const category = categories[selectedCategory as keyof typeof categories];
    const topic = category.topics[selectedTopic as keyof typeof category.topics];

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 mb-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setSelectedTopic(null)}
                className="flex items-center space-x-2 text-purple-300 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Topics</span>
              </button>
              <div className={`px-4 py-2 rounded-xl bg-gradient-to-r ${category.color} text-white font-semibold`}>
                {category.title}
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">{topic.title}</h1>
            <p className="text-purple-200">{topic.description}</p>
          </div>

          {/* Examples Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 mb-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
              <Lightbulb className="w-6 h-6 text-yellow-400" />
              <span>Worked Examples</span>
            </h2>
            
            <div className="space-y-6">
              {topic.examples.map((example, index) => (
                <div key={index} className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-2">
                      Example {index + 1}: {example.problem}
                    </h3>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-purple-200 mb-3">Step-by-Step Solution:</h4>
                      <div className="space-y-2">
                        {example.solution.map((step, stepIndex) => (
                          <div key={stepIndex} className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                              {stepIndex + 1}
                            </div>
                            <p className="text-purple-200">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-green-500/20 rounded-xl p-4 border border-green-500/30">
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <h4 className="text-lg font-semibold text-green-300">Final Answer</h4>
                      </div>
                      <p className="text-2xl font-bold text-green-200">{example.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Video References Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
              <Play className="w-6 h-6 text-red-400" />
              <span>Recommended Video Lessons</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {topic.videoReferences.map((video, index) => (
                <div key={index} className="bg-white/5 rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-200">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                      <Play className="w-6 h-6 text-red-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">{video.title}</h3>
                      <p className="text-purple-300 text-sm mb-2">{video.description}</p>
                      <p className="text-purple-400 text-xs mb-3">{video.platform}</p>
                      <button
                        onClick={() => handleVideoSearch(video.searchTerms)}
                        className="flex items-center space-x-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 px-3 py-2 rounded-lg text-sm transition-all duration-200"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Search on YouTube</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-blue-500/10 rounded-xl border border-blue-500/30">
              <p className="text-blue-200 text-sm">
                <strong>Note:</strong> These are suggested search terms for finding educational videos. 
                We recommend Khan Academy, Math Antics, and Professor Dave Explains for high-quality, 
                free educational content.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedCategory) {
    const category = categories[selectedCategory as keyof typeof categories];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 mb-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setSelectedCategory(null)}
                className="flex items-center space-x-2 text-purple-300 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Categories</span>
              </button>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">{category.title}</h1>
            <p className="text-purple-200">Choose a specific topic to learn about</p>
          </div>

          {/* Topics Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {Object.values(category.topics).map((topic) => (
              <div
                key={topic.id}
                onClick={() => setSelectedTopic(topic.id)}
                className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 hover:bg-white/20 cursor-pointer transition-all duration-300 hover:scale-105"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mb-4`}>
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{topic.title}</h3>
                <p className="text-purple-300 text-sm mb-4">{topic.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-purple-400 text-sm">
                    {topic.examples.length} examples • {topic.videoReferences.length} videos
                  </span>
                  <ArrowLeft className="w-4 h-4 text-purple-400 rotate-180" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 mb-8 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-purple-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Game</span>
            </button>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Fraction Learning Center</h1>
          <p className="text-purple-200 text-lg">Master fraction operations with detailed explanations and examples</p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {Object.entries(categories).map(([key, category]) => (
            <div
              key={key}
              onClick={() => setSelectedCategory(key)}
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/20 cursor-pointer transition-all duration-300 hover:scale-105"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mb-6`}>
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">{category.title}</h2>
              <p className="text-purple-300 mb-4">
                Learn about {Object.keys(category.topics).length} different types of {category.title.toLowerCase()}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-purple-400 text-sm">
                  {Object.values(category.topics).reduce((acc, topic) => acc + topic.examples.length, 0)} examples
                </span>
                <ArrowLeft className="w-5 h-5 text-purple-400 rotate-180" />
              </div>
            </div>
          ))}
        </div>

        {/* Learning Tips */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
            <Lightbulb className="w-6 h-6 text-yellow-400" />
            <span>Study Tips</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-purple-200">1. Start with Basics</h3>
              <p className="text-purple-300 text-sm">
                Begin with similar fractions before moving to dissimilar ones. Master the fundamentals first.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-purple-200">2. Practice Regularly</h3>
              <p className="text-purple-300 text-sm">
                Work through examples step-by-step. Understanding the process is more important than memorizing.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-purple-200">3. Use Visual Aids</h3>
              <p className="text-purple-300 text-sm">
                Watch the recommended videos to see visual representations of fraction operations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningMenu;