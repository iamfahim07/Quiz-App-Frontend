import { useReducer, useEffect } from "react";

// reducer function
const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
        data: [],
        errorMessage: "",
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action?.payload?.data,
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action?.payload?.message,
      };
    default:
      throw new Error();
  }
};

export default function useGetDataQuery(queryString) {
  const [responseData, dispatch] = useReducer(dataFetchReducer, {
    isLoading: true,
    isError: false,
    data: [],
    errorMessage: "",
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });

      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/${queryString}`
        );
        const result = await response.json();

        if (!didCancel) {
          if (result.data) {
            dispatch({ type: "FETCH_SUCCESS", payload: result });
          } else {
            dispatch({ type: "FETCH_FAILURE", payload: result });
          }
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: "FETCH_FAILURE" });
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [queryString]);

  return { ...responseData };
}
