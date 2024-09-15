import { useEffect, useRef, useState } from "react";
import {
  useAnalysisContext,
  useAuthContext,
  useQuizTopicContext,
} from "../../context";
import useGetDataQuery from "../../hooks/api/useGetDataQuery";
import useSetDataMutation from "../../hooks/api/useSetDataMutation";
import use from "../../hooks/use";
import { Navigate } from "../../router/CustomRouter";
import Button from "../Button";
import QuizBody from "../shared-ui/user/QuizBody";
import QuizCountNotification from "../shared-ui/user/QuizCountNotification";
import { Spin_Animation } from "../SVG-Icons.jsx";

// shuffle the elements of the quizzes array in a random order
const shuffleQuizzesArray = (arr) => {
  // Create a shallow copy to maintain immutability
  const result = [...arr];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

export default function GameplayQuiz() {
  const { quizTopic } = useQuizTopicContext();

  // current user info
  const { currentUser, setCurrentUser } = useAuthContext();

  //getting all the quizzes array from the server
  const quizzesArray = use(useGetDataQuery(`quizzes/${quizTopic?.id}`));

  // quizzes state
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    //getting all the quizzes at random order
    setQuizzes(shuffleQuizzesArray(quizzesArray));
  }, [quizzesArray]);

  // logout current user if quizzesis is undefined because of invalid refresh token
  if (quizzes === undefined) {
    setCurrentUser({});
  }

  const [setData, { isLoading }] = useSetDataMutation(
    `leaderboards/${quizTopic?.id}`
  );

  // analysis context
  const {
    setUserAchievedScore,
    setUserSelectedData,
    setUserTimeTaken,
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

    if (isLoading) {
      clearTimeout(timeoutId);
    }

    return () => clearTimeout(timeoutId);
  }, [remainingTime, quizzes, isLoading]);

  // storing the user score and taken time
  const scoreAndTime = useRef({
    userAchievedScore: 0,
    userTimeTaken: 0,
  });

  // next button click event
  const onNextButtonClick = async () => {
    // resetting score and time when the quiz start
    if (currentQuizIndex === 0) {
      scoreAndTime.current.userAchievedScore = 0;
      scoreAndTime.current.userTimeTaken = 0;
    }

    setRemainingTime({ second: 0, timeBarWidth: 0, isTimeBarActive: false });

    // question id
    const qnID = quizzes[currentQuizIndex]._id;

    setUserSelectedData((prev) => [
      ...prev,
      { id: qnID, userAnswers: [...selectedAnswers] },
    ]);

    scoreAndTime.current.userTimeTaken += remainingTime.second;

    // review the answers to award marks based on their correctness
    checkAnswers(quizzes[currentQuizIndex]);

    if (currentQuizIndex < quizzes?.length - 1) {
      setCurrentQuizIndex((prev) => prev + 1);
    }

    if (currentQuizIndex === quizzes?.length - 1) {
      try {
        await analyseLeaderboardInfo();
        setUserAchievedScore(scoreAndTime.current.userAchievedScore);
        setUserTimeTaken(scoreAndTime.current.userTimeTaken);

        Navigate(`/answer_analysis/${quizTopic?.title}/${quizTopic?.id}`, {
          replace: true,
        });
      } catch (err) {
        Navigate("/error", {
          replace: true,
        });
      }
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
  const checkAnswers = (quiz) => {
    setSelectedAnswers([]);

    if (!quiz.isSortQuiz) {
      const correctAnswers = quizzes[currentQuizIndex].options.filter(
        (option) => option.isCorrect
      );

      if (correctAnswers.length !== selectedAnswers.length) return;

      const isUserCorrect = correctAnswers.every((correctAnswer) =>
        selectedAnswers.includes(correctAnswer._id)
      );

      if (isUserCorrect) {
        scoreAndTime.current.userAchievedScore += 5;
      }
    } else if (quiz.isSortQuiz && selectedAnswers.length > 0) {
      let isCorrectOrder = true;

      selectedAnswers.map((item, index) => {
        if (item.position !== index + 1) {
          isCorrectOrder = false;
        }
      });

      if (isCorrectOrder) {
        scoreAndTime.current.userAchievedScore += 5;
      }
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

    const newLeaderboardData = await setData(playerQuizResult);

    const currentPlayerPosition = newLeaderboardData?.topScorer?.findIndex(
      (updatedResult) =>
        updatedResult.userName === playerQuizResult.userName &&
        updatedResult.creationTime === playerQuizResult.creationTime
    );

    if (currentPlayerPosition >= 0) {
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
    <div
      className={`w-full lg:w-3/5 flex justify-center ${
        quizzes?.length > 0 ? "items-center" : "items-start"
      } py-4 sm:py-8 px-5 sm:px-10`}
    >
      {quizzes?.length > 0 ? (
        <div className="w-full flex flex-col gap-6 md:gap-8 bg-white dark:bg-gray-600 rounded shadow-xl px-2 md:px-5 py-2 md:py-4">
          <div className="flex flex-col gap-3 md:gap-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl text-gray-800 dark:text-[#F6F7F9] font-normal font-['Roboto']">
              Hurry, time&apos;s running out!
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

          {/* handling success state */}
          <QuizBody
            quiz={quizzes?.[currentQuizIndex]}
            qnNo={currentQuizIndex + 1}
            userSelectedAnswers={selectedAnswers}
            onToggleClick={toggleClick}
            timeLeft={remainingTime.second}
            setSelectedAnswers={setSelectedAnswers}
            isLoading={isLoading}
          />

          <div className="flex justify-between items-center">
            <QuizCountNotification
              quizzes={quizzes}
              currentQuizIndex={currentQuizIndex}
            />

            <Button
              handleButtonClick={onNextButtonClick}
              isDisabled={isLoading}
            >
              {isLoading ? (
                <span className="flex justify-center items-center">
                  <Spin_Animation /> Processing...
                </span>
              ) : currentQuizIndex === quizzes?.length - 1 ? (
                "Finish"
              ) : (
                "Next Question"
              )}
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-base sm:text-lg md:text-lg bg-sky-400 text-white py-1 px-2 rounded font-['Inter'] custom-animate-pulse">
          There are no questions available for this quiz topic at the moment,
          but rest assured, new questions will be coming soon!
        </p>
      )}
    </div>
  );
}
