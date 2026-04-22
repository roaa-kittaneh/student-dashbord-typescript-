import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentList from '../components/StudentList/StudentList';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Student } from '../types/student';
import { toast } from 'react-toastify';

const StudentsPage: React.FC = () => {
  const [students, setStudents] = useLocalStorage<Student[]>('students_list', []);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const deleteStudent = (id: string) => {
    setStudents(students.filter(s => s.id !== id));
    toast.info('Student deleted.');
  };

  const filteredStudents = students.filter(
    s =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Students</h1>
      <input
        type="text"
        placeholder="Search by name or course..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '5px',
          border: '1px solid #ddd',
          fontSize: '14px',
          marginBottom: '20px',
          boxSizing: 'border-box',
        }}
      />
      <StudentList
        students={filteredStudents}
        onViewDetails={s => navigate(`/students/${s.id}`)}
        onDelete={deleteStudent}
      />
    </div>
  );
};

export default StudentsPage;
