import React, { useState } from 'react';
import StudentForm from './components/StudentForm/StudentForm';
import StudentList from './components/StudentList/StudentList';
import StudentModal from './components/StudentModal/StudentModal';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Student } from './types/student';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  const [students, setStudents] = useLocalStorage<Student[]>('students_list', []);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const handleAddStudent = (student: Student) => {
    setStudents([...students, student]);
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Student Dashboard</h1>
      
      <StudentForm onAdd={handleAddStudent} />
      
      <StudentList 
        students={students} 
        onViewDetails={(s) => setSelectedStudent(s)} 
      />

      {selectedStudent && (
        <StudentModal 
          student={selectedStudent} 
          onClose={() => setSelectedStudent(null)} 
        />
      )}

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default App;