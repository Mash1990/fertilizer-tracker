import React from "react";

const FormData = ({ scannedData }) => {
  if (!scannedData || !scannedData.data) {
    return null; // Return null or a loading/error message
  }

  const parsedData = JSON.parse(scannedData.data);

  return (
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label htmlFor="fertilizerName">Fertilizer Name</label>
        <input
          id="fertilizerName"
          type="text"
          value={parsedData.fertilizerName}
          readOnly
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="fertilizerId">Fertilizer ID</label>
        <input
          id="fertilizerId"
          type="text"
          value={parsedData.fertilizerId}
          readOnly
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="text"
          value={parsedData.description}
          readOnly
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="composition">Composition</label>
        <input
          id="composition"
          type="text"
          value={parsedData.composition}
          readOnly
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
    </form>
  );
};

export default FormData;
