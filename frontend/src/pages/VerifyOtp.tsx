import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import server from "../server";
import { useAuth } from "@/context/AuthContext";


const VerifyOtp: React.FC = () => {
  const [otp, setOtp] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();
  const API_URL = server;
  const { login } = useAuth();


  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    const pendingUser = JSON.parse(sessionStorage.getItem("pendingUser") || "{}");
    const { email, phone, fname, lname, password } = pendingUser;

    if (!email || !otp) {
        toast({
        title: "Session Expired",
        description: "Please register again.",
        variant: "destructive",
        });
        return navigate("/register");
    }

    try {
        setIsVerifying(true);

        // Step 1: Verify OTP and create account
        await axios.post(`${API_URL}/api/auth/verify-otp`, {
        email,
        otp,
        phone,
        fname,
        lname,
        password,
        });

        // Step 2: Login after successful verification
        const loginRes = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
        });

        const user = loginRes.data.user
        const token = loginRes.data.access_token

        if(user.role === "admin"){
            setTimeout(() => {
            login(token, user.role);
            toast({
                title: "Welcome!",
                description: `Hello ${user.fname}, you're now logged in as an Admin user.`,
                variant: "success",
            });
            navigate("/admin");
            }, 1000);
        }else{
            setTimeout(() => {
            login(token, user.role);
            toast({
                title: "Welcome!",
                description: `Hello ${user.fname}, you're now logged in.`,
                variant: "success",
            });
            navigate("/dashboard");
            }, 1000);
        }
        sessionStorage.removeItem("pendingUser");
    } catch (err: any) {
        const errorMsg = err.response?.data?.message || "OTP verification failed!";
        toast({
        title: errorMsg,
        variant: "destructive",
        });
    } finally {
        setIsVerifying(false);
    }
  };



  const handleResendOtp = async () => {
    const pendingUser = JSON.parse(sessionStorage.getItem("pendingUser") || "{}");
    const email = pendingUser.email;

    if (!email) {
      toast({
        title: "Session Expired",
        description: "Please register again.",
        variant: "destructive",
      });
      return navigate("/register");
    }

    try {
      setIsResending(true);
      await axios.post(`${API_URL}/api/auth/send-otp`, { email });
      toast({
        title: "OTP Sent",
        description: "A new OTP has been sent to your email.",
        variant: "success",
      });
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Failed to resend OTP!";
      toast({
        title: errorMsg,
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-4">
      <form
        onSubmit={handleVerify}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          Verify Your OTP
        </h2>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          disabled={isVerifying}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 disabled:opacity-50"
        >
          {isVerifying ? "Verifying..." : "Verify OTP"}
        </button>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">Didn't receive the OTP?</p>
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={isResending}
            className="mt-2 text-blue-600 hover:underline font-medium disabled:opacity-50"
          >
            {isResending ? "Resending..." : "Resend OTP"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VerifyOtp;
