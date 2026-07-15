import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Package,
  Truck,
  Globe,
  Shield,
  Clock,
  Star,
  ArrowRight,
  CheckCircle,
  MapPinned,
  Zap,
} from "lucide-react";
import TrackingForm from "../components/forms/TrackingForm";
import CookieConsent from "../components/CookieConsent";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isTracking, setIsTracking] = useState(false);

  const handleTrack = (trackingNumber: string) => {
    setIsTracking(true);
    setTimeout(() => {
      setIsTracking(false);
      navigate(`/track?number=${trackingNumber}`);
    }, 1000);
  };

  const features = [
    {
      icon: Zap,
      title: "Express Logistics",
      description:
        "Priority dispatch and rapid delivery solutions tailored for urgent shipments.",
    },
    {
      icon: Shield,
      title: "Protected Deliveries",
      description:
        "Advanced package handling and secure transportation from pickup to destination.",
    },
    {
      icon: Globe,
      title: "International Coverage",
      description:
        "Reliable shipping operations connecting businesses and customers worldwide.",
    },
    {
      icon: MapPinned,
      title: "Live Shipment Tracking",
      description:
        "Monitor shipment activity and delivery progress in real time.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "E-commerce Store Owner",
      rating: 5,
      text: "Safewing Consignments transformed our fulfillment process. Fast response times and professional handling every time.",
    },
    {
      name: "Mike Chen",
      company: "Retail Supplier",
      rating: 5,
      text: "The shipment tracking and customer communication tools are extremely reliable and easy to use.",
    },
    {
      name: "Emily Davis",
      company: "Online Business Owner",
      rating: 5,
      text: "Professional service, smooth delivery experience, and excellent support team.",
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative bg-slate-950 text-white">
        {/* Background Glow */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* LEFT */}
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm mb-6">
                <Truck className="h-4 w-4 mr-2 text-cyan-400" />
                Trusted Global Courier Network
              </div>

              <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
                Delivering
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  Speed & Trust
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
                Smart courier solutions built for businesses and individuals.
                Fast dispatch, secure handling, and real-time shipment tracking
                across local and international destinations.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-2xl transition-all duration-300 shadow-xl"
                >
                  Schedule Delivery
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>

                <Link
                  to="/calculate"
                  className="inline-flex items-center justify-center px-8 py-4 border border-white/20 hover:bg-white hover:text-slate-950 text-white font-semibold rounded-2xl transition-all duration-300"
                >
                  Calculate Pricing
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold">1M+</div>
                  <div className="text-slate-400 text-sm">
                    Successful Deliveries
                  </div>
                </div>

                <div>
                  <div className="text-3xl font-bold">200+</div>
                  <div className="text-slate-400 text-sm">
                    Global Destinations
                  </div>
                </div>

                <div>
                  <div className="text-3xl font-bold">24/7</div>
                  <div className="text-slate-400 text-sm">
                    Customer Assistance
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative">
              <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold">
                      Track Your Shipment
                    </h3>
                    <p className="text-slate-400 mt-1">
                      Enter your tracking ID for live updates
                    </p>
                  </div>

                  <div className="bg-cyan-500/20 p-3 rounded-2xl">
                    <Package className="h-8 w-8 text-cyan-400" />
                  </div>
                </div>

                <TrackingForm
                  onTrack={handleTrack}
                  isLoading={isTracking}
                />

                <div className="mt-8 space-y-4">
                  <div className="flex items-center text-sm text-slate-300">
                    <CheckCircle className="h-5 w-5 text-cyan-400 mr-3" />
                    Real-time tracking notifications
                  </div>

                  <div className="flex items-center text-sm text-slate-300">
                    <CheckCircle className="h-5 w-5 text-cyan-400 mr-3" />
                    Reliable domestic and international delivery
                  </div>

                  <div className="flex items-center text-sm text-slate-300">
                    <CheckCircle className="h-5 w-5 text-cyan-400 mr-3" />
                    Secure shipment handling and verification
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 font-medium mb-4">
              Why Businesses Choose Safewing Consignments
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
              Modern Logistics Infrastructure
            </h2>

            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              We combine speed, reliability, and technology-driven operations
              to simplify the shipping experience for customers worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl p-8 border border-slate-200 hover:border-cyan-300 hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-2xl"
              >
                <div className="w-16 h-16 rounded-2xl bg-slate-950 text-cyan-400 flex items-center justify-center mb-6 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-300">
                  <feature.icon className="h-8 w-8" />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  {feature.title}
                </h3>

                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE HIGHLIGHT */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex px-4 py-2 rounded-full bg-slate-100 text-slate-700 mb-6">
                Enterprise & Personal Shipping
              </div>

              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
                Logistics Built Around Your Needs
              </h2>

              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Whether you're managing business deliveries or sending personal
                packages, Safewing Consignments provides dependable courier services designed
                for flexibility, speed, and transparency.
              </p>

              <div className="space-y-5">
                <div className="flex">
                  <CheckCircle className="h-6 w-6 text-cyan-500 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      Automated Shipment Updates
                    </h4>
                    <p className="text-slate-600">
                      Instant notifications from dispatch to delivery.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <CheckCircle className="h-6 w-6 text-cyan-500 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      Secure Package Handling
                    </h4>
                    <p className="text-slate-600">
                      Professionally managed logistics operations.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <CheckCircle className="h-6 w-6 text-cyan-500 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      Scalable Shipping Solutions
                    </h4>
                    <p className="text-slate-600">
                      Ideal for businesses, retailers, and individual customers.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-10 text-white shadow-2xl">
                <div className="flex items-center mb-8">
                  <div className="p-4 rounded-2xl bg-cyan-500/20 mr-4">
                    <Truck className="h-10 w-10 text-cyan-400" />
                  </div>

                  <div>
                    <div className="text-2xl font-bold">
                      Fast & Reliable
                    </div>
                    <div className="text-slate-400">
                      Optimized shipping operations
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-slate-300">
                      Delivery Success Rate
                    </span>
                    <span className="font-bold text-cyan-400">99.9%</span>
                  </div>

                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-slate-300">
                      Active Delivery Routes
                    </span>
                    <span className="font-bold text-cyan-400">500+</span>
                  </div>

                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-slate-300">
                      Customer Satisfaction
                    </span>
                    <span className="font-bold text-cyan-400">4.9/5</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">
                      Daily Shipments
                    </span>
                    <span className="font-bold text-cyan-400">10,000+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Trusted by Customers Worldwide
            </h2>

            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Businesses and individuals rely on Safewing Consignments for efficient and
              dependable shipping services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm"
              >
                <div className="flex mb-5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                <p className="text-slate-300 leading-relaxed mb-6">
                  "{testimonial.text}"
                </p>

                <div>
                  <div className="font-bold text-lg">
                    {testimonial.name}
                  </div>

                  <div className="text-slate-400 text-sm">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Ready to Simplify Your Shipping?
          </h2>

          <p className="text-xl text-cyan-100 mb-10 max-w-2xl mx-auto">
            Join thousands of businesses and individuals using Safewing Consignments for
            reliable local and international deliveries.
          </p>

          <Link
            to="/register"
            className="inline-flex items-center px-10 py-5 bg-white text-slate-950 font-bold rounded-2xl hover:scale-105 transition-all duration-300 shadow-2xl"
          >
            Create Your Account
            <ArrowRight className="ml-3 h-5 w-5" />
          </Link>
        </div>
      </section>

      <CookieConsent />
    </div>
  );
};

export default Home;