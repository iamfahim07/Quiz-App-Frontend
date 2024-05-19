import { useAuthContext, useQuizTopicContext } from "../context";
import { Navigate, Redirect } from "../router/CustomRouter";

export default function ProtectedRoute({ children }) {
  const { currentUser } = useAuthContext();
  const { quizTopic } = useQuizTopicContext();

  if (currentUser?.userName) {
    if (quizTopic !== "") {
      return children;
    } else {
      return Redirect("/quiz_options");
    }
  } else {
    return Redirect("/introduce_yourself");
  }
}
