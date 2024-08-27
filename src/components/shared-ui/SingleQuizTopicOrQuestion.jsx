import useSetDataMutation from "../../hooks/api/useSetDataMutation";
import { useParamsContext } from "../../router/custom-router-context";
import { Navigate } from "../../router/CustomRouter";
import { Delete_Icon, Update_Icon } from "../SVG-Icons";

export default function SingleQuizTopicOrQuestion({
  propsData,
  setPropsData,
  onUpdateClick,
  context,
}) {
  // current quiz topic
  const { topic_id } = useParamsContext();

  const [setData, { isLoading }] = useSetDataMutation(
    context === "topic" ? "topics" : `quizzes/${topic_id}`
  );

  // decide what logic should be used in context of topic or question
  const renderLogic = () => {
    if (context === "topic") {
      const handleNavigate = () => {
        Navigate(
          `/admin/quiz_question_customize/${propsData.title}/${propsData._id}`
        );
      };

      //   const [setData, { isLoading }] = useSetDataMutation("topics");

      const handleDelete = async () => {
        const updatedTopics = await setData(propsData._id, {
          method: "DELETE",
        });
        setPropsData(updatedTopics);
      };

      return {
        title: propsData.title,
        handleUpdateClick: (e) => onUpdateClick(e, propsData),
        handleDeleteClick: handleDelete,
        handleNavigate,
      };
    } else if (context === "question") {
      const handleDelete = async () => {
        const updatedTopics = await setData(propsData._id, {
          method: "DELETE",
        });
        setPropsData(updatedTopics);
      };

      return {
        title: propsData.question,
        handleUpdateClick: () => onUpdateClick(propsData),
        handleDeleteClick: handleDelete,
      };
    }
  };

  const { title, handleUpdateClick, handleDeleteClick, handleNavigate } =
    renderLogic();

  return (
    <div
      className={`${
        isLoading && "hidden"
      } flex flex-col gap-2 md:gap-3 text-base sm:text-lg md:text-2xl font-['Inter'] font-medium`}
    >
      {/* single topic */}
      <div className="w-full lg:w-11/12 flex justify-between items-center gap-2 px-3 py-2 bg-gray-200 dark:bg-gray-900 lg:hover:scale-[1.02] lg:hover:shadow-md cursor-pointer rounded transition-all">
        {/* text */}
        <div
          className="w-full flex flex-col gap-2"
          onClick={context === "topic" ? handleNavigate : null}
        >
          <p className="text-gray-800 dark:text-[#F6F7F9] transition-all">
            {title}
          </p>
          {/* <span className="text-gray-600 dark:text-[#F2F3F5] text-xs sm:text-sm md:text-base transition-all">
                How many question this topic has
              </span> */}
        </div>

        {/* icons */}
        <div className="flex gap-4">
          <div
            className="w-6 h-6 hover:scale-125 transition-all"
            onClick={(e) => handleUpdateClick(e)}
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
