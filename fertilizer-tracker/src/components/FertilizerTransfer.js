import React, { useState } from "react";
import axios from "axios";

const FertilizerTransfer = () => {
  const [fertilizerId, setFertilizerId] = useState("");
  const [newOwner, setNewOwner] = useState("");

  const requestChangeOwner = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/requestChangeOwner",
        {
          fertilizerId,
          newOwner,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  const acceptTransfer = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/acceptTransfer",
        {
          fertilizerId,
          newOwner,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Fertilizer ID"
        onChange={(e) => setFertilizerId(e.target.value)}
      />
      <input
        type="text"
        placeholder="New Owner"
        onChange={(e) => setNewOwner(e.target.value)}
      />
      <button onClick={requestChangeOwner}>Request Change Owner</button>
      <button onClick={acceptTransfer}>Accept Transfer</button>
    </div>
  );
};

export default FertilizerTransfer;
