import { Link } from "../../router/CustomRouter";
import Button from "../Button";

export default function QuizTopicInformation({
  allStates: {
    formState: { isActive },
    setFormState,
    Form_Types,
    clearInput,
  },
}) {
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
          Quiz Topic
        </h1>

        <p className="text-base text-gray-600 dark:text-[#F2F3F5] font-['Inter']">
          Here is a list of all the quiz topics. Topics can be updated, deleted,
          or new topics can be added. Click the Add Topic button to add a new
          topic, or click the update or delete icon to update or delete a topic.
        </p>
      </div>

      {/* button element jsx */}
      <div className="w-fit relative left-full -translate-x-full flex gap-3">
        <Link to="">
          <Button isGhostButton={true}>Question</Button>
        </Link>
        <Link to="">
          <Button handleButtonClick={toggleFormState}>
            {isActive ? "Cancel" : "Add Topic"}
          </Button>
        </Link>
      </div>
    </div>
  );
}
