import axios from "axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("http://localhost:5000/api/refresh", {
      withCredentials: true,
    });

    setAuth((prev) => {
      return {
        ...prev,
      };
    });
  };

  return <div>useRefreshToken</div>;
};

export default useRefreshToken;
