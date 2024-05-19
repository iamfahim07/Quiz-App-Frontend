import { useContext } from "react";
import { ParamsContext } from "./context";

// creting the context hook
export const useParamsContext = () => {
  return useContext(ParamsContext);
};
