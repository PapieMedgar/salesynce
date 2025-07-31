// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';



import AdminDashboard from './pages/AdminDashboard'; // Now Super Admin
import CompanyAdminDashboard from './pages/CompanyAdminDashboard';
import AgentDashboard from './pages/AgentDashboard';

import Schedule from './pages/Schedule';
import VisitLog from './pages/VisitLog';

import FootSoldierDashboard from './pages/FootSoldierDashboard';


function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/super-admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-dashboard" element={<CompanyAdminDashboard />} />
        <Route path="/agent-dashboard" element={<AgentDashboard />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/visit-log" element={<VisitLog />} />
        <Route path="/footsoldier-dashboard" element={<FootSoldierDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
