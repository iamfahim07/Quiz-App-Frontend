import { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import QuizBody from "../components/shared-ui/QuizBody";
// import { OK_Sign, Cross_Sign } from "../components/SVG-Icons";
import { useAnalysisContext, useAuthContext } from "../context";
import { useParamsContext } from "../router/custom-router-context";
import useSetDataMutation from "../hooks/api/useSetDataMutation";
// import { Link } from "../router/CustomRouter";
import QuizCountNotification from "../components/shared-ui/QuizCountNotification";
import AnalysisInformation from "../components/answer-analysis/AnalysisInformation";

export default function AnswerAnalysis() {
  const {
    userAchievedScore,
    userTimeTaken,
    quizData,
    userSelectedData,
    // leaderboardInfo: {
    //   leaderboard_data: { topScorer = [] },
    // },
    // setLeaderboardInfo,
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
  const dependenciesRef = useRef({
    currentUser,
    userAchievedScore,
    userTimeTaken,
    // topScorer,
    setData,
  });

  useEffect(() => {
    // Checking if the current user's score for this round of the quiz is in the top seven
    // function analyseLeaderboardInfo() {
    //   let top7Scorer = [];

    //   let timestamps = Date.now();

    //   if (dependenciesRef.current.currentUser?.userName) {

    //     const userInfo = {
    //       fullName: dependenciesRef.current.currentUser?.fullName,
    //       userName: dependenciesRef.current.currentUser?.userName,
    //       obtainedScore: dependenciesRef.current.userAchievedScore,
    //       timeRequired: dependenciesRef.current.userTimeTaken,
    //       createdAt: timestamps,
    //     };

    //     const updatedUserData = [...dependenciesRef.current.topScorer, userInfo]
    //       .sort((a, b) => {
    //         if (a.obtainedScore !== b.obtainedScore) {
    //           return b.obtainedScore - a.obtainedScore;
    //         } else if (a.timeRequired !== b.timeRequired) {
    //           return a.timeRequired - b.timeRequired;
    //         }
    //         return a.createdAt - b.createdAt;
    //       })
    //       .slice(0, 7);

    //     const newUserInTop7 = updatedUserData.some(
    //       (updatedUser) =>
    //         updatedUser.userName === userInfo.userName &&
    //         updatedUser.createdAt === timestamps
    //     );

    //     newUserInTop7 ? (top7Scorer = updatedUserData) : (top7Scorer = []);

    //     if (newUserInTop7) {
    //       const position = updatedUserData.findIndex(
    //         (user) => user.createdAt === timestamps
    //       );
    //       const generateSuffix =
    //         position + 1 === 1
    //           ? "st"
    //           : position + 1 === 2
    //           ? "nd"
    //           : position + 1 === 3
    //           ? "rd"
    //           : "th";

    //       setRankingText(`${position + 1}${generateSuffix}`);
    //     } else {
    //       setRankingText("beyond 7th place");
    //     }
    //   }

    //   return top7Scorer;
    // }

    // let timestamps = Date.now();

    // const playerQuizResult = {
    //       fullName: dependenciesRef.current.currentUser?.fullName,
    //       userName: dependenciesRef.current.currentUser?.userName,
    //       obtainedScore: dependenciesRef.current.userAchievedScore,
    //       timeRequired: dependenciesRef.current.userTimeTaken,
    //       createdAt: timestamps,
    //     };

    async function analyseLeaderboardInfo1() {
      let timestamps = Date.now();

      // creating result object with user info and score.
      const playerQuizResult = {
        fullName: dependenciesRef.current.currentUser?.fullName,
        userName: dependenciesRef.current.currentUser?.userName,
        obtainedScore: dependenciesRef.current.userAchievedScore,
        timeRequired: dependenciesRef.current.userTimeTaken,
        createdAt: timestamps,
      };

      // const newTopSevenScorer = await dependenciesRef.current.setData(playerQuizResult);
      const newLeaderboardData = await dependenciesRef.current.setData(
        playerQuizResult
      );

      const currentPlayerInTop7 = newLeaderboardData.topScorer.some(
        (updatedResult) =>
          updatedResult.userName === playerQuizResult.userName &&
          updatedResult.createdAt === playerQuizResult.createdAt
      );

      if (currentPlayerInTop7) {
        const position = newLeaderboardData.topScorer.findIndex(
          (user) => user.createdAt === timestamps
        );
        const generateSuffix =
          position + 1 === 1
            ? "st"
            : position + 1 === 2
            ? "nd"
            : position + 1 === 3
            ? "rd"
            : "th";

        setRankingText(`${position + 1}${generateSuffix}`);
      } else {
        setRankingText("beyond 7th place");
      }
    }

    // @TODO will implement abort
    // handeling the development mode re-render
    const calltheApi = setTimeout(analyseLeaderboardInfo1, 0);

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

  // const onLeaderboardButtonClick = () => {
  //   if (top7Scorer.length) {
  //     setLeaderboardInfo(top7Scorer[0]);
  //   }
  // };

  return (
    <main className="flex flex-col lg:flex-row justify-between gap-8 bg-gray-100 dark:bg-gray-700 my-4">
      {/* <div className="flex flex-col gap-6 w-full lg:w-2/5 bg-gray-200 dark:bg-gray-900 py-4 sm:py-8 px-5 sm:px-10">
        <div className="flex flex-col gap-1 sm:gap-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl text-gray-800 dark:text-[#F6F7F9] font-bold font-['Roboto']">
            Congratulations
          </h1>

          <p className="text-base text-gray-600 dark:text-[#F2F3F5] font-['Inter']">
            You have completed the quiz successfully
          </p>
          <p className="text-base sm:text-lg md:text-lg bg-sky-400 text-white py-1 px-2 rounded font-['Inter']">
            Your score stands at{" "}
            <span className="text-[#F2F3F5] font-bold">
              {userAchievedScore}
            </span>{" "}
            out of 25 points.
          </p>
          <p className="text-base sm:text-lg md:text-lg bg-sky-400 text-white py-1 px-2 rounded font-['Inter']">
            Your current ranking for this round of the {topic_analysis} quiz
            game is {rankingText}.
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
      </div> */}

      <AnalysisInformation
        allProps={{
          userAchievedScore,
          totalAchievableScore: quizData?.length,
          topic_analysis,
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
            {/* <p className="text-base sm:text-lg md:text-2xl text-gray-600 dark:text-[#F2F3F5] font-['Inter']">
              <span className="font-semibold text-gray-600 dark:text-[#F2F3F5]">
                {currentQuizIndex + 1}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-600 dark:text-[#F2F3F5]">
                {quizData.length}
              </span>{" "}
              Questions
            </p> */}
            <QuizCountNotification
              currentQuizIndex={currentQuizIndex}
              quizzes={quizData}
            />

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
