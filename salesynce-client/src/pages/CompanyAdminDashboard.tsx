
import { useState } from 'react';
// ...existing code...
import Header from '../components/Header';
import Footer from '../components/Footer';
import gonextLogo from '../assets/gonext_white.jpeg';

export default function CompanyAdminDashboard() {
  // Sidebar navigation
  const [activeSection, setActiveSection] = useState('dashboard');
  const [agents] = useState([
    { name: 'Agent 1', email: 'agent1@coke.com', status: 'active' },
    { name: 'Agent 2', email: 'agent2@coke.com', status: 'inactive' },
  ]);
  // ...existing code...

  const sections = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'stats', label: 'Stats' },
  ];



  // Example company stats
  const companyStats = [
    { label: 'Total Agents', value: agents.length },
    { label: 'Visits', value: 0 },
    { label: 'Photos', value: 0 },
  ];

  // ...existing code...

  function renderSection() {
    if (activeSection === 'dashboard' || activeSection === 'stats') {
      return (
        <div className="max-w-4xl mx-auto bg-white border border-blue-100 rounded-2xl shadow-xl p-8 mb-10">
          <h2 className="text-2xl font-bold text-blue-700 mb-6">Company Insights</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-4">
            {companyStats.map((stat) => (
              <div key={stat.label} className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                <div className="text-sm text-gray-700">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Company Admin Dashboard</h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto mb-8">
          Manage your field agents and view your company stats and reports.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <Header />
      <div className="flex flex-1 max-w-7xl mx-auto w-full">
        {/* Sidebar */}
        <aside className="w-64 bg-white/80 border-r border-blue-100 flex flex-col py-12 px-6 items-start shadow-xl rounded-3xl m-6 mr-0">
          <img src={gonextLogo} alt="GoNext Logo" className="mb-10 w-28 h-28 object-contain rounded-2xl border-4 border-blue-600 bg-white self-center shadow-lg" />
          {sections.map((section) => (
            <button
              key={section.key}
              onClick={() => setActiveSection(section.key)}
              className={`w-full text-left mb-4 px-5 py-3 rounded-xl font-semibold text-lg transition-all duration-200 shadow-sm ${
                activeSection === section.key
                  ? 'bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg scale-105 hover:from-blue-700 hover:to-blue-500'
                  : 'bg-blue-100/70 text-blue-700 hover:bg-blue-200/80'
              }`}
            >
              {section.label}
            </button>
          ))}

        </aside>
        {/* Main Content */}
        <main className="flex-grow bg-white/80 py-16 px-10 text-center rounded-3xl m-6 ml-0 shadow-xl min-h-[80vh] flex flex-col justify-start">
          {renderSection()}
        </main>
      </div>
      <Footer />
    </div>
  );
}
