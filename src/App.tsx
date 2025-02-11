import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';
import './index.css';

const App: React.FC = () => {
  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
