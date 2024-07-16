import { useState } from "react";
import { AnalysisContext } from "../context";

export default function AnalysisProvider({ children }) {
  const [userAchievedScore, setUserAchievedScore] = useState(0);
  const [userTimeTaken, setUserTimeTaken] = useState(0);
  const [quizData, setQuizData] = useState([]);
  const [userSelectedData, setUserSelectedData] = useState([]);
  const [leaderboardInfo, setLeaderboardInfo] = useState({});

  return (
    <AnalysisContext.Provider
      value={{
        userAchievedScore,
        setUserAchievedScore,
        userTimeTaken,
        setUserTimeTaken,
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
