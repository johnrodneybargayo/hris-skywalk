import React, { useRef, useState } from 'react';
import axios from 'axios';

interface SignaturePadProps {
    onSave: (imageUrl: string) => void;
}

const SignaturePad: React.FC<SignaturePadProps> = ({ onSave }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [signatureImage, setSignatureImage] = useState<string | null>(null);

    const handleCanvasMouseDown: React.MouseEventHandler<HTMLCanvasElement> = (e) => {
        setIsMouseDown(true);
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                setIsDrawing(true);
                const rect = canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                ctx.beginPath();
                ctx.moveTo(x, y);
            }
        }
    };


    const clearCanvas = () => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                onSave(''); // To inform the parent component that a new signature has been created
            }
        }
    };

    const saveSignature = async () => {
        if (canvasRef.current) {
            const dataURL = canvasRef.current.toDataURL();
            try {
                await axios.post('http://localhost:8080/api/signature', { signatureData: dataURL });
                onSave(dataURL); // To inform the parent component that a new signature has been created
                setErrorMessage(''); // Clear any previous error message if successful
                setIsDrawing(false); // Hide the drawing area after saving
            } catch (error) {
                setErrorMessage('Unable to upload the signature. Please try again later.');
            }
        }
    };

    const handleButtonClick = () => {
        setSignatureImage(null);
        setErrorMessage('');
        setIsDrawing(true);
    };

    const handleFileUpload: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    setSignatureImage(reader.result);
                    setIsDrawing(false); // Hide the drawing area
                    setErrorMessage(''); // Clear any error message
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const isMoving = useRef(false);

    const handleCanvasMouseMove: React.MouseEventHandler<HTMLCanvasElement> = (e) => {
        if (isMouseDown && isDrawing && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                const rect = canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                ctx.lineTo(x, y);
                ctx.stroke();
            }
        }
    };

    const handleCanvasMouseUp = () => {
        if (isMouseDown) {
            setIsMouseDown(false);
            isMoving.current = false; // Reset the flag when the mouse is released
        }
    };

    return (
        <div style={{ width: 250, height: 150 }}> {/* Adjust the height here */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex' }}>
                    {!signatureImage && !isDrawing && (
                        <>
                            <button onClick={handleButtonClick} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                {/* SVG Icon Code for "Sign Here" */}
                                Sign Here
                            </button>
                            <label htmlFor="fileUpload" style={{ cursor: 'pointer', marginLeft: 10 }}>
                                {/* SVG Icon Code for "Upload Signature" */}
                                Upload Signature
                                <input
                                    type="file"
                                    id="fileUpload"
                                    accept="image/png"
                                    style={{ display: 'none' }}
                                    onChange={handleFileUpload}
                                />
                            </label>
                        </>
                    )}
                </div>
                {signatureImage && !isDrawing && (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <button onClick={handleButtonClick}>
                            {/* SVG Icon Code for "Re-upload" */}
                            Re-upload
                        </button>
                        <button onClick={() => setSignatureImage(null)} style={{ marginLeft: 10 }}>
                            Clear
                        </button>
                    </div>
                )}
            </div>

            {isDrawing && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
                    <button onClick={clearCanvas}>Clear</button>
                    <button onClick={saveSignature}>Save</button>
                    <button onClick={() => setIsDrawing(false)}>Cancel</button>
                </div>
            )}

            <div style={{ position: 'relative', border: '1px solid black', marginTop: 10, height: '100px' }}>
                <canvas
                    ref={canvasRef}
                    onMouseDown={handleCanvasMouseDown}
                    onMouseUp={handleCanvasMouseUp}
                    onMouseMove={handleCanvasMouseMove}
                    style={{
                        display: signatureImage || isDrawing ? 'block' : 'none',
                        width: '100%',
                        height: '100%',
                        background: 'transparent', // Set canvas background to transparent
                        border: isDrawing ? '1px solid black' : 'none', // Show border only when drawing
                    }}
                />

                {(!signatureImage || isDrawing) && (
                    <p
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            color: 'gray',
                            fontStyle: 'italic',
                            display: isDrawing ? 'none' : 'block',
                        }}
                    >
                        Sign here
                    </p>
                )}

                {signatureImage && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
                        <button onClick={() => setSignatureImage(null)}>Re-upload</button>
                        <button onClick={saveSignature}>Save</button>
                        <button onClick={() => setSignatureImage(null)}>Cancel</button>
                    </div>
                )}
            </div>

            {signatureImage && !isDrawing && (
                <div style={{ marginTop: 10 }}>
                    <img src={signatureImage} alt="Uploaded Signature" style={{ width: '100%', height: 150 }} />
                </div>
            )}

            {/* Display the error message */}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
};

export default SignaturePad;