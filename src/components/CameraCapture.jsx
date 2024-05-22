import { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import closeImg from "../assets/close.png";
import rec from "../assets/rec-button.png";
import flipImg from "../assets/flip.png";
import capture from "../assets/capture.png";

const CameraCapture = ({ setUploadFile, setCamModel }) => {
  const [capturedMedia, setCapturedMedia] = useState(null);
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [facingMode, setFacingMode] = useState("user");

  const [isMobile, setIsMobile] = useState(false);
  const isMobileDevice = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
  };

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

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

    setUploadFile(file);
    setCamModel(false);
  };

  const startRecording = async () => {
    setIsRecording(true);

    const stream = webcamRef.current.stream;
    const audioStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    }); // Get audio stream

    const mediaStream = new MediaStream(); // Create a new media stream
    [stream, audioStream].forEach((s) => {
      s.getTracks().forEach((t) => {
        mediaStream.addTrack(t); // Add video and audio tracks to the new media stream
      });
    });

    let options = { mimeType: "video/webm; codecs=vp8" };
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      options = { mimeType: "video/webm" };
    }

    try {
      mediaRecorderRef.current = new MediaRecorder(mediaStream, options);

      const chunks = [];
      mediaRecorderRef.current.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        const file = new File([blob], "capture.webm", { type: "video/webm" });
        setCapturedMedia(file);
        setUploadFile(file);
        setCamModel(false);
      };

      mediaRecorderRef.current.start(100); // Request data every 100ms for smoother recording on mobile
    } catch (e) {
      console.error("MediaRecorder initialization failed:", e);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }
  };

  const flipCamera = () => {
    setFacingMode((prevFacingMode) =>
      prevFacingMode === "user" ? "environment" : "user"
    );
  };

  return (
    <div className="h-full w-full bg-black relative">
      <div
        onClick={() => setCamModel(false)}
        className="p-2 cursor-pointer rounded bg-[#1A6537] absolute top-1 left-1 w-6 z-[1002] flex justify-center items-center "
      >
        <img src={closeImg} alt="" className="" />
      </div>
      <div style={styles.cameraContainer} className="w-full h-full">
        <Webcam
          audio={false} // Don't capture audio directly through Webcam component
          className="w-full h-full"
          ref={webcamRef}
          videoConstraints={{ facingMode }}
          screenshotFormat="image/jpeg"
          style={styles.video}
        />
      </div>
      <div className="mb-3 absolute left-1/2 bottom-0 -translate-x-1/2 flex gap-10 w-full justify-center">
        {!isRecording && isMobile && (
          <div
            onClick={flipCamera}
            className="bg-[#1A6537] p-3 flex justify-center items-center rounded cursor-pointer hover:scale-110 transition-all relative z-10"
          >
            <img className="w-6" src={flipImg} alt="Flip Camera" />
          </div>
        )}
        {!isRecording && (
          <div
            onClick={captureImage}
            className="bg-[#1A6537] p-3 flex justify-center items-center rounded cursor-pointer hover:scale-110 transition-all relative z-10"
          >
            <img className="w-6" src={capture} alt="" />
          </div>
        )}

        {isRecording && (
          <div onClick={stopRecording} className="container">
            <div className="recording-circle"></div>
          </div>
        )}

        {!isRecording && (
          <img
            onClick={startRecording}
            src={rec}
            alt=""
            className="w-12 cursor-pointer"
          />
        )}
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
    height: "100%",
  },
};

export default CameraCapture;
