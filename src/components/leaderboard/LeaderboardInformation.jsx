import { useEffect } from "react";
import { useAnalysisContext, useQuizTopicContext } from "../../context";
import useGetDataQuery from "../../hooks/api/useGetDataQuery";
import use from "../../hooks/use";
import { useParamsContext } from "../../router/custom-router-context";
import { Link } from "../../router/CustomRouter";
import Button from "../Button";

export default function LeaderboardInformation() {
  // leaderboard params names
  const { leaderboard_name, leaderboard_id } = useParamsContext();

  // getting all the topics
  const topics = use(useGetDataQuery("topics"));

  // finding the specific topic
  const topic = topics.find((topic) => topic._id === leaderboard_id);

  // function to set the topic and start a quiz on the selected subject
  const { setQuizTopic } = useQuizTopicContext();

  // analysis context
  const {
    setCloneQuizzes,
    setUserAchievedScore,
    setUserSelectedData,
    setUserTimeTaken,
    setRankingText,
  } = useAnalysisContext();

  // clear all analysis context provider state before quiz start
  const clearAllAnalysisProvider = () => {
    setCloneQuizzes([]);
    setUserAchievedScore(0);
    setUserSelectedData([]);
    setUserTimeTaken(0);
    setRankingText("");
  };

  // clear previous quiz topic
  useEffect(() => {
    setQuizTopic({});
  }, [setQuizTopic]);

  return (
    <div className="flex flex-col gap-6 w-full lg:w-2/5 bg-gray-200 dark:bg-gray-900 py-4 sm:py-8 px-5 sm:px-10">
      <div className="flex flex-col gap-1 sm:gap-2">
        <h1 className="text-xl sm:text-2xl md:text-3xl text-gray-800 dark:text-[#F6F7F9] font-bold font-['Roboto']">
          {leaderboard_name} Quiz Leaderboard
        </h1>

        <p className="text-base sm:text-lg md:text-lg text-gray-600 dark:text-[#F2F3F5] font-['Inter']">
          The Quiz App Leaderboard features a straightforward display of the top
          seven highest scorers. This leaderboard showcases the names and scores
          of the seven top performers, providing a quick and clear view of the
          leading players in the quiz app. It’s updated regularly to reflect the
          most recent top scores.
        </p>

        <p className="text-base sm:text-lg md:text-lg bg-sky-400 text-white py-1 px-2 rounded font-['Inter'] custom-animate-pulse">
          Only the top <span className="font-bold">seven</span> positions are
          displayed on the leaderboard.
        </p>
      </div>

      <div className="w-fit relative left-full -translate-x-full flex gap-3">
        <Link to="/">
          <Button isGhostButton={true}>Home</Button>
        </Link>

        <Link to="/gameplay">
          <Button
            handleButtonClick={() => {
              setQuizTopic({
                id: topic._id,
                title: topic.title,
                description: topic.description,
              });

              clearAllAnalysisProvider();
            }}
          >
            Start quiz
          </Button>
        </Link>
      </div>
    </div>
  );
}
