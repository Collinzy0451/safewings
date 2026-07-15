import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import server from "../server";
import { toast } from "@/hooks/use-toast"


const Create_shipment = () => {
  const { userId } = useParams();

  const generateTrackingNumber = () => {
    const prefix = "TRK";
    const timestamp = Date.now().toString().slice(-6);
    const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}-${timestamp}-${randomPart}`;
  };

  const [formData, setFormData] = useState({
    tracking_number: "",
    origin: "",
    destination: "",
    cost: "",
    receiver_name: "",
    receiver_email: "",
    receiver_phone: "",
    created_at: "",
    delivery_date: "",
    status:"pending"
  });
  const navigate = useNavigate();
  const [apiSuccess, setApiSuccess] = useState(null);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      tracking_number: generateTrackingNumber(),
    }));
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${server}/api/user/${userId}/shipment`,
        formData
      );
      toast({
            title: "Success!",
            description: "Shipment created successfully!",
            variant: "success" ,
        });
      setApiError(null);
      console.log(res.data);
      setTimeout(() => navigate(0), 1000);
      

      
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Failed to create shipment";
      setApiError(errorMsg);
      setApiSuccess(null);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl max-w-5xl mx-auto mt-12 px-10 py-8">
      <div className="border-b border-gray-200 pb-6 mb-8">
        <h3 className="text-3xl font-extrabold text-gray-900 text-center tracking-wide">
          Create New Shipment
        </h3>
      </div>

      {apiSuccess && (
        <div className="mb-6 flex items-center gap-3 bg-green-100 text-green-800 rounded-lg px-5 py-3 font-medium shadow-sm">
          <svg
            className="w-6 h-6 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          {apiSuccess}
        </div>
      )}
      {apiError && (
        <div className="mb-6 flex items-center gap-3 bg-red-100 text-red-700 rounded-lg px-5 py-3 font-medium shadow-sm">
          <svg
            className="w-6 h-6 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Grid container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Tracking Number */}
          <div className="relative">
            <input
              id="tracking_number"
              name="tracking_number"
              type="text"
              value={formData.tracking_number}
              onChange={handleChange}
              placeholder=" "
              autoComplete="off"
              className="peer w-full border border-gray-300 rounded-xl px-4 pt-6 pb-2 text-gray-900 text-lg shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
            <label
              htmlFor="tracking_number"
              className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600 cursor-text select-none"
            >
              Tracking Number
            </label>
          </div>

          {/* Origin */}
          <div className="relative">
            <input
              id="origin"
              name="origin"
              type="text"
              value={formData.origin}
              onChange={handleChange}
              placeholder=" "
              autoComplete="off"
              className="peer w-full border border-gray-300 rounded-xl px-4 pt-6 pb-2 text-gray-900 text-lg shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
            <label
              htmlFor="origin"
              className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600 cursor-text select-none"
            >
              Origin
            </label>
          </div>

          {/* Destination */}
          <div className="relative">
            <input
              id="destination"
              name="destination"
              type="text"
              value={formData.destination}
              onChange={handleChange}
              placeholder=" "
              autoComplete="off"
              className="peer w-full border border-gray-300 rounded-xl px-4 pt-6 pb-2 text-gray-900 text-lg shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
            <label
              htmlFor="destination"
              className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600 cursor-text select-none"
            >
              Destination
            </label>
          </div>

          {/* Cost */}
          <div className="relative">
            <input
              id="cost"
              name="cost"
              type="number"
              value={formData.cost}
              onChange={handleChange}
              placeholder=" "
              autoComplete="off"
              className="peer w-full border border-gray-300 rounded-xl px-4 pt-6 pb-2 text-gray-900 text-lg shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              min="0"
            />
            <label
              htmlFor="cost"
              className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600 cursor-text select-none"
            >
              Cost ($)
            </label>
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="relative">
            <input
              id="created_at"
              name="created_at"
              type="text"
              value={formData.created_at}
              onChange={handleChange}
              placeholder=" "
              autoComplete="off"
              className="peer w-full border border-gray-300 rounded-xl px-4 pt-6 pb-2 text-gray-900 text-lg shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
            <label
              htmlFor="created_at"
              className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600 cursor-text select-none"
            >
              Created At (DD/MM/YYYY)
            </label>
          </div>

          <div className="relative">
            <input
              id="delivery_date"
              name="delivery_date"
              type="text"
              value={formData.delivery_date}
              onChange={handleChange}
              placeholder=" "
              autoComplete="off"
              className="peer w-full border border-gray-300 rounded-xl px-4 pt-6 pb-2 text-gray-900 text-lg shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
            <label
              htmlFor="delivery_date"
              className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600 cursor-text select-none"
            >
              Delivery Date (DD/MM/YYYY)
            </label>
          </div>
        </div>

        {/* Receiver Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="relative">
            <input
              id="receiver_name"
              name="receiver_name"
              type="text"
              value={formData.receiver_name}
              onChange={handleChange}
              placeholder=" "
              autoComplete="off"
              className="peer w-full border border-gray-300 rounded-xl px-4 pt-6 pb-2 text-gray-900 text-lg shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
            <label
              htmlFor="receiver_name"
              className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600 cursor-text select-none"
            >
              Receiver Name
            </label>
          </div>

          <div className="relative">
            <input
              id="receiver_email"
              name="receiver_email"
              type="email"
              value={formData.receiver_email}
              onChange={handleChange}
              placeholder=" "
              autoComplete="off"
              className="peer w-full border border-gray-300 rounded-xl px-4 pt-6 pb-2 text-gray-900 text-lg shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
            <label
              htmlFor="receiver_email"
              className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600 cursor-text select-none"
            >
              Receiver Email
            </label>
          </div>

          <div className="relative">
            <input
              id="receiver_phone"
              name="receiver_phone"
              type="tel"
              value={formData.receiver_phone}
              onChange={handleChange}
              placeholder=" "
              autoComplete="off"
              className="peer w-full border border-gray-300 rounded-xl px-4 pt-6 pb-2 text-gray-900 text-lg shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
            <label
              htmlFor="receiver_phone"
              className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600 cursor-text select-none"
            >
              Receiver Phone
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-lg font-bold rounded-2xl shadow-lg hover:from-blue-700 hover:to-blue-600 transition duration-300"
          >
            Create Shipment
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create_shipment;
