import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { fetchStudentById } from '../services/studentService';

const StudentDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: student, loading, error } = useFetch(() => fetchStudentById(id!), [id]);

  if (loading) {
    return <p style={{ textAlign: 'center', color: '#666' }}>Loading...</p>;
  }

  if (error) {
    return <p style={{ textAlign: 'center', color: '#dc3545' }}>Error: {error}</p>;
  }

  if (!student) {
    return (
      <div style={{ textAlign: 'center', marginTop: '60px' }}>
        <h2>Student not found</h2>
        <p style={{ color: '#666' }}>This student may have been deleted or the ID is incorrect.</p>
        <button
          onClick={() => navigate('/students')}
          style={{ padding: '10px 20px', cursor: 'pointer', borderRadius: '5px', border: '1px solid #ddd' }}
        >
          Back to Students
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        style={{ marginBottom: '24px', padding: '8px 16px', cursor: 'pointer', borderRadius: '5px', border: '1px solid #ddd' }}
      >
        ← Back
      </button>

      <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: '10px', padding: '32px', maxWidth: '500px' }}>
        <h2 style={{ color: '#007bff', marginTop: 0 }}>Student Details</h2>
        <hr style={{ marginBottom: '20px' }} />
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Course:</strong> {student.course}</p>
        <p>
          <strong>GPA:</strong>{' '}
          <span style={{ fontWeight: 'bold', color: student.gpa >= 3.5 ? '#28a745' : student.gpa >= 2.5 ? '#ffc107' : '#dc3545' }}>
            {student.gpa}
          </span>
        </p>
      </div>
    </div>
  );
};

export default StudentDetailsPage;
