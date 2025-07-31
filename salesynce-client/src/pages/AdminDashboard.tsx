import goxtLogo from '../assets/gonext_white.jpeg';

import { useState } from "react";

type Section = "dashboard" | "companies" | "agents" | "reports" | "kyc" | "stats" | "settings" | "sendSchedule" | "registerCompany" | "registerAgent" | "companyStats" | "agentStats" | "companyInsights";

const demoCompanies = [
  { name: "Acme Telecom", email: "admin@acmetel.com", agents: 12, created: "2025-07-01" },
  { name: "RetailX", email: "admin@retailx.com", agents: 8, created: "2025-07-10" },
];
const demoAgents = [
  { name: "Super Agent 1", email: "agent1@gonxt.com", company: "Acme Telecom", status: "active" },
  { name: "Super Agent 2", email: "agent2@gonxt.com", company: "RetailX", status: "inactive" },
];
const demoReports = [
  { company: "Acme Telecom", report: "Q2 Sales", date: "2025-07-20" },
  { company: "RetailX", report: "Q2 Sales", date: "2025-07-21" },
];
const demoDocs = [
  { company: "Acme Telecom", doc: "KYC.pdf", status: "pending" },
  { company: "RetailX", doc: "KYC.pdf", status: "approved" },
];

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<Section>("dashboard");
  const [selectedCompany, setSelectedCompany] = useState<string>(demoCompanies[0]?.name || "");
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  // Simple sidebar for navigation
  const mainSections: Section[] = [
    "dashboard",
    "companies",
    "agents",
    "sendSchedule",
    "registerCompany",
    "registerAgent",
    "companyStats",
    "agentStats",
    "companyInsights",
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Top Navigation Bar */}
      <nav className="w-full bg-white/90 border-b border-blue-100 flex items-center justify-between px-10 py-4 shadow-lg">
        <div className="flex items-center gap-4">
          <img src={goxtLogo} alt="Goxt Logo" className="w-10 h-10 object-contain rounded-xl border-2 border-blue-600 bg-white" />
          <span className="text-xl font-bold text-blue-700">SalesSync</span>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold text-lg shadow hover:bg-blue-700 transition">Sign Out</button>
      </nav>
      <div className="flex flex-1 max-w-7xl mx-auto w-full">
        {/* Sidebar */}
        <aside className="w-72 bg-white/90 border-r border-blue-100 flex flex-col py-10 px-8 items-center shadow-xl rounded-r-3xl">
          <nav className="w-full flex-1">
            <ul className="space-y-2">
              {mainSections.map((section) => (
                <li key={section}>
                  <button
                    className={`w-full text-left px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-200 shadow-sm ${
                      activeSection === section
                        ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg scale-105 hover:from-blue-700 hover:to-blue-500"
                        : "bg-blue-100/70 text-blue-700 hover:bg-blue-200/80"
                    }`}
                    onClick={() => setActiveSection(section)}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="w-full mt-auto">
            <button
              className={`w-full text-left px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-200 shadow-sm mb-2 ${
                activeSection === "settings"
                  ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg scale-105 hover:from-blue-700 hover:to-blue-500"
                  : "bg-blue-100/70 text-blue-700 hover:bg-blue-200/80"
              }`}
              onClick={() => setActiveSection("settings")}
            >
              Settings
            </button>
          </div>
        </aside>
        {/* Main Content */}
        <main className="flex-grow bg-white/80 py-16 px-10 text-center rounded-3xl m-8 ml-0 shadow-xl min-h-[80vh] flex flex-col justify-start">
          {renderSection()}
        </main>
      </div>
    </div>
  );

  function renderSection() {
    switch (activeSection) {
      case "registerCompany":
        return (
          <div className="max-w-xl mx-auto bg-white border border-blue-100 rounded-2xl shadow-xl p-8 mb-10">
            <h2 className="text-2xl font-bold text-blue-700 mb-6">Register Company</h2>
            <form className="mb-6">
              <label htmlFor="companyName" className="block text-left text-blue-700 font-semibold mb-1">Company Name</label>
              <input id="companyName" type="text" placeholder="Company Name" className="border rounded-lg px-4 py-2 mb-2 w-full" />
              <label htmlFor="adminName" className="block text-left text-blue-700 font-semibold mb-1">Admin Name</label>
              <input id="adminName" type="text" placeholder="Admin Name" className="border rounded-lg px-4 py-2 mb-2 w-full" />
              <label htmlFor="adminSurname" className="block text-left text-blue-700 font-semibold mb-1">Admin Surname</label>
              <input id="adminSurname" type="text" placeholder="Admin Surname" className="border rounded-lg px-4 py-2 mb-2 w-full" />
              <label htmlFor="companyEmail" className="block text-left text-blue-700 font-semibold mb-1">Admin Email</label>
              <input id="companyEmail" type="email" placeholder="Admin Email" className="border rounded-lg px-4 py-2 mb-2 w-full" />
              <label htmlFor="adminPassword" className="block text-left text-blue-700 font-semibold mb-1">Set Admin Password</label>
              <input id="adminPassword" type="password" placeholder="Set Password" className="border rounded-lg px-4 py-2 mb-2 w-full" />
              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:bg-blue-700 transition">Register Company</button>
            </form>
            <p className="text-gray-500 text-sm">Demo: This would register a new company with admin details and password set by super admin.</p>
          </div>
        );
      case "registerAgent":
        return (
          <div className="max-w-xl mx-auto bg-white border border-blue-100 rounded-2xl shadow-xl p-8 mb-10">
            <h2 className="text-2xl font-bold text-blue-700 mb-6">Register & Assign Agent/Footsoldier</h2>
            <form className="mb-6">
              <label htmlFor="agentName" className="block text-left text-blue-700 font-semibold mb-1">Name</label>
              <input id="agentName" type="text" placeholder="Name" className="border rounded-lg px-4 py-2 mb-2 w-full" />
              <label htmlFor="agentSurname" className="block text-left text-blue-700 font-semibold mb-1">Surname</label>
              <input id="agentSurname" type="text" placeholder="Surname" className="border rounded-lg px-4 py-2 mb-2 w-full" />
              <label htmlFor="agentEmail" className="block text-left text-blue-700 font-semibold mb-1">Email</label>
              <input id="agentEmail" type="email" placeholder="Email" className="border rounded-lg px-4 py-2 mb-2 w-full" />
              <label htmlFor="agentPassword" className="block text-left text-blue-700 font-semibold mb-1">Set Password</label>
              <input id="agentPassword" type="password" placeholder="Set Password" className="border rounded-lg px-4 py-2 mb-2 w-full" />
              <label htmlFor="agentRole" className="block text-left text-blue-700 font-semibold mb-1">Role</label>
              <select id="agentRole" className="border rounded-lg px-4 py-2 mb-2 w-full">
                <option value="agent">Agent</option>
                <option value="footsoldier">Footsoldier</option>
              </select>
              <label htmlFor="agentAssignment" className="block text-left text-blue-700 font-semibold mb-1">Assign To</label>
              <select id="agentAssignment" className="border rounded-lg px-4 py-2 mb-2 w-full">
                <option value="gonxt">Gonxt</option>
                {demoCompanies.map((c, i) => (
                  <option key={i} value={c.name}>{c.name}</option>
                ))}
              </select>
              <label htmlFor="agentMultiCompany" className="block text-left text-blue-700 font-semibold mb-1">Assign to Multiple Companies</label>
              <select id="agentMultiCompany" multiple className="border rounded-lg px-4 py-2 mb-2 w-full">
                {demoCompanies.map((c, i) => (
                  <option key={i} value={c.name}>{c.name}</option>
                ))}
              </select>
              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:bg-blue-700 transition">Register & Assign</button>
            </form>
            <p className="text-gray-500 text-sm">Demo: Register agent or footsoldier, set password, and assign to company/companies.</p>
          </div>
        );
      case "companyStats":
        return (
          <div className="max-w-3xl mx-auto bg-white border border-blue-100 rounded-2xl shadow-xl p-8 mb-10">
            <h2 className="text-2xl font-bold text-blue-700 mb-6">Company Stats</h2>
            <div className="grid grid-cols-2 gap-6 mb-4">
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{demoCompanies.length}</div>
                <div className="text-sm text-gray-700">Total Companies</div>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{demoCompanies.reduce((acc, c) => acc + c.agents, 0)}</div>
                <div className="text-sm text-gray-700">Total Agents (by Company)</div>
              </div>
            </div>
          </div>
        );
      case "agentStats":
        return (
          <div className="max-w-3xl mx-auto bg-white border border-blue-100 rounded-2xl shadow-xl p-8 mb-10">
            <h2 className="text-2xl font-bold text-blue-700 mb-6">Agent Stats</h2>
            <div className="grid grid-cols-2 gap-6 mb-4">
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{demoAgents.length}</div>
                <div className="text-sm text-gray-700">Total Agents</div>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{demoAgents.filter(a => a.status === "active").length}</div>
                <div className="text-sm text-gray-700">Active Agents</div>
              </div>
            </div>
          </div>
        );
      case "dashboard":
        // Overall stats demo
        const totalCompanies = demoCompanies.length;
        const totalAgents = demoAgents.length;
        const totalReports = demoReports.length;
        const totalDocs = demoDocs.length;
        const gonxtReportsPulled = 5; // Demo value
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h2 className="text-3xl font-bold text-blue-700 mb-10">Super Admin Dashboard</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">
              <div className="bg-white border border-blue-100 rounded-2xl shadow-xl p-10 flex flex-col items-center justify-center w-64 h-64">
                <div className="text-5xl font-extrabold text-blue-600 mb-4">{totalCompanies}</div>
                <div className="text-lg font-semibold text-gray-700">Total Companies</div>
              </div>
              <div className="bg-white border border-blue-100 rounded-2xl shadow-xl p-10 flex flex-col items-center justify-center w-64 h-64">
                <div className="text-5xl font-extrabold text-blue-600 mb-4">{totalAgents}</div>
                <div className="text-lg font-semibold text-gray-700">Total Agents</div>
              </div>
              <div className="bg-white border border-blue-100 rounded-2xl shadow-xl p-10 flex flex-col items-center justify-center w-64 h-64">
                <div className="text-5xl font-extrabold text-blue-600 mb-4">{totalReports}</div>
                <div className="text-lg font-semibold text-gray-700">Total Reports</div>
                <div className="text-base text-blue-600 mt-2">Gonxt Reports Pulled: {gonxtReportsPulled}</div>
              </div>
              <div className="bg-white border border-blue-100 rounded-2xl shadow-xl p-10 flex flex-col items-center justify-center w-64 h-64">
                <div className="text-5xl font-extrabold text-blue-600 mb-4">{totalDocs}</div>
                <div className="text-lg font-semibold text-gray-700">Total Documents</div>
              </div>
            </div>
          </div>
        );
      case "companies":
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h2 className="text-3xl font-bold text-blue-700 mb-10">Registered Companies</h2>
            <div className="grid grid-cols-2 gap-10">
              {demoCompanies.map((c, i) => (
                <div key={i} className="bg-white border border-blue-100 rounded-2xl shadow-xl p-8 w-72 flex flex-col items-center justify-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">{c.name}</div>
                  <div className="text-base text-gray-700 mb-1">{c.email}</div>
                  <div className="text-base text-gray-700 mb-1">Agents: {c.agents}</div>
                  <div className="text-base text-gray-700 mb-1">Created: {c.created}</div>
                  <button className="text-red-600 underline text-xs mt-2">Remove</button>
                </div>
              ))}
            </div>
          </div>
        );
      case "agents":
        const agentToTrack = demoAgents.find(a => a.name === selectedAgent);
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h2 className="text-3xl font-bold text-blue-700 mb-10">All Agents</h2>
            {!selectedAgent ? (
              <>
                <div className="grid grid-cols-3 gap-10">
                  {demoAgents.map((a, i) => (
                    <div
                      key={i}
                      className="bg-white border border-blue-100 rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => setSelectedAgent(a.name)}
                    >
                      <div className="text-2xl font-bold text-blue-600 mb-2">{a.name}</div>
                      <div className="text-base text-gray-700 mb-1">{a.email}</div>
                      <div className="text-base text-gray-700 mb-1">{a.company}</div>
                      <div className={`text-sm font-semibold mb-2 ${a.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>{a.status}</div>
                      <button className="text-red-600 underline text-xs mt-2">Remove</button>
                    </div>
                  ))}
                </div>
                <p className="text-gray-500 text-sm mt-8">Click an agent block to track their work separately.</p>
              </>
            ) : (
              <div className="bg-white border border-blue-100 rounded-2xl shadow-xl p-10 w-96 flex flex-col items-center justify-center">
                <h3 className="text-xl font-bold text-blue-600 mb-4">Tracking Work for {agentToTrack?.name}</h3>
                <div className="text-base text-gray-700 mb-2">Email: {agentToTrack?.email}</div>
                <div className="text-base text-gray-700 mb-2">Company: {agentToTrack?.company}</div>
                <div className={`text-sm font-semibold mb-2 ${agentToTrack?.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>Status: {agentToTrack?.status}</div>
                <div className="mt-4 text-gray-600">Demo: Show work logs, SIM sales, photo uploads, and visit logs for this agent here.</div>
                <button className="mt-8 bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold text-lg shadow hover:bg-blue-700 transition" onClick={() => setSelectedAgent(null)}>Back to All Agents</button>
              </div>
            )}
          </div>
        );
      case "reports":
        // Company performance demo
        const companyStats = demoCompanies.map(c => {
          const assignedAgents = demoAgents.filter(a => a.company === c.name).length;
          const performance = Math.round((assignedAgents / c.agents) * 100); // Demo: % of assigned agents
          const improvement = performance < 80 ? "Needs more digital marketing" : "On track";
          return { ...c, assignedAgents, performance, improvement };
        });
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h2 className="text-3xl font-bold text-blue-700 mb-10">Company Stats</h2>
            <div className="grid grid-cols-2 gap-10">
              {companyStats.map((c, i) => (
                <div key={i} className="bg-white border border-blue-100 rounded-2xl shadow-xl p-8 w-80 flex flex-col items-center justify-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">{c.name}</div>
                  <div className="text-base text-gray-700 mb-1">Admin: {c.email}</div>
                  <div className="text-base text-gray-700 mb-1">Agents Assigned: {c.assignedAgents} / {c.agents}</div>
                  <div className="text-base text-gray-700 mb-1">Performance: <span className={c.performance >= 80 ? "text-green-600" : "text-red-600"}>{c.performance}%</span></div>
                  <div className="text-base text-blue-600 font-semibold mb-1">Improvement: {c.improvement}</div>
                  <div className="text-base text-gray-500">Created: {c.created}</div>
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-sm mt-8">Performance is based on assigned agents. Recommendations are demo digital marketing insights.</p>
          </div>
        );
      // Removed KYC section
      case "settings":
        return (
          <div className="max-w-xl mx-auto bg-white border border-blue-100 rounded-2xl shadow-xl p-8 mb-10">
            <h2 className="text-2xl font-bold text-blue-700 mb-6">Settings</h2>
            <div className="mb-6 text-left">
              <h3 className="text-lg font-bold text-blue-600 mb-2">Manage Users & Companies</h3>
              <div className="mb-4">
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold mr-4 hover:bg-red-700 transition">Delete Agent</button>
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition">Delete Company</button>
              </div>
              <div className="mb-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">Change Password</button>
              </div>
              <p className="text-gray-500 text-sm">Demo: These buttons would allow you to delete agents/companies or change your password.</p>
            </div>
          </div>
        );
      case "sendSchedule":
        // Use demoAgents for dropdown
        return (
          <div className="max-w-2xl mx-auto bg-white border border-blue-100 rounded-2xl shadow-xl p-8 mb-10">
            <h2 className="text-2xl font-bold text-blue-700 mb-6">Send Schedule to Agent</h2>
            <form className="mb-6">
              <label htmlFor="agentSelect" className="block text-left text-blue-700 font-semibold mb-1">Select Agent</label>
              <select id="agentSelect" name="agentSelect" className="border rounded-lg px-4 py-2 mb-2 w-full">
                <option value="">Choose agent...</option>
                {demoAgents.map(agent => (
                  <option key={agent.email} value={agent.email}>{agent.name} ({agent.email})</option>
                ))}
              </select>

              <label htmlFor="spazaName" className="block text-left text-blue-700 font-semibold mb-1">Spaza Name</label>
              <input id="spazaName" name="spazaName" type="text" required placeholder="Enter spaza name" className="border rounded-lg px-4 py-2 mb-2 w-full" />

              <label htmlFor="scheduleDate" className="block text-left text-blue-700 font-semibold mb-1">Date</label>
              <input id="scheduleDate" name="scheduleDate" type="date" required className="border rounded-lg px-4 py-2 mb-2 w-full" />

              <div className="flex gap-4">
                <div className="flex-1">
                  <label htmlFor="checkIn" className="block text-left text-blue-700 font-semibold mb-1">Check-In Time</label>
                  <input id="checkIn" name="checkIn" type="time" required className="border rounded-lg px-4 py-2 mb-2 w-full" />
                </div>
                <div className="flex-1">
                  <label htmlFor="checkOut" className="block text-left text-blue-700 font-semibold mb-1">Check-Out Time</label>
                  <input id="checkOut" name="checkOut" type="time" required className="border rounded-lg px-4 py-2 mb-2 w-full" />
                </div>
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:bg-blue-700 transition">Send Schedule</button>
            </form>
            <p className="text-gray-500 text-sm">Choose an agent, spaza name, date, and check-in/out times to assign a schedule.</p>
          </div>
        );
      case "companyInsights": {
        const company = demoCompanies.find(c => c.name === selectedCompany);
        const companyAgents = demoAgents.filter(a => a.company === selectedCompany);
        const companyReports = demoReports.filter(r => r.company === selectedCompany);
        // Demo ad board analytics
        const totalShops = 200; // Example: total shops for the company
        // Simulate ad board data from agent feedback/photos
        const adBoardsByCompany: { [key: string]: number } = {
          "Acme Telecom": 60,
          "RetailX": 45,
        };
        const adBoards = adBoardsByCompany[selectedCompany] || 0;
        // Example: shops that can take more ad boards
        const shopsNeedingBoards = [
          { shop: "Shop 101", canInsert: 6 },
          { shop: "Shop 102", canInsert: 3 },
          { shop: "Shop 103", canInsert: 2 },
        ];
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h2 className="text-3xl font-bold text-blue-700 mb-10">Company Insights</h2>
            <div className="mb-8 w-full max-w-xl mx-auto">
              <label htmlFor="companySelect" className="font-semibold text-blue-700 mr-2">Select Company:</label>
              <select
                id="companySelect"
                value={selectedCompany}
                onChange={e => setSelectedCompany(e.target.value)}
                className="border rounded-lg px-4 py-2"
              >
                {demoCompanies.map((c, i) => (
                  <option key={i} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
              {/* Company Details Block */}
              <div className="bg-white border border-blue-100 rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center w-80">
                <h3 className="text-xl font-bold text-blue-600 mb-4">Company Details</h3>
                {company && (
                  <>
                    <div className="text-base text-gray-700 mb-1"><span className="font-semibold">Admin Email:</span> {company.email}</div>
                    <div className="text-base text-gray-700 mb-1"><span className="font-semibold">Agents:</span> {company.agents}</div>
                    <div className="text-base text-gray-700 mb-1"><span className="font-semibold">Created:</span> {company.created}</div>
                  </>
                )}
              </div>
              {/* Ad Board Analytics Block */}
              <div className="bg-white border border-blue-100 rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center w-80">
                <h3 className="text-xl font-bold text-blue-600 mb-4">Ad Board Analytics</h3>
                <div className="text-base text-gray-700 mb-1"><span className="font-semibold">Total Shops:</span> {totalShops}</div>
                <div className="text-base text-gray-700 mb-1"><span className="font-semibold">Ad Boards Installed:</span> {adBoards}</div>
                <div className="text-base text-gray-700 mb-1"><span className="font-semibold">Shops Without Ad Boards:</span> {totalShops - adBoards}</div>
                <h4 className="text-md font-bold text-blue-500 mt-4 mb-2">Shops That Can Take More Ad Boards</h4>
                <ul className="list-disc ml-6">
                  {shopsNeedingBoards.length > 0 ? shopsNeedingBoards.map((s, i) => (
                    <li key={i}>{s.shop}: Can insert {s.canInsert} ad boards</li>
                  )) : <li>No recommendations available.</li>}
                </ul>
                <p className="text-gray-500 text-sm mt-2">Demo: Data from agent analytics/photos. Gonxt can recommend ad board placements to each company.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
              {/* Agents Block */}
              <div className="bg-white border border-blue-100 rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center w-80">
                <h3 className="text-xl font-bold text-blue-600 mb-4">Agents</h3>
                <ul className="list-disc ml-6">
                  {companyAgents.length > 0 ? companyAgents.map((a, i) => (
                    <li key={i}>{a.name} ({a.email}) - {a.status}</li>
                  )) : <li>No agents registered.</li>}
                </ul>
              </div>
              {/* Reports Block */}
              <div className="bg-white border border-blue-100 rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center w-80">
                <h3 className="text-xl font-bold text-blue-600 mb-4">Reports</h3>
                <ul className="list-disc ml-6">
                  {companyReports.length > 0 ? companyReports.map((r, i) => (
                    <li key={i}>{r.report} ({r.date})</li>
                  )) : <li>No reports available.</li>}
                </ul>
              </div>
            </div>
            <button
              className="bg-blue-600 text-white py-3 px-6 rounded-xl font-bold text-lg shadow-lg hover:bg-blue-700 transition"
              onClick={() => alert(`Demo: Downloading report for ${selectedCompany}`)}
            >
              Download Overall Report
            </button>
          </div>
        );
      }
      default:
        return null;
    }
  }
}
