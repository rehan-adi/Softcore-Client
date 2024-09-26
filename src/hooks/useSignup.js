import axios from "axios";
import { toast } from "react-hot-toast";
import { useCallback, useState } from "react"; 

export const useSignup = () => {
    const [loading, setLoading] = useState(false);

    const onSubmit = useCallback(async (data) => {
        setLoading(true);
        try {
            const response = await axios.post("https://softcore.onrender.com/api/v1/auth/signup", data);
            if (response.data.success) {
                toast.success("Sign Up successful!");
                return true;
            } else {
                toast.error("Signup failed. Please try again.");
                return false;
            }
        } catch (error) {
            const message = error.response?.data?.message || "Error signing up. Please try again later.";
            toast.error(message);
            console.error("Error signing up:", error);
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    return { onSubmit, loading };
};
