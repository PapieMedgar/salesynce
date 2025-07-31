import Header from '../components/Header';
import Footer from '../components/Footer';

function GetStarted() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow bg-white py-16 px-4">
        <div className="max-w-xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">Let’s Get You Started</h1>
          <p className="text-gray-600 mb-8">
            Create your Salesync account and empower your field sales team with real-time tools.
          </p>

          <form className="space-y-4 text-left">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Jane Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <input
                id="company"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Sales Co."
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-full text-sm font-medium hover:bg-blue-700 transition"
            >
              Create Account
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-4">
            Already have an account?{' '}
            <a href="/sign-in" className="text-blue-600 hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default GetStarted;
