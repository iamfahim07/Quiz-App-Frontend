import useSetDataMutation from "../../hooks/api/useSetDataMutation";
import { useParamsContext } from "../../router/custom-router-context";
import { Delete_Icon, Update_Icon } from "../SVG-Icons";

export default function SingleQuizQuestion({
  quiz,
  setQuizzes,
  onUpdateClick,
}) {
  // current quiz topic
  const { topic_name } = useParamsContext();

  const [setData] = useSetDataMutation(`quizzes/${topic_name}`);

  const handleDeleteClick = async () => {
    const updatedTopics = await setData(quiz._id, { method: "DELETE" });
    setQuizzes(updatedTopics);
  };

  return (
    <div className="flex flex-col gap-2 md:gap-3 text-base sm:text-lg md:text-2xl font-['Inter'] font-medium">
      {/* single topic */}
      <div className="w-full lg:w-11/12 flex justify-between items-center gap-2 px-3 py-2 bg-gray-200 dark:bg-gray-900 lg:hover:scale-[1.02] lg:hover:shadow-md cursor-pointer rounded transition-all">
        {/* text */}
        <div className="flex flex-col gap-2">
          <p className="text-gray-800 dark:text-[#F6F7F9] transition-all">
            {quiz.question}
          </p>
          {/* <span className="text-gray-600 dark:text-[#F2F3F5] text-xs sm:text-sm md:text-base transition-all">
                How many question this topic has
              </span> */}
        </div>

        {/* icons */}
        <div className="flex gap-4">
          <div
            className="w-6 h-6 hover:scale-125 transition-all"
            onClick={() => onUpdateClick(quiz)}
          >
            <Update_Icon />
          </div>

          <div
            className="w-7 h-7 hover:scale-125 transition-all"
            onClick={handleDeleteClick}
          >
            <Delete_Icon />
          </div>
        </div>
      </div>
    </div>
  );
}
