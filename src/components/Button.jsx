export default function Button({
  isPrimary,
  isGhostButton,
  isLogin,
  handleButtonClick,
  isDisabled,
  children,
}) {
  return (
    <button
      className={`text-sm sm:text-base md:text-xl font-['Roboto'] font-semibold ${
        isGhostButton
          ? "text-gray-800 dark:text-[#F6F7F9] border-2 border-teal-600 md:hover:border-teal-700 active:border-teal-400 md:active:border-teal-400"
          : "text-[#F6F7F9] bg-teal-600 md:hover:bg-teal-700 active:bg-teal-400 md:active:bg-teal-400"
      } transition duration-150 ease-in-out ${
        isPrimary
          ? "px-5 md:px-7 py-3 md:py-4"
          : isLogin
          ? "px-3 md:px-5 py-1 md:py-2"
          : "px-4 md:px-6 py-2 md:py-3"
      } rounded ${isDisabled && "opacity-20 pointer-events-none"}`}
      onClick={handleButtonClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}
