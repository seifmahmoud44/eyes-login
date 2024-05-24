import { useState, useEffect, useRef } from "react";
import { FaMicrophone, FaStop } from "react-icons/fa";
import micImg from "../assets/mic.png";
const AudioRecorder = ({ onStop, setRecording }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedFile, setRecordedFile] = useState(null);
  const [counter, setCounter] = useState(0);
  const timerRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setCounter((prevCounter) => prevCounter + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
      setCounter(0);
    }

    return () => clearInterval(timerRef.current);
  }, [isRecording]);

  const startRecording = async () => {
    setIsRecording(true);
    setRecording(true);
    setRecordedFile(null);

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };
    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      const file = new File([blob], "recording.wav", { type: "audio/wav" });

      setRecordedFile({ file });
      audioChunksRef.current = [];
      if (onStop) {
        onStop(file);
      }
    };
    mediaRecorderRef.current.start();
  };

  const stopRecording = () => {
    setIsRecording(false);
    setRecording(false);

    mediaRecorderRef.current.stop();
  };

  return (
    <div className="flex justify-center items-center gap-5">
      {/* <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? <FaStop /> : <FaMicrophone />}
      </button> */}
      {isRecording && <div>Recording... {counter} seconds</div>}
      {isRecording ? (
        <div onClick={stopRecording} className="container">
          <div className="recording-circle"></div>
        </div>
      ) : (
        <div
          onClick={startRecording}
          className="bg-[#1A6537] p-3 flex justify-center items-center rounded cursor-pointer hover:scale-110 transition-all"
        >
          <img src={micImg} alt="" className="w-6 " />
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
