import React, { useState, useEffect } from "react";
import {
  Package,
  Plus,
  User,
  CreditCard,
  Settings,
  TrendingUp,
  Clock,
  CheckCircle,
  Map,
} from "lucide-react";
import ShipmentCard from "../components/shipment/ShipmentCard";
import EmptyState from "../components/common/EmptyState";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import server from "../server";
import { toast } from "@/hooks/use-toast"

const API_URL = server;


const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [user, setUser] = useState(null);
  const [shipments, setShipments] = useState([]);
  const [summary, setSummary] = useState({
    totalShipments: 0,
    deliveredCount: 0,
    inTransitCount: 0,
    totalCost: 0, 
  });
  const [formValues, setFormValues] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    profile_image: "",
  });
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const getCurrentUser = async () => {
    try {
      const token = localStorage.getItem("token");

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
          profile_image: userData.profile_image || "",
        });
      })
      .catch((err) => {
        console.error("Error fetching user:", err.message);
        // navigate('/login');
      });
  }, []);


  const getCurrentUserShipments = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) throw new Error("No token found");

      const storedUser = localStorage.getItem("user");
      if (!storedUser) throw new Error("No user info in storage");

      const { id: userId } = JSON.parse(storedUser);
      if (!userId) throw new Error("User ID not found");

      const res = await axios.get(`${API_URL}/api/user/${userId}/shipments`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data;
    } catch (error: any) {
      console.error(
        "Failed to get shipment:",
        error?.response?.data || error.message
      );
      throw error;
    }
  };


  useEffect(() => {
    getCurrentUserShipments()
      .then((shipmentData) => {
        setShipments(shipmentData);

        // Calculate totals
        const totalShipments = shipmentData.length;

        let deliveredCount = 0;
        let inTransitCount = 0;
        let totalCost = 0;

        shipmentData.forEach((shipment) => {
          if (shipment.status === "delivered") deliveredCount++;
          if (shipment.status !== "delivered") inTransitCount++;

          totalCost += shipment.cost || 0;
        });

        setSummary({
          totalShipments,
          deliveredCount,
          inTransitCount,
          totalCost,
        });

      })
      .catch((err) => {
        console.error("Error fetching user shipments:", err.message);
        // navigate('/login');
      });
  }, []);



  const stats = [
    {
      title: "Total Shipments",
      value: summary.totalShipments.toLocaleString(),
      icon: Package,
      color: "bg-blue-500",
    },
    {
      title: "In Transit",
      value: summary.inTransitCount.toLocaleString(),
      icon: Clock,
      color: "bg-orange-500",
    },
    {
      title: "Delivered",
      value: summary.deliveredCount.toLocaleString(),
      icon: CheckCircle,
      color: "bg-green-500",
    },
    {
      title: "Total Spent",
      value:
            summary.totalCost >= 1_000_000
              ? `$${(summary.totalCost / 1_000_000).toFixed(2)}m`
              : `$${summary.totalCost.toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}`,
      icon: TrendingUp,
      color: "bg-purple-500",
    },
  ];


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
 

  const menuItems = [
    { id: "overview", label: "Overview", icon: TrendingUp },
    { id: "shipments", label: "My Shipments", icon: Package },
    { id: "track", label: "Track Shipment", icon: Map },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "track":
        navigate('/track')
      
      
      case "overview":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  Recent Shipments
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {shipments.reverse().slice(0, 3).map((shipment) => (
                    <ShipmentCard key={shipment.id} shipment={shipment} onClick={()=>{
                      navigate(`/view/user/${shipment.user_id}/shipment/${shipment.tracking_number}`)
                    }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "shipments":
        return (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                All Shipments
              </h3>
            </div>
            <div className="p-6">
              {shipments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {shipments.map((shipment) => (
                    <ShipmentCard key={shipment.id} shipment={shipment} onClick={()=>{
                      navigate(`/view/user/${shipment.user_id}/shipment/${shipment.tracking_number}`)
                    }} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No shipments yet"
                  description="Enjoy the silence....!"
                />
              )}
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

      default:
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Settings</h3>
            <p className="text-gray-600">Settings panel coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Manage your shipments and account</p>
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

export default Dashboard;
