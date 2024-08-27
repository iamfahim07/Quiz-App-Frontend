import { useAnalysisContext, useQuizTopicContext } from "../../context";
import Button from "../Button";
// import useGetDataQuery from "../../hooks/api/useGetDataQuery";
import { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../../context";
import useGetDataQuery1 from "../../hooks/api/useGetDataQuery1";
import useSetDataMutation from "../../hooks/api/useSetDataMutation";
import use from "../../hooks/use";
import { Navigate } from "../../router/CustomRouter";
import QuizBody from "../shared-ui/user/QuizBody";
import QuizCountNotification from "../shared-ui/user/QuizCountNotification";

export default function GameplayQuiz() {
  const { quizTopic } = useQuizTopicContext();

  // current user info
  const { currentUser } = useAuthContext();

  //getting all the quizzes
  //   const {
  //     isLoading: quiz_loading,
  //     isError: quiz_error,
  //     data: quizzes,
  //     errorMessage: quiz_error_msg,
  //   } = useGetDataQuery(`quizzes/${quizTopic.toLowerCase()}`);

  const quizzes = use(useGetDataQuery1(`quizzes/${quizTopic?.id}`));
  // trying new leaderboard logic
  // const leaderboard = use(useGetDataQuery1(`leaderboards/${quizTopic?.id}`));

  const [setData] = useSetDataMutation(`leaderboards/${quizTopic?.id}`);

  // getting the leaderboard info
  // const {
  //   isLoading: leaderboard_loading,
  //   data: leaderboard_data,
  //   errorMessage: leaderboard_errorMessage,
  // } = useGetDataQuery(`leaderboards/${quizTopic}`);

  // analysis context
  const {
    setUserAchievedScore,
    // setUserTimeTaken,
    setQuizData,
    setUserSelectedData,
    // setLeaderboardInfo,
    setRankingText,
  } = useAnalysisContext();
  // time bar state
  const [remainingTime, setRemainingTime] = useState({
    second: 0,
    timeBarWidth: 0,
    isTimeBarActive: false,
  });
  // tracking the current quiz
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  // users chossen answers state
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  // setting quiz and leaderboard info into the analysis context
  useEffect(() => {
    setQuizData(quizzes);
    // setLeaderboardInfo({
    //   leaderboard_loading,
    //   leaderboard_data,
    //   leaderboard_errorMessage,
    // });
  }, [
    quizzes,
    setQuizData,
    // leaderboard_loading,
    // leaderboard_data,
    // leaderboard_errorMessage,
    // setLeaderboardInfo,
  ]);

  // time bar useEffect
  useEffect(() => {
    let timeoutId;

    const tick = () => {
      if (remainingTime.second === 0) {
        setRemainingTime((prev) => ({ ...prev, isTimeBarActive: true }));
      }

      if (remainingTime.second < 30) {
        setRemainingTime((prev) => ({ ...prev, second: prev.second + 1 }));
      } else {
        clearTimeout(timeoutId);
      }

      if (remainingTime.second < 29) {
        setRemainingTime((prev) => ({
          ...prev,
          timeBarWidth: prev.timeBarWidth + 3.448,
        }));
      } else {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(tick, 1000);
    };

    if (quizzes?.length) {
      timeoutId = setTimeout(tick, 1000);
    }

    return () => clearTimeout(timeoutId);
  }, [remainingTime, quizzes]);

  // storing the user score and taken time
  const scoreAndTime = useRef({
    userAchievedScore: 0,
    userTimeTaken: 0,
  });

  // next button click event
  const onNextButtonClick = async () => {
    if (currentQuizIndex === 0) {
      // setUserAchievedScore(0);
      // setUserTimeTaken(0);
      scoreAndTime.current.userAchievedScore = 0;
      scoreAndTime.current.userTimeTaken = 0;
    }

    setRemainingTime({ second: 0, timeBarWidth: 0, isTimeBarActive: false });

    const qnID = quizzes[currentQuizIndex]._id;

    setUserSelectedData((prev) => [
      ...prev,
      { id: qnID, userAnswers: [...selectedAnswers] },
    ]);

    // setUserTimeTaken((prev) => prev + remainingTime.second);
    scoreAndTime.current.userTimeTaken += remainingTime.second;

    checkAnswers();

    if (currentQuizIndex < quizzes.length - 1) {
      setCurrentQuizIndex((prev) => prev + 1);
    }

    if (currentQuizIndex === quizzes?.length - 1) {
      await analyseLeaderboardInfo();
      setUserAchievedScore(scoreAndTime.current.userAchievedScore);

      Navigate(`/answer_analysis/${quizTopic?.title}/${quizTopic?.id}`, {
        replace: true,
      });
    }
  };

  // changing the UI according to user action
  const toggleClick = (id) => {
    if (remainingTime.second >= 30) return;

    if (selectedAnswers.includes(id)) {
      const newSelectedAnswers = selectedAnswers.filter(
        (selectedAnswer) => selectedAnswer !== id
      );
      return setSelectedAnswers(newSelectedAnswers);
    }
    setSelectedAnswers((prev) => [...prev, id]);
  };

  // checking if the user answer is correct or not
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
      scoreAndTime.current.userAchievedScore += 5;
      // setUserAchievedScore((prev) => prev + 5);
    }
  };

  // Checking if the current user's score for this round of the quiz is in the top seven
  async function analyseLeaderboardInfo() {
    let timestamps = Date.now();

    // creating result object with user info and score.
    const playerQuizResult = {
      fullName: currentUser?.fullName,
      userName: currentUser?.userName,
      obtainedScore: scoreAndTime.current.userAchievedScore,
      timeSpent: scoreAndTime.current.userTimeTaken,
      creationTime: timestamps,
    };

    // const newTopSevenScorer = await dependenciesRef.current.setData(playerQuizResult);
    const newLeaderboardData = await setData(playerQuizResult);

    const currentPlayerPosition = newLeaderboardData.topScorer.findIndex(
      (updatedResult) =>
        updatedResult.userName === playerQuizResult.userName &&
        updatedResult.creationTime === playerQuizResult.creationTime
    );

    if (currentPlayerPosition >= 0) {
      // const position = newLeaderboardData.topScorer.findIndex(
      //   (user) => user.creationTime === timestamps
      // );
      const generateSuffix =
        currentPlayerPosition + 1 === 1
          ? "st"
          : currentPlayerPosition + 1 === 2
          ? "nd"
          : currentPlayerPosition + 1 === 3
          ? "rd"
          : "th";

      setRankingText(`${currentPlayerPosition + 1}${generateSuffix}`);
    } else {
      setRankingText("beyond 7th place");
    }
  }

  return (
    <>
      {quizzes?.length > 0 && (
        <div className="w-full lg:w-3/5 flex justify-center items-center py-4 sm:py-8 px-5 sm:px-10">
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

            {/* handeling the loging state */}
            {/* {quiz_loading && !quiz_error && <h1>Loading...</h1>} */}

            {/* handling the error state */}
            {/* {!quiz_loading && quiz_error && quiz_error_msg && (
          <h1>{quiz_error_msg}</h1>
        )} */}

            {/* handling success state */}

            <QuizBody
              quiz={quizzes[currentQuizIndex]}
              qnNo={currentQuizIndex + 1}
              userSelectedAnswers={selectedAnswers}
              onToggleClick={toggleClick}
              timeLeft={remainingTime.second}
            />

            <div className="flex justify-between items-center">
              {/* <p className="text-base sm:text-lg md:text-2xl text-gray-600 dark:text-[#F2F3F5] font-['Inter']">
        <span className="font-semibold text-gray-600 dark:text-[#F2F3F5]">
          {currentQuizIndex + 1}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-gray-600 dark:text-[#F2F3F5]">
          {quizzes.length}
        </span>{" "}
        Questions
      </p> */}

              <QuizCountNotification
                quizzes={quizzes}
                currentQuizIndex={currentQuizIndex}
              />

              {/* <Link
                to={
                  currentQuizIndex === quizzes?.length - 1
                    ? `/answer_analysis/${quizTopic?.title}`
                    : ""
                }
              > */}
              <Button handleButtonClick={onNextButtonClick}>
                {currentQuizIndex === quizzes?.length - 1
                  ? "Finish"
                  : "Next Question"}
              </Button>
              {/* </Link> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
