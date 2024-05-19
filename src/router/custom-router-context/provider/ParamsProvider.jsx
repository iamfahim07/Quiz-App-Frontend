import { useEffect, useState } from "react";
import { ParamsContext } from "../context";

export default function ParamsProvider({
  paths: { path, currentPath },
  children,
}) {
  const [customParams, setCustomParams] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const paramsName = currentPath.split("/");
    setCustomParams((prev) => ({
      ...prev,
      [path.split(":")[1]]: paramsName[paramsName.length - 1],
    }));
    setLoading(false);
  }, [path, currentPath]);

  return (
    <ParamsContext.Provider value={{ ...customParams }}>
      {loading ? <h1>Loading...</h1> : children}
    </ParamsContext.Provider>
  );
}
