import { Info_Sign } from "../SVG-Icons";

export default function ChooseOptionNotification() {
  return (
    <div className="flex items-center gap-2 bg-sky-400  px-2 py-1 rounded w-fit mt-6 custom-animate-pulse">
      <div className="w-5 sm:w-7 h-5 sm:h-7">
        <Info_Sign />
      </div>
      <p className="text-white text-base sm:text-lg md:text-2xl">
        Please choose an option to play quiz.
      </p>
    </div>
  );
}
