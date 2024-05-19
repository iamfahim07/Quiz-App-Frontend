import { useState, useEffect } from "react";
import { AuthContext } from "../context";
import { Navigate } from "../../router/CustomRouter";

export default function AuthProvider({ children }) {
  // const [auth, setAuth] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${import.meta.env.VITE_COOKIE_NAME}`))
      ?.split("=")[1];
    if (cookieValue) {
      const { fullName, userName, authToken, refreshToken } =
        JSON.parse(cookieValue);

      setCurrentUser({ fullName, userName, authToken, refreshToken });
    }

    setLoading(false);
  }, []);

  // register function
  async function register(input) {
    try {
      setError("");
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/user/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
        }
      );

      const {
        user: { fullName, userName },
        tokens: { token: authToken, refreshToken },
      } = await response.json();

      setLoading(false);

      return setCurrentUser({ fullName, userName, authToken, refreshToken });
    } catch (err) {
      setError(err.message);
    }
  }

  // login function
  async function login(input) {
    setError("");
    try {
      setError("");
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
        }
      );

      const {
        user: { fullName, userName },
        tokens: { token: authToken, refreshToken },
      } = await response.json();

      setCurrentUser({ fullName, userName, authToken, refreshToken });

      // cookies
      const cookies = JSON.stringify({
        fullName,
        userName,
        authToken,
        refreshToken,
      });

      // cookie expiry time
      const expiryDate = new Date(
        new Date().getTime() + Number(import.meta.env.VITE_EXPIRE_TIME)
      ).toUTCString();

      document.cookie = `${
        import.meta.env.VITE_COOKIE_NAME
      }=${cookies}; expires=${expiryDate}`;

      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  }

  // logout function
  async function logout() {
    document.cookie = `${
      import.meta.env.VITE_COOKIE_NAME
    }=""; expires=Thu, 01 Jan 1970 00:00:00 GMT`;

    Navigate("/");
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        error,
        register,
        login,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}
