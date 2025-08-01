import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:4000/SignIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(data.error || "Login failed. Please check your credentials.");
        return;
      }

      const role = data.role.toLowerCase().replace(/\s+/g, "");

      // Restrict access to only specific roles
      const allowedRoles = ["admin", "footsoldier", "fieldagent"];
      if (!allowedRoles.includes(role)) {
        alert("Access denied. Unauthorized role.");
        return;
      }

      localStorage.setItem("userRole", role);

      if (role === "admin") {
        localStorage.setItem("companyAdminEmail", data.email);
        if (
          data.email === "admin@acmetel.com" ||
          data.email === "superadmin@gonxt.com"
        ) {
          navigate("/superadmin-dashboard");
        } else {
          navigate("/admin-dashboard");
        }
      } else if (role === "footsoldier") {
        navigate("/footsoldier-dashboard");
      } else if (role === "fieldagent") {
        navigate("/agent-dashboard"); // You can rename this if needed
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Could not connect to the server.");
    } finally {
      setLoading(false);
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500"
            } text-white py-3 rounded-xl font-bold text-lg shadow-lg transition`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
