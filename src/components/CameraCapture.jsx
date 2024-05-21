import React, { useState, useRef } from "react";
import Webcam from "react-webcam";

const CameraCapture = () => {
  const [capturedMedia, setCapturedMedia] = useState(null);
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const base64Data = imageSrc.split(",")[1];
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/jpeg" });
    const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
    setCapturedMedia(file);
    console.log("Captured Image:", file);
  };

  const startRecording = () => {
    setIsRecording(true);

    const stream = webcamRef.current.stream;
    const options = { mimeType: "video/webm" };
    mediaRecorderRef.current = new MediaRecorder(stream, options);

    const chunks = [];
    mediaRecorderRef.current.ondataavailable = (event) => {
      chunks.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      const file = new File([blob], "capture.webm", { type: "video/webm" });
      setCapturedMedia(file);
      console.log("Captured Video:", file);
    };

    mediaRecorderRef.current.start();
  };

  const stopRecording = () => {
    setIsRecording(false);
    mediaRecorderRef.current.stop();
  };

  return (
    <div>
      <div style={styles.cameraContainer}>
        <Webcam audio={true} ref={webcamRef} style={styles.video} />
      </div>
      <div style={styles.controls}>
        <button onClick={captureImage} style={styles.button}>
          Capture Image
        </button>
        <button
          onClick={isRecording ? stopRecording : startRecording}
          style={styles.button}
        >
          {isRecording ? "Stop Recording" : "Start Recording"}
        </button>
      </div>
    </div>
  );
};

const styles = {
  cameraContainer: {
    position: "relative",
    width: "100%",
    maxWidth: "640px",
    margin: "auto",
    backgroundColor: "#000",
  },
  video: {
    width: "100%",
    height: "auto",
  },
  controls: {
    display: "flex",
    justifyContent: "center",
    marginTop: "10px",
  },
  button: {
    margin: "0 10px",
    padding: "10px 20px",
    cursor: "pointer",
  },
};

export default CameraCapture;
