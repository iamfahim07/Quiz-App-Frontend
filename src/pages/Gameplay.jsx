import Button from "../components/Button";
import { useQuizTopicContext, useAnalysisContext } from "../context";
import useGetDataQuery from "../hooks/useGetDataQuery";
import QuizBody from "../components/QuizBody";
import { useEffect, useState } from "react";
import { Link } from "../router/CustomRouter";

export default function Gameplay() {
  const { quizTopic } = useQuizTopicContext();

  const {
    isLoading,
    isError,
    data: quizzes,
  } = useGetDataQuery(`quizzes/${quizTopic.toLowerCase()}`);

  // getting the leaderboard info
  const {
    isLoading: leaderboard_loading,
    data: leaderboard_data,
    errorMessage: leaderboard_errorMessage,
  } = useGetDataQuery(`leaderboards/${quizTopic}`);

  // time bar state
  const [remainingTime, setRemainingTime] = useState({
    second: 0,
    timeBarWidth: 0,
  });

  // is time bar
  const [isTimeBarActive, setIsTimeBarActive] = useState(false);

  const { setScore, setQuizData, setUserSelectedData, setLeaderboardInfo } =
    useAnalysisContext();

  useEffect(() => {
    setQuizData(quizzes);
    setLeaderboardInfo({
      leaderboard_loading,
      leaderboard_data,
      leaderboard_errorMessage,
    });
  }, [
    quizzes,
    setQuizData,
    leaderboard_loading,
    leaderboard_data,
    leaderboard_errorMessage,
    setLeaderboardInfo,
  ]);

  // time bar useEffect
  useEffect(() => {
    let timeoutId;

    const tick = () => {
      if (remainingTime.second < 30) {
        setRemainingTime((prev) => {
          return {
            ...prev,
            second: prev.second + 1,
            timeBarWidth: prev.timeBarWidth + 3.448,
          };
        });
      }

      timeoutId = setTimeout(tick, 1000);
    };

    timeoutId = setTimeout(tick, 1000);

    setIsTimeBarActive(true);

    return () => clearTimeout(timeoutId);
  }, [remainingTime]);

  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);

  const onNextButtonClick = () => {
    currentQuizIndex === 0 && setScore(0);

    setRemainingTime({ second: 0, timeBarWidth: "w-[0%]" });

    setIsTimeBarActive(false);

    const qnID = quizzes[currentQuizIndex]._id;

    setUserSelectedData((prev) => [
      ...prev,
      { id: qnID, userAnswers: [...selectedAnswers] },
    ]);
    checkAnswers();

    if (currentQuizIndex < quizzes.length - 1) {
      setCurrentQuizIndex((prev) => prev + 1);
    }
  };

  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const toggleClick = (id) => {
    if (selectedAnswers.includes(id)) {
      const newSelectedAnswers = selectedAnswers.filter(
        (selectedAnswer) => selectedAnswer !== id
      );
      return setSelectedAnswers(newSelectedAnswers);
    }
    setSelectedAnswers((prev) => [...prev, id]);
  };

  const checkAnswers = () => {
    setSelectedAnswers([]);

    const correctAnswers = quizzes[currentQuizIndex].options.filter(
      (option) => option.isCorrect
    );

    if (correctAnswers.length !== selectedAnswers.length) return;

    const isUserCorrect = correctAnswers.every((correctAnswer) =>
      selectedAnswers.includes(correctAnswer._id)
    );

    if (isUserCorrect) {
      setScore((prev) => prev + 5);
    }
  };

  return (
    <main className="flex justify-center items-center my-10 md:my-14">
      <div className="w-full md:w-1/2 flex flex-col gap-6 md:gap-8 bg-gray-100 dark:bg-gray-600 rounded shadow-xl px-2 md:px-5 py-2 md:py-4">
        <div className="flex flex-col gap-3 md:gap-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl text-gray-800 dark:text-[#F6F7F9] font-normal font-['Roboto']">
            Hurry, time&apos;s running out! <span>{remainingTime.second}</span>
          </h1>
          <div className="w-full h-1 bg-gray-200 rounded">
            <div
              className={`h-1 ${
                isTimeBarActive &&
                "bg-red-600 rounded transition-[width] ease-linear duration-1000"
              }`}
              style={{
                width: `${remainingTime.timeBarWidth}%`,
              }}
            ></div>
          </div>
        </div>

        {!isLoading && !isError && (
          <QuizBody
            quiz={quizzes[currentQuizIndex]}
            qnNo={currentQuizIndex + 1}
            userSelectedAnswers={selectedAnswers}
            onToggleClick={toggleClick}
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
    </main>
  );
}
