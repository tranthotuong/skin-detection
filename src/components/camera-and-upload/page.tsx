"use client";

import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { useAuth } from '@/context/AuthContext';
import { DETECTION_URL } from '@/lib/constants';
import { useRouter } from 'next/navigation';

const CameraAndUpload: React.FC = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const webcamRef = useRef<Webcam>(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const { closeCamera, callDiagnoseImage, loading } = useAuth();
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); // Save the selected file to state
      setImageURL(URL.createObjectURL(selectedFile)); // Create a URL for the image
    }
  };

  const handleButtonUploadImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input click
    }
  };

  const closeImage = () => {
    setImageURL(null); // Close the fullscreen image
    setFile(null); // Close the fullscreen image
  };

  const handleSubmitDiagnoseImage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await callDiagnoseImage(formData);
      closeCamera();
      router.push(`${DETECTION_URL}/${response.scanHistory.id}`)
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center h-full">
        <div className='w-full fixed z-10'>
          <div className="flex justify-center px-2 py-6 relative">
            <button className="absolute left-0 ps-5"
              onClick={closeCamera}>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white">
                <path
                  d="M17,11H9.41l3.3-3.29a1,1,0,1,0-1.42-1.42l-5,5a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76,1,1,0,0,0,.21.33l5,5a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L9.41,13H17a1,1,0,0,0,0-2Z"
                  fill="currentColor" />
              </svg>
            </button>
            <p className="text-white text-lg font-semibold">Camera</p>

          </div>
        </div>
        {/* Fullscreen Image Viewer */}
        {loading && (
           <div
           className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center"
         >
           <img
             src="/Loading.gif"
             alt="Fullscreen preview"
             className="max-w-full max-h-full"
           />
         </div>
        )}
        {imageURL ? (
          <div
            className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
          >
            <img
              src={imageURL}
              alt="Fullscreen preview"
              className="max-w-full max-h-full"
            />
            <button
              className="absolute top-4 right-4 text-white text-3xl font-bold"
              onClick={closeImage}
            >
              &times;
            </button>
            <div
              className="absolute bottom-6 left-0 text-white text-3xl font-bold w-full flex justify-center items-center"
              onClick={closeImage}
            >
              <button className="p-4 rounded-full border-4 border-white bg-black"
                onClick={handleSubmitDiagnoseImage}>
                <img src='./dermatology.png' width={'32px'} />
              </button>
            </div>
          </div>
        ) : (
          <div className='w-full h-full'>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-full h-full"
              videoConstraints={videoConstraints}
            />

          </div>

        )}
        {
          !imageURL && (
            <div className="fixed bottom-6 flex left-0 mx-auto justify-between w-full items-center px-5 z-10">
              <span className="sr-only">PreImg</span>
              <div className="flex flex-grow">
                {/* Hidden file input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  style={{ display: "none" }} // Hide the input
                />
                <button type="button"
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button" aria-expanded="false" aria-haspopup="true"
                  onClick={handleButtonUploadImageClick}>
                  <span className="sr-only">Upload file</span>
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
                    <path d="M5 10V9" strokeLinecap="round" />
                    <path d="M19 15v-1" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>
          )
        }
      </div>
    </>
  );
};

export default CameraAndUpload;
