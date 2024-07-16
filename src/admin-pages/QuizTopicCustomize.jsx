import { Suspense, useState } from "react";
import QuizTopicAllList from "../components/admin-quiz-topic-customize/QuizTopicAllList";
import QuizTopicInformation from "../components/admin-quiz-topic-customize/QuizTopicInformation";
import { DummyLineSkeleton } from "../skeleton/SkeletonLoaders";

export default function QuizTopicCustomize() {
  // const [isAddTopic, setIsAddTopic] = useState(false);

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
    title: "",
    description: "",
  });

  // clear input state
  const clearInput = () => {
    setInput({
      id: "",
      title: "",
      description: "",
    });
  };

  return (
    <main className="min-h-[80vh] flex flex-col lg:flex-row justify-between gap-8 bg-gray-100 dark:bg-gray-700 my-4">
      <QuizTopicInformation
        allStates={{
          formState,
          setFormState,
          Form_Types,
          clearInput,
        }}
      />

      {/* quiz topic all list */}
      <Suspense fallback={<DummyLineSkeleton />}>
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
      </Suspense>
    </main>
  );
}
