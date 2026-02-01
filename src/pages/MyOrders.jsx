import React, { useState, useEffect } from "react";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/orders.json")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  if (orders.length === 0) {
    return <div className="text-center py-16">Loading orders...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-6">My Orders</h2>
        <div className="grid gap-4">
          {orders.map((order) => (
            <div key={order.id} className="glass-card p-6">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <p className="font-semibold text-lg">{order.mealName}</p>
                  <p className="subhead">
                    By {order.chefName} · {order.id}
                  </p>
                  <div className="flex gap-3 mt-2 flex-wrap">
                    <span className="pill">{order.status}</span>
                    <span
                      className={`pill ${
                        order.paymentStatus === "Paid"
                          ? "bg-green-400/20 text-green-200"
                          : ""
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">
                    ${(order.price * order.qty).toFixed(2)}
                  </p>
                  <p className="subhead">Qty: {order.qty}</p>
                </div>
              </div>
              {order.paymentStatus === "Pending" &&
                order.status === "Accepted" && (
                  <button className="btn-solid mt-4">Pay now</button>
                )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
