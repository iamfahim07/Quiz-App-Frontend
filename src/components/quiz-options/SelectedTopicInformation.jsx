import { useQuizTopicContext } from "../../context";
import { Link } from "../../router/CustomRouter";
import Button from "../Button";

export default function SelectedTopicInformation({ selectedTopic }) {
  const { setQuizTopic } = useQuizTopicContext();

  return (
    <div className="w-full h-72 flex gap-2 bg-gray-100 dark:bg-gray-900 rounded">
      <div className="w-full md:w-1/2 flex flex-col gap-2 py-5 px-7">
        <h3 className="text-2xl sm:text-3xl md:text-4xl text-gray-800 dark:text-[#F6F7F9] font-bold font-['Inter']">
          {selectedTopic.title}
        </h3>

        <p className="text-sm sm:text-base md:text-xl text-gray-600 dark:text-[#F2F3F5] font-['Inter']">
          {selectedTopic.description}
        </p>

        <div className="flex gap-2 items-center">
          <Link to="/gameplay">
            <Button
              handleButtonClick={() =>
                setQuizTopic({
                  id: selectedTopic._id,
                  title: selectedTopic.title,
                  description: selectedTopic.description,
                })
              }
            >
              Start quiz
            </Button>
          </Link>

          <span className="text-gray-600 dark:text-[#F2F3F5] font-['Inter']">
            or
          </span>

          <Link to={`/leaderboard/${selectedTopic.title}/${selectedTopic._id}`}>
            <Button isGhostButton={true}>Leaderboard</Button>
          </Link>
        </div>
      </div>

      <div className="w-1/2 hidden md:block">
        <img
          className="w-full h-72 rounded"
          src={selectedTopic.img_link}
          alt={selectedTopic.img_ref}
        />
      </div>
    </div>
  );
}
