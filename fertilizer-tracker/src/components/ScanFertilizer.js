// ScanFertilizer.js
import React, { useState } from 'react';

const ScanFertilizer = ({ scanFertilizer }) => {
  const [orderNumber, setOrderNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    scanFertilizer(orderNumber);
  };

  return (
    <div>
      <h2>Scan Fertilizer</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Order Number"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
        />
        <button type="submit">Scan Fertilizer</button>
      </form>
    </div>
  );
};

export default ScanFertilizer;
