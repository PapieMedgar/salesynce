// ...existing code...
import { useState } from 'react';
import Footer from '../components/Footer';
import gonextLogo from '../assets/gonext_white.jpeg';

// Accept role as a prop: 'superAdmin' or 'companyAdmin'

export default function AgentDashboard() {
  const [activeSection, setActiveSection] = useState('home');

  // Example companies and agents (replace with real data from backend)

  // For super admin: selected company for report viewing
  // Removed selectedCompany and setSelectedCompany (not used)

  // Only agent sections
  const sections = [
    { key: 'home', label: 'Dashboard Home' },
    { key: 'sendSchedule', label: 'Send Schedule' },
    { key: 'submitSimBarcode', label: 'Scan SIM Barcode' },
    { key: 'photos', label: 'Upload Photos' },
  ];

  let content;
  if (activeSection === 'sendSchedule') {
    const agents = [
      { id: 1, name: 'Agent A' },
      { id: 2, name: 'Agent B' },
      { id: 3, name: 'Agent C' },
    ];
    content = (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Send Schedule to Agent</h2>
        <form className="w-full max-w-lg bg-blue-50 rounded-xl p-8 shadow space-y-6">
          <div>
            <label htmlFor="agentSelect" className="block text-base font-semibold text-gray-700 mb-1">Select Agent</label>
            <select id="agentSelect" name="agentSelect" className="w-full px-4 py-2 border border-blue-200 rounded-lg">
              <option value="">Choose agent...</option>
              {agents.map(agent => (
                <option key={agent.id} value={agent.id}>{agent.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="spazaName" className="block text-base font-semibold text-gray-700 mb-1">Spaza Name</label>
            <input id="spazaName" name="spazaName" type="text" required placeholder="Enter spaza name" className="w-full px-4 py-2 border border-blue-200 rounded-lg" />
          </div>
          <div>
            <label htmlFor="scheduleDate" className="block text-base font-semibold text-gray-700 mb-1">Date</label>
            <input id="scheduleDate" name="scheduleDate" type="date" required className="w-full px-4 py-2 border border-blue-200 rounded-lg" />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="checkIn" className="block text-base font-semibold text-gray-700 mb-1">Check-In Time</label>
              <input id="checkIn" name="checkIn" type="time" required className="w-full px-4 py-2 border border-blue-200 rounded-lg" />
            </div>
            <div className="flex-1">
              <label htmlFor="checkOut" className="block text-base font-semibold text-gray-700 mb-1">Check-Out Time</label>
              <input id="checkOut" name="checkOut" type="time" required className="w-full px-4 py-2 border border-blue-200 rounded-lg" />
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition">Send Schedule</button>
        </form>
        <p className="text-xs text-gray-500 mt-4">Choose an agent, spaza name, date, and check-in/out times to assign a schedule.</p>
      </div>
    );
  } else if (activeSection === 'submitSimBarcode') {
    content = (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Scan SIM Barcode</h2>
        <form className="w-full max-w-md bg-blue-50 rounded-xl p-6 shadow space-y-5">
          <div>
            <label htmlFor="simBarcode" className="block text-base font-semibold text-gray-700 mb-1">SIM Barcode</label>
            <input id="simBarcode" name="simBarcode" type="text" required placeholder="Scan or enter SIM barcode" className="w-full px-4 py-2 border border-blue-200 rounded-lg" />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition">Submit to Super Admin</button>
        </form>
        <p className="text-xs text-gray-500 mt-2">Agents must scan or enter the SIM barcode to submit to super admin.</p>
      </div>
    );
  } else if (activeSection === 'sim') {
    content = (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">SIM Sale</h2>
        <p className="text-gray-600">Record SIM sales and assign to customers.</p>
      </div>
    );
  } else if (activeSection === 'footsoldier') {
    window.location.href = '/footsoldier';
    content = null;
  } else {
    // Demo stats
    const stats: { label: string; value: string | number }[] = [
      { label: 'Stores Visited', value: 18 },
      { label: 'SIMs Sold', value: 7 },
      { label: 'Photos Uploaded', value: 12 },
    ];
    // Demo analytics from footsoldier uploads
    const footsoldierAnalytics = [
      {
        brand: 'CocaCola',
        pictureType: 'Ad Boards',
        detectedInside: ['CocaCola', 'MTN'],
        missingInside: ['Vodacom'],
        detectedOutside: ['Shoprite'],
        missingOutside: ['Telkom'],
      },
      {
        brand: 'MTN',
        pictureType: 'Shelve',
        detectedInside: ['MTN'],
        missingInside: ['CellC'],
        detectedOutside: ['MTN'],
        missingOutside: ['Vodacom'],
      },
    ];
    content = (
      <>
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Agent Dashboard</h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto mb-8">
          View your work summary and submit SIM barcodes to super admin.<br />
          <span className="font-semibold text-blue-700">Footsoldier Analytics:</span> See uploaded ad board analytics and photos below.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-10">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-blue-50 border border-blue-100 rounded-xl p-8 shadow text-center">
              <div className="text-4xl font-extrabold text-blue-600 mb-2">{stat.value}</div>
              <div className="text-lg font-medium text-gray-700">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="max-w-3xl mx-auto mt-12 mb-8 bg-white border border-blue-100 rounded-xl shadow p-6">
          <h2 className="text-xl font-bold text-blue-700 mb-4">Footsoldier Uploaded Analytics</h2>
          {footsoldierAnalytics.map((item, idx) => (
            <div key={idx} className="mb-8 p-4 border-b border-blue-100 last:border-b-0">
              <div className="font-semibold text-blue-600 mb-2">Brand: {item.brand}</div>
              <div className="mb-2">Picture Type: <span className="font-medium text-gray-700">{item.pictureType}</span></div>
              <div className="mb-2">Detected Boards (Inside): <span className="text-blue-700">{item.detectedInside.join(', ') || 'None'}</span></div>
              <div className="mb-2">Missing Boards (Inside): <span className="text-gray-500">{item.missingInside.join(', ') || 'None'}</span></div>
              <div className="mb-2">Detected Boards (Outside): <span className="text-blue-700">{item.detectedOutside.join(', ') || 'None'}</span></div>
              <div className="mb-2">Missing Boards (Outside): <span className="text-gray-500">{item.missingOutside.join(', ') || 'None'}</span></div>
            </div>
          ))}
        </div>
      </>
    );
  }
  

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Top Navigation Bar */}
      <nav className="w-full bg-white/90 border-b border-blue-100 flex items-center justify-between px-10 py-4 shadow-lg">
        <div className="flex items-center gap-4">
          <img src={gonextLogo} alt="GoNext Logo" className="w-10 h-10 object-contain rounded-xl border-2 border-blue-600 bg-white" />
          <span className="text-xl font-bold text-blue-700">SalesSync</span>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold text-lg shadow hover:bg-blue-700 transition">Sign Out</button>
      </nav>
      <div className="flex flex-1 max-w-7xl mx-auto w-full">
        {/* Sidebar */}
        <aside className="w-72 bg-white/90 border-r border-blue-100 flex flex-col py-10 px-8 items-center shadow-xl rounded-r-3xl">
          <nav className="w-full flex-1">
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section.key}>
                  <button
                    className={`w-full text-left px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-200 shadow-sm ${
                      activeSection === section.key
                        ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg scale-105 hover:from-blue-700 hover:to-blue-500"
                        : "bg-blue-100/70 text-blue-700 hover:bg-blue-200/80"
                    }`}
                    onClick={() => setActiveSection(section.key)}
                  >
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex-grow bg-white/80 py-16 px-10 text-center rounded-3xl m-6 ml-0 shadow-xl min-h-[80vh] flex flex-col justify-start">
          {content}
        </main>
      </div>
      <Footer />
    </div>
  );
}
