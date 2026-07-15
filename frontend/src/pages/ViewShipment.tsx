import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { MapPin, Clock, Package,Trash2 } from "lucide-react";
import server from "../server";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { toast } from "@/hooks/use-toast"


const API_URL = server;

function getStatusColor(status) {
   switch (status) {
    
    case "pending":
      return "bg-gray-100 text-gray-700";

    case "in_transit":
      return "bg-yellow-100 text-yellow-800";

    case "on_hold":
      return "bg-red-100 text-red-700";

    case "out_for_delivery":
      return "bg-green-100 text-green-700";

    case "delivered":
      return "bg-green-500 text-green-900";

    case "cancelled":
      return "bg-red-300 text-red-900";

    default:
      return "bg-gray-200 text-gray-800";
  }
}

function getStatusIcon(status, completed) {
  return completed ? (
    <span className="text-green-600 font-bold">✓</span>
  ) : (
    <span className="text-gray-400 font-bold">•</span>
  );
}


export default function ViewShipment() {
  const { user_id, tracking_code } = useParams();
  const [shipment, setShipment] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchShipment() {
      try {
        const response = await axios.get(
          `${server}/api/user/${user_id}/shipment/${tracking_code}`
        );
        const userResponse = await axios.get(
          `${server}/api/user/${user_id}`
        );
        setUser(userResponse.data)
        setShipment(response.data);
      } catch (err) {
        setError("Failed to load shipment data.");
      } finally {
        setLoading(false);
      }
    }

    fetchShipment();
  }, [user_id, tracking_code]);

  const lastEvent =
    shipment?.events?.length > 0
      ? shipment.events[shipment.events.length - 1]
      : null;


  const handleDeleteShipment = async (shipment_id: number) => {
    if (window.confirm("Are you sure you want to delete this shipment?")) {
      try {
        const res = await axios.delete(
          `${API_URL}/api/user/delete/shipment/${shipment_id}`
        );
      if(user.role === "admin" && res.status === 200){
        setTimeout(() => {
        toast({
              title: "Success!",
              description: "Shipment Deleted Successfully.",
              variant: "success" ,
        });
          navigate("/admin");
        }, 1000);
      }else if (user.role === "customer" && res.status === 200){
        setTimeout(() => {
        toast({
              title: "Success!",
              description: "Shipment Deleted Successfully.",
              variant: "success" ,
        });
        navigate("/dashboard");
        }, 1000);
      } else {
          alert("Failed to delete shipment.");
      }
      } catch (error: any) {
        console.error("Error deleting shipment:", error);
        if (error.response?.status === 404) {
          alert("Shipment not found.");
        } else {
          alert("Failed to delete shipment due to an error.");
        }
      }
    }
  };

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        {loading && (
          <div className="text-center py-20">
            <LoadingSpinner size="lg" className="mx-auto mb-4" />
            <p className="text-gray-600">Tracking your package...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <Package className="h-10 w-10 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-900 mb-2">
              Tracking Error
            </h3>
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {shipment && (
          <>
            {/* Package Info */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Package Details
                  </h2>
                  <p className="text-gray-600">
                    Tracking{" "}
                    <span className="text-black">
                      {shipment.tracking_number}
                    </span>
                  </p>
                </div>
                <span
                  className={`px-4 py-1 rounded-full text-sm font-medium whitespace-nowrap ${getStatusColor(shipment.status)}`}
                >
                  {shipment.status.replace(/_/g, " ").toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">From</p>
                    <p className="font-semibold">{shipment.origin}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">To</p>
                    <p className="font-semibold">{shipment.destination}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Est. Delivery</p>
                    <p className="font-semibold">
                      {shipment.delivery_date
                        ? new Date(shipment.delivery_date).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tracking History */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">
                Tracking History
              </h3>
              <div className="relative pl-6">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                <div className="space-y-6">
                  {shipment.events && shipment.events.length > 0 ? (
                    shipment.events.map((event) => (
                      <div key={event.id} className="relative flex items-start">
                        <div className="absolute left-0 top-1.5 z-10 w-4 h-4 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center">
                          {getStatusIcon(event.status, event.completed)}
                        </div>
                        <div className="ml-6 flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <h4
                              className={`text-sm font-semibold ${
                                event.completed
                                  ? "text-gray-900"
                                  : "text-gray-500"
                              }`}
                            >
                              {event.status.replace("_", " ").toUpperCase()}
                            </h4>
                            {event.timestamp && (
                              <span className="text-xs text-gray-500 mt-1 sm:mt-0">
                                {new Date(event.timestamp).toLocaleString()}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {event.description}
                          </p>
                          <p className="text-sm text-gray-500">
                            📍 {event.location}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center">
                      No tracking events found.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Google Map */}
            {lastEvent && lastEvent.location && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Last Known Location
                </h3>
                <div className="w-full h-64 sm:h-96 rounded-lg overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(
                      lastEvent.location
                    )}&output=embed`}
                    title="Package Last Location"
                  ></iframe>
                </div>
              </div>
            )}
            <div className="flex justify-end mt-6">
              <button
                onClick={() => handleDeleteShipment(shipment.id)} // Replace with your handler
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition-all duration-200"
              >
                <Trash2 className="w-4 h-4" />
                Delete Shipment
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
