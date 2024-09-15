import { useReducer } from "react";
import { deleteCache, updateCache } from "./cached-api-data/cachedAPIData";

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
        data: null,
        errorMessage: "",
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action?.payload?.data,
        errorMessage: "",
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: null,
        errorMessage: action?.payload?.message,
      };
    default:
      throw new Error();
  }
};

export default function useSetDataMutation(url = "") {
  const [responseData, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: null,
    errorMessage: "",
  });

  async function setData(dataset, { method = "POST", redirectURL = url } = {}) {
    if (!redirectURL || !dataset) return;

    // constructing the full url
    const fullURL = `${import.meta.env.VITE_SERVER_BASE_URL}/${redirectURL}`;

    // checking if the data is form data or not
    const isFormData = dataset instanceof FormData;

    const headersConfig = isFormData
      ? {}
      : { "Content-Type": "application/json" };

    const PayloadData = isFormData
      ? dataset
      : JSON.stringify({ payload: dataset });

    dispatch({ type: "FETCH_INIT" });

    try {
      const response = await fetch(`${fullURL}`, {
        method,
        credentials: "include",
        headers: headersConfig,
        body: PayloadData,
      });

      if (!response.ok) {
        const { message } = await response.json();

        throw new Error(message);
      }

      const result = await response.json();

      dispatch({ type: "FETCH_SUCCESS", payload: result });

      return method === "DELETE"
        ? deleteCache(fullURL, result.data)
        : updateCache(fullURL, result.data);
    } catch (err) {
      const errorMsg =
        err.message === "Failed to fetch"
          ? "Something went wrong! Please try again in a moment."
          : err.message;

      dispatch({
        type: "FETCH_FAILURE",
        payload: { message: errorMsg },
      });
      throw new Error(errorMsg);
    }
  }

  return [setData, responseData];
}
