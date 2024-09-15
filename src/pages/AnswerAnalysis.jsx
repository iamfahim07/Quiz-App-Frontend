import { useState } from "react";
import AnalysisInformation from "../components/answer-analysis/AnalysisInformation";
import Button from "../components/Button";
import BaseLayoutBox from "../components/shared-ui/user/BaseLayoutBox";
import QuizBody from "../components/shared-ui/user/QuizBody";
import QuizCountNotification from "../components/shared-ui/user/QuizCountNotification";
import { useAnalysisContext } from "../context";

export default function AnswerAnalysis() {
  const {
    cloneQuizzes,
    userAchievedScore,
    userSelectedData,
    userTimeTaken,
    rankingText,
  } = useAnalysisContext();
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);

  const onButtonClick = (e) => {
    if (e.target.textContent === "Next") {
      if (currentQuizIndex < cloneQuizzes.length - 1) {
        setCurrentQuizIndex((prev) => prev + 1);
      }
    } else {
      if (currentQuizIndex > 0) {
        setCurrentQuizIndex((prev) => prev - 1);
      }
    }
  };

  const selectedAnswers = userSelectedData.find(
    (data) => data.id === cloneQuizzes[currentQuizIndex]._id
  );

  return (
    <BaseLayoutBox>
      <AnalysisInformation
        allProps={{
          userAchievedScore,
          totalAchievableScore: cloneQuizzes?.length,
          userTimeTaken,
          rankingText,
          isSortQuiz: cloneQuizzes[currentQuizIndex].isSortQuiz,
        }}
      />

      <div className="w-full lg:w-3/5 py-4 sm:py-8 px-5 sm:px-10">
        <div className="w-full">
          <h1 className="text-xl sm:text-2xl md:text-3xl text-gray-800 dark:text-[#F6F7F9] font-bold font-['Roboto']">
            Answer Analysis
          </h1>

          <QuizBody
            quiz={cloneQuizzes[currentQuizIndex]}
            qnNo={currentQuizIndex + 1}
            userSelectedAnswers={selectedAnswers.userAnswers}
            isAnalysis={true}
          />

          <div className="flex justify-between items-center mt-4">
            <QuizCountNotification
              currentQuizIndex={currentQuizIndex}
              quizzes={cloneQuizzes}
            />

            <div className="flex gap-3">
              <Button
                isDisabled={currentQuizIndex === 0}
                handleButtonClick={onButtonClick}
              >
                Prev
              </Button>
              <Button
                isDisabled={currentQuizIndex === cloneQuizzes.length - 1}
                handleButtonClick={onButtonClick}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </BaseLayoutBox>
  );
}
