import { Link } from "../../router/CustomRouter";
import { useParamsContext } from "../../router/custom-router-context";
import Button from "../Button";

export default function QuizQuestionInformation({
  allStates: {
    formState: { isActive },
    setFormState,
    Form_Types,
    clearInput,
  },
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
          {topic_name} Quiz Question
        </h1>

        <p className="text-base text-gray-600 dark:text-[#F2F3F5] font-['Inter']">
          Here is a list of all the {topic_name} Quiz Question. Question can be
          updated, deleted, or new Question can be added. Click the Add Question
          button to add a new Question, or click the update or delete icon to
          update or delete a Question.
        </p>
      </div>

      {/* button element jsx */}
      <div className="w-fit relative left-full -translate-x-full flex gap-3">
        <Link to="/admin/quiz_topic_customize">
          <Button isGhostButton={true}>Topics</Button>
        </Link>
        <Link to="">
          <Button handleButtonClick={toggleFormState}>
            {isActive ? "Cancel" : "Add Question"}
          </Button>
        </Link>
      </div>
    </div>
  );
}
