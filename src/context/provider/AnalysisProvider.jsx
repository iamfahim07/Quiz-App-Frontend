import { useState } from "react";
import { AnalysisContext } from "../context";

export default function AnalysisProvider({ children }) {
  const [cloneQuizzes, setCloneQuizzes] = useState([]);
  const [userAchievedScore, setUserAchievedScore] = useState(0);
  const [userSelectedData, setUserSelectedData] = useState([]);
  const [userTimeTaken, setUserTimeTaken] = useState(0);
  const [rankingText, setRankingText] = useState("");

  return (
    <AnalysisContext.Provider
      value={{
        cloneQuizzes,
        setCloneQuizzes,
        userAchievedScore,
        setUserAchievedScore,
        userTimeTaken,
        setUserTimeTaken,
        userSelectedData,
        setUserSelectedData,
        rankingText,
        setRankingText,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
}
