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
            <button onClick={handleGetCanvas}>Save</button>
            <label htmlFor="fileUpload">Upload Signature</label>
            <input
              type="file"
              id="fileUpload"
              accept="image/png, image/jpeg"
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
            <button onClick={handleSaveSignature}>Upload</button>
            <button onClick={handleButtonClick}>Cancel</button>
          </div>
        </div>
      )}

      {uploadVisibility && (
        <div>
          <img src={signatureImageUrl} alt="signature" />
          <div className="UploadButtonsContainer">
            <button onClick={() => setUploadVisibility(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignaturePad;
