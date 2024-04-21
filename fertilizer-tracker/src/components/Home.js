import React, { useState } from 'react';
import QrReader from './QrReader';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Replace '#root' with the id of the root element of your app

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scannedResult, setScannedResult] = useState(null);
  const [formData, setFormData] = useState({
    fertilizerName: '',
    fertilizerId: '',
    manufacturer: '',
    description: '',
    composition: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Handle form submission, e.g., send data to a server
  };

  const handleScanSuccess = (result) => {
    setScannedResult(result);
    setIsModalOpen(false);
    // Update form data with scanned result
    setFormData({
      ...formData,
      fertilizerName: result.fertilizerName,
      fertilizerId: result.fertilizerId,
      manufacturer: result.manufacturer,
      description: result.description,
      composition: result.composition,
    });
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Add Fertilizer Details
      </button>
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <QrReader onScanSuccess={handleScanSuccess} />
      </Modal>

      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        {/* Form fields */}
        {/* ... */}
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Home;
