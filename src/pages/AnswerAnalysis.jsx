import { useState } from "react";
import AnalysisInformation from "../components/answer-analysis/AnalysisInformation";
import Button from "../components/Button";
import BaseLayoutBox from "../components/shared-ui/user/BaseLayoutBox";
import QuizBody from "../components/shared-ui/user/QuizBody";
import QuizCountNotification from "../components/shared-ui/user/QuizCountNotification";
import { useAnalysisContext } from "../context";

export default function AnswerAnalysis() {
  const {
    userAchievedScore,

    quizData,
    userSelectedData,
    rankingText,
  } = useAnalysisContext();
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);

  const onButtonClick = (e) => {
    if (e.target.textContent === "Next") {
      if (currentQuizIndex < quizData.length - 1) {
        setCurrentQuizIndex((prev) => prev + 1);
      }
    } else {
      if (currentQuizIndex > 0) {
        setCurrentQuizIndex((prev) => prev - 1);
      }
    }
  };

  const selectedAnswers = userSelectedData.find(
    (data) => data.id === quizData[currentQuizIndex]._id
  );

  return (
    <BaseLayoutBox>
      <AnalysisInformation
        allProps={{
          userAchievedScore,
          totalAchievableScore: quizData?.length,
          rankingText,
        }}
      />

      <div className="w-full lg:w-3/5 flex justify-center items-center py-4 sm:py-8 px-5 sm:px-10">
        <div className="w-full">
          <h1 className="text-xl sm:text-2xl md:text-4xl text-gray-900 dark:text-[#F6F7F9] font-semibold font-['Roboto'] italic mb-5">
            Answer Analysis
          </h1>

          <QuizBody
            quiz={quizData[currentQuizIndex]}
            qnNo={currentQuizIndex + 1}
            userSelectedAnswers={selectedAnswers.userAnswers}
            isAnalysis={true}
          />

          <div className="flex justify-between items-center mt-4">
            <QuizCountNotification
              currentQuizIndex={currentQuizIndex}
              quizzes={quizData}
            />

            <div className="flex gap-3">
              <Button
                isDisabled={currentQuizIndex === 0}
                handleButtonClick={onButtonClick}
              >
                Prev
              </Button>
              <Button
                isDisabled={currentQuizIndex === quizData.length - 1}
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
