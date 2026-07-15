import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import server from "../server";
import { toast } from "@/hooks/use-toast"


const EditShipment = () => {
  const { userId, shipmentId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    tracking_number: "",
    origin: "",
    destination: "",
    status: "pending",
    cost: "",
    receiver_name: "",
    receiver_email: "",
    receiver_phone: "",
    created_at: "",
    delivery_date: "",
  });

  const [apiSuccess, setApiSuccess] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  // Fetch shipment details
  useEffect(() => {
    const fetchShipment = async () => {
      try {
        const res = await axios.get(
          `${server}/api/user/${userId}/shipment/${shipmentId}`
        );
        setFormData(res.data);
      } catch (err: any) {
        setApiError(
          err.response?.data?.message || "Failed to load shipment data."
        );
      }
    };
    fetchShipment();
  }, [userId, shipmentId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Convert date strings to YYYY-MM-DD
    const toYMD = (dateStr: string) => {
      const [day, month, year] = dateStr.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    };

    const updatedData = {
      ...formData,
      delivery_date: toYMD(formData.delivery_date),
      created_at: toYMD(formData.created_at),
    };
    if (window.confirm("Are you sure you want to update this shipment?")) {
      try {
        const res = await axios.put(
          `${server}/api/user/${userId}/shipment/${shipmentId}`,
          updatedData
        );
        
        toast({
              title: "Success!",
              description: "Shipment Updated successfully!",
              variant: "success" ,
          });
        setApiError(null);
        setTimeout(() => navigate(0), 1000); // Reload current page
      } catch (err: any) {
        setApiSuccess(null);
        setApiError(err.response?.data?.message || "Failed to update shipment.");
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md max-w-5xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
      <div className="py-6 border-b border-gray-200">
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 text-center">
          Edit Shipment
        </h3>
      </div>
      <div className="py-6">
        {apiSuccess && (
          <div className="mb-4 text-green-700 bg-green-100 p-2 rounded">
            {apiSuccess}
          </div>
        )}
        {apiError && (
          <div className="mb-4 text-red-700 bg-red-100 p-2 rounded">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tracking Number
              </label>
              <input
                name="tracking_number"
                type="text"
                value={formData.tracking_number}
                onChange={handleChange}
                placeholder="e.g. ABC1234567"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Origin
              </label>
              <input
                name="origin"
                type="text"
                value={formData.origin}
                onChange={handleChange}
                placeholder="Origin address"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Destination
              </label>
              <input
                name="destination"
                type="text"
                value={formData.destination}
                onChange={handleChange}
                placeholder="Destination address"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600"
              />
            </div>
            

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cost ($)
              </label>
              <input
                name="cost"
                type="number"
                value={formData.cost}
                onChange={handleChange}
                placeholder="e.g. 50"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Created At (DD/MM/YYYY)
              </label>

              <input
                name="created_at"
                type="text"
                value={formData.created_at}
                onChange={handleChange}
                placeholder="e.g. 01/06/2025"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Date (DD/MM/YYYY)
              </label>
              <input
                name="delivery_date"
                type="text"
                value={formData.delivery_date}
                onChange={handleChange}
                placeholder="e.g. 05/06/2025"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Receiver Name
              </label>
              <input
                name="receiver_name"
                type="text"
                value={formData.receiver_name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Receiver Email
              </label>
              <input
                name="receiver_email"
                type="email"
                value={formData.receiver_email}
                onChange={handleChange}
                placeholder="example@mail.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Receiver Phone
              </label>
              <input
                name="receiver_phone"
                type="text"
                value={formData.receiver_phone}
                onChange={handleChange}
                placeholder="+1234567890"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors duration-200"
            >
              Update Shipment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditShipment;
