import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("agent");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Log for development purposes
    console.log("Signing in:", { email, password, role });

    // Save user role to local storage
    localStorage.setItem("userRole", role);

    // Route based on role and email
    if (role === "admin") {
      localStorage.setItem("companyAdminEmail", email);
      if (email === "admin@acmetel.com" || email === "superadmin@gonxt.com") {
        navigate("/superadmin-dashboard");
      } else {
        navigate("/admin-dashboard");
      }
    } else if (role === "footsoldier") {
      navigate("/footsoldier-dashboard");
    } else {
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
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-base font-semibold text-gray-700 mb-1"
            >
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

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-base font-semibold text-gray-700 mb-1"
            >
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

          {/* Role Dropdown */}
          <div>
            <label
              htmlFor="role"
              className="block text-base font-semibold text-gray-700 mb-1"
            >
              Sign in as
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 w-full px-5 py-3 border border-blue-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg bg-blue-50/50"
            >
              <option value="agent">Field Agent</option>
              <option value="footsoldier">Footsoldier</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:from-blue-700 hover:to-blue-500 transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
