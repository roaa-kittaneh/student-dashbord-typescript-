import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div>
      <h1>About</h1>
      <p>
        Student Dashboard is a React + TypeScript application built with Vite.
        It lets you add, search, view details, and delete students.
        All data is persisted in <strong>localStorage</strong> so it survives page refreshes.
      </p>
      <h2>Tech Stack</h2>
      <ul>
        <li>React 19 + TypeScript</li>
        <li>React Router v6 — client-side routing</li>
        <li>Vite — build tool</li>
        <li>react-toastify — notifications</li>
        <li>CSS Modules — scoped styling</li>
        <li>Vitest + Testing Library — unit tests</li>
      </ul>
    </div>
  );
};

export default AboutPage;
