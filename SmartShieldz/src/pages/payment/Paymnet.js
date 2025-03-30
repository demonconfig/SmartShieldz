import React, { useEffect, useState } from "react";
import Navbar from "../shared/navbar/Navbar";
import Footer from "../shared/footer/Footer";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";  // Ensure this hook fetches logged-in user info
import "./paymnet.css";


const Payment = () => {
  const { id } = useParams();  // Get order ID from URL
  const history = useHistory();
  const { user } = useAuth();  // Get logged-in user
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios
      .get(`https://helmetshop.onrender.com/orders/${id}`)
      .then((res) => setOrder(res.data))
      .catch((error) => console.error("Error fetching order:", error));
  }, [id]);

  const payWithRazorpay = () => {
    if (!order) {
      alert("Order not found!");
      return;
    }

    const totalAmount = order.price * 100;  // Convert to paise

    const options = {
      key: "rzp_test_pJgeWZdmFIP7tY",  // Replace with your Razorpay key
      amount: totalAmount,
      currency: "INR",
      name: "SmartShieldz",
      description: `Payment for Order ID: ${id}`,
      image: "/logo1-removebg-preview.png",
      handler: function (response) {
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);

        // ✅ Update Order Status in Database
        axios
          .put(`https://helmetshop.onrender.com/orders/payment/${id}`, {
            paymentId: response.razorpay_payment_id,
            status: "paid",
          })
          .then(() => {
            history.push("/dashboard/myorders"); // ✅ Redirect after success
          })
          .catch((error) => console.error("Error updating payment status:", error));
      },
      prefill: {
        name: user?.displayName || "John Doe",
        email: user?.email || "john@example.com",
        contact: user?.phone || "9999999999",
      },
      theme: { color: "#ff523b" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div>
      <Navbar />
      <div className="payment-container">
        <h2>Complete Your Payment</h2>
        {order ? (
          <div>
            <p><strong>Product:</strong> {order.productName}</p>
            <p><strong>Price:</strong> ₹{order.price}</p>
            <button className="pay-button" onClick={payWithRazorpay}>Pay with Razorpay</button>
          </div>
        ) : (
          <p>Loading order details...</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Payment;
