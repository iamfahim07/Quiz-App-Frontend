import { useAuthContext } from "../../context";
import { Link } from "../../router/CustomRouter";
import Button from "../Button";

export default function QuizZenDescription() {
  const { currentUser } = useAuthContext();

  return (
    <div className="flex flex-col justify-center items-start gap-3 w-full md:w-[45%]">
      <h1 className="text-4xl sm:text-5xl md:text-6xl text-gray-800 dark:text-[#F6F7F9] font-bold font-['Roboto']">
        QuizZen
      </h1>
      <p className="text-base sm:text-lg md:text-2xl text-gray-600 dark:text-[#F2F3F5] font-['Inter'] mb-2 md:mb-8">
        Unlock knowledge, ignite curiosity, explore endlessly with our quiz app.
      </p>

      <Link
        to={`${currentUser?.userName ? "/guidelines" : "/introduce_yourself"}`}
      >
        <Button isPrimary={true}>Get Started</Button>
      </Link>
    </div>
  );
}
