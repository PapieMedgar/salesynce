
import Header from '../components/Header';
import Footer from '../components/Footer';
import gonextLogo from '../assets/gonext_white.jpeg';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col">
      <Header />
      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center py-24 px-4">
        <div className="bg-white/80 rounded-3xl shadow-2xl px-10 py-14 flex flex-col items-center max-w-2xl w-full mb-12 border border-blue-100">
          <img src={gonextLogo} alt="GoNext Logo" className="w-36 h-36 mb-8 rounded-2xl border-4 border-blue-600 bg-white shadow-lg" />
          <h1 className="text-5xl font-extrabold text-blue-700 mb-4 tracking-tight">Welcome to Salesync Field Portal</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-xl text-center">
            Your all-in-one platform for field agent check-ins, ad board tracking, SIM sales, and real-time reporting for telecom and retail campaigns.
          </p>
          <a href="/sign-in" className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-10 py-4 rounded-xl font-bold text-xl shadow-lg hover:from-blue-700 hover:to-blue-500 transition mb-2 mt-2">Sign In</a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-5xl w-full mb-16">
          <div className="bg-white/90 border border-blue-100 rounded-2xl p-10 shadow-xl text-center hover:scale-105 transition-transform">
            <div className="text-4xl font-extrabold text-blue-600 mb-2">200+</div>
            <div className="text-lg font-medium text-gray-700">Stores Visited</div>
          </div>
          <div className="bg-white/90 border border-blue-100 rounded-2xl p-10 shadow-xl text-center hover:scale-105 transition-transform">
            <div className="text-4xl font-extrabold text-blue-600 mb-2">120</div>
            <div className="text-lg font-medium text-gray-700">SIM Sales</div>
          </div>
          <div className="bg-white/90 border border-blue-100 rounded-2xl p-10 shadow-xl text-center hover:scale-105 transition-transform">
            <div className="text-4xl font-extrabold text-blue-600 mb-2">70</div>
            <div className="text-lg font-medium text-gray-700">Pepsi Boards</div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-20 bg-white/70">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-blue-700 mb-12 tracking-tight">
            What You Can Do With Salesync
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                title: "Check In/Out at Stores",
                desc: "Field agents can check in and out at every store visited, with GPS and time tracking.",
              },
              {
                title: "Ad Board Tracking",
                desc: "Select which billboards (Pepsi, Coke, Redbull, Play) are present in each store and upload photos for verification.",
              },
              {
                title: "SIM Card Sales & Customer Feedback",
                desc: "Capture GoNxt SIM sales, send customer surveys, and collect ratings and feedback.",
              },
              {
                title: "Real-Time Reporting",
                desc: "Admins get instant access to agent stats, store coverage, and ad board analytics.",
              },
              {
                title: "Photo Uploads",
                desc: "Upload and review store and ad board images for compliance and marketing.",
              },
              {
                title: "Role-Based Dashboards",
                desc: "Field agents and admins each get a dashboard tailored to their needs.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition text-left"
              >
                <h3 className="text-xl font-semibold text-blue-600 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Trusted By Leading Brands</h2>
          <div className="flex flex-wrap justify-center items-center gap-6 opacity-80">
            {["Vodacom", "MTN", "Cell C", "Telkom", "Pepsi", "Coke", "Redbull", "Play"].map((name, i) => (
              <div
                key={i}
                className="bg-gray-100 px-6 py-3 rounded-lg text-sm font-medium text-gray-700"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
