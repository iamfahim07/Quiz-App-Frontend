import { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import QuizBody from "../components/QuizBody";
import { OK_Sign, Cross_Sign } from "../components/SVG-Icons";
import { useAnalysisContext, useAuthContext } from "../context";
import { useParamsContext } from "../router/custom-router-context";
import useSetDataMutation from "../hooks/useSetDataMutation";
import { Link } from "../router/CustomRouter";

export default function AnswerAnalysis() {
  const {
    score,
    quizData,
    userSelectedData,
    leaderboardInfo: {
      leaderboard_data: { topScorer = [] },
    },
    setLeaderboardInfo,
  } = useAnalysisContext();
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [rankingText, setRankingText] = useState("");

  // current user info
  const { currentUser } = useAuthContext();

  // current quiz topic
  const { topic_analysis } = useParamsContext();

  const [setData, { data: top7Scorer }] = useSetDataMutation(
    `leaderboards/${topic_analysis}`
  );

  // Refs to keep track of previous values
  const dependenciesRef = useRef({ currentUser, score, topScorer, setData });

  useEffect(() => {
    // Checking if the current user's score for this round of the quiz is in the top seven
    function analyseLeaderboardInfo() {
      let top7Scorer = [];

      let timestamps = Date.now();

      if (dependenciesRef.current.currentUser?.userName) {
        // creating user object with user info and score.
        const userInfo = {
          fullName: dependenciesRef.current.currentUser?.fullName,
          userName: dependenciesRef.current.currentUser?.userName,
          obtainedScore: dependenciesRef.current.score,
          timeRequired: 50,
          createdAt: timestamps,
        };

        const updatedUserData = [...dependenciesRef.current.topScorer, userInfo]
          .sort((a, b) => {
            if (a.obtainedScore !== b.obtainedScore) {
              return b.obtainedScore - a.obtainedScore;
            } else if (a.timeRequired !== b.timeRequired) {
              return a.timeRequired - b.timeRequired;
            }
            return a.createdAt - b.createdAt;
          })
          .slice(0, 7);

        const newUserInTop7 = updatedUserData.some(
          (updatedUser) =>
            updatedUser.userName === userInfo.userName &&
            updatedUser.createdAt === timestamps
        );

        newUserInTop7 ? (top7Scorer = updatedUserData) : (top7Scorer = []);
        // top7Scorer = updatedUserData;

        if (newUserInTop7) {
          const position = updatedUserData.findIndex(
            (user) => user.createdAt === timestamps
          );

          setRankingText(
            `Your current ranking for this round of the quiz game on the leaderboard is ${
              position + 1
            }th.`
          );
        } else {
          setRankingText(
            "Your current ranking for this round of the quiz game on the leaderboard is beyond 7th place."
          );
        }
      }

      return top7Scorer;
    }

    const calltheApi = setTimeout(
      () => dependenciesRef.current.setData(analyseLeaderboardInfo()),
      0
    );

    return () => clearTimeout(calltheApi);
  }, []);

  console.log(top7Scorer);

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

  const onLeaderboardButtonClick = () => {
    if (top7Scorer.length) {
      setLeaderboardInfo(top7Scorer[0]);
    }
  };

  return (
    <main className="flex flex-col lg:flex-row justify-between gap-8 bg-gray-100 dark:bg-gray-700 my-4">
      <div className="flex flex-col gap-6 w-full lg:w-2/5 bg-gray-200 dark:bg-gray-900 py-4 sm:py-8 px-5 sm:px-10">
        <div className="flex flex-col gap-1 sm:gap-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl text-gray-800 dark:text-[#F6F7F9] font-bold font-['Roboto']">
            Congratulations
          </h1>

          <p className="text-base sm:text-lg md:text-lg text-gray-600 dark:text-[#F2F3F5] font-['Inter']">
            You have completed the quiz successfully
          </p>
          <p className="text-base sm:text-lg md:text-lg bg-sky-400 text-white py-1 px-2 rounded font-['Inter']">
            Your score stands at{" "}
            <span className="text-[#F2F3F5] font-bold">{score}</span> out of 25
            points.
          </p>
          <p className="text-base sm:text-lg md:text-lg text-gray-600 dark:text-[#F2F3F5] font-['Inter']">
            {rankingText}
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm text-gray-600 dark:text-[#F2F3F5] font-['Inter']">
          <div className="flex gap-2">
            <div className="w-4 lg:w-5 h-4 lg:h-5 bg-green-400 rounded-full shrink-0"></div>
            <p className="text-gray-600 dark:text-[#F2F3F5]">
              The correct answer is highlighted with a green background.
            </p>
          </div>
          <div className="flex gap-2">
            <div className="w-4 lg:w-5 h-4 lg:h-5 bg-red-400 rounded-full shrink-0"></div>
            <p className="text-gray-600 dark:text-[#F2F3F5]">
              The user&apos;s incorrect selection is marked with a red
              background.
            </p>
          </div>
          <div className="flex gap-2">
            <OK_Sign />
            <p className="text-gray-600 dark:text-[#F2F3F5]">
              The OK sign indicates the answer chosen by the user
            </p>
          </div>

          <div className="flex gap-2">
            <Cross_Sign />
            <p className="text-gray-600 dark:text-[#F2F3F5]">
              The Cross sign indicates the correct answer, but the user did not
              select it.
            </p>
          </div>
        </div>

        <div className="w-fit relative left-full -translate-x-full flex gap-3">
          <Link to="/">
            <Button isGhostButton={true}>Home</Button>
          </Link>
          <Link to={`/leaderboard/${topic_analysis}`}>
            <Button handleButtonClick={onLeaderboardButtonClick}>
              Leaderboard
            </Button>
          </Link>
        </div>
      </div>

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
            <p className="text-base sm:text-lg md:text-2xl text-gray-600 dark:text-[#F2F3F5] font-['Inter']">
              <span className="font-semibold text-gray-600 dark:text-[#F2F3F5]">
                {currentQuizIndex + 1}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-600 dark:text-[#F2F3F5]">
                {quizData.length}
              </span>{" "}
              Questions
            </p>

            <div className="flex gap-3">
              {/* <div className="w-fit relative left-full -translate-x-full mt-4 flex gap-3"> */}
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
    </main>
  );
}
