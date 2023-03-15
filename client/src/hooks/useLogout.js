import axiosPrivate from "../middleware/http-common";
import useAuth from "./useAuth";
import { USER_LOGOUT } from "../services/services";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});
    try {
      const response = await axiosPrivate.get(USER_LOGOUT, {
        withCredentials: true,
      });

      console.log({ "response from server token trouvé ": response?.data });
    } catch (error) {
      console.log(error);
    }
  };
  return logout;
};

export default useLogout;
