import { useRef } from "react";
import upLoadingImg from "../assets/up-loading.png";
import { toast } from "sonner";

const FileUpload = ({ setUploadFile }) => {
  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    } else {
      console.error("fileInputRef is not set");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      if (file.type.startsWith("video/")) {
        const video = document.createElement("video");
        video.preload = "metadata";

        video.onloadedmetadata = () => {
          window.URL.revokeObjectURL(video.src);

          if (video.duration > 60) {
            // 60 seconds = 1 minute

            toast.error("لا يمكن رفع فيديو اكبر من دقيقة");
          } else {
            setUploadFile(file);
          }
        };

        video.src = URL.createObjectURL(file);
      } else {
        setUploadFile(file);
      }
    }
  };

  return (
    <div>
      <div
        className="bg-[#1A6537] p-3 flex justify-center items-center rounded cursor-pointer hover:scale-110 transition-all"
        onClick={handleIconClick}
      >
        <img src={upLoadingImg} alt="Upload Icon" className="w-6 " />
      </div>
      <input
        type="file"
        accept="image/*,video/*"
        ref={fileInputRef}
        style={styles.fileInput}
        onChange={handleFileChange}
      />
    </div>
  );
};

const styles = {
  fileInput: {
    display: "none",
  },
  error: {
    color: "red",
  },
};

export default FileUpload;
