import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NewsListPage from './pages/NewsListPage';
import './styles/App.scss';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<NewsListPage />} />
    </Routes>
  );
};

export default App;
