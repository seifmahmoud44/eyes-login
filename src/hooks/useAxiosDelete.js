import { useState } from "react";
import axios from "axios";

const useAxiosDelete = () => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteResponse, setDeleteResponse] = useState(null);
  const [error, setError] = useState(null);

  const deleteData = async (url, id) => {
    setDeleteLoading(true);
    setError(null);

    // Create form data
    const formData = new FormData();
    formData.append("id", id);

    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setDeleteResponse(response.data);
      return response.data; // Return response data
    } catch (error) {
      setError(error);
      throw error; // Throw error to handle it in .catch()
    } finally {
      setDeleteLoading(false);
    }
  };

  return { deleteLoading, deleteResponse, error, deleteData };
};

export default useAxiosDelete;
