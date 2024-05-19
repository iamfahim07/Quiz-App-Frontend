import { useContext } from "react";
import { AnalysisContext, AuthContext, QuizTopicContext } from "./context";

// creting the context hook
export const useQuizTopicContext = () => {
  return useContext(QuizTopicContext);
};

export const useAnalysisContext = () => {
  return useContext(AnalysisContext);
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
