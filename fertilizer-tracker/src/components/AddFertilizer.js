// AddFertilizer.js
import React, { useState } from 'react';
import axios from 'axios';

const AddFertilizer = () => {
  const [formData, setFormData] = useState({
    fertilizer_id: '',
    fertilizer_type: '',
    fertilizer_purpose: '',
  });

  // AddFertilizer.js
const handleSubmit = (e) => {
  e.preventDefault();
  axios.post('http://localhost:8080/api/addfertilizer', formData)
    .then((response) => {
      console.log('Fertilizer added successfully:', response.data.message);
      // You can add further logic here (e.g., show a success message).
    })
    .catch((error) => {
      console.error('Error adding fertilizer:', error);
    });
};

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Add Fertilizer</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="fertilizer_id" placeholder="Fertilizer ID" onChange={handleChange} />
        <input type="text" name="fertilizer_type" placeholder="Fertilizer Type" onChange={handleChange} />
        <input type="text" name="fertilizer_purpose" placeholder="Fertilizer Purpose" onChange={handleChange} />
        <button type="submit">Add Fertilizer</button>
      </form>
    </div>
  );
};

export default AddFertilizer;
