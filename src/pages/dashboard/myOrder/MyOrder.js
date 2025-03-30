import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router";
import useAuth from "../../../hooks/useAuth";
import "./myOrder.css";

const MyOrder = () => {
  const { user } = useAuth();
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const fetchOrders = () => {
    setLoading(true);
    axios
      .get(`https://helmetshop.onrender.com/${user.email}/orders`)
      .then((res) => {
        setMyOrders(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching orders:", error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, [user.email]); // Refresh when user email changes

  const deleteOrder = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://helmetshop.onrender.com/orders/${id}`)
          .then(() => {
            fetchOrders(); // Refresh orders after deletion
            Swal.fire({
              icon: "success",
              title: "Your Order Deleted successfully!",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((error) => {
            console.log("Error deleting order:", error.message);
          });
      }
    });
  };

  return (
    <div>
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-grow text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-center">My Orders</h2>
          {myOrders.length === 0 && <h5 className="my-5">You Have No Orders</h5>}

          {/* Column Headers */}
          <div className="row px-0 mx-0 py-2 my-order-header bg-light">
            <div className="col-md-2"><strong>Product</strong></div>
            <div className="col-md-1"><strong>Price</strong></div>
            <div className="col-md-2"><strong>Customer</strong></div>
            <div className="col-md-2"><strong>Address</strong></div>
            <div className="col-md-1 text-center"><strong>Status</strong></div>
            <div className="col-md-2 text-center"><strong>Payment</strong></div>
            <div className="col-md-2 text-center"><strong>Action</strong></div>
          </div>

          {myOrders.map((order) => {
            const { _id, name, product, price, address, status, paid } = order;
            return (
              <div key={_id} className="row px-0 mx-0 my-4 py-3 my-order-item">
                <div className="col-md-2">{product}</div>
                <div className="col-md-1">${price}</div>
                <div className="col-md-2">{name}</div>
                <div className="col-md-2">{address}</div>
                
                {/* Status Column */}
                <div className="col-md-1 text-center">
                  {status === "approved" ? (
                    <span className="text-success">Shipped</span>
                  ) : (
                    <span className="text-danger">Pending</span>
                  )}
                </div>

                {/* Payment Column */}
                <div className="col-md-2 text-center">
                  {paid ? (
                    <span style={{ color: "green", fontWeight: "bold" }}>Paid</span>
                  ) : (
                    <button
                      onClick={() => history.push(`/payment/${_id}`)}
                      style={{ backgroundColor: "lightgreen", color: "black" }}
                    >
                      Pay Now
                    </button>
                  )}
                </div>

                {/* Action Column */}
                <div className="col-md-2 d-flex align-items-center justify-content-center">
                  <button onClick={() => deleteOrder(_id)} className="btn btn-danger">
                    Cancel Order <i className="far fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyOrder;
