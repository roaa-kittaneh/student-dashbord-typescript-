import React from 'react';
import StudentList from '../components/StudentList/StudentList';

const StudentsPage: React.FC = () => {
  return (
    <div>
      <h1>Students</h1>
      <StudentList />
    </div>
  );
};

export default StudentsPage;
