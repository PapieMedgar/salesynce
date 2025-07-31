import { useState } from 'react';
import styles from './FootSoldierDashboard.module.css';
import dynamicStyles from './FootSoldierDashboardDynamic.module.css';
import Footer from '../components/Footer';
import gonextLogo from '../assets/gonext_white.jpeg';


export default function FootSoldierDashboard() {
  const [activeSection, setActiveSection] = useState('home');

  // State for upload photos form fields (move hooks to top level)
  const [pictureType, setPictureType] = useState('');
  const [detectedInside, setDetectedInside] = useState('');
  const [missingInside, setMissingInside] = useState('');
  const [detectedOutside, setDetectedOutside] = useState('');
  const [missingOutside, setMissingOutside] = useState('');
  const [boardSpace, setBoardSpace] = useState(''); // inches or space taken
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [points, setPoints] = useState<{x: number, y: number}[]>([]);
  const [referenceLength, setReferenceLength] = useState(''); // inches

  // State for visit log check-in/out
  const [checkIn, setCheckIn] = useState<{ time: string; location: string } | null>(null);
  const [checkOut, setCheckOut] = useState<{ time: string; location: string } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Helper to get real-time location
  function getLocationAndSet(type: 'in' | 'out') {
    setLocationError(null);
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = pos.coords;
        const loc = `Lat: ${coords.latitude.toFixed(5)}, Lng: ${coords.longitude.toFixed(5)}`;
        const now = new Date();
        const time = now.toLocaleString();
        if (type === 'in') {
          setCheckIn({ time, location: loc });
        } else {
          setCheckOut({ time, location: loc });
        }
      },
      () => {
        setLocationError('Unable to retrieve your location.');
      }
    );
  }

  const sections = [
    { key: 'home', label: 'Dashboard Home' },
    { key: 'viewSchedule', label: 'View Schedule' },
    { key: 'uploadPhotos', label: 'Upload Photos' },
    { key: 'visitLog', label: 'Visit Log (Check-in/Check-out)' },
  ];

  function renderSection() {
    switch (activeSection) {
      case 'viewSchedule':
        return (
          <div className="flex flex-col items-center justify-center py-12">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">View Schedule</h2>
            <p className="text-gray-600 mb-6">Your upcoming visits and tasks are shown below.</p>
            {/* Demo schedule data */}
            <ul className="max-w-md mx-auto bg-blue-50 rounded-xl p-6 shadow space-y-4">
              <li className="text-blue-700 font-semibold">Store A - 10:00 AM</li>
              <li className="text-blue-700 font-semibold">Store B - 12:30 PM</li>
              <li className="text-blue-700 font-semibold">Store C - 3:00 PM</li>
            </ul>
          </div>
        );
      case 'uploadPhotos': {
        // Demo data for ad boards and analytics
        const detectedBoards = ['CocaCola', 'MTN', 'Shoprite'];
        const shopRadiusInside = 12; // meters, demo value
        const shopRadiusOutside = 18; // meters, demo value
        const maxBoardsPossible = Math.floor(shopRadiusOutside / 3); // assume each board needs 3m
        const spaceLeft = maxBoardsPossible - detectedBoards.length;
        return (
          <>
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Shop Ad Board Analytics & Photo Upload</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-10 mb-8">
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-8 shadow text-center">
                <div className="text-3xl font-extrabold text-blue-600 mb-2">{shopRadiusInside}m</div>
                <div className="text-lg font-medium text-gray-700">Shop Radius (Inside)</div>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-8 shadow text-center">
                <div className="text-3xl font-extrabold text-blue-600 mb-2">{shopRadiusOutside}m</div>
                <div className="text-lg font-medium text-gray-700">Shop Radius (Outside)</div>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-8 shadow text-center">
                <div className="text-3xl font-extrabold text-blue-600 mb-2">{spaceLeft}</div>
                <div className="text-lg font-medium text-gray-700">Space Left for Ad Boards</div>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-8 shadow text-center">
                <div className="text-3xl font-extrabold text-blue-600 mb-2">{boardSpace || '--'}</div>
                <div className="text-lg font-medium text-gray-700">Total Board Space (inches)</div>
              </div>
            </div>
            <form className="w-full max-w-md mx-auto bg-blue-50 rounded-xl p-6 shadow space-y-5 mt-8" onSubmit={e => e.preventDefault()}>
              <div>
                <label htmlFor="boardSpace" className="block text-base font-semibold text-gray-700 mb-1">Total Board Space (inches)</label>
                <input
                  id="boardSpace"
                  name="boardSpace"
                  type="number"
                  min="0"
                  value={boardSpace}
                  onChange={e => setBoardSpace(e.target.value)}
                  placeholder="e.g. 48"
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg"
                />
              </div>
              <div>
                <label htmlFor="pictureType" className="block text-base font-semibold text-gray-700 mb-1">Picture Type</label>
                <select id="pictureType" name="pictureType" value={pictureType} onChange={e => setPictureType(e.target.value)} className="w-full px-4 py-2 border border-blue-200 rounded-lg">
                  <option value="">Select type...</option>
                  <option value="billboards">Billboards</option>
                  <option value="adboards">Ad Boards</option>
                  <option value="shelve">Shelve</option>
                  <option value="outside">Outside</option>
                </select>
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-700 mb-1">Detected Boards (Inside)</label>
                <input type="text" value={detectedInside} onChange={e => setDetectedInside(e.target.value)} placeholder="e.g. CocaCola, MTN" className="w-full px-4 py-2 border border-blue-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-700 mb-1">Missing Boards (Inside)</label>
                <input type="text" value={missingInside} onChange={e => setMissingInside(e.target.value)} placeholder="e.g. Vodacom, CellC" className="w-full px-4 py-2 border border-blue-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-700 mb-1">Detected Boards (Outside)</label>
                <input type="text" value={detectedOutside} onChange={e => setDetectedOutside(e.target.value)} placeholder="e.g. Shoprite" className="w-full px-4 py-2 border border-blue-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-700 mb-1">Missing Boards (Outside)</label>
                <input type="text" value={missingOutside} onChange={e => setMissingOutside(e.target.value)} placeholder="e.g. Telkom" className="w-full px-4 py-2 border border-blue-200 rounded-lg" />
              </div>
              <div>
                <label htmlFor="photoUpload" className="block text-base font-semibold text-gray-700 mb-1">Upload Photo (for measurement)</label>
                <input
                  id="photoUpload"
                  name="photoUpload"
                  type="file"
                  accept="image/*"
                  className="w-full"
                  onChange={e => {
                    const file = e.target.files && e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = ev => {
                        setPhotoPreview(ev.target?.result as string);
                        setPoints([]);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <p className="text-xs text-gray-500 mt-1">Select a photo, then mark two points to measure board space.</p>
              </div>
              {photoPreview && (
                <div className="my-4">
                  <div className="mb-2 text-sm text-blue-700">Click two points on the image to measure the board (use a reference object of known length in the photo for calibration).</div>
                  <div className={styles.photoMeasurementContainer}>
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className={styles.photoMeasurementImage}
                      onClick={e => {
                        const rect = (e.target as HTMLImageElement).getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        if (points.length < 2) {
                          setPoints([...points, {x, y}]);
                        }
                      }}
                    />
                    {points.map((pt, idx) => (
                      <div
                        key={idx}
                        className={dynamicStyles.photoMeasurementPointDynamic}
                        style={{ left: `${pt.x - 6}px`, top: `${pt.y - 6}px` }}
                      />
                    ))}
                  </div>
                  {points.length === 2 && (
                    <div className="mt-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Reference Length (inches)</label>
                      <input
                        type="number"
                        min="0.1"
                        step="any"
                        value={referenceLength}
                        onChange={e => setReferenceLength(e.target.value)}
                        className="w-32 px-2 py-1 border border-blue-200 rounded-lg mr-2"
                        placeholder="e.g. 12"
                      />
                      <button
                        type="button"
                        className="bg-blue-600 text-white px-3 py-1 rounded-lg font-bold hover:bg-blue-700 transition"
                        onClick={() => {
                          // Calculate pixel distance
                          const dx = points[1].x - points[0].x;
                          const dy = points[1].y - points[0].y;
                          const dist = Math.sqrt(dx*dx + dy*dy);
                          if (referenceLength && dist > 0) {
                            // For demo, assume the two points are on the board and the reference is the same as the board
                            const ref = parseFloat(referenceLength);
                            setBoardSpace(ref.toString());
                          }
                        }}
                      >
                        Estimate Inches
                      </button>
                      <button
                        type="button"
                        className="ml-2 text-xs text-blue-600 underline"
                        onClick={() => { setPoints([]); }}
                      >
                        Reset Points
                      </button>
                    </div>
                  )}
                </div>
              )}
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition">Upload Photos</button>
            </form>
            <p className="text-xs text-gray-500 mt-4">Select picture type, enter detected/missing boards inside and outside, and upload photos. Analytics will update for agent review.</p>
          </>
        );
      }
      case 'visitLog':
        return (
          <div className="flex flex-col items-center justify-center py-12">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Visit Log (Check-in/Check-out)</h2>
            <p className="text-gray-600 mb-6">Punch in and out with your real-time location for accurate visit tracking.</p>
            <div className="flex flex-col gap-4 mb-6 w-full max-w-md">
              <button
                className="bg-green-600 text-white py-2 px-6 rounded-lg font-bold hover:bg-green-700 transition disabled:opacity-60"
                onClick={() => getLocationAndSet('in')}
                disabled={!!checkIn}
              >
                {checkIn ? 'Checked In' : 'Check In (with Location)'}
              </button>
              {checkIn && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                  <div className="font-semibold text-blue-700">Checked In:</div>
                  <div className="text-gray-700">Time: {checkIn.time}</div>
                  <div className="text-gray-700">Location: {checkIn.location}</div>
                </div>
              )}
              <button
                className="bg-red-600 text-white py-2 px-6 rounded-lg font-bold hover:bg-red-700 transition disabled:opacity-60"
                onClick={() => getLocationAndSet('out')}
                disabled={!checkIn || !!checkOut}
              >
                {checkOut ? 'Checked Out' : 'Check Out (with Location)'}
              </button>
              {checkOut && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                  <div className="font-semibold text-blue-700">Checked Out:</div>
                  <div className="text-gray-700">Time: {checkOut.time}</div>
                  <div className="text-gray-700">Location: {checkOut.location}</div>
                </div>
              )}
              {locationError && (
                <div className="text-red-600 text-sm mt-2">{locationError}</div>
              )}
            </div>
            {/* Demo visit log data */}
            <ul className="max-w-md mx-auto bg-blue-50 rounded-xl p-6 shadow space-y-4 mb-6">
              <li className="text-blue-700 font-semibold">Store A - Checked in 09:55 AM</li>
              <li className="text-blue-700 font-semibold">Store B - Checked out 12:45 PM</li>
              <li className="text-blue-700 font-semibold">Store C - Checked in 2:10 PM</li>
            </ul>
            <button
              className="bg-blue-600 text-white py-2 px-6 rounded-lg font-bold hover:bg-blue-700 transition"
              onClick={() => setActiveSection('home')}
            >Back to Dashboard</button>
          </div>
        );
      default:
        // Dashboard summary
        const stats = [
          { label: 'Stores Visited', value: 18 },
          { label: 'Photos Uploaded', value: 12 },
        ];
        return (
          <>
            <h1 className="text-3xl font-bold text-blue-600 mb-4">Footsoldier Dashboard</h1>
            <p className="text-lg text-gray-600 max-w-xl mx-auto mb-8">
              View your work summary, schedule, and upload photos for agent review.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-10">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-blue-50 border border-blue-100 rounded-xl p-8 shadow text-center">
                  <div className="text-4xl font-extrabold text-blue-600 mb-2">{stat.value}</div>
                  <div className="text-lg font-medium text-gray-700">{stat.label}</div>
                </div>
              ))}
            </div>
          </>
        );
    }
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
                <li key={section.key || section.label}>
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
          {renderSection()}
        </main>
      </div>
      <Footer />
    </div>
  );
}
