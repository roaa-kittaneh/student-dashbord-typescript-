import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useStudents } from '../../context/StudentContext';
import styles from './StudentList.module.css';

const StudentList: React.FC = () => {
  const { students, loading, error, removeStudent } = useStudents();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  if (loading) {
    return (
      <div className={styles.centered}>
        <div className={styles.spinner} />
        <p className={styles.hint}>Loading students…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorAlert}>
        <strong>Connection error:</strong> {error}
      </div>
    );
  }

  const filteredStudents = students.filter(
    s =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    try {
      await removeStudent(id);
      toast.info('Student deleted.');
    } catch {
      toast.error('Failed to delete student.');
    }
  };

  if (students.length === 0) {
    return <p style={{ textAlign: 'center', color: '#666' }}>No students yet. Add one above!</p>;
  }

  return (
    <div>
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
      {filteredStudents.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666' }}>No students match your search.</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Course</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.course}</td>
                  <td>
                    <button
                      className={styles.detailsBtn}
                      onClick={() => navigate(`/students/${student.id}`)}
                    >
                      View Details
                    </button>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(student.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentList;
