import React from "react";
import { FaWhatsapp } from "react-icons/fa"; // Make sure to install react-icons

const WhatsAppButton: React.FC = () => {
  const phoneNumber = "+19373081357"; // Replace with your full international WhatsApp number (without +)

  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-transform transform hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={28} />
    </a>
  );
};

export default WhatsAppButton;
