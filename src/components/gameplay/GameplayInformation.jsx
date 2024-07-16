import { Link } from "../../router/CustomRouter";
import Button from "../Button";

export default function GameplayInformation() {
  return (
    <div className="flex flex-col gap-6 w-full lg:w-2/5 bg-gray-200 dark:bg-gray-900 py-4 sm:py-8 px-5 sm:px-10">
      <div className="flex flex-col gap-1 sm:gap-2">
        <h1 className="text-xl sm:text-2xl md:text-3xl text-gray-800 dark:text-[#F6F7F9] font-bold font-['Roboto']">
          Congratulations
        </h1>

        <p className="text-base text-gray-600 dark:text-[#F2F3F5] font-['Inter']">
          You have completed the quiz successfully
        </p>
        <p className="text-base sm:text-lg md:text-lg bg-sky-400 text-white py-1 px-2 rounded font-['Inter']">
          Your score stands at{" "}
          <span className="text-[#F2F3F5] font-bold">0</span> out of 25 points.
        </p>
        <p className="text-base sm:text-lg md:text-lg bg-sky-400 text-white py-1 px-2 rounded font-['Inter']">
          Your current ranking for this round of the quiz game is .
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
        <div className="flex gap-2">
          <p className="text-gray-600 dark:text-[#F2F3F5]">
            The OK sign indicates the answer chosen by the user
          </p>
        </div>

        <div className="flex gap-2">
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

        <Button>Leaderboard</Button>
      </div>
    </div>
  );
}
