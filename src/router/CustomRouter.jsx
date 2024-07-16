import { useEffect, useState } from "react";
import ParamsProvider from "./custom-router-context/provider/ParamsProvider";
import {
  isRouteCacheExist,
  createRouteCache,
} from "./cached-custom-route/cachedCustomRoute";

// router function
export function Route({ path, component }) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // creating a cache for the specified path
  createRouteCache(path, path);

  const componentParams = path.split(":")[0];

  const isDynamicRoute =
    path.includes(":") && currentPath.includes(componentParams);

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("navigate", onLocationChange);
    window.addEventListener("popstate", onLocationChange);

    return () => {
      window.removeEventListener("navigate", onLocationChange);
      window.removeEventListener("popstate", onLocationChange);
    };
  }, []);

  // handling not found route
  if (path === "/*" && !isRouteCacheExist(window.location.pathname)) {
    return component;
  }

  return isDynamicRoute ? (
    <ParamsProvider paths={{ path, currentPath }}>{component}</ParamsProvider>
  ) : currentPath === path ? (
    component
  ) : null;
}

// link function
export function Link({ to, children }) {
  // creating a cache for the specified path
  createRouteCache(to, to);

  const preventReload = (e) => {
    e.preventDefault();
    window.history.pushState({}, "", to);
    const navigationEvent = new PopStateEvent("navigate");
    window.dispatchEvent(navigationEvent);
  };

  return (
    <a href={to} onClick={preventReload}>
      {children}
    </a>
  );
}

// navigate function
// export function Navigate(to, { replace } = { replace: false }) {
//   useEffect(() => {
//     if (replace) {
//       window.history.replaceState({}, "", to);
//     } else {
//       window.history.pushState({}, "", to);
//     }

//     const navigationEvent = new PopStateEvent("navigate");
//     window.dispatchEvent(navigationEvent);
//   }, [to, replace]);
// }

export function Navigate(to, { replace } = { replace: false }) {
  // creating a cache for the specified path
  createRouteCache(to, to);

  if (replace) {
    window.history.replaceState({}, "", to);
  } else {
    window.history.pushState({}, "", to);
  }

  const navigationEvent = new PopStateEvent("navigate");
  window.dispatchEvent(navigationEvent);
}

// redirect function
export function Redirect(to) {
  // creating a cache for the specified path
  createRouteCache(to, to);

  window.location.replace(to);
}
