import axios from "axios";
import { toast } from "react-hot-toast";
import { setToken } from '../utils/token';
import { useState, useCallback } from "react";

export const useSignin = () => {
  const [loading, setLoading] = useState(false);

  const signin = useCallback(async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://softcore.onrender.com/api/v1/auth/signin",
        data,
        { withCredentials: true }
      );

      if (response.data.success) {
        const { token } = response.data;
        setToken(token);
        toast.success("Sign in successful");
        return true;
      }
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(message);
      console.error("Error signing in:", error);
      return false;
    } finally {
      setLoading(false);
    }
  }, [])

  return { signin, loading };
};
