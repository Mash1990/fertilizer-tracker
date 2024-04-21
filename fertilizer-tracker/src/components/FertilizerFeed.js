import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FertilizerFeed = () => {
  const [fertilizers, setFertilizers] = useState([]);

  useEffect(() => {
    // Fetch fertilizers from the backend API
    const fetchFertilizers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/queryallfertilizers');
        setFertilizers(response.data.response);
      } catch (error) {
        console.error('Error fetching fertilizers:', error);
      }
    };

    // Fetch fertilizers initially
    fetchFertilizers();

    // Set up polling (fetch every 5 minutes, adjust as needed)
    const intervalId = setInterval(fetchFertilizers, 5 * 60 * 1000);

    // Clean up interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h2>Fertilizer Feed</h2>
      {fertilizers.length === 0 ? (
        <p>Loading fertilizers...</p>
      ) : (
        <ul>
          {fertilizers.map((fertilizer) => (
            <li key={fertilizer.fertilizer_id}>
              ID: {fertilizer.fertilizer_id}, Type: {fertilizer.fertilizer_type}, Purpose: {fertilizer.fertilizer_purpose}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FertilizerFeed;
