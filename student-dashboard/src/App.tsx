import React, { useState } from 'react';
import StudentForm from './components/StudentForm/StudentForm';
import StudentList from './components/StudentList/StudentList';
import StudentModal from './components/StudentModal/StudentModal';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Student } from './types/student';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  const [students, setStudents] = useLocalStorage<Student[]>('students_list', []);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDashboard, setShowDashboard] = useState(false);
  const deleteStudent = (id: string) => {
  setStudents(students.filter(s => s.id !== id));
  toast.info("Student deleted.");
};

  const handleAddStudent = (student: Student) => {
    setStudents([...students, student]);
  };

  const filteredStudents = students.filter(s => 
  s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  s.course.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Student Dashboard</h1>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Search by name or course..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ddd', fontSize: '14px' }}
        />
        <button 
          onClick={() => setShowDashboard(!showDashboard)}
          style={{ 
            padding: '10px 20px', 
            borderRadius: '5px', 
            border: '1px solid #ddd', 
            backgroundColor: showDashboard ? '#007bff' : '#f0f0f0',
            color: showDashboard ? 'white' : 'black',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          Dashboard
        </button>
      </div>

      {!showDashboard ? (
        <StudentForm onAdd={handleAddStudent} />
      ) : (
        <StudentList 
          students={filteredStudents} 
          onViewDetails={(s) => setSelectedStudent(s)}
          onDelete={deleteStudent}
        />
      )}

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