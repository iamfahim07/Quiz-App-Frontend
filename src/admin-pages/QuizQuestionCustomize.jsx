import { Suspense, useState } from "react";
import QuizQuestionAllList from "../components/admin-quiz-question-customize/QuizQuestionAllList";
import QuizQuestionInformation from "../components/admin-quiz-question-customize/QuizQuestionInformation";
import { DummyLineSkeleton } from "../skeleton/SkeletonLoaders";

export default function QuizQuestionCustomize() {
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
  const [input, setInput] = useState({
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
  });

  // clear input state
  const clearInput = () => {
    setInput({
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
    });
  };

  return (
    <main className="min-h-[80vh] flex flex-col lg:flex-row justify-between gap-8 bg-gray-100 dark:bg-gray-700 my-4">
      <QuizQuestionInformation
        allStates={{
          formState,
          setFormState,
          Form_Types,
          clearInput,
        }}
      />

      {/* quiz question all list */}
      <Suspense fallback={<DummyLineSkeleton />}>
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
      </Suspense>
    </main>
  );
}
