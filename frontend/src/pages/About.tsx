import React from "react";
import {
  Users,
  Target,
  Award,
  Clock,
  Globe,
  CheckCircle,
  Truck,
  Shield,
} from "lucide-react";

const About: React.FC = () => {
  const milestones = [
    {
      year: "2018",
      event: "Safewing Logistics Founded",
      description:
        "Launched with a mission to modernize logistics and courier operations.",
    },
    {
      year: "2019",
      event: "1,000+ Successful Shipments",
      description:
        "Achieved our first major delivery milestone with growing customer trust.",
    },
    {
      year: "2020",
      event: "International Expansion",
      description:
        "Expanded our delivery network across multiple international destinations.",
    },
    {
      year: "2021",
      event: "Advanced Tracking Technology",
      description:
        "Introduced smarter shipment monitoring and real-time delivery updates.",
    },
    {
      year: "2022",
      event: "Sustainable Logistics Initiative",
      description:
        "Implemented environmentally conscious delivery operations and routing.",
    },
    {
      year: "2024",
      event: "1M+ Customer Deliveries",
      description:
        "Reached over one million completed deliveries globally.",
    },
  ];

  const team = [
    {
      name: "John Smith",
      role: "CEO & Founder",
      image: "/placeholder.svg",
      bio: "Experienced logistics strategist focused on building efficient global shipping systems.",
    },
    {
      name: "Sarah Johnson",
      role: "Chief Technology Officer",
      image: "/placeholder.svg",
      bio: "Leads technology innovation and scalable shipment infrastructure development.",
    },
    {
      name: "Mike Chen",
      role: "Head of Operations",
      image: "/placeholder.svg",
      bio: "Oversees delivery coordination and operational efficiency across all networks.",
    },
  ];

  const values = [
    {
      icon: Clock,
      title: "Dependability",
      description:
        "We prioritize timely deliveries and consistent operational performance.",
    },
    {
      icon: Users,
      title: "Customer Commitment",
      description:
        "Every service is designed to improve customer satisfaction and convenience.",
    },
    {
      icon: Target,
      title: "Innovation",
      description:
        "We embrace modern logistics technology to simplify global shipping.",
    },
    {
      icon: Award,
      title: "Operational Excellence",
      description:
        "We maintain high standards across shipping, support, and delivery management.",
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative bg-slate-950 text-white">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm mb-6">
              <Truck className="h-4 w-4 mr-2 text-cyan-400" />
              Modern Logistics & Courier Solutions
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-8">
              About
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Safewing Logistics
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
              Delivering trusted logistics solutions through innovation,
              operational excellence, and customer-focused shipping services
              across local and international destinations.
            </p>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Mission */}
            <div className="bg-slate-100 rounded-3xl p-10 border border-slate-200">
              <div className="w-16 h-16 rounded-2xl bg-slate-950 text-cyan-400 flex items-center justify-center mb-8">
                <Target className="h-8 w-8" />
              </div>

              <h2 className="text-4xl font-black text-slate-900 mb-6">
                Our Mission
              </h2>

              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                To provide reliable, secure, and technology-driven shipping
                services that help businesses and individuals move packages with
                confidence across local and global destinations.
              </p>

              <p className="text-lg text-slate-600 leading-relaxed">
                We aim to simplify logistics by combining operational efficiency,
                real-time tracking, and customer-focused support into one
                seamless delivery experience.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-slate-950 text-white rounded-3xl p-10 border border-white/10">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-8">
                <Globe className="h-8 w-8" />
              </div>

              <h2 className="text-4xl font-black mb-6">
                Our Vision
              </h2>

              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                To become a globally trusted courier and logistics brand known
                for speed, transparency, innovation, and dependable customer
                service.
              </p>

              <p className="text-lg text-slate-300 leading-relaxed">
                We envision a future where shipping is smarter, faster, and more
                accessible for businesses, retailers, and individuals worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-24 bg-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 font-medium mb-4">
              Company Milestones
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
              Our Growth Journey
            </h2>

            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              From startup operations to international delivery networks,
              Safewing Logistics continues to evolve through innovation and customer trust.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 h-full w-1 bg-cyan-200 transform md:-translate-x-1/2"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row ${
                    index % 2 === 0
                      ? "md:flex-row"
                      : "md:flex-row-reverse"
                  } items-start md:items-center`}
                >
                  <div className="md:w-1/2 px-10">
                    <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200">
                      <div className="text-cyan-500 text-3xl font-black mb-3">
                        {milestone.year}
                      </div>

                      <h3 className="text-2xl font-bold text-slate-900 mb-3">
                        {milestone.event}
                      </h3>

                      <p className="text-slate-600 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 rounded-full bg-cyan-500 border-4 border-white shadow-lg"></div>

                  <div className="md:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-100 text-slate-700 mb-4">
              Core Principles
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
              What Drives Our Operations
            </h2>

            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Our values shape every delivery, customer interaction, and
              operational decision across our logistics network.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group bg-slate-100 rounded-3xl p-8 hover:bg-slate-950 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-white text-cyan-500 flex items-center justify-center mb-6 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-300">
                  <value.icon className="h-8 w-8" />
                </div>

                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-white mb-4 transition-all duration-300">
                  {value.title}
                </h3>

                <p className="text-slate-600 group-hover:text-slate-300 leading-relaxed transition-all duration-300">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-24 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm mb-4">
              Leadership Team
            </div>

            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Meet The Experts Behind Safewing Logistics
            </h2>

            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              A dedicated team focused on operational efficiency, customer
              satisfaction, and logistics innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm hover:-translate-y-2 transition-all duration-300"
              >
                <div className="h-72 bg-slate-800 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">
                    {member.name}
                  </h3>

                  <p className="text-cyan-400 font-medium mb-5">
                    {member.role}
                  </p>

                  <p className="text-slate-300 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm mb-6">
            <Shield className="h-4 w-4 mr-2" />
            Trusted Courier & Logistics Partner
          </div>

          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Ship Smarter with Safewing Logistics
          </h2>

          <p className="text-xl text-cyan-100 max-w-3xl mx-auto mb-10 leading-relaxed">
            Experience secure, fast, and technology-driven delivery services
            designed for modern businesses and individuals.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <button className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-950 font-bold rounded-2xl hover:scale-105 transition-all duration-300">
              Get Started
            </button>

            <button className="inline-flex items-center justify-center px-8 py-4 border border-white/30 rounded-2xl hover:bg-white hover:text-slate-950 transition-all duration-300">
              Learn More
            </button>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-cyan-100">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              Secure Shipping
            </div>

            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              Worldwide Coverage
            </div>

            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              Real-Time Tracking
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;