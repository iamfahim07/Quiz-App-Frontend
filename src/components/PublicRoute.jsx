import { useAuthContext } from "../context";
import { Redirect } from "../router/CustomRouter";

export default function PublicRoute({ children }) {
  const { currentUser } = useAuthContext();

  if (currentUser?.userName) {
    return Redirect("/");
  } else {
    return children;
  }
}
