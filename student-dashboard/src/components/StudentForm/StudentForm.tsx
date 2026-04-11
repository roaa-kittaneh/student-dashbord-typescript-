import React, { useState } from 'react';
import type { Student } from '../../types/student';
import { toast } from 'react-toastify';
import styles from './StudentForm.module.css'; 

interface Props {
  onAdd: (student: Student) => void;
}

const StudentForm: React.FC<Props> = ({ onAdd }) => {
  const [form, setForm] = useState({ name: '', email: '', course: '', gpa: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.course || !form.gpa) {
      toast.error("Please fill all fields!");
      return;
    }
    
    const newStudent: Student = {
      id: Date.now().toString(),
      name: form.name,
      email: form.email,
      course: form.course,
      gpa: parseFloat(form.gpa)
    };

    onAdd(newStudent);
    setForm({ name: '', email: '', course: '', gpa: '' });
    toast.success("Student added successfully!");
  };

  return (
    <form className={styles.formCard} onSubmit={handleSubmit}>
      <h2 className={styles.formTitle}>Add New Student</h2>
      
      <div className={styles.formGrid}>
        <div className={styles.inputGroup}>
          <label>Full Name</label>
          <input 
            type="text"
            className={styles.inputField} 
            value={form.name}
            placeholder="Enter student name"
            onChange={e => setForm({...form, name: e.target.value})} 
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Email</label>
          <input 
            type="email"
            className={styles.inputField} 
            value={form.email}
            placeholder="student@example.com"
            onChange={e => setForm({...form, email: e.target.value})} 
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Course</label>
          <input 
            type="text"
            className={styles.inputField} 
            value={form.course}
            placeholder="e.g., Computer Science"
            onChange={e => setForm({...form, course: e.target.value})} 
          />
        </div>

        <div className={styles.inputGroup}>
          <label>GPA</label>
          <input 
            type="number"
            step="0.01"
            min="0"
            max="4.0"
            className={styles.inputField} 
            value={form.gpa}
            placeholder="e.g., 3.8"
            onChange={e => setForm({...form, gpa: e.target.value})} 
          />
        </div>
      </div>

      <button type="submit" className={styles.submitBtn}>Add Student</button>
    </form>
  );
};

export default StudentForm;