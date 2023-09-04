import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import axios from 'axios';
import './styles.scss';

interface ImageUploadResponse {
  imageUrl: string;
}

interface SignaturePadProps {
  onSave: (signatureData: string) => void;
  onSubmit: () => void;
}

const SignaturePad: React.FC<SignaturePadProps> = ({ onSave, onSubmit }) => {
  const padRef = useRef<SignatureCanvas | null>(null);
  const [canvasVisibility, setCanvasVisibility] = useState(false);
  const [signatureData, setSignatureData] = useState<string>('');

  const handleGetCanvas = async () => {
    setCanvasVisibility(true);
    const capturedData = padRef?.current?.toDataURL();
    if (capturedData) {
      console.log('Signature data captured:', capturedData);
      setSignatureData(capturedData);
      try {
        const formData = new FormData();
        const blob = await (await fetch(capturedData)).blob();
        formData.append('signature', blob);
        const response = await axios.post<ImageUploadResponse>('https://empireone-global-inc.uc.r.appspot.com/api/signature', formData);
       //  const response = await axios.post<ImageUploadResponse>('http://localhost:8080/api/signature', formData);
        console.log('Signature uploaded:', response.data.imageUrl);
        onSave(capturedData); // Trigger the onSave function with the captured data
      } catch (error) {
        console.error('Error uploading signature:', error);
      }
    } else {
      console.error('No signature data captured');
    }
  };

  const handleButtonClick = () => {
    setCanvasVisibility(false);
    padRef?.current?.clear();
    setSignatureData('');
  };

  const handleClearCanvas = () => {
    padRef?.current?.clear();
  };

  const handleFileUpload: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const capturedData = padRef?.current?.toDataURL();
    
        if (capturedData) {
          console.log('Signature data captured:', capturedData);
          onSave(capturedData); // Trigger the onSave function with the captured data
    
          const formData = new FormData();
          formData.append('signatureData', capturedData);
    
          const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          };
  
          const response = await axios.post<ImageUploadResponse>('https://empireone-global-inc.uc.r.appspot.com/api/signature/image', formData, config);
         // const response = await axios.post<ImageUploadResponse>('http://localhost:8080/api/signature/image', formData, config);
    
          console.log('Signature uploaded:', response.data.imageUrl);
        } else {
          console.error('No signature data captured');
        }
      } catch (error) {
        console.error('Error uploading signature:', error);
      }
    }
  };
  
  

  console.log('Rendering SignaturePad component');

  return (
    <div className="SignaturePad">
      {!canvasVisibility ? (
        <div>
          <SignatureCanvas
            ref={padRef}
            canvasProps={{
              width: 500,
              height: 200,
            }}
          />
          <div className="SignatureButtonsContainer">
            <button className="SignatureButtons-1" onClick={handleGetCanvas}>
              Save
            </button>
            <button className="SignatureButtons-2" onClick={handleClearCanvas}>
              Clear
            </button>
            <label className="SignatureButtons-3" htmlFor="fileUpload">
              Click here to Upload Image Signature
            </label>
            <input
              type="file"
              id="fileUpload"
              accept="image/png"
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />
          </div>
        </div>
      ) : (
        <div>
          <img src={signatureData} alt="signature" />
          <div className="SignatureButtonsContainer">
            <button className="SignatureButtons-cancel" onClick={handleButtonClick}>
              Cancel
            </button>
            <button className="SignatureButtons-submit" onClick={onSubmit}>
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignaturePad;
