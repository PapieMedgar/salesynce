import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Simulated user role and schedule data (replace with real auth/data in production)
const getUserRole = () => {
  // Example: get from localStorage or context
  return localStorage.getItem('userRole') || 'agent';
};


type AgentSchedule = { date: string; customer: string; location: string; contact: string; time: string; status: string };
type ManagerSchedule = AgentSchedule & { agent: string };

const sampleSchedules: { agent: AgentSchedule[]; manager: ManagerSchedule[] } = {
  agent: [
    { date: '2025-07-28', customer: 'Shoprite', location: 'Main St', contact: 'John Doe', time: '10:00', status: 'upcoming' },
    { date: '2025-07-28', customer: 'Spar', location: 'Market Rd', contact: 'Jane Smith', time: '14:00', status: 'upcoming' },
  ],
  manager: [
    { agent: 'Agent 1', date: '2025-07-28', customer: 'Shoprite', location: 'Main St', contact: 'John Doe', time: '10:00', status: 'upcoming' },
    { agent: 'Agent 2', date: '2025-07-28', customer: 'Spar', location: 'Market Rd', contact: 'Jane Smith', time: '14:00', status: 'upcoming' },
  ],
};

export default function Schedule() {
  const navigate = useNavigate();
  const role = getUserRole();
  const [schedules, setSchedules] = useState<AgentSchedule[] | ManagerSchedule[]>(role === 'manager' ? sampleSchedules.manager : sampleSchedules.agent);

  // Only allow access for agent or manager
  if (role !== 'agent' && role !== 'manager') {
    navigate('/');
    return null;
  }

  // Push notification simulation (for agent)
  const sendPushNotification = (msg: string) => {
    alert('Push notification: ' + msg);
  };

  // Dynamic rescheduling simulation (for agent)
  const handleReschedule = (idx: number) => {
    if (role !== 'agent') return;
    const updated = schedules.map((s, i) => i === idx ? { ...s, status: 'rescheduled' } : s);
    setSchedules(updated);
    sendPushNotification('Your visit to ' + schedules[idx].customer + ' has been rescheduled!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col items-center py-10 px-4">
      <h2 className="text-3xl font-bold text-blue-700 mb-8">{role === 'manager' ? 'Team Schedules' : 'My Schedule'}</h2>
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
        <table className="w-full text-left">
          <thead>
            <tr>
              {role === 'manager' && schedules.length > 0 && 'agent' in schedules[0] && (
                <th className="py-2 px-2">Agent</th>
              )}
              <th className="py-2 px-2">Date</th>
              <th className="py-2 px-2">Customer</th>
              <th className="py-2 px-2">Location</th>
              <th className="py-2 px-2">Contact</th>
              <th className="py-2 px-2">Time</th>
              <th className="py-2 px-2">Status</th>
              {role === 'agent' && <th className="py-2 px-2">Action</th>}
            </tr>
          </thead>
          <tbody>
            {schedules.map((s, i) => (
              <tr key={i} className="border-t border-blue-50">
                {(role === 'manager' && 'agent' in s) ? <td className="py-2 px-2">{s.agent}</td> : null}
                <td className="py-2 px-2">{s.date}</td>
                <td className="py-2 px-2">{s.customer}</td>
                <td className="py-2 px-2">{s.location}</td>
                <td className="py-2 px-2">{s.contact}</td>
                <td className="py-2 px-2">{s.time}</td>
                <td className="py-2 px-2">{s.status}</td>
                {role === 'agent' ? (
                  <td className="py-2 px-2">
                    {s.status !== 'rescheduled' && (
                      <button onClick={() => handleReschedule(i)} className="text-blue-600 underline text-xs">Reschedule</button>
                    )}
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
        {role === 'agent' && (
          <div className="mt-6 flex flex-col gap-2">
            <button
              onClick={() => sendPushNotification('You have a visit scheduled soon!')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
            >
              Test Push Notification
            </button>
            <div className="text-xs text-gray-500">You will receive reminders for upcoming visits and any changes.</div>
          </div>
        )}
      </div>
    </div>
  );
}
