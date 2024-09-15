import { useQuizTopicContext } from "../../context";
import { Link } from "../../router/CustomRouter";
import Button from "../Button";

export default function GameplayInformation() {
  // current quiz topic
  const { quizTopic } = useQuizTopicContext();

  return (
    <div className="flex flex-col gap-6 w-full lg:w-2/5 bg-gray-200 dark:bg-gray-900 py-4 sm:py-8 px-5 sm:px-10">
      <div className="flex flex-col gap-1 sm:gap-2">
        <h1 className="text-xl sm:text-2xl md:text-3xl text-gray-800 dark:text-[#F6F7F9] font-bold font-['Roboto']">
          {quizTopic?.title} Quiz
        </h1>

        <p className="text-base text-gray-600 dark:text-[#F2F3F5] font-['Inter']">
          {quizTopic?.description}
        </p>

        <p className="text-base sm:text-lg md:text-lg bg-sky-400 text-white py-1 px-2 rounded font-['Inter']">
          For a sort quiz, please drag and drop the answers into the correct
          order as asked in the question.
        </p>

        <p className="text-base sm:text-lg md:text-lg bg-sky-400 text-white py-1 px-2 rounded font-['Inter'] custom-animate-pulse">
          Please note that if you leave before completing the quiz, your current
          progress will be lost.
        </p>
      </div>

      <div className="w-fit relative left-full -translate-x-full flex gap-3">
        <Link to="/" replace={true}>
          <Button>Quit</Button>
        </Link>
      </div>
    </div>
  );
}
