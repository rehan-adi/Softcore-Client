import axios from 'axios';
import { toast } from 'react-hot-toast';
import { getToken } from '../utils/token';
import { BACKEND_API_URL } from '../constant';
import { useCallback, useEffect, useState } from 'react';

const useFollowUser = (userId) => {

    const [isFollowing, setIsFollowing] = useState(false);
    const [loading, setLoading] = useState(false);

    const checkFollowingStatus = useCallback(async () => {
        if (!userId) return;
        try {
            const token = getToken("token");
            const response = await axios.get(`${BACKEND_API_URL}/user/following-status/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setIsFollowing(response.data.isFollowing);
            }
        } catch (error) {
            console.error('Error checking following status:', error);
            toast.error('Could not check following status. Please try again.');
        }
    }, [userId]);

    const followUser = useCallback(async () => {
        setLoading(true);
        try {
            const token = getToken("token");
            const response = await axios.post(`${BACKEND_API_URL}/user/follow/${userId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setIsFollowing(true);
                toast.success('You are now following this user!');
            }
        } catch (error) {
            console.error('Error following user:', error);
            toast.error('Could not follow user. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        checkFollowingStatus();
    }, [checkFollowingStatus]);

    return { isFollowing, followUser, loading };
};

export default useFollowUser;
