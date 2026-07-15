import React, { useState } from "react";
import {
  Calculator,
  Package,
  Truck,
  MapPin,
  Zap,
  ArrowRight,
} from "lucide-react";
import LoadingSpinner from "../components/common/LoadingSpinner";

const Pricing: React.FC = () => {
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    weight: "",
    length: "",
    width: "",
    height: "",
    service: "express",
  });
  const [isCalculating, setIsCalculating] = useState(false);
  const [quote, setQuote] = useState<number | null>(null);

  const pricingTiers = [];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const calculateShipping = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);

    setTimeout(() => {
      const baseRate =
        formData.service === "express"
          ? 19.99
          : formData.service === "international"
          ? 39.99
          : 9.99;

      const weight = parseFloat(formData.weight) || 1;
      const volume =
        (parseFloat(formData.length) || 1) *
        (parseFloat(formData.width) || 1) *
        (parseFloat(formData.height) || 1);

      const calculatedQuote = baseRate + weight * 2 + volume * 0.1;

      setQuote(Math.round(calculatedQuote * 100) / 100);
      setIsCalculating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* HERO */}
      <section className="relative bg-slate-950 text-white">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 blur-3xl rounded-full"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-24 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm mb-6">
            <Zap className="h-4 w-4 mr-2 text-cyan-400" />
            Instant Shipping Estimates
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6">
            Shipping
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
              Calculator
            </span>
          </h1>

          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Get accurate delivery pricing in seconds. No hidden fees, no
            surprises.
          </p>
        </div>
      </section>

      {/* CALCULATOR */}
      <section className="py-24 bg-slate-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-xl p-10 border border-slate-200">
            <div className="flex items-center mb-10">
              <div className="p-3 bg-cyan-100 rounded-xl mr-4">
                <Calculator className="h-6 w-6 text-cyan-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                Calculate Shipping Cost
              </h2>
            </div>

            <form onSubmit={calculateShipping} className="space-y-8">
              {/* LOCATIONS */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    Origin
                  </label>
                  <input
                    type="text"
                    name="origin"
                    value={formData.origin}
                    onChange={handleInputChange}
                    placeholder="Pickup location"
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    Destination
                  </label>
                  <input
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleInputChange}
                    placeholder="Delivery location"
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500"
                    required
                  />
                </div>
              </div>

              {/* DIMENSIONS */}
              <div className="grid md:grid-cols-4 gap-6">
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  placeholder="Weight"
                  className="px-4 py-3 border rounded-xl"
                  required
                />
                <input
                  type="number"
                  name="length"
                  value={formData.length}
                  onChange={handleInputChange}
                  placeholder="Length"
                  className="px-4 py-3 border rounded-xl"
                  required
                />
                <input
                  type="number"
                  name="width"
                  value={formData.width}
                  onChange={handleInputChange}
                  placeholder="Width"
                  className="px-4 py-3 border rounded-xl"
                  required
                />
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  placeholder="Height"
                  className="px-4 py-3 border rounded-xl"
                  required
                />
              </div>

              {/* SERVICE */}
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  <Truck className="h-4 w-4 inline mr-1" />
                  Service Type
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="local">Local Delivery</option>
                  <option value="express">Express Shipping</option>
                  <option value="international">International</option>
                  <option value="freight">Freight</option>
                </select>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={isCalculating}
                className="w-full py-4 rounded-xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:scale-[1.02] transition-all disabled:opacity-50"
              >
                {isCalculating ? (
                  <div className="flex justify-center items-center">
                    <LoadingSpinner size="sm" className="mr-2" />
                    Calculating...
                  </div>
                ) : (
                  "Get Instant Quote"
                )}
              </button>
            </form>

            {/* RESULT */}
            {quote && (
              <div className="mt-10 p-8 rounded-2xl bg-green-50 border border-green-200 text-center">
                <h3 className="text-lg font-semibold text-green-900 mb-2">
                  Estimated Cost
                </h3>

                <div className="text-4xl font-black text-green-600 mb-2">
                  ${quote}
                </div>

                <p className="text-green-700 text-sm">
                  Final cost may vary slightly based on exact logistics and
                  delivery conditions.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-center">
        <h2 className="text-4xl font-black mb-6">
          Ready to Ship Your Package?
        </h2>

        <p className="text-lg text-cyan-100 mb-10">
          Create an account and start shipping in minutes.
        </p>

        <a
          href="/register"
          className="inline-flex items-center px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:scale-105 transition-all"
        >
          Get Started
          <ArrowRight className="ml-2 h-5 w-5" />
        </a>
      </section>
    </div>
  );
};

export default Pricing;