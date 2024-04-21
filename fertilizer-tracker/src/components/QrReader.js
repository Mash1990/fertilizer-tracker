import React, { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import QrFrame from "../assets/qr-frame.svg";
import "./QrStyles.css";
import Modal from 'react-modal';

Modal.setAppElement('#root') // replace '#root' with the id of the root element of your app

const QrReader = ({ isOpen, onRequestClose }) => {
  const scanner = useRef(null);
  const videoEl = useRef(null);
  const qrBoxEl = useRef(null);
  const [qrOn, setQrOn] = useState(false);
  const [scannedResult, setScannedResult] = useState("");

  const handleScanSuccess = (result) => {
    // If the result is already an object, you can directly access its properties
    setScannedResult(result);
    scanner.current.stop();
    if (videoEl.current && videoEl.current.srcObject) {
      videoEl.current.srcObject.getTracks().forEach(track => track.stop());
    }
    setQrOn(false);
    onRequestClose();
  };

  const onScanFail = (err) => {
    console.log(err);
  };

  useEffect(() => {
    if (videoEl?.current && !scanner.current) {
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
  }, []);

  useEffect(() => {
    if (!qrOn)
      alert(
        "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
      );
  }, [qrOn]);

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <div className="qr-reader">
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
      </div>
    </Modal>
  );
};

export default QrReader;
