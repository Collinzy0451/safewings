import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import server from "../server";
import { toast } from "@/hooks/use-toast"

const EditEvent = () => {
  const { eventId } = useParams(); // Ensure your route uses :eventId
  const [formData, setFormData] = useState({
    status: "",
    description: "",
    location: "",
    completed: "false",
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${server}/api/user/event/${eventId}`);
        const { status, description, location, completed } = response.data;
        const shipmentId = response.data.shipment_id
        setFormData({
          status: status || "",
          description: description || "",
          location: location || "",
          completed: completed ? "true" : "false",
        });


      } catch (err: any) {
        setErrorMessage("Failed to load event data.");
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to update this event?")) {
      try {
        const response = await axios.put(
          `${server}/api/user/update/event/${eventId}`,
          {
            status: formData.status,
            description: formData.description,
            location: formData.location,
            completed: formData.completed === "true",
          }
        );
        toast({
            title: "Success!",
            description: "Event Updated successfully!",
            variant: "success" ,
        });
        setErrorMessage(null);
        console.log(response.data);
        setTimeout(() => navigate(0), 1000);
      } catch (err: any) {
        setErrorMessage(
          err.response?.data?.message || "Failed to update tracking event."
        );
        setSuccessMessage(null);
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md max-w-3xl mx-auto mt-8 px-6 py-8">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Edit Tracking Event
      </h2>

      {successMessage && (
        <div className="mb-4 text-green-700 bg-green-100 p-3 rounded">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="mb-4 text-red-700 bg-red-100 p-3 rounded">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600"
              >
                <option value="">Select status</option>
                <option value="pending">Pending</option>
                <option value="in_transit">In Transit</option>
                <option value="out_for_delivery">Out For Delivery</option>
                <option value="on_hold">On Hold</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. New York, NY"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Details about the tracking event..."
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600"
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Completed
          </label>
          <select
            name="completed"
            value={formData.completed}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600"
            required
          >
            <option value="false">Not Completed</option>
            <option value="true">Completed</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors duration-200"
        >
          Update Event
        </button>
      </form>
    </div>
  );
};

export default EditEvent;
