import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import axios from 'axios';
import './styles.scss';

interface SignaturePadProps {
  onSave: (imageUrl: string, isSignature: boolean) => void;
}

const SignaturePad: React.FC<SignaturePadProps> = ({ onSave }) => {
  const padRef = useRef<SignatureCanvas | null>(null);
  const [canvasVisibility, setCanvasVisibility] = useState(false);
  const [signatureImageUrl, setSignatureImageUrl] = useState<string>('');

  const handleGetCanvas = () => {
    setCanvasVisibility(true);
  };

  const handleButtonClick = () => {
    setCanvasVisibility(false);
    padRef?.current?.clear();
    setSignatureImageUrl('');
  };

  const handleClearCanvas = () => {
    padRef?.current?.clear();
  };

  const handleFileUpload: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            setSignatureImageUrl(reader.result);
            onSave(reader.result, true); // Save uploaded image URL with isSignature=true
          }
        };
        reader.readAsDataURL(file);

        const formData = new FormData();
        formData.append('signature', file);

        const response = await axios.post('https://empireone-global-inc.uc.r.appspot.com/api/upload-signature', formData);
        // Handle the response if needed
        console.log('Signature uploaded:', response.data.imageUrl);
      } catch (error) {
        // Handle the error if needed
        console.error('Error uploading signature:', error);
      }
    }
  };

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
          <img src={signatureImageUrl} alt="signature" />
          <div className="SignatureButtonsContainer">
            <button className="SignatureButtons-cancel" onClick={handleButtonClick}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignaturePad;
