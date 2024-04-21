import React, { useState } from 'react';
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]); // Replace with actual data
  const [newFertilizer, setNewFertilizer] = useState('');
  const [owner, setOwner] = useState('');

  const handleNewFertilizer = (event) => {
    event.preventDefault();
    // Handle new fertilizer creation here
  };

  const handleChangeOwner = (event) => {
    event.preventDefault();
    // Handle change owner here
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <h2>Pending Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Fertilizer</th>
            <th>Quantity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.fertilizer}</td>
              <td>{order.quantity}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Create New Fertilizer</h2>
      <form onSubmit={handleNewFertilizer}>
        <input
          type="text"
          value={newFertilizer}
          onChange={(e) => setNewFertilizer(e.target.value)}
          placeholder="Enter new fertilizer"
        />
        <button type="submit">Create</button>
      </form>

      <h2>Change Fertilizer Owner</h2>
      <form onSubmit={handleChangeOwner}>
        <input
          type="text"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          placeholder="Enter new owner"
        />
        <button type="submit">Change Owner</button>
      </form>
    </div>
  );
};

export default AdminDashboard;
