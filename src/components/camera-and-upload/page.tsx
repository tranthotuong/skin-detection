import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { useDropzone } from 'react-dropzone';
import { useAuth } from '@/context/AuthContext';

const CameraAndUpload: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const { closeCamera } = useAuth();
  const [videoConstraints, setVideoConstraints] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    facingMode: "user",
  });

  const handleResize = () => {
    setVideoConstraints({
      width: window.innerWidth,
      height: window.innerHeight,
      facingMode: "user",
    });
  };

  useEffect(() => {
    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handle camera activation and capture image
  const toggleCamera = () => {
    setShowWebcam(!showWebcam);
    setCapturedImage(null); // Clear previously captured image
  };

  const capturePhoto = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
      setShowWebcam(false); // Close the camera after capturing the photo
    }
  };

  // Handle file drop
  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setUploadedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    onDrop,
  });

  return (
    <div className="flex flex-col items-center h-full">
      {/* <h1 className="text-2xl font-bold">Take or Upload a Picture</h1> */}

      {/* Camera Section */}
      {/* <div className="w-full max-w-md p-4 border rounded-lg shadow">
        <h2 className="text-lg font-semibold">Take a Picture</h2>
        {showWebcam ? (
          <div>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-full rounded"
            />
            <button
              onClick={capturePhoto}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Capture Photo
            </button>
            <button
              onClick={toggleCamera}
              className="mt-2 ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Close Camera
            </button>
          </div>
        ) : (
          <button
            onClick={toggleCamera}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Open Camera
          </button>
        )}
        {capturedImage && (
          <div className="mt-4">
            <h3 className="text-md font-semibold">Captured Image:</h3>
            <img src={capturedImage} alt="Captured" className="w-full rounded" />
          </div>
        )}
      </div> */}

      {/* Upload Section */}
      {/* <div className="w-full max-w-md p-4 border rounded-lg shadow">
        <h2 className="text-lg font-semibold">Upload a Picture</h2>
        <div
          {...getRootProps({
            className:
              'border-dashed border-2 border-gray-400 p-4 rounded-lg cursor-pointer text-center',
          })}
        >
          <input {...getInputProps()} />
          <p>Drag 'n' drop an image here, or click to select one</p>
        </div>
        {uploadedImage && (
          <div className="mt-4">
            <h3 className="text-md font-semibold">Uploaded Image:</h3>
            <img src={uploadedImage} alt="Uploaded" className="w-full rounded" />
          </div>
        )}
      </div> */}
      <div className='w-full fixed z-10'>
        <div className="flex justify-center px-2 py-6 relative">
          <button className="absolute left-0 ps-5"
            onClick={closeCamera}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
              <path
                d="M17,11H9.41l3.3-3.29a1,1,0,1,0-1.42-1.42l-5,5a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76,1,1,0,0,0,.21.33l5,5a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L9.41,13H17a1,1,0,0,0,0-2Z"
                fill="#FFFFFF" />
            </svg>
          </button>
          <p className="text-white text-lg font-semibold">Camera</p>

        </div>
      </div>
      <div className='w-full h-full'>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="w-full h-full"
          videoConstraints={videoConstraints}
        />

      </div>
      <div className="fixed bottom-6 flex left-0 mx-auto justify-between w-full items-center px-5 z-10">
        <span className="sr-only">PreImg</span>
        <div className="flex flex-grow">
          <button type="button"
            className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            id="user-menu-button" aria-expanded="false" aria-haspopup="true">
            <span className="sr-only">Open user menu</span>
            <img className="h-12 w-12 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="" />
          </button>
        </div>

        <span className="sr-only">Capture</span>
        <div className="flex justify-center flex-grow">
          <button className="p-7 rounded-full border-4 border-white bg-black"
            onClick={capturePhoto}>
          </button>
        </div>

        <span className="sr-only">Undo</span>
        <div className="flex flex-grow justify-end">
          <button className="p-2 bg-black rounded-full">
            <svg aria-labelledby="rotateIconTitle" color="#ffffff" fill="none" className="w-7 h-7" role="img"
              stroke="#ffffff" viewBox="0 0 24 24" width="48px" xmlns="http://www.w3.org/2000/svg">
              <title id="rotateIconTitle" />
              <path d="M22 12l-3 3-3-3" />
              <path d="M2 12l3-3 3 3" />
              <path d="M19.016 14v-1.95A7.05 7.05 0 0 0 8 6.22" />
              <path d="M16.016 17.845A7.05 7.05 0 0 1 5 12.015V10" />
              <path d="M5 10V9" stroke-linecap="round" />
              <path d="M19 15v-1" stroke-linecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CameraAndUpload;
