import React from 'react';

// Import images from the assets folder
import admin1 from '../assets/admin1.jpeg';
import admin2 from '../assets/admin2.png';
import admin3 from '../assets/admin3.avif';
import admin4 from '../assets/admin4.jpg';
import admin5 from '../assets/admin5.avif';
import admin6 from '../assets/admin6.jpeg';
import admin7 from '../assets/admin7.jpeg';
import Volunteer from "../pages/Volunteer";

const admins = [
  {
    name: "Srilatha",
    role: "President",
    photo: admin1,
  },
  {
    name: "Divya",
    role: "Vice-President",
    photo: admin2,
  },
  {
    name: "Jagadeesh",
    role: "Vice-President",
    photo: admin3,
  },
  {
    name: "Akhila",
    role: "Vice-President",
    photo: admin4,
  },
  {
    name: "Divya",
    role: "General Secretary",
    photo: admin5,
  },
  {
    name: "Chandana",
    role: "General Secretary",
    photo: admin6,
  },
  {
    name: "Teju",
    role: "General Secretary",
    photo: admin7,
  },
  {
    name: "Shivam",
    role: "Vice-president",
    photo: admin5,
  },
  {
    name: "Anushka",
    role: "General Secretary",
    photo: admin3,
  },
  {
    name: "Arjun",
    role: "President",
    photo: admin1,
  },
];

const AdminComponent = () => {
  return (
    <>
      <div style={styles.container}>
        {admins.map((admin, index) => (
          <div key={index} style={styles.card}>
            <img src={admin.photo} alt={`${admin.name}'s photo`} style={styles.photo} />
            <h3 style={styles.name}>{admin.name}</h3>
            <p style={styles.role}>{admin.role}</p>
            <button style={styles.button}>View Profile</button> {/* Added button here */}
          </div>
        ))}
      </div>
      <br></br>
      <Volunteer />
    </>
  );
};

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)', // Changed to display 5 cards in one row
    gap: '20px',
    padding: '20px',
    backgroundColor: '#f5f5f5',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '30px',
    textAlign: 'center',
    transition: 'transform 0.3s ease',
  },
  photo: {
    width: '100px', // Adjusted size to fit better
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '10px',
  },
  name: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '10px 0 5px',
  },
  role: {
    fontSize: '14px',
    color: '#555555',
  },
  button: {
    marginTop: '10px',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    background: 'linear-gradient(90deg, #e62e8a, #f82bff)',
    color: '#ffffff',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

// Optional: Add hover effect for the button
styles.buttonHover = {
  backgroundColor: '#0056b3',
};

export default AdminComponent;
