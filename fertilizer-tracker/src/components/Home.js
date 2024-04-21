// Home.js
import React, { useState } from "react";
// import AdminDashboard from './AdminDashboard';
import QrReader from "./QrReader";

function Home() {
  const [showScanner, setShowScanner] = useState(false);
  const [scannedResult, setScannedResult] = useState(null);

  const [formData, setFormData] = useState({
    fertilizerName: "",
    fertilizerId: "",
    manufacturer: "",
    description: "",
    composition: "",
  });

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.id]: e.target.value });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("form data", formData);
  //   // Here you can handle the form submission. For example, you can send the data to a server.
  // };

  return (
    <div>
      <button onClick={() => setShowScanner(!showScanner)}>
        {showScanner ? "Hide" : "Add Fertilizer Details"}
      </button>
      {showScanner && (
        <QrReader
          stopScanning={() => setShowScanner(false)}
          onScanSuccess={setScannedResult}
        />
      )}
      {/* <AdminDashboard /> */}

      {/* <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="fertilizerName"
          >
            Fertilizer Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="fertilizerName"
            type="text"
            value={formData.fertilizerName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="fertilizerId"
          >
            Fertilizer ID
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="fertilizerId"
            type="text"
            value={formData.fertilizerId}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="manufacturer"
          >
            Manufacturer
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="manufacturer"
            type="text"
            value={formData.manufacturer}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            type="text"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="composition"
          >
            Composition
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="composition"
            type="text"
            value={formData.composition}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          onClick={() => setShowScanner(!showScanner)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form> */}
    </div>
  );
}

export default Home;
