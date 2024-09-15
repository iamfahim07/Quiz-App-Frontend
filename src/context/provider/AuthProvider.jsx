import { useState } from "react";
import useGetDataQuery from "../../hooks/api/useGetDataQuery";
import use from "../../hooks/use";
import { Navigate } from "../../router/CustomRouter";
import { AuthContext } from "../context";

// refresh token function
const refreshAuthToken = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_SERVER_BASE_URL}/user/refresh-token`,
    {
      method: "POST",
      credentials: "include",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    return {};
  }

  return result.data;
};

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(
    use(
      useGetDataQuery("user/check-auth", { redirectFunc: refreshAuthToken })
    ) || {}
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState({
    status: false,
    message: "",
  });

  // register function
  async function register(input) {
    try {
      setIsError({
        status: false,
        message: "",
      });
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/user/register`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
        }
      );

      // set error message if response is not ok
      if (!response.ok) {
        const { message } = await response.json();

        return setIsError({
          status: true,
          message: message,
        });
      }

      const { data: user } = await response.json();

      // set current user
      setCurrentUser(user);

      return true;
    } catch (err) {
      setIsError({
        status: true,
        message: "Something went wrong! Please try again in a moment.",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  // login function
  async function login(input) {
    try {
      setIsError({
        status: false,
        message: "",
      });
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/user/login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
        }
      );

      // set error message if response is not ok
      if (!response.ok) {
        const { message } = await response.json();

        return setIsError({
          status: true,
          message: message,
        });
      }

      const { data: user } = await response.json();

      // set current user
      setCurrentUser(user);

      return true;
    } catch (err) {
      setIsError({
        status: true,
        message: "Something went wrong! Please try again in a moment.",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  // logout function
  async function logout() {
    await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/user/logout`, {
      method: "POST",
      credentials: "include",
    });

    setCurrentUser({});

    Navigate("/");
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isLoading,
        isError,
        setIsError,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
