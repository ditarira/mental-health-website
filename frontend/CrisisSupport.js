import React, { useState } from 'react';

const CrisisSupport = () => {
  const [userCountry, setUserCountry] = useState('US');

  const helplines = {
    US: {
      name: 'National Suicide Prevention Lifeline',
      number: '988',
      text: 'Text HOME to 741741',
      hours: '24/7',
      description: 'Free and confidential emotional support for people in suicidal crisis or emotional distress.'
    },
    UK: {
      name: 'Samaritans',
      number: '116 123',
      text: 'Text SHOUT to 85258',
      hours: '24/7',
      description: 'Confidential support for people experiencing feelings of distress or despair.'
    },
    CA: {
      name: 'Talk Suicide Canada',
      number: '1-833-456-4566',
      text: 'Text 45645',
      hours: '24/7',
      description: 'National suicide prevention service available to anyone in Canada.'
    }
  };

  const getCurrentHelpline = () => {
    return helplines[userCountry] || helplines.US;
  };

  const currentHelpline = getCurrentHelpline();

  return (
    <div style={{paddingTop: '100px', minHeight: '100vh', backgroundColor: 'var(--light)'}}>
      <div className="container">
        <div style={{
          backgroundColor: '#e74c3c',
          color: 'white',
          padding: '3rem 2rem',
          borderRadius: '15px',
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <h1 style={{fontSize: '2.5rem', marginBottom: '1rem', color: 'white'}}>
            🆘 Crisis Support
          </h1>
          <p style={{fontSize: '1.2rem', marginBottom: '2rem'}}>
            If you're in crisis or thinking about suicide, you're not alone. Help is available 24/7.
          </p>
          <a 
            href={	el:}
            style={{
              display: 'inline-block',
              backgroundColor: 'white',
              color: '#e74c3c',
              padding: '1rem 2rem',
              borderRadius: '30px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
            }}
          >
            📞 Call {currentHelpline.number} Now
          </a>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '3rem',
          borderRadius: '15px',
          marginBottom: '3rem',
          textAlign: 'center',
          border: '3px solid var(--primary)'
        }}>
          <h2 style={{color: 'var(--primary)', marginBottom: '1rem'}}>
            {currentHelpline.name}
          </h2>
          <p style={{fontSize: '1.1rem', marginBottom: '2rem', color: '#666'}}>
            {currentHelpline.description}
          </p>
          
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem'}}>
            <div>
              <h4 style={{marginBottom: '1rem'}}>📞 Call</h4>
              <a 
                href={	el:}
                style={{
                  fontSize: '1.5rem',
                  color: '#e74c3c',
                  textDecoration: 'none',
                  fontWeight: 'bold'
                }}
              >
                {currentHelpline.number}
              </a>
              <p style={{fontSize: '0.9rem', color: '#666', marginTop: '0.5rem'}}>
                Available: {currentHelpline.hours}
              </p>
            </div>
            
            {currentHelpline.text && (
              <div>
                <h4 style={{marginBottom: '1rem'}}>💬 Text</h4>
                <p style={{fontSize: '1.2rem', color: 'var(--primary)', fontWeight: 'bold'}}>
                  {currentHelpline.text}
                </p>
              </div>
            )}
          </div>
        </div>

        <div style={{
          backgroundColor: 'var(--gentle-pink)',
          padding: '3rem',
          borderRadius: '15px',
          textAlign: 'center',
          border: '3px solid var(--primary)'
        }}>
          <h3 style={{marginBottom: '1.5rem', color: 'var(--dark)'}}>💙 Remember</h3>
          <div style={{fontSize: '1.1rem', lineHeight: '1.8', color: '#555'}}>
            <p style={{marginBottom: '1rem'}}>
              <strong>You are not alone.</strong> Many people have felt the way you're feeling and have found help.
            </p>
            <p style={{marginBottom: '1rem'}}>
              <strong>This pain can end.</strong> Suicide is not the only solution to problems.
            </p>
            <p>
              <strong>Help is available.</strong> Trained counselors are ready to listen and support you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrisisSupport;
