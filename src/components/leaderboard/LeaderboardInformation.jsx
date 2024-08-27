import { useParamsContext } from "../../router/custom-router-context";
import { Link } from "../../router/CustomRouter";
import Button from "../Button";

export default function LeaderboardInformation() {
  const { leaderboard_name } = useParamsContext();

  return (
    <div className="flex flex-col gap-6 w-full lg:w-2/5 bg-gray-200 dark:bg-gray-900 py-4 sm:py-8 px-5 sm:px-10">
      <div className="flex flex-col gap-1 sm:gap-2">
        <h1 className="text-xl sm:text-2xl md:text-3xl text-gray-800 dark:text-[#F6F7F9] font-bold font-['Roboto']">
          {leaderboard_name} Quiz Leaderboard
        </h1>

        <p className="text-base sm:text-lg md:text-lg text-gray-600 dark:text-[#F2F3F5] font-['Inter']">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>

        <p className="text-base sm:text-lg md:text-lg bg-sky-400 text-white py-1 px-2 rounded font-['Inter'] custom-animate-pulse">
          Only the top <span className="font-bold">seven</span> positions are
          displayed on the leaderboard.
        </p>
      </div>

      <div className="w-fit relative left-full -translate-x-full">
        <Link to={"/"}>
          <Button>Home</Button>
        </Link>
      </div>
    </div>
  );
}
