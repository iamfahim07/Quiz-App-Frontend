import { Suspense, useState } from "react";
import QuizQuestionAllList from "../components/admin-quiz-question-customize/QuizQuestionAllList";
import QuizTopicAllList from "../components/admin-quiz-topic-customize/QuizTopicAllList";
import QuizTopicOrQuestionInformation from "../components/shared-ui/QuizTopicOrQuestionInformation";
import { DummyLineSkeleton } from "../skeleton/SkeletonLoaders";

export default function QuizTopicOrQuestionCustomize({ context }) {
  const [formState, setFormState] = useState({
    isActive: false,
    currentForm: "",
  });

  // form types
  const Form_Types = {
    add: "add",
    update: "update",
  };

  // quiz question and update form state
  const [input, setInput] = useState(
    context === "topic"
      ? {
          id: "",
          title: "",
          description: "",
        }
      : {
          id: "",

          question: "",

          firstOptionText: "",
          firstOptionCheckbox: false,

          secondOptionText: "",
          secondOptionCheckbox: false,

          thirdOptionText: "",
          thirdOptionCheckbox: false,

          fourthOptionText: "",
          fourthOptionCheckbox: false,
        }
  );

  // clear input state
  const clearInput = () => {
    setInput(
      context === "topic"
        ? {
            id: "",
            title: "",
            description: "",
          }
        : {
            id: "",

            question: "",

            firstOptionText: "",
            firstOptionCheckbox: false,

            secondOptionText: "",
            secondOptionCheckbox: false,

            thirdOptionText: "",
            thirdOptionCheckbox: false,

            fourthOptionText: "",
            fourthOptionCheckbox: false,
          }
    );
  };

  return (
    <main className="min-h-[80vh] flex flex-col lg:flex-row lg:justify-between gap-8 bg-gray-100 dark:bg-gray-700 my-4">
      <QuizTopicOrQuestionInformation
        allStates={{
          formState,
          setFormState,
          Form_Types,
          clearInput,
        }}
        context={context}
      />

      {/* quiz topic all list */}
      <Suspense fallback={<DummyLineSkeleton />}>
        {context === "topic" ? (
          <QuizTopicAllList
            allStates={{
              formState,
              setFormState,
              Form_Types,
              input,
              setInput,
              clearInput,
            }}
          />
        ) : (
          <QuizQuestionAllList
            allStates={{
              formState,
              setFormState,
              Form_Types,
              input,
              setInput,
              clearInput,
            }}
          />
        )}
      </Suspense>
    </main>
  );
}
