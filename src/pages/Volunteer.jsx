import React from 'react';

const Volunteer = () => {
  return (
    <div style={volunteerStyles.container}>
      <h2 style={volunteerStyles.title}>BECOME VOLUNTEER</h2>
      <p style={volunteerStyles.description}>
        With an approach of giving back to society, our volunteers are helping us from across the world.
      </p>
      <button style={volunteerStyles.button} onClick={() => window.open("https://forms.gle/RVqn9L96iFjkG4br6", "_blank")}>
  Join Us
</button>

    </div>
  );
};

const volunteerStyles = {
  container: {
    backgroundColor: '#e60000',
    padding: '30px',
    textAlign: 'center',
    color: '#ffffff',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  description: {
    fontSize: '16px',
    margin: '10px 0',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#e60000',
    backgroundColor: '#ffffff',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
  },
};

export default Volunteer;