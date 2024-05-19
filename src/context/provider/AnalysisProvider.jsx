import { useState } from "react";
import { AnalysisContext } from "../context";

export default function AnalysisProvider({ children }) {
  const [score, setScore] = useState(0);
  const [quizData, setQuizData] = useState([]);
  const [userSelectedData, setUserSelectedData] = useState([]);
  const [leaderboardInfo, setLeaderboardInfo] = useState({});

  return (
    <AnalysisContext.Provider
      value={{
        score,
        setScore,
        quizData,
        setQuizData,
        userSelectedData,
        setUserSelectedData,
        leaderboardInfo,
        setLeaderboardInfo,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
}
