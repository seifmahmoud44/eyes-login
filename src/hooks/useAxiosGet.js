import { useState, useCallback } from "react";
import axios from "axios";

const useAxiosGet = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (url) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(url);
      setData(response.data);
      return response.data; // Return the response data
    } catch (err) {
      setError(err.message);
      throw err; // Throw error to handle it in .catch()
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchData };
};

export default useAxiosGet;
