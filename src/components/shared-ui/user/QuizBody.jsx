import { useEffect, useRef, useState } from "react";
import { useAnalysisContext } from "../../../context";
import QuizAnswer from "./QuizAnswer";

export default function QuizBody({
  quiz: { _id, isMultiple, isSortQuiz, question, options = [] } = {},
  qnNo,
  userSelectedAnswers = [],
  onToggleClick,
  timeLeft,
  isAnalysis,
  setSelectedAnswers,
  isLoading,
}) {
  // clone quiz data into a context
  const { setCloneQuizzes } = useAnalysisContext();

  // storing the quiz options after shuffling
  const [shuffleOptions, setShuffleOptions] = useState([]);

  // shuffle function
  useEffect(() => {
    const shuffleAllOptions = (array) => {
      const cloneOptions = [...array];

      for (let i = cloneOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cloneOptions[i], cloneOptions[j]] = [cloneOptions[j], cloneOptions[i]];
      }

      setCloneQuizzes((prev) => {
        // handling the development mode
        // Check if the quiz already exists
        const quizExists = prev.some((item) => item._id === _id);

        if (quizExists) {
          // quiz exists, update it
          return prev.map((item) =>
            item._id === _id
              ? {
                  _id,
                  isMultiple,
                  isSortQuiz,
                  question,
                  options: cloneOptions,
                }
              : item
          );
        } else {
          // quiz doesn't exist, add it
          return [
            ...prev,
            {
              _id,
              isMultiple,
              isSortQuiz,
              question,
              options: cloneOptions,
            },
          ];
        }
      });

      isSortQuiz ? setSelectedAnswers(cloneOptions) : null;
      return setShuffleOptions(cloneOptions);
    };

    if (isAnalysis) {
      return setShuffleOptions(options);
    } else {
      return shuffleAllOptions(options);
    }
  }, [
    options,
    isSortQuiz,
    _id,
    isMultiple,
    question,
    setCloneQuizzes,
    setSelectedAnswers,
    isAnalysis,
  ]);

  // drag element reference
  const dragAnswer = useRef(0);
  const dragOverAnswer = useRef(0);

  // sort function
  const handleSort = () => {
    if (timeLeft >= 30) return;

    const cloneOptions = [...shuffleOptions];

    [cloneOptions[dragAnswer.current], cloneOptions[dragOverAnswer.current]] = [
      cloneOptions[dragOverAnswer.current],
      cloneOptions[dragAnswer.current],
    ];

    setShuffleOptions(cloneOptions);
    setSelectedAnswers(cloneOptions);

    setCloneQuizzes((prev) => {
      return prev.map((item) => {
        if (item._id === _id) {
          return { ...item, options: cloneOptions };
        } else {
          return item;
        }
      });
    });
  };

  return (
    <div className="flex flex-col gap-3 md:gap-4">
      <div>
        <h3 className="text-xl sm:text-2xl md:text-3xl text-gray-700 dark:text-[#F6F7F9] font-semibold font-['Roboto']">
          {qnNo}. {question}
        </h3>
        {(isMultiple || isSortQuiz) && (
          <span className="text-xs text-[#F6F7F9] py-1 px-2 rounded bg-sky-400">
            {isSortQuiz ? "Sort Quiz" : "This question has multiple answers"}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 md:gap-3 text-base sm:text-lg md:text-2xl text-gray-600 font-['Inter'] font-medium">
        {options.length > 0 &&
          shuffleOptions.map((option, index) => {
            return (
              <QuizAnswer
                key={option._id}
                allProps={{
                  option,
                  isSortQuiz,
                  userSelectedAnswers,
                  isAnalysis,
                  timeLeft,
                  onToggleClick,
                  dragAnswer,
                  dragOverAnswer,
                  handleSort,
                  index,
                  isLoading,
                }}
              />
            );
          })}
      </div>
    </div>
  );
}
