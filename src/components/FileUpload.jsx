import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const FileUpload = () => {
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const onDrop = useCallback((acceptedFiles) => {
    setError("");
    const file = acceptedFiles[0];

    if (file.type.startsWith("video/")) {
      const video = document.createElement("video");
      video.preload = "metadata";

      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);

        if (video.duration > 60) {
          // 60 seconds = 1 minute
          setError("Video is too long. Maximum duration is 1 minute.");
        } else {
          setFile(file);
          setPreview(URL.createObjectURL(file));
        }
      };

      video.src = URL.createObjectURL(file);
    } else {
      setFile(file);
      setPreview(URL.createObjectURL(file));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*,video/*",
    multiple: false,
  });

  const handleSubmit = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("YOUR_API_ENDPOINT", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          alert("File uploaded successfully");
        } else {
          alert("Failed to upload file");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      alert("No file to upload");
    }
  };

  return (
    <div>
      <div {...getRootProps()} style={styles.dropzone}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>
            Drag drop an image or video here, or click to select a file (Max
            duration for videos: 1 minute)
          </p>
        )}
        {error && <p style={styles.error}>{error}</p>}
      </div>
      {preview && (
        <div style={styles.preview}>
          {file.type.startsWith("image/") ? (
            <img src={preview} alt="Preview" style={styles.previewImage} />
          ) : (
            <video src={preview} controls style={styles.previewVideo} />
          )}
        </div>
      )}
      <button onClick={handleSubmit} style={styles.uploadButton}>
        Upload
      </button>
    </div>
  );
};

const styles = {
  dropzone: {
    border: "2px dashed #cccccc",
    borderRadius: "4px",
    padding: "20px",
    textAlign: "center",
    cursor: "pointer",
  },
  error: {
    color: "red",
  },
  preview: {
    marginTop: "20px",
  },
  previewImage: {
    width: "100px",
    height: "auto",
  },
  previewVideo: {
    width: "100px",
    height: "auto",
  },
  uploadButton: {
    marginTop: "20px",
    padding: "10px 20px",
    cursor: "pointer",
  },
};

export default FileUpload;
