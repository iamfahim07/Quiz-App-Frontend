import { useState } from "react";
import useGetDataQuery from "../../hooks/api/useGetDataQuery";
import use from "../../hooks/use";
import { useParamsContext } from "../../router/custom-router-context";
import SingleQuizTopicOrQuestion from "../shared-ui/SingleQuizTopicOrQuestion";
import QuizQuestionAddAndUpdateForm from "./QuizQuestionAddAndUpdateForm";

export default function QuizQuestionAllList({
  allStates: {
    formState: { isActive, currentForm },
    setFormState,
    Form_Types,
    input,
    setInput,
    clearInput,
  },
}) {
  // current quiz topic
  const { topic_name, topic_id } = useParamsContext();

  // all the quiz question
  const quizzesData = use(useGetDataQuery(`quizzes/${topic_id}`));
  const [quizzes, setQuizzes] = useState(quizzesData || []);

  // quiz question update function
  const handleUpdateClick = (quizInfo) => {
    setFormState({
      isActive: true,
      currentForm: Form_Types.update,
    });

    setInput((prevState) => ({
      ...prevState,
      id: quizInfo._id,

      question: quizInfo.question,

      firstOptionText: quizInfo.options[0].value,
      firstOptionCheckbox: quizInfo.options[0].isCorrect,

      secondOptionText: quizInfo.options[1].value,
      secondOptionCheckbox: quizInfo.options[1].isCorrect,

      thirdOptionText: quizInfo.options[2].value,
      thirdOptionCheckbox: quizInfo.options[2].isCorrect,

      fourthOptionText: quizInfo.options[3].value,
      fourthOptionCheckbox: quizInfo.options[3].isCorrect,
    }));
  };

  return (
    <div className="w-full lg:w-3/5 flex justify-center items-start py-4 sm:py-8 px-5 sm:px-10">
      <div className="w-full">
        <h1 className="text-xl sm:text-2xl md:text-4xl text-gray-900 dark:text-[#F6F7F9] font-semibold font-['Roboto'] italic mb-5">
          {isActive
            ? `Add new question to ${topic_name} quiz`
            : `${topic_name} Quiz Question List`}
        </h1>

        <div className="flex flex-col gap-4">
          {isActive ? (
            <QuizQuestionAddAndUpdateForm
              input={input}
              setInput={setInput}
              clearInput={clearInput}
              currentForm={currentForm}
              Form_Types={Form_Types}
              setFormState={setFormState}
              setQuizzes={setQuizzes}
            />
          ) : (
            quizzes?.map((quiz) => {
              return (
                <SingleQuizTopicOrQuestion
                  key={quiz._id}
                  propsData={quiz}
                  setPropsData={setQuizzes}
                  onUpdateClick={handleUpdateClick}
                  context="question"
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
