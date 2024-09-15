import { useParamsContext } from "../../router/custom-router-context";
import { Link } from "../../router/CustomRouter";
import Button from "../Button";
import { Cross_Sign, OK_Sign } from "../SVG-Icons";

export default function AnalysisInformation({
  allProps: {
    userAchievedScore,
    totalAchievableScore,
    userTimeTaken,
    rankingText,
    isSortQuiz,
  },
}) {
  const { topic_analysis, topic_analysis_id } = useParamsContext();

  return (
    <div className="flex flex-col gap-6 w-full lg:w-2/5 bg-gray-200 dark:bg-gray-900 py-4 sm:py-8 px-5 sm:px-10">
      <div className="flex flex-col gap-1 sm:gap-2">
        <h1 className="text-xl sm:text-2xl md:text-3xl text-gray-800 dark:text-[#F6F7F9] font-bold font-['Roboto']">
          Congratulations
        </h1>

        <p className="text-base sm:text-lg md:text-lg bg-sky-400 text-white py-1 px-2 rounded font-['Inter'] custom-animate-pulse">
          You have successfully completed the quiz in {userTimeTaken} seconds.
        </p>
        <p className="text-base sm:text-lg md:text-lg bg-sky-400 text-white py-1 px-2 rounded font-['Inter'] custom-animate-pulse">
          Your score stands at{" "}
          <span className="text-[#F2F3F5] font-bold">{userAchievedScore}</span>{" "}
          out of{" "}
          {totalAchievableScore * import.meta.env.VITE_POINT_PER_QUESTION}{" "}
          points.
        </p>
        <p className="text-base sm:text-lg md:text-lg bg-sky-400 text-white py-1 px-2 rounded font-['Inter'] custom-animate-pulse">
          Your current ranking for this round of the {topic_analysis} quiz game
          is {rankingText}.
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
            The user&apos;s incorrect selection is marked with a red background.
          </p>
        </div>
        {!isSortQuiz && (
          <div className="flex gap-2">
            <OK_Sign />
            <p className="text-gray-600 dark:text-[#F2F3F5]">
              The OK sign indicates the answer chosen by the user
            </p>
          </div>
        )}

        {!isSortQuiz && (
          <div className="flex gap-2">
            <Cross_Sign />
            <p className="text-gray-600 dark:text-[#F2F3F5]">
              The Cross sign indicates the correct answer, but the user did not
              select it.
            </p>
          </div>
        )}

        {isSortQuiz && (
          <div>
            <p className="bg-sky-400 text-white py-1 px-2 rounded font-['Inter'] custom-animate-pulse">
              The correct sorting position number is displayed on the right side
              of the answer.
            </p>
          </div>
        )}
      </div>

      <div className="w-fit relative left-full -translate-x-full flex gap-3">
        <Link to="/">
          <Button isGhostButton={true}>Home</Button>
        </Link>
        <Link to={`/leaderboard/${topic_analysis}/${topic_analysis_id}`}>
          <Button>Leaderboard</Button>
        </Link>
      </div>
    </div>
  );
}
