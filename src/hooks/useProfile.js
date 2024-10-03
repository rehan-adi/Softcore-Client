import axios from "axios";
import { useEffect } from "react";
import { toast } from 'react-hot-toast';
import { BACKEND_API_URL } from '../constant';
import { useProfileStore } from "../store/useProfileStore";
import { getToken, getUserIdFromToken } from '../utils/token';

export const useProfile = () => {

    const { setProfileData, setPosts, setLoading } = useProfileStore();

    useEffect(() => {
        const fetchProfileData = async () => {
          setLoading(true);
          try {
            const token = getToken("token");
            if (!token) {
              toast.error("Token not available. Please log in again.");
              setLoading(false);
              return;
            }
    
            const userId = getUserIdFromToken(token);
    
            if (!userId) {
              toast.error("User ID not found in token. Please log in again.");
              setLoading(false);
              return;
            }
    
            const response = await axios.get(
              `${BACKEND_API_URL}/profile/${userId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            
            setProfileData(response.data.profile);
            setPosts(response.data.posts);
            toast.success("Profile data fetched successfully!");
          } catch (error) {
            console.error("Error fetching profile data:", error);
            toast.error("Error fetching profile data. Please try again later.");
          } finally {
            setLoading(false);
          }
        };
    
        fetchProfileData();
      }, []);
}