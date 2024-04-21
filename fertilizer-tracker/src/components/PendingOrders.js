import React, { useState, useEffect } from "react";
import axios from "axios";

const PendingOrders = () => {
  const [pendingOrders, setPendingOrders] = useState([]);

  useEffect(() => {
    const fetchPendingOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/querypendingorders"
        );
        setPendingOrders(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    };

    fetchPendingOrders();
  }, []);

  return (
    <div class="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">
      <div class="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
        <div class="overflow-x-auto rounded-lg">
          <div class="align-middle inline-block min-w-full">
            <div class="shadow overflow-hidden sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      docType
                    </th>
                    <th class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      farmerId
                    </th>
                    <th class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      fertilizerRequested
                    </th>
                    <th class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      status
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  {pendingOrders.map((order, index) => (
                    <tr
                      key={index}
                      class={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td class="p-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.Key}
                      </td>
                      <td class="p-4 whitespace-nowrap text-sm text-gray-500">
                        {order.Record.docType}
                      </td>
                      <td class="p-4 whitespace-nowrap text-sm text-gray-500">
                        {order.Record.farmerId}
                      </td>
                      <td class="p-4 whitespace-nowrap text-sm text-gray-500">
                        {order.Record.fertilizerRequested}
                      </td>
                      <td class="p-4 whitespace-nowrap text-sm text-gray-500">
                        {order.Record.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingOrders;
