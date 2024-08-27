import useSetDataMutation from "../../hooks/api/useSetDataMutation";
import { Navigate } from "../../router/CustomRouter";
import { Delete_Icon, Update_Icon } from "../SVG-Icons";

export default function SingleQuizTopic({ topic, setTopics, onUpdateClick }) {
  const handleNavigate = () => {
    Navigate(`/admin/quiz_question_customize/${topic.title}`);
  };

  const [setData, { isLoading }] = useSetDataMutation("topics");

  const handleDeleteClick = async () => {
    const updatedTopics = await setData(topic._id, { method: "DELETE" });
    setTopics(updatedTopics);
  };

  return (
    <div
      className={`${
        isLoading && "hidden"
      } w-full md:gap-3 text-base sm:text-lg md:text-2xl font-['Inter'] font-medium`}
    >
      {/* single topic */}
      <div className="w-full lg:w-11/12 flex justify-between items-center bg-gray-200 dark:bg-gray-900 lg:hover:scale-[1.02] lg:hover:shadow-md cursor-pointer rounded transition-all">
        {/* text */}

        <div className="w-full px-3 py-2" onClick={handleNavigate}>
          <p className="text-gray-800 dark:text-[#F6F7F9] transition-all">
            {topic.title}
          </p>
          {/* <span className="text-gray-600 dark:text-[#F2F3F5] text-xs sm:text-sm md:text-base transition-all">
            How many question this topic has
          </span> */}
        </div>

        {/* icons */}
        <div className="w-[18%] flex justify-between items-center  px-3 py-2">
          <div
            className="w-6 h-6 hover:scale-125 transition-all"
            onClick={(e) => onUpdateClick(e, topic)}
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
