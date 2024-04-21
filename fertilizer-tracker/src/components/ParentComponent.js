import React, { useState } from 'react';
import QrReader from './QrReader';
import FertilizerForm from './FertilizerDataForm';

const ParentComponent = () => {
  const [scannedResult, setScannedResult] = useState(null);

  return (
    <div>
      <QrReader setScannedResult={setScannedResult} />
      <FertilizerDataForm scannedResult={scannedResult} />
    </div>
  );
};

export default ParentComponent;
