import React from 'react';

const AchievementSystem = () => {
  const achievements = [
    {
      id: 1,
      title: 'First Entry',
      description: 'Complete your first journal entry',
      icon: '📝',
      unlocked: true
    },
    {
      id: 2,
      title: 'Mindful Moment',
      description: 'Complete your first breathing exercise',
      icon: '🧘',
      unlocked: false
    },
    {
      id: 3,
      title: 'Week Warrior',
      description: 'Journal for 7 consecutive days',
      icon: '🏆',
      unlocked: false
    }
  ];

  return (
    <div className="achievements-container">
      <h3>🏅 Achievements</h3>
      <div className="achievements-grid">
        {achievements.map(achievement => (
          <div 
            key={achievement.id} 
            className={\chievement-card \\}
          >
            <span className="achievement-icon">{achievement.icon}</span>
            <h4>{achievement.title}</h4>
            <p>{achievement.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementSystem;
