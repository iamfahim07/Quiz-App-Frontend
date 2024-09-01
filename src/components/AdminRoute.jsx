import { useAuthContext } from "../context";
import { Navigate } from "../router/CustomRouter";

export default function AdminRoute({ children }) {
  const { currentUser } = useAuthContext();

  if (
    currentUser &&
    currentUser?.role === "admin" &&
    !window.location.pathname.includes("admin")
  ) {
    return Navigate("/admin/quiz_topic_customize", { replace: true });
  }
  return children;
}
