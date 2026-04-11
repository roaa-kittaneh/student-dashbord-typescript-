import React from 'react';
import type { Student } from '../../types/student';
import styles from './StudentModal.module.css';

interface Props {
  student: Student;
  onClose: () => void;
}

const StudentModal: React.FC<Props> = ({ student, onClose }) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        <h2 style={{ color: '#007bff' }}>Student Details </h2>
        <hr />
        <div className={styles.info}>
          <p><strong>name:</strong> {student.name}</p>
          <p><strong>email:</strong> {student.email}</p>
          <p><strong>course:</strong> {student.course}</p>
          <p><strong>gpa:</strong> <span className={styles.gpa}>{student.gpa}</span></p>
        </div>
      </div>
    </div>
  );
};

export default StudentModal;