import React, { useState } from 'react';
import QrCodeScanner from './QrCodeScanner';

const Payment: React.FC = () => {
  const [scannedData, setScannedData] = useState<string | null>(null);

  const handleScan = (data: string) => {
    setScannedData(data);
  };

  const confirmPayment = async () => {
    if (!scannedData) return;
    
    try {
      const response = await fetch('/api/confirm-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentData: scannedData }),
      });
      if (response.ok) {
        alert('Payment confirmed!');
      } else {
        alert('Payment confirmation failed.');
      }
    } catch (error) {
      console.error('Error confirming payment:', error);
    }
  };

  return (
    <div>
      <h1>Payment</h1>
      <QrCodeScanner onScan={handleScan} />
      {scannedData && (
        <div>
          <p>Scanned Data: {scannedData}</p>
          <button onClick={confirmPayment}>Confirm Payment</button>
        </div>
      )}
    </div>
  );
};

export default Payment;