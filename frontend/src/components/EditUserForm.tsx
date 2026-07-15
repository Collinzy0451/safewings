import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import server from "../server";
import { toast } from "@/hooks/use-toast"
import {User} from "lucide-react";


const API_URL = server;

const EditUserForm: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState(false);




  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/user/${userId}`);
        setUser(res.data);
      } catch (err) {
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: "Error!",
        description: "User data is missing.",
        variant: "destructive",
      });
      return;
    }

    if (window.confirm("Are you sure you want to update this user?")) {
        try {
          const formData = new FormData();

          // Append user fields
          for (const key in user) {
            if (user[key] !== undefined && user[key] !== null) {
              formData.append(key, user[key]);
            }
          }

          // Append profile image if selected
          if (profileImage) {
            formData.append("profile_image", profileImage);
          }

          // Make PUT request to update user
          await axios.put(`${API_URL}/api/user/update/${userId}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          // Show success toast
          toast({
            title: "Success!",
            description: "User updated successfully.",
            variant: "success",
          });

          // Optional delay before page reload or redirect
          setTimeout(() => {
            navigate(0); // Reload the current page
          }, 1000);
          
        } catch (err: any) {
          console.error("Error updating user:", err);
          toast({
            title: "Update Failed",
            description: err.response?.data?.message || "An error occurred while updating the user.",
            variant: "destructive",
          });
        }
      }
  };



  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white border border-gray-200 rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Edit User Profile
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
         {/* Profile Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Profile Image
          </label>
          {/* Preview current or new image */}
          {(user.profile_image || profileImage) && !imageError  ?  (
            <img
              src={
                profileImage
                  ? URL.createObjectURL(profileImage)
                  : `${API_URL}/${user.profile_image}`
              }
              className="w-20 h-20 object-cover rounded-full mt-2"
              onError={() => setImageError(true)}
            />
          ):(
            <User className="h-10 w-10 text-gray-600 space-y-10" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setProfileImage(e.target.files[0]); // ← Using profileImage
              }
            }}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        

        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            name="fname"
            value={user.fname}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter first name"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            name="lname"
            value={user.lname}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter last name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter email address"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter phone number"
          />
        </div>

        {/* Role */}
       <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <select
            name="role"
            value={user.role}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select role</option>
            <option value="admin">Admin</option>
            <option value="customer">User</option>
          </select>
        </div>


        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            name="status"
            value={user.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserForm;
