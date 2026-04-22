import type { Student } from '../types/student';

const STORAGE_KEY = 'students_list';

function readAll(): Student[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? (JSON.parse(raw) as Student[]) : [];
}

/**
 * Returns all students.
 * Swap body with: return fetch('/api/students').then(r => r.json())
 */
export function fetchStudents(): Promise<Student[]> {
  return Promise.resolve(readAll());
}

/**
 * Returns a single student by id, or null if not found.
 * Swap body with: return fetch(`/api/students/${id}`).then(r => r.json())
 */
export function fetchStudentById(id: string): Promise<Student | null> {
  return Promise.resolve(readAll().find(s => s.id === id) ?? null);
}
