import Button from "../components/Button";
import { Link } from "../router/CustomRouter";

export default function Guidelines() {
  return (
    <main className="mt-7 md:mt-10">
      <div className="text-3xl sm:text-4xl md:text-5xl text-gray-800 dark:text-[#F6F7F9] font-bold font-['Roboto'] mb-5">
        <h1>Gameplay Guidelines</h1>
      </div>

      <div className="text-base sm:text-lg md:text-2xl text-gray-600 dark:text-[#F2F3F5] font-['Inter'] mb-2 md:mb-8 flex flex-col gap-3 md:gap-5">
        <ul className="list-disc flex flex-col gap-2">
          <li>
            If you leave before completing the quiz, your current progress will
            be lost.
          </li>

          <li>You will have only 30 seconds to answer each question.</li>

          <li>Once you submit an answer, it cannot be changed.</li>

          <li>You cannot select options once time has expired.</li>

          <li>You must remain in the quiz until it is completed.</li>

          <li>You will earn 5 points for each correct answer.</li>

          <li>
            Some questions may have multiple correct answers. To earn full marks
            for multiple-choice questions, you must select all correct answers.
          </li>

          <li>
            You need to be in the top 7 to see your name on the leaderboard.
          </li>

          <li>
            If multiple players have the same score, the leaderboard ranking
            will be determined by the time taken to achieve that score.
          </li>
        </ul>
      </div>

      <div className="w-fit relative left-full -translate-x-full mb-4">
        <Link to="/quiz_options">
          <Button>Continue</Button>
        </Link>
      </div>
    </main>
  );
}
