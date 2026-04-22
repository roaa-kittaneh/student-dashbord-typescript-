import React from 'react';
import type { Student } from '../../types/student';
import { toast } from 'react-toastify';
import styles from './StudentForm.module.css';
import { useStudents } from '../../context/StudentContext';
import useForm from '../../hooks/useForm';

const INITIAL_VALUES = { name: '', email: '', course: '', gpa: '' };

const StudentForm: React.FC = () => {
  const { addStudent } = useStudents();
  const { values, handleChange, reset } = useForm(INITIAL_VALUES);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!values.name || !values.email || !values.course || !values.gpa) {
      toast.error("Please fill all fields!");
      return;
    }

    const newStudent: Student = {
      id: Date.now().toString(),
      name: values.name,
      email: values.email,
      course: values.course,
      gpa: parseFloat(values.gpa),
    };

    addStudent(newStudent);
    reset();
    toast.success("Student added successfully!");
  };

  return (
    <form className={styles.formCard} onSubmit={handleSubmit}>
      <h2 className={styles.formTitle}>Add New Student</h2>

      <div className={styles.formGrid}>
        <div className={styles.inputGroup}>
          <label htmlFor="student-name">Full Name</label>
          <input
            id="student-name"
            name="name"
            type="text"
            className={styles.inputField}
            value={values.name}
            placeholder="Enter student name"
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="student-email">Email</label>
          <input
            id="student-email"
            name="email"
            type="email"
            className={styles.inputField}
            value={values.email}
            placeholder="student@example.com"
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="student-course">Course</label>
          <input
            id="student-course"
            name="course"
            type="text"
            className={styles.inputField}
            value={values.course}
            placeholder="e.g., Computer Science"
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="student-gpa">GPA</label>
          <input
            id="student-gpa"
            name="gpa"
            type="number"
            step="0.01"
            min="0"
            max="4.0"
            className={styles.inputField}
            value={values.gpa}
            placeholder="e.g., 3.8"
            onChange={handleChange}
          />
        </div>
      </div>

      <button type="submit" className={styles.submitBtn}>Add Student</button>
    </form>
  );
};

export default StudentForm;
