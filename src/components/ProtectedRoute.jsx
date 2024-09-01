import { useAuthContext, useQuizTopicContext } from "../context";
import { Redirect } from "../router/CustomRouter";

export default function ProtectedRoute({ children }) {
  const { currentUser } = useAuthContext();
  const { quizTopic } = useQuizTopicContext();

  // admin protected route
  if (currentUser?.userName && currentUser?.role === "admin") {
    return children;
  }

  // user protected route
  if (currentUser?.userName && currentUser?.role === "user") {
    if (quizTopic?.title !== undefined) {
      return children;
    } else {
      return Redirect("/quiz_options");
    }
  } else {
    return Redirect("/introduce_yourself");
  }
}
