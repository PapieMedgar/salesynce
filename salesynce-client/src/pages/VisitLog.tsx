import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Utility to get user role from localStorage
const getUserRole = () => localStorage.getItem('userRole') || 'agent';


export default function VisitLog() {
  const navigate = useNavigate();
  const role = getUserRole();
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [logs, setLogs] = useState<{ type: string; timestamp: string; lat: number; lng: number; store: string; agent: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [store, setStore] = useState('');
  const agentEmail = localStorage.getItem('companyAdminEmail') || '';

  // Only allow access for agent or manager
  useEffect(() => {
    if (role !== 'agent' && role !== 'manager') {
      navigate('/');
    }
  }, [role, navigate]);

  // Get current GPS location
  const getLocation = (cb: (pos: GeolocationPosition) => void) => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported.');
      return;
    }
    navigator.geolocation.getCurrentPosition(cb, () => setError('Unable to get location.'));
  };

  // Log check-in or check-out
  const handleLog = (type: 'check-in' | 'check-out') => {
    if (!store) {
      setError('Please enter the store name.');
      return;
    }
    getLocation((pos) => {
      const { latitude, longitude } = pos.coords;
      setLocation({ lat: latitude, lng: longitude });
      const log = { type, timestamp: new Date().toISOString(), lat: latitude, lng: longitude, store, agent: agentEmail };
      setLogs((prev) => [...prev, log]);
      setError(null);
      // In a real app, sync to backend or local storage for offline
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col items-center py-10 px-4">
      <h2 className="text-3xl font-bold text-blue-700 mb-8">Visit Log (GPS Check-in/Check-out)</h2>
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 border border-blue-100 mb-8">
        <form className="mb-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Store Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Enter store name"
              value={store}
              onChange={e => setStore(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-4 mb-6">
            <button type="button" onClick={() => handleLog('check-in')} className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold text-lg shadow hover:bg-green-700 transition">Check In</button>
            <button type="button" onClick={() => handleLog('check-out')} className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold text-lg shadow hover:bg-red-700 transition">Check Out</button>
          </div>
        </form>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        {location && (
          <div className="mb-4 text-blue-700">Current Location: {location.lat.toFixed(5)}, {location.lng.toFixed(5)}</div>
        )}
        <h3 className="text-xl font-semibold text-blue-600 mb-2">Visit Logs</h3>
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="py-2 px-2">Type</th>
              <th className="py-2 px-2">Timestamp</th>
              <th className="py-2 px-2">Store</th>
              <th className="py-2 px-2">Latitude</th>
              <th className="py-2 px-2">Longitude</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, i) => (
              <tr key={i} className="border-t border-blue-50">
                <td className="py-2 px-2">{log.type}</td>
                <td className="py-2 px-2">{log.timestamp}</td>
                <td className="py-2 px-2">{log.store}</td>
                <td className="py-2 px-2">{log.lat.toFixed(5)}</td>
                <td className="py-2 px-2">{log.lng.toFixed(5)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
