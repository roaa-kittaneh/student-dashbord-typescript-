import axios from 'axios';
import type { Student } from '../types/student';

const api = axios.create({ baseURL: 'http://localhost:3001' });

/** GET /students */
export const fetchStudents = (): Promise<Student[]> =>
  api.get<Student[]>('/students').then(r => r.data);

/** GET /students/:id  —  returns null on 404 */
export const fetchStudentById = (id: string): Promise<Student | null> =>
  api
    .get<Student>(`/students/${id}`)
    .then(r => r.data)
    .catch(err => {
      if (axios.isAxiosError(err) && err.response?.status === 404) return null;
      throw err;
    });

/** POST /students */
export const createStudent = (student: Student): Promise<Student> =>
  api.post<Student>('/students', student).then(r => r.data);

/** PUT /students/:id */
export const updateStudent = (student: Student): Promise<Student> =>
  api.put<Student>(`/students/${student.id}`, student).then(r => r.data);

/** DELETE /students/:id */
export const deleteStudent = (id: string): Promise<void> =>
  api.delete(`/students/${id}`).then(() => undefined);
