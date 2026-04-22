import React from 'react';
import StudentForm from '../components/StudentForm/StudentForm';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Student } from '../types/student';

const Home: React.FC = () => {
  const [students, setStudents] = useLocalStorage<Student[]>('students_list', []);

  const handleAddStudent = (student: Student) => {
    setStudents([...students, student]);
  };

  return (
    <div>
      <h1>Welcome to Student Dashboard</h1>
      <p style={{ color: '#666', marginBottom: '24px' }}>
        Add new students below, or visit the <strong>Students</strong> page to view and manage all students.
      </p>
      <StudentForm onAdd={handleAddStudent} />
    </div>
  );
};

export default Home;
