import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import axios from "axios";

const PaymentSucces = () => {
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (!id) return;

    axios
      .put(`https://helmetshop.onrender.com/orders/payment/${id}`)
      .then((res) => {
        console.log("Payment successful, order updated!");
        setTimeout(() => {
          history.push("/dashboard/myorders"); // Redirect after 2 seconds
        }, 2000);
      })
      .catch((error) => {
        console.error("Error updating payment status:", error.message);
      });
  }, [id]); // Added 'id' dependency

  return (
    <div>
      <h1 className="text-center mt-5 text-success">Processing Payment...</h1>
      <h4 className="text-center text-info">Redirecting to My Orders...</h4>
    </div>
  );
};

export default PaymentSucces;
