import { Suspense, useEffect, useState } from "react";
import ChooseOptionNotification from "../components/quiz-options/ChooseOptionNotification";
import ChooseQuiz from "../components/quiz-options/ChooseQuiz";
import ChooseYourQuest from "../components/quiz-options/ChooseYourQuest";
import SelectedTopicInformation from "../components/quiz-options/SelectedTopicInformation";
import { useQuizTopicContext } from "../context";

export default function QuizOptions() {
  const [isFocus, setIsFocus] = useState(false);

  const [selectedTopic, setSelectedTopic] = useState(null);

  const { setQuizTopic } = useQuizTopicContext();

  useEffect(() => {
    setQuizTopic({});
  }, [setQuizTopic]);

  return (
    <main
      className="mt-7 md:mt-10"
      onClick={() => isFocus && setIsFocus(false)}
    >
      <ChooseYourQuest />

      <Suspense fallback={<h1>Loading...</h1>}>
        <ChooseQuiz allProps={{ isFocus, setIsFocus, setSelectedTopic }} />
      </Suspense>

      <div className="w-full h-72 my-3">
        {selectedTopic === null && <ChooseOptionNotification />}

        {selectedTopic !== null && typeof selectedTopic === "object" && (
          <SelectedTopicInformation selectedTopic={selectedTopic} />
        )}
      </div>
    </main>
  );
}
