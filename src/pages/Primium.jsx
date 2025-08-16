import axios from "axios";
import React from "react";

export default function Premium() {
  const handleBuyClick = async (type) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (!accessToken || !refreshToken) {
        alert("Please login first!");
        return;
      }

      // Create payment order
      const response = await axios.post(
        "http://localhost:3000/paymentcreate",
        { membershipType: type },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            RefreshToken: `Bearer ${refreshToken}`, // send refresh token
          },
        }
      );

      // If middleware sent a new access token, store it
      const newAccessToken = response.headers["new-access-token"];
      if (newAccessToken) {
        localStorage.setItem("accessToken", newAccessToken);
      }

      const { amount, keyId, currency, notes, orderId } = response.data;

      const options = {
        key: keyId,
        amount,
        currency,
        name: "ResumeBuilder",
        description: "Connect to other developers",
        order_id: orderId,
        prefill: {
          name: notes.username || "", // fallback to username
          email: notes.email || "",
          contact: notes.contact || "",
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err.response?.data || err);
      alert(
        err.response?.data?.error || "Failed to initiate payment. Try again!"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-10">Choose Your Membership</h1>

      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Silver Membership */}
        <div className="bg-gray-800 rounded-lg p-6 w-80 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Silver Membership</h2>
          <ul className="mb-6 space-y-2 text-gray-300">
            <li>- Chat with other people</li>
            <li>- 100 connection Requests per day</li>
            <li>- Blue Tick</li>
            <li>- 3 months</li>
          </ul>
          <button
            className="bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-600 transition"
            onClick={() => handleBuyClick("silver")}
          >
            Buy Silver
          </button>
        </div>

        {/* OR Divider */}
        <div className="text-gray-400 font-semibold">OR</div>

        {/* Gold Membership */}
        <div className="bg-gray-800 rounded-lg p-6 w-80 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Gold Membership</h2>
          <ul className="mb-6 space-y-2 text-gray-300">
            <li>- Chat with other people</li>
            <li>- Infinite connection Requests per day</li>
            <li>- Blue Tick</li>
            <li>- 6 months</li>
          </ul>
          <button
            className="bg-indigo-500 text-white px-6 py-2 rounded-md hover:bg-indigo-600 transition"
            onClick={() => handleBuyClick("gold")}
          >
            Buy Gold
          </button>
        </div>
      </div>
    </div>
  );
}
