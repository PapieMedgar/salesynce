import Header from '../components/Header';
import Footer from '../components/Footer';

function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      features: ["Up to 3 field agents", "Basic check-ins", "Email support"],
    },
    {
      name: "Pro",
      price: "R299/mo",
      features: [
        "Up to 50 agents",
        "GPS tracking + photo verification",
        "Offline sync + barcode scanning",
        "Priority email support",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "Unlimited agents",
        "Role-based dashboards",
        "Encrypted KYC & AWS AI",
        "Dedicated success manager",
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">Simple, Transparent Pricing</h1>
          <p className="text-gray-600 mb-10 max-w-xl mx-auto">
            Choose the right plan for your field sales team. Upgrade anytime.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-xl p-6 shadow hover:shadow-lg transition text-left"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{plan.name}</h2>
                <p className="text-blue-600 text-xl font-bold mb-4">{plan.price}</p>
                <ul className="text-sm text-gray-600 space-y-2 mb-6">
                  {plan.features.map((feature, j) => (
                    <li key={j}>• {feature}</li>
                  ))}
                </ul>
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700 transition">
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Pricing;
