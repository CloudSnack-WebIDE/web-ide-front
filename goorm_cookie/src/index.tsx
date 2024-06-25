import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import InfoPage from './pages/InfoPage';
import ForgotPassPage from './pages/ForgotPassPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import C_Room from './pages/C_Room/C_Room';
import Dashboard from './pages/dashboard/dashboard';
import Projects from './pages/Projects';
import ReactDOM from 'react-dom/client';
import axios from 'axios';

axios.defaults.baseURL = 'https://kd438d3d42851a.user-app.krampoline.com';
axios.defaults.withCredentials = true;

const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({
  element,
}) => {
  const { isLoggedIn, } = useAuth();
  
  return isLoggedIn ? element : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRoute element={<HomePage />} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/info" element={<InfoPage />} />
          <Route path="/forgot-password" element={<ForgotPassPage />} />
          <Route path="/c_room" element={<C_Room />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/room/:roomId/:lang" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}

export default App;
