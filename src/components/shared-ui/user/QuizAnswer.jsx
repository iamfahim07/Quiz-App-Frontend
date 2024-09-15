import { useState } from "react";
import { Cross_Sign, OK_Sign } from "../../SVG-Icons";

export default function QuizAnswer({
  allProps: {
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
  },
}) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div
      key={option?._id}
      className={`flex justify-between items-center px-3 py-2 rounded transition-all ${
        isLoading && "pointer-events-none"
      } ${
        isAnalysis || timeLeft >= 30 || isLoading
          ? "cursor-not-allowed"
          : isSortQuiz
          ? "cursor-grab"
          : "cursor-pointer"
      } ${
        timeLeft >= 30 &&
        !userSelectedAnswers?.includes(option?._id) &&
        "opacity-40"
      } ${
        (!isAnalysis && userSelectedAnswers?.includes(option?._id)) ||
        (isAnalysis &&
          (isSortQuiz ? option?.position === index + 1 : option?.isCorrect))
          ? "bg-green-300 scale-[1.02] shadow-md"
          : isAnalysis &&
            (isSortQuiz
              ? option?.position !== index + 1
              : !option?.isCorrect &&
                userSelectedAnswers?.includes(option?._id))
          ? "bg-red-300 scale-[1.02] shadow-md"
          : `bg-gray-200 dark:bg-gray-900 ${
              !isAnalysis &&
              timeLeft < 30 &&
              "lg:hover:scale-[1.02] lg:hover:shadow-md"
            }`
      }`}
      onClick={() => (isSortQuiz ? null : onToggleClick?.(option?._id))}
      draggable={isSortQuiz && timeLeft < 30 && !isAnalysis ? true : false}
      onDragStart={
        isSortQuiz && timeLeft < 30 && !isAnalysis
          ? () => {
              dragAnswer.current = index;
              setIsDragging(true);
            }
          : null
      }
      onDrag={
        isSortQuiz && timeLeft < 30 && !isAnalysis
          ? () => (dragAnswer.current = index)
          : null
      }
      onDragEnter={
        isSortQuiz && timeLeft < 30 && !isAnalysis
          ? () => {
              dragOverAnswer.current = index;
              handleSort();
            }
          : null
      }
      onDragOver={
        isSortQuiz && timeLeft < 30 && !isAnalysis
          ? (e) => e.preventDefault()
          : null
      }
      onDragEnd={
        isSortQuiz && timeLeft < 30 && !isAnalysis
          ? () => {
              setIsDragging(false);
            }
          : null
      }
    >
      <p
        className={`${
          isDragging && timeLeft < 30 ? "opacity-0" : "opacity-100"
        } text-gray-800 transition-all ${
          userSelectedAnswers?.includes(option?._id) ||
          (isAnalysis && option?.isCorrect) ||
          isSortQuiz
            ? "dark:text-gray-800"
            : "dark:text-[#F6F7F9]"
        }`}
      >
        {option?.value}
      </p>

      {isAnalysis && userSelectedAnswers?.includes(option._id) && <OK_Sign />}

      {isAnalysis &&
        !userSelectedAnswers?.includes(option?._id) &&
        option?.isCorrect && <Cross_Sign />}

      {isAnalysis && isSortQuiz && option?.position !== null && (
        <p className="text-gray-800">P: {option?.position}</p>
      )}
    </div>
  );
}
