import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import InitialLogin from './login/login-screen';
import Dashboard from './pages/dashboard';

function App() {
  return (
    <div className='container'>
    <Router>
      <Routes>
        <Route path="/login" element={<InitialLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;



      