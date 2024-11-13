import { useEffect } from "react";
import { setToken } from "./token";
import { useNavigate } from "react-router-dom";

function GoogleCallback() {

  const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token');
    if (token) {
      setToken(token);
      navigate('/');
    }
  }, [navigate]);

  return null;
}

export default GoogleCallback;
