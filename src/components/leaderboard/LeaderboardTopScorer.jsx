// import useGetDataQuery from "../../hooks/api/useGetDataQuery";
import useGetDataQuery1 from "../../hooks/api/useGetDataQuery1";
import use from "../../hooks/use";
import { useParamsContext } from "../../router/custom-router-context";

export default function LeaderboardTopScorer() {
  const { leaderboard_id } = useParamsContext();
  // const { data: leaderboardData, errorMessage } = useGetDataQuery(
  //   `leaderboards/${leaderboard_name}`
  // );

  const leaderboardData = use(
    useGetDataQuery1(`leaderboards/${leaderboard_id}`)
  );

  // sorting top performer
  const sortByTopScore = (a, b) => {
    if (a.obtainedScore !== b.obtainedScore) {
      return b.obtainedScore - a.obtainedScore;
    } else if (a.timeSpent !== b.timeSpent) {
      return a.timeSpent - b.timeSpent;
    } else {
      return a.creationTime - b.creationTime;
    }
  };

  return (
    <div className="w-full lg:w-3/5 py-4 sm:py-8 px-5 sm:px-10">
      <table className="w-full border-separate">
        <thead>
          <tr className="text-base sm:text-lg md:text-xl lg:text-2xl text-left font-['Roboto']">
            <th className="text-gray-800 dark:text-[#F6F7F9] w-[15%] py-1 border-b-2 border-gray-300">
              Rank
            </th>
            <th className="text-gray-800 dark:text-[#F6F7F9] w-[55%] py-1 border-b-2 border-gray-300">
              Name
            </th>
            <th className="text-gray-800 dark:text-[#F6F7F9] w-[15%] py-1 border-b-2 border-gray-300">
              Score
            </th>
            <th className="text-gray-800 dark:text-[#F6F7F9] w-[15%] py-1 border-b-2 border-gray-300">
              Time
            </th>
          </tr>
        </thead>

        <tbody>
          {leaderboardData?.topScorer?.length > 0 &&
            leaderboardData?.topScorer
              ?.sort(sortByTopScore)
              .map((data, index) => {
                return (
                  <tr
                    key={data._id}
                    className="text-sm sm:text-base md:text-lg lg:text-xl text-left even:bg-[#E5E7EB] dark:even:bg-[#111827] py-1 px-2 font-['Inter']"
                  >
                    <td className="text-gray-600 dark:text-[#F2F3F5] py-2 px-2">
                      {index + 1}
                    </td>
                    <td className="text-gray-600 dark:text-[#F2F3F5] py-2 px-2">
                      {data.fullName}
                    </td>
                    <td className="text-gray-600 dark:text-[#F2F3F5] py-2 px-2">
                      {data.obtainedScore}
                    </td>
                    <td className="text-gray-600 dark:text-[#F2F3F5] py-2 px-2">
                      {data.timeSpent}s
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
}
