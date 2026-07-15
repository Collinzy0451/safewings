import React, { useState, useEffect } from "react";
import {
  Users,
  User,
  Package,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Search,
  Plus,
  DollarSign,
  Settings,
  CalendarClock,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import server from "../server";
import { toast } from "@/hooks/use-toast"


const API_URL = server;

interface User {
  id: string;
  fname: string;
  lname: string;
  email: string;
  phone: string;
  profile_image: string;
  joinDate: string;
  role: string;
  totalShipments: number;
  status: "active" | "inactive";
  shipments: [];
}
interface Shipment {
  id: number;
  tracking_number: string;
  destination: string;
  origin: string;
  status: "pending" | "picked_up" | "in_transit" | "delivered";
  cost: string;
  receiver_name: string;
  receiver_email: string;
  receiver_phone: string;
  created_at: string;
  delivery_date: string;
  user_id: string;
  eventsCount: number;
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [user, setUser] = useState(null);
  const [formValues, setFormValues] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    status: "",
    profile_image: "",
  });
  const navigate = useNavigate();
  const [stats, setStats] = useState([]);
  const [imageError, setImageError] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [totalCost, setTotalCost] = useState(0);
  const [totalEvents, setTotalEvents] = useState(0);


  const getCurrentUser = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);

      if (!token) throw new Error("No token found");

      const storedUser = localStorage.getItem("user");
      if (!storedUser) throw new Error("No user info in storage");

      const { id: userId } = JSON.parse(storedUser);
      if (!userId) throw new Error("User ID not found");

      const res = await axios.get(`${API_URL}/api/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data;
    } catch (error: any) {
      console.error(
        "Failed to get user:",
        error?.response?.data || error.message
      );
      throw error;
    }
  };

  useEffect(() => {
    getCurrentUser()
      .then((userData) => {
        setUser(userData);
        setFormValues({
          fname: userData.fname || "",
          lname: userData.lname || "",
          email: userData.email || "",
          phone: userData.phone || "",
          status: userData.status || "",
          profile_image: userData.profile_image || "",
        });
      })
      .catch((err) => {
        console.error("Error fetching user:", err.message);
        // navigate('/login');
      });
  }, []);

   useEffect(() => {
    const fetchShipment = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/user/shipments`);

        let totalCost = 0;
        let totalEvents = 0;

        const formattedShipment = res.data.map((shipment: any) => {
          const cost = Number(shipment.cost) || 0;
          const eventsCount = shipment.events?.length || 0;

          totalCost += cost;
          totalEvents += eventsCount;

          return {
            id: shipment.id,
            tracking_number: shipment.tracking_number,
            destination: shipment.destination,
            origin: shipment.origin,
            status: shipment.status || "pending",
            cost,
            receiver_name: shipment.receiver_name,
            receiver_email: shipment.receiver_email,
            receiver_phone: shipment.receiver_phone,
            created_at: shipment.created_at,
            delivery_date: shipment.delivery_date,
            user_id: shipment.user_id,
            eventsCount, // per-shipment event count
          };
        });

        setShipments(formattedShipment);

        // If you want to display these values somewhere
        setTotalCost(totalCost);        // You need to define setTotalCost in your state
        setTotalEvents(totalEvents);    // Same here
      } catch (error) {
        console.error("Error fetching shipment:", error);
      }
    };

  fetchShipment();
}, []);



  useEffect(() => {
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/users`);
      
      let totalShipments = 0;
      let totalEvents = 0;
      let totalBilling = 0;

      const formatted = res.data.map((user: any) => {
        const userShipments = user.shipments || [];
        totalShipments += userShipments.length;

        userShipments.forEach((shipment: any) => {
          totalEvents += shipment.events?.length || 0;
          totalBilling += Number(shipment.cost) || 0;
        });

        return {
          id: user.id,
          fname: user.fname,
          lname: user.lname,
          email: user.email,
          phone: user.phone,
          joinDate: user.created_at,
          role: user.role,
          totalShipments: userShipments.length,
          status: user.status,
          profile_image: user.profile_image,
          shipments: userShipments,
        };
      });

      setUsers(formatted);

      const totalUsers = formatted.length;

      setStats([
        {
          title: "Total Users",
          value: totalUsers.toLocaleString(), // adds comma
          change: "+12%",
          icon: Users,
          color: "bg-blue-500",
        },
        {
          title: "Total Shipments",
          value: totalShipments.toLocaleString(), // adds comma
          change: "+8%",
          icon: Package,
          color: "bg-green-500",
        },
        {
          title: "Total Events",
          value: totalEvents.toLocaleString(), // adds comma
          change: "+6%",
          icon: CalendarClock,
          color: "bg-blue-500",
        },
        {
          title: "Total Billing",
          value:
            totalBilling >= 1_000_000
              ? `$${(totalBilling / 1_000_000).toFixed(2)}m`
              : `$${totalBilling.toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}`,
          change: "+10%",
          icon: DollarSign,
          color: "bg-green-500",
        }

      ]);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  fetchUsers();
}, []);


 
  const sortedShipments = [...shipments]
    .reverse()
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

  // Helper to get sender's full name
  const getSenderName = (userId) => {
    const sender = users.find((u) => u.id === userId);
    return sender ? `${sender.fname} ${sender.lname}` : "Unknown Sender";
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const res = await axios.delete(`${API_URL}/api/user/delete/${userId}`);

        if (res.status === 200 && res.data.message === "User deleted") {
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user.id !== userId)
          );
          toast({
            title: "Success!",
            description: "User Delete Successfully.",
            variant: "success" ,
        });
        } else {
          alert("Failed to delete user.");
          console.error("Delete user failed: ", res);
        }
      } catch (error: any) {
        console.error("Error deleting user:", error);
        if (error.response?.status === 404) {
          alert("User not found.");
        } else {
          alert("Failed to delete user due to an error.");
        }
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to update this user?")) {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const userId = user.id;

        if (!userId) throw new Error("User ID not found");

        // ✅ Create FormData for sending text fields + image
        const formData = new FormData();
        for (const key in formValues) {
          formData.append(key, formValues[key]);
        }

        // ✅ Append the image file if selected
        if (profileImage) {
          formData.append("profile_image", profileImage);
        }

        await axios.put(`${API_URL}/api/user/update/${userId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        toast({
          title: "Success!",
          description: "User Updated Successfully.",
          variant: "success",
        });

       setTimeout(() => navigate(0), 1000);
        
      } catch (err) {
        console.error(err);
        alert("Failed to update user");
      }
    }
  };


  const handleDeleteShipment = async (shipment_id: number) => {
    if (window.confirm("Are you sure you want to delete this shipment?")) {
      try {
        const res = await axios.delete(
          `${API_URL}/api/user/delete/shipment/${shipment_id}`
        );

        if (res.status === 200 && res.data.message === "Shipment deleted") {
          // Remove shipment from the shipments array
          setShipments((prevShipments) =>
            prevShipments.filter((shipment) => shipment.id !== shipment_id)
          );
          toast({
              title: "Success!",
              description: "Shipment Deleted Successfully.",
              variant: "success" ,
        });
          navigate("/admin");
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

  const menuItems = [
    { id: "overview", label: "Overview", icon: TrendingUp },
    { id: "users", label: "Users", icon: Users },
    { id: "shipments", label: "Shipments", icon: Package },
    { id: "create_event", label: "Event", icon: CalendarClock },
    // { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: "create_shipment_for_user", label: "Create Shipment", icon: Plus },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const getStatusColor = (status: string) => {
     switch (status) {
    
    case "pending":
      return "bg-gray-100 text-gray-700";

    case "in_transit":
      return "bg-yellow-100 text-yellow-800";

    case "inactive":
      return "bg-yellow-100 text-yellow-800";

    case "on_hold":
      return "bg-red-100 text-red-700";

    case "out_for_delivery":
      return "bg-green-100 text-green-700";

    case "delivered":
      return "bg-green-500 text-green-900";

    case "active":
      return "bg-green-300 text-green-800";

    case "cancelled":
      return "bg-red-300 text-red-900";

    default:
      return "bg-gray-200 text-gray-800";
  }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">
                    Recent Users
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {users
                      .reverse()
                      .slice(0, 3)
                      .map((user) => (
                        <div
                          key={user.id}
                          className="flex items-center justify-between"
                        >
                          <div>
                            <p className="font-medium text-gray-900">
                              {user.fname} {user.lname}
                            </p>
                            <p className="text-sm text-gray-600">
                              {user.email}
                            </p>
                          </div>
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                              user.status
                            )}`}
                          >
                            {user.status}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">
                    Recent Shipments
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {shipments
                      .sort(
                        (a, b) =>
                          new Date(b.created_at).getTime() -
                          new Date(a.created_at).getTime()
                      )
                      .slice(0, 3)
                      .map((shipment) => {
                        const shipmentUser = users.find(
                          (u) => u.id === shipment.user_id
                        );
                        return (
                          <div
                            key={shipment.id}
                            className="flex items-center justify-between"
                          >
                            <div>
                              <p className="font-medium text-gray-900">
                                {shipment.tracking_number}
                              </p>
                              <p className="text-sm text-gray-600">
                                {shipmentUser?.fname} → {shipment.receiver_name}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">${Number(shipment.cost).toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                                })}
                              </p>
                              <span
                                className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                                  shipment.status
                                )}`}
                              >
                                {shipment.status.replace(/_/g, " ").toUpperCase()}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "users":
        return (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">All Users</h3>
                
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Join Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Shipments
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.reverse().map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {user.fname} {user.lname}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(user.joinDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.totalShipments}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                            user.status
                          )}`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          {/* <button title="Edit User" className="text-green-600 hover:text-green-900 px-4">
                            <Eye
                              onClick={() =>
                                navigate(`/user/${user.id}/dashboard`)
                              }
                              className="h-6 w-6"
                              
                            />
                          </button> */}
                          <button title="Edit User" className="text-green-600 hover:text-green-900 px-4">
                            <Edit
                              onClick={() =>
                                navigate(`/admin/user/edit/${user.id}`)
                              }
                              className="h-6 w-6"
                              
                            />
                          </button>
                          <button
                          title="Delete User"
                            className="text-red-600 hover:text-red-900"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            <Trash2 
                            
                            className="h-6 w-6" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "shipments":
        return (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  All Shipments
                </h3>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tracking Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sender
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Recipient
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Value
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedShipments.map((shipment) => (
                    <tr key={shipment.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {shipment.tracking_number}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(shipment.created_at).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {getSenderName(shipment.user_id)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {shipment.receiver_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                            shipment.status
                          )}`}
                        >
                          {shipment.status.replace(/_/g, " ").toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${Number(shipment.cost).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-4">
                          <button
                            onClick={() =>
                              navigate(
                                `/view/user/${shipment.user_id}/shipment/${shipment.tracking_number}`
                              )
                            }
                            className="text-blue-600 hover:text-blue-900"
                            title="View Shipment"
                          >
                            <Eye className="h-6 w-6" />
                          </button>

                          <button
                            onClick={() =>
                              navigate(
                                `/user/${shipment.user_id}/shipment/edit/${shipment.id}`
                              )
                            }
                            className="text-green-600 hover:text-green-900"
                            title="Edit Shipment"
                          >
                            <Edit className="h-6 w-6" />
                          </button>
                          <button
                            onClick={() => handleDeleteShipment(shipment.id)} // ✅ add this
                            className="text-red-600 hover:text-red-900"
                            title="Delete Shipment"
                          >
                            <Trash2 className="h-6 w-6" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "settings":
        return (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Profile Information
              </h3>
            </div>
            <div className="p-6">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                    
                    {/* Preview current or new image */}
                    {(formValues.profile_image || profileImage) && !imageError  ?  (
                      <img
                        src={
                          profileImage
                            ? URL.createObjectURL(profileImage)
                            : `${API_URL}/${formValues.profile_image}`
                        }
                        className="w-30 h-30 object-cover rounded-full "
                        onError={() => setImageError(true)}
                      />
                    ):(
                      <User className="h-8 w-8 text-gray-600" />
                    )}
                    
                  </div>
                </div>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setProfileImage(e.target.files[0]); // ← Using profileImage
                      }
                    }}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="fname"
                      value={formValues.fname}
                      onChange={(e) =>
                        setFormValues({ ...formValues, fname: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={formValues.lname}
                      onChange={(e) =>
                        setFormValues({ ...formValues, lname: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formValues.email}
                    onChange={(e) =>
                      setFormValues({ ...formValues, email: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formValues.phone}
                    onChange={(e) =>
                      setFormValues({ ...formValues, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        );

      case "create_shipment_for_user":
        return (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  Select User
                </h3>
                
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Shipments
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.reverse().map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {user.fname} {user.lname}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.totalShipments}
                      </td>

                      <td>
                        <button
                          onClick={() =>
                            navigate(`/create/shipment/${user.id}`)
                          }
                          className="bg-green-100 text-green-800 font-semibold px-4 py-2 rounded hover:bg-green-200 transition"
                        >
                          Create
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "create_event":
        return (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  Select Shipment
                </h3>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tracking Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Events
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sender
                    </th>

                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedShipments.map((shipment) => (
                    <tr key={shipment.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {shipment.tracking_number}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(shipment.created_at).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {shipment.eventsCount}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                            shipment.status
                          )}`}
                        >
                          {shipment.status.replace(/_/g, " ").toUpperCase()}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {getSenderName(shipment.user_id)}
                      </td>

                      

                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() =>
                              navigate(`/create/event/${shipment.id}`)
                            }
                            className="text-blue-600 hover:text-blue-900"
                            title="Add Event"
                          >
                            <Plus className="h-8 w-8" />
                          </button>
                          <button
                            onClick={() =>
                              navigate(`/view/event/${shipment.id}`)
                            }
                            className="text-green-600 hover:text-green-900 px-2"
                            title="View Events"
                          >
                            <Eye className="h-6 w-6" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Analytics
            </h3>
            <p className="text-gray-600">Analytics dashboard coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">
            Manage users, shipments, and Events
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4">
                <nav className="space-y-2">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        activeTab === item.id
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
function setShipments(arg0: (prevShipments: any) => any) {
  throw new Error("Function not implemented.");
}
