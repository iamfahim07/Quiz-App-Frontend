import { useState } from "react";
import { Navigate } from "../../router/CustomRouter";
import { AuthContext } from "../context";

// initial user info
let initialUserInfo = {};

// setting the user info
if (typeof window !== "undefined") {
  // ✅ Only runs once per app load

  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${import.meta.env.VITE_COOKIE_NAME}`))
    ?.split("=")[1];

  // set cookie
  if (cookieValue) {
    const { fullName, userName, role, authToken, refreshToken } =
      JSON.parse(cookieValue);

    initialUserInfo = { fullName, userName, role, authToken, refreshToken };
  }
}

export default function AuthProvider({ children }) {
  // const [auth, setAuth] = useState({});
  const [currentUser, setCurrentUser] = useState(initialUserInfo);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // useEffect(() => {
  //   const cookieValue = document.cookie
  //     .split("; ")
  //     .find((row) => row.startsWith(`${import.meta.env.VITE_COOKIE_NAME}`))
  //     ?.split("=")[1];

  //   // set cookie
  //   if (cookieValue) {
  //     const { fullName, userName, authToken, refreshToken } =
  //       JSON.parse(cookieValue);

  //     setCurrentUser({ fullName, userName, authToken, refreshToken });
  //   }

  //   setIsLoading(false);
  // }, []);

  // register function
  async function register(input) {
    try {
      setIsError(false);
      setIsLoading(true);
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
      }=${cookies}; expires=${expiryDate}; path=/`;

      // set current user
      setCurrentUser({ fullName, userName, authToken, refreshToken });

      return true;
    } catch (err) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  // login function
  async function login(input) {
    try {
      setIsError(false);
      setIsLoading(true);
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
        user: { fullName, userName, role },
        tokens: { token: authToken, refreshToken },
      } = await response.json();

      // cookies
      const cookies = JSON.stringify({
        fullName,
        userName,
        role,
        authToken,
        refreshToken,
      });

      // cookie expiry time
      const expiryDate = new Date(
        new Date().getTime() + Number(import.meta.env.VITE_EXPIRE_TIME)
      ).toUTCString();

      document.cookie = `${
        import.meta.env.VITE_COOKIE_NAME
      }=${cookies}; expires=${expiryDate}; path=/`;

      // set current user
      setCurrentUser({ fullName, userName, role, authToken, refreshToken });

      return true;
    } catch (err) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  // logout function
  async function logout() {
    document.cookie = `${
      import.meta.env.VITE_COOKIE_NAME
    }=""; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;

    setCurrentUser({});

    Navigate("/");
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoading,
        isError,
        register,
        login,
        logout,
      }}
    >
      {/* {!isLoading && children} */}
      {children}
    </AuthContext.Provider>
  );
}
