import { useState } from "react";
import { QuizTopicContext } from "../context";

export default function QuizTopicProvider({ children }) {
  const [quizTopic, setQuizTopic] = useState({});

  return (
    <QuizTopicContext.Provider value={{ quizTopic, setQuizTopic }}>
      {children}
    </QuizTopicContext.Provider>
  );
}
