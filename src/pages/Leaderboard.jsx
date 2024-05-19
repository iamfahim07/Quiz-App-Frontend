import Button from "../components/Button";
import useGetDataQuery from "../hooks/useGetDataQuery";
import { useParamsContext } from "../router/custom-router-context";

export default function Leaderboard() {
  const { leaderboard_name } = useParamsContext();
  const { data: leaderboardData, errorMessage } = useGetDataQuery(
    `leaderboards/${leaderboard_name}`
  );

  const sortByTopScore = (a, b) => b - a;

  return (
    <main className="flex flex-col lg:flex-row justify-between gap-8 bg-gray-100 dark:bg-gray-700 my-4">
      <div className="flex flex-col gap-6 w-full lg:w-2/5 bg-gray-200 dark:bg-gray-900 py-4 sm:py-8 px-5 sm:px-10">
        <div className="flex flex-col gap-1 sm:gap-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl text-gray-800 dark:text-[#F6F7F9] font-bold font-['Roboto']">
            Football Quiz Leaderboard
          </h1>

          <p className="text-base sm:text-lg md:text-lg text-gray-600 dark:text-[#F2F3F5] font-['Inter']">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>

        <div className="w-fit relative left-full -translate-x-full">
          <Button>Home</Button>
        </div>
      </div>

      <div className="w-full lg:w-3/5 flex justify-center items-center py-4 sm:py-8 px-5 sm:px-10">
        <table className="w-full border-separate">
          <thead>
            <tr className="text-base sm:text-lg md:text-xl lg:text-2xl text-left font-['Roboto']">
              <th className="text-gray-800 dark:text-[#F6F7F9] w-[15%] border-b-2 border-gray-300">
                Rank
              </th>
              <th className="text-gray-800 dark:text-[#F6F7F9] w-[55%] border-b-2 border-gray-300">
                Name
              </th>
              <th className="text-gray-800 dark:text-[#F6F7F9] w-[15%] border-b-2 border-gray-300">
                Score
              </th>
              <th className="text-gray-800 dark:text-[#F6F7F9] w-[15%] border-b-2 border-gray-300">
                Time
              </th>
            </tr>
          </thead>

          <tbody>
            {errorMessage.length === 0 &&
              leaderboardData[0]?.topScorer?.length > 0 &&
              leaderboardData[0]?.topScorer
                ?.sort(sortByTopScore)
                .map((data, index) => {
                  return (
                    <tr
                      key={data._id}
                      className="text-sm sm:text-base md:text-lg lg:text-xl text-left py-1 px-2 font-['Inter']"
                    >
                      <td className="text-gray-600 dark:text-[#F2F3F5] py-1 px-2">
                        {index + 1}
                      </td>
                      <td className="text-gray-600 dark:text-[#F2F3F5] py-1 px-2">
                        {data.fullName}
                      </td>
                      <td className="text-gray-600 dark:text-[#F2F3F5] py-1 px-2">
                        {data.score}
                      </td>
                      <td className="text-gray-600 dark:text-[#F2F3F5] py-1 px-2">
                        {data.timeRequired}
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
