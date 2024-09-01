import { useEffect, useState } from "react";
import { ParamsContext } from "../context";

export default function ParamsProvider({
  paths: { path, currentPath },
  children,
}) {
  const [customParams, setCustomParams] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const paramsValue = currentPath
      .split("/")
      .filter((item) => !path.split("/").includes(item));

    const paramsObj = path
      .split("/")
      .filter((item) => item.includes(":"))
      .map((item) => item.replace(":", ""))
      .reduce((obj, str, index) => {
        return { ...obj, [str]: paramsValue[index] };
      }, {});

    setCustomParams((prev) => ({
      ...prev,
      ...paramsObj,
    }));
    setLoading(false);
  }, [path, currentPath]);

  return (
    <ParamsContext.Provider value={{ ...customParams }}>
      {loading ? <h1>Loading...</h1> : children}
    </ParamsContext.Provider>
  );
}
