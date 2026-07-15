import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import server from "../server";
import { Edit, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast"


interface Shipment {
  id: string;
  origin: string;
  destination: string;
  status: string;
  created_at: string;
}

interface Event {
  id: string;
  status: string;
  location: string;
  description: string;
  completed: boolean;
  timestamp: string;
}

const ViewShipmentEvents = () => {
  const { shipmentId } = useParams<{ shipmentId: string }>();
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShipmentData = async () => {
      try {
        setLoading(true);
        const [shipmentRes, eventsRes] = await Promise.all([
          axios.get(`${server}/api/user/shipments/${shipmentId}`),
          axios.get(`${server}/api/user/shipments/${shipmentId}/events`),
        ]);
        setShipment(shipmentRes.data);
        setEvents(eventsRes.data);
        setError(null);
      } catch (err) {
        setError("Failed to load shipment data.");
      } finally {
        setLoading(false);
      }
    };

    fetchShipmentData();
  }, [shipmentId]);

  const deleteEvent = async (eventId: string) => {
    if (window.confirm("Are you sure you want to delete this Event?")) {
      try {
        await axios.delete(
          `${server}/api/user/shipments/${shipmentId}/events/${eventId}`
        );
        setEvents((prev) => prev.filter((event) => event.id !== eventId));
        toast({
            title: "Success!",
            description: "Event Deleted Successfully!",
            variant: "success" ,
        });
      } catch (err) {
        alert("Failed to delete event.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-gray-500 text-lg">Loading shipment data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-4 bg-red-100 text-red-700 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
        Shipment Details & Events
      </h1>

      {/* Shipment Details */}
      <div className="bg-white shadow-xl rounded-2xl p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Shipment Info
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-700">
          <div>
            <span className="font-semibold">Shipment ID:</span> {shipment?.id}
          </div>
          <div>
            <span className="font-semibold">Origin:</span> {shipment?.origin}
          </div>
          <div>
            <span className="font-semibold">Destination:</span>{" "}
            {shipment?.destination}
          </div>
          <div>
            <span className="font-semibold">Status:</span> {shipment?.status}
          </div>
          <div>
            <span className="font-semibold">Created At:</span>{" "}
            {new Date(shipment!.created_at).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Events Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              
              <th className="px-4 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">
                Location
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">
                Description
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">
                Completed
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">
                Timestamp
              </th>
              <th className="px-4 py-3 text-center font-medium text-gray-600 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {events.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-4 text-center text-gray-500">
                  No tracking events available.
                </td>
              </tr>
            ) : (
              events.map((event) => (
                <tr
                  key={event.id}
                  className="hover:bg-gray-50 transition duration-150"
                >
                  
                  <td className="px-4 py-3 text-gray-700">{event.status}</td>
                  <td className="px-4 py-3 text-gray-700">{event.location}</td>
                  <td className="px-4 py-3 text-gray-600 max-w-xs truncate">
                    {event.description}
                  </td>
                  <td className="px-4 py-3">
                    {event.completed ? (
                      <span className="px-2 py-1 text-xs font-bold text-green-700 bg-green-200 rounded-full">
                        Yes
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-bold text-red-700 bg-red-200 rounded-full">
                        No
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(event.timestamp).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        className="text-blue-500 hover:text-blue-700 px-2"
                        onClick={() => {
                          navigate(`/edit/event/${event.id}`);
                        }}
                        title="Edit Event"
                      >
                        <Edit className="w-6 h-6" />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => deleteEvent(event.id)}
                        title="Delete Event"
                      >
                        <Trash2 className="w-6 h-6" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewShipmentEvents;
