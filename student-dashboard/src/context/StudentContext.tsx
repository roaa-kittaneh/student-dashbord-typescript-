import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Student } from '../types/student';
import { fetchStudents, createStudent, deleteStudent } from '../services/studentService';

interface StudentContextType {
  students: Student[];
  loading: boolean;
  error: string | null;
  addStudent: (student: Student) => Promise<void>;
  removeStudent: (id: string) => Promise<void>;
}

export const StudentContext = createContext<StudentContextType | null>(null);

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStudents()
      .then(data => {
        setStudents(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Could not reach the server. Run: npm run server');
        setLoading(false);
        console.error(err);
      });
  }, []);

  const addStudent = async (student: Student): Promise<void> => {
    const created = await createStudent(student);
    setStudents(prev => [...prev, created]);
  };

  const removeStudent = async (id: string): Promise<void> => {
    await deleteStudent(id);
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  return (
    <StudentContext.Provider value={{ students, loading, error, addStudent, removeStudent }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudents = (): StudentContextType => {
  const context = useContext(StudentContext);
  if (!context) throw new Error('useStudents must be used within a StudentProvider');
  return context;
};
