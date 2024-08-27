// import Button from "../components/Button";
// import { useQuizTopicContext, useAnalysisContext } from "../context";
// import useGetDataQuery from "../hooks/api/useGetDataQuery";
// import QuizBody from "../components/shared-ui/user/QuizBody";
// import { useEffect, useState } from "react";
// import { Link } from "../router/CustomRouter";
// import QuizCountNotification from "../components/shared-ui/user/QuizCountNotification";
import { Suspense } from "react";
import GameplayInformation from "../components/gameplay/GameplayInformation";
import GameplayQuiz from "../components/gameplay/GameplayQuiz";
import BaseLayoutBox from "../components/shared-ui/user/BaseLayoutBox";

export default function Gameplay() {
  // const { quizTopic } = useQuizTopicContext();

  // //getting all the quizzes
  // const {
  //   isLoading: quiz_loading,
  //   isError: quiz_error,
  //   data: quizzes,
  //   errorMessage: quiz_error_msg,
  // } = useGetDataQuery(`quizzes/${quizTopic.toLowerCase()}`);

  // // getting the leaderboard info
  // const {
  //   isLoading: leaderboard_loading,
  //   data: leaderboard_data,
  //   errorMessage: leaderboard_errorMessage,
  // } = useGetDataQuery(`leaderboards/${quizTopic}`);
  // // analysis context
  // const {
  //   setUserAchievedScore,
  //   setUserTimeTaken,
  //   setQuizData,
  //   setUserSelectedData,
  //   setLeaderboardInfo,
  // } = useAnalysisContext();
  // // time bar state
  // const [remainingTime, setRemainingTime] = useState({
  //   second: 0,
  //   timeBarWidth: 0,
  //   isTimeBarActive: false,
  // });
  // // tracking the current quiz
  // const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  // // users chossen answers state
  // const [selectedAnswers, setSelectedAnswers] = useState([]);

  // // setting quiz and leaderboard info into the analysis context
  // useEffect(() => {
  //   setQuizData(quizzes);
  //   setLeaderboardInfo({
  //     leaderboard_loading,
  //     leaderboard_data,
  //     leaderboard_errorMessage,
  //   });
  // }, [
  //   quizzes,
  //   setQuizData,
  //   leaderboard_loading,
  //   leaderboard_data,
  //   leaderboard_errorMessage,
  //   setLeaderboardInfo,
  // ]);

  // // time bar useEffect
  // useEffect(() => {
  //   let timeoutId;

  //   const tick = () => {
  //     if (remainingTime.second === 0) {
  //       setRemainingTime((prev) => ({ ...prev, isTimeBarActive: true }));
  //     }

  //     if (remainingTime.second < 30) {
  //       setRemainingTime((prev) => ({ ...prev, second: prev.second + 1 }));
  //     } else {
  //       clearTimeout(timeoutId);
  //     }

  //     if (remainingTime.second < 29) {
  //       setRemainingTime((prev) => ({
  //         ...prev,
  //         timeBarWidth: prev.timeBarWidth + 3.448,
  //       }));
  //     } else {
  //       clearTimeout(timeoutId);
  //     }

  //     timeoutId = setTimeout(tick, 1000);
  //   };

  //   timeoutId = setTimeout(tick, 1000);

  //   return () => clearTimeout(timeoutId);
  // }, [remainingTime]);

  // // next button click event
  // const onNextButtonClick = () => {
  //   if (currentQuizIndex === 0) {
  //     setUserAchievedScore(0);
  //     setUserTimeTaken(0);
  //   }

  //   setRemainingTime({ second: 0, timeBarWidth: 0, isTimeBarActive: false });

  //   const qnID = quizzes[currentQuizIndex]._id;

  //   setUserSelectedData((prev) => [
  //     ...prev,
  //     { id: qnID, userAnswers: [...selectedAnswers] },
  //   ]);

  //   setUserTimeTaken((prev) => prev + remainingTime.second);

  //   checkAnswers();

  //   if (currentQuizIndex < quizzes.length - 1) {
  //     setCurrentQuizIndex((prev) => prev + 1);
  //   }
  // };

  // // changing the UI according to user action
  // const toggleClick = (id) => {
  //   if (remainingTime.second >= 30) return;

  //   if (selectedAnswers.includes(id)) {
  //     const newSelectedAnswers = selectedAnswers.filter(
  //       (selectedAnswer) => selectedAnswer !== id
  //     );
  //     return setSelectedAnswers(newSelectedAnswers);
  //   }
  //   setSelectedAnswers((prev) => [...prev, id]);
  // };

  // // checking if the user answer is correct or not
  // const checkAnswers = () => {
  //   setSelectedAnswers([]);

  //   const correctAnswers = quizzes[currentQuizIndex].options.filter(
  //     (option) => option.isCorrect
  //   );

  //   if (correctAnswers.length !== selectedAnswers.length) return;

  //   const isUserCorrect = correctAnswers.every((correctAnswer) =>
  //     selectedAnswers.includes(correctAnswer._id)
  //   );

  //   if (isUserCorrect) {
  //     setUserAchievedScore((prev) => prev + 5);
  //   }
  // };

  return (
    <BaseLayoutBox>
      {/* <main className="flex flex-col lg:flex-row justify-between gap-8 bg-gray-100 dark:bg-gray-700 my-4"> */}
      <GameplayInformation />

      {/* <div className="w-full lg:w-3/5 flex justify-center items-center py-4 sm:py-8 px-5 sm:px-10">
        <div className="w-full flex flex-col gap-6 md:gap-8 bg-white dark:bg-gray-600 rounded shadow-xl px-2 md:px-5 py-2 md:py-4">
          <div className="flex flex-col gap-3 md:gap-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl text-gray-800 dark:text-[#F6F7F9] font-normal font-['Roboto']">
              Hurry, time&apos;s running out!{" "}
              <span>{remainingTime.second}</span>
            </h1>
            <div className="w-full h-1 bg-gray-200 rounded">
              <div
                className={`h-1 ${
                  remainingTime.second < 11
                    ? "bg-green-600"
                    : remainingTime.second < 21
                    ? "bg-yellow-300"
                    : "bg-red-600"
                } ${
                  remainingTime.isTimeBarActive &&
                  "rounded transition-all ease-linear duration-1000"
                }`}
                style={{
                  width: `${remainingTime.timeBarWidth}%`,
                }}
              ></div>
            </div>
          </div>

          handeling the loging state
          {quiz_loading && !quiz_error && <h1>Loading...</h1>}

          handling the error state
          {!quiz_loading && quiz_error && quiz_error_msg && (
            <h1>{quiz_error_msg}</h1>
          )}

          handling success state
          {!quiz_loading && !quiz_error && quizzes.length > 0 && (
            <QuizBody
              quiz={quizzes[currentQuizIndex]}
              qnNo={currentQuizIndex + 1}
              userSelectedAnswers={selectedAnswers}
              onToggleClick={toggleClick}
              timeLeft={remainingTime.second}
            />
          )}

          <div className="flex justify-between items-center">
            <p className="text-base sm:text-lg md:text-2xl text-gray-600 dark:text-[#F2F3F5] font-['Inter']">
            <span className="font-semibold text-gray-600 dark:text-[#F2F3F5]">
              {currentQuizIndex + 1}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-600 dark:text-[#F2F3F5]">
              {quizzes.length}
            </span>{" "}
            Questions
          </p>

            <QuizCountNotification
              quizzes={quizzes}
              currentQuizIndex={currentQuizIndex}
            />

            <Link
              to={
                currentQuizIndex === quizzes.length - 1
                  ? `/answer_analysis/${quizTopic}`
                  : ""
              }
            >
              <Button handleButtonClick={onNextButtonClick}>
                {currentQuizIndex === quizzes.length - 1
                  ? "Finish"
                  : "Next Question"}
              </Button>
            </Link>
          </div>
        </div>
      </div> */}

      <Suspense fallback={<h1>Loading...</h1>}>
        <GameplayQuiz />
      </Suspense>
      {/* </main> */}
    </BaseLayoutBox>
  );
}
