import { useState } from "react";
import useGetDataQuery from "../../hooks/api/useGetDataQuery";
import use from "../../hooks/use";
import SingleQuizTopicOrQuestion from "../shared-ui/SingleQuizTopicOrQuestion";
import QuizTopicAddAndUpdateForm from "./QuizTopicAddAndUpdateForm";

export default function QuizTopicAllList({
  allStates: {
    formState: { isActive, currentForm },
    setFormState,
    Form_Types,
    input,
    setInput,
    clearInput,
  },
}) {
  const topicsData = use(useGetDataQuery("topics"));
  const [topics, setTopics] = useState(topicsData || []);

  // quiz topic update function
  const handleUpdateClick = (e, topicInfo) => {
    e.stopPropagation();

    setFormState({
      isActive: true,
      currentForm: Form_Types.update,
    });

    setInput((prevState) => ({
      ...prevState,
      id: topicInfo._id,
      title: topicInfo.title,
      description: topicInfo.description,
    }));
  };

  return (
    <div className="w-full lg:w-3/5 flex justify-center items-start py-4 sm:py-8 px-5 sm:px-10">
      <div className="w-full">
        <h1 className="text-xl sm:text-2xl md:text-4xl text-gray-900 dark:text-[#F6F7F9] font-semibold font-['Roboto'] italic mb-5">
          {isActive ? "Add new topic" : "Quiz Topic List"}
        </h1>

        <div className="flex flex-col gap-4">
          {isActive ? (
            <QuizTopicAddAndUpdateForm
              input={input}
              setInput={setInput}
              clearInput={clearInput}
              currentForm={currentForm}
              Form_Types={Form_Types}
              setFormState={setFormState}
              setTopics={setTopics}
            />
          ) : (
            topics?.map((topic) => {
              return (
                <SingleQuizTopicOrQuestion
                  key={topic._id}
                  propsData={topic}
                  setPropsData={setTopics}
                  onUpdateClick={handleUpdateClick}
                  context="topic"
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
