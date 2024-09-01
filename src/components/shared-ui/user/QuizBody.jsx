import { useMemo } from "react";
import { Cross_Sign, OK_Sign } from "../../SVG-Icons";

export default function QuizBody({
  quiz: { isMultiple, question, options = [] } = {},
  qnNo,
  userSelectedAnswers = [],
  onToggleClick,
  timeLeft,
  isAnalysis,
}) {
  const shuffleOptions = useMemo(() => {
    return ((array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    })(options);
  }, [options]);

  return (
    <div className="flex flex-col gap-3 md:gap-4">
      <div>
        <h3 className="text-xl sm:text-2xl md:text-3xl text-gray-700 dark:text-[#F6F7F9] font-semibold font-['Roboto']">
          {qnNo}. {question}
        </h3>
        {isMultiple && (
          <span className="text-xs text-[#F6F7F9] py-1 px-2 rounded bg-sky-400">
            This question has multiple answers
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 md:gap-3 text-base sm:text-lg md:text-2xl text-gray-600 font-['Inter'] font-medium">
        {options.length > 0 &&
          shuffleOptions.map((option) => {
            return (
              <div
                key={option._id}
                className={`flex justify-between items-center px-3 py-2 rounded transition-all ${
                  isAnalysis || timeLeft >= 30
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                } ${
                  timeLeft >= 30 &&
                  !userSelectedAnswers?.includes(option._id) &&
                  "opacity-40"
                } ${
                  (!isAnalysis && userSelectedAnswers?.includes(option._id)) ||
                  (isAnalysis && option.isCorrect)
                    ? "bg-green-300 scale-[1.02] shadow-md"
                    : isAnalysis &&
                      !option.isCorrect &&
                      userSelectedAnswers?.includes(option._id)
                    ? "bg-red-300 scale-[1.02] shadow-md"
                    : `bg-gray-200 dark:bg-gray-900 ${
                        !isAnalysis &&
                        timeLeft < 30 &&
                        "lg:hover:scale-[1.02] lg:hover:shadow-md"
                      }`
                }`}
                onClick={() => onToggleClick?.(option._id)}
              >
                <p
                  className={`text-gray-800 transition-all ${
                    userSelectedAnswers?.includes(option._id) ||
                    (isAnalysis && option.isCorrect)
                      ? "dark:text-gray-800"
                      : "dark:text-[#F6F7F9]"
                  }`}
                >
                  {option.value}
                </p>

                {isAnalysis && userSelectedAnswers?.includes(option._id) && (
                  <OK_Sign />
                )}

                {isAnalysis &&
                  !userSelectedAnswers?.includes(option._id) &&
                  option.isCorrect && <Cross_Sign />}
              </div>
            );
          })}
      </div>
    </div>
  );
}
