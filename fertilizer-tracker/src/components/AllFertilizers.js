import React, { useState, useEffect } from "react";
import axios from "axios";

function AllFertilizers() {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFertilizerId, setSelectedFertilizerId] = useState("");
  const [newOwner, setNewOwner] = useState("");

  useEffect(() => {
    const fetchAllFertilizers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/queryallfertilizers"
        );
        const responseData = JSON.parse(response.data.response);
        setPendingOrders(responseData);
        console.log(responseData);
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    };

    fetchAllFertilizers();
  }, []);

  const handleOpenModal = (fertilizerId) => {
    setSelectedFertilizerId(fertilizerId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFertilizerId("");
    setNewOwner("");
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/requestChangeOwner",
        {
          fertilizerId: selectedFertilizerId,
          newOwner: newOwner,
        }
      );
      console.log("Response:", response.data);
      handleCloseModal();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">
        <div className="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
          <div className="overflow-x-auto rounded-lg">
            <div className="align-middle inline-block min-w-full">
              <div className="shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fertilizer ID
                      </th>

                      <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        docType
                      </th>
                      <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Owner
                      </th>
                      <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Manufacturer
                      </th>
                      <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {pendingOrders.map((fertilizer, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="p-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {fertilizer.Key}
                        </td>

                        <td className="p-4 whitespace-nowrap text-sm text-gray-500">
                          {fertilizer.Record.docType}
                        </td>
                        <td className="p-4 whitespace-nowrap text-sm text-gray-500">
                          {fertilizer.Record.type}
                        </td>
                        <td className="p-4 whitespace-nowrap text-sm text-gray-500">
                          {fertilizer.Record.owner}
                        </td>
                        <td className="p-4 whitespace-nowrap text-sm text-gray-500">
                          {fertilizer.Record.details}
                        </td>
                        <td className="p-4 whitespace-nowrap text-sm text-gray-500">
                          <button
                            onClick={() => handleOpenModal(fertilizer.Key)}
                            className="mt-3 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          >
                            Change Owner
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {isModalOpen && (
                  <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="bg-white rounded-lg w-1/3 p-6 relative z-10">
                      <h2 className="text-lg font-semibold mb-4">
                        Change Owner
                      </h2>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          New Owner
                        </label>
                        <input
                          type="text"
                          value={newOwner}
                          onChange={(e) => setNewOwner(e.target.value)}
                          className="mt-1 p-2 w-full border rounded-md"
                          placeholder="Enter new owner"
                        />
                      </div>
                      <div className="flex justify-end">
                        <button
                          onClick={handleSubmit}
                          className="mt-3 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCloseModal}
                          className="mt-3 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-white rounded-lg w-1/3 p-6 relative z-10">
            <h2 className="text-lg font-semibold mb-4">Change Owner</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                New Owner
              </label>
              <input
                type="text"
                value={newOwner}
                onChange={(e) => setNewOwner(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter new owner"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="mt-3 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                Save
              </button>
              <button
                onClick={handleCloseModal}
                className="mt-3 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllFertilizers;
