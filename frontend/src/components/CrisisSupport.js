import React from 'react';

const CrisisSupport = () => {
  return (
    <div style={{paddingTop: '100px', minHeight: '100vh', backgroundColor: 'var(--light)'}}>
      <div className="container" style={{padding: '0 1rem'}}>
        <div style={{
          backgroundColor: '#e74c3c',
          color: 'white',
          padding: '2rem',
          borderRadius: '15px',
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          <h1 style={{fontSize: '2rem', marginBottom: '1rem', color: 'white'}}>
            🆘 Crisis Support
          </h1>
          <p style={{fontSize: '1.1rem', marginBottom: '1.5rem'}}>
            If you're in crisis, you're not alone. Help is available 24/7.
          </p>
          <a 
            href="tel:988"
            style={{
              display: 'inline-block',
              backgroundColor: 'white',
              color: '#e74c3c',
              padding: '1rem 2rem',
              borderRadius: '30px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '1.1rem'
            }}
          >
            📞 Call 988 Now
          </a>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '15px',
          marginBottom: '2rem'
        }}>
          <h2 style={{marginBottom: '1rem', textAlign: 'center'}}>National Suicide Prevention Lifeline</h2>
          <p style={{textAlign: 'center', marginBottom: '2rem'}}>
            Free and confidential support 24/7
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            textAlign: 'center'
          }}>
            <div>
              <h4>📞 Call</h4>
              <a href="tel:988" style={{fontSize: '1.5rem', color: '#e74c3c', fontWeight: 'bold'}}>
                988
              </a>
            </div>
            <div>
              <h4>💬 Text</h4>
              <p style={{fontSize: '1.2rem', color: 'var(--primary)'}}>
                Text HOME to 741741
              </p>
            </div>
            <div>
              <h4>💻 Chat</h4>
              <a 
                href="https://suicidepreventionlifeline.org/chat/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{color: 'var(--primary)'}}
              >
                Online Chat
              </a>
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'var(--gentle-pink)',
          padding: '2rem',
          borderRadius: '15px',
          textAlign: 'center'
        }}>
          <h3 style={{marginBottom: '1rem'}}>💙 Remember</h3>
          <p style={{fontSize: '1.1rem', lineHeight: '1.6'}}>
            <strong>You are not alone.</strong> Crisis counselors are available to listen and help you through this difficult time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CrisisSupport;
