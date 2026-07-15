import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Truck,
  Plane,
  Ship,
  Package,
  Clock,
  Globe,
  Shield,
  ArrowRight,
  CheckCircle,
  Zap,
  Layers,
} from "lucide-react";

const Services: React.FC = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: Truck,
      title: "Local Delivery",
      description:
        "Fast and efficient same-day or next-day delivery within your city.",
      features: [
        "Same-day delivery",
        "Real-time tracking",
        "Signature confirmation",
        "Insurance included",
      ],
      color: "from-cyan-500 to-blue-600",
    },
    {
      icon: Clock,
      title: "Express Shipping",
      description:
        "Priority nationwide delivery with optimized transit times.",
      features: [
        "1-3 day delivery",
        "Priority handling",
        "SMS notifications",
        "Guaranteed delivery",
      ],
      color: "from-purple-500 to-indigo-600",
    },
    {
      icon: Plane,
      title: "International",
      description:
        "Seamless global shipping with customs and compliance handled.",
      features: [
        "Customs processing",
        "Door-to-door delivery",
        "Duty & tax handling",
        "International tracking",
      ],
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: Ship,
      title: "Freight Services",
      description:
        "Bulk and heavy cargo shipping solutions for businesses.",
      features: [
        "Pallet shipping",
        "LTL & FTL options",
        "Specialized handling",
        "Enterprise logistics",
      ],
      price: "Custom pricing",
      color: "from-orange-500 to-amber-600",
    },
    {
      icon: Package,
      title: "E-commerce Solutions",
      description:
        "Integrated delivery systems for online businesses and retailers.",
      features: [
        "API integration",
        "Bulk shipping tools",
        "Return management",
        "Analytics dashboard",
      ],
      price: "Volume discounts",
      color: "from-red-500 to-pink-600",
    },
    {
      icon: Shield,
      title: "Secure Shipping",
      description:
        "Enhanced protection for sensitive and high-value shipments.",
      features: [
        "Advanced security",
        "Tamper-proof packaging",
        "Chain of custody",
      ],
      color: "from-indigo-500 to-blue-700",
    },
  ];

  const additionalServices = [
    {
      title: "Shipment Insurance",
      description:
        "Comprehensive protection for valuable or sensitive deliveries.",
      icon: Shield,
    },
    {
      title: "Professional Packaging",
      description:
        "Secure packaging designed to protect items during transit.",
      icon: Package,
    },
    {
      title: "Scheduled Pickup",
      description:
        "Convenient pickup services tailored to your schedule.",
      icon: Truck,
    },
    {
      title: "Storage & Fulfillment",
      description:
        "Short-term storage and logistics support for businesses.",
      icon: Layers,
    },
  ];

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
            <Globe className="h-4 w-4 mr-2 text-cyan-400" />
            Logistics Solutions for Every Need
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6">
            Our
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
              Services
            </span>
          </h1>

          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            From local delivery to global logistics, explore flexible and
            reliable shipping services designed for individuals and businesses.
          </p>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-24 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-slate-900 mb-6">
              Core Shipping Services
            </h2>
            <p className="text-lg text-slate-600">
              Flexible logistics options designed to meet your delivery needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <div
                key={index}
                className="group rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200"
              >
                <div
                  className={`bg-gradient-to-r ${service.color} p-8 text-white`}
                >
                  <service.icon className="h-12 w-12 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">
                    {service.title}
                  </h3>
                  <p className="text-white/80">
                    {service.description}
                  </p>
                </div>

                <div className="p-8">
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center text-slate-700"
                      >
                        <CheckCircle className="h-4 w-4 text-cyan-500 mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-slate-800">
                      {service.price || "Flexible pricing"}
                    </span>

                    <Link
                      to="/calculate"
                      className="inline-flex items-center text-cyan-600 font-semibold hover:text-cyan-500"
                    >
                      Get Quote
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADDITIONAL SERVICES */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-slate-900 mb-6">
              Additional Services
            </h2>
            <p className="text-lg text-slate-600">
              Enhance your delivery experience with optional services
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-10">
            {additionalServices.map((service, index) => (
              <div
                key={index}
                className="group bg-slate-100 rounded-3xl p-8 text-center hover:bg-slate-950 transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-white text-cyan-500 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all">
                  <service.icon className="h-8 w-8" />
                </div>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-white mb-4">
                  {service.title}
                </h3>

                <p className="text-slate-600 group-hover:text-slate-300">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
        <div className="max-w-5xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Ready to Get Started?
          </h2>

          <p className="text-xl text-cyan-100 mb-10">
            Choose a service that fits your needs and begin shipping with
            confidence today.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <Link
              to="/calculate"
              className="inline-flex items-center px-8 py-4 bg-white text-slate-950 font-bold rounded-2xl hover:scale-105 transition-all"
            >
              Calculate Cost
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>

            <Link
              to="/register"
              className="inline-flex items-center px-8 py-4 border border-white/30 rounded-2xl hover:bg-white hover:text-slate-950 transition-all"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;