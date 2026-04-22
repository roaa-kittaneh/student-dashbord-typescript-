import React from 'react';
import StudentForm from '../components/StudentForm/StudentForm';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to Student Dashboard</h1>
      <p style={{ color: '#666', marginBottom: '24px' }}>
        Add new students below, or visit the <strong>Students</strong> page to view and manage all students.
      </p>
      <StudentForm />
    </div>
  );
};

export default Home;
