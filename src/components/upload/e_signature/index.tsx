import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import './styles.scss';

interface SignaturePadProps {
  onSave: (imageUrl: string) => void;
}

const SignaturePad: React.FC<SignaturePadProps> = ({ onSave }) => {
  const padRef = useRef<SignatureCanvas | null>(null);
  const [canvas, setCanvas] = useState<string | undefined>(undefined);
  const [canvasVisibility, setCanvasVisibility] = useState(false);
  const [uploadVisibility, setUploadVisibility] = useState(false);
  const [signatureImageUrl, setSignatureImageUrl] = useState<string>('');

  const handleGetCanvas = () => {
    const canvasData = padRef?.current?.toDataURL();
    setCanvas(canvasData);
    setCanvasVisibility(true);
  };

  const handleSaveSignature = () => {
    onSave(canvas ?? "");
    setCanvasVisibility(false);
    setSignatureImageUrl('');
  };

  const handleButtonClick = () => {
    setCanvasVisibility(!canvasVisibility);
    setCanvas(undefined);
    padRef?.current?.clear();
    setSignatureImageUrl('');
    setUploadVisibility(false);
  };

  const handleClearCanvas = () => {
    padRef?.current?.clear();
  };

  const handleFileUpload: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setSignatureImageUrl(reader.result);
          setUploadVisibility(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="SignaturePad">
      {!canvasVisibility && !uploadVisibility && (
        <div>
          <SignatureCanvas
            ref={padRef}
            canvasProps={{
              width: 500,
              height: 200,
            }}
          />
          <div className="SignatureButtonsContainer">
            <button  className="SignatureButtons-1" onClick={handleGetCanvas}>Save</button>
            <button  className="SignatureButtons-2" onClick={handleClearCanvas}>Clear</button>
            <label className="SignatureButtons-3" htmlFor="fileUpload">click here to Upload Image Signature</label>
            <input
              type="file"
              id="fileUpload"
              accept="image/png"
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />
           
          </div>
        </div>
      )}

      {canvasVisibility && (
        <div>
          <img src={canvas} alt="signature" />
          <div className="SignatureButtonsContainer">
            <button className="SignatureButtons-up" onClick={handleSaveSignature}>Upload</button>
            <button className="SignatureButtons-cancel" onClick={handleButtonClick}>Cancel</button>
          </div>
        </div>
      )}

      {uploadVisibility && (
        <div className="uploaded-sig-container">
          <img src={signatureImageUrl} alt="signature" className="UploadedImage" />
          <div className="UploadButtonsContainer">
            <button className="SignatureButtons-2" onClick={() => setUploadVisibility(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignaturePad;
