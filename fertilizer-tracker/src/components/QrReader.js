import React, { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import QrFrame from "../assets/qr-frame.svg";
import axios from "axios";

const QrReader = ({ stopScanning, onScanSuccess }) => {
  const scanner = useRef(null);
  const videoEl = useRef(null);
  const qrBoxEl = useRef(null);
  const [qrOn, setQrOn] = useState(false);
  const [formData, setFormData] = useState({
    fertilizerName: "",
    fertilizerId: "",
    fertilizerManufacturer: "",
  });
  const [showScanner, setShowScanner] = useState(true);

  const handleScanSuccess = (result) => {
    onScanSuccess(result);
    let parsedResult = JSON.parse(result.data);
    setFormData({
      fertilizerName: parsedResult.fertilizer_type,
      fertilizerId: parsedResult.fertilizer_id,
      fertilizerManufacturer: parsedResult.fertilizer_manufacturer,
    });
    setShowScanner(false);
  };

  const onScanFail = (err) => {
    console.log(err);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);

    try {
      // Make API call to create fertilizer
      const response = await axios.post(
        "http://localhost:8080/api/addfertilizer",
        {
          fertilizer_type: formData.fertilizerName,
          fertilizer_id: formData.fertilizerId,
          fertilizer_manufacturer: formData.fertilizerManufacturer,
        }
      );

      if (response.status === 200) {
        console.log("Fertilizer created successfully:", response.data);

        // Hide the scanner and reset form data
        setShowScanner(false);
        setFormData({
          fertilizer_name: "",
          fertilizer_id: "",
          fertilizer_manufacturer: "",
        });

        // Refresh the page
        window.location.reload();
      } else {
        console.error("Failed to create fertilizer:", response.data);
        alert("Failed to create fertilizer. Please try again.");
      }
    } catch (error) {
      console.error("Error creating fertilizer:", error);
      alert("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    if (videoEl?.current && !scanner.current && showScanner) {
      scanner.current = new QrScanner(videoEl?.current, handleScanSuccess, {
        onDecodeError: onScanFail,
        preferredCamera: "environment",
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: qrBoxEl?.current || undefined,
      });

      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    return () => {
      if (!videoEl?.current) {
        scanner?.current?.stop();
      }
    };
  }, [showScanner]);

  useEffect(() => {
    if (!qrOn)
      alert(
        "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
      );
  }, [qrOn]);

  return (
    <div className="qr-reader">
      {showScanner && (
        <>
          <video ref={videoEl}></video>
          <div ref={qrBoxEl} className="qr-box">
            <img
              src={QrFrame}
              alt="Qr Frame"
              width={256}
              height={256}
              className="qr-frame"
            />
          </div>
        </>
      )}
      {!showScanner && (
        <form
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
              htmlFor="fertilizerManufacturer"
            >
              Fertilizer Manufacturer
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="fertilizerManufacturer"
              type="text"
              value={formData.fertilizerManufacturer}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="mt-3 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default QrReader;
