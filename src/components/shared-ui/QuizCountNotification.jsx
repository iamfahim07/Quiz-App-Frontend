export default function QuizCountNotification({ currentQuizIndex, quizzes }) {
  return (
    <p className="text-base sm:text-lg md:text-2xl text-gray-600 dark:text-[#F2F3F5] font-['Inter']">
      <span className="font-semibold text-gray-600 dark:text-[#F2F3F5]">
        {currentQuizIndex + 1}
      </span>{" "}
      of{" "}
      <span className="font-semibold text-gray-600 dark:text-[#F2F3F5]">
        {quizzes?.length}
      </span>{" "}
      Questions
    </p>
  );
}
