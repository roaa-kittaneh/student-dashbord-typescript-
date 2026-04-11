import React from 'react';
import type { Student } from '../../types/student';
import styles from './StudentList.module.css';

interface Props {
  students: Student[];
  onViewDetails: (student: Student) => void;
    onDelete: (id: string) => void;

}

const StudentList: React.FC<Props> = ({ students, onViewDetails, onDelete }) => {
  if (students.length === 0) {
    return <p style={{ textAlign: 'center', color: '#666' }}>no students found.</p>;
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>name</th>
            <th>course</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.course}</td>
              <td>
                <button 
                  className={styles.detailsBtn}
                  onClick={() => onViewDetails(student)}
                  
                  
                >
                  View Details
                </button>
                <button 
                  className={styles.deleteBtn}
                  onClick={() => onDelete(student.id)}
                >
                  Delete
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;