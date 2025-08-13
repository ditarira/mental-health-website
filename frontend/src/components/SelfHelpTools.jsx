import React, { useState } from 'react';

const SelfHelpTools = () => {
  const [selectedTool, setSelectedTool] = useState(null);

  const tools = [
    {
      id: 'grounding-5-4-3-2-1',
      name: '5-4-3-2-1 Grounding Technique',
      description: 'Use your senses to ground yourself in the present moment',
      icon: '🌱',
      color: '#059669',
      steps: [
        'Name 5 things you can see around you',
        'Name 4 things you can touch',
        'Name 3 things you can hear',
        'Name 2 things you can smell',
        'Name 1 thing you can taste'
      ],
      benefits: ['Reduces anxiety', 'Stops panic attacks', 'Brings you to present moment'],
      duration: '2-5 minutes'
    },
    {
      id: 'progressive-muscle-relaxation',
      name: 'Progressive Muscle Relaxation',
      description: 'Systematically tense and relax muscle groups to reduce physical tension',
      icon: '💆',
      color: '#7c3aed',
      steps: [
        'Find a comfortable position and close your eyes',
        'Start with your toes - tense for 5 seconds, then relax',
        'Move up to your calves, thighs, abdomen',
        'Continue with hands, arms, shoulders, neck',
        'Finish with facial muscles',
        'Notice the difference between tension and relaxation'
      ],
      benefits: ['Reduces physical tension', 'Improves sleep', 'Lowers stress hormones'],
      duration: '10-20 minutes'
    },
    {
      id: 'thought-challenging',
      name: 'Thought Challenging',
      description: 'Challenge negative thoughts using cognitive behavioral techniques',
      icon: '🧠',
      color: '#0891b2',
      steps: [
        'Identify the negative thought',
        'Ask: Is this thought realistic?',
        'What evidence supports/contradicts this thought?',
        'What would I tell a friend having this thought?',
        'Create a more balanced, realistic thought',
        'Notice how you feel with the new thought'
      ],
      benefits: ['Reduces negative thinking', 'Improves mood', 'Builds resilience'],
      duration: '5-10 minutes'
    },
    {
      id: 'gratitude-practice',
      name: 'Daily Gratitude Practice',
      description: 'Focus on positive aspects of life to improve overall wellbeing',
      icon: '🙏',
      color: '#f59e0b',
      steps: [
        'Set aside 5 minutes each day',
        'Write down 3 things you\'re grateful for',
        'Be specific - not just "family" but "my sister\'s encouraging text"',
        'Include why you\'re grateful for each item',
        'Feel the positive emotion as you write',
        'Review your list when feeling down'
      ],
      benefits: ['Improves mood', 'Increases life satisfaction', 'Better sleep'],
      duration: '5 minutes daily'
    },
    {
      id: 'mindful-walking',
      name: 'Mindful Walking',
      description: 'Combine physical movement with mindfulness meditation',
      icon: '🚶',
      color: '#14b8a6',
      steps: [
        'Choose a quiet path 10-20 steps long',
        'Walk slower than normal pace',
        'Focus on the sensation of your feet touching the ground',
        'Notice the movement of your legs and body',
        'When your mind wanders, gently return focus to walking',
        'Turn around and repeat'
      ],
      benefits: ['Combines exercise with mindfulness', 'Improves focus', 'Reduces rumination'],
      duration: '10-15 minutes'
    },
    {
      id: 'emotional-regulation',
      name: 'STOP Technique',
      description: 'A quick technique to manage overwhelming emotions',
      icon: '🛑',
      color: '#dc2626',
      steps: [
        'STOP - Pause whatever you\'re doing',
        'TAKE A BREATH - Take a deep, slow breath',
        'OBSERVE - Notice what you\'re thinking, feeling, and experiencing',
        'PROCEED - Choose how to respond rather than react'
      ],
      benefits: ['Prevents impulsive reactions', 'Increases emotional awareness', 'Improves decision-making'],
      duration: '1-2 minutes'
    }
  ];

  const copingStrategies = [
    {
      category: 'Immediate Relief',
      icon: '⚡',
      color: '#ef4444',
      strategies: [
        'Cold water on face/hands',
        'Deep breathing (4-7-8 technique)',
        'Progressive muscle relaxation',
        'Call a trusted friend',
        'Listen to calming music',
        'Use grounding techniques'
      ]
    },
    {
      category: 'Physical Wellness',
      icon: '💪',
      color: '#059669',
      strategies: [
        'Take a 10-minute walk',
        'Do gentle stretching',
        'Practice yoga',
        'Take a warm bath',
        'Get adequate sleep (7-9 hours)',
        'Eat nutritious meals regularly'
      ]
    },
    {
      category: 'Mental Wellness',
      icon: '🧘',
      color: '#7c3aed',
      strategies: [
        'Practice mindfulness meditation',
        'Write in a journal',
        'Challenge negative thoughts',
        'Practice gratitude',
        'Engage in creative activities',
        'Limit social media use'
      ]
    },
    {
      category: 'Social Connection',
      icon: '👥',
      color: '#0891b2',
      strategies: [
        'Reach out to supportive friends',
        'Join a support group',
        'Volunteer for a cause you care about',
        'Spend time with pets',
        'Participate in community activities',
        'Practice active listening'
      ]
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '25px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h1 style={{
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem'
          }}>
            🛠️ Self-Help Mental Health Tools
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.1rem' }}>
            Evidence-based techniques you can use anytime, anywhere
          </p>
        </div>

        {/* Interactive Tools */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 15px 35px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{
            color: '#667eea',
            fontSize: '1.5rem',
            marginBottom: '1.5rem'
          }}>
            ✨ Interactive Self-Help Techniques
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            {tools.map(tool => (
              <div
                key={tool.id}
                onClick={() => setSelectedTool(selectedTool === tool.id ? null : tool.id)}
                style={{
                  background: selectedTool === tool.id 
                    ? `linear-gradient(135deg, ${tool.color}, ${tool.color}dd)` 
                    : 'white',
                  color: selectedTool === tool.id ? 'white' : '#334155',
                  border: `2px solid ${tool.color}`,
                  borderRadius: '15px',
                  padding: '1.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: selectedTool === tool.id 
                    ? `0 8px 25px ${tool.color}40` 
                    : '0 4px 15px rgba(0,0,0,0.1)'
                }}
                onMouseOver={(e) => {
                  if (selectedTool !== tool.id) {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.background = `${tool.color}10`;
                  }
                }}
                onMouseOut={(e) => {
                  if (selectedTool !== tool.id) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.background = 'white';
                  }
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <span style={{ fontSize: '2.5rem' }}>{tool.icon}</span>
                  <div>
                    <h4 style={{
                      margin: 0,
                      fontSize: '1.2rem',
                      fontWeight: 'bold'
                    }}>
                      {tool.name}
                    </h4>
                    <p style={{
                      margin: '0.5rem 0 0 0',
                      fontSize: '0.9rem',
                      opacity: selectedTool === tool.id ? 0.9 : 0.7
                    }}>
                      {tool.description}
                    </p>
                  </div>
                </div>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.8rem',
                  opacity: selectedTool === tool.id ? 0.9 : 0.6
                }}>
                  <span>⏱️ {tool.duration}</span>
                  <span>{selectedTool === tool.id ? '▼ Expanded' : '▶ Click to expand'}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Expanded Tool Details */}
          {selectedTool && (
            <div style={{
              background: `linear-gradient(135deg, ${tools.find(t => t.id === selectedTool)?.color}10, ${tools.find(t => t.id === selectedTool)?.color}05)`,
              border: `2px solid ${tools.find(t => t.id === selectedTool)?.color}40`,
              borderRadius: '15px',
              padding: '2rem',
              marginTop: '1rem'
            }}>
              {(() => {
                const tool = tools.find(t => t.id === selectedTool);
                return (
                  <div>
                    <h4 style={{
                      color: tool.color,
                      fontSize: '1.3rem',
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      {tool.icon} {tool.name} - Step by Step
                    </h4>
                    
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                      gap: '1.5rem'
                    }}>
                      <div>
                        <h5 style={{
                          color: '#334155',
                          fontSize: '1.1rem',
                          marginBottom: '0.5rem'
                        }}>
                          📝 Steps:
                        </h5>
                        <ol style={{
                          color: '#64748b',
                          lineHeight: '1.6',
                          paddingLeft: '1.5rem'
                        }}>
                          {tool.steps.map((step, index) => (
                            <li key={index} style={{ marginBottom: '0.5rem' }}>
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>
                      
                      <div>
                        <h5 style={{
                          color: '#334155',
                          fontSize: '1.1rem',
                          marginBottom: '0.5rem'
                        }}>
                          💡 Benefits:
                        </h5>
                        <ul style={{
                          color: '#64748b',
                          lineHeight: '1.6',
                          paddingLeft: '1.5rem'
                        }}>
                          {tool.benefits.map((benefit, index) => (
                            <li key={index} style={{ marginBottom: '0.5rem' }}>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>

        {/* Coping Strategies */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '2rem',
          boxShadow: '0 15px 35px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{
            color: '#667eea',
            fontSize: '1.5rem',
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            🎯 Quick Coping Strategies
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {copingStrategies.map((category, index) => (
              <div
                key={index}
                style={{
                  background: 'white',
                  border: `2px solid ${category.color}30`,
                  borderRadius: '15px',
                  padding: '1.5rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = `0 8px 25px ${category.color}20`;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <h4 style={{
                  color: category.color,
                  fontSize: '1.2rem',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  {category.icon} {category.category}
                </h4>
                
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  {category.strategies.map((strategy, strategyIndex) => (
                    <li
                      key={strategyIndex}
                      style={{
                        color: '#64748b',
                        padding: '0.5rem 0',
                        borderBottom: strategyIndex < category.strategies.length - 1 ? '1px solid #f1f5f9' : 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <span style={{ color: category.color }}>•</span>
                      {strategy}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfHelpTools;
