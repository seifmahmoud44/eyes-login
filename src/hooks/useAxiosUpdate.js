import { useState } from "react";
import axios from "axios";

const useAxiosUpdate = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendData = async (url, postData) => {
    setLoading(true);
    const formData = new FormData();

    // Append each key-value pair to the FormData object
    Object.keys(postData).forEach((key) => {
      const value = postData[key];
      if (value instanceof File) {
        formData.append(key, value); // Append file directly
      } else if (typeof value === "object" && value !== null) {
        formData.append(key, JSON.stringify(value)); // Stringify objects
      } else {
        formData.append(key, value); // Append primitives
      }
    });

    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setResponse(response.data);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return { response, loading, error, sendData };
};

export default useAxiosUpdate;
