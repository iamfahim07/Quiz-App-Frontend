import { useReducer } from "react";
import { updateCache, deleteCache } from "./cached-api-data/cachedAPIData";

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
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

export default function useSetDataMutation(url) {
  const [responseData, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: null,
    errorMessage: "",
  });

  // const initialFetch = useRef(true);

  // useEffect(() => {
  //   if (!url || !bodyData.length || !initialFetch.current) return;

  //   const fetchData = async () => {
  //     dispatch({ type: "FETCH_INIT" });

  //     try {
  //       const response = await fetch(
  //         `${import.meta.env.VITE_SERVER_BASE_URL}/${url}`,
  //         {
  //           method,
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({ payloadData: bodyData }),
  //         }
  //       );
  //       const result = await response.json();

  //       if (result.data) {
  //         dispatch({ type: "FETCH_SUCCESS", payload: result });
  //       } else {
  //         dispatch({ type: "FETCH_FAILURE", payload: result });
  //       }
  //     } catch (error) {
  //       dispatch({ type: "FETCH_FAILURE" });
  //     }
  //   };

  //   fetchData();

  //   return () => {
  //     initialFetch.current = false;
  //   };
  // }, [url, method, bodyData]);

  async function setData(dataset, { method = "POST" } = {}) {
    if (!url || !dataset) return;

    // constructing the full url
    const fullURL = `${import.meta.env.VITE_SERVER_BASE_URL}/${url}`;

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
        headers: headersConfig,
        body: PayloadData,
      });

      if (!response.ok) {
        dispatch({ type: "FETCH_FAILURE", payload: response.statusText });
      }

      const result = await response.json();

      if (result.data) {
        dispatch({ type: "FETCH_SUCCESS", payload: result });

        return method === "DELETE"
          ? deleteCache(fullURL, result.data)
          : updateCache(fullURL, result.data);
      } else {
        dispatch({ type: "FETCH_FAILURE", payload: result });
      }
    } catch (error) {
      dispatch({ type: "FETCH_FAILURE" });
    }
  }

  return [setData, responseData];
}
