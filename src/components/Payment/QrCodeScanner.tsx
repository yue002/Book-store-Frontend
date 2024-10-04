import React, { useState } from 'react';
import jsQR from 'jsqr';

const QrCodeScanner: React.FC<{ onScan: (data: string) => void }> = ({ onScan }) => {
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const img = new Image();
          img.src = e.target.result as string;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (ctx) {
              canvas.width = img.width;
              canvas.height = img.height;
              ctx.drawImage(img, 0, 0);
              const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
              const code = jsQR(imageData.data, canvas.width, canvas.height);

              if (code) {
                onScan(code.data); // ส่งข้อมูลที่อ่านได้กลับไป
                setMessage('QR Code scanned successfully!');
              } else {
                setMessage('No QR Code found in the image.');
              }
            }
          };
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h2>Upload QR Code Image</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <p>{message}</p>
    </div>
  );
};

export default QrCodeScanner;
