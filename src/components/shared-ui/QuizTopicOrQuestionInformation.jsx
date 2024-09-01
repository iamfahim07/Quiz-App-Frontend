import { Link } from "../../router/CustomRouter";
import { useParamsContext } from "../../router/custom-router-context";
import Button from "../Button";

export default function QuizTopicOrQuestionInformation({
  allStates: {
    formState: { isActive },
    setFormState,
    Form_Types,
    clearInput,
  },
  context,
}) {
  // current quiz topic
  const { topic_name } = useParamsContext();

  // toggle the form state
  const toggleFormState = () => {
    setFormState((prevState) => ({
      ...prevState,
      isActive: !prevState.isActive,
      currentForm: prevState.isActive ? "" : Form_Types.add,
    }));
    clearInput();
  };

  return (
    <div className="flex flex-col gap-6 w-full lg:w-2/5 bg-gray-200 dark:bg-gray-900 py-4 sm:py-8 px-5 sm:px-10">
      <div className="flex flex-col gap-1 sm:gap-2">
        <h1 className="text-xl sm:text-2xl md:text-3xl text-gray-800 dark:text-[#F6F7F9] font-bold font-['Roboto']">
          {context === "topic" ? "Quiz Topic" : `${topic_name} Quiz Question`}
        </h1>

        <p className="text-base text-gray-600 dark:text-[#F2F3F5] font-['Inter']">
          {context === "topic"
            ? "Here is a list of all the quiz topics. Topics can be updated, deleted, or new topics can be added. Click the Add Topic button to add a new topic, or click the update or delete icon to update or delete a topic."
            : `Here is a list of all the ${topic_name} Quiz Question. Question can be updated, deleted, or new Question can be added. Click the Add Question button to add a new Question, or click the update or delete icon to update or delete a Question.`}
        </p>

        <p className="text-base sm:text-lg md:text-lg bg-sky-400 text-white py-1 px-2 rounded font-['Inter'] custom-animate-pulse">
          {context === "topic"
            ? "Title character limit: 20"
            : "Question character limit: 100"}
        </p>
        <p className="text-base sm:text-lg md:text-lg bg-sky-400 text-white py-1 px-2 rounded font-['Inter'] custom-animate-pulse">
          {context === "topic"
            ? "Description character limit: 230"
            : "Answer character limit: 40"}
        </p>
        {context === "topic" && (
          <p className="text-base sm:text-lg md:text-lg bg-sky-400 text-white py-1 px-2 rounded font-['Inter'] custom-animate-pulse">
            Image file size limit: 3MB
          </p>
        )}
      </div>

      {/* button element jsx */}
      <div className="w-fit relative left-full -translate-x-full flex gap-3">
        {context === "question" && (
          <Link to="/admin/quiz_topic_customize">
            <Button isGhostButton={true}>Topics</Button>
          </Link>
        )}

        <Button handleButtonClick={toggleFormState}>
          {isActive
            ? "Cancel"
            : `${context === "topic" ? "Add Topic" : "Add Question"}`}
        </Button>
      </div>
    </div>
  );
}
