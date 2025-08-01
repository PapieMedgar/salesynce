<<<<<<< HEAD

import { useState } from "react";
import { useNavigate } from "react-router-dom";


=======
import { useState } from "react";
import { useNavigate } from "react-router-dom";

>>>>>>> bad3d49 (Initial commit)
export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("agent");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sign-in (replace with real auth)
    console.log("Signing in:", { email, password, role });
<<<<<<< HEAD
    localStorage.setItem('userRole', role); // Store role for global access
    if (role === "admin") {
      // Simulate company context: set admin email in localStorage for dashboard
      localStorage.setItem('companyAdminEmail', email);
      // Route super admin to dedicated dashboard, others to company admin dashboard
      if (email === 'admin@acmetel.com' || email === 'superadmin@gonxt.com') {
=======
    localStorage.setItem("userRole", role); // Store role for global access
    if (role === "admin") {
      // Simulate company context: set admin email in localStorage for dashboard
      localStorage.setItem("companyAdminEmail", email);
      // Route super admin to dedicated dashboard, others to company admin dashboard
      if (email === "admin@acmetel.com" || email === "superadmin@gonxt.com") {
>>>>>>> bad3d49 (Initial commit)
        navigate("/super-admin-dashboard");
      } else {
        navigate("/admin-dashboard");
      }
    } else {
      // For agent, after dashboard, show links to schedule and visit log
      navigate("/agent-dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white/90 rounded-3xl shadow-2xl p-10 border border-blue-100">
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-8 tracking-tight">
          Sign In to SalesSync
        </h2>
        <form onSubmit={handleSubmit} className="space-y-7">
          <div>
<<<<<<< HEAD
            <label htmlFor="email" className="block text-base font-semibold text-gray-700 mb-1">
=======
            <label
              htmlFor="email"
              className="block text-base font-semibold text-gray-700 mb-1"
            >
>>>>>>> bad3d49 (Initial commit)
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-5 py-3 border border-blue-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg bg-blue-50/50"
            />
          </div>

          <div>
<<<<<<< HEAD
            <label htmlFor="password" className="block text-base font-semibold text-gray-700 mb-1">
=======
            <label
              htmlFor="password"
              className="block text-base font-semibold text-gray-700 mb-1"
            >
>>>>>>> bad3d49 (Initial commit)
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-5 py-3 border border-blue-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg bg-blue-50/50"
            />
          </div>

          <div>
<<<<<<< HEAD
            <label htmlFor="role" className="block text-base font-semibold text-gray-700 mb-1">
=======
            <label
              htmlFor="role"
              className="block text-base font-semibold text-gray-700 mb-1"
            >
>>>>>>> bad3d49 (Initial commit)
              Sign in as
            </label>
            <select
              id="role"
              value={role}
<<<<<<< HEAD
              onChange={e => setRole(e.target.value)}
=======
              onChange={(e) => setRole(e.target.value)}
>>>>>>> bad3d49 (Initial commit)
              className="mt-1 w-full px-5 py-3 border border-blue-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg bg-blue-50/50"
            >
              <option value="agent">Field Agent</option>
              <option value="footsoldier">Footsoldier</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:from-blue-700 hover:to-blue-500 transition"
          >
            Sign In
          </button>
        </form>
        {/* Navigation links for agents */}
        <div className="mt-8 space-y-3">
          {/* Removed agent navigation links as requested */}
<<<<<<< HEAD
          {role === 'footsoldier' && (
            <a href="/footsoldier-dashboard" className="block w-full text-center bg-blue-100 text-blue-700 py-2 rounded-xl font-semibold shadow hover:bg-blue-200 transition">Go to Footsoldier Dashboard</a>
=======
          {role === "footsoldier" && (
            <a
              href="/footsoldier-dashboard"
              className="block w-full text-center bg-blue-100 text-blue-700 py-2 rounded-xl font-semibold shadow hover:bg-blue-200 transition"
            >
              Go to Footsoldier Dashboard
            </a>
>>>>>>> bad3d49 (Initial commit)
          )}
        </div>
      </div>
    </div>
  );
}
